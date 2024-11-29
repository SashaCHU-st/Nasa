import React from 'react';
import './Default.css'; 

const Default = () => {
  return (
    <div className="default-message">
      <h2>Hello, I am Aleksandra, and I am excited to present my full-stack project.</h2>
      <p>
        This project showcases my skills in building dynamic and responsive web applications. 
        Here's an overview of the technologies I used:
      </p>
      <ul>
        <li><strong>Frontend:</strong> Developed using React, interactive user interface.</li>
        <li><strong>Backend:</strong> Built with Express.js and Node.js, providing a robust and efficient server-side framework.</li>
        <li><strong>Database:</strong> Integrated with MongoDB to handle data storage and retrieval.</li>
        <li><strong>API:</strong> Utilized the NASA API to incorporate fascinating space-related data into the application.</li>
      </ul>
    </div>
  );
}

export default Default;
