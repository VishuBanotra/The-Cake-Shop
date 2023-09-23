import React from "react";
import { RiFindReplaceLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import me from "../../assets/founder.png";

const About = () => {
  return (
    <section className="about">
      <main>
        <h1>About Us</h1>

        <article>
          <h4>THE CAKE SHOP</h4>
          <p>
            Since The Cake Shop's inception in 2013, we have been successful in
            redefining the horizons of e-retailing cakes, flowers, gifts & more,
            and making online surfing for our customers much more handy. We
            bring you an exclusive range of goodies and doorstep delivery
            services so reliable, that you would not have to sweat about the
            order once it's placed. Our 09 years journey has its share of lows &
            highs. From taking the baby steps to sprinting fast to become
            India's one of the most trusted online portals for gifts and cakes,
            The Cake Shop is now India's one stop-solution for everyone's
            gifting needs!
          </p>

          <h4 className="secondHeading">Explore More With Us</h4>
          <Link>
            <RiFindReplaceLine />
          </Link>
        </article>

        <div>
          <h2>Founder</h2>
          <article>
            <div>
              <img src={me} alt="founder" />
              <h3>Vishu Banotra</h3>
            </div>

            <p>
              I am Vishu Banotra, the founder of THE CAKE SHOP. Affiliated to
              GOD taste.{" "}
            </p>
          </article>
        </div>
      </main>
    </section>
  );
};

export default About;
