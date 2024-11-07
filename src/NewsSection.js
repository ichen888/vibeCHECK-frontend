// NewsSection.js
import React from 'react';


const newsItems = [
    { id: 1, title: "Headline 1", content: "Celebrity gains support with latest post." },
    { id: 2, title: "Headline 2", content: "More news and updates on recent activities." },
    { id: 3, title: "Headline 3", content: "Celebrity facing challenges in recent news." }
  ];

const NewsSection = ({ filteredNews }) => {
  return (
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
  );
};

export default NewsSection;
