import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../../redux/actions/orderAction";
import { useParams } from "react-router-dom";
import Loader from "../layout/Loader";

const OrderDetails = () => {
  const params = useParams();

  const { order, loading } = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderDetails(params.id));
  }, [params.id, dispatch]);
  return (
    <section className="orderDetails">
      {loading === false && order != undefined ? (
        <main>
          <h1>Order Details</h1>

          <div>
            <h1>Shipping</h1>
            <p>
              <b>Address</b>
              {`${order.shippingInfo.hNo}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.country}, ${order.shippingInfo.pincode}`}
            </p>
          </div>

          <div>
            <h1>Contact</h1>
            <p>
              <b>Name</b>
              {`${order.user.name}`}
            </p>
            <p>
              <b>Phone</b>
              {`${order.shippingInfo.phoneNo}`}
            </p>
          </div>

          <div>
            <h1>Status</h1>
            <p>
              <b>Order Status</b>
              {`${order.orderStatus}`}
            </p>
            <p>
              <b>Placed At</b>
              {`${order.createdAt.split("T")[0]}`}
            </p>
            <p>
              <b>Delivery on</b>
              {`${
                order.deliveredAt
                  ? order.deliveredAt.split("T")[0]
                  : "Not Applicable"
              }`}
            </p>
          </div>

          <div>
            <h1>Payment</h1>
            <p>
              <b>Payment Method</b>
              {`${order.paymentMethod}`}
            </p>
          </div>

          <div>
            <h1>Amount</h1>
            <p>
              <b>Items Total</b>₹ {`${order.itemPrice}`}
            </p>
            <p>
              <b>Shipping Charges</b>₹ {`${order.shippingCharges}`}
            </p>
            <p>
              <b>Tax</b>₹{`${order.taxPrice}`}
            </p>
            <p>
              <b>Total Amount</b>₹ {`${order.totalAmount}`}
            </p>
          </div>

          <article>
            <h1>Ordedred Items</h1>

            <div>
              <h4>Cheese Cake</h4>
              <div>
                <span>{`${order.orderItems.cheeseCake.quantity}`}</span> x{" "}
                <span>{`${order.orderItems.cheeseCake.price}`}</span>
              </div>
            </div>

            <div>
              <h4>Black Forest Cake</h4>
              <div>
                <span>{`${order.orderItems.blackForestCake.quantity}`}</span> x{" "}
                <span>{`${order.orderItems.blackForestCake.price}`}</span>
              </div>
            </div>

            <div>
              <h4>PineApple Cake</h4>
              <div>
                <span>{`${order.orderItems.pineAppleCake.quantity}`}</span> x{" "}
                <span>{`${order.orderItems.pineAppleCake.price}`}</span>
              </div>
            </div>

            <div>
              <h4
                style={{
                  fontWeight: 800,
                }}
              >
                Sub Total
              </h4>
              <div
                style={{
                  fontWeight: 800,
                }}
              >
                ₹{`${order.totalAmount}`}
              </div>
            </div>
          </article>
        </main>
      ) : (
        <Loader />
      )}
    </section>
  );
};

export default OrderDetails;
