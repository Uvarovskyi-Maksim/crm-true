const logout = async () =>{
    fetch('/logout', {
      method: 'POST',
  })
  .then(response => {
      if (response.ok) {
          // Redirect to the home page or login page after successful logout
          window.location.href = '/'; // Change the URL if needed
      } else {
          // Handle error, display a message, or redirect to an error page
          console.error('Logout failed');
      }
  })
  .catch(error => {
      console.error('Error during logout:', error);
  });
  }

export default logout;