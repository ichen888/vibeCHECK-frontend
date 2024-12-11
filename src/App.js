// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './Homepage';
import Profile from './Profile';

function App() {
  // Global state for holding the selected influencer ID
  const [influencerId, setInfluencerId] = useState(null);
  
  // Global state for refreshing the Vote
  const [voteRefresh, setVoteRefresh] = useState(0);

  // Function to update influencer ID when a user selects one
  const handleSelectInfluencer = (id) => {
    setInfluencerId(id);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route for Homepage */}
          <Route 
            path="/" 
            element={<Homepage onSelectInfluencer={handleSelectInfluencer} />} 
          />

          {/* Route for Profile page */}
          <Route 
            path="/profile" 
            element={<Profile 
              influencerId={influencerId} 
              voteRefresh={voteRefresh}
              onVoteSubmitted={handleVoteSubmitted}
              />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;