import Link from "next/link";

const Sidebar = () => {
  return (
    <div className={"sidebar-block"}>
      <div className={"title"}>Getting Started</div>
      <nav>
        <Link href={"/docs/getting-started"}>
          <a className="btn small gradient-blue">Quickstart</a>
        </Link>
        <Link href={"/docs/authentication"}>
          <a className="btn small gradient-blue">Authentication</a>
        </Link>
        <Link href={"/docs/installation"}>
          <a className="btn small gradient-blue">Installation</a>
        </Link>
        <Link href={"/docs/configuring-sdk"}>
          <a className="btn small gradient-blue">Configuring SDK</a>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
