
import React, { useEffect, useState } from 'react';

const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWorkouts = () => {
    setLoading(true);
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const items = data.results || data;
        setWorkouts(items);
        setLoading(false);
        console.log('Workouts API endpoint:', API_URL);
        console.log('Fetched workouts:', items);
      });
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="card-title">Workouts</h2>
            <button className="btn btn-primary" onClick={fetchWorkouts} disabled={loading}>
              {loading ? 'Loading...' : 'Refresh'}
            </button>
          </div>
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Suggested For</th>
                </tr>
              </thead>
              <tbody>
                {workouts.map((w, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{w.name}</td>
                    <td>{Array.isArray(w.suggested_for) ? w.suggested_for.join(', ') : ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Workouts;
