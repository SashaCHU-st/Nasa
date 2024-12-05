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
  <h2>How to Use the Website:</h2>
  <ul>
    <li><strong>When NOT Logged In:</strong></li>
    <li><strong>Users:</strong> Displays all registered users, their information, and the number of favorite articles they like (will be updated).</li>
    <li><strong>Note:</strong> It may take some time for the database to connect. Please wait a moment and refresh the page ⏳.</li>
    <li><strong>Login/Signup:</strong> You can log in using <strong>email: wapice@test.com, password: 12345678</strong>, or create a new account.</li>
    <li><strong>When Logged In:</strong></li>
    <ul>
      <li><strong>Search:</strong> Look up topics related to space, such as the moon, Mars, or anything else 🌌.</li>
      <li><strong>Add to Favorites:</strong> Save articles to your favorites list.</li>
      <li><strong>More Details:</strong> Read detailed information about an article.</li>
      <li><strong>Remove from Favorites:</strong> Remove articles from your favorites list.</li>
      <li><strong>Profile:</strong> Update your name and password in your profile settings.</li>
      <li><strong>Logout:</strong> Log out of your account.</li>
    </ul>
  </ul>
</div>

    </div>
  );
};

export default Default;
