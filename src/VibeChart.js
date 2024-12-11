import React, { useEffect, useRef, useState } from "react";

const VibeChart = ({ influencerId }) => {
  const canvasRef = useRef(null);
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const fetchVibeScoreHistory = async () => {
      if (!influencerId) {
        console.log("No influencerId provided. Skipping fetch.");
        return;
      }

      console.log(`Fetching vibe score history for influencerId: ${influencerId}`);

      try {
        const response = await fetch(
          `https://vibecheck-backend-57495040685.us-central1.run.app/VibeScoreHistory`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch vibe score history");
        }

        const vibeScoreData = await response.json();
        console.log("Fetched VibeScoreHistory data:", vibeScoreData);

        // Filter by influencerId
        const filteredData = vibeScoreData.filter(
          (item) => item.influencer_id === influencerId
        );

        if (filteredData.length === 0) {
          console.warn("No data found for this influencerId.");
        }

        // Sort by recorded_at and get the last 10 updates
        const sortedData = filteredData
          .sort((a, b) => new Date(b.recorded_at) - new Date(a.recorded_at))
          .slice(0, 10)
          .reverse(); // Reverse to show the oldest first

        console.log("Sorted and filtered VibeScoreHistory (last 10):", sortedData);

        // Convert UTC to EST and format labels
        const extractedData = sortedData.map((item) => Math.max(0, item.vibe_score * 100));
        const extractedLabels = sortedData.map((item, index, array) => {
          const currentDate = new Date(item.recorded_at);

          // Convert UTC to EST
          // Convert UTC to EST for each timestamp
          const estDate = new Date(
            currentDate.toLocaleString("en-US", { timeZone: "America/New_York" })
          );


          const previousDate =
            index > 0
              ? new Date(
                  new Date(array[index - 1].recorded_at).toLocaleString(
                    "en-US",
                    { timeZone: "America/New_York" }
                  )
                )
              : null;

          // Format label: Include date only if it differs from the previous timestamp
          if (
            !previousDate ||
            estDate.toDateString() !== previousDate.toDateString()
          ) {
            return estDate.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            });
          } else {
            return estDate.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            });
          }
        });

        console.log("Extracted data for Y-axis (vibe scores):", extractedData);
        console.log("Extracted labels for X-axis (formatted to EST):", extractedLabels);

        setData(extractedData);
        setLabels(extractedLabels);
      } catch (error) {
        console.error("Error fetching vibe score history:", error);
      }
    };

    fetchVibeScoreHistory();
  }, [influencerId]);

  useEffect(() => {
    if (!data.length || !labels.length) {
      console.log("No data or labels to render chart.");
      return;
    }
  
    console.log("Rendering chart with data:", data);
    console.log("Rendering chart with labels:", labels);
  
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
  
    const width = 800;
    const height = 300;
    canvas.width = width;
    canvas.height = height;
  
    const padding = 70;
    const maxData = Math.max(...data, 1); // Prevent division by zero
    const minData = 0; // Y-axis starts at 0
    const avgData = data.reduce((sum, value) => sum + value, 0) / data.length; // Calculate average
  
    ctx.clearRect(0, 0, width, height);
  
    // Draw axes
    ctx.beginPath();
    ctx.moveTo(padding, height - padding); // Y-axis
    ctx.lineTo(padding, padding); // X-axis
    ctx.lineTo(width - padding, height - padding); // X-axis
    ctx.strokeStyle = "#ffffff";
    ctx.stroke();
  
    // Y-Axis Labels
    ctx.fillStyle = "#fff";
    ctx.font = "12px Arial";
    ctx.textAlign = "right";
    const yAxisSteps = 5;
    for (let i = 0; i <= yAxisSteps; i++) {
      const yValue = minData + ((maxData - minData) * i) / yAxisSteps;
      const y = height - padding - ((yValue - minData) / (maxData - minData)) * (height - 2 * padding);
      ctx.fillText(yValue.toFixed(2), padding - 10, y + 5);
    }
    ctx.save();
    ctx.translate(20, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = "center";
    ctx.fillText("Vibe Scores", 0, 0);
    ctx.restore();
  
    // X-Axis Labels
    ctx.textAlign = "center";
    labels.forEach((label, index) => {
      const x = padding + (index * (width - 2 * padding)) / (labels.length - 1);
      ctx.fillText(label, x, height - padding + 30);
    });
    ctx.fillText("Date & Time", width / 2, height - padding + 50);
  
    // Draw average line
    const avgY = height - padding - ((avgData - minData) / (maxData - minData)) * (height - 2 * padding);
    ctx.beginPath();
    ctx.moveTo(padding, avgY);
    ctx.lineTo(width - padding, avgY);
    ctx.strokeStyle = "red";
    ctx.setLineDash([5, 5]); // Dotted line
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.setLineDash([]);
  
    // Draw data points and line
    ctx.beginPath();
    data.forEach((value, index) => {
      const x = padding + (index * (width - 2 * padding)) / (data.length - 1);
      const y = height - padding - ((value - minData) / (maxData - minData)) * (height - 2 * padding);
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.strokeStyle = "#00ff00";
    ctx.lineWidth = 2;
    ctx.stroke();
  
    // Draw individual points and text bubbles
    data.forEach((value, index) => {
      const x = padding + (index * (width - 2 * padding)) / (data.length - 1);
      const y = height - padding - ((value - minData) / (maxData - minData)) * (height - 2 * padding);
  
      // Draw the point
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fillStyle = "#00ff00";
      ctx.fill();
  
      // Draw text bubble with score
      ctx.beginPath();
      ctx.fillStyle = "#333";
      ctx.fillRect(x - 10, y - 25, 40, 20); // Bubble background
      ctx.strokeStyle = "#00ff00";
      ctx.strokeRect(x - 10, y - 25, 40, 20); // Bubble border
      ctx.fillStyle = "#fff";
      ctx.font = "10px Arial";
      ctx.textAlign = "center";
      ctx.fillText(value.toFixed(2), x + 10, y - 12); // Score text
    });
  }, [data, labels]);  

  return (
    <div
      style={{
        textAlign: "center",
        padding: "10px",
        backgroundColor: "#222",
        borderRadius: "10px",
      }}
    >
      <canvas ref={canvasRef} style={{ maxWidth: "100%" }} />
    </div>
  );
};

export default VibeChart;
