// NewsSection.js
import React, { useState, useEffect } from 'react';

const NewsSection = ({ influencerId }) => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Placeholder news items for when no influencer is selected
  const placeholderNews = [
    {
      id: 1,
      title: "Search for a Celebrity",
      content: "Enter a name above to see their latest news and updates."
    },
    {
      id: 2,
      title: "Stay Updated",
      content: "Get the latest news, social media updates, and trending stories."
    },
    {
      id: 3,
      title: "Track Celebrity Vibes",
      content: "Discover how your favorite celebrities are trending in real-time."
    }
  ];

  useEffect(() => {
    const fetchContent = async () => {
      if (!influencerId) {
        setNewsItems(placeholderNews);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch('http://127.0.0.1:8000/content');
        if (!response.ok) {
          throw new Error('Failed to fetch content');
        }
        const data = await response.json();

        // Filter content by influencer_id and platform 'TMZ', get the most recent 3 items
        const filteredContent = data
          .filter(item => item.influencer_id === influencerId && item.platform === 'TMZ') // Filter by TMZ platform
          .sort((a, b) => b.id - a.id)
          .slice(0, 3)
          .map(item => ({
            id: item.id,
            title: item.title,
            content: `Platform: ${item.platform}`,
            url: item.url
          }));

        setNewsItems(filteredContent.length > 0 ? filteredContent : placeholderNews);
      } catch (err) {
        console.error('Error fetching content:', err);
        setError('Failed to load news content');
        setNewsItems(placeholderNews); // Show placeholder content on error
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [influencerId]);

  if (loading) return <div>Loading news...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <section className="news-section">
      <h3>What's in the news?</h3>
      {newsItems.map((item) => (
        <div key={item.id} className="news-item">
          <h4>{item.title}</h4>
          <p>{item.content}</p>
          {item.url && (
            <a 
              href={item.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="read-more-button"
            >
              Read More
            </a>
          )}
        </div>
      ))}
    </section>
  );
};

export default NewsSection;