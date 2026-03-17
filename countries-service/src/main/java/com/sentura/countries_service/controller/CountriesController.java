package com.sentura.countries_service.controller;

import com.sentura.countries_service.model.Country;
import com.sentura.countries_service.service.CountriesServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/countries")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class CountriesController {

    private final CountriesServiceImpl countriesServiceImpl;

    @GetMapping
    public List<Country> getCountries(@RequestParam(required = false) String search) {
        if (search != null && !search.isEmpty()) {
            return countriesServiceImpl.searchCountries(search);
        }
        return countriesServiceImpl.getCountries();
    }
}
