import React, { useState, useEffect, useMemo } from 'react';
import { fetchCountries, Country } from './services/api';
import SearchBar from './components/SearchBar';
import CountriesTable from './components/CountriesTable';
import CountryModal from './components/CountryModal';
import './App.css';

function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchCountries();
        setCountries(data);
      } catch (err) {
        setError('Failed to fetch country data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const filteredCountries = useMemo(() => {
    if (!search.trim()) return countries;
    const lowerQuery = search.toLowerCase();

    return countries.filter((country) => {
      const name = country.name?.toLowerCase() || '';
      const capital = country.capital?.toLowerCase() || '';
      return name.includes(lowerQuery) || capital.includes(lowerQuery);
    });
  }, [search, countries]);

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="title">Countries Explore</h1>
        <p className="subtitle">Discover nations, capitals, regions and populations from around the world.</p>
      </header>
      
      <main>
        <SearchBar search={search} setSearch={setSearch} />
        
        <div style={{ marginTop: '30px' }}>
          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading international data...</p>
            </div>
          ) : error ? (
            <div className="error-container">
              <p>{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                style={{
                  marginTop: '16px',
                  padding: '10px 20px',
                  background: 'var(--accent-color)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Retry
              </button>
            </div>
          ) : (
            <CountriesTable 
              countries={filteredCountries} 
              onRowClick={setSelectedCountry} 
            />
          )}
        </div>
      </main>

      {selectedCountry && (
        <CountryModal 
          country={selectedCountry} 
          onClose={() => setSelectedCountry(null)} 
        />
      )}
    </div>
  );
}

export default App;
