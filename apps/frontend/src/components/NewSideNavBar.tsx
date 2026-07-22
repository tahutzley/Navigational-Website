import MapIcon from "@mui/icons-material/Map";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StorageIcon from "@mui/icons-material/Storage";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import styles from "../styles/NewSideNavBar.module.css";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function NewSideNavBar() {
  const { logout } = useAuth0();

  const [collapsed, setCollapsed] = useState(true);

  const location = useLocation();

  const [currentLocation, setCurrentLocation] = useState(location.pathname);

  useEffect(() => {
    setCurrentLocation(location.pathname);
  }, [location]);

  return (
    <>
      <div
        className={`${styles.navbarContainer} ${
          collapsed ? styles.collapsed : styles.expanded
        }`}
        onMouseOver={() => {
          setCollapsed(false);
        }}
        onMouseOut={() => {
          setCollapsed(true);
        }}
      >
        <div>
          <Link to="/admin-map" className={`${styles.navButtons}`}>
            <div
              className={`
              ${styles.row}
              ${currentLocation === "/admin-map" ? styles.selected : null}
              ${currentLocation === "/public-map" ? styles.selected : null}
            `}
            >
              <MapIcon sx={{ fontSize: "35px" }} />
              <p className={`${styles.navbarLabels}`}>Map</p>
            </div>
          </Link>
          <Link to="/dashboard" className={`${styles.navButtons}`}>
            <div
              className={`${styles.row} ${
                currentLocation === "/dashboard" ? styles.selected : ""
              }`}
            >
              <DashboardIcon sx={{ fontSize: "35px" }} />
              <p className={`${styles.navbarLabels}`}>Dashboard</p>
            </div>
          </Link>
          <Link to="/csv-page" className={`${styles.navButtons}`}>
            <div
              className={`${styles.row} ${
                currentLocation === "/csv-page" ? styles.selected : ""
              }`}
            >
              <StorageIcon sx={{ fontSize: "35px" }} />
              <p className={`${styles.navbarLabels}`}>Map Data</p>
            </div>
          </Link>
          <Link to="/employee-page" className={`${styles.navButtons}`}>
            <div
              className={`${styles.row} ${
                currentLocation === "/employee-page" ? styles.selected : ""
              }`}
            >
              <PeopleIcon sx={{ fontSize: "35px" }} />
              <p className={`${styles.navbarLabels}`}>Employees</p>
            </div>
          </Link>
          <Link to="/statistics" className={`${styles.navButtons}`}>
            <div
              className={`${styles.row} ${
                currentLocation === "/statistics" ? styles.selected : ""
              }`}
            >
              <BarChartIcon sx={{ fontSize: "35px" }} />
              <p className={`${styles.navbarLabels}`}>Statistics</p>
            </div>
          </Link>
        </div>
        <div>
          <div
            className={`${styles.navButtons}`}
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            <div className={`${styles.row} ${styles.logoutButton}`}>
              <LogoutIcon sx={{ fontSize: "35px" }} />
              <p className={`${styles.navbarLabels}`}>Logout</p>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.grayOut} ${collapsed ? "" : styles.show}`} />
    </>
  );
}

export default NewSideNavBar;
