import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaSignOutAlt } from 'react-icons/fa';

const Ulogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();

    let payload = { email, password };

    axios
      .post("http://localhost:7000/user/ulogin", payload)
      .then((res) => {
        console.log("login: " + res.data.Status);

        if (res.data.Status === "Success") {

          console.log(res.data.user);

          // SAVE USER DATA
          localStorage.setItem("user", JSON.stringify(res.data.user));

          // IMPORTANT: SAVE USER ID FOR BOOKINGS
          localStorage.setItem("userId", res.data.user.id);

          alert("Login Successful");

          navigate("/uhome");
        } else {
          alert("Wrong credentials");
        }
      })
      .catch((err) => console.log(err));
  };

  const formHandle1 = (e) => {
    e.preventDefault();
    navigate("/usignup");
  };

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-white">

        <h2
          style={{
            position: "relative",
            bottom: "300px",
            right: "300px",
            transform: "scaleX(-1.5)",
          }}
        >
          <Link to="/" className="text-gray-500 hover:text-gray-900">
            <FaSignOutAlt />
          </Link>
        </h2>

        <div
          className="relative bg-green-700 p-8 rounded-md shadow-md overflow-hidden"
          style={{ display: "flex", height: "420px", width: "620px" }}
        >
          <div>
            <img
              src="https://i.pinimg.com/originals/9a/a6/12/9aa612d9c56c38e14b009f2184b67039.jpg"
              style={{ marginRight: "35px", height: "360px", width: "270px" }}
            />
          </div>

          <div className="relative z-10" style={{ width: "270px" }}>
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-4">
                Login to user account
              </h2>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>

              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Email address
                </label>

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  placeholder="Email address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Password
                </label>

                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  placeholder="Password"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="bg-red-300 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Log in
                </button>

                <br />

                <p className="mt-2 text-sm text-gray-400">
                  Don't have an account? Create

                  <button
                    onClick={formHandle1}
                    className="ml-2 text-red-500 hover:underline"
                  >
                    Signup
                  </button>
                </p>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ulogin;