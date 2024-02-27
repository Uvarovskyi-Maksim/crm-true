import React, { useState } from "react";

const FormClients = ({hideForm}) => {

  return (
    <form >
      <label htmlFor="clientName">Client Name:</label>
      <input
        type="text"
        id="clientName"
        name="clientName"
        required
      />

      <label htmlFor="orderedGasAmount">Ordered Gas Amount:</label>
      <input
        type="text"
        id="orderedGasAmount"
        name="orderedGasAmount"
        required
      />

      <label htmlFor="conversationDuration">Conversation Duration:</label>
      <input
        type="text"
        id="conversationDuration"
        name="conversationDuration"
        required
      />

      <label htmlFor="reportText">Report Text:</label>
      <textarea
        id="reportText"
        name="reportText"
        required
      ></textarea>
        <button onClick={hideForm}>Отмена</button>
      <button type="submit">Submit Report</button>
    </form>
  );
};

export default FormClients;
