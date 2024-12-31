const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/Todo');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB (Update with your credentials)
mongoose.connect('mongodb+srv://khushibhandari31:khush23@cluster0.5vcna.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Failed to connect to MongoDB:', err));

// Get all todos
app.get('/get', (req, res) => {
  TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

// Add new todo
app.post('/add', (req, res) => {
  const { task } = req.body;
  TodoModel.create({ task })
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

// Update todo (mark as completed)
app.put('/update/:id', (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndUpdate(id, { done: true }, { new: true })
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

// Delete todo
app.delete('/delete/:id', (req, res) => {
  const taskId = req.params.id;
  TodoModel.findByIdAndDelete(taskId)
    .then(result => res.status(200).json({ message: 'Task deleted successfully' }))
    .catch(err => res.status(500).json({ message: 'Error deleting task' }));
});



app.listen(3005,()=>{
  console.log("server running on 3005");
})
