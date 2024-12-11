import React, { useState, useEffect } from "react";

const ProgressBar = ({ goodPercentage }) => (
  <div
    style={{
      width: "100%",
      height: "20px",
      backgroundColor: "#e0e0de",
      borderRadius: "10px",
      margin: "20px 0",
      position: "relative",
    }}
  >
    <div
      style={{
        height: "100%",
        width: `${goodPercentage}%`,
        backgroundColor: "#4caf50",
        borderRadius: "inherit",
        transition: "width 0.5s ease-in-out",
      }}
    />
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        color: "#000",
        fontWeight: "bold",
      }}
    >
      {goodPercentage}%
    </div>
  </div>
);

function VoteSection({ influencerId, onVote }) {
  const [voteData, setVoteData] = useState({ good_vote: 0, bad_vote: 0 });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchVoteData = async () => {
    try {
      const response = await fetch(
        `https://vibecheck-backend-57495040685.us-central1.run.app/Votes/${influencerId}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          await fetch(
            "https://vibecheck-backend-57495040685.us-central1.run.app/Votes",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ influencer_id: influencerId, good_vote: 0, bad_vote: 0 }),
            }
          );
          setVoteData({ good_vote: 0, bad_vote: 0 });
        }
        return;
      }

      const data = await response.json();
      setVoteData({ good_vote: Number(data[2]), bad_vote: Number(data[3]) });
    } catch (error) {
      setMessage("Error loading votes");
    }
  };

  const handleVote = async (isGoodVote) => {
    setLoading(true);
    setMessage("Processing vote...");

    try {
      const voteUpdate = {
        good_vote: isGoodVote ? 1 : 0,
        bad_vote: isGoodVote ? 0 : 1,
      };

      const response = await fetch(
        `https://vibecheck-backend-57495040685.us-central1.run.app/Votes/${influencerId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(voteUpdate),
        }
      );

      if (!response.ok) throw new Error("Failed to update vote");

      await fetchVoteData();
      setMessage("Vote recorded!");

      if (onVote) {
        console.log("Triggering onVote callback...");
        onVote(); // Optional callback
      }
    } catch (error) {
      setMessage("Error submitting vote");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  useEffect(() => {
    if (influencerId) fetchVoteData();
  }, [influencerId]);

  const totalVotes = voteData.good_vote + voteData.bad_vote;
  const goodPercentage = totalVotes ? Math.round((voteData.good_vote / totalVotes) * 100) : 50;
  const badPercentage = totalVotes ? Math.round((voteData.bad_vote / totalVotes) * 100) : 50;

  return (
    <div style={{ padding: "20px" }}>
      {message && (
        <div
          style={{
            padding: "10px",
            marginBottom: "10px",
            backgroundColor: message.includes("Error") ? "#cc0000" : "#006400",
            borderRadius: "5px",
            textAlign: "center",
            color: "#fff",
          }}
        >
          {message}
        </div>
      )}

      <ProgressBar goodPercentage={goodPercentage} />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <span style={{ color: "#4caf50", fontSize: "18px" }}>{goodPercentage}% Good</span>
        <div>
          <button
            onClick={() => handleVote(true)}
            disabled={loading}
            style={{
              backgroundColor: "#4caf50",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              margin: "0 10px",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            Good Vibes
          </button>
          <button
            onClick={() => handleVote(false)}
            disabled={loading}
            style={{
              backgroundColor: "#f44336",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              margin: "0 10px",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            Bad Vibes
          </button>
        </div>
        <span style={{ color: "#f44336", fontSize: "18px" }}>{badPercentage}% Bad</span>
      </div>
    </div>
  );
}

export default VoteSection;
