import config from "../../config";

import { useState, useCallback, useRef, useEffect, useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import Select from "react-select";
import { useRouter } from "next/router";
import DeleteUser from "./DeleteModal";
import CustomerService from "../../services/customer.service";

import DeleteIcon from "../_icons/DeleteIcon";
import { HelperContext } from "../../context/helper";


const tierValues = [
  { value: 1, label: "Basic" },
  { value: 2, label: "Advanced" },
  { value: 3, label: "Enterprise" },
];

const Component = () => {
  const [inProgress, setProgress] = useState(false);
  const [fields, setFields] = useState(null);
  const router = useRouter();
  /*
  const [info, setInfo] = useState({
    name: "Darrell Steward",
    email: "tim.jennings@example.com",
    id: "13467425",
    apiKey: "WL278DXkowQDZ7kETED3W54iBE2",
    tier: 1,
    lastSeenDate: null,
    quota: null,
  });
  */
  const _deleteUser = useRef(null);

  const { showAlert } = useContext(HelperContext);

  const setData = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const onTierChange = (e) => {
    console.log(e);
    setInfo((prev) => ({ ...prev, tier: e.value }));
  };

  const copyApiKey = () => {
    navigator.clipboard.writeText(fields.apikey);
    showAlert("Copied to clipboard", true);
  };

  useEffect(() => {
    async function fetch() {
      try {
        setProgress(true);
        const response = await CustomerService.getById(router.query.userId);
        setFields(response);
      } catch (e) {
        showAlert(e.message);
      } finally {
        setProgress(false);
      }
    }

    fetch();
  }, []);

  if (!fields) {
    return <div className={"no-content"}>Product not found.</div>;
  }
  return (
    
    <div className="page users-details-page">
      <Head>
        <title>Customer Information - {config.meta.title}</title>
      </Head>
      <div className={"content"}>
        <ul className="breadcrumb">
          <li>
            <Link href="/users">Customers</Link>
          </li>
          <li>Edit a customer</li>
        </ul>
        <div className="header">
          <h1>Customer Information</h1>
          <a
            onClick={() => {
              if (_deleteUser.current) {
                _deleteUser.current.show();
              }
            }}
          >
            <DeleteIcon fill="#ffffff" />
          </a>
        </div>
        <hr />
        <form className="form">
          <div className="field">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" value={fields.name} onChange={setData} />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              autoComplete="email"
              id="email"
              value={fields.email}
              onChange={setData}
            />
          </div>
          <div className="field">
            <label htmlFor="id">ID</label>
            <input type="text" id="id" value={fields.custom_uid} onChange={setData} />
          </div>
          <div className="field">
            <label htmlFor="apiKey">API Key</label>
            <input
              className="copy-input"
              type="text"
              id="apiKey"
              readOnly
              value={fields.apikey}
              onChange={setData}
              onClick={copyApiKey}
            />
          </div>
          {/*<div className="field">
            <label htmlFor="tier">Tier</label>
            <Select
              options={tierValues}
              className="react-select-container"
              classNamePrefix="react-select"
              value={tierValues.find((val) => val.value === info.tier)}
              onChange={onTierChange}
          />
          </div>
          <div className="field">
            <label htmlFor="lastSeenDate">Last Seen Date</label>
            <input
              type="date"
              id="lastSeenDate"
              value={info.lastSeenDate}
              onChange={setData}
            />
          </div>
          <div className="field">
            <label htmlFor="quota">Quota</label>
            <input
              type="number"
              id="quota"
              min={0}
              max={100}
              step={0.01}
              placeholder="0.00%"
              value={info.quota}
              onChange={setData}
            />
          </div>*/}
        </form>
        <hr />
        <div className="btns">
          <button className="btn grey">Save</button>
          <button className="btn border-white">Cancel</button>
        </div>
      </div>
      <DeleteUser ref={_deleteUser} />
    </div>
  );
};

export default Component;
