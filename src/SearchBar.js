// SearchBar.js
import React, { useState, useEffect } from 'react';

const SearchBar = ({ onSearchResult }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [influencerTable, setInfluencerTable] = useState([]);
  const [error, setError] = useState(null);

  // Fetch influencer table on component mount
  useEffect(() => {
    const fetchInfluencerTable = async () => {
      try {
        const response = await fetch('http://localhost:8000/influencers');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setInfluencerTable(data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load influencer data');
      }
    };

    fetchInfluencerTable();
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (!query.trim()) {
      onSearchResult(null);
      return;
    }

    // Search the influencer table for matching name
    const matchedInfluencer = influencerTable.find(influencer => 
      influencer.name.toLowerCase().includes(query.toLowerCase())
    );

    if (matchedInfluencer) {
      onSearchResult({
        id: matchedInfluencer.id,
        name: matchedInfluencer.name,
        vibeScore: matchedInfluencer.vibe_score
      });
    } else {
      onSearchResult(null);
    }
  };

  return (
    <div className="search-wrapper">
      <input
        type="text"
        className="search-bar"
        placeholder="Who's the Celebrity?"
        value={searchQuery}
        onChange={handleSearch}
      />
      {error && <div className="search-error">{error}</div>}
    </div>
  );
};

export default SearchBar;
