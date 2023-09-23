import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createOrder,
  paymentVerification,
} from "../../redux/actions/orderAction";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../redux/store";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const [payment, setPayment] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);

  const dispatch = useDispatch();
  const {
    shippingInfo,
    cartItems,
    paymentMethod,
    subTotal,
    tax,
    shippingCharges,
    total,
  } = useSelector((state) => state.cart);

  const { message, error } = useSelector((state) => state.order);

  const submitHandler = async (e) => {
    e.preventDefault();

    setDisableBtn(true);

    if (payment === "COD") {
      dispatch(
        createOrder(
          shippingInfo,
          cartItems,
          paymentMethod,
          subTotal,
          tax,
          shippingCharges,
          total
        )
      );
    } else {
      const {
        data: { order, orderOption },
      } = await axios.post(
        `${server}/createorderonline`,
        {
          shippingInfo,
          orderItems: cartItems,
          paymentMethod,
          itemPrice: subTotal,
          taxPrice: tax,
          shippingCharges,
          totalAmount: total,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),

            "Content-Type": "application/json",
          },
        }
      );

      const options = {
        key: "rzp_test_tehPiPYj4wsRI4",
        amount: order.amount,
        currency: "INR",
        name: "THE CAKE SHOP",
        description: "Cake App",
        order_id: order.id,
        handler: function (response) {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
            response;

          dispatch(
            paymentVerification(
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
              orderOption
            )
          );
        },
        theme: {
          color: "#f59e0b",
        },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    }
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
      dispatch({ type: "emptyState" });
      navigate("/paymentsuccess");
    }

    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
      setDisableBtn(false);
    }
  }, [dispatch, message, error, navigate]);

  return (
    <section className="confirm-order">
      <main>
        <h1>Confirm Order</h1>

        <form onSubmit={submitHandler}>
          <div>
            <label>Cash on Delivery</label>
            <input
              type="radio"
              name="payment"
              onChange={() => setPayment("COD")}
              required
            />
          </div>
          <div>
            <label>Online</label>
            <input
              type="radio"
              name="payment"
              onChange={() => setPayment("online")}
            />
          </div>

          <button disabled={disableBtn} type="submit">
            Place Order
          </button>
        </form>
      </main>
    </section>
  );
};

export default ConfirmOrder;
