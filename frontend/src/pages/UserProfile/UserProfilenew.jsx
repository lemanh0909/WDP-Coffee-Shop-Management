import React, { useState, useEffect } from "react";
import "./UserProfilenew.css";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const UserProfileCard = ({ updateLatestFullName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [dob, setDob] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(true); // State để kiểm tra xem dữ liệu đã được fetch chưa
  const [latestFullName, setLatestFullName] = useState("");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const userDataString = localStorage.getItem("userData");
    if (!userDataString) {
      throw new Error("User data not found in localStorage.");
    }
    const userData = JSON.parse(userDataString);
    const userId = userData.userID;
    axios
    .get(`http://localhost:5000/api/v1/user/${userId}/getDetail`)
    .then((response) => {
      const userData = response.data.data;
      if (userData) {
        setfullName(userData.fullName || ""); // Thay đổi tên thuộc tính
        setEmail(userData.email || "");
        setphoneNumber(userData.phoneNumber || ""); // Thay đổi tên thuộc tính
        setDob(userData.dob || "");
        setRole(userData.role || "");
      } else {
        setfullName("");
        setEmail("");
        setphoneNumber("");
        setDob("");
        setRole("");
      }
      setIsLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching user detail:", error);
      setfullName("");
      setEmail("");
      setphoneNumber("");
      setDob("");
      setRole("");
      setIsLoading(false);
    });
};

const handleSave = () => {
  // Kiểm tra các trường bắt buộc
  if (!fullName || !phoneNumber || !dob) {
    toast.error("Vui lòng điền đầy đủ thông tin.");
    return;
  }

  // Kiểm tra định dạng số điện thoại (+84)
  if (phoneNumber.length < 10 || phoneNumber.length > 11) {
    toast.error("Phone number is invalid. ");
    return;
  }

  // Kiểm tra tuổi (phải đủ 16 tuổi)
  const today = new Date();
  const dobDate = new Date(dob);
  const ageDiff = today.getFullYear() - dobDate.getFullYear();
  const monthDiff = today.getMonth() - dobDate.getMonth();
  const age = monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate()) ? ageDiff - 1 : ageDiff;
  if (age < 16) {
    toast.error("You must be 16 years or older.");
    return;
  }

  // Nếu các kiểm tra đều thành công, thực hiện cập nhật dữ liệu
  setIsEditing(false);
  const userDataString = localStorage.getItem("userData");
  if (!userDataString) {
    throw new Error("User data not found in localStorage.");
  }
  const userData = JSON.parse(userDataString);
  const userId = userData.userID;

  const updatedUserData = {
    fullName: fullName,
    email: email, // Giữ nguyên giá trị email hiện tại
    phoneNumber: phoneNumber,
    dob: dob,
  };

  axios
    .put(`http://localhost:5000/api/v1/user/${userId}/update`, updatedUserData)
    .then((response) => {
      console.log('User data updated successfully:', response.data);
      setfullName(updatedUserData.fullName);
      updateLatestFullName(updatedUserData.fullName);
      toast.success("Thông tin đã được cập nhật thành công!");
    })
    .catch((error) => {
      console.error("Error updating user data:", error);
      // Xử lý lỗi nếu có
    });
};



  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Gửi dữ liệu đã chỉnh sửa lên server thông qua API (nếu cần)
  };

  return (
    <>
    <ToastContainer position="top-right" />
     {/* <CommonNavbar latestFullName={latestFullName} /> */}
      {isLoading ? ( // Nếu đang loading dữ liệu thì hiển thị một số thông báo hoặc loading spinner
        <div>Loading...</div>
      ) : (
        <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
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
                            onChange={(e) => setfullName(e.target.value)}
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
                       
                          <span className="info-value" disable>{email}</span>
                        
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
                            onChange={(e) => setphoneNumber(e.target.value)}
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
            <span className="info-value">{new Date(dob).toLocaleDateString('en-GB')}</span>
        )}
    </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-12">
                        {isEditing ? (
                          <button className="btn btn-info" onClick={handleSave}>
                            Save
                          </button>
                        ) : (
                          <button className="btn btn-info" onClick={handleEdit}>
                            Edit
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
