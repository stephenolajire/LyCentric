import React from "react";
import style from "../css/NavCategory.module.css";
import { Link } from "react-router-dom";

const NavCategory = ({ category }) => {
  return (
    <div className={style.container}>
      <ul className={style.listCont}>
        <Link to={`/category/${category.id}`} key={category.id}>
          <li className={style.list} key={category.id}>
            <div>
              <img src={category.image} alt={category.name} />
            </div>
            < p className={style.listp}>{category.name}</p>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default NavCategory;
