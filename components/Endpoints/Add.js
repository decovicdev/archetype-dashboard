import config from '../../config';

import React, { useCallback, useContext, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { HTTP_METHODS } from './assets';

import DefaultDropdown from '../_common/DefaultDropdown';
import Spinner from '../_common/Spinner';
// import HeadersTab from "./blocks/headers";
// import QueryTab from "./blocks/query";
// import BodyTab from "./blocks/body";

import EndpointService from '../../services/endpoint.service';

import { HelperContext } from '../../context/helper';

const Component = () => {
  const router = useRouter();

  const { showAlert } = useContext(HelperContext);

  const [inProgress, setProgress] = useState(false);
  const [fields, setFields] = useState({
    name: '',
    description: '',
    methods: [],
    path: '/'
  });
  // const [activeTab, setActiveTab] = useState("headers");

  const changeFields = useCallback(
    (field, value, obj) => {
      const result = { ...fields };

      if (!field && !value && obj) {
        for (const key in obj) {
          result[key] = obj[key];
        }
      } else {
        result[field] = value;
      }

      setFields(result);
    },
    [fields]
  );

  const submitForm = useCallback(async () => {
    try {
      if (inProgress) {
        return;
      }

      if (!fields.name) {
        return showAlert('Name is required field');
      }
      if (!fields.methods.length) {
        return showAlert('Please select at least one HTTP method');
      }
      if (!/^\//.test(fields.path)) {
        return showAlert(`Path is relative, starts with "/" symbol`);
      }

      setProgress(true);

      await EndpointService.addNew({
        name: fields.name,
        description: fields.description,
        path: fields.path,
        allowed_methods: fields.methods,
        allowed_tiers: []
      });

      showAlert('Success', true);

      router.push('/endpoints');
    } catch (e) {
      showAlert(e.message);
    } finally {
      setProgress(false);
    }
  }, [
    inProgress,
    fields.name,
    fields.methods,
    fields.path,
    fields.description,
    showAlert,
    router
  ]);

  const renderTabs = useCallback(
    () =>
      // not implemented yet
      null,

    // return (
    //   <div className={"tabs"}>
    //     <ul className={"tabs-list"}>
    //       <li
    //         className={classnames({ active: activeTab === "headers" })}
    //         onClick={() => setActiveTab("headers")}
    //       >
    //         Headers
    //       </li>
    //       <li
    //         className={classnames({ active: activeTab === "query" })}
    //         onClick={() => setActiveTab("query")}
    //       >
    //         Query
    //       </li>
    //       <li
    //         className={classnames({ active: activeTab === "body" })}
    //         onClick={() => setActiveTab("body")}
    //       >
    //         Body
    //       </li>
    //     </ul>
    //     <div className={"tabs-data"}>
    //       {activeTab === "headers" && <HeadersTab />}
    //       {activeTab === "query" && <QueryTab />}
    //       {activeTab === "body" && <BodyTab />}
    //     </div>
    //   </div>
    // );
    []
  );

  return (
    <>
      <Head>
        <title>Add Endpoint - {config.meta.title}</title>
      </Head>
      {inProgress && <Spinner />}
      <div className="page endpoints-add-page">
        <div className="content with-lines">
          <div className="bread-crumbs">
            <Link href="/endpoints">
              <a>Endpoints</a>
            </Link>
            <span>{'>'}</span>
            <Link href="/endpoints/add">
              <a className="active">Add Endpoint</a>
            </Link>
          </div>
          <div className="form">
            <h2>Add new endpoint</h2>
            <div className="field">
              <label>Name</label>
              <input
                type="text"
                value={fields.name}
                placeholder="Name your endpoint"
                onChange={(e) => changeFields('name', e.target.value)}
              />
            </div>
            <div className="field description">
              <label>Description</label>
              <textarea
                value={fields.description}
                placeholder="Describe what this endpoint does"
                onChange={(e) => changeFields('description', e.target.value)}
              />
            </div>
          </div>
          <div className="line" />
          <div className="form">
            <div className="field method">
              <label>Method</label>
              <DefaultDropdown
                isMulti={true}
                placeholder="Select"
                options={Object.entries(HTTP_METHODS).map(([key, val]) => ({
                  label: key,
                  value: val
                }))}
                value={fields.methods.map((method) => ({
                  label: method,
                  value: method
                }))}
                onChange={(values) => {
                  changeFields(
                    'methods',
                    values.map((item) => item.value)
                  );
                }}
              />
            </div>
            <div className="field path">
              <label>Path</label>
              <input
                type="text"
                value={fields.path}
                onChange={(e) => changeFields('path', e.target.value)}
              />
              <small>{`Use <curly braces> to indicate path parameters if needed e.g.,/employees/{id}`}</small>
            </div>
          </div>
          {renderTabs()}
          <div className="line" />
          <div className="btns">
            <button
              type="button"
              className="btn gradient-blue"
              onClick={() => submitForm()}
            >
              Create
            </button>
            <Link href="/endpoints">
              <a className="btn clean-white">Cancel</a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Component;
