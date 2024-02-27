// searchFunctions.js

  
  const handleSearch = (event, data, numberPhone, adminKey, setMyClient, setNotMyClient, setAvailability) => {
    // clearing(setNotMyClient, setMyClient, setAvailability, numberPhone);
  
    event.preventDefault();
    const filterData = data.filter((person) => numberPhone === person.phone || numberPhone === person.secondPhone || numberPhone === person.clientName);
  
    if (filterData.length > 0) {
      if (filterData[0].managerKey === adminKey) {
        setMyClient(filterData);
        console.log("Это мои", filterData);
      } else {
        setNotMyClient(filterData);
        console.log("Это не мои", filterData);
      }
    } else {
      setAvailability("Нету");
    }
  };
  
  export default handleSearch;
  