// NewsSection.js
import React, { useState, useEffect } from 'react';
import './Profile.css'; // Ensure this CSS file is correctly imported

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
          .map((item) => {
            // Format sentimentScore
            let sentimentScore = 'N/A';
            if (item.sentiment_score !== null && item.sentiment_score !== undefined) {
              sentimentScore = Number(item.sentiment_score).toFixed(
                Number(item.sentiment_score) % 1 === 0 ? 0 : 1
              );
            }

            // Determine sentiment category for styling
            let sentimentClass = '';
            const score = parseFloat(sentimentScore);
            if (!isNaN(score)) {
              if (score >= 1 && score <= 4) {
                sentimentClass = 'sentiment-red';
              } else if (score >= 5 && score <= 7) {
                sentimentClass = 'sentiment-yellow';
              } else if (score >= 8 && score <= 10) {
                sentimentClass = 'sentiment-green';
              }
            } else {
              sentimentClass = 'sentiment-default';
            }

            return {
              id: item.id,
              title: item.title || 'No Title',
              url: item.url || '#',
              date: item.date,
              sentimentScore,
              sentimentClass,
            };
          });

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

  if (loading) return <div className="news-loading">Loading...</div>;
  if (error) return <div className="news-error">{error}</div>;

  return (
    <div className="news-section">
      {newsArticles.map((article) => (
        <div key={article.id} className="news-article">
          <div className="news-article-box">
            <div className="title-box">
              <h3 className="news-title">{article.title}</h3>
            </div>
            {article.date && (
              <div className="news-date">
                {new Date(article.date).toLocaleDateString()}
              </div>
            )}
            <div className="sentiment-box">
              <span className="sentiment-label">Sentiment Score:</span>
              <span className={`sentiment-score ${article.sentimentClass}`}>
                {article.sentimentScore}/10
              </span>
            </div>
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more-button">
              Read More
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsSection;
