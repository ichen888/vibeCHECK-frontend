// RecentContent.js
import React, { useState, useEffect } from 'react';

const RecentContent = ({ influencerId }) => {
  const [contentItems, setContentItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Placeholder content for when no influencer is selected
  const placeholderContent = [
    { id: 1, title: "Post 1 - 56% Vibes", content: "Celebrity gains support with latest post." },
    { id: 2, title: "Post 2 - 44% Vibes", content: "Recent news affecting vibes significantly." },
    { id: 3, title: "Post 3 - 95% Vibes", content: "Celebrity's latest appearance is a major hit." }
  ];

  useEffect(() => {
    const fetchContent = async () => {
      if (!influencerId) {
        setContentItems(placeholderContent);
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

        // Filter content by influencer_id and platform "YouTube", and get the most recent 3 items
        const filteredContent = data
          .filter(item => item.influencer_id === influencerId && item.platform === 'YouTube') // Filter for YouTube content
          .sort((a, b) => b.id - a.id)
          .slice(0, 3)
          .map(item => ({
            id: item.id,
            title: item.title,
            content: `Platform: ${item.platform}`,
            url: item.url
          }));

        setContentItems(filteredContent.length > 0 ? filteredContent : placeholderContent);
      } catch (err) {
        console.error('Error fetching content:', err);
        setError('Failed to load content');
        setContentItems(placeholderContent); // Show placeholder content on error
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [influencerId]);

  if (loading) return <div>Loading content...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <section className="content-section">
      <h3>Recent YouTube Content</h3>
      {contentItems.map((item) => (
        <div key={item.id} className="content-item">
          <h4>{item.title}</h4>
          <p>{item.content}</p>
          {item.url && (
            <a 
              href={item.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="read-more-button"
            >
              Watch on YouTube
            </a>
          )}
        </div>
      ))}
    </section>
  );
};

export default RecentContent;