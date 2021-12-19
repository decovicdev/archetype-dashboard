import config from "../../config";
import { useState, useCallback, useContext } from "react";

import Head from "next/head";
import Link from "next/link";

import { HelperContext } from "../../context/helper";

const Component = () => {
  const { showAlert } = useContext(HelperContext);

  const [emailAddress, setEmailAddress] = useState("");

  const clickSubscribe = useCallback((e) => {
    e.preventDefault();

    showAlert("Not implemented");
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
          <div className={"right-side"}></div>
        </div>
      </div>
      <div className={"block code-example-block"}>
        <div className={"content"}>
          <div className={"block-data"}>
            <div className={"left-side"}>
              <h2>
                Deploy your <span className={"yellow"}>API</span> in a couple of
                minutes with a few lines of code
              </h2>
              <form onSubmit={clickSubscribe}>
                <div className={"text"}>
                  Suscribe to updates about the product
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
          <div className={"square"} />
          <div className={"left-side"}></div>
          <div className={"right-side"}>
            <h3>Creation</h3>
            <p>
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
              Exercitation veniam consequat sunt nostrud amet.
            </p>
          </div>
        </div>
      </div>
      <div className={"block info-block"}>
        <div className={"content"}>
          <div className={"square on-the-right"} />
          <div className={"left-side"}>
            <h3>Monetization</h3>
            <p>
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
              Exercitation veniam consequat sunt nostrud amet.
            </p>
          </div>
          <div className={"right-side"}></div>
        </div>
      </div>
      <div className={"block info-block"}>
        <div className={"content"}>
          <div className={"square"} />
          <div className={"left-side"}></div>
          <div className={"right-side"}>
            <h3>Management</h3>
            <p>
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
              Exercitation veniam consequat sunt nostrud amet.
            </p>
          </div>
        </div>
      </div>
      <div className={"block info-block"}>
        <div className={"content"}>
          <div className={"square on-the-right"} />
          <div className={"left-side"}>
            <h3>Build</h3>
            <p>
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
              Exercitation veniam consequat sunt nostrud amet.
            </p>
          </div>
          <div className={"right-side"}></div>
        </div>
      </div>
      <div className={"block last-block"}>
        <div className={"content"}>
          <div className={"text"}>
            Say bye to building your own
            <br /> billing, permissions, or quota systems.{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Component;
