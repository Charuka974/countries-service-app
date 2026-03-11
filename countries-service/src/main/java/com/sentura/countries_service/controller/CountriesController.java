package com.sentura.countries_service.controller;

import com.sentura.countries_service.model.Country;
import com.sentura.countries_service.service.CountriesService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/countries")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class CountriesController {

    private final CountriesService countriesService;

    @GetMapping
    public List<Country> getCountries(@RequestParam(required = false) String search) {
        if (search != null && !search.isEmpty()) {
            return countriesService.searchCountries(search);
        }
        return countriesService.getCountries();
    }
}
