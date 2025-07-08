import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function UpdatePage() {
  const [searchName, setSearchName] = useState(''); // For finding the task
  const [name, setName] = useState('');             // Editable name after finding
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [taskFound, setTaskFound] = useState(false);

  const handleFetchTask = async () => {
    try {
      const res = await fetch('/api/tasks');
      const data = await res.json();

      const foundTask = data.find((task) => task.name === searchName);
      if (foundTask) {
        setName(foundTask.name); // Set editable name
        setDescription(foundTask.description);
        setDueDate(foundTask.dueDate);
        setTaskFound(true);
      } else {
        alert('Task not found');
        setTaskFound(false);
      }
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch('/api/tasks', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oldName: searchName, // Send old name to find original task
          name,
          description,
          dueDate,
        }),
      });

      if (res.ok) {
        alert('Task updated successfully');
        setTaskFound(false);
        setSearchName('');
        setName('');
        setDescription('');
        setDueDate('');
      } else {
        const data = await res.json();
        alert(`Failed to update: ${data.message}`);
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>TODO App - Update Task</h2>

      <div className="mb-3">
        <label className="form-label">Task Name (to find)</label>
        <input
          type="text"
          className="form-control"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={handleFetchTask}>
          Find Task
        </button>
      </div>

      {taskFound && (
        <>
          <div className="mb-3">
            <label className="form-label">Name (update)</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Due Date</label>
            <input
              type="date"
              className="form-control"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <button className="btn btn-warning" onClick={handleUpdate}>
            Update Task
          </button>
        </>
      )}
    </div>
  );
}
