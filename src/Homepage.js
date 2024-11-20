import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";

const influencers = [
  { id: 1, name: "Taylor Swift", image: "https://cdn.prod.website-files.com/61e1db1c178256e11be974b0/63f91e8829fbd0aaf9de4cb8_htygWn9bAtmW8KF52-4zwtXFzTwiA9dfZ4Q_custom_logo.png" },
  { id: 2, name: "Kanye West", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Kanye_West_at_the_2009_Tribeca_Film_Festival_%28crop_2%29.jpg/1200px-Kanye_West_at_the_2009_Tribeca_Film_Festival_%28crop_2%29.jpg" },
  { id: 3, name: "MrBeast", image: "https://upload.wikimedia.org/wikipedia/commons/c/ce/MrBeast_2023_%28cropped%29.jpg" },
  { id: 4, name: "The Weeknd", image: "https://upload.wikimedia.org/wikipedia/commons/9/95/The_Weeknd_Cannes_2023.png" },
  { id: 5, name: "Justin Bieber", image: "https://media.gettyimages.com/id/452816718/photo/los-angeles-ca-singer-songwriter-justin-bieber-attends-the-2014-young-hollywood-awards-brought.jpg?s=612x612&w=gi&k=20&c=w6Ae-QIytODjSoZPkJ7xLxhxMjp2qn51weFqKjTYgRM=" },
  { id: 6, name: "Jake Paul", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtkPLMehAYn8Hr2rJr9Wro_yPXJF5obZgUfA&s" },
  { id: 7, name: "Cardi B", image: "https://cdn.britannica.com/85/229185-050-3CC1C44E/Cardi-B-2019.jpg" },
  { id: 8, name: "Drake", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxQb5ghh6R_tvOSTk_HfwIKcN3gXKlvWP2pQ&s" },
  { id: 9, name: "P Diddy / Diddy", image: "https://podcast.posttv.com/series/20240410/t_1712785817380_name_diddy_pic.jpeg" },
  { id: 10, name: "Rihanna", image: "https://assets.vogue.com/photos/63e67c2653cf7705e1e06f3a/4:3/w_2560%2Cc_limit/GettyImages-1246958447.jpg" },
  { id: 11, name: "Billie Eilish", image: "https://i.iheart.com/v3/catalog/artist/31132274?ops=fit(720%2C720)" },
  { id: 12, name: "Will Smith", image: "https://hips.hearstapps.com/hmg-prod/images/will-smith-attends-varietys-creative-impact-awards-and-10-directors-to-watch-brunch-at-the-parker-palm-springs-on-january-3-2016-in-palm-springs-california-photo-by-jerod-harrisgetty-images.jpg" },
  { id: 13, name: "Dwayne Johnson", image: "https://m.media-amazon.com/images/M/MV5BOWUzNzIzMzQtNzMxYi00OWRiLTlhZjEtZTRjYWVkYzI4ZjMwXkEyXkFqcGc@._V1_.jpg" },
  { id: 14, name: "Ariana Grande", image: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Ariana_Grande_-_Vogue_2024.png" },
  { id: 15, name: "Selena Gomez", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Selena_Gomez_at_the_2024_Toronto_International_Film_Festival_10_%28cropped%29.jpg/1024px-Selena_Gomez_at_the_2024_Toronto_International_Film_Festival_10_%28cropped%29.jpg" },
  { id: 16, name: "Casey Neistat", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Casey_Neistat_%40_SXSW_2017_%2833229303282%29_%28cropped%29.jpg/1024px-Casey_Neistat_%40_SXSW_2017_%2833229303282%29_%28cropped%29.jpg" },
  { id: 17, name: "Joe Rogan", image: "https://i.guim.co.uk/img/media/45727c83d4615bd841d191bf4329a019ea37cd2f/1_335_2069_1242/master/2069.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=9abc3c620f00b6c4e63be993cc98e3d7" },
  { id: 18, name: "Chris Brown", image: "https://static.standard.co.uk/2023/11/08/13/09/Chris%20Brown-xasooju6.jpeg?trim=0,52,85,56&quality=75&auto=webp&width=1000" },
  { id: 19, name: "Lady Gaga", image: "https://hips.hearstapps.com/hmg-prod/images/lady-gaga-attends-the-64th-annual-grammy-awards-at-mgm-news-photo-1727455427.jpg?crop=1.00xw:0.667xh;0,0.0477xh&resize=640:*" },
  { id: 20, name: "Kai Cenat", image: "https://www.hollywoodreporter.com/wp-content/uploads/2023/02/D.jpg?w=1296&h=730&crop=1" },
];

const Homepage = ({ onSelectInfluencer }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [blurContent, setBlurContent] = useState(false);
  const [startFadeOut, setStartFadeOut] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const hasSeenOverlay = sessionStorage.getItem("hasSeenOverlay");

    if (!hasSeenOverlay) {
      setShowOverlay(true);
      setBlurContent(true);

      sessionStorage.setItem("hasSeenOverlay", "true");

      setTimeout(() => {
        setStartFadeOut(true);
      }, 1000);
    }
  }, []);

  const handleAnimationEnd = () => {
    setBlurContent(false);
    setShowOverlay(false);
  };

  const handleClick = (influencer) => {
    onSelectInfluencer(influencer.id);
    navigate("/profile");
  };

  const handlePopupOpen = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  return (
    <div className="homepage-container">
      {/* Header with Logo and Info Button */}
      <div className="header">
        <div className="logo-section">
          <div className="VibeCHECK-logo">VibeCHECK</div>
          <div className="creators">
            Created by Kyrie Park, Harsh Sahu, Ian Chen, & Jessica Yu
          </div>
        </div>
        <button className="info-button" onClick={handlePopupOpen}>
          What is VibeCHECK
        </button>
      </div>

      {/* Welcome Overlay */}
      {showOverlay && (
        <div
          className={`welcome-overlay ${startFadeOut ? "fade-out" : ""}`}
          onAnimationEnd={handleAnimationEnd}
        >
          <h1>Welcome to VibeCHECK!</h1>
        </div>
      )}

      {/* Background Content */}
      <div className={`content-container ${blurContent ? "blur" : ""}`}>
        <h1>Select an Influencer</h1>
        <div className="influencer-grid">
          {influencers.map((influencer) => (
            <div
              key={influencer.id}
              className="influencer-card"
              onClick={() => handleClick(influencer)}
            >
              <img
                src={influencer.image}
                alt={influencer.name}
                className="influencer-image"
              />
              <p>{influencer.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Popup for "What is VibeCHECK" */}
      {showPopup && (
        <div className="popup-overlay" onClick={handlePopupClose}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={handlePopupClose}>
              &times;
            </button>
            <p>
              VibeCHECK is a web-based application that allows users to analyze
              influencer behavior and public sentiment. Users can view content
              related to influencers, from YouTube videos & comments and TMZ
              news articles, and vote whether the influencer's vibe is 'good' or
              'bad.' The system analyzes scraped data from YouTube and TMZ and
              stores it in a MySQL database. Users will be able to vote on
              influencer behavior based on publicly available content and
              comments in the future. Our algorithm then returns a score that
              gauges the "vibe" of an influencer.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;