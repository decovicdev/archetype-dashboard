import { useRouter } from "next/router";
import Link from "next/link";
import classnames from "classnames";

const Component = ({ onClickItem }) => {
  const router = useRouter();

  return (
    <>
      <Link href="/api-docs">
        <a
          className={classnames({
            active: router.pathname === "/api-docs",
          })}
          onClick={onClickItem}
        >
          Documentation
        </a>
      </Link>
      <Link href="/pricing">
        <a
          className={classnames({
            active: router.pathname === "/pricing",
          })}
          onClick={onClickItem}
        >
          Pricing
        </a>
      </Link>
      <Link href="/endpoints">
        <a
          className={classnames({
            active: router.pathname === "/endpoints",
          })}
          onClick={onClickItem}
        >
          Endpoints
        </a>
      </Link>
      <Link href="/tiers">
        <a
          className={classnames({
            active: router.pathname === "/tiers",
          })}
          onClick={onClickItem}
        >
          Products
        </a>
      </Link>
      <Link href="/users">
        <a
          className={classnames({
            active: router.pathname === "/users",
          })}
          onClick={onClickItem}
        >
          Users
        </a>
      </Link>
      <Link href="/settings">
        <a
          className={classnames({
            active: router.pathname === "/settings",
          })}
          onClick={onClickItem}
        >
          Settings
        </a>
      </Link>
    </>
  );
};

export default Component;
