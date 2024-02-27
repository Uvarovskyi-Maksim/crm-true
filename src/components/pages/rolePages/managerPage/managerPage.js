import { useState, useEffect } from "react";
import { fetchDataById, handleEditData, registerManager, registerClient, registerBuyer, registerProduct, formatDateTime, handleDeleteData, registerNotice } from "../../../common/EditData";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import logout from "../../../common/methods";
import handleSearch from '../../../common/Search'
import Overlay from "../adminPage/Overlay";
import View from "../adminPage/View";
import StatusChart from "../adminPage/Diagram";
import Spinner from "../../../../services/Spinner";
import AnalyticsImg from "../../../../img/analytics.png"
import AddUserImg from "../../../../img/addUser.png"
import BuyerImg from "../../../../img/buyer.png"
import LeedImg from "../../../../img/leed.png"
import ListImg from "../../../../img/list.png"
import ProductListImg from "../../../../img/productList.png"
import LeaveImg from "../../../../img/leave.png"
import { EditForm, EditFormBuyer, EditFormProduct, ClientRegistrationForm, EditFormTask } from "../adminPage/editForm";
import '../adminPage/adminPageStyle.css'
import { getData, getManagers, getBuyers, getProducts, getNotices, getCloseClients, getTasks } from "../../../../services/gettingData";
const currentDate = new Date();
const formattedDateTime = formatDateTime(currentDate);
const storedAdminKey = localStorage.getItem('managerID');
const storedManagerKey = localStorage.getItem('managerKey');
const storedUserName = localStorage.getItem('userName')
const storedUserRole = localStorage.getItem('userRole')
const ManagerPage = () => {
  const overlays = [

    'editBuyerMode',
    'editProductMode',
    'editClientViewMode',
    'editTaskMode',
    'editMode',
  ];
  const [dataLoaded, setDataLoaded] = useState(false);

  const [registrationDataClient, setRegistrationDataClient] = useState({
    email: '',
    phone: '',
    role: 'client',
    managerID: storedAdminKey,
    managerKey: storedManagerKey,
    status: 'new',
    product: 'Товары отсутсвуют',
    payment: '',
    selectedDate: '',
    dateOfCreated: `${formattedDateTime}`,
    clientName: ''
  });
  const [registrationDataBuyer, setRegistrationDataBuyer] = useState({
    email: '',
    phone: '',
    name: '',
    notice: '',
    role: 'buyer',
    managerID: storedAdminKey,
    managerKey: storedManagerKey,
  });
  const [registrationDataProduct, setRegistrationDataProduct] = useState({
    name: '',
    cost: '',
    count: '',
  });
  const [registrationDataNotice, setRegistrationDataNotice] = useState({
    noticeID: '',
    content: '',
    noticeDate: '',
  });
  const [adminKey, setAdminKey] = useState(null);
  const [users, setUsers] = useState([]);
  const [formState, setFormState] = useState(false);

  const [data, setData] = useState(null);
  const [allUsers, setAllUsers] = useState(null)

  const [closeClients, setCloseClients] = useState(null)

  const [notMyClient, setNotMyClient] = useState([]);
  const [myClient, setMyClient] = useState([]);
  const [numberPhone, setNumber] = useState("");
  const [availability, setAvailability] = useState();
  const [showClients, setShowClients] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState(null);

  const [userName, setUserName] = useState(null)
  const [userRole, setUserRole] = useState(null)
  const [ManagerStatusOptions, setManagerStatusOptions] = useState([])
  const [managerIDOptions, setManagerIDOptions] = useState([]);
  const [paymentArray, setPaymentArray] = useState([])

  const [dataManagers, setDataManagers] = useState(null)
  const [dataBuyers, setDataBuyers] = useState(null)
  const [dataProducts, setDataProducts] = useState(null)
  const [dataNotices, setDataNotices] = useState(null)
  const [dataTasks, setDataTasks] = useState(null)


  const [dataManagersID, setDataManagersID] = useState([])
  const [selectedManager, setSelectedManager] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null)

  const [editMode, setEditMode] = useState(false);
  const [editClientMode, setEditClientMode] = useState(false);
  const [editClientViewMode, setEditClienViewtMode] = useState(false);
  const [addLeedMode, setAddLeedMode] = useState(false)

  const [editBuyerMode, setEditBuyerMode] = useState(false);
  const [editProductMode, setEditProductMode] = useState(false);
  const [editTaskMode, setEditTaskMode] = useState(false);
  const [startDateFilter, setStartDateFilter] = useState(null);
  const [endDateFilter, setEndDateFilter] = useState(null);

  const [hasUncompletedTaskToday, setHasUncompletedTaskToday] = useState(false);

  const [registerUserBlock, setRegisterUserBlock] = useState(false)
  const [managersList, setManagersList] = useState(false)
  const [showBuyerBlock, setShowBuyerBlock] = useState(false)
  const [showProductBlock, setShowProductBlock] = useState(false)
  const [showAnalyticBlock, setShowAnalyticBlock] = useState(false)

  const [loadedItems, setLoadedItems] = useState(100);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0];
    setStartDateFilter(currentDate);
    setEndDateFilter(currentDate);
  }, []);

  useEffect(() => {
    // Проверка, есть ли хотя бы одна задача сегодня, которая не выполнена
    const uncompletedTaskToday = dataTasks && dataTasks.some(
      (task) => task.taskStatus === 'false' && task.startDate && new Date(task.startDate).toISOString().split('T')[0] === startDateFilter
    );
    
    

    setHasUncompletedTaskToday(uncompletedTaskToday);
  }, [dataTasks, startDateFilter]);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await fetch(`/api/usersByAdminKey?adminKey=${storedManagerKey}`);

        if (response.ok) {
          const data = await response.json();
          console.log(adminKey);
          setUsers(data);
        } else {
          console.error('Failed to fetch users:', response.statusText);
          console.log('NO');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    fetchData();
    setUserName(storedUserName)
    setUserRole(storedUserRole)
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);


  useEffect(() => {
    const managerIDArray = users.map((user) => user);
    setManagerIDOptions(managerIDArray);
  }, [users]);

  useEffect(() => {
    const managerStatusArray = ['new', 'in_processing', 'agreed', 'successful', 'return', 'nds', 'wholesale']
    const paymentArray = ['Не оплатил', 'На карту']
    setPaymentArray(paymentArray)
    setManagerStatusOptions(managerStatusArray)
  }, [])
  const showForm = () => {
    setFormState(true);
  };

  const hideForm = () => {
    setFormState(false);
  };

  const showData = () => {
    setShowClients(true);
  };

  const hideData = () => {
    setShowClients(false);
  };
  const showBlock = (blockName) => {
    setActiveMenuItem(blockName);
    setShowClients(blockName === 'Лиды');
    setRegisterUserBlock(blockName === 'Добавить пользователя');
    setManagersList(blockName === 'Список менеджеров');
    setShowBuyerBlock(blockName === 'Покупатели');
    setShowProductBlock(blockName === 'Продукты');
    setShowAnalyticBlock(blockName === 'Аналитика');
  };



  const fetchData = async () => {
    try {
      // Fetching data from different sources with statusFilter and loadedItems
      const responseData = await getData(loadedItems, statusFilter);
      const responseManagers = await getManagers();
      const responseBuyers = await getBuyers();
      const responseProducts = await getProducts();
      const responseNotices = await getNotices();
      const responseCloseClients = await getCloseClients();
      const responseTasks = await getTasks();


      if (
        Array.isArray(responseData) &&
        responseManagers &&
        responseBuyers &&
        responseProducts &&
        responseNotices &&
        responseCloseClients &&
        responseTasks
      ) {
        setData((prevData) => {
          // Добавляем проверку на null и используем пустой массив, если prevData равно null
          const existingData = Array.isArray(prevData) ? prevData : [];

          // Фильтруем уникальные элементы, чтобы избежать дублирования
          const uniqueData = responseData.filter((newItem) => !existingData.some((item) => item._id === newItem._id));
          return [...existingData, ...uniqueData];
        });

        setDataManagers(responseManagers);
        setDataBuyers(responseBuyers.filter(buyer => storedAdminKey === buyer.managerID));
        setDataProducts(responseProducts);
        setDataNotices(responseNotices);
        setCloseClients(responseCloseClients.filter(buyer => storedAdminKey === buyer.managerID))
        setDataTasks(responseTasks.filter(buyer => storedAdminKey === buyer.managerID))

        setDataLoaded(true);
        console.log(responseData);
      } else {
        console.error('Some data failed to load');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleLoadMoreWithStatusFilter = (status) => {
    setStatusFilter(status); // Устанавливаем фильтр по статусу
    setLoadedItems(prev => prev + 10); // Увеличиваем количество загруженных элементов на 10
    console.log(data)
  };

  const handleInputChange = (event) => {
    setNumber(event.target.value);
  };

  const clearing = () => {
    setNotMyClient([]);
    setMyClient([]);
    setAvailability("");
    setNumber("");
  };
  const handleSearch = (event) => {
    clearing();
    event.preventDefault();
    const filterData = data.filter((person) => numberPhone === person.phone);

    if (filterData.length > 0) {
      if (filterData[0].managerID === storedAdminKey) {
        setMyClient(filterData);
        console.log("Это мои", myClient)
      } else {
        setNotMyClient(filterData);
        console.log("Это не мои", notMyClient)
      }
    } else {
      setAvailability("Нету");
    }
  };

  const myBuyers = () => {

    const buyers = dataBuyers.filter(buyer => storedAdminKey === buyer.managerID)
    console.log(buyers)


  }


  useEffect(() => {
    setAdminKey(storedAdminKey);

  })

  const [registrationData, setRegistrationData] = useState({
    email: '',
    password: '',
    role: 'client',
    managerID: storedAdminKey,
    managerKey: storedManagerKey,
    status: 'new'
  });


  const handleRegistrationChange = (e) => {
    setRegistrationData({
      ...registrationData,
      [e.target.name]: e.target.value,
    });
  };
  const handleRegistrationProductChange = (e) => {
    setRegistrationDataProduct({
      ...registrationDataProduct,
      [e.target.name]: e.target.value,
    });
  };
  const handleRegistration = async () => {
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
        fetchData()
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };
  const handleDeleteClient = async () => {
    const id = {
      _id: selectedClient._id
    }
    await handleDeleteData('/api/deleteClient', id, fetchData);
  };

  const handleDeleteBuyer = async () => {
    const id = {
      _id: selectedBuyer._id
    }
    await handleDeleteData('/api/deleteBuyer', id, fetchData);
  };

  const handleDeleteProduct = async () => {
    const id = {
      _id: selectedProduct._id
    }
    await handleDeleteData('/api/deleteProduct', id, fetchData);
  };

  const handleSearchWrapper = (event) => {
    handleSearch(event, data, numberPhone, adminKey, setMyClient, setNotMyClient, setAvailability);
  };



  const handleRegistrationClientChange = (e) => {
    setRegistrationDataClient({
      ...registrationDataClient,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegistrationBuyerChange = (e) => {
    setRegistrationDataBuyer({
      ...registrationDataBuyer,
      [e.target.name]: e.target.value,
    });
  };



  const handleRegistrationNoticeChange = (e) => {
    setRegistrationDataNotice({
      ...registrationDataNotice,
      [e.target.name]: e.target.value,
    });
  };



  const handleRegistrationClient = async () => {
    await registerClient(registrationDataClient, fetchData);
  };

  const handleRegistrationBuyer = async () => {
    await registerBuyer(registrationDataBuyer, fetchData);
  };

  const handleRegistrationProduct = async () => {
    await registerProduct(registrationDataProduct, fetchData);
  };

  const reset = () => {
    setRegistrationDataNotice({})
  }

  const handleRegistrationNotice = async () => {
    await registerNotice(registrationDataNotice, fetchData);
    await console.log(registrationDataNotice)
  };

  const handleManagerClick = async (id) => {
    fetchDataById(id, '/api/getManagerData', setSelectedManager, setEditMode, setRegistrationDataNotice);
  };

  const handleClientClick = async (id) => {
    fetchDataById(id, '/api/getClientData', setSelectedClient, setEditClientMode, setRegistrationDataNotice);
  };
  const handleClientDoubleClick = async (id) => {
    fetchDataById(id, '/api/getClientData', setSelectedClient, setEditClienViewtMode, setRegistrationDataNotice);

  };
  const handleBuyerClick = async (id) => {
    fetchDataById(id, '/api/getBuyerData', setSelectedBuyer, setEditBuyerMode, setRegistrationDataNotice);
  };

  const handleProductClick = async (id) => {
    fetchDataById(id, '/api/getProductData', setSelectedProduct, setEditProductMode, setRegistrationDataNotice);
  };

  const handleTaskClick = async (id) => {
    fetchDataById(id, '/api/getTaskData', setSelectedTask, setEditTaskMode, setRegistrationDataNotice);

  }

  const handleEditTaskStatus = async () => {
    const requestData = {
      _id: selectedTask._id,
      taskStatus: selectedTask.taskStatus
    }
    await handleEditData('/api/updateTaskStatus', requestData, setEditTaskMode, fetchData);

  }

  const handleEditClient = async () => {
    const requestData = {
      _id: selectedClient._id,
      email: selectedClient.email,
      phone: selectedClient.phone,
      managerID: selectedClient.managerID,
      status: selectedClient.status,
      product: selectedClient.product,
      clientName: selectedClient.clientName,
      payment: selectedClient.payment,
      selectedDate: selectedClient.selectedDate
    };

    await handleEditData('/api/updateClientData', requestData, setEditMode, fetchData);
  };
  const handleEditBuyer = async () => {
    const requestData = {
      _id: selectedBuyer._id,
      email: selectedBuyer.email,
      phone: selectedBuyer.phone,
      managerID: selectedBuyer.managerID,
      name: selectedBuyer.name,
      notice: selectedBuyer.notice
    };

    await handleEditData('/api/updateBuyerData', requestData, setEditMode, fetchData);
  };

  const handleEditProduct = async () => {
    const requestData = {
      _id: selectedProduct._id,
      name: selectedProduct.name,
      cost: selectedProduct.cost,
      count: selectedProduct.count,
    };

    await handleEditData('/api/updateProductData', requestData, setEditMode, fetchData);
  };

  const handleDateChange = (date) => {
    console.log("Received date:", date);

    if (typeof date === 'string') {
      // Преобразование строки в объект Date
      date = new Date(date);
    }

    if (date instanceof Date && !isNaN(date)) {
      const offset = new Date().getTimezoneOffset();
      const correctedDate = new Date(date.getTime() - offset * 60 * 1000);

      console.log("Corrected date:", correctedDate);

      setRegistrationDataClient((prevData) => ({
        ...prevData,
        selectedDate: correctedDate,
      }));
    } else {
      console.error("Invalid date object:", date);
      // Можно предпринять какие-то дополнительные действия в случае недопустимой даты
    }
  };


  const close = () => {
    setEditClientMode(false)
    setEditBuyerMode(false)
    setEditProductMode(false)
    setEditClienViewtMode(false)
    setAddLeedMode(false)
    setEditMode(false)
    setEditTaskMode(false)

  }
  const addLeed = () => {
    setAddLeedMode(true)
  }

  const handleStartDateChange = (date) => {
    setStartDateFilter(date);
  };

  const handleEndDateChange = (date) => {
    setEndDateFilter(date);
  };
  const sortByDate = (data) => {
    return data.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  };

  return (
    <div className="main">
      {dataLoaded ? (<>
        {overlays.map((mode, index) => (
          <Overlay key={index} mode={eval(mode)} close={close} />
        ))}




        <div className="left_menu">
          <div className="manager_name_block">
            <div className="name">
              {userName}
            </div>
            <div className="role">
              {userRole}
            </div>
            <img onClick={logout} className="logout" src={LeaveImg} alt="" />
          </div>
          <div className="menu_block">
            <div
              className={`menu_element ${activeMenuItem === 'Лиды' ? 'active_el' : ''}`}
              onClick={() => showBlock('Лиды')}
            >

              <img style={{ width: "25px", height: "25px", marginLeft: "10px" }} src={LeedImg} alt="" /> <div className="menu_text">Лиды</div>

            </div>

            <div
              className={`menu_element ${activeMenuItem === 'Покупатели' ? 'active_el' : ''}`}
              onClick={() => showBlock('Покупатели')}
            >
              <img style={{ width: "25px", height: "25px", marginLeft: "10px" }} src={BuyerImg} alt="" /> <div className="menu_text">Покупатели</div>
            </div>
            <div
              className={`menu_element ${activeMenuItem === 'Продукты' ? 'active_el' : ''}`}
              onClick={() => showBlock('Продукты')}
            >
              <img style={{ width: "25px", height: "25px", marginLeft: "10px" }} src={ProductListImg} alt="" /> <div className="menu_text">Продукты</div>
            </div>
            <div
              className={`menu_element ${activeMenuItem === 'Аналитика' ? 'active_el' : ''} ${hasUncompletedTaskToday ? 'uncompleted_task' : ''}`}
              onClick={() => showBlock('Аналитика')}
            >
              <img style={{ width: "25px", height: "25px", marginLeft: "10px" }} src={AnalyticsImg} alt="" />
              <div className="menu_text">Аналитика</div>
            </div>

          </div>
        </div>
        <div className="right_content">
          <div>
            <h1>Manager PAGE</h1>
            {showBuyerBlock &&
              <div style={{ marginLeft: "1.5%" }}>
                <form>
                  <h1>Покупатели</h1>
                  <table className="reg_table">
                    <tbody>

                      <tr>
                        <td className="input_td"><div>Name:</div><input type="text" name="name" value={registrationDataBuyer.name} onChange={handleRegistrationBuyerChange} required /></td>

                        <td className="input_td"><div>Email:</div><input type="email" name="email" value={registrationDataBuyer.email} onChange={handleRegistrationBuyerChange} required /></td>
                        <td className="input_td"><div>Phone:</div><input type="phone" name="phone" value={registrationDataBuyer.phone} onChange={handleRegistrationBuyerChange} required /></td>
                        <td className="input_td"><div>Notice:</div><input type="text" name="notice" value={registrationDataBuyer.notice} onChange={handleRegistrationBuyerChange} required /></td>
                        <td className="input_td">
                          <div>Manager:</div>
                          <select name="managerID" value={registrationDataBuyer.managerID} onChange={handleRegistrationBuyerChange} required>
                            {dataManagers.map((option) => (
                              <option key={option.managerID} value={option.managerID}>
                                {option.email}
                              </option>
                            ))}
                          </select>
                        </td>

                      </tr>

                    </tbody>
                    <button className="register btn_buyer" type="button" onClick={handleRegistrationBuyer}>Register</button>
                  </table>


                </form>

                <table className="table_list" border="1" style={{ cursor: "pointer" }}>
                  <thead>
                    <tr>
                      <th>Имя</th>
                      <th>Почта</th>
                      <th>Номер телефона</th>
                      <th>Заметка</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataBuyers.map((option) => (
                      <tr key={option._id} onClick={() => handleBuyerClick(option._id)}>
                        <td>{option.name}</td>
                        <td>{option.email}</td>
                        <td>{option.phone}</td>
                        <td>{option.notice}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <EditFormBuyer handleDeleteClient={handleDeleteBuyer} editClientMode={editBuyerMode} setSelectedClient={setSelectedBuyer} handleEditClient={handleEditBuyer} selectedClient={selectedBuyer} managerIDOptions={dataBuyers} ManagerStatusOptions={ManagerStatusOptions} close={close} />

              </div>
            }
          </div>
          {showProductBlock &&
            <div style={{ marginLeft: "1.5%" }}>
              <h1>Продукты</h1>
              <form>
                <table className="reg_table">
                  <tbody>
                    <tr>
                      <td className="input_td"><div>Название:</div><input type="text" name="name" value={registrationDataProduct.name} onChange={handleRegistrationProductChange} required /></td>
                      <td className="input_td"><div>Цена:</div><input type="number" name="cost" value={registrationDataProduct.cost} onChange={handleRegistrationProductChange} required /></td>
                      <td className="input_td"><div>Количество:</div><input type="number" name="count" value={registrationDataProduct.count} onChange={handleRegistrationProductChange} required /></td>
                    </tr>
                  </tbody>
                  <button className="register btn_buyer" type="button" onClick={handleRegistrationProduct}>Register</button>

                </table>

              </form>
              <table className="table_list" border="1" style={{ cursor: "pointer" }}>
                <thead>
                  <tr>
                    <th>Название</th>
                    <th>Стоимость</th>
                    <th>Количество</th>
                  </tr>
                </thead>
                <tbody>
                  {dataProducts.map((option) => (
                    <tr key={option._id} onClick={() => handleProductClick(option._id)}>
                      <td>{option.name}</td>
                      <td>{option.cost}</td>
                      <td>{option.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <EditFormProduct handleDeleteClient={handleDeleteProduct} editClientMode={editProductMode} setSelectedClient={setSelectedProduct} handleEditClient={handleEditProduct} selectedClient={selectedProduct} close={close} />

            </div>
          }
          {showAnalyticBlock && <div>
            {/* <h1>Status Chart</h1>
            <StatusChart data={closeClients} /> */}
            <div>Период:</div>
            <div className="period_inputs">
              <input type="date" value={startDateFilter} onChange={(e) => handleStartDateChange(e.target.value)} />
              <input type="date" value={endDateFilter} onChange={(e) => handleEndDateChange(e.target.value)} />
            </div>
            <table>
              <tbody>
                <>
                  <h3>Мои Задачи</h3>
                  <tr>
                    <th>Задача</th>
                    <th>Дата начала</th>
                    <th>Дата конца</th>
                    <th>Статус</th>
                  </tr>


                  {sortByDate(dataTasks)
                    .filter(el => {
                      if (startDateFilter && endDateFilter) {
                        const taskDate = new Date(el.startDate);
                        return taskDate >= new Date(startDateFilter) && taskDate <= new Date(endDateFilter);
                      }
                      return true; // Показывать все задачи, если промежуток не выбран
                    })
                    .map(el => (
                      <tr key={el.id}>
                        <td onClick={() => handleTaskClick(el._id)}>{el.taskLine}</td>
                        <td>{el.startDate}</td>
                        <td>{el.endDate}</td>
                        <td>{el.taskStatus === 'true' ? 'Выполнено' : 'Не выполнено'}</td>
                        <EditFormTask editClientMode={editTaskMode} setSelectedClient={setSelectedTask} selectedClient={selectedTask} handleEditClient={handleEditTaskStatus} close={close} />
                      </tr>
                    ))}

                </>

              </tbody>
            </table>
          </div>}
          <form>


            <div>

              <div>
                <div>{showClients && <div className="show_clients_block">
                  <div>

                    <form className="search_form" action="">
                      <div className="search">
                        <input className="search_input" type="text" value={numberPhone} onChange={handleInputChange} />
                        <button className="search_btn" onClick={handleSearchWrapper}>Найти</button>
                        <button className="search_reset" type="button" onClick={clearing}>&times;</button>
                      </div>

                      <div className="add_leed " onClick={addLeed}>Добавить Лид</div>

                    </form>
                    <ul>
                      {myClient.map((person) => (
                        <li key={person._id} onClick={() => handleClientDoubleClick(person._id)}>
                          <table border="1" style={{ cursor: "pointer" }}>
                            <tr>
                              <td>Почта</td>
                              <td>Номер телефона</td>
                            </tr>
                            <tr>
                              <td>{person.email}</td>
                              <td>{person.phone}</td>
                            </tr>
                          </table>
                        </li>
                      ))}
                      {notMyClient.map((person) => (
                        <li key={person._id}>{dataManagers.find(el => el.managerID === person.managerID)?.email} - {dataManagers.find(el => el.managerID === person.managerID)?.nameManager}</li>
                      ))}
                      {availability}
                    </ul>
                    <button onClick={() => handleLoadMoreWithStatusFilter('new')}>Потенциальный</button>
                    <button onClick={() => handleLoadMoreWithStatusFilter('in_processing')}>Я подумаю</button>
                    <View handleDateChange={handleDateChange} paymentArray={paymentArray} data={data} dataNotices={dataNotices} handleRegistrationNoticeChange={handleRegistrationNoticeChange} registrationDataNotice={registrationDataNotice} handleRegistrationNotice={handleRegistrationNotice} handleDeleteClient={handleDeleteClient} handleClientDoubleClick={handleClientDoubleClick} handleClientClick={handleClientClick} editClientViewMode={editClientViewMode} editClientMode={editClientMode} handleEditClient={handleEditClient} setSelectedClient={setSelectedClient} selectedClient={selectedClient} keyManage={adminKey} managerIDOptions={managerIDOptions} ManagerStatusOptions={ManagerStatusOptions} registrationDataClient={registrationDataClient} handleRegistrationClientChange={handleRegistrationClientChange} dataProducts={dataProducts} close={close} />
                  </div>

                  <ClientRegistrationForm setRegistrationDataClient={setRegistrationDataClient} handleRegistrationClient={handleRegistrationClient} paymentArray={paymentArray} dataProducts={dataProducts} dataBuyers={dataBuyers} handleDateChange={handleDateChange} handleRegistrationClientChange={handleRegistrationClientChange} addLeedMode={addLeedMode} adminKey={storedManagerKey} close={close} registrationDataClient={registrationDataClient} />



                </div>

                }
                </div></div>


            </div>

          </form>
        </div></>) : (<Spinner></Spinner>)}

    </div>
  );
};

export default ManagerPage;
