import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "../features/userDetailSlice";

const Update = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [updateData, setUpdateData] = useState();

  const { users, loading } = useSelector((state) => state.app);

  useEffect(() => {
    if (id) {
      const singleUser = users.filter((item) => item.id === id);
      setUpdateData(singleUser[0]);
    }
  }, []);

  const newData = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  console.log("updated data", updateData);

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUser(updateData));
    navigate("/read");
  };

  return (
    <div>
      <h2 className="my-2">Edit the Employee data</h2>
      <form className="w-50 mx-auto my-5" onSubmit={handleUpdate}>
        <div class="mb-3">
          <label class="form-label">Name</label>
          <input
            type="text"
            name="name"
            class="form-control"
            value={updateData && updateData.name}
            onChange={newData}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input
            type="email"
            name="email"
            class="form-control"
            value={updateData && updateData.email}
            onChange={newData}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Salary</label>
          <input
            type="text"
            name="salary"
            class="form-control"
            value={updateData && updateData.salary}
            onChange={newData}
          />
        </div>
        <div class="mb-3">
          <input
            class="form-check-input"
            name="department"
            value="Softdev"
            type="radio"
            checked={updateData && updateData.department === "Softdev"}
            onChange={newData}
          />
          <label class="form-check-label">Softdev</label>
        </div>
        <div class="mb-3">
          <input
            class="form-check-input"
            name="department"
            value="Machlearning"
            type="radio"
            checked={updateData && updateData.department === "Machlearning"}
            onChange={newData}
          />
          <label class="form-check-label">Machlearning</label>
        </div>

        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Update;