import { useState } from "react";

const RegistrationPage = () => {

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const userRole = await getUserRole(loginData.email);
        const redirectPath = userRole === 'admin' ? `/admin` : '/manager';
        window.location.href = redirectPath;

      } else {
        alert('Login failed. Please check your credentials and try again.');
        const userRole = await getUserRole(loginData.email);
        console.log(userRole);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const getUserRole = async (email) => {
    try {
      const roleResponse = await fetch(`/api/userRole?email=${email}`);
      const { role, key, manID, manKey } = await roleResponse.json();

      localStorage.setItem('adminKey', key);
      localStorage.setItem('managerID', manID)
      localStorage.setItem('managerKey', manKey)

       localStorage.setItem('userName', email)
      localStorage.setItem('userRole', role)

      console.log(key, role, manID, manKey);
      return role;
    } catch (error) {
      console.error('Error during getUserRole:', error);
      return null;
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <label>Email:</label>
        <input type="email" name="email" value={loginData.email} onChange={handleLoginChange} required />

        <label>Password:</label>
        <input type="password" name="password" value={loginData.password} onChange={handleLoginChange} required />

        <button type="button" onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
};

export default RegistrationPage;
