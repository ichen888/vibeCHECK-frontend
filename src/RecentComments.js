import React, { useState, useEffect } from 'react';

const RecentComments = ({ influencerId }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const placeholderComments = [
        {
            id: 1,
            Comment: "Search for a celebrity to see what fans are saying",
            title: "No comments yet",
        },
        {
            id: 2,
            Comment: "Discover fan reactions and discussions",
            title: "Waiting for selection",
        },
        {
            id: 3,
            Comment: "See what people are talking about",
            title: "Select a celebrity above",
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
                const response = await fetch('http://127.0.0.1:8000/Videos');
                
                if (!response.ok) {
                    throw new Error('Failed to fetch comments');
                }

                const data = await response.json();

                const filteredComments = data
                    .filter(item => item.influencer_id === influencerId)
                    .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
                    .slice(0, 3)
                    .map(item => ({
                        id: item.id,
                        comment: item.comment || "No Comment Available", // Changed to match database field
                        title: item.title,
                        videoUrl: item.url,
                        commentDate: item.date,
                        commentCount: item.comment_count || 0
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
            {comments.map(item => (
                <div key={item.id} className="comment-card">
                    <div className="comment-main">
                        <blockquote className="comment-text">
                            "{item.comment}"
                        </blockquote>
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