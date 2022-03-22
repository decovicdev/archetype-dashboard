import { forwardRef } from 'react';
import Link from 'next/link';
import classnames from 'classnames';

import DropdownMenu from '../_common/DropdownMenu';

const Component = forwardRef(function Component({ data, clickDelete }, ref) {
  return (
    <div ref={ref} className="block">
      <div className="info-part">
        <div className="title">
          <Link href={`/endpoints/${data.uid}`}>
            <a className="name">{data.name || 'Method'}</a>
          </Link>
          {data.allowed_methods.map((method) => (
            <div
              key={method.toLowerCase()}
              className={classnames('badge', method.toLowerCase())}
            >
              {method}
            </div>
          ))}
          <DropdownMenu title={<div className="product-context-menu" />}>
            <Link href={`/endpoints/edit/${data.uid}`}>
              <a className="edit-btn">Edit</a>
            </Link>
            <button
              type="button"
              className="delete-btn"
              onClick={() => clickDelete(data.uid)}
            >
              Delete
            </button>
          </DropdownMenu>
        </div>
        {data.description && data.description.length && (
          <div className="text">{data.description}</div>
        )}
        <input
          type="text"
          readOnly
          defaultValue={data?.path ? data?.path : null}
        />
      </div>
    </div>
  );
});

export default Component;
