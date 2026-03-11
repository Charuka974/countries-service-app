package com.sentura.countries_service.service;

import com.sentura.countries_service.model.Country;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class CountriesService {

    private List<Country> cachedCountries = new ArrayList<>();

    public List<Country> getCountries() {
        return cachedCountries;
    }

    public List<Country> searchCountries(String search) {
        return cachedCountries.stream()
                .filter(c -> c.getName().toLowerCase().contains(search.toLowerCase()))
                .toList();
    }

    @Scheduled(fixedRate = 600_000) // 10 minutes
    public void refreshCountries() {
        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<List> response =
                restTemplate.getForEntity("https://restcountries.com/v3.1/all", List.class);

        List<Map<String, Object>> countries = response.getBody();

        if (countries == null) return;

        List<Country> updatedCountries = new ArrayList<>();

        for (Map<String, Object> c : countries) {
            try {
                // Name
                Map<String, Object> nameMap = (Map<String, Object>) c.get("name");
                String name = nameMap != null ? (String) nameMap.get("common") : "N/A";

                // Capital
                List<String> capitals = (List<String>) c.get("capital");
                String capital = (capitals != null && !capitals.isEmpty()) ? capitals.get(0) : "N/A";

                // Region
                String region = (String) c.getOrDefault("region", "N/A");

                // Population
                Object popObj = c.get("population");
                long population = 0;
                if (popObj instanceof Integer) {
                    population = ((Integer) popObj).longValue();
                } else if (popObj instanceof Long) {
                    population = (Long) popObj;
                }

                // Flag
                Map<String, Object> flags = (Map<String, Object>) c.get("flags");
                String flag = flags != null ? (String) flags.get("png") : "";

                updatedCountries.add(new Country(name, capital, region, population, flag));
            } catch (Exception e) {
                // Skip malformed country entries
                e.printStackTrace();
            }
        }

        cachedCountries = updatedCountries;
    }
}