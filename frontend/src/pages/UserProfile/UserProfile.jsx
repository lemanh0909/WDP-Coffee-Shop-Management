
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import userService from "../UserProfile/userService";
import "./UserProfile.css";

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await userService.getUserInfo();
        setUser(response.data);
        setImageUrl(response.data.pfpImageLink);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user) {
      setValue("firstName", user.firstName);
      setValue("lastName", user.lastName);
      setValue("phone_number", user.phone);
      setValue("email", user.email);
      setValue("address", user.address);
    }
  }, [user, setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setSelectedImage(file);
        setImagePreview(reader.result);
      };
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    if (selectedImage) {
      formData.append("image", selectedImage);
    }
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("phone_number", data.phone_number);
    formData.append("email", data.email);
    formData.append("address", data.address);

    try {
      await userService.updateUserInfo(formData);
      toast.success("Update user info successfully!");
    } catch (error) {
      console.error("Error updating user info:", error);
      toast.error("Failed to update user info!");
    }
  };

  return (
    <div className="container snippet">
      <ToastContainer />
      <div className="row">
        <div className="col-md-10">
            <br></br>
          <h1>Thông tin người dùng</h1>
          <br></br>
          <br></br>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
          <div className="text-center">
            {imageUrl ? (
              <img
                src={imagePreview || imageUrl}
                className="avatar img-circle img-thumbnail"
                alt="avatar"
              />
            ) : (
              <img
                src={imagePreview || ""}
                className="avatar img-circle img-thumbnail"
                alt="avatar"
              />
            )}

            <input
              type="file"
              className="text-center center-block file-upload"
              onChange={handleImageChange}
            />
          </div>
        </div>
        <div className="col-md-9">
          <div className="tab-pane active" id="home">
            <form
              className="form"
              onSubmit={handleSubmit(onSubmit)}
              id="registrationForm"
            >
              <div className="form-group">
                <div className="col-md-12">
                  <input
                    type="text"
                    className="form-control"
                    {...register("firstName", {
                      required: true,
                      pattern: /^[A-Za-z]+$/,
                    })}
                    placeholder="First Name"
                  />
                </div>
              </div>
              <br />
              <div className="form-group">
                <div className="col-md-12">
                  <input
                    type="text"
                    className="form-control"
                    {...register("lastName", {
                      required: true,
                      pattern: /^[A-Za-z]+$/,
                    })}
                    placeholder="Last Name"
                  />
                </div>
              </div>
              <br />
              <div className="form-group">
                <div className="col-md-12">
                  <input
                    type="text"
                    className="form-control"
                    {...register("phone_number", {
                      required: true,
                      pattern: /^(\+84)?[0-9]+$/,
                    })}
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
              <br />
              <div className="form-group">
                <div className="col-md-12">
                  <input
                    type="email"
                    className="form-control"
                    {...register("email", { required: true })}
                    placeholder="You@gmail.com"
                    disabled
                  />
                </div>
              </div>
              <br />
              <div className="form-group">
                <div className="col-md-12">
                  <input
                    type="text"
                    className="form-control"
                    {...register("address", {
                      required: true,
                      pattern:
                        /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?([1-9]\d?(\.\d+)?|1[0-7]\d(\.\d+)?|180(\.0+)?)$|^[a-zA-Z0-9\s]+$/,
                    })}
                    placeholder="Enter your address"
                  />
                </div>
              </div>
              <br />
              <div className="form-group">
                <div className="col-md-12">
                  <button
                    style={{ margin: 20 }}
                    className="btn btn-lg btn-primary"
                    type="submit"
                  >
                    <i className="glyphicon glyphicon-ok-sign"></i> Update Profile
                    </button>

                    <button
                    style={{ margin: 20 }}
                    className="btn btn-lg btn-success"
                    type="submit"
                  >
                    <i className="glyphicon glyphicon-ok-sign"></i> Save
                    </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
