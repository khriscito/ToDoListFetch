import React, { useState, useEffect } from "react";

const urlBase = "https://assets.breatheco.de/apis/fake/todos/user/";
const apiUsername = "khriscito";

const Input = () => {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const fetchTodoApi = async () => {
        try {
            const response = await fetch(`${urlBase}${apiUsername}`);
            const data = await response.json();
            console.log(data);
            setTasks(data);
        } catch (error) {
            console.log(error);
        }
    };

    const syncTasks = async (newTask) => {
        try {
            const response = await fetch(`${urlBase}${apiUsername}`, {
                method: 'PUT',
                body: JSON.stringify(newTask),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Error updating tasks');
            }

            fetchTodoApi();

        } catch (error) {
            console.log(error);
        }
    };

    const addTask = async (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            const newTasks = [...tasks, { label: inputValue, done: false }];
            setTasks(newTasks);
            setInputValue('');
            await syncTasks(newTasks);
        }
    };

    const removeTask = async (index) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
        await syncTasks(newTasks);
    };

    const removeAllTasks = async () => {
        setTasks([]);
        await syncTasks([]);
    };

    const pendingTasks = tasks.filter((task) => !task.done).length;

    useEffect(() => {
        fetchTodoApi();
    }, []);


  return (
    <div className="containerList">
      <div className="card text-center">
        <div className="card-header">
          <h1>To Do List</h1>
        </div>
        <div className="card-body">
          <div className="input-group input-group-sm mb-3">
          <form onSubmit={addTask}>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ingrese una tarea"
            />
            </form>
          </div>

          {tasks.length === 0 ? (
            <p>No hay tareas</p>
          ) : (
            tasks.map((task, index) => (
              <div
                key={index}
                className="d-flex justify-content-between"
              >
                <p>{task.label}</p>
                <button
                  type="button"
                  className="btn btn-danger hidden"
                  onClick={() =>  removeTask(index)}
                >
                  Click para eliminar de la lista
                </button>
              </div>
            ))
          )}
          <button onClick={removeAllTasks}>Borrar todas las tareas</button>
        </div>
        <div className="card-footer text-body-secondary">
          Quedan {pendingTasks} items
        </div>
      </div>
    </div>
  );
};

export default Input;


