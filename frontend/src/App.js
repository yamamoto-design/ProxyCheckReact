import React, { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [search, setSearch] = useState("");
  const [showResult, setShowResult] = useState([]);

  const handleSearch = async () => {
    let data = await axios.post("http://localhost:5000/api/check-proxy", {
      country: search,
    });
    console.log(data.data.data);

    setShowResult(data.data.data);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🌍 Proxy Finder</h1>

      <input
        type="text"
        placeholder="Enter country or region (e.g., US)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleSearch} style={{ marginLeft: "8px" }}>
        Find
      </button>

      {showResult.length === 0 ? (
        <p>🔄 Loading proxies and location data...</p>
      ) : (
        <>
          <p>Showing {showResult.length} proxies</p>
          <table border="1" cellPadding="6" style={{ marginTop: "10px" }}>
            <thead>
              <tr>
                <th>Proxy</th>
                <th>IP</th>
                <th>Country</th>
                <th>Region</th>
              </tr>
            </thead>
            <tbody>
              {showResult.map((p, i) => (
                <tr key={i}>
                  <td>{p.proxy}</td>
                  <td>{p.ip}</td>
                  <td>{p.country}</td>
                  <td>{p.region}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default App;
