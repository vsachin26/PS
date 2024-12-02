// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './EnterNamePage.css'; // For styling

// const EnterNamePage = ({ setPlayerName }) => {
//   const [name, setName] = useState('');
//   const navigate = useNavigate();

//   const handleInputChange = (event) => {
//     setName(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (name) {
//       setPlayerName(name); // Set player name in parent state
//       navigate('/quiz'); // Navigate to the quiz page
//     } else {
//       alert("Please enter your name.");
//     }
//   };

//   return (
//     <div className="container">
//       <div className="form-container">
//         <form onSubmit={handleSubmit}>
//           <label htmlFor="name">Enter your name:</label>
//           <input
//             type="text"
//             id="name"
//             value={name}
//             onChange={handleInputChange}
//             placeholder="Your name"
//             required
//           />
//           <button type="submit">Start Quiz</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EnterNamePage;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EnterNamePage.css'; // For styling

const EnterNamePage = ({ setPlayerName }) => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name) {
      setPlayerName(name); // Set player name in parent state
      navigate('/quiz'); // Navigate to the quiz page
    } else {
      alert("Please enter your name.");
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Enter your name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleInputChange}
            placeholder="Your name"
            required
          />
          <button type="submit">Start Quiz</button>
        </form>
      </div>
    </div>
  );
};

export default EnterNamePage;
