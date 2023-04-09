import React, { useState } from "react";

const Input = () => {
  const [items, setItems] = useState([]);
  const [button, setButton] = useState(false);

  const handleItemChange = (newItem) => {
    setItems((allItems) => [...allItems, newItem]);
  };

  const handleEnterInput = (event) => {
    if (event.key === "Enter") {
      let newItem = event.target.value;
      handleItemChange(newItem);
      event.target.value = "";
    }
  };


  const handleDeleteItem = (index) => {
    setItems((allItems) => allItems.filter((item, i) => i !== index));
  };

  console.log(items)

  return (
    <div className="containerList">
      <div className="card text-center ">
        <div className="card-header">
          <h1>To Do List</h1>
        </div>
        <div className="card-body">
          <div className="input-group input-group-sm mb-3">
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              onKeyDown={handleEnterInput}
            />
          </div>

          {items.length == 0 ? (
            <p>No hay tareas</p>
          ) : (

          items.map((item, index) => {
            return (
              <div key={`${item}-${index}`}
                  className="d-flex justify-content-between">
                <p>
                  {item}
                </p>
                <button type="button" className="btn btn-danger hidden" onClick={() => handleDeleteItem(index)}>Click para eliminar de la lista</button>

              </div>
            );
          }))}
        </div>
        <div className="card-footer text-body-secondary">
          Quedan {items.length} items
        </div>
      </div>
    </div>
  );
};

export default Input;
