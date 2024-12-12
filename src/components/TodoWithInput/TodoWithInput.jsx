import React, { useState, useRef } from 'react';
import './TodoWithInput.css';

const TodoWithInput = () => {
  const [newTodoText, setNewTodoText] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [filter, setFilter] = useState('all');
  const inputRef = useRef(null);

  const addTodoHandler = () => {
    if (newTodoText.trim()) {
      setTodoList((prevTodoList) => [
        ...prevTodoList,
        { id: Date.now(), text: newTodoText, completed: false },
      ]);
      setNewTodoText('');
      inputRef.current.focus();
    }
    console.log('todoList -> ', todoList);
  };

  const handleComplete = (todoId) => {
    setTodoList((prevTodoList) =>
      prevTodoList.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const removeTodoHandler = (todoId) => {
    setTodoList((prevTodoList) =>
      prevTodoList.filter((todo) => todo.id !== todoId),
    );
  };

  const filteredTodoList = todoList.filter((todo) => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'uncompleted') return !todo.completed;
    return true; // 'all' filter
  });

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="todo-container">
      <h2>Functional TODO with a Text Input</h2>
      <div className="todo-input-container">
        <input
          id="new-todo"
          type="text"
          className="todo-input"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          ref={inputRef}
          placeholder="Enter a new todo..."
          autoFocus
        />
        <button className="todo-btn" onClick={addTodoHandler}>
          Add
        </button>
      </div>
      <div className="filter-container">
        <label htmlFor="filter-select" className="sr-only">
          Filter Todos
        </label>
        <select
          id="filter-select"
          className="filter-select"
          value={filter}
          onChange={handleFilterChange}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </div>
      {todoList.length === 0 ? (
        <p className="empty-list-message">No Todos. Start adding some!</p>
      ) : (
        <ul className="todo-item-container">
          {filteredTodoList.map((todo) => (
            <li className="todo-item" key={todo.id}>
              <div>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleComplete(todo.id)}
                  id={`todo-${todo.id}`}
                />
                <label htmlFor={`todo-${todo.id}`} className="no-bullets">
                  {todo.text}
                </label>
              </div>
              <button
                className="delete-btn"
                onClick={() => removeTodoHandler(todo.id)}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoWithInput;
