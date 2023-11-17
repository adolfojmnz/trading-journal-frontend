import { useState, useEffect } from "react";
import { getCurrentUser } from "@/app/api/accounts";


const CurrentAccount = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const fetchCurrentUser = async () => {
    const response = await getCurrentUser();

    try {
      if (!response.ok) {
        throw new Error('Error fetching profile details');
      } else {
        const data = await response.json();
        setUser(data);
      }
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  if (error) {
    return <div>Got an error while loading profile data: {error}</div>
  }

  if (!user) {
    return <div>Profile data could not be loaded.</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <div className="bg-white rounded shadow p-4">
        <div className="mb-4">
          <label className="font-bold">Username:</label>
          <p>{user.username}</p>
        </div>
        <div className="mb-4">
          <label className="font-bold">Name:</label>
          <p>{user.first_name} {user.last_name}</p>
        </div>
        <div className="mb-4">
          <label className="font-bold">Email:</label>
          <p>{user.email}</p>
        </div>
        <div className="mb-4">
          <label className="font-bold">Date Joined:</label>
          <p>{user.date_joined}</p>
        </div>
        <div className="mb-4">
          <label className="font-bold">Last Login:</label>
          <p>{user.last_login}</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentAccount;