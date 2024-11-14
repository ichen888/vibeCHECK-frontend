import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; // For navigation back to homepage
import "./Profile.css";
import SearchBar from './SearchBar';
import NewsSection from './NewsSection';
import RecentContent from './RecentContent';
import VoteSection from './VoteSection';

// Example list of influencers (you can replace this with actual API data)
// Make sure this array is defined before using it in useEffect
const influencers = [
  { id: 19, name: "Taylor Swift", vibeScore: 85, image: "https://cdn.prod.website-files.com/61e1db1c178256e11be974b0/63f91e8829fbd0aaf9de4cb8_htygWn9bAtmW8KF52-4zwtXFzTwiA9dfZ4Q_custom_logo.png" },
  { id: 2, name: "Kanye West", vibeScore: 60, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Kanye_West_at_the_2009_Tribeca_Film_Festival_%28crop_2%29.jpg/1200px-Kanye_West_at_the_2009_Tribeca_Film_Festival_%28crop_2%29.jpg" },
  { id: 3, name: "MrBeast", vibeScore: 95, image: "https://upload.wikimedia.org/wikipedia/commons/c/ce/MrBeast_2023_%28cropped%29.jpg" },
  // Add more influencers as needed
];

const recentContent = [
  { id: 1, title: "Post 1 - 56% Vibes", content: "Celebrity gains support with latest post." },
  { id: 2, title: "Post 2 - 44% Vibes", content: "Recent news affecting vibes significantly." },
  { id: 3, title: "Post 3 - 95% Vibes", content: "Celebrity's latest appearance is a major hit." }
];

const newsItems = [
  { id: 1, title: "Headline 1", content: "Celebrity gains support with latest post." },
  { id: 2, title: "Headline 2", content: "More news and updates on recent activities." },
  { id: 3, title: "Headline 3", content: "Celebrity facing challenges in recent news." }
];

function Profile({ influencerId }) {
  
  const [influencerData, setInfluencerData] = useState(null);
  
  const navigate = useNavigate(); // For navigation back to homepage

  // This effect runs when the component mounts or when influencerId changes
  useEffect(() => {
    if (influencerId) {
      // Simulate fetching influencer data based on influencerId
      const selectedInfluencer = influencers.find(influencer => influencer.id === influencerId);
      if (selectedInfluencer) {
        setInfluencerData(selectedInfluencer);
      }
    }
  }, [influencerId]);

  // Handle search result from SearchBar
  const handleSearchResult = (influencer) => {
    if (influencer) {
      setInfluencerData(influencer); // Update with new influencer data from search
    } else {
      setInfluencerData(null); // Clear if no match found
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>vibeCHECK</h1>
        {/* Pass handleSearchResult to SearchBar */}
        <SearchBar onSearchResult={handleSearchResult} />
      </header>

      <div className="profile">
        {influencerData ? (
          <>
            <img src={influencerData.image} alt={influencerData.name} />
            <h2>{influencerData.name}</h2>
            <div className="influencer-details">
              <p>ID: {influencerData.id}</p>
              <div className="vibe-score">
                Vibe Score: {influencerData.vibeScore}%
              </div>
            </div>
          </>
        ) : (
          <>
            <h2>No Influencer Selected</h2>
            <p>Please search for an influencer or go back and select one.</p>
          </>
        )}
      </div>

      {influencerData && (
        <>
          <div className="vibe-stats">
            <div>{influencerData.vibeScore}% Good Vibes</div>
            <div>{100 - influencerData.vibeScore}% Bad Vibes</div>
          </div>

          {/* Vote Section */}
          <VoteSection influencerId={influencerData.id} />

          {/* News Section */}
          <NewsSection influencerId={influencerData.id} />

          {/* Recent Content Section */}
          <RecentContent influencerId={influencerData.id} />
        </>
      )}

      {/* Button to return to homepage */}
      <button 
        className="return-home-button" 
        onClick={() => navigate('/')}
        style={{ marginTop: '20px', padding: '10px', fontSize: '16px' }}
      >
        Return to Homepage
      </button>
    </div>
  );
}

export default Profile;