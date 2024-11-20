import React, { useState, useEffect } from 'react';

const NewsSection = ({ influencerId }) => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const placeholderArticles = [
    {
      id: 1,
      title: 'No news articles available',
      summary: 'Please select an influencer to view news articles.',
      sentimentScore: 'N/A',
      url: '#',
    },
  ];

  useEffect(() => {
    const fetchNews = async () => {
      if (!influencerId) {
        setNewsArticles(placeholderArticles);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch('http://127.0.0.1:8000/News');

        if (!response.ok) {
          throw new Error('Failed to fetch news articles');
        }

        const data = await response.json();

        const filteredArticles = data
          .filter((item) => item.influencer_id === influencerId)
          .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
          .slice(0, 5)
          .map((item) => ({
            id: item.id,
            title: item.title || 'No Title',
            summary: item.summary || 'No Summary Available',
            url: item.url || '#',
            date: item.date,
            // Adjust sentimentScore formatting
            sentimentScore:
              item.sentiment_score !== null && item.sentiment_score !== undefined
                ? Number(item.sentiment_score) % 1 === 0
                  ? Number(item.sentiment_score).toFixed(0)
                  : Number(item.sentiment_score).toFixed(1)
                : 'N/A',
          }));

        setNewsArticles(filteredArticles.length > 0 ? filteredArticles : placeholderArticles);
      } catch (err) {
        console.error('Error fetching news articles:', err);
        setError('Failed to load news articles');
        setNewsArticles(placeholderArticles);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [influencerId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="news-section">
      <h2>Recent News</h2>
      {newsArticles.map((article) => (
        <div key={article.id} className="news-article">
          <h3>{article.title}</h3>
          <div className="sentiment-score">
            Sentiment Score: {article.sentimentScore}/10
          </div>
          <p>{article.summary}</p>
          {article.url && article.url !== '#' && (
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Read more
            </a>
          )}
        </div>
      ))}
    </div>
  );
};

export default NewsSection;
