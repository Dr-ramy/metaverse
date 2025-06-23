'use client';

import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  const router = useRouter();

  const handleNavigate = () => {
    router.push('/scenes');
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
      <button
        className="btn btn-primary btn-lg"
        onClick={handleNavigate}
      >
        Go to Scenes
      </button>
    </div>
  );
}
