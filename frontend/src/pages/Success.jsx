import style from "../css/Success.module.css";
import { Link } from "react-router-dom";
import { MdVerified } from "react-icons/md";
import { useEffect, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const Success = () => {
  // Ensure useContext is used correctly to access fetchData
  const { fetchData } = useContext(GlobalContext);

  useEffect(() => {
    // Call fetchData to fetch necessary data on component mount
    fetchData().catch((error) => console.error("Error fetching data:", error));
  }, [fetchData]); // Include fetchData in the dependency array

  return (
    <div className={style.containers}>
      <div className={style.conts}>
        <MdVerified className={style.icon} />
        <h2>Payment Verified</h2>
      </div>
      <Link to="/">
        <button className={style.homeBtn}>Go back home</button>
      </Link>
    </div>
  );
};

export default Success;
