import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [editIndex, setEditIndex] = useState(null); // Track the index of the item being edited
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const handleAddTodo = () => {
    if (newTitle.trim() === "" || newDescription.trim() === "") return;

    let newTodoItem = {
      title: newTitle,
      description: newDescription,
      completed: false,
    };

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);

    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
    setNewTitle("");
    setNewDescription("");
  };

  const handleCompleteTodo = (index) => {
    let updatedTodos = [...allTodos];
    updatedTodos[index].completed = true;

    setTodos(updatedTodos);
    localStorage.setItem('todolist', JSON.stringify(updatedTodos));
  };

  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);

    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  };

  const handleEditTodo = (index) => {
    // Set the item being edited
    setEditIndex(index);
    setEditTitle(allTodos[index].title);
    setEditDescription(allTodos[index].description);
  };

  const handleSaveEdit = (index) => {
    let updatedTodos = [...allTodos];
    updatedTodos[index].title = editTitle;
    updatedTodos[index].description = editDescription;

    setTodos(updatedTodos);
    localStorage.setItem('todolist', JSON.stringify(updatedTodos));

    // Reset edit state
    setEditIndex(null);
    setEditTitle("");
    setEditDescription("");
  };

  useEffect(() => {
    const savedTodo = localStorage.getItem('todolist');

    if (savedTodo) {
      try {
        setTodos(JSON.parse(savedTodo));
      } catch (error) {
        console.error("Error parsing JSON from localStorage:", error);
        setTodos([]);
      }
    }
  }, []);

  return (
    <div className="App">
      <h1>My Todos</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </div>
          <div className="todo-input-item">
            <button type="button" onClick={handleAddTodo} className="primaryBtn">
              Add Todo
            </button>
          </div>
        </div>

        <div className="todo-list">
          {allTodos.map((item, index) => {
            return (
              <div
                className={`todo-list-item ${item.completed ? "completed" : ""}`}
                key={index}
              >
                {editIndex === index ? (
                  // Render editable inputs if this item is being edited
                  <div>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <input
                      type="text"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                    />
                  </div>
                ) : (
                  // Otherwise, display the todo item normally
                  <div>
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                  </div>
                )}

                <div>
                  {!item.completed && editIndex !== index && (
                    <button
                      className="todo-list-btn1"
                      onClick={() => handleCompleteTodo(index)}
                    >
                      Complete
                    </button>
                  )}
                  {editIndex === index ? (
                    <button
                      className="todo-list-btn1"
                      onClick={() => handleSaveEdit(index)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="todo-list-btn1"
                      onClick={() => handleEditTodo(index)}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="todo-list-btn2"
                    onClick={() => handleDeleteTodo(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
