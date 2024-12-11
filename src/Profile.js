import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./Profile.css";
import NewsSection from './NewsSection';
import RecentComments from './RecentComments';
import VoteSection from './VoteSection';
import VibeChart from './VibeChart';

function Profile({ influencerId }) {
    const [influencerData, setInfluencerData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();
    const [vibeScoreHistory, setVibeScoreHistory] = useState([]);

    useEffect(() => {
        const fetchInfluencerData = async () => {
            if (!influencerId) {
                console.log('No influencerId provided. Navigating back to homepage.');
                navigate('/');
                return;
            }

            try {
                console.log('Fetching influencer data...');
                const response = await fetch('https://vibecheck-backend-57495040685.us-central1.run.app/Influencers');
                if (!response.ok) {
                    throw new Error('Failed to fetch influencer data');
                }

                const data = await response.json();
                console.log('Fetched influencer data:', data);

                const selectedInfluencer = data.find(inf => inf.id === influencerId);
                if (selectedInfluencer) {
                    console.log('Selected Influencer:', selectedInfluencer);
                    setInfluencerData(selectedInfluencer);
                } else {
                    console.log('Influencer not found. Navigating back to homepage.');
                    navigate('/');
                }

                console.log('Fetching vibe score history...');
                const vibeScoreResponse = await fetch(
                    `https://vibecheck-backend-57495040685.us-central1.run.app/VibeScoreHistory?influencerId=${influencerId}`
                );
                if (!vibeScoreResponse.ok) throw new Error('Failed to fetch vibe score history');

                const vibeScoreData = await vibeScoreResponse.json();
                console.log('Fetched vibe score history:', vibeScoreData);

                setVibeScoreHistory(
                    vibeScoreData
                        .sort((a, b) => new Date(a.recorded_at) - new Date(b.recorded_at))
                        .slice(-10)
                );
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to load influencer data');
            } finally {
                setLoading(false);
            }
        };

        fetchInfluencerData();
    }, [influencerId, navigate]);

    const handleReturnHome = () => {
        console.log('Return to homepage button clicked.');
        navigate('/');
    };

    const handlePopupOpen = () => {
        console.log('Popup opened.');
        setShowPopup(true);
    };

    const handlePopupClose = () => {
        console.log('Popup closed.');
        setShowPopup(false);
    };

    if (!influencerId) {
        console.log('No influencerId provided. Navigating back to homepage.');
        navigate('/');
        return null;
    }

    if (loading) {
        console.log('Page is loading...');
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        console.error('Error encountered:', error);
        return <div className="error">{error}</div>;
    }

    if (!influencerData) {
        console.log('No influencer data found.');
        return null;
    }

    // Calculate vibePercent
    const vibePercent = parseInt((influencerData.vibe_score * 100).toFixed(0), 10);
    console.log('Calculated vibePercent:', vibePercent);

    // Helper function to determine the background color class
    const getVibeScoreClass = (percent) => {
        console.log('Vibe Percent passed to getVibeScoreClass:', percent);
        if (percent < 50) return 'red';
        if (percent == 50) return 'yellow';
        if (percent > 50) return 'green';
    };

    const assignedClass = getVibeScoreClass(vibePercent);
    console.log('Assigned Class:', assignedClass);
    console.log('ClassName Applied:', `vibe-score ${assignedClass}`); // Debugging the applied class


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
                            <div className={`vibe-score ${assignedClass}`}>
                                VibeScore: {vibePercent}%
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
                <VoteSection 
                    influencerId={influencerData.id} 
                    currentVibeScore={influencerData.vibe_score}
                />
                <div className="about-section">
                    <h2>About {influencerData.name}:</h2>
                    <p className="bio-text">{influencerData.bio}</p>
                </div>

                <div className="chart-container">
                    <VibeChart
                        data={vibeScoreHistory.map(item => item.vibe_score * 100)}
                        labels={vibeScoreHistory.map(item => new Date(item.recorded_at).toLocaleString())}
                    />
                </div>
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
