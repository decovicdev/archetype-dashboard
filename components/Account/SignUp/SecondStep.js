import config from "../../../config";

import React, { useContext, useState, useEffect, useCallback } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import Spinner from "../../_common/Spinner";

import ApiService from "../../../services/api.service.js";

import { AuthContext } from "../../../context/auth";
import { HelperContext } from "../../../context/helper";

const Component = () => {
  const router = useRouter();

  const { currentUser } = useContext(AuthContext);
  const { showAlert } = useContext(HelperContext);

  const [inProgress, setProgress] = useState(false);
  const [apiName, setApiName] = useState("");
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    if (!currentUser) {
      router.push("/account/signup");
    }
  }, [currentUser]);

  const submitForm = useCallback(async () => {
    try {
      if (inProgress) {
        return;
      }
      if (!apiName) {
        return showAlert("Name is required");
      }
      if (!companyName) {
        return showAlert("Company is required");
      }

      setProgress(true);

      const response = await ApiService.createOne({
        name: apiName,
        company: companyName,
      });

      showAlert("API is successfully created", true);

      if (response.connect_url) {
        setTimeout(() => {
          window.location.replace(
            `${response.connect_url}?success_url=${config}settings`
          );
        }, 1000);
      }
    } catch (e) {
      showAlert(e.message);
    } finally {
      setProgress(false);
    }
  }, [showAlert, inProgress, apiName, companyName]);

  return (
    <>
      <Head>
        <title>Create API - {config.meta.title}</title>
      </Head>
      {inProgress ? <Spinner /> : null}
      <div className="page signup-page">
        <div className="content">
          <div className="info-block">
            <h2>Some text here</h2>
            <ul>
              <li>
                <h3>Item 1</h3>
                <p>Important text here</p>
              </li>
              <li>
                <h3>Item 1</h3>
                <p>Important text here</p>
              </li>
              <li>
                <h3>Item 1</h3>
                <p>Important text here</p>
              </li>
            </ul>
          </div>
          <div className="form-block">
            <div className="top-info">
              <h2>Create your first API</h2>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitForm();
              }}
            >
              <div className="field">
                <label htmlFor="apiName">Name</label>
                <input
                  type="text"
                  autoComplete="name"
                  value={apiName}
                  id="apiName"
                  onChange={(e) => setApiName(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="companyName">Company</label>
                <input
                  type="text"
                  value={companyName}
                  id="companyName"
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
              <button type="submit" className="btn gradient-pink">
                Create
              </button>
            </form>
            <div className="bottom-info">
              <span>Don't want to do it now?</span>
              <Link href="/settings">
                <a>Skip</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Component;
