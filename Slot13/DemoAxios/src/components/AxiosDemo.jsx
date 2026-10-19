import React, { useState, useEffect } from "react";
import axios from "axios";

function AxiosDemo() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts/1")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  if (error) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger" role="alert">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h1 className="text-primary fw-bold mb-4">
        Axios Demo
      </h1>

      {data ? (
        <div className="card shadow-sm">
          <div className="card-body">
            <h2 className="card-title">{data.title}</h2>

            <p className="card-text">{data.body}</p>

            <span className="badge bg-success">
              Post ID: {data.id}
            </span>
          </div>
        </div>
      ) : (
        <div className="alert alert-info" role="status">
          Loading...
        </div>
      )}
    </div>
  );
}

export default AxiosDemo;