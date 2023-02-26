/*
  AppLayout.js
*/

import { NavLink, Outlet } from "react-router-dom";
import styles from "./AppLayout.css";
import { Link } from "react-router-dom";
import witch from "assets/witch.svg";

export default function AppLayout() {
  return (
    <div>
      <nav className={styles.navbar}>
        <div className="sub-nav">
          <div className="ok-col ok-col-1">
            <Link to={"/"}>
              <img src={witch} className="witch" />
            </Link>
          </div>
          <div className="ok-col ok-col-2">
            <NavLink to="favourites">
              <span className="number">2)</span>
              <span>Favourites</span>
            </NavLink>
            <NavLink to="/">
              <span className="number">1)</span>
              <span>Spell List</span>
            </NavLink>
          </div>
        </div>
      </nav>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}
