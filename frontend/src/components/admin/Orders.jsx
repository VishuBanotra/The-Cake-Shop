import React, { useEffect } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { GiArmoredBoomerang } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { getAdminOrders, processOrder } from "../../redux/actions/adminAction";
import Loader from "../layout/Loader";
import toast from "react-hot-toast";

const Orders = () => {
  const dispatch = useDispatch();

  const { loading, orders, message, error } = useSelector(
    (state) => state.admin
  );

  const processOrderHandler = async (id) => {
    dispatch(processOrder(id));
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }

    dispatch(getAdminOrders());
  }, [dispatch, message, error]);

  return (
    <section className="tableClass">
      {loading === false ? (
        <main>
          <table>
            <thead>
              <tr>
                <th>Order Id</th>
                <th>Order Status</th>
                <th>Item Quantity</th>
                <th>Amount</th>
                <th>Payment Method</th>
                <th>User</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {orders && 
                orders.map((order) => {
                  return (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.orderStatus}</td>
                      <td>{order.orderItems.cheeseCake.quantity + order.orderItems.blackForestCake.quantity + order.orderItems.pineAppleCake.quantity}</td>
                      <td>₹ {order.totalAmount}</td>
                      <td>{order.paymentMethod}</td>
                      <td>{order.user.name}</td>
                      <td>
                        <Link to={`/order/${order._id}`}>
                          <AiOutlineEye />
                        </Link>
                        <button onClick={() => processOrderHandler(order._id)}>
                          <GiArmoredBoomerang />
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </main>
      ) : (
        <Loader />
      )}
    </section>
  );
};

export default Orders;
