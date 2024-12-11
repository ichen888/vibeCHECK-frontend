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
      comment: 'N/A',
      sentimentScore: 'N/A',
      sentimentClass: '',
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
        const response = await fetch('https://vibecheck-backend-57495040685.us-central1.run.app/News');

        if (!response.ok) {
          throw new Error('Failed to fetch news articles');
        }

        const data = await response.json();

        const filteredArticles = data
        .filter((item) => item.influencer_id === influencerId)
        .sort((a, b) => b.id - a.id)
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
          let sentimentClass = 'sentiment-default';
          const score = parseFloat(sentimentScore);
          if (!isNaN(score)) {
            if (score >= 1 && score <= 4) {
              sentimentClass = 'sentiment-red';
            } else if (score >= 5 && score <= 7) {
              sentimentClass = 'sentiment-yellow';
            } else if (score >= 8 && score <= 10) {
              sentimentClass = 'sentiment-green';
            }
          }
      
          return {
            id: item.id,
            title: item.title || 'No Title',
            comment: item.description || 'No description available',
            url: item.url || '#',
            date: item.date,
            sentimentScore: sentimentScore,
            sentimentClass: sentimentClass,
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

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="news-section">
      {newsArticles.map((article) => (
        <div key={article.id} className="news-card">
          {/* Title Box */}
          <div className="title-box">
            <h4 className="comment-title">{article.title}</h4>
          </div>

          {/* Sentiment Score Box */}
          {/* Sentiment Score Box */}
      <div className="sentiment-box">
        <span className="sentiment-label">Sentiment Score:</span>
        <span className={`sentiment-score ${article.sentimentClass}`}>
          {article.sentimentScore}/10
        </span>
      </div>


          {/* Read More Button */}
          <div className="read-more-box">
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
      ))}
    </div>
  );
};

export default NewsSection;
