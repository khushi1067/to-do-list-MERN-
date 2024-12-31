import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Create from './Create';

const funkyFontFamily = `'Comic Sans MS', cursive, sans-serif, 'Pacifico', 'Dancing Script'`;

const Container = styled.div`
  padding: 30px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  min-height: 100vh;
  background-image: url('/images/background.svg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  color: black;
  font-family: ${funkyFontFamily};

  @media (max-width: 768px) {
    padding: 20px 12px;
  }
`;

const TaskBox = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  padding: 15px 20px;
  border-radius: 10px;
  margin-top: 10px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 38px;
  font-weight: bold;
  text-align: center;
  color: #ffffff;
`;

const TaskContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid #ddd;

  .checkbox {
    margin-right: 10px;
  }

  .delete-icon {
    cursor: pointer;
    color: red;
  }

  .task-text {
    font-size: 18px;
    transition: all 0.3s ease-in-out;

    &.completed {
      text-decoration: line-through;
      color: #888;
    }
  }
`;

function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3005/get')
      .then((result) => setTodos(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleEdit = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo._id === id ? { ...todo, done: !todo.done } : todo
    );
    setTodos(updatedTodos);

    axios
      .put('http://localhost:3005/update/' + id)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo._id !== id);
    setTodos(updatedTodos);

    axios
      .delete('http://localhost:3005/delete/' + id)
      .then((result) => {
        console.log('Task deleted:', result);
      })
      .catch((err) => {
        console.log('Error deleting task:', err);
        setTodos([...todos, todos.find((todo) => todo._id === id)]);
      });
  };

  const handleAddTask = (newTask) => {
    setTodos([...todos, newTask]);
  };

  return (
    <Container>
      <Title>To Do List</Title>
      <Create addNewTask={handleAddTask} />
      {todos.length === 0 ? (
        <div>
          <h2>No tasks found</h2>
        </div>
      ) : (
        <TaskBox>
          {todos.map((todo) => (
            <TaskContainer key={todo._id}>
              <div>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={todo.done}
                  onChange={() => handleEdit(todo._id)}
                />
                <span className={`task-text ${todo.done ? 'completed' : ''}`}>
                  {todo.task}
                </span>
              </div>
              <div className="delete-icon" onClick={() => handleDelete(todo._id)}>
                🗑️
              </div>
            </TaskContainer>
          ))}
        </TaskBox>
      )}
    </Container>
  );
}

export default Home;
