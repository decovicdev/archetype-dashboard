import config from "../../config";

import React, { useCallback, useContext, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { HTTP_METHODS } from "./assets";

import Spinner from "../_common/Spinner";

import { HelperContext } from "../../context/helper";

const Component = () => {
  const router = useRouter();

  const { showAlert } = useContext(HelperContext);

  const [inProgress, setProgress] = useState(false);
  const [fields, setFields] = useState({
    name: "",
    description: "",
    externalDocUrl: "",
    externalDocDescr: "",
    method: "",
    path: "",
  });

  const changeFields = useCallback(
    (field, value, obj) => {
      const result = { ...fields };

      if (!field && !value && obj) {
        for (let key in obj) {
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
        return showAlert("Name is required field");
      }

      setProgress(true);

      showAlert("Success", true);

      router.push("/endpoints");
    } catch (e) {
      showAlert(e.message);
    } finally {
      setProgress(false);
    }
  }, [inProgress, fields, showAlert]);

  return (
    <>
      <Head>
        <title>Add Endpoint - {config.meta.title}</title>
      </Head>
      {inProgress && <Spinner />}
      <div className="page endpoints-add-page">
        <div className={"content"}>
          <div className={"bread-crumbs"}>
            <Link href={"/endpoints"}>
              <a>Endpoints</a>
            </Link>
            <span>{">"}</span>
            <Link href={"/endpoints/add"}>
              <a className={"active"}>Add Endpoint</a>
            </Link>
          </div>
          <div className={"form"}>
            <h2>Add new endpoint</h2>
            <div className={"field"}>
              <label>Name</label>
              <input
                type={"text"}
                value={fields.name}
                placeholder={"Name your endpoint"}
                onChange={(e) => changeFields("name", e.target.value)}
              />
            </div>
            <div className={"field description"}>
              <label>Description</label>
              <textarea
                value={fields.description}
                placeholder={"Describe what this endpoint does"}
                onChange={(e) => changeFields("description", e.target.value)}
              />
            </div>
            <div className={"field"}>
              <label>External Doc URL</label>
              <input
                type={"text"}
                value={fields.externalDocUrl}
                placeholder={"External link to more information"}
                onChange={(e) => changeFields("externalDocUrl", e.target.value)}
              />
            </div>
            <div className={"field"}>
              <label>External Doc Description</label>
              <input
                type={"text"}
                value={fields.externalDocDescr}
                placeholder={"Brief label for external link"}
                onChange={(e) =>
                  changeFields("externalDocDescr", e.target.value)
                }
              />
            </div>
          </div>
          <div className={"line"} />
          <div className={"form"}>
            <div className={"group-fields"}>
              <div className={"field method"}>
                <select
                  value={fields.method}
                  onChange={(e) => changeFields("method", e.target.value)}
                >
                  {Object.entries(HTTP_METHODS).map(([key, val]) => {
                    return (
                      <option key={key} value={key}>
                        {val}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className={"field path"}>
                <input
                  type={"text"}
                  value={fields.path}
                  onChange={(e) => changeFields("path", e.target.value)}
                />
                <small>{`Use <curly braces> to indicate path parameters if needed e.g.,/employees/{id}`}</small>
              </div>
            </div>
          </div>
          <div className={"btns"}>
            <button
              type={"button"}
              className={"btn gradient-blue"}
              onClick={() => submitForm()}
            >
              Create
            </button>
            <Link href={`/tiers`}>
              <a className={"btn clean-white"}>Cancel</a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Component;
