import style from "../css/Success.module.css";
import { MdVerified } from "react-icons/md";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

const Success = () => {
  const { fetchData, setItems } = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData()
      .then(() => {
        setItems([]);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [fetchData, setItems]);

  const handleGoHome = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className={style.containers}>
      <div className={style.conts}>
        <MdVerified className={style.icon} />
      </div>
        <h2>Your Payment has been Verified</h2>
        <p>Thank you for your patronage</p>
      <button onClick={handleGoHome} className={style.homeBtn}>
        Go back home
      </button>
    </div>
  );
};

export default Success;
