import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  align-items: center;
`;

const InputField = styled.input`
  padding: 10px;
  font-size: 16px;
  border-radius: 10px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  width: 300px;
  color: black;

  &:focus {
    outline: none;
    border-color: #0066cc;
  }
`;

const AddButton = styled.button`
  padding: 10px 20px;
  background-color: #0066cc;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  width: 300px;

  &:hover {
    background-color: #005bb5;
  }
`;

function Create({ addNewTask }) {
  const [task, setTask] = useState('');

  const handleAdd = () => {
    if (task.trim() !== '') {
      axios
        .post('https://to-do-list-mern-one.vercel.app/add', { task })
        .then((result) => {
          addNewTask(result.data); // Pass the newly added task to the parent component
          setTask(''); // Clear input field after adding task
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <SearchContainer>
      <InputField
        type="text"
        placeholder="Enter Task"
        onChange={(e) => setTask(e.target.value)}
        value={task}
      />
      <AddButton type="button" onClick={handleAdd}>
        ADD
      </AddButton>
    </SearchContainer>
  );
}

export default Create;
