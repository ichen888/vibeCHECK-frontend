import React, { useState, useEffect } from 'react';
import './Profile.css'; // Reuse styles from Profile.css

const NewsSection = ({ influencerId }) => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const placeholderArticles = [
    {
      id: 1,
      title: 'No news articles available',
      sentimentScore: 'N/A',
      url: '#',
      date: null,
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
            url: item.url || '#',
            date: item.date,
            sentimentScore:
              item.sentiment_score !== null && item.sentiment_score !== undefined
                ? Number(item.sentiment_score).toFixed(
                    Number(item.sentiment_score) % 1 === 0 ? 0 : 1
                  )
                : 'N/A',
          }));

        setNewsArticles(
          filteredArticles.length > 0 ? filteredArticles : placeholderArticles
        );
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

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="news-section">
      {newsArticles.map((article) => (
        <div key={article.id} className="comment-card">
          <div className="comment-main">
            <blockquote className="comment-text">
              {article.title}
            </blockquote>
            <div className="sentiment-row">
              <div className="sentiment-score">
                Sentiment Score: {article.sentimentScore}/10
              </div>
              {article.url && (
                <button
                  className="read-more-button"
                  onClick={() => window.open(article.url, '_blank')}
                  aria-label={`Read more about ${article.title}`}
                >
                  Read More
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsSection;
