import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function DeletePage() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleDelete = async () => {
    const res = await fetch('/api/tasks', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });

    const data = await res.json();
    setMessage(data.message);

    if (res.ok) {
      setName('');
    }
  };

  return (
    <div className="container mt-5">
      <h2>TODO App - Delete Task</h2>

      <div className="mb-3">
        <label className="form-label">Task Name </label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <button className="btn btn-danger" onClick={handleDelete}>
        Delete Task
      </button>

      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}
