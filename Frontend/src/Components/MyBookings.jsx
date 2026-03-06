import React, { useEffect, useState } from "react";
import axios from "axios";

function MyBookings() {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {

    axios.get("http://localhost:7000/user/getbookings")
      .then((res) => {
        console.log("Bookings:", res.data);
        setBookings(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  return (
    <div style={{ padding: "40px" }}>

      <h2 style={{ textAlign: "center" }}>My Bookings</h2>

      {bookings.length === 0 ? (

        <h3 style={{ textAlign: "center" }}>No Bookings Found</h3>

      ) : (

        bookings.map((b, i) => (

          <div
            key={i}
            style={{
              border: "1px solid gray",
              margin: "20px",
              padding: "20px",
              borderRadius: "10px",
              background: "#f2f2f2"
            }}
          >

            <h3>Temple: {b.templeName}</h3>
            <p>Name: {b.name}</p>
            <p>Email: {b.email}</p>
            <p>Persons: {b.quantity}</p>
            <p>Total Amount: ₹{b.totalamount}</p>
            <p>Date: {b.BookingDate}</p>

          </div>

        ))

      )}

    </div>
  );
}

export default MyBookings