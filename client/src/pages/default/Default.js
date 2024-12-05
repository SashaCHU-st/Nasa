import React from 'react';
import './Default.css'; 

const Default = () => {
  return (
    <div className="default-container">
      {/* Welcome message */}
      <div className="default-message">
        <h2>Hello, I am Aleksandra, and I am excited to present my fullstack project.</h2>
        <p>
          This project showcases my skills in building dynamic and responsive web applications. 
          Here's an overview of the technologies I used:
        </p>
        <ul>
          <li><strong>Frontend:</strong> Developed using React, interactive user interface.</li>
          <li><strong>Backend:</strong> Built with Express.js, providing a robust and efficient server-side framework.</li>
          <li><strong>Database:</strong> Integrated with MongoDB to handle data storage and retrieval.</li>
          <li><strong>API:</strong> Utilized the NASA API to incorporate fascinating space-related data into the application.</li>
        </ul>
      </div>

      {/* Instructions */}
      <div className="default-message">
        <h2>How to use the website:</h2>
        <ul>
        <li><strong>When NOT logged in:</strong></li>
          <li><strong>Users:</strong> Shows all registered users, their information, and how many favorite articles they like (will be updated).</li>
          <li><strong>P.S. </strong> Sometimes it might take some time to Database to connect, wait a bit and update page ⏳</li>
          <li><strong>Login/Signup:</strong> You can log in with <strong>email: wapice@wapice.com, password: 12345678</strong>, OR create a new account.</li>
          <li><strong>When logged in:</strong></li>
          <ul>
            <li><strong>Search:</strong> Search something about space, e.g., moon, mars or can be whatever 🌌</li>
            <li><strong>Add to Favorites:</strong> You can add articles to your favorites.</li>
            <li><strong>More Details:</strong> Read more details about an article.</li>
            <li><strong>Remove from Favorites:</strong> Remove articles from favorites.</li>
            <li><strong>Profile:</strong> Update your name and password here.</li>
            <li><strong>Logout:</strong> Log out of your account.</li>
          </ul>
        </ul>
      </div>
    </div>
  );
};

export default Default;
