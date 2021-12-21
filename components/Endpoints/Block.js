import { forwardRef, useCallback } from "react";
import classnames from "classnames";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/cjs/styles/hljs";

const Component = forwardRef(({ data, unauthorizedClick }, ref) => {
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
          <div className="name">{data.name}</div>
          <div className={classnames("badge", data.method?.toLowerCase())}>
            {data.method}
          </div>
          <div className={classnames("badge", data.format)}>{data.format}</div>
        </div>
        {data.text && data.text.length && (
          <div className="text">{data.text}</div>
        )}
        <input
          type="text"
          readOnly
          defaultValue={data?.endpoint ? data?.endpoint : null}
          onClick={(e) => {
            window.open(data.endpoint, "_blank").focus();
          }}
        />
      </div>
      <div className="code-part">
        {data?.queryBody ? renderCode("Query", data?.queryBody) : null}
        {data?.responseBody ? renderCode("Response", data?.responseBody) : null}
      </div>
    </div>
  );
});

export default Component;
