import React from "react";
import "../styles/LayoutStyles.css";
 
import { Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge, message } from "antd";
const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const { Option } = Select;

  // logout funtion
  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/login");
  };
  const handleSearch = (value) => {
    // Implement your search functionality here
    console.log("Searching for:", value);
  };
  const handleLocationChange = (value) => {
    // Implement your location change functionality here
    console.log("Selected location:", value);
  };
  //Admin Menu 
  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
  
    {
      name: "Doctors",
      path: "/admin/doctors",
      icon: "fa-solid fa-user-doctor",
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: "fa-solid fa-user",
    },
    {
      name: "Profile",
      path: `/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
  ];
//User menu 
 const userMenu = [
  {
    name: "Home",
    path: "/",
    icon: "fa-solid fa-house",
  },
  {
    name: "Appointments",
    path: "/appointments",
    icon: "fa-solid fa-list",
  },
  {
    name: "Apply Doctor",
    path: "/apply-doctor",
    icon: "fa-solid fa-user-doctor",
  },
  {
    name: "Profile",
    path: `/profile/${user?._id}`,
    icon: "fa-solid fa-user",
  },
];
  // =========== doctor menu ===============
  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Appointments",
      path: "/doctor-appointments",
      icon: "fa-solid fa-list",
    },

    {
      name: "Profile",
      path: `/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
  ];
  // =========== doctor menu ===============

  // redering menu list
  const SidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;
  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h6 className="text-light">DOC APP</h6>
              <hr />
            </div>
            <div className="menu">
              {SidebarMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <>
                    <div className={`menu-item ${isActive && "active"}`}>
                      <i className={menu.icon}></i>
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  </>
                );
              })}
              <div className={`menu-item `} onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <Link to="/login">Logout</Link>
              </div>
            </div>
          </div>
          
          <div className="content">
            <div className="header">
              <div className="header-content" style={{ cursor: "pointer" }}>
                <div className="top">
                  
                  <div className="search-bar">
            
   
                    <Input
                    className="input"
                      placeholder="Search for doctors"
                       
                      onPressEnter={(e) => handleSearch(e.target.value)}
                    ></Input>
                 
                    <div className="location-dropdown">
                    <Select
                      placeholder="Select Location"
                      style={{ width: 150 }}
                      onChange={handleLocationChange}
                    >
                      <Option value="location1">Noida</Option>
                      <Option value="location2">Delhi</Option>
                      <Option value="location3">Banglore</Option>
                    </Select>
                  </div>
                  </div>
                 
                </div>
                <div className="bottom">
                <Badge
                  count={user && user.notifcation.length}
                  onClick={() => {
                    navigate("/notification");
                  }}
                >
                  <i class="fa-solid fa-bell"></i>
                </Badge>
              
                <Link to={`/profile/${user?._id}`}>{user?.name}</Link>

                </div>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
