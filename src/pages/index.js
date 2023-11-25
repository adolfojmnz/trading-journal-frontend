import { useState, useEffect } from "react";

const WelcomePage = () => {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("username")) {
      setUsername(localStorage.getItem("username"));
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-start h-screen">
      <div className="mt-16">
        <p className="text-lg mb-6">
          {username ? (
            <span>Welcome, {username}!</span>
          ) : (
            <span>
              <a href="/auth/login">Log in</a> to get started!
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default WelcomePage;
