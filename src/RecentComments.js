import React, { useState, useEffect } from 'react';

const RecentComments = ({ influencerId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const placeholderComments = [
    {
      id: 1,
      comment: "Search for a celebrity to see what fans are saying",
      title: "No comments yet",
      sentiment_score: 0,
    },
    {
      id: 2,
      comment: "Discover fan reactions and discussions",
      title: "Waiting for selection",
      sentiment_score: 0,
    },
    {
      id: 3,
      comment: "See what people are talking about",
      title: "Select a celebrity above",
      sentiment_score: 0,
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
          .slice(0, 3)
          .map((item) => ({
            id: item.id,
            comment: item.comment || 'No Comment Available',
            title: item.title,
            videoUrl: item.url,
            commentDate: item.date,
            // Adjust sentimentScore formatting
            sentimentScore:
              item.sentiment_score !== null && item.sentiment_score !== undefined
                ? Number(item.sentiment_score) % 1 === 0
                  ? Number(item.sentiment_score).toFixed(0)
                  : Number(item.sentiment_score).toFixed(1)
                : 'N/A',
          }));

        setComments(filteredComments.length > 0 ? filteredComments : placeholderComments);
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="comments-section">
      <h2>Recent Comments</h2>
      {comments.map((item) => (
        <div key={item.id} className="comment-card">
          <div className="comment-main">
            <blockquote className="comment-text">"{item.comment}"</blockquote>
            <div className="sentiment-score">
              Sentiment Score: {item.sentimentScore}/10
            </div>
          </div>
          <div className="video-details">
            <h4>From Video: {item.title}</h4>
            {item.videoUrl && (
              <a
                href={item.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="video-link"
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
