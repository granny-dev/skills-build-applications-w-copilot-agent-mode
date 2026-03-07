
import React, { useEffect, useState } from 'react';

const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchActivities = () => {
    setLoading(true);
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const items = data.results || data;
        setActivities(items);
        setLoading(false);
        console.log('Activities API endpoint:', API_URL);
        console.log('Fetched activities:', items);
      });
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="card-title">Activities</h2>
            <button className="btn btn-primary" onClick={fetchActivities} disabled={loading}>
              {loading ? 'Loading...' : 'Refresh'}
            </button>
          </div>
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>User</th>
                  <th>Activity</th>
                  <th>Reps</th>
                  <th>Distance (km)</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((a, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{a.user}</td>
                    <td>{a.activity}</td>
                    <td>{a.reps || '-'}</td>
                    <td>{a.distance_km || '-'}</td>
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

export default Activities;
