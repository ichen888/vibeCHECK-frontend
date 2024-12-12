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

  const [voteCount, setVoteCount] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [intendedVoteType, setIntendedVoteType] = useState(null);

  useEffect(() => {
    console.log('Vote data updated:', voteData);
  }, [voteData]);

  const fetchVoteData = async () => {
    try {
      console.log('Fetching votes for influencer:', influencerId);
      const response = await fetch(`https://vibecheck-backend-57495040685.us-central1.run.app/Votes/${influencerId}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          const createResponse = await fetch('https://vibecheck-backend-57495040685.us-central1.run.app/Votes', {
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
      setVoteData({
        good_vote: Number(data[2]),
        bad_vote: Number(data[3])
      });
    } catch (error) {
      console.error('Fetch error:', error);
      setMessage('Error loading votes');
    }
  };

  const submitVote = async (isGoodVote) => {
    setLoading(true);
    setMessage('Processing vote...');

    try {
      console.log('Submitting vote:', isGoodVote ? 'good' : 'bad');
      const voteUpdate = {
        good_vote: isGoodVote ? 1 : 0,
        bad_vote: isGoodVote ? 0 : 1
      };

      const response = await fetch(`https://vibecheck-backend-57495040685.us-central1.run.app/Votes/${influencerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(voteUpdate)
      });

      if (!response.ok) {
        throw new Error('Failed to update vote');
      }

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

  const handleVoteClick = (isGoodVote) => {
    if (voteCount >= 6) {
      setIntendedVoteType(isGoodVote ? 'good' : 'bad');
      setShowConfirmation(true);
    } else {
      setVoteCount(voteCount + 1);
      submitVote(isGoodVote);
    }
  };

  const handleConfirmation = (confirmed) => {
    setShowConfirmation(false);
    if (confirmed && intendedVoteType !== null) {
      // If user says "Yes", submit the vote and reset the voteCount
      submitVote(intendedVoteType === 'good');
      setVoteCount(0); // reset vote count after confirmation
    }
    setIntendedVoteType(null);
  };

  useEffect(() => {
    if (influencerId) {
      fetchVoteData();
    }
  }, [influencerId]);

  const totalVotes = Number(voteData.good_vote) + Number(voteData.bad_vote);
  const goodPercentage = totalVotes ? Math.round((voteData.good_vote / totalVotes) * 100) : 50;
  const badPercentage = totalVotes ? Math.round((voteData.bad_vote / totalVotes) * 100) : 50;

  return (
    <div style={{ padding: '20px', position: 'relative' }}>
      {message && (
        <div style={{
          padding: '10px',
          marginBottom: '10px',
          backgroundColor: loading ? '#e6ac00' : message.includes('Error') ? '#cc0000' : '#006400',
          borderRadius: '5px',
          textAlign: 'center',
          color: '#fff'
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
            onClick={() => handleVoteClick(true)}
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
            onClick={() => handleVoteClick(false)}
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

      {showConfirmation && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999
        }}>
          <div style={{
            backgroundColor: '#ffeb3b',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center',
            maxWidth: '300px',
            color: '#000'
          }}>
            <img 
              src="https://www.spam.com/wp-content/uploads/2019/08/image-product_spam-classic-7oz.png" 
              alt="Spam Alert" 
              style={{ width: '200px', height: '200px', marginBottom: '10px' }} 
            />
            <h3 style={{color: '#000'}}> Spam Alert! Are you sure you want to keep voting?</h3>
            <div style={{ marginTop: '20px' }}>
              <button 
                onClick={() => handleConfirmation(true)}
                style={{
                  padding: '10px 20px',
                  margin: '0 10px',
                  backgroundColor: '#4caf50',
                  color: '#000',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Yes
              </button>
              <button
                onClick={() => handleConfirmation(false)}
                style={{
                  padding: '10px 20px',
                  margin: '0 10px',
                  backgroundColor: '#f44336',
                  color: '#000',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VoteSection;
