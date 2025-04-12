import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { useSelector } from "react-redux";

const SignUp = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [data, setData] = useState({ username: "", password: "", email: "" });
  const navigate = useNavigate();
  
  if (isLoggedIn === true) {
    navigate("/");
  }
  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const submit = async () => {
    try {
      if (data.username === "" || data.email === "" || data.password === "") {
        alert("All fields is required");
      } else {
        const response = await axios.post(
          "https://backend-steel-five-29.vercel.app/api/v1/sign-in",
          data
        );
        setData({ username: "", password: "", email: "" });
        alert(response.data.message);
        navigate("/");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className=" h-[98vh] flex justify-center items-center">
      <div className="w-2/6 p-4 rounded bg-gray-800">
        <h2 className="text-2xl font-semibold">Sign Up</h2>
        <input
          type="username"
          name="username"
          value={data.username}
          onChange={change}
          placeholder="username"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
        />
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={change}
          placeholder="xyz@example.com"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
          required
        />
        <input
          type="password"
          name="password"
          value={data.password}
          onChange={change}
          placeholder="password"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
        />
        <div className="w-full flex justify-between items-center">
          <button
            onClick={submit}
            className="text-xl font-semibold bg-blue-400 text-black px-3 py-2 rounded"
          >
            Signup
          </button>
          <div className="flex items-center">
            <p className="text-gray-400">Already having an account?</p>
            <Link
              to="/login"
              className="text-gray-400 hover:text-gray-200 ml-1"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
