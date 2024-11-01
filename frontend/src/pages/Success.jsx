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
        setItems([]); // Clear cart items in state after payment verification
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
        <h2>Payment Verified</h2>
      </div>
      <button onClick={handleGoHome} className={style.homeBtn}>
        Go back home
      </button>
    </div>
  );
};

export default Success;
