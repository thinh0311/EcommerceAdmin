import React, { useEffect, useState } from "react";
import Dropdown from "../dropdown/Dropdown";
import "./topnav.css";
import user_image from "../../assets/images/user.png";
import accountApi from "../../api/accountApi";
import { Link } from "react-router-dom";

// const curr_user = {
//   name: "Do Thinh",
//   image: user_image,
// };

// const renderNotificationItems = (item, index) => {
//   return (
//     <div className="notification-item" key={index}>
//       <i className={item.icon}></i>
//       <span>{item.content}</span>
//     </div>
//   );
// };

const renderUserToggle = (user) => {
  return (
    <div className="topnav__right-user">
      <div className="topnav__right-user__image">
        <img src={user_image} alt="Avatar" />
      </div>
      <div className="topnav__right-user__name">{user.hoTen}</div>
    </div>
  );
};

// const renderUserMenu = (item, index) => {
//   return (
//     <Link to="/" key={index}>
//       <div className="notification-item">
//         <i className={item.icon}></i>
//         <span>{item.content}</span>
//       </div>
//     </Link>
//   );
// };

const TopNav = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const getUser = async () => {
      const result = await accountApi.getUser(localStorage.getItem("token"));
      setUser(result);
    };
    getUser();
  }, []);
  return (
    <div className="topnav">
      <div className="topnav__search">
        <input type="text" placeholder="Search here..." />
        <i className="bx bx-search"></i>
      </div>
      <div className="topnav__right">
        <div className="topnav__right-item">
          <Dropdown
            customToggle={() => renderUserToggle(user)}
            renderItems={() => (
              <>
                <div className="notification-item">
                  <i className="bx bx-user"></i>
                  <span>Profile</span>
                </div>
              </>
            )}
          />
        </div>
        <div className="topnav__right-item">
          <Dropdown
            icon="bx bx-bell"
            badge="12"
            renderItems={() => (
              <div className="notification-item">
                <i className="a"></i>
                <span>a</span>
              </div>
            )}
            renderFooter={() => <Link to="/">View All</Link>}
          />
        </div>
        <div className="topnav__right-item">
          <Dropdown />
        </div>
        <div className="topnav__right-item">{/* theme here */}</div>
      </div>
    </div>
  );
};

export default TopNav;
