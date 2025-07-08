import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AppPage() {
  const router = useRouter();

  return (
    <div className="container mt-5 text-center">
      <h2>TODO App - Actions</h2>
      <div className="d-grid gap-3 col-6 mx-auto mt-4">
        <button className="btn btn-primary" onClick={() => router.push('/page/show')}>
          Show Tasks
        </button>
        <button className="btn btn-danger" onClick={() => router.push('/page/delete')}>
          Delete Task
        </button>
        <button className="btn btn-danger" onClick={() => router.push('/page/update')}>
          update Task
        </button>
      </div>
    </div>
  );
}
