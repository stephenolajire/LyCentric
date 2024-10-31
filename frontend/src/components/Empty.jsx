import style from "../css/Empty.module.css";
import { Link } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";

const Empty = () => {
  return (
    <div className={style.containers}>
      <div className={style.conts}>
        <BsCart4 className={style.icon} />
      </div>
        <h2 className={style.text}>Your Cart is empty</h2>
    </div>
  );
};

export default Empty;
