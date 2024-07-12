import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ToDoItem from './ToDoItem';

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  background: #ffffff;
  padding: 10px;
  margin-top: -10px;
  width: 200vh;
  height: 100vh;
  overflow: auto;
`;

const ToDoList: React.FC = () => {
  const [todos, setTodos] = useState<{ id: number; text: string; completed: boolean; favorite: boolean }[]>(JSON.parse(sessionStorage.getItem('todos') || '[]'));
  const [inputValue, setInputValue] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'completed' | 'uncompleted' | 'favorite'>('all');

  useEffect(() => {
    sessionStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleDeleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleFavoriteToggle = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, favorite: !todo.favorite } : todo
      )
    );
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos((prevTodos) => [
        ...prevTodos,
        {
          id: prevTodos.length > 0 ? prevTodos[prevTodos.length - 1].id + 1 : 1,
          text: inputValue,
          completed: false,
          favorite: false,
        }
      ]);
      setInputValue('');
    }
  };

  const handleTodoToggle = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const getFilteredTodos = () => {
    switch (filterType) {
      case 'completed':
        return todos.filter((todo) => todo.completed);
      case 'uncompleted':
        return todos.filter((todo) => !todo.completed);
      case 'favorite':
        return todos.filter((todo) => todo.favorite);
      default:
        return todos;
    }
  };

  const filteredTodos = getFilteredTodos();

  return (
    <CenteredContainer>
      <h1>My To-Do List</h1>
      <div>
        <label>
          Show:
          <select value={filterType} onChange={(e) => setFilterType(e.target.value as 'all' | 'completed' | 'uncompleted' | 'favorite')}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
            <option value="favorite">Favorite</option>
          </select>
        </label>
      </div>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <button onClick={handleAddTodo}>Add</button>
      {filteredTodos.map((todo) => (
        <ToDoItem
          key={todo.id}
          todo={todo}
          onToggle={handleTodoToggle}
          onDelete={handleDeleteTodo}
          onFavoriteToggle={handleFavoriteToggle}
        />
      ))}
    </CenteredContainer>
  );
};

export default ToDoList;
