import { useState } from "react";

export const AdminForm = ({ hideForm }) => {

  const [registrationData, setRegistrationData] = useState({
    email: '',
    password: '',
    role: 'admin',
  });

  const handleRegistrationChange = (e) => {
    setRegistrationData({
      ...registrationData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegistration = async () => {
    try {
      const response = await fetch('/api/register/manager', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      if (response.ok) {
        alert('Registration successful. Please log in.');
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };


  return (
    <form>
        <label>Email:</label>
        <input type="email" name="email" value={registrationData.email} onChange={handleRegistrationChange} required />

        <label>Password:</label>
        <input type="password" name="password" value={registrationData.password} onChange={handleRegistrationChange} required />

        <label>Role:</label>
        <select name="role" value={registrationData.role} onChange={handleRegistrationChange}>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
        </select>

        <button type="button" onClick={handleRegistration}>Register</button>
      </form>
  );
};