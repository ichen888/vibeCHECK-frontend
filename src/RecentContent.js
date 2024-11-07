// RecentContent.js
import React, { useState, useEffect } from 'react';

const RecentContent = ({ influencerId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Placeholder comments for when no influencer is selected
  const placeholderComments = [
    {
      id: 1,
      title: "Welcome to Comments",
      content: "Search for a celebrity to see what people are saying."
    },
    {
      id: 2,
      title: "Community Feedback",
      content: "Join the conversation and share your thoughts."
    },
    {
      id: 3,
      title: "Recent Discussions",
      content: "Discover the latest opinions and reactions."
    }
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
        const response = await fetch('http://localhost:8000/comments');
        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }
        const data = await response.json();

        // Filter comments by influencer_id and get the most recent 3
        const filteredComments = data
          .filter(comment => comment.influencer_id === influencerId)
          .sort((a, b) => b.id - a.id)
          .slice(0, 3)
          .map(comment => ({
            id: comment.id,
            title: `Comment #${comment.id}`,
            content: comment.content
          }));

        setComments(filteredComments.length > 0 ? filteredComments : placeholderComments);
      } catch (err) {
        console.error('Error fetching comments:', err);
        setError('Failed to load comments');
        setComments(placeholderComments); // Show placeholder content on error
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [influencerId]);

  if (loading) return <div>Loading comments...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <section className="content-section">
      <h3>Recent Comments</h3>
      {comments.map((comment) => (
        <div key={comment.id} className="content-item">
          <h4>{comment.title}</h4>
          <p>{comment.content}</p>
        </div>
      ))}
    </section>
  );
};

export default RecentContent;
