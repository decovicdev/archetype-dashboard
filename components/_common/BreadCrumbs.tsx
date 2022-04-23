import { Fragment } from 'react';
import Link from 'next/link';

type Props = {
  links: {
    url: string;
    title: string;
  }[];
};

const BreadCrumbs: React.FC<Props> = ({ links }) => (
  <div className="flex items-center">
    {links.map((link, index) => (
      <Fragment key={link.url}>
        <Link href={link.url}>
          <a className="text-black m-0 p-0 flex items-center leading-8">{link.title}</a>
        </Link>
        {index === links.length - 1 ? null : (
          <span className="text-black mx-2 m-0 p-0 flex items-center leading-8">
            {'>'}
          </span>
        )}
      </Fragment>
    ))}
  </div>
);

export default BreadCrumbs;
