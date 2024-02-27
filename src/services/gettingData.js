const getData = async (limit = 10, status = '') => {
  try {
    const response = await fetch(`/api/getClients?limit=${limit}&status=${status}`);
    
    if (response.ok) {
      return await response.json();
    } else {
      console.error('Failed to fetch users:', response.statusText);
      console.log('NO');
    }
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};



const getManagers = async () => {
  try {

    const response = await fetch(`/api/getManagers`);

    if (response.ok) {
      
      return await response.json();
    } else {
      console.error('Failed to fetch users:', response.statusText);
      console.log('NO');
    }
    
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

const getBuyers = async () => {
  try {

    const response = await fetch(`/api/getBuyers`);

    if (response.ok) {
      
      return await response.json();
    } else {
      console.error('Failed to fetch users:', response.statusText);
      console.log('NO');
    }
    
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

const getProducts = async () => {
  try {

    const response = await fetch(`/api/getProducts`);

    if (response.ok) {
      
      return await response.json();
    } else {
      console.error('Failed to fetch users:', response.statusText);
      console.log('NO');
    }
    
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

const getNotices = async () => {
  try {

    const response = await fetch(`/api/getNotices`);

    if (response.ok) {
      
      return await response.json();
    } else {
      console.error('Failed to fetch users:', response.statusText);
      console.log('NO');
    }
    
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}
const getCloseClients = async () => {
  try {

    const response = await fetch(`/api/getCloseClients`);

    if (response.ok) {
      
      return await response.json();
    } else {
      console.error('Failed to fetch users:', response.statusText);
      console.log('NO');
    }
    
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

const getTasks = async () => {
  try {

    const response = await fetch(`/api/getTasks`);

    if (response.ok) {
      
      return await response.json();
    } else {
      console.error('Failed to fetch users:', response.statusText);
      console.log('NO');
    }
    
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}
export {getData, getManagers, getBuyers, getProducts, getNotices, getCloseClients, getTasks};
