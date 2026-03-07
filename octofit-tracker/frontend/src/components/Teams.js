
import React, { useEffect, useState } from 'react';

const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTeams = () => {
    setLoading(true);
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const items = data.results || data;
        setTeams(items);
        setLoading(false);
        console.log('Teams API endpoint:', API_URL);
        console.log('Fetched teams:', items);
      });
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="card-title">Teams</h2>
            <button className="btn btn-primary" onClick={fetchTeams} disabled={loading}>
              {loading ? 'Loading...' : 'Refresh'}
            </button>
          </div>
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Members</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((t, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{t.name}</td>
                    <td>{Array.isArray(t.members) ? t.members.join(', ') : ''}</td>
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

export default Teams;
