import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";

const SideNav = () => {
  const [menu, setMenu] = useState({
    menu1: false,
    menu2: false,
    menu3: false,
  });
  const { menu1, menu2, menu3 } = menu;

  const toggleMenu1 = () => {
    setMenu({ menu1: !menu1 });
  };
  const toggleMenu2 = () => {
    setMenu({ menu2: !menu2 });
  };
  const toggleMenu3 = () => {
    setMenu({ menu3: !menu3 });
  };

  const show1 = menu1 ? "show" : "";
  const show2 = menu2 ? "show" : "";
  const show3 = menu3 ? "show" : "";

  return (
    <Fragment>
      <ul className="navbar-nav navbar-sidenav" id="exampleAccordion">
        <li className="nav-item" title="Dashboard">
          <Link className="nav-link" to="/admin">
            <i className="fa fa-fw fa-dashboard"></i>
            <span className="nav-link-text">Dashboard</span>
          </Link>
        </li>
        <li
          className="nav-item"
          data-toggle="tooltip"
          data-placement="right"
          title="Users"
        >
          <Link
            className="nav-link nav-link-collapse collapsed"
            onClick={toggleMenu1}
            to="#users"
            data-parent="#exampleAccordion"
          >
            <i className="fa fa-fw fa-wrench"></i>
            <span className="nav-link-text">Users</span>
          </Link>
          <ul
            className={"sidenav-second-level collapse " + show1}
            id="collapsePosts"
          >
            <li>
              <Link to="/admin$users">All Users</Link>
            </li>
            <li>
              <Link to="/admin$newsletter">NewsLetter</Link>
            </li>
          </ul>
        </li>
        <li
          className="nav-item"
          data-toggle="tooltip"
          data-placement="right"
          title="Posts"
        >
          <Link
            className="nav-link nav-link-collapse collapsed"
            onClick={toggleMenu2}
            to="#tours"
            data-parent="#exampleAccordion"
          >
            <i className="fa fa-fw fa-wrench"></i>
            <span className="nav-link-text">Tours</span>
          </Link>
          <ul
            className={"sidenav-second-level collapse " + show2}
            id="collapsePosts"
          >
            <li>
              <Link to="/admin$tours">All Tours</Link>
            </li>
            <li>
              <Link to="/admin$tours$create">Create Tours</Link>
            </li>
          </ul>
        </li>
        <li
          className="nav-item"
          data-toggle="tooltip"
          data-placement="right"
          title="Posts"
        >
          <Link
            className="nav-link nav-link-collapse collapsed"
            onClick={toggleMenu3}
            to="#tour3"
            data-parent="#exampleAccordion"
          >
            <i className="fa fa-fw fa-wrench"></i>
            <span className="nav-link-text">Custom Tours</span>
          </Link>
          <ul
            className={"sidenav-second-level collapse " + show3}
            id="collapsePosts"
          >
            <li>
              <Link to="/admin$custom_tours">All Custom Tours</Link>
            </li>
            <li>
              <Link to="/admin$custom_tours$create">Create Custom Tour</Link>
            </li>
          </ul>
        </li>
        {/* <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Link">
              <Link className="nav-link" to="/admin/categories">
                <i className="fa fa-fw fa-list-alt"></i>
                <span className="nav-link-text">Categries</span>
              </Link>
            </li> */}
        {/* <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Link">
              <Link className="nav-link" to="/admin/comments">
                <i className="fa fa-fw fa-comment"></i>
                <span className="nav-link-text">Comments</span>
              </Link>
            </li> */}
      </ul>
    </Fragment>
  );
};

export default SideNav;
