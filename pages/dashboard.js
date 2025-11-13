import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import jwt_decode from 'jwt-decode';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login'); // redirect if no token
      return;
    }

    try {
      const decoded = jwt_decode(token);

      // Check if token is expired
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        router.push('/login');
        return;
      }

      // Defer state update to avoid cascading renders
      setTimeout(() => {
        setUser(decoded);
      }, 0);

    } catch (err) {
      localStorage.removeItem('token');
      router.push('/login');
    }
  }, [router]);

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? (
        <p>Welcome, user ID: {user.id}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
