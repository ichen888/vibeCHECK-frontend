// RecentComments.js
import React, { useState, useEffect } from 'react';
import './Profile.css'; // Ensure this CSS file is correctly imported

const RecentComments = ({ influencerId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const placeholderComments = [
    {
      id: 1,
      comment: "Search for a celebrity to see what fans are saying",
      title: "No comments yet",
      sentimentScore: 'N/A',
      videoUrl: '#',
      sentimentClass: 'sentiment-default',
    },
    {
      id: 2,
      comment: "Discover fan reactions and discussions",
      title: "Waiting for selection",
      sentimentScore: 'N/A',
      videoUrl: '#',
      sentimentClass: 'sentiment-default',
    },
    {
      id: 3,
      comment: "See what people are talking about",
      title: "Select a celebrity above",
      sentimentScore: 'N/A',
      videoUrl: '#',
      sentimentClass: 'sentiment-default',
    },
  ];

  useEffect(() => {
    const fetchComments = async () => {
      if (!influencerId) {
        setComments(placeholderComments);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch('http://127.0.0.1:8000/Videos');

        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }

        const data = await response.json();

        const filteredComments = data
          .filter((item) => item.influencer_id === influencerId)
          .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
          .slice(0, 4) // Pull 6 comments
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
              comment: item.comment || 'No Comment Available',
              title: item.title || 'No Title',
              videoUrl: item.url || '#',
              commentDate: item.date,
              sentimentScore,
              sentimentClass,
            };
          });

        setComments(
          filteredComments.length > 0 ? filteredComments : placeholderComments
        );
      } catch (err) {
        console.error('Error fetching comments:', err);
        setError('Failed to load comments');
        setComments(placeholderComments);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [influencerId]);

  if (loading) return <div className="comments-loading">Loading...</div>;
  if (error) return <div className="comments-error">{error}</div>;

  return (
    <div className="comments-section">
      {comments.map((item) => (
        <div key={item.id} className="comment-article">
          <div className="comment-article-box">
            {/* Title Box */}
            <div className="title-box">
              <h4 className="comment-title">{item.title}</h4>
            </div>

            {/* Comment Text Box */}
            <div className="comment-text-box">
              <blockquote className="comment-text">"{item.comment}"</blockquote>
            </div>

            {/* Sentiment Score Box */}
            <div className="sentiment-box">
              <span className="sentiment-label">Sentiment Score:</span>
              <span className={`sentiment-score ${item.sentimentClass}`}>
                {item.sentimentScore}/10
              </span>
            </div>

            {/* View Video Button */}
            {item.videoUrl && item.videoUrl !== '#' && (
              <a
                href={item.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="read-more-button"
                aria-label={`View video titled ${item.title}`}
              >
                View Video
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentComments;
