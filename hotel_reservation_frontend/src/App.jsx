import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/test")
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="text-center text-white bg-black h-screen flex items-center justify-center">
      <h1 className="text-2xl">Backend Response: {message}</h1>
    </div>
  );
}

export default App;
