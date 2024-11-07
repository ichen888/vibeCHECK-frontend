// App.js

import React, { useState } from "react";
import "./App.css";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredNews, setFilteredNews] = useState(newsItems);
  const [filteredContent, setFilteredContent] = useState(recentContent);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter news items and recent content based on the search query
    const filteredNewsItems = newsItems.filter(
      (item) => item.title.toLowerCase().includes(query) || item.content.toLowerCase().includes(query)
    );
    const filteredRecentContent = recentContent.filter(
      (item) => item.title.toLowerCase().includes(query) || item.content.toLowerCase().includes(query)
    );

    setFilteredNews(filteredNewsItems);
    setFilteredContent(filteredRecentContent);
  };

  return (
    <div className="container">
      <header className="header">
        <h1>vibeCHECK</h1>
        <input
          type="text"
          className="search-bar"
          placeholder="Who's the Celebrity?"
          value={searchQuery}
          onChange={handleSearch}
        />
      </header>

      <div className="profile">
        <img src="https://via.placeholder.com/80" alt="Celebrity" />
        <h2>Celebrity Name</h2>
        <p>Profession, Nationality & Age</p>
      </div>

      <div className="vibe-stats">
        <div>56% Good Vibes</div>
        <div>44% Bad Vibes</div>
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

      <section className="news-section">
        <h3>What's in the news?</h3>
        {filteredNews.map((item) => (
          <div key={item.id} className="news-item">
            <h4>{item.title}</h4>
            <p>{item.content}</p>
            <button>Read More</button>
          </div>
        ))}
      </section>

      <section className="content-section">
        <h3>Recent Content</h3>
        {filteredContent.map((item) => (
          <div key={item.id} className="content-item">
            <h4>{item.title}</h4>
            <p>{item.content}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;
