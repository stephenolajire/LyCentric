import React, { useState, useContext } from "react";
import logo from "../assets/newlogo.jpg";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import styles from "../css/NavBar.module.css";
import { IoMdClose } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { GlobalContext } from "../context/GlobalContext";
import { BsPersonFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const NavBar = ({ category }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdown, setIsDropDown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { cartNumber, isAuthenticated, auth, Profile, handleSearch } =
    useContext(GlobalContext);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropDown(!isDropdown);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const Logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    auth();
    navigate("/");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // handleSearch(searchTerm);
    navigate(`/searchpage?q=${searchTerm}`);
    setSearchTerm("");
  };

  return (
    <header className={styles.container}>
      {/* Desktop View */}
      <div className={styles.topNav}>
        <div className={styles.imgContainer}>
          <img src={logo} alt="logo" className={styles.logo} />
        </div>
        <div>
          <form onSubmit={handleSearchSubmit}>
            <input
              type="search"
              className={styles.search}
              placeholder="Search for items/products by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </div>
        <div className={styles.buttonDiv}>
          {isAuthenticated ? (
            <div className={styles.personCont}>
              <Link to="/profile">
                <BsPersonFill className={styles.person} onClick={Profile} />
              </Link>
              <button className={styles.loginBtn} onClick={Logout}>
                Logout
              </button>
            </div>
          ) : (
            <div className={styles.contflex}>
              <button className={styles.loginBtn}>
                <Link to="/login">Login</Link>
              </button>
              <Link to="/signup" className={styles.signup}>
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>

      <nav className={styles.navigation}>
        <div className={styles.flexx}>
          <div className={styles.navLogo}>
            <img src={logo} alt="logo" className={styles.logoNav} />
          </div>

          <ul
            className={`${styles.menu} ${
              isMenuOpen ? styles.menuOpen : styles.menuClosed
            }`}
          >
            <li className={styles.navItem}>
              <Link to="/">Home</Link>
            </li>

            {/* Dropdown for Categories */}
            <li className={`${styles.navItem} ${styles.dropdown}`}>
              Category{" "}
              {isDropdown ? (
                <IoIosArrowUp
                  className={styles.arrow}
                  onClick={toggleDropdown}
                />
              ) : (
                <IoIosArrowDown
                  className={styles.arrow}
                  onClick={toggleDropdown}
                />
              )}
              {isDropdown && (
                <ul className={styles.dropdownMenu}>
                  {category.map((item) => (
                    <li key={item.id} className={styles.dropdownItem}>
                      <Link to={`/category/${item.id}`}>{item.name}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            <li className={styles.navItem}>
              <Link to="/contact">Contact Us</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/help">Help</Link>
            </li>
            {isAuthenticated ? (
              <>
                <li className={styles.navLink}>
                  <Link to="/profile">Profile</Link>
                </li>
                <li className={styles.navLink}>
                  <Link to="/login">Logout</Link>
                </li>
              </>
            ) : (
              <div>
                <li className={styles.navLink}>
                  <Link to="/login">Login</Link>
                </li>
                <li className={styles.navLink}>
                  <Link to="/signup">Signup</Link>
                </li>
              </div>
            )}
          </ul>
        </div>
        <div className={styles.icon}>
          <Link to="/cartpage">
            <div className={styles.cartNumber}>
              <div className={styles.quantity}>
                {cartNumber ? cartNumber : 0}
              </div>
              <IoCartOutline className={styles.cart} />
            </div>
          </Link>
          <div className={styles.cartIcon}>
            {isMenuOpen ? (
              <IoMdClose className={styles.close} onClick={toggleMenu} />
            ) : (
              <RxHamburgerMenu
                className={styles.hamburgerIcon}
                onClick={toggleMenu}
              />
            )}
          </div>
        </div>
      </nav>
      <div className={styles.phoneSearch}>
        <form className={styles.formInput} onSubmit={handleSearchSubmit}>
          <input
            type="search"
            className={styles.searchPhone}
            placeholder="Search for items/products by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </div>
    </header>
  );
};

export default NavBar;
