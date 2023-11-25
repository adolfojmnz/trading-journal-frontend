export default function Logout() {
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    localStorage.clear("username");
    localStorage.setItem("isLoggedIn", false);
    localStorage.setItem("accessToken", null);
    localStorage.setItem("refreshToken", null);

    // blacklist tokens
    window.location.href = "/";
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1 className="heading">Logout</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <p>Do you want to log out?</p>
          </div>
          <button type="submit" className="submit-button">
            Logout
          </button>
        </form>
      </div>
    </div>
  );
}
