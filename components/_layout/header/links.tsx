import { useRouter } from 'next/router';
import Link from 'next/link';
import classnames from 'classnames';

const Component = ({ onClickItem }: {onClickItem?:any}) => {
  const router = useRouter();

  return (
    <>
      <Link href="/tiers">
        <a
          className={classnames({
            active: router.pathname === '/tiers'
          })}
          onClick={onClickItem}
        >
          Products
        </a>
      </Link>
      <Link href="/endpoints">
        <a
          className={classnames({
            active: router.pathname === '/endpoints'
          })}
          onClick={onClickItem}
        >
          Endpoints
        </a>
      </Link>
      <Link href="/users">
        <a
          className={classnames({
            active: router.pathname === '/users'
          })}
          onClick={onClickItem}
        >
          Users
        </a>
      </Link>

      <Link href="/pricing">
        <a
          className={classnames({
            active: router.pathname === '/pricing'
          })}
          onClick={onClickItem}
        >
          Pricing
        </a>
      </Link>
    </>
  );
};

export default Component;
