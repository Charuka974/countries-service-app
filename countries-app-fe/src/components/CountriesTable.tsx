import React from 'react';
import { Country } from '../services/api';

interface CountriesTableProps {
  countries: Country[];
  onRowClick: (country: Country) => void;
}

const CountriesTable: React.FC<CountriesTableProps> = ({ countries, onRowClick }) => {
  if (!countries || countries.length === 0) {
    return (
      <div className="empty-container">
        <p>No countries found matching your search.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="countries-table">
        <thead>
          <tr>
            <th>Flag</th>
            <th>Name</th>
            <th>Capital</th>
            <th>Region</th>
            <th>Population</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((country) => {

            const name = country.name || 'Unknown';
            const capital = country.capital || 'N/A';
            const region = country.region || 'N/A';
            const population = country.population
              ? country.population.toLocaleString()
              : 'N/A';
            const flagUrl = country.flag;

            return (
              <tr
                key={country.name}
                className="table-row"
                onClick={() => onRowClick(country)}
              >
                <td>
                  <img src={flagUrl} alt={`${name} flag`} className="flag-img" loading="lazy" />
                </td>
                <td className="country-name">{name}</td>
                <td>{capital}</td>
                <td>{region}</td>
                <td>{population}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CountriesTable;
