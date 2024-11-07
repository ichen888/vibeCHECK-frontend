// App.js
import React, { useState, useEffect } from "react";
import "./App.css";
import SearchBar from './SearchBar';
import NewsSection from './NewsSection';
import RecentContent from './RecentContent';
import VoteSection from './VoteSection';

const recentContent = [
  { id: 1, title: "Post 1 - 56% Vibes", content: "Celebrity gains support with latest post." },
  { id: 2, title: "Post 2 - 44% Vibes", content: "Recent news affecting vibes significantly." },
  { id: 3, title: "Post 3 - 95% Vibes", content: "Celebrity's latest appearance is a major hit." }
];

const newsItems = [
  { id: 1, title: "Headline 1", content: "Celebrity gains support with latest post." },
  { id: 2, title: "Headline 2", content: "More news and updates on recent activities." },
  { id: 3, title: "Headline 3", content: "Celebrity facing challenges in recent news." }
];

function App() {
  const [selectedInfluencerId, setSelectedInfluencerId] = useState(null);
  const [influencerData, setInfluencerData] = useState(null);
  const [filteredNews, setFilteredNews] = useState(newsItems);
  const [filteredContent, setFilteredContent] = useState(recentContent);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle the search result from SearchBar
  const handleSearchResult = (influencer) => {
    if (influencer) {
      setSelectedInfluencerId(influencer.id);
      setInfluencerData(influencer);
    } else {
      setSelectedInfluencerId(null);
      setInfluencerData(null);
      resetFilters();
    }
  };

  // Filter content based on influencer name
  const filterContentByInfluencer = (name) => {
    const query = name.toLowerCase();
    const filteredNewsItems = newsItems.filter(
      (item) => item.title.toLowerCase().includes(query) || 
                item.content.toLowerCase().includes(query)
    );
    const filteredRecentContent = recentContent.filter(
      (item) => item.title.toLowerCase().includes(query) || 
                item.content.toLowerCase().includes(query)
    );

    setFilteredNews(filteredNewsItems);
    setFilteredContent(filteredRecentContent);
  };

  // Reset filters when no influencer is selected
  const resetFilters = () => {
    setFilteredNews(newsItems);
    setFilteredContent(recentContent);
  };

  return (
    <div className="container">
      <header className="header">
        <h1>vibeCHECK</h1>
        <SearchBar onSearchResult={handleSearchResult} />
      </header>

      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}

      <div className="profile">
        <img src="https://via.placeholder.com/80" alt="Celebrity" />
        {influencerData ? (
          <>
            <h2>{influencerData.name}</h2>
            <div className="influencer-details">
              <p>ID: {influencerData.id}</p>
              <div className="vibe-score">
                Vibe Score: {influencerData.vibeScore}%
              </div>
            </div>
          </>
        ) : (
          <>
            <h2>Search for a Celebrity</h2>
            <p>Enter a name to see their vibe score</p>
          </>
        )}
      </div>

      <div className="vibe-stats">
        {influencerData && (
          <>
            <div>{influencerData.vibeScore}% Good Vibes</div>
            <div>{100 - influencerData.vibeScore}% Bad Vibes</div>
          </>
        )}
      </div>

      <VoteSection influencerId={selectedInfluencerId} />

      <div className="vibe-details">
        <div>
          22% <br /> Media Sentiment
        </div>
        <div>
          76% <br /> Viewer Reactions
        </div>
      </div>

      <NewsSection influencerId={selectedInfluencerId} />
      <RecentContent influencerId={selectedInfluencerId} />
    </div>
  );
}

export default App;
