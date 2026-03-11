import React from 'react';

const CountriesTable = ({ countries, onRowClick }) => {
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
            const name = country.name?.common || 'Unknown';
            const capital = country.capital ? country.capital[0] : 'N/A';
            const region = country.region || 'N/A';
            const population = country.population ? country.population.toLocaleString() : 'N/A';
            const flagUrl = country.flags?.svg || country.flags?.png;

            return (
              <tr 
                key={country.name?.official || name} 
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
