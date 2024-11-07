// App.js

import React, { useState } from "react";
import "./App.css";

const newsItems = [
  { id: 1, title: "Jason Kelce response to Taylor Swift's arrival at Arrowhead picked up by ESPN host", url: "https://www.themirror.com/sport/american-football/jason-kelce-taylor-swift-espn-787378" },
  { id: 2, title: "It’s the End of an Era for Taylor Swift. What Comes Next?", url: "https://www.harpersbazaar.com/culture/art-books-music/a62802489/taylor-swift-eras-tour-ending-whats-next-moves-explained/" },
  { id: 3, title: "Taylor Swift’s Latest Game Day Outfit Included $2,195 Cowboy Boots — Step Out in a Similar Look from $46", url: "https://people.com/taylor-swift-cowboy-boots-blueprint-2024-8741029" }
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
        <img src="https://cdn.prod.website-files.com/61e1db1c178256e11be974b0/63f91e8829fbd0aaf9de4cb8_htygWn9bAtmW8KF52-4zwtXFzTwiA9dfZ4Q_custom_logo.png" alt="Taylor Swift" />
        <h2>Taylor Swift</h2>
        <p>Pop Singer, American, Age 34</p>
      </div>

      <div className="vibe-stats">
        <div>83% Good Vibes</div>
        <div>17% Bad Vibes</div>
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
            {/* Render the "Read More" link with the actual URL */}
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              <button>Read More</button>
            </a>
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
