import React, { useState, useEffect, useRef } from "react";
import { EditForm, LeedInfo } from "./editForm";
import ClockImg from '../../../../img/clock.png'
import ClientImg from '../../../../img/client.png'
import ManagerImg from '../../../../img/manager.png'
import EditImg from '../../../../img/edit.png'
import { fetchDataById, handleEditData, registerManager, registerClient, registerBuyer, registerProduct, formatDateTime, handleDeleteData, registerNotice } from "../../../common/EditData";


const View = ({
  data,
  keyManage,
  handleClientClick,
  editClientMode,
  setSelectedClient,
  selectedClient,
  handleEditClient,
  managerIDOptions,
  ManagerStatusOptions,
  registrationDataClient,
  handleRegistrationClientChange,
  dataProducts,
  handleClientDoubleClick,
  editClientViewMode,
  handleDeleteClient,
  handleRegistrationNotice,
  registrationDataNotice,
  handleRegistrationNoticeChange,
  dataNotices,
  paymentArray,
  handleDateChange,
  close
}) => {
  const myData = data.filter((person) => keyManage === person.managerKey || keyManage === person.managerID);
  const [visibleItems, setVisibleItems] = useState(5);
  const [sortActivated, setSortActivated] = useState(false);
  const [sortedData, setSortedData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const newStatusColsRef = useRef(null);
  const inProcessingStatusColsRef = useRef(null);
  const [showCancelStatus, setShowCancelStatus] = useState(false);

  const filteredData = () => {
    let filtered = sortActivated ? sortedData : myData;

    if (startDate && endDate) {
      filtered = filtered.filter(
        (item) =>
          new Date(item.dateOfCreated) >= new Date(startDate) &&
          new Date(item.dateOfCreated) <= new Date(endDate)
      );
    }

    return filtered;
  };

  const status = (statusType) => {
    return filteredData().filter((person) => statusType === person.status);
  };

  const handleScroll = (ref) => {
    const element = ref.current;
    if (element.scrollHeight - element.scrollTop < 1.3 * element.clientHeight) {
      setVisibleItems((prevVisibleItems) => prevVisibleItems + 5);
    }
  };

  useEffect(() => {
    const newStatusElement = newStatusColsRef.current;
    const inProcessingStatusElement = inProcessingStatusColsRef.current;

    newStatusElement.addEventListener("scroll", () => handleScroll(newStatusColsRef));
    inProcessingStatusElement.addEventListener("scroll", () => handleScroll(inProcessingStatusColsRef));

    return () => {
      newStatusElement.removeEventListener("scroll", () => handleScroll(newStatusColsRef));
      inProcessingStatusElement.removeEventListener("scroll", () => handleScroll(inProcessingStatusColsRef));
    };
  }, []);
  const renderStatusElements = (statusType, ref) => {
    return status(statusType)
      .slice(0, visibleItems)
      .map((client) => (
        <li
          className="statusColsElement"
          key={client._id}
          onDoubleClick={() => handleClientDoubleClick(client._id)}
        >

          <div className="managers_name_block"><img className="clock_img" src={ManagerImg} alt="" />{client.managerID} </div>
          <div className="date_name_block"><img className="clock_img" src={ClockImg} alt="" />{formatDateTime(new Date(client.selectedDate))}</div>
          <div className="client_name_block"><img className="clock_img" src={ClientImg} alt="" />{client.clientName}</div>
          <div className="date_name_block" style={{ position: "absolute", bottom: "0", right: "0", color: "rgb(170 170 170)", backgroundColor: "#fff" }}>{client.dateOfCreated}</div>

          <div style={{ width: "max-content", textAlign: "center", position: "absolute", top: "0", right: "0", cursor: "pointer" }} onClick={() => handleClientClick(client._id)}><img className="clock_img" src={EditImg} alt="" /></div>
        </li>
      ));
  };

  const sortDate = () => {
    const sorted = filteredData().slice().sort((a, b) => {
      const firstDate = new Date(a.dateOfCreated);
      const secondDate = new Date(b.dateOfCreated);
      return firstDate - secondDate;
    });
    setSortedData(sorted);
    setSortActivated(true);
  };
  const sortDatePhone = () => {
    const sorted = filteredData().slice().sort((a, b) => {
      const firstDate = new Date(a.selectedDate);
      const secondDate = new Date(b.selectedDate);
      return firstDate - secondDate;
    });
    setSortedData(sorted);
    setSortActivated(true);
  };
  const sortByEmail = () => {
    const sorted = myData.slice().sort((a, b) => {
      const firstName = a.email.toLowerCase();
      const secondName = b.email.toLowerCase();
      if (firstName < secondName) {
        return -1;
      }
      if (firstName > secondName) {
        return 1;
      }
      return 0;
    });
    setSortedData(sorted);
    setSortActivated(true);
  };
  const sortByName = () => {
    const sorted = myData.slice().sort((a, b) => {
      const firstName = a.clientName.toLowerCase();
      const secondName = b.clientName.toLowerCase();
      if (firstName < secondName) {
        return -1;
      }
      if (firstName > secondName) {
        return 1;
      }
      return 0;
    });
    setSortedData(sorted);
    setSortActivated(true);
  };

  const cancelSort = () => {
    setSortActivated(false);
    setSortedData([]);
    setStartDate(null)
    setEndDate(null)
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  return (
    <div>

      <div className="sort_block">



        <div className="period_search">
          <div>Период:</div>
          <div className="period_inputs">
            <input className="date" type="date" onChange={handleStartDateChange} />
            <input className="date" type="date" placeholder="" onChange={handleEndDateChange} />
          </div>
        </div>
        <button onClick={sortDate}>Отсортировать по Дате</button>
        <button onClick={sortDatePhone}>Отсортировать по Дате созвона</button>
        <button onClick={sortByEmail}>Отсортировать по Email</button>
        <button onClick={sortByName}>Отсортировать по Имени</button>
        <button onClick={cancelSort}>Отменить сортировку</button>
        <div className="cancel_block">
          <div className="cancel_txt">Показать</div>
          <div className="cancel_checkbox">
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={showCancelStatus}
                onChange={() => setShowCancelStatus(!showCancelStatus)}
              />
              <span className="slider"></span>

            </label>
          </div>
          <div className="cancel_txt">Скрыть</div>
        </div>

      </div>

      <div className="statusBlock">
        <ul className="statusCols" ref={newStatusColsRef}>
          <div className="status_name"><h4>Потенциальный</h4></div>
          <div className="status_els">
            {renderStatusElements("new", newStatusColsRef)}
          </div>

        </ul>
        <ul className="statusCols" ref={inProcessingStatusColsRef}>

          <div className="status_name">
            <h4>Я подумаю, наберать систематично</h4>
          </div>
          <div className="status_els">
            {renderStatusElements("in_processing", inProcessingStatusColsRef)}

          </div>
        </ul>
        <ul className="statusCols" ref={inProcessingStatusColsRef}>
          <div className="status_name">
            <h4>Договорились, но не отгрузили</h4>

          </div>
          <div className="status_els">
            {renderStatusElements("agreed", inProcessingStatusColsRef)}

          </div>
        </ul>
        <ul className="statusCols" ref={inProcessingStatusColsRef}>
          <div className="status_name">
            <h4>Успешный</h4>

          </div>
          <div className="status_els">
            {renderStatusElements("successful", inProcessingStatusColsRef)}

          </div>
        </ul>
        <ul className="statusCols" ref={inProcessingStatusColsRef}>
          <div className="status_name">
            <h4>Клиент купил на стороне. Вернуть!</h4>

          </div>
          <div className="status_els">
            {renderStatusElements("return", inProcessingStatusColsRef)}

          </div>
        </ul>
        <ul className="statusCols" ref={inProcessingStatusColsRef}>
          <div className="status_name">
            <h4>НДС</h4>

          </div>
          <div className="status_els">
            {renderStatusElements("nds", inProcessingStatusColsRef)}

          </div>
        </ul>
        <ul className="statusCols" ref={inProcessingStatusColsRef}>
          <div className="status_name">
            <h4>Опт</h4>

          </div>
          <div className="status_els">
            {renderStatusElements("wholesale", inProcessingStatusColsRef)}

          </div>
        </ul>
        {showCancelStatus && <ul className="statusCols cancel" ref={inProcessingStatusColsRef}>
          <div className="status_name">
            <h4>Отменённые</h4>

          </div>
          <div className="status_els">
            {renderStatusElements("cancel", inProcessingStatusColsRef)}

          </div>
        </ul>}
      </div>

      <EditForm handleDateChange={handleDateChange} paymentArray={paymentArray} handleDeleteClient={handleDeleteClient} registrationDataClient={registrationDataClient} handleRegistrationClientChange={handleRegistrationClientChange} dataProducts={dataProducts} adminkey={keyManage} editClientMode={editClientMode} setSelectedClient={setSelectedClient} selectedClient={selectedClient} handleEditClient={handleEditClient} managerIDOptions={managerIDOptions} ManagerStatusOptions={ManagerStatusOptions} close={close} />
      <LeedInfo dataNotices={dataNotices} handleRegistrationNoticeChange={handleRegistrationNoticeChange} registrationDataNotice={registrationDataNotice} handleRegistrationNotice={handleRegistrationNotice} handleClientClick={handleClientClick} registrationDataClient={registrationDataClient} handleRegistrationClientChange={handleRegistrationClientChange} dataProducts={dataProducts} adminkey={keyManage} editClientViewMode={editClientViewMode} setSelectedClient={setSelectedClient} selectedClient={selectedClient} handleEditClient={handleEditClient} managerIDOptions={managerIDOptions} ManagerStatusOptions={ManagerStatusOptions} close={close} />
    </div>
  );
};

export default View;
