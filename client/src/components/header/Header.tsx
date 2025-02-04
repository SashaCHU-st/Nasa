import React from 'react';
import './Header.css';

interface HeaderProps
{
  fetchAPIData:()=>void;
  query:string;
  setQuery:(query:string)=>void;


}

const Header: React.FC<HeaderProps> = ({ fetchAPIData, query, setQuery }) => {
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent updating page
    fetchAPIData(); // call fetchData
  };

  return (
    <div className="header">
      <h1>Search</h1>
      <div className="input">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Start to write for example moon etc..."
            value={query}
            onChange={(e) => setQuery(e.target.value)} /// updated text that user write when filling
               // e.target it refer to DOM elemnet that trigger the event in this case <input>
                //e.target.value return current state of input base don query
                // setQuery updated in parent process
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </div>
  );
};

export default Header;
// import React, { useState } from "react";
// import "./Header.css";

// const Header = ({ fetchAPIData, query, setQuery }) => {
//   // Local state for the input field
//   const [inputValue, setInputValue] = useState(query);

//   const handleSubmit = (e) => {
//     e.preventDefault(); // Prevent page reload
//     setQuery(inputValue); // Update the main `query` state only on submit
//     fetchAPIData(); // Trigger the search function
//   };

//   return (
//     <div className="header">
//       <h1>Search</h1>
//       <div className="input">
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Start to write for example moon etc..."
//             value={inputValue} // Controlled input bound to local state
//             onChange={(e) => setInputValue(e.target.value)} // Update local state
//             // e.target it refer to DOM elemnet that trigger the event in this case <input>
//             //e.target.value and value ={inputValue}
//           />
//           <button type="submit">Search</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Header;
