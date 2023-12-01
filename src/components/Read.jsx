import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser, showUser } from "../features/userDetailSlice";
import CustomModal from "./CustomModal";

const Read = () => {
  const dispatch = useDispatch();

  const [id, setId] = useState();

  const [radioData, setRadioData] = useState("");

  const [showPopup, setShowPopup] = useState(false);

  const { users, loading, searchData } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(showUser());
  }, []);

  if (loading) {
    return <h2>Loading</h2>;
  }

  return (
    <div>
      {showPopup && (
        <CustomModal
          id={id}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
        />
      )}
      <h2>All data</h2>
      <input
        className="form-check-input"
        name="department"
        checked={radioData === ""}
        type="radio"
        onChange={(e) => setRadioData("")}
      />
      <label className="form-check-label">All</label>
      <input
        className="form-check-input"
        name="department"
        value="Softdev"
        checked={radioData === "Softdev"}
        type="radio"
        onChange={(e) => setRadioData(e.target.value)}
      />
      <label className="form-check-label">Softdev</label>
      <input
        className="form-check-input"
        name="department"
        value="Machlearning"
        checked={radioData === "Machlearning"}
        type="radio"
        onChange={(e) => setRadioData(e.target.value)}
      />
      <label className="form-check-label">Machlearning</label>

      <div>
        {users &&
          users
            .filter((item) => {
              if (searchData.length === 0) {
                return item;
              } else {
                return (
                  item.name.toLowerCase().includes(searchData.toLowerCase()) ||
                  item.salary.includes(searchData)
                );
              }
            })

            .filter((item) => {
              if (radioData === "Softdev") {
                return item.department === radioData;
              } else if (radioData === "Machlearning") {
                return item.department === radioData;
              } else return item;
            })

            .map((item) => (
              <div key={item.id} className="card w-50 mx-auto my-2">
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {item.email}
                  </h6>
                  <p className="card-text">{item.salary}</p>

                  <button
                    className="card-link"
                    onClick={() => [setId(item.id), setShowPopup(true)]}
                  >
                    View
                  </button>
                  <Link to={`/edit/${item.id}`} className="card-link">
                    Edit
                  </Link>
                  <Link
                    onClick={() => dispatch(deleteUser(item.id))}
                    className="card-link"
                  >
                    Delete
                  </Link>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Read;
