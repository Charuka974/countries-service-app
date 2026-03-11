package com.sentura.countries_service.controller;

import com.sentura.countries_service.model.Country;
import com.sentura.countries_service.service.CountriesService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/countries")
@RequiredArgsConstructor
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
