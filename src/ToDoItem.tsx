import React from 'react';



interface ToDoItemProps {
  todo: { id: number; text: string; completed: boolean; favorite: boolean };
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onFavoriteToggle: (id: number) => void;
}

const ToDoItem: React.FC<ToDoItemProps> = ({ todo, onToggle, onDelete, onFavoriteToggle }) => {
  const handleToggle = () => {
    onToggle(todo.id);
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  const handleFavoriteToggle = () => {
    onFavoriteToggle(todo.id);
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
      />
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.text}
      </span>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleFavoriteToggle}>{todo.favorite ? 'Favorite' : 'Unfovarite'}</button>
    </div>
  );
};

export default ToDoItem;
