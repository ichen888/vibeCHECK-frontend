// App.js
import React, { useState } from "react";
import "./App.css";
import SearchBar from './SearchBar';
import NewsSection from './NewsSection';
import RecentContent from './RecentContent';

const newsItems = [
  { id: 1, title: "Headline 1", content: "Celebrity gains support with latest post." },
  { id: 2, title: "Headline 2", content: "More news and updates on recent activities." },
  { id: 3, title: "Headline 3", content: "Celebrity facing challenges in recent news." }
];

const recentContent = [
  { id: 1, title: "Post 1 - 56% Vibes", content: "Celebrity gains support with latest post." },
  { id: 2, title: "Post 2 - 44% Vibes", content: "Recent news affecting vibes significantly." },
  { id: 3, title: "Post 3 - 95% Vibes", content: "Celebrity's latest appearance is a major hit." }
];

function App() {
  const [selectedInfluencer, setSelectedInfluencer] = useState(null);
  const [filteredNews, setFilteredNews] = useState(newsItems);
  const [filteredContent, setFilteredContent] = useState(recentContent);

  const handleSearchResult = (influencer) => {
    setSelectedInfluencer(influencer);
    
    if (influencer) {
      const query = influencer.name.toLowerCase();
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
    } else {
      setFilteredNews(newsItems);
      setFilteredContent(recentContent);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>vibeCHECK</h1>
        <SearchBar onSearchResult={handleSearchResult} />
      </header>

      <div className="profile">
        <img src="https://via.placeholder.com/80" alt="Celebrity" />
        {selectedInfluencer ? (
          <>
            <h2>{selectedInfluencer.name}</h2>
            <div className="influencer-details">
              <p>ID: {selectedInfluencer.id}</p>
              <div className="vibe-score">
                Vibe Score: {selectedInfluencer.vibeScore}%
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
        {selectedInfluencer && (
          <>
            <div>{selectedInfluencer.vibeScore}% Good Vibes</div>
            <div>{100 - selectedInfluencer.vibeScore}% Bad Vibes</div>
          </>
        )}
      </div>

      <div className="vote-section">
        <button>Good Vibes</button>
        <button>Bad Vibes</button>
      </div>

      <div className="vibe-details">
        <div>
          22% <br /> Media Sentiment
        </div>
        <div>
          76% <br /> Viewer Reactions
        </div>
      </div>

      <NewsSection filteredNews={filteredNews} />
      <RecentContent filteredContent={filteredContent} />
    </div>
  );
}

export default App;
