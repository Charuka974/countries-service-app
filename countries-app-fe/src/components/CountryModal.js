import React, { useEffect } from 'react';

const CountryModal = ({ country, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!country) return null;

  const name = country.name?.common || 'Unknown';
  const officialName = country.name?.official || 'Unknown';
  const capital = country.capital ? country.capital[0] : 'N/A';
  const region = country.region || 'N/A';
  const subregion = country.subregion || 'N/A';
  const population = country.population ? country.population.toLocaleString() : 'N/A';
  const flagUrl = country.flags?.svg || country.flags?.png;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <img src={flagUrl} alt={`${name} flag`} className="modal-flag" />
          <div className="modal-flag-overlay"></div>
          <button className="close-btn" onClick={onClose} aria-label="Close modal">×</button>
        </div>
        <div className="modal-body">
          <h2 className="modal-title">{name}</h2>
          <span className="modal-region">{region} • {subregion}</span>
          
          <div className="detail-grid">
            <div className="detail-item">
              <span className="detail-label">Official Name</span>
              <span className="detail-value">{officialName}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Capital</span>
              <span className="detail-value">{capital}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Population</span>
              <span className="detail-value">{population}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Region</span>
              <span className="detail-value">{region}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryModal;
