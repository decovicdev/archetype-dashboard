import React from "react";

const options = [
  "Authorization",
  "Cache-Control",
  "Postman-Token",
  "Content-Type",
  "Content-Lenght",
  "Host",
  "User-Agent",
  "Accept",
  "Accept-Encoding",
  "Connection",
  "X-Archetype-ApplID",
];

const Component = () => {
  return (
    <div className="headers-block">
      <div className="table-header">
        <div className="col" />
        <div className="col">Key</div>
        <div className="col">Value</div>
        <div className="col">Description</div>
      </div>
      <div className="table-data">
        {options.map((item, i) => {
          return (
            <div key={item} className="row">
              <div className="col">
                <input type="checkbox" checked={i % 2} />
              </div>
              <div className="col">{item}</div>
              <div className="col">{`<calculated when request is sent>`}</div>
              <div className="col"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Component;
