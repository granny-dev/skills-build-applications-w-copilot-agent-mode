
import React, { useEffect, useState } from 'react';

const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLeaderboard = () => {
    setLoading(true);
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const items = data.results || data;
        setLeaderboard(items);
        setLoading(false);
        console.log('Leaderboard API endpoint:', API_URL);
        console.log('Fetched leaderboard:', items);
      });
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="card-title">Leaderboard</h2>
            <button className="btn btn-primary" onClick={fetchLeaderboard} disabled={loading}>
              {loading ? 'Loading...' : 'Refresh'}
            </button>
          </div>
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Team</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((l, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{l.team}</td>
                    <td>{l.points}</td>
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

export default Leaderboard;
