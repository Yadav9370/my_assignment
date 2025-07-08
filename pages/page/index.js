import { useFormik } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      dueDate: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      description: Yup.string().required('Required'),
      dueDate: Yup.string().required('Required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      const newTask = {
        id: uuidv4(),
        name: values.name,
        description: values.description,
        dueDate: values.dueDate,
      };

      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      });

      if (res.ok) {
        resetForm();
        router.push('/page/appPage');
      } else {
        alert('Failed to add task');
      }
    },
  });

  return (
    <div className="container mt-5">
      <h2>TODO App - Add Task</h2>
      <form onSubmit={formik.handleSubmit} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Task Name</label>
          <input
            type="text"
            className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="invalid-feedback">{formik.errors.name}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className={`form-control ${formik.touched.description && formik.errors.description ? 'is-invalid' : ''}`}
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          />
          {formik.touched.description && formik.errors.description && (
            <div className="invalid-feedback">{formik.errors.description}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Due Date</label>
          <input
            type="date"
            className={`form-control ${formik.touched.dueDate && formik.errors.dueDate ? 'is-invalid' : ''}`}
            name="dueDate"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.dueDate}
          />
          {formik.touched.dueDate && formik.errors.dueDate && (
            <div className="invalid-feedback">{formik.errors.dueDate}</div>
          )}
        </div>
        <button type="submit" className="btn btn-success">Add Task</button>
      </form>
    </div>
  );
}
