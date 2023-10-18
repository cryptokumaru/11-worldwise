import { Outlet } from "react-router-dom";
import AppNav from "./AppNav";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";
function Sidebar() {
  const yr = new Date().getFullYear();
  // console.log(yr);
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright by {yr} Worldwise Inc.
        </p>
      </footer>
    </div>
  );
}

export default Sidebar;
