import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./UserProfilenew.css";
import ChangePassword from "./changepass.jsx"; // Import component ChangePassword

const UserProfileCard = ({ updateLatestFullName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dob, setDob] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(true);
<<<<<<< HEAD
  const [latestFullName, setLatestFullName] = useState("");
=======
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [userData, setUserData] = useState(null);
  const handleCloseChangePassword = () => {
    setShowChangePassword(false);
  };
>>>>>>> 30cab94704095b32865d9ac01ba934f4f8aa3155
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const userDataString = localStorage.getItem("userData");

    if (!userDataString) {
      throw new Error("User data not found in localStorage.");
    }
    const userData = JSON.parse(userDataString);
    setUserData(userData); // Set userData state
    const userId = userData.userID;
    axios
      .get(`http://localhost:5000/api/v1/user/${userId}/getDetail`)
      .then((response) => {
        const userData = response.data.data;
        if (userData) {
          setFullName(userData.fullName || "");
          setEmail(userData.email || "");
          setPhoneNumber(userData.phoneNumber || "");
          setDob(userData.dob || "");
          setRole(userData.role || "");
        } else {
          setFullName("");
          setEmail("");
          setPhoneNumber("");
          setDob("");
          setRole("");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user detail:", error);
        setFullName("");
        setEmail("");
        setPhoneNumber("");
        setDob("");
        setRole("");
        setIsLoading(false);
      });
  };

  const handleSave = () => {
<<<<<<< HEAD
    localStorage.clear();
    // Kiểm tra các trường bắt buộc
=======
>>>>>>> 30cab94704095b32865d9ac01ba934f4f8aa3155
    if (!fullName || !phoneNumber || !dob) {
      toast.error("Please complete all information.");
      return;
    }

    if (phoneNumber.length < 10 || phoneNumber.length > 11) {
      toast.error("Invalid phone number.");
      return;
    }

    const today = new Date();
    const dobDate = new Date(dob);
    const ageDiff = today.getFullYear() - dobDate.getFullYear();
    const monthDiff = today.getMonth() - dobDate.getMonth();
    const age =
      monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())
        ? ageDiff - 1
        : ageDiff;
    if (age < 16) {
      toast.error("You must be 16 years or older.");
      return;
    }

    setIsEditing(false);
    const userDataString = localStorage.getItem("userData");
    if (!userDataString) {
      throw new Error("User data not found in localStorage.");
    }
    const userData = JSON.parse(userDataString);
    const userId = userData.userID;

    const updatedUserData = {
      fullName: fullName,
      email: email,
      phoneNumber: phoneNumber,
      dob: dob,
    };

    axios
      .put(
        `http://localhost:5000/api/v1/user/${userId}/update`,
        updatedUserData
      )
      .then((response) => {
        console.log("User data updated successfully:", response.data);
        setFullName(updatedUserData.fullName);
        updateLatestFullName(updatedUserData.fullName);
<<<<<<< HEAD
        toast.success("Thông tin đã được cập nhật thành công!");
        localStorage.setItem('userData', JSON.stringify(userData));
=======
        toast.success("Update profile success!");
>>>>>>> 30cab94704095b32865d9ac01ba934f4f8aa3155
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
      });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  const handleChangePasswordClick = () => {
    setShowChangePassword(true);
  };
  const handleChangePasswordSuccess = () => {
    toast.success("Change password success!");
  };
  return (
    <>
      <ToastContainer position="top-right" />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="container-fluid d-flex justify-content-center align-items-center vh-90">
          <div className="container snippet -mt-40">
            <div className="row">
              <div className="col-md-12">
                <h1 className="texttitle">User Profile</h1>
                <br />
              </div>
              <div className="col-md-4 m-6">
                <div className="d-flex flex-column align-items-center text-center">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar6.png"
                    alt="Admin"
                    className="rounded-circle p-1 bg-primary"
                    width="110"
                  />
                  <div className="mt-3">
                    <h4>{fullName}</h4>
                    <p className="text-secondary mb-1">{role}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-7 ml-3">
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-5">
                        <span className="info-label">Full Name</span>
                      </div>
                      <div className="col-sm text-secondary">
                        {isEditing ? (
                          <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                          />
                        ) : (
                          <span className="info-value">{fullName}</span>
                        )}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-5">
                        <h6 className="mb-0">Email</h6>
                      </div>
                      <div className="col-sm text-secondary">
                        <span className="info-value">{email}</span>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-5">
                        <h6 className="mb-0">Phone</h6>
                      </div>
                      <div className="col-sm text-secondary">
                        {isEditing ? (
                          <input
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                          />
                        ) : (
                          <span className="info-value">{phoneNumber}</span>
                        )}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-5">
                        <h6 className="mb-0">DOB</h6>
                      </div>
                      <div className="col-sm text-secondary">
                        {isEditing ? (
                          <input
                            type="date"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                          />
                        ) : (
                          <span className="info-value">
                            {new Date(dob).toLocaleDateString("en-GB")}
                          </span>
                        )}
                      </div>
                    </div>
                    <hr />
                    {/* <div className="row">
                      <div className="col-sm-5">
                        <h6 className="mb-0">Password</h6>
                      </div>
                      <div className="col-sm text-secondary">
                        <button
                          className="btn btn-info"
                          onClick={handleChangePasswordClick}
                        >
                          Change Password
                        </button>
                      </div>
                      {showChangePassword && (
                        <div>
                          <ChangePassword
                            onClose={handleCloseChangePassword}
                            onSuccess={handleChangePasswordSuccess}
                            accessToken={userData.accessToken} // Truyền token xuống component ChangePassword
                          />
                        </div>
                      )}
                    </div>

                    <hr /> */}
                    <div className="row">
                      <div className="col-sm-12">
                        {isEditing ? (
                          <button className="btn btn-info" onClick={handleSave}>
                            Save
                          </button>
                        ) : (
                          <button className="btn btn-info" onClick={handleEdit}>
                            Update Profile
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfileCard;
