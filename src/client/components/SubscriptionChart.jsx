import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const SubscriptionChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Dummy data for subscriptions and their costs
    const data = {
      labels: ['Netflix $10', 'Spotify $5', 'Hulu $8', 'Amazon Prime $12'],
      datasets: [
        {
          data: [10, 5, 8, 12], // Dummy subscription costs
          backgroundColor: ['#2d00f7', '#8900f2', '#d100d1', '#f20089'],
        },
      ],
    };

    // Get the chart context from the canvas reference
    const ctx = chartRef.current.getContext('2d');

    // Destroy existing chart instance if it exists
    if (chartRef.current.chart) {
      chartRef.current.chart.destroy();
    }

    // Create a doughnut chart
    chartRef.current.chart = new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'Subscription Costs',
        },
      },
    });
  }, []);

  return (
    <div>
      <canvas ref={chartRef} width='400' height='400'></canvas>
    </div>
  );
};

export default SubscriptionChart;
