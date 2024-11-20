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
        const fetchNews = async () => {
            if (!influencerId) {
                setNewsItems(placeholderNews);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await fetch('http://127.0.0.1:8000/News');
                
                if (!response.ok) {
                    throw new Error('Failed to fetch news');
                }

                const data = await response.json();

                // Filter news by influencer_id and get the most recent 3 items
                const filteredNews = data
                    .filter(item => item.influencer_id === influencerId)
                    .sort((a, b) => b.id - a.id)
                    .slice(0, 3)
                    .map(item => ({
                        id: item.id,
                        title: item.title,
                        content: item.content,
                        url: item.url
                    }));

                setNewsItems(filteredNews.length > 0 ? filteredNews : placeholderNews);
            } catch (err) {
                console.error('Error fetching news:', err);
                setError('Failed to load news content');
                setNewsItems(placeholderNews);
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
            {newsItems.map(item => (
                <div key={item.id} className="news-item">
                    <h3>{item.title}</h3>
                    <p>{item.content}</p>
                    {item.url && (
                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                            Read More
                        </a>
                    )}
                </div>
            ))}
        </div>
    );
};

export default NewsSection;