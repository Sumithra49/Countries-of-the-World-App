import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const CountryContext = createContext();

export const CountryProvider = ({ children }) => {
  const [countries, setCountries] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]);

  const fetchCountries = async (currencyCode) => {
    try {
      console.log(`Fetching countries with currency code: ${currencyCode}`);
      const response = await axios.get(`https://restcountries.com/v2/currency/${currencyCode}`);
      console.log('Response data:', response.data);
      setCountries(response.data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const addFavorite = async (country) => {
    try {
      const response = await axios.post('http://localhost:5000/favorites', country);
      setFavorites(response.data);
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  };

  const fetchFavorites = async () => {
    try {
      const response = await axios.get('http://localhost:5000/favorites');
      setFavorites(response.data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const fetchHistory = async () => {
    try {
      const response = await axios.get('http://localhost:5000/history');
      setHistory(response.data);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  useEffect(() => {
    fetchFavorites();
    fetchHistory();
  }, []);

  return (
    <CountryContext.Provider value={{ countries, favorites, history, fetchCountries, addFavorite }}>
      {children}
    </CountryContext.Provider>
  );
};
