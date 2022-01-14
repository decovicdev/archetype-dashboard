import config from "../../config";
import { useState, useCallback, useContext } from "react";
import classnames from "classnames";

import Head from "next/head";
import Link from "next/link";

import { HelperContext } from "../../context/helper";

const Square = ({ reversed, children }) => {
  return (
    <div className={classnames("square", { "on-the-right": reversed })}>
      <div className={"inner-square"}>{children}</div>
      <div className={"circ1"} />
      <div className={"circ2"} />
      <div className={"circ3"} />
    </div>
  );
};

const Component = () => {
  const { showAlert } = useContext(HelperContext);

  const [emailAddress, setEmailAddress] = useState("");

  const clickSubscribe = useCallback((e) => {
    e.preventDefault();

    showAlert("Subscribed");
  }, []);

  return (
    <div className="page landing-page">
      <Head>
        <title>{config.meta.title}</title>
        <meta name="description" content={config.meta.description} />
        <meta name="keywords" content={config.meta.keywords} />
      </Head>
      <div className={"block main-block"}>
        <div className={"content"}>
          <div className={"left-side"}>
            <h1>Hassle-free API creation, monetization, and management.</h1>
            <div className={"link"}>
              <Link href={"/account/signup"}>
                <a>Start now</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={"block code-example-block"}>
        <div className={"content"}>
          <div className={"block-data"}>
            <div className={"sphere"} />
            <div className={"left-side"}>
              <h2>
                Deploy your <span className={"yellow"}>API</span> in a couple of
                minutes with a few lines of code
              </h2>
              <form onSubmit={clickSubscribe}>
                <div className={"text"}>
                  Subscribe to updates about the product
                </div>
                <div className={"field"}>
                  <input
                    type={"text"}
                    placeholder={"Enter your email"}
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                  />
                  <button type={"submit"}>Submit</button>
                </div>
              </form>
            </div>
            <div className={"right-side"}></div>
          </div>
        </div>
      </div>
      <div className={"block info-block"}>
        <div className={"content"}>
          <Square>
            <div className={"info-icon creation"} />
          </Square>
          <div className={"left-side"}></div>
          <div className={"right-side"}>
            <h3>Launch faster</h3>
            <p>Launch your API in a matter of minutes -- not months.</p>
          </div>
        </div>
      </div>
      <div className={"block info-block"}>
        <div className={"content"}>
          <Square reversed>
            <div className={"info-icon monetization"} />
          </Square>
          <div className={"left-side"}>
            <h3>Monetization</h3>
            <p>
              Instantly be able to create subscriptions, adjust prices and
              invoice your users.
            </p>
          </div>
          <div className={"right-side"}></div>
        </div>
      </div>
      <div className={"block info-block"}>
        <div className={"content"}>
          <Square>
            <div className={"info-icon management"} />
          </Square>
          <div className={"left-side"}></div>
          <div className={"right-side"}>
            <h3>Analytics</h3>
            <p>
              Analyze usage metrics across all your platforms and dynamically
              adjust pricing with cohort breakdowns.
            </p>
          </div>
        </div>
      </div>
      <div className={"block last-block"}>
        <div className={"content"}>
          <div className={"graphics"}>
            <div className={"text"}>
              Say bye to building your own
              <br /> billing, permissions, or quota systems.{" "}
            </div>
            <div className={"link"}>
              <Link href={"/account/signup"}>
                <a>Start now</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Component;
