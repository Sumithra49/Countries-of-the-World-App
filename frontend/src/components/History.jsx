import React, { useContext } from 'react';
import { CountryContext } from '../context/CountryContext';

const SearchHistory = () => {
  const { searchHistory, searchCountries } = useContext(CountryContext);

  const handleClickSearch = (searchTerm) => {
    searchCountries(searchTerm);
  };

  return (
    <div>
      <h2>Search History</h2>
      {searchHistory.length === 0 ? (
        <p>No recent searches.</p>
      ) : (
        <ul>
          {searchHistory.map((search, index) => (
            <li key={index}>
              <button onClick={() => handleClickSearch(search)}>{search}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchHistory;
