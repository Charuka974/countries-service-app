package com.sentura.countries_service.service.impl;

import com.sentura.countries_service.model.Country;
import com.sentura.countries_service.service.CountriesService;
import jakarta.annotation.PostConstruct;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class CountriesServiceImpl implements CountriesService {

    private List<Country> cachedCountries = new ArrayList<>();

    public List<Country> getCountries() {
        return cachedCountries;
    }

    public List<Country> searchCountries(String search) {
        return cachedCountries.stream()
                .filter(c -> c.getName().toLowerCase().contains(search.toLowerCase()))
                .toList();
    }

    @PostConstruct
    public void init(){
        refreshCountries();
    }

    @Scheduled(fixedRate = 600000)
    public void refreshCountries() {

        RestTemplate restTemplate = new RestTemplate();

        String url = "https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags";

        ResponseEntity<List> response =
                restTemplate.getForEntity(url, List.class);

        List<Map<String, Object>> countries = response.getBody();

        if (countries == null) return;

        List<Country> updatedCountries = new ArrayList<>();

        for (Map<String, Object> c : countries) {

            try {

                // Name
                String name = "Unknown";
                Map<String, Object> nameMap = (Map<String, Object>) c.get("name");
                if (nameMap != null && nameMap.get("common") != null) {
                    name = nameMap.get("common").toString();
                }

                // Capital
                String capital = "N/A";
                List<?> capitals = (List<?>) c.get("capital");
                if (capitals != null && !capitals.isEmpty()) {
                    capital = capitals.get(0).toString();
                }

                // Region
                String region = c.get("region") != null ? c.get("region").toString() : "N/A";

                // Population
                long population = 0;
                Object popObj = c.get("population");
                if (popObj instanceof Number) {
                    population = ((Number) popObj).longValue();
                }

                // Flag
                String flag = "";
                Map<String, Object> flags = (Map<String, Object>) c.get("flags");
                if (flags != null && flags.get("png") != null) {
                    flag = flags.get("png").toString();
                }

                updatedCountries.add(new Country(name, capital, region, population, flag));

            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        cachedCountries = updatedCountries;
    }
}