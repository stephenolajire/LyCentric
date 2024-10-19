import React from "react";
import {Link} from 'react-router-dom'
import style from '../css/CategoryList.module.css'

const CategoryList = ({ category }) => {
  return (
    <div className={style.container}>
      <h3>Product Categories</h3>
      <ul className={style.listCont}>
        {category.map((item) => (
          <Link to={`/category/${item.id}`} key={item.id}>
          <li className={style.list} key={item.id}>
            {/* <img src={item.image} alt={item.name} /> */}
            <p>{item.name}</p>
          </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
