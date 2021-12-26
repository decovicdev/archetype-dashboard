import config from "../../config";

import React, { useState, useCallback, useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import Spinner from "../_common/Spinner";

import CustomerService from "../../services/customer.service";

import { getHash } from "../../helpers/utils";

import { HelperContext } from "../../context/helper";

const Component = () => {
  const router = useRouter();

  const { showAlert } = useContext(HelperContext);

  const [inProgress, setProgress] = useState(false);
  const [fields, setFields] = useState({
    id: getHash(20),
    name: "",
    email: "",
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

      if (!fields.id) {
        return showAlert("ID is required field");
      }
      if (!fields.name) {
        return showAlert("Name is required field");
      }
      if (!fields.email) {
        return showAlert("Email is required field");
      }

      setProgress(true);

      await CustomerService.addNew({
        uid: fields.id,
        attrs: {
          name: fields.name,
        },
        email: fields.email,
      });

      showAlert("Success", true);

      router.push("/users");
    } catch (e) {
      showAlert(e.message);
    } finally {
      setProgress(false);
    }
  }, [inProgress, fields, showAlert]);

  return (
    <div className="page users-add-page">
      <Head>
        <title>Add User - {config.meta.title}</title>
      </Head>
      {inProgress && <Spinner />}
      <div className={"content with-lines"}>
        <div className={"bread-crumbs"}>
          <Link href={"/users"}>
            <a>Users</a>
          </Link>
          <span>{">"}</span>
          <Link href={"/users/add"}>
            <a className={"active"}>Add User</a>
          </Link>
        </div>
        <div className={"form"}>
          <h2>Customer Information</h2>
          <div className={"field id"}>
            <label>ID</label>
            <input
              type={"text"}
              value={fields.id}
              onChange={(e) => changeFields("id", e.target.value)}
            />
            <button
                type={"button"}
                className={"generate-btn"}
                onClick={() => changeFields("id", getHash(20))}
            />
          </div>
          <div className={"field"}>
            <label>Name</label>
            <input
              type={"text"}
              value={fields.name}
              onChange={(e) => changeFields("name", e.target.value)}
            />
          </div>
          <div className={"field"}>
            <label>Email</label>
            <input
              type={"text"}
              value={fields.email}
              onChange={(e) => changeFields("email", e.target.value)}
            />
          </div>
        </div>
        <div className={"line"} />
        <div className={"btns"}>
          <button
            type={"button"}
            className={"btn gradient-blue"}
            onClick={() => submitForm()}
          >
            Create
          </button>
          <Link href={`/users`}>
            <a className={"btn clean-white"}>Cancel</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Component;
