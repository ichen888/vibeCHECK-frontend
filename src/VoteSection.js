// VoteSection.js
import React, { useState, useEffect } from 'react';

export default function VoteSection({ influencerId }) {
    const [vibeStats, setVibeStats] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasVoted, setHasVoted] = useState(false);

    useEffect(() => {
        const fetchVibeStats = async () => {
            if (!influencerId) {
                setVibeStats(null);
                return;
            }
            try {
                setLoading(true);
                const response = await fetch(`http://127.0.0.1:8000/Influencers`);
                if (!response.ok) {
                    throw new Error('Failed to fetch vibe stats');
                }
                const data = await response.json();
                const influencer = data.find(inf => inf.id === influencerId);
                if (influencer) {
                    setVibeStats({
                        goodVibes: influencer.vibe_score,
                        badVibes: 100 - influencer.vibe_score
                    });
                }
            } catch (err) {
                console.error('Error fetching vibe stats:', err);
                setError('Failed to load vibe statistics');
            } finally {
                setLoading(false);
            }
        };

        fetchVibeStats();
    }, [influencerId]);

    const handleVote = async (isGoodVibe) => {
        if (!influencerId || hasVoted) return;

        try {
            setLoading(true);
            const response = await fetch(`http://127.0.0.1:8000/Votes/${influencerId}/${isGoodVibe ? 'good' : 'bad'}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                const errorData = await response.text();
                console.error('Vote failed:', errorData);
                throw new Error(`Failed to submit vote: ${response.status}`);
            }

            const statsResponse = await fetch(`http://127.0.0.1:8000/Influencers`);
            const data = await statsResponse.json();
            const updatedInfluencer = data.find(inf => inf.id === influencerId);
            
            if (updatedInfluencer) {
                setVibeStats({
                    goodVibes: updatedInfluencer.vibe_score,
                    badVibes: 100 - updatedInfluencer.vibe_score
                });
                setHasVoted(true);
            }

        } catch (err) {
            console.error('Error:', err);
            setError('Failed to submit vote');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="vote-section-loading">Loading...</div>;
    if (error) return <div className="vote-section-error">{error}</div>;
    if (!vibeStats) return null;

    return (
      <div className="vote-section">
          <div className="vibe-bar">
              <div 
                  className="good-vibes-bar" 
                  style={{ width: `${vibeStats.goodVibes}%` }}
              >
              </div>
              <div 
                  className="bad-vibes-bar" 
                  style={{ width: `${vibeStats.badVibes}%` }}
              >
              </div>
          </div>
          
          <div className="vote-container">
              <div className="good-vibes-stat">
                  <span className="stat-value">{vibeStats.goodVibes}%</span>
                  <span className="stat-label">Good Vibes</span>
              </div>
              
              <div className="vote-buttons">
                  <button 
                      className={`vote-button good-vibe ${hasVoted ? 'voted' : ''}`}
                      onClick={() => handleVote(true)}
                      disabled={hasVoted}
                  >
                      Good Vibes
                  </button>
                  <button 
                      className={`vote-button bad-vibe ${hasVoted ? 'voted' : ''}`}
                      onClick={() => handleVote(false)}
                      disabled={hasVoted}
                  >
                      Bad Vibes
                  </button>
              </div>

              <div className="bad-vibes-stat">
                  <span className="stat-value">{vibeStats.badVibes}%</span>
                  <span className="stat-label">Bad Vibes</span>
              </div>
          </div>
          {hasVoted && (
              <div className="vote-message">
                  Thanks for voting!
              </div>
          )}
      </div>
  );
}