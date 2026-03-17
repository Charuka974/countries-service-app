package com.sentura.countries_service.service;

import com.sentura.countries_service.model.Country;

import java.util.List;

public interface CountriesService {
    public List<Country> getCountries();
    public List<Country> searchCountries(String search);
    public void init();
    public void refreshCountries();
}
