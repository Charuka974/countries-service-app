//export const fetchCountries = async () => {
//  // If a local backend was available, we'd call 'http://localhost:8080/api/countries'
//  // But for the sake of making this UI functional out of the box,
//  // we'll hit the public API directly with the requested fields.
//  try {
//    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,capital,region,subregion,population,flags');
//    if (!response.ok) throw new Error('Failed to fetch countries');
//    const data = await response.json();
//    return data;
//  } catch (error) {
//    console.error('Error fetching countries:', error);
//    throw error;
//  }
//};

// api.js or wherever you keep your API calls
export const fetchCountries = async () => {
  try {
    // Call your Spring Boot backend
    const response = await fetch('http://localhost:8080/countries');

    if (!response.ok) {
      throw new Error('Failed to fetch countries from backend');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};

// Optional: Search function using backend query param
export const searchCountries = async (search) => {
  try {
    const response = await fetch(`http://localhost:8080/countries?search=${encodeURIComponent(search)}`);

    if (!response.ok) {
      throw new Error('Failed to search countries');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching countries:', error);
    throw error;
  }
};