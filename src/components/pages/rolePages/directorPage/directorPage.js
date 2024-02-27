import { useState } from "react";

import { AdminForm } from "../../../forms/AdminForm";

const DirectorPage = () => {
  const [formState, setFormState] = useState(false);

  const showForm = () => {
    setFormState(true);
  }

  const hideForm = () => {
    setFormState(false)
  }

  return (
    <div>
      <h1>Director</h1>
      <div>
        <button onClick={showForm}>Создать работника</button>
      </div>
      <div>
        {formState && <AdminForm hideForm={hideForm}/>}
      </div>
    </div>
  );
};

export default DirectorPage;
