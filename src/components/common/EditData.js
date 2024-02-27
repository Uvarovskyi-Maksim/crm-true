const fetchDataById = async (id, apiEndpoint, setDataFunction, setEditModeFunction, setRegistrationDataNotice) => {
    try {
      console.log(id);
      localStorage.setItem('LeedID', id)
      const currentDate = new Date();
      const formattedDateTime = formatDateTime(currentDate);
      setRegistrationDataNotice((prevData) => ({
        ...prevData,
        noticeID: localStorage.getItem('LeedID'),
        noticeDate: formattedDateTime
      }));
      
      const response = await fetch(`${apiEndpoint}?_id=${id}`);
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Ошибка при получении данных: ${errorText}`);
        return;
      }
  
      if (response.ok) {
        const data = await response.json();
        setDataFunction(data);
        console.log(data)
        setEditModeFunction(true);
      }
    } catch (error) {
      console.error(`Ошибка при получении данных: ${error}`);
    }
  };
  const fetchDataByIdTask = async (id, apiEndpoint, setDataFunction, setEditModeFunction, array, setSelectTask,) => {
    try {
      console.log(id);
      localStorage.setItem('LeedID', id)
      const currentDate = new Date();
      const formattedDateTime = formatDateTime(currentDate);
     
  
      const response = await fetch(`${apiEndpoint}?_id=${id}`);
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Ошибка при получении данных: ${errorText}`);
        return;
      }
  
      if (response.ok) {
        const data = await response.json();
        setDataFunction(data);
        setSelectTask(array.filter(el => el.managerID === data.managerID))
        console.log(array.filter(el => el.managerID === data.managerID))
        setEditModeFunction(true);
      }
    } catch (error) {
      console.error(`Ошибка при получении данных: ${error}`);
    }
  };
  const handleEditData = async (apiEndpoint, requestData, setDataFunction, fetchData) => {
    try {
      const response = await fetch(apiEndpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      console.log( JSON.stringify(requestData));

      if (response.ok) {
        alert("Данные успешно обновлены.");
        setDataFunction(false);
        fetchData()
      } else {
        alert("Не удалось обновить данные. Пожалуйста, попробуйте снова.");
      }
    } catch (error) {
      console.error(`Ошибка при обновлении данных: ${error}`);
    }
  };
  
  const handleDeleteData = async (apiEndpoint, idToDelete, fetchData) => {
    try {
      const response = await fetch(apiEndpoint, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(idToDelete), // Отправляем объект с правильным _id
      });
  
      console.log('Delete Response:', JSON.stringify(idToDelete));
  
      if (response.ok) {
        alert('Элемент успешно удален.');
        fetchData();
      } else {
        alert(`Не удалось удалить элемент. Пожалуйста, попробуйте снова.${ JSON.stringify(idToDelete)}`);
      }
    } catch (error) {
      console.error(`Ошибка при удалении элемента: ${error}`);
    }
  };
  
  // registerManager.js
const registerManager = async (registrationData, fetchData) => {
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
        console.log(JSON.stringify(registrationData));
        fetchData()
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  const registerClient = async (registrationData, fetchdata) => {
    try {
      const response = await fetch('/api/register/client', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData)
      });

      if (response.ok) {
        alert('Registration successful. Please log in.');
        console.log(JSON.stringify(registrationData))
        fetchdata()
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };
  
  const registerBuyer = async (registrationData, fetchData) => {
    try {
      const response = await fetch('/api/register/buyer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData)
      });

      if (response.ok) {
        alert('Registration successful. Please log in.');
        console.log(JSON.stringify(registrationData))
        fetchData()
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  const registerProduct = async (registrationData, fetchData) => {
    try {
      const response = await fetch('/api/register/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData)
      });

      if (response.ok) {
        alert('Registration successful. Please log in.');
        console.log(JSON.stringify(registrationData))
        fetchData()
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  const registerNotice = async (registrationData, fetchData) => {
    try {
      const response = await fetch('/api/register/notice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData)
      });

      if (response.ok) {
        alert('Registration successful. Please log in.');
        console.log(JSON.stringify(registrationData))
        fetchData()
        
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  const registerTask = async (registrationData, fetchData) => {
    try {
      const response = await fetch('/api/register/task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData)
      });

      if (response.ok) {
        alert('Registration successful. Please log in.');
        console.log(JSON.stringify(registrationData))
        fetchData()
        
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  function formatDateTime(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString()
    const day = date.getDate().toString()
    const hours = date.getHours().toString()
    const minutes = date.getMinutes().toString()
  
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }
  

  export default registerManager;
  


  export {fetchDataById, handleEditData, registerManager, registerClient, registerBuyer, registerProduct, formatDateTime, handleDeleteData, registerNotice, registerTask, fetchDataByIdTask};