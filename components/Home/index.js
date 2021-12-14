import config from "../../config";

import Head from "next/head";
import Link from "next/link";

const Home = () => {
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
                <a className={"btn gradient-pink"}>Start now</a>
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
            </div>
            <div className={"right-side"}></div>
          </div>
        </div>
      </div>
      <div className={"block info-block"}>
        <div className={"content"}>
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
      <div className={"block last-block"}>
        <div className={"content"}>
          <p>
            Say bye to building your own billing, permissions, or quota systems.{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
