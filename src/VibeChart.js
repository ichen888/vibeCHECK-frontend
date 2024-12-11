import React, { useEffect, useRef } from "react";

const VibeChart = ({ data, labels }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set dimensions for the chart
    const width = 800;
    const height = 300;
    canvas.width = width;
    canvas.height = height;

    const padding = 70;
    const maxData = Math.max(...data);
    const minData = Math.min(...data);

    ctx.clearRect(0, 0, width, height);

    // Title
    ctx.fillStyle = "#fff";
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.fillText("VibeScores Trend", width / 2, padding - 30);

    // Last Updated Date
    const lastUpdated = labels[labels.length - 1]
      ? new Date(labels[labels.length - 1]).toLocaleString()
      : "N/A";
    ctx.font = "12px Arial";
    ctx.textAlign = "right";
    ctx.fillText(`Last Updated: ${lastUpdated}`, width - padding, padding - 30);

    // Draw axes
    ctx.beginPath();
    ctx.moveTo(padding, height - padding); // Y-axis
    ctx.lineTo(padding, padding); // X-axis
    ctx.lineTo(width - padding, height - padding); // X-axis
    ctx.strokeStyle = "#ffffff";
    ctx.stroke();

    // Y-Axis Labels and Title
    ctx.fillStyle = "#fff";
    ctx.font = "12px Arial";
    ctx.textAlign = "right";
    const yAxisSteps = 5;
    for (let i = 0; i <= yAxisSteps; i++) {
      const yValue = minData + ((maxData - minData) * i) / yAxisSteps;
      const y = height - padding - ((yValue - minData) / (maxData - minData)) * (height - 2 * padding);
      ctx.fillText(yValue.toFixed(0), padding - 20, y + 5);
      ctx.beginPath();
      ctx.moveTo(padding - 5, y);
      ctx.lineTo(padding, y);
      ctx.stroke();
    }
    ctx.save();
    ctx.translate(20, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = "center";
    ctx.fillText("Vibe Scores", 0, 0);
    ctx.restore();

    // X-Axis Labels (1-10) and Title
    const xLabels = Array.from({ length: data.length }, (_, i) => i + 1); // Labels: 1 to 10
    ctx.textAlign = "center";
    xLabels.forEach((label, index) => {
      const x = padding + (index * (width - 2 * padding)) / (data.length - 1);
      ctx.fillStyle = "#fff";
      ctx.fillText(label, x, height - padding + 30);
      ctx.beginPath();
      ctx.moveTo(x, height - padding);
      ctx.lineTo(x, height - padding + 5);
      ctx.stroke();
    });
    ctx.fillText("Last 10 Voting Datapoints", width / 2, height - padding + 50);

    // Scale functions
    const scaleX = (index) =>
      padding + (index * (width - 2 * padding)) / (data.length - 1);
    const scaleY = (value) =>
      height - padding - ((value - minData) / (maxData - minData)) * (height - 2 * padding);

    // Draw data points and line
    ctx.beginPath();
    data.forEach((value, index) => {
      const x = scaleX(index);
      const y = scaleY(value);
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.strokeStyle = "#00ff00";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw individual points
    data.forEach((value, index) => {
      const x = scaleX(index);
      const y = scaleY(value);
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fillStyle = "#00ff00";
      ctx.fill();
    });

    // Draw correlation line (linear regression)
    const n = data.length;
    const meanX = data.reduce((acc, _, i) => acc + i, 0) / n;
    const meanY = data.reduce((acc, val) => acc + val, 0) / n;
    const slope =
      data.reduce((acc, y, x) => acc + (x - meanX) * (y - meanY), 0) /
      data.reduce((acc, x) => acc + Math.pow(x - meanX, 2), 0);
    const intercept = meanY - slope * meanX;

    ctx.beginPath();
    ctx.moveTo(
      scaleX(0),
      scaleY(slope * 0 + intercept)
    );
    ctx.lineTo(
      scaleX(n - 1),
      scaleY(slope * (n - 1) + intercept)
    );
    ctx.strokeStyle = "#ff0000";
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.stroke();
    ctx.setLineDash([]);
  }, [data, labels]);

  return (
    <div style={{ textAlign: "center", padding: "20px", backgroundColor: "#222", borderRadius: "10px" }}>
      <canvas ref={canvasRef} style={{ maxWidth: "100%" }} />
    </div>
  );
};

export default VibeChart;
