import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../../utils/authentic';



const Signup = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (signupUser(userName, email, password)) {
      navigate('/login');
    } else {
      alert('Signup failed');
    }
  };

  return (
    <form onSubmit={handleSignup}>
       <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="UserName"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;
