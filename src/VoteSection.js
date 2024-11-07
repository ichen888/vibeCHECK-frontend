// VoteSection.js
import React, { useState, useEffect } from 'react';

const VoteSection = ({ influencerId }) => {
  const [vibeStats, setVibeStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVibeStats = async () => {
      if (!influencerId) {
        setVibeStats(null);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8000/influencers/${influencerId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch vibe stats');
        }
        const data = await response.json();
        setVibeStats({
          goodVibes: data.vibe_score,
          badVibes: 100 - data.vibe_score
        });
      } catch (err) {
        console.error('Error fetching vibe stats:', err);
        setError('Failed to load vibe statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchVibeStats();
  }, [influencerId]);

  const handleGoodVibe = async () => {
    // Future implementation for API call
    console.log('Good vibe voted for influencer:', influencerId);
  };

  const handleBadVibe = async () => {
    // Future implementation for API call
    console.log('Bad vibe voted for influencer:', influencerId);
  };

  return (
    <div className="vibe-section-container">
      {loading && <div className="loading">Loading vibe stats...</div>}
      {error && <div className="error">{error}</div>}
      
      <div className="vibe-section">
        <div className="vibe-stat">
          {vibeStats ? (
            <>
              {vibeStats.goodVibes}% <br /> Good Vibes
            </>
          ) : (
            <>
              --% <br /> Good Vibes
            </>
          )}
        </div>

        <div className="vote-buttons">
          <button 
            onClick={handleGoodVibe} 
            disabled={!influencerId || loading}
            className="vibe-button good-vibe"
          >
            Good Vibes
          </button>
          <button 
            onClick={handleBadVibe} 
            disabled={!influencerId || loading}
            className="vibe-button bad-vibe"
          >
            Bad Vibes
          </button>
        </div>

        <div className="vibe-stat">
          {vibeStats ? (
            <>
              {vibeStats.badVibes}% <br /> Bad Vibes
            </>
          ) : (
            <>
              --% <br /> Bad Vibes
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoteSection;
