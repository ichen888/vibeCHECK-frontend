import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./Profile.css";
import NewsSection from './NewsSection';
import RecentComments from './RecentComments';
import VoteSection from './VoteSection';

function Profile({ influencerId }) {
    const [influencerData, setInfluencerData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInfluencerData = async () => {
            if (!influencerId) {
                navigate('/');
                return;
            }

            try {
                const response = await fetch('http://127.0.0.1:8000/Influencers');
                if (!response.ok) {
                    throw new Error('Failed to fetch influencer data');
                }

                const data = await response.json();
                const selectedInfluencer = data.find(inf => inf.id === influencerId);
                
                if (selectedInfluencer) {
                    setInfluencerData(selectedInfluencer);
                } else {
                    navigate('/');
                }
            } catch (err) {
                console.error('Error:', err);
                setError('Failed to load influencer data');
            } finally {
                setLoading(false);
            }
        };

        fetchInfluencerData();
    }, [influencerId, navigate]);

    const handleReturnHome = () => {
        navigate('/');
    };

    if (!influencerId) {
        navigate('/');
        return null;
    }

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!influencerData) return null;

    return (
        <div className="profile-container">
            <button onClick={handleReturnHome} className="return-home-button">
                Return to Homepage
            </button>
            
            <div className="profile-content">
                <div className="profile-header">
                    <img 
                        src={influencerData.image_url} 
                        alt={influencerData.name} 
                        className="profile-image"
                    />
                    <div className="profile-info">
                        <h1>{influencerData.name}</h1>
                        <div className="vibe-score">
                            <h2>{influencerData.vibe_score}% Good Vibes</h2>
                        </div>
                    </div>
                </div>

                <VoteSection 
                    influencerId={influencerData.id} 
                    currentVibeScore={influencerData.vibe_score}
                />

                <div className="content-sections">
                    <div className="news-container">
                        <h2>Recent News</h2>
                        <NewsSection influencerId={influencerData.id} />
                    </div>
                    <div className="comments-container">
                        <h2>Recent Comments</h2>
                        <RecentComments influencerId={influencerData.id} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;