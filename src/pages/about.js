const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">About Forex App</h1>
      <p className="text-lg mb-6">
        Forex App is a comprehensive trading application designed to help users
        manage their forex trades effectively. It offers the following features:
      </p>
      <h2 className="text-2xl font-bold mb-2">Features</h2>
      <ul className="list-disc ml-6">
        <li className="mb-2">
          User authentication: Secure user registration and login functionality.
        </li>
        <li className="mb-2">
          Trading entry management: Create, update, and delete trading entries.
        </li>
        <li className="mb-2">
          Performance analysis: Calculate and display trading performance
          metrics.
        </li>
        <li className="mb-2">
          Data visualization: Generate charts and graphs to visualize trading
          data.
        </li>
        <li className="mb-2">
          API endpoints: Expose RESTful API endpoints for frontend integration.
        </li>
      </ul>
    </div>
  );
};

export default AboutPage;
