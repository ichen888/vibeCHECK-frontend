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
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInfluencerData = async () => {
            if (!influencerId) {
                navigate('/');
                return;
            }

            try {
                const response = await fetch('https://vibecheck-backend-57495040685.us-central1.run.app/Influencers');
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

    const handlePopupOpen = () => {
        setShowPopup(true);
    };

    const handlePopupClose = () => {
        setShowPopup(false);
    };

    if (!influencerId) {
        navigate('/');
        return null;
    }

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!influencerData) return null;

    const vibePercent = parseInt((influencerData.vibe_score * 100).toFixed(0), 10);

    return (
        <div className="profile-container">
            <div className="button-container">
                <button onClick={handleReturnHome} className="return-home-button">
                    Return to Homepage
                </button>
                <button onClick={handlePopupOpen} className="read-before-use-button">
                    Read before use!
                </button>
            </div>

            {showPopup && (
                <div className="popup-overlay" onClick={handlePopupClose}>
                    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-button" onClick={handlePopupClose}>
                            &times;
                        </button>
                        <p>
                            VibeCHECK gives celebrity profiles that users can look at to vote on their recent news and comments in the media. The recent news and comments are listed, where we've ran each news article title or comment through our sentiment analysis program. A score is given between 1-10 that provides our algorithm's analysis of the positive or negative mood of each source. Based on that information, users are welcome to vote Good or Bad, which then gets aggregated into our general score of Good or Bad per celebrity.
                        </p>
                    </div>
                </div>
            )}

            <div className="profile-content">
                <div className="profile-header">
                    <img 
                        src={influencerData.image_url} 
                        alt={influencerData.name} 
                        className="profile-image"
                    />
                    <div className="profile-info">
                        <h1>{influencerData.name}</h1>
                        <div className="info-section">
                            <div className="vibe-score">
                                <h2>VibeScore: {vibePercent}%</h2>
                            </div>
                            <div className="social-section">
                                <h3>Find {influencerData.name} on Social Media:</h3>
                                <div className="social-links">
                                    <a 
                                        href={`https://${influencerData.instagram}`} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="social-link"
                                    >
                                        <img 
                                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/768px-Instagram_icon.png" 
                                            alt="Instagram" 
                                            className="social-icon"
                                        />
                                    </a>
                                    <a 
                                        href={`https://${influencerData.youtube}`} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="social-link"
                                    >
                                        <img 
                                            src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png" 
                                            alt="YouTube" 
                                            className="social-icon"
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="about-section">
                    <h2>About {influencerData.name}:</h2>
                    <p className="bio-text">{influencerData.bio}</p>
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
