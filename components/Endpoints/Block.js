import { forwardRef, useCallback } from "react";
import Link from "next/link";
import classnames from "classnames";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/cjs/styles/hljs";

import Dropdown from "../_common/Dropdown";

const Component = forwardRef(
  ({ data, unauthorizedClick, clickDelete }, ref) => {
    const renderCode = useCallback((name, code) => {
      if (!code || typeof code !== "object") {
        return null;
      }

      let formatted = "";
      try {
        formatted = JSON.stringify(code, null, 4);
      } catch (e) {}

      return (
        <div className="code-block">
          <div className="code-part-header">{name}</div>
          <div className="code-part-data">
            <SyntaxHighlighter language="json" style={docco}>
              {formatted}
            </SyntaxHighlighter>
          </div>
        </div>
      );
    }, []);

    return (
      <div ref={ref} className="block">
        <div className="info-part">
          <div className="title">
            <div className="name">{data.name || "Method"}</div>
            {data.allowed_methods.map((method, i) => {
              return (
                <div className={classnames("badge", method.toLowerCase())}>
                  {method}
                </div>
              );
            })}
            <Dropdown title={<div className={"product-context-menu"} />}>
              <Link href={`/endpoints/${data.uid}`}>
                <a className={"edit-btn"}>Edit</a>
              </Link>
              <button
                type={"button"}
                className={"delete-btn"}
                onClick={() => clickDelete(data.uid)}
              >
                Delete
              </button>
            </Dropdown>
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
        <div className="code-part">
          {data?.queryBody ? renderCode("Query", data?.queryBody) : null}
          {data?.responseBody
            ? renderCode("Response", data?.responseBody)
            : null}
        </div>
      </div>
    );
  }
);

export default Component;
