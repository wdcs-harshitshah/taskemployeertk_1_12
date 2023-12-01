import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser } from "../features/userDetailSlice";

const Create = () => {
  const [users, setUsers] = useState({});

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const getUserData = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("users...", users);
    dispatch(createUser(users));
    navigate("/read");
  };

  return (
    <div>
      <h2 className="my-2">Fill the data</h2>
      <form className="w-50 mx-auto my-5" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Employee Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            onChange={getUserData}
            required
          />
        </div>
        <div classNamess="mb-3">
          <label className="form-label">Employee Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            onChange={getUserData}
            required
          />
        </div>
        <div classNames="mb-3">
          <label className="form-label">Salary </label>
          <input
            type="text"
            name="salary"
            className="form-control"
            onChange={getUserData}
            required
          />
        </div>
        <div className="mb-3">
          <input
            className="form-check-input"
            name="department"
            value="Softdev"
            type="radio"
            onChange={getUserData}
            required
          />
          <label className="form-check-label">Softdev</label>
        </div>
        <div className="mb-3">
          <input
            className="form-check-input"
            name="department"
            value="Machlearning"
            type="radio"
            onChange={getUserData}
          />
          <label className="form-check-label">Machlearning</label>
        </div>

        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Create;
