import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { CountryContext } from '../context/CountryContext';

const Favorites = () => {
  const { favorites, fetchFavorites } = useContext(CountryContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (countryId) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5000/favorites/${countryId}`);
      await fetchFavorites(); // Refresh favorites after deletion
    } catch (error) {
      console.error('Error removing favorite:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Favorite Countries</h2>
      {loading ? (
        <p>Loading...</p>
      ) : favorites.length === 0 ? (
        <p>No favorite countries added yet.</p>
      ) : (
        <div>
          {favorites.map(country => (
            <div key={country._id}>
              <h3>{country.name}</h3>
              <p>Currency: {country.currency}</p>
              <p>Capital: {country.capital}</p>
              <p>Languages: {country.languages.join(', ')}</p>
              <img src={`https://www.countryflags.io/${country.alpha2Code}/flat/64.png`} alt={`Flag of ${country.name}`} />
              <button onClick={() => handleRemoveFavorite(country._id)}>Remove from Favorites</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
