let tasks = [];

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(tasks);
  } else if (req.method === 'POST') {
    const task = req.body;
    tasks.push(task);
    res.status(201).json({ message: 'Task added', task });
  } else if (req.method === 'DELETE') {
    const { name } = req.body;
    const initialLength = tasks.length;
    tasks = tasks.filter((task) => task.name !== name);

    if (tasks.length < initialLength) {
      res.status(200).json({ message: 'Task deleted' });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } else if (req.method === 'PUT') {
  const { oldName, name: newName, description, dueDate } = req.body;
  const task = tasks.find((task) => task.name === oldName);

  if (task) {
    if (newName !== undefined) task.name = newName;
    if (description !== undefined) task.description = description;
    if (dueDate !== undefined) task.dueDate = dueDate;

    res.status(200).json({ message: 'Task updated', task });
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
