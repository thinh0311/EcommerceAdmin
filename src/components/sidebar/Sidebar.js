import React from "react";
import "./sidebar.css";
import logo from "../../assets/images/logo.png";
import sidebar_items from "../../assets/JsonData/sidebar_routes.json";
import { Link, useLocation } from "react-router-dom";

const SidebarItem = (props) => {
  const active = props.active ? "active" : "";

  return (
    <div className="sidebar__item">
      <div className={`sidebar__item-inner ${active}`}>
        <i className={props.icon}></i>
        <span>{props.title}</span>
      </div>
    </div>
  );
};

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <img src={logo} alt="company logo" />
      </div>
      {sidebar_items.map((item, index) => (
        <Link to={item.route} key={index}>
          <SidebarItem
            title={item.display_name}
            icon={item.icon}
            active={item.route === location.pathname}
          />
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
