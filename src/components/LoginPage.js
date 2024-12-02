// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
// import './LoginPage.css';

// const LoginPage = () => {
//   const [isRegistering, setIsRegistering] = useState(false);
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//   });
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate(); // Initialize useNavigate

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const endpoint = isRegistering
//       ? 'http://localhost:5000/api/register'
//       : 'http://localhost:5000/api/login';

//     try {
//       const response = await fetch(endpoint, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       const contentType = response.headers.get('content-type');
//       if (!contentType || !contentType.includes('application/json')) {
//         throw new Error('Server returned invalid response format (not JSON)');
//       }

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.message || 'Something went wrong!');
//       }

//       setMessage(isRegistering ? 'Registration successful!' : 'Login successful!');

//       if (!isRegistering) {
//         // Navigate to the Analysis page on successful login
//         navigate('/analysis');
//       }
//     } catch (error) {
//       setMessage(error.message);
//     }
//   };

//   return (
//     <div className="login-page">
//       <h1>{isRegistering ? 'Register' : 'Login'}</h1>
//       <form onSubmit={handleSubmit} className="login-form">
//         <div className="form-group">
//           <label>
//             Username:
//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleInputChange}
//               required
//             />
//           </label>
//         </div>
//         <div className="form-group">
//           <label>
//             Password:
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleInputChange}
//               required
//             />
//           </label>
//         </div>
//         <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
//       </form>
//       <p className="message">{message}</p>
//       <button
//         onClick={() => {
//           setIsRegistering((prev) => !prev);
//           setMessage('');
//         }}
//       >
//         {isRegistering ? 'Switch to Login' : 'Switch to Register'}
//       </button>
//     </div>
//   );
// };

// export default LoginPage;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
// import './LoginPage.css';

// const LoginPage = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//   });
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate(); // Initialize useNavigate

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const endpoint = 'http://localhost:5000/api/login';

//     try {
//       const response = await fetch(endpoint, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       const contentType = response.headers.get('content-type');
//       if (!contentType || !contentType.includes('application/json')) {
//         throw new Error('Server returned invalid response format (not JSON)');
//       }

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.message || 'Something went wrong!');
//       }

//       setMessage('Login successful!');

//       // Navigate to the Analysis page on successful login
//       navigate('/analysis');
//     } catch (error) {
//       setMessage(error.message);
//     }
//   };

//   return (
//     <div className="login-page">
//       <h1>Login</h1>
//       <form onSubmit={handleSubmit} className="login-form">
//         <div className="form-group">
//           <label>
//             Username:
//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleInputChange}
//               required
//             />
//           </label>
//         </div>
//         <div className="form-group">
//           <label>
//             Password:
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleInputChange}
//               required
//             />
//           </label>
//         </div>
//         <button type="submit">Login</button>
//       </form>
//       <p className="message">{message}</p>
//     </div>
//   );
// };

// export default LoginPage;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = 'http://localhost:5000/api/login';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server returned invalid response format (not JSON)');
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong!');
      }

      setMessage('Login successful!');

      // Navigate to the Analysis page on successful login
      navigate('/analysis');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <button type="submit">Login</button>
        </form>
        <p className="message">{message}</p>
      </div>
    </div>
  );
};

export default LoginPage;
