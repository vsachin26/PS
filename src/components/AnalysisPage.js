import React from 'react';
import './AnalysisPage.css'; // Optional: Add CSS for this page

const AnalysisPage = () => {
  return (
    <div className="analysis-page">
      <h1>Welcome to the Analysis Page</h1>
      <p>Here you can analyze user data, progress, or other relevant information.</p>
    </div>
  );
};

export default AnalysisPage;

// import React from 'react';
// import { Bar, Pie } from 'react-chartjs-2';
// import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
// import './AnalysisPage.css'; // Add styling for this page

// // Register necessary Chart.js components
// ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

// const AnalysisPage = () => {
//   // Sample data for Bar Chart
//   const barData = {
//     labels: ['Player 1', 'Player 2', 'Player 3', 'Player 4', 'Player 5'],
//     datasets: [
//       {
//         label: 'Score',
//         data: [45, 55, 65, 70, 85],
//         backgroundColor: 'rgba(75, 192, 192, 0.6)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Bar Chart options
//   const barOptions = {
//     responsive: true,
//     plugins: {
//       legend: { position: 'top' },
//     },
//   };

//   // Sample data for Pie Chart
//   const pieData = {
//     labels: ['Correct Answers', 'Incorrect Answers', 'Skipped Questions'],
//     datasets: [
//       {
//         data: [70, 20, 10],
//         backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
//       },
//     ],
//   };

//   return (
//     <div className="analysis-page">
//       <h1>Analysis Page</h1>
//       <p>Here’s the performance analysis based on user activity:</p>
//       <div className="chart-container">
//         {/* Bar Chart */}
//         <div className="chart">
//           <h2>Player Scores</h2>
//           <Bar data={barData} options={barOptions} />
//         </div>

//         {/* Pie Chart */}
//         <div className="chart">
//           <h2>Answer Breakdown</h2>
//           <Pie data={pieData} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnalysisPage;
