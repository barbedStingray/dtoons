import { useState, useEffect } from 'react';
import axios from 'axios';

// This script searches a user's collection and returns the dToons based
// on the manipulated parameters


export default function useSearchResults(userId, currentPage, searchCharacter, selectedColors, selectedPoints, selectedRarity) {
    const [searchResults, setSearchResults] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 8;
  
    useEffect(() => {
        searchCollection(userId, currentPage);
      }, [currentPage, selectedColors, searchCharacter, selectedPoints, selectedRarity]);
    
    async function searchCollection(userId, page = 1) {
        console.log('searching user collection');
    
        try {
          const dbResults = await axios.get(`/api/collection/search/${userId}`, {
            params: {
              colors: selectedColors,
              letters: searchCharacter,
              points: selectedPoints,
              rarity: selectedRarity,
              page,
              limit: itemsPerPage
            }
          });
          console.log('RESSULTS', dbResults.data);
          const { results, totalCount, totalPages } = dbResults.data;
          setSearchResults(results);
          setTotalPages(totalPages); // Set total pages based on backend
          // setTotalCount(totalCount); // maybe for later?
        } catch (error) {
          console.log('error searching the collection', error);
        }
      }
    
    return [searchResults, totalPages];
}
