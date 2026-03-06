import React, { useEffect, useState } from "react";
import axios from "axios";

function Temples() {

  const [temples, setTemples] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:7000/organizer/gettemples")
      .then((res) => {
        setTemples(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ textAlign: "center" }}>Temples</h2>

      {temples.map((t, i) => (
        <div
          key={i}
          style={{
            border: "1px solid gray",
            margin: "20px",
            padding: "15px",
            borderRadius: "10px",
          }}
        >
          <img
            src={t.templeImage}
            alt={t.templeName}
            style={{ width: "300px", height: "200px" }}
          />

          <h3>{t.templeName}</h3>
          <p>{t.location}</p>
          <p>{t.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Temples;