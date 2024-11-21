import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import api from "../../constant/api";
import ViewOrderCard from "../components/ViewOrderCard";
import style from '../css/ViewOrderCard.module.css'

const ViewOrder = () => {
  const { loading } = useContext(GlobalContext);
  const [data, setData] = useState([]); // Initialize as an empty array
  const [error, setError] = useState(null); // State for handling errors
  const { id } = useParams();

  const viewOrder = async () => {
    try {
      const response = await api.get(`api/view_detail/${id}`);
      if (response.data) {
        console.log(response.data);
        setData(response.data);
      } else {
        console.log("No data received.");
        setError("No order details found.");
      }
    } catch (error) {
      console.error(error);
      setError("Failed to fetch order details.");
    }
  };

  useEffect(() => {
    viewOrder();
  }, [id]);

  return (
    <main>
      <div className={style.orderList}>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && data.length === 0 && !error && (
          <p>No orders to display.</p>
        )}
        {!loading &&
          data.map((view) => <ViewOrderCard key={view.id} order={view} />)}
      </div>
    </main>
  );
};

export default ViewOrder;
