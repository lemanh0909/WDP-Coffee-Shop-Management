import React, { useState } from "react";
import control from "../images/control.png";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQuery1, setSearchQuery1] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(null);


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "searchQuery") {
      setSearchQuery(value);
    } else if (name === "searchQuery1") {
      setSearchQuery1(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Search query:", searchQuery);
    console.log("Search query:", searchQuery1);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter((prevFilter) => (prevFilter === filter ? null : filter));
  };

  return (
    <div className="flex h-screen ">
      <div
        className={` ${open ? "w-72" : "w-16 "
          } bg-amber-700 p-2  pt-8 relative duration-300 text-white`}
      >
        <i className="fa-solid fa-filter pt-8"></i>
        <img
          alt="#"
          src={control}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
               border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />

        <div
          className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
            } w-72`}
        >
   

          <div className="flex flex-col items-center">
            <div className="relative">
              <form className="flex items-center">
                <input
                  type="text"
                  placeholder="MÃ HÀNG HÓA, TÊN"
                  name="searchQuery"
                  value={searchQuery}
                  onChange={handleChange}
                  className="w-70 placeholder-white border border-white text-white rounded-md py-2 px-4 mr-2 focus:outline-none focus:border-amber-950"
                />
              </form>
              <form className="flex items-center">
                <input
                  type="text"
                  placeholder="TÊN NHÀ CUNG CẤP"
                  name="searchQuery1"
                  value={searchQuery1}
                  onChange={handleChange}
                  className=" placeholder-white border border-white text-white  rounded-md py-2 px-4 mr-2 focus:outline-none focus:border-indigo-500"
                />
              </form>
              <button
                type="submit"
                onClick={handleSubmit}
                className="bg-amber-600 text-white rounded-md py-2 hover:bg-red-900 transition duration-300 right-5 top-full"
                style={{ width: "calc(100% - 8px)", marginTop: "8px" }}
              >
                Search
              </button>
            </div>
          </div>

          <div className="filter-section w-50px flex flex-col">
            <h5 className="text-decoration-underline ">
              Lọc theo loại hàng hóa
            </h5>
            <label
              className={`inline-flex items-center  ${selectedFilter === "coffeeBean"
                ? "bg-indigo-50 text-amber-700 ring-indigo-200 w-60 rounded"
                : ""
                }`}
              onClick={() => handleFilterChange("coffeeBean")}
            >
              <input type="radio" checked={selectedFilter === "coffeeBean"} />
              <p
                className="ml-5 mb-0 "
                onClick={() => handleFilterChange("coffeeBean")}
              >
                Coffee Bean
              </p>
            </label>
            <label
              className={`inline-flex items-center  ${selectedFilter === "milk"
                ? "bg-indigo-50 text-amber-700 ring-indigo-200 w-60 rounded"
                : ""
                }`}
              onClick={() => handleFilterChange("milk")}
            >
              <input type="radio" checked={selectedFilter === "milk"} />
              <p className="ml-5 mb-0" onClick={() => handleFilterChange("milk")}>
                Milk
              </p>
            </label>
            <label
              className={`inline-flex items-center  ${selectedFilter === "cake"
                ? "bg-indigo-50 text-amber-700 ring-indigo-200 w-60 rounded"
                : ""
                }`}
              onClick={() => handleFilterChange("cake")}
            >
              <input type="radio" checked={selectedFilter === "cake"} />
              <p className="ml-5 mb-0" onClick={() => handleFilterChange("cake")}>
                Cake
              </p>
            </label>
          </div>
          <div className="filter-section ">
            <h5 className="text-decoration-underline 30">Lọc theo loại nhóm</h5>
            <ul className="list-none p-0">
              <li
                className={` w-60 cursor-pointer rounded ${selectedFilter === "all"
                  ? "bg-gray-200 text-amber-700 text-bold"
                  : "hover:bg-slate-300 hover:text-amber-700"
                  }`}
                onClick={() => handleFilterChange("all")}
              >
                TẤT CẢ
              </li>

              <li
                className={`w-60 cursor-pointer rounded ${selectedFilter === "coffeeBeann"
                  ? "bg-gray-200 text-amber-700"
                  : "hover:bg-slate-300 hover:text-amber-700"
                  }`}
                onClick={() => handleFilterChange("coffeeBeann")}
              >
                COFFEE BEAN
              </li>
              <li
                className={` w-60 cursor-pointer rounded ${selectedFilter === "milkk"
                  ? "bg-gray-200 text-amber-700"
                  : "hover:bg-slate-300 hover:text-amber-700"
                  }`}
                onClick={() => handleFilterChange("milkk")}
              >
                MILK
              </li>
              <li
                className={` w-60 cursor-pointer rounded ${selectedFilter === "cakee"
                  ? "bg-gray-200 text-amber-700"
                  : "hover:bg-slate-300 hover:text-amber-700"
                  }`}
                onClick={() => handleFilterChange("cakee")}
              >
                CAKE
              </li>
            </ul>
          </div>
          <div className="filter-section w-50px flex flex-col">
            <h5 className="text-decoration-underline ">
              Lọc theo loại tồn kho
            </h5>
            <label
              className={`inline-flex items-center  ${selectedFilter === "Còn Hàng"
                ? "bg-indigo-50 text-amber-700 ring-indigo-200 w-60 rounded"
                : ""
                }`}
              onClick={() => handleFilterChange("Còn Hàng")}
            >
              <input type="radio" checked={selectedFilter === "Còn Hàng"} />
              <p
                className="ml-5"
                onClick={() => handleFilterChange("Còn Hàng")}
              >
                Còn Hàng
              </p>
            </label>
            <label
              className={`inline-flex items-center  ${selectedFilter === "Hết Hàng"
                ? "bg-indigo-50 text-amber-700 ring-indigo-200 w-60 rounded"
                : ""
                }`}
              onClick={() => handleFilterChange("Hết Hàng")}
            >
              <input type="radio" checked={selectedFilter === "Hết Hàng"} />
              <p
                className="ml-5"
                onClick={() => handleFilterChange("Hết Hàng")}
              >
                Hết Hàng
              </p>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;