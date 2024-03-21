import React from "react";
import "./UserProfilenew.css"
const UserProfileCard = () => {
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
 <div className="container snippet">
      {/* <ToastContainer /> */}
      <div className="row">
        <div className="col-md-12">
         
          <h1 className="texttitle">Thông tin người dùng</h1>
        <br></br>
        </div>
        <div className="col-md-4 m-6 p-0">
        <div className="card">
          <div className="card-body">
            <div className="d-flex flex-column align-items-center text-center">
              <img
                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                alt="Admin"
                className="rounded-circle"
                width="150"
              />
              <div className="mt-3">
                <h4>John Doe</h4>
                <p className="text-secondary mb-1">Full Stack Developer</p>
                <button className="btn btn-primary">change avatar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 ml-3">
        <div className="card mb-3">
          <div className="card-body">
            
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">First Name</h6>
              </div>
              <div className="col-sm-9 text-secondary">Kenneth Valdez</div>
            </div> 
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">Last Name</h6>
              </div>
              <div className="col-sm-9 text-secondary">Kenneth Valdez</div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">Email</h6>
              </div>
              <div className="col-sm-9 text-secondary">fip@jukmuh.al</div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">Phone</h6>
              </div>
              <div className="col-sm-9 text-secondary">(239) 816-9029</div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">Mobile</h6>
              </div>
              <div className="col-sm-9 text-secondary">(320) 380-4539</div>
            </div>
           <hr />
            <div className="row">
              <div className="col-sm-12">
                <a
                  className="btn btn-info "
                  target="__blank"
                  href="https://www.bootdey.com/snippets/view/profile-edit-data-and-skills"
                >
                  Edit
                </a>
              </div>
            </div>
          </div>
        </div>
      {/* </div> */}
    </div>
      </div>
      </div>
</div>
    
  );
};

export default UserProfileCard;
