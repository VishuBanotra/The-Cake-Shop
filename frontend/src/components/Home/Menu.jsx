import React from "react";
import MenuCard from "./MenuCard";
import cheesecake from "../../assets/cheesecake.jpeg";
import blackforest from "../../assets/blackforest.jpg";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const Menu = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const addToCartHandler = (itemNum) => {
    switch (itemNum) {
      case 1:
        if (isAuthenticated) {
          dispatch({ type: "cheeseCakeIncrement" });
          dispatch({ type: "calculatePrice" });
          toast.success("Added to Cart");
        } else {
          toast.error("Login to continue...");
        }

        break;
      case 2:
        if (isAuthenticated) {
          dispatch({ type: "pineAppleCakeIncrement" });
          dispatch({ type: "calculatePrice" });
          toast.success("Added to Cart");
        } else {
          toast.error("Login to continue...");
        }

        break;
      case 3:
        if (isAuthenticated) {
          dispatch({ type: "blackForestCakeIncrement" });
          dispatch({ type: "calculatePrice" });
          toast.success("Added to Cart");
        } else {
          toast.error("Login to continue...");
        }

        break;

      default:
        break;
    }
  };

  return (
    <section id="menu">
      <h1>MENU</h1>

      <div>
        <MenuCard
          title="Cheese Cake"
          itemNum={1}
          delay={0.1}
          burgerSrc={cheesecake}
          price={350}
          handler={addToCartHandler}
        />
        <MenuCard
          title="PineApple Cake"
          itemNum={2}
          delay={0.2}
          burgerSrc={
            "https://www.orderyourchoice.com/124946-large_default/pineapple-cake.jpg"
          }
          price={350}
          handler={addToCartHandler}
        />
        <MenuCard
          title="Black Forest Cake"
          itemNum={3}
          delay={0.3}
          burgerSrc={blackforest}
          price={350}
          handler={addToCartHandler}
        />
      </div>
    </section>
  );
};

export default Menu;
