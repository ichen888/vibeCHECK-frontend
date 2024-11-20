import React, { useState, useEffect } from 'react';

const ProgressBar = ({ goodPercentage }) => {
    return (
      <div style={{
        width: '100%',
        height: '20px',
        backgroundColor: '#e0e0de',
        borderRadius: '10px',
        margin: '20px 0',
        position: 'relative'
      }}>
        <div style={{
          height: '100%',
          width: `${goodPercentage}%`,
          backgroundColor: '#4caf50',
          borderRadius: 'inherit',
          transition: 'width 0.5s ease-in-out'
        }} />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#000',
          fontWeight: 'bold'
        }}>
          {goodPercentage}%
        </div>
      </div>
    );
  };  

function VoteSection({ influencerId }) {
  const [voteData, setVoteData] = useState({
    good_vote: 0,
    bad_vote: 0
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Debug logging for state changes
  useEffect(() => {
    console.log('Vote data updated:', voteData);
  }, [voteData]);

  const fetchVoteData = async () => {
    try {
      console.log('Fetching votes for influencer:', influencerId);
      const response = await fetch(`http://127.0.0.1:8000/Votes/${influencerId}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          const createResponse = await fetch('http://127.0.0.1:8000/Votes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              influencer_id: influencerId,
              good_vote: 0,
              bad_vote: 0
            })
          });
          if (createResponse.ok) {
            setVoteData({ good_vote: 0, bad_vote: 0 });
          }
          return;
        }
        throw new Error('Failed to fetch votes');
      }
  
      const data = await response.json();
      console.log('Received vote data:', data);
      
      // Fix the data parsing - assuming the array format is [id, influencer_id, good_vote, bad_vote]
      setVoteData({
        good_vote: Number(data[2]), // good_vote is at index 2
        bad_vote: Number(data[3])   // bad_vote is at index 3
      });
    } catch (error) {
      console.error('Fetch error:', error);
      setMessage('Error loading votes');
    }
  };
  
  const handleVote = async (isGoodVote) => {
    setLoading(true);
    setMessage('Processing vote...');

    try {
      console.log('Submitting vote:', isGoodVote ? 'good' : 'bad');
      const voteUpdate = {
        good_vote: isGoodVote ? 1 : 0,
        bad_vote: isGoodVote ? 0 : 1
      };

      const response = await fetch(`http://127.0.0.1:8000/Votes/${influencerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(voteUpdate)
      });

      if (!response.ok) {
        throw new Error('Failed to update vote');
      }

      // Important: Fetch the updated vote data immediately after successful vote
      await fetchVoteData();
      setMessage('Vote recorded!');
    } catch (error) {
      console.error('Vote error:', error);
      setMessage('Error submitting vote');
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  // Fetch initial vote data
  useEffect(() => {
    if (influencerId) {
      fetchVoteData();
    }
  }, [influencerId]);

  const totalVotes = Number(voteData.good_vote) + Number(voteData.bad_vote);
  const goodPercentage = totalVotes ? Math.round((voteData.good_vote / totalVotes) * 100) : 50;
  // Add badPercentage calculation
  const badPercentage = totalVotes ? Math.round((voteData.bad_vote / totalVotes) * 100) : 50;

  return (
    <div style={{ padding: '20px' }}>
      {message && (
        <div style={{
          padding: '10px',
          marginBottom: '10px',
          backgroundColor: loading ? '#fff3cd' : message.includes('Error') ? '#f8d7da' : '#d4edda',
          borderRadius: '5px',
          textAlign: 'center'
        }}>
          {message}
        </div>
      )}
      
      <ProgressBar goodPercentage={goodPercentage} />
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginTop: '20px'
      }}>
        <span style={{ fontSize: '18px', color: '#4caf50', minWidth: '100px', textAlign: 'center' }}>
          {goodPercentage}% Good
        </span>
        
        <div>
          <button
            onClick={() => handleVote(true)}
            disabled={loading}
            style={{
              padding: '10px 20px',
              margin: '0 10px',
              backgroundColor: '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1
            }}
          >
            Good Vibes
          </button>
          
          <button
            onClick={() => handleVote(false)}
            disabled={loading}
            style={{
              padding: '10px 20px',
              margin: '0 10px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1
            }}
          >
            Bad Vibes
          </button>
        </div>
        
        <span style={{ fontSize: '18px', color: '#f44336', minWidth: '100px', textAlign: 'center' }}>
          {badPercentage}% Bad
        </span>
      </div>
    </div>
  );
}

export default VoteSection;