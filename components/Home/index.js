import config from "../../config";

import Head from "next/head";

const Home = () => {
  return (
    <div className="landing-page">
      <Head>
        <title>{config.meta.title}</title>
        <meta name="description" content={config.meta.description} />
        <meta name="keywords" content={config.meta.keywords} />
      </Head>
      <div>Home</div>
    </div>
  );
};

export default Home;
