import React, { useEffect } from "react";
import cheesecake from "../../assets/cheesecake.jpeg";
import blackforest from "../../assets/blackforest.jpg";
import pineapple from "../../assets/blackforest.jpg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const CartItem = ({ value, title, img, increment, decrement }) => {
  return (
    <div className="cartItem">
      <div>
        <h4>{title}</h4>
        <img src={img} alt="item" />
      </div>

      <div>
        <button onClick={decrement}>-</button>
        <input type="number" readOnly value={value} />
        <button onClick={increment}>+</button>
      </div>
    </div>
  );
};

const Cart = () => {
  const {
    cartItems: {
      cheeseCake: { quantity: cheeseCake },
      pineAppleCake: { quantity: pineAppleCake },
      blackForestCake: { quantity: blackForestCake },
    },
    subTotal,
    tax,
    shippingCharges,
    total,
  } = useSelector((state) => state.cart);

  const { cartItems: orderItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const increment = (item) => {
    switch (item) {
      case 1:
        dispatch({ type: "cheeseCakeIncrement" });
        dispatch({ type: "calculatePrice" });
        break;
      case 2:
        dispatch({ type: "pineAppleCakeIncrement" });
        dispatch({ type: "calculatePrice" });
        break;
      case 3:
        dispatch({ type: "blackForestCakeIncrement" });
        dispatch({ type: "calculatePrice" });
        break;

      default:
        if (cheeseCake === 0) break;
        dispatch({ type: "cheeseCakeIncrement" });
        break;
    }
  };
  const decrement = (item) => {
    switch (item) {
      case 1:
        if (cheeseCake === 0) break;
        dispatch({ type: "cheeseCakeDecrement" });
        dispatch({ type: "calculatePrice" });
        break;
      case 2:
        if (pineAppleCake === 0) break;
        dispatch({ type: "pineAppleCakeDecrement" });
        dispatch({ type: "calculatePrice" });
        break;
      case 3:
        if (blackForestCake === 0) break;
        dispatch({ type: "blackForestCakeDecrement" });
        dispatch({ type: "calculatePrice" });
        break;

      default:
        if (cheeseCake === 0) break;
        dispatch({ type: "cheeseCakeIncrement" });
        break;
    }
  };

  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(orderItems));
    localStorage.setItem(
      "cartPrices",
      JSON.stringify({
        subTotal,
        tax,
        shippingCharges,
        total,
      })
    );
    localStorage.setItem("cartItem", JSON.stringify(orderItems));
  }, [orderItems, subTotal, tax, shippingCharges, total]);

  return (
    <section className="cart-page">
      <main>
        <CartItem
          title={"Cheese Cake"}
          img={cheesecake}
          value={cheeseCake}
          increment={() => increment(1)}
          decrement={() => decrement(1)}
        />
        <CartItem
          title={"PineApple Cake"}
          img={pineapple}
          value={pineAppleCake}
          increment={() => increment(2)}
          decrement={() => decrement(2)}
        />
        <CartItem
          title={"Black Forest Cake"}
          img={blackforest}
          value={blackForestCake}
          increment={() => increment(3)}
          decrement={() => decrement(3)}
        />

        <article>
          <div>
            <h4>Sub Total</h4>
            <p>₹ {subTotal}</p>
          </div>

          <div>
            <h4>Tax</h4>
            <p>₹ {Math.ceil(tax)}</p>
          </div>

          <div>
            <h4>Shipping Charges</h4>
            <p>₹ {shippingCharges}</p>
          </div>

          <div>
            <h4>Total</h4>
            <p>₹ {Math.ceil(total)}</p>
          </div>

          <Link to="/shipping">Checkout</Link>
        </article>
      </main>
    </section>
  );
};

export default Cart;
