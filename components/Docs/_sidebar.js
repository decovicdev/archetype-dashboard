import { useRouter } from "next/router";
import Link from "next/link";
import classnames from "classnames";

const Sidebar = () => {
  const router = useRouter();

  const links = [
    { name: "Getting Started", link: "/docs/getting-started" },
    { name: "Authentication", link: "/docs/authentication" },
    { name: "Installation", link: "/docs/installation" },
    { name: "Configuring SDK", link: "/docs/configuring-sdk" },
  ];

  return (
    <div className={"sidebar-block"}>
      <div className={"title"}>Getting Started</div>
      <nav>
        {links.map((link, i) => {
          return (
            <Link key={i} href={link.link}>
              <a
                className={classnames({
                  active: router.pathname === link.link,
                })}
              >
                {link.name}
              </a>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
