import config from "../../config";

import Head from "next/head";

const Users = () => {
  return (
    <div className="page users-page">
      <Head>
        <title>Users - {config.meta.title}</title>
      </Head>
      <div className={"content"}>Users</div>
    </div>
  );
};

export default Users;
