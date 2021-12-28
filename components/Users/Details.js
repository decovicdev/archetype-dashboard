import config from "../../config";

import { useState, useCallback, useRef, useContext, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import Dropdown from "../_common/Dropdown";
import Spinner from "../_common/Spinner";
import DeleteUser from "./DeleteModal";

import CustomerService from "../../services/customer.service";

import { HelperContext } from "../../context/helper";

const Component = () => {
  const _deleteUser = useRef(null);

  const router = useRouter();

  const { showAlert } = useContext(HelperContext);

  const [inProgress, setProgress] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetch() {
      try {
        setProgress(true);

        const response = await CustomerService.getById(router.query.userId);
        setData(response);
      } catch (e) {
        showAlert(e.message);
      } finally {
        setProgress(false);
      }
    }

    fetch();
  }, []);

  const renderContent = useCallback(() => {
    if (!data) {
      return <div className={"no-content"}>Customer not found.</div>;
    }

    return (
      <>
        <div className={"top-block"}>
          <h2>Customer Profile</h2>
          <Dropdown title={<div className={"user-context-menu"} />}>
            <Link href={`/users/edit/${data.custom_uid}`}>
              <a className={"edit-btn"}>Edit</a>
            </Link>
            <button
              type={"button"}
              className={"delete-btn"}
              onClick={() => {
                _deleteModal.current?.show();
              }}
            >
              Delete
            </button>
          </Dropdown>
        </div>
        <div className={"line"} />
        <div className={"content-block"}>
          <h3>Customer details</h3>
          <div className={"field"}>
            <div className={"name"}>App User ID</div>
            <div className={"value"}>{data.custom_uid}</div>
          </div>
          <div className={"field"}>
            <div className={"name"}>Name</div>
            <div className={"value"}>{data.attrs?.name}</div>
          </div>
          <div className={"field"}>
            <div className={"name"}>Email</div>
            <div className={"value"}>{data.email}</div>
          </div>
          <div className={"field"}>
            <div className={"name"}>Project</div>
            <div className={"value"}>{data.custom_uid}</div>
          </div>
          <div className={"field"}>
            <div className={"name"}>Tier</div>
            <div className={"value"}>{data.custom_uid}</div>
          </div>
        </div>
        <div className={"line"} />
        <h3>Customer history</h3>
      </>
    );
  }, [_deleteUser, data]);

  return (
    <div className="page users-details-page">
      <Head>
        <title>Customer Information - {config.meta.title}</title>
      </Head>
      {inProgress && <Spinner />}
      <div className={"content with-lines"}>
        <div className={"bread-crumbs"}>
          <Link href={"/users"}>
            <a>Customers</a>
          </Link>
          <span>{">"}</span>
          <Link href={router.pathname}>
            <a className={"active"}>Customer Profile</a>
          </Link>
        </div>
        {renderContent()}
      </div>
      <DeleteUser
        ref={_deleteUser}
        id={router.query.userId}
        onSuccess={() => {
          router.push("/users");
        }}
      />
    </div>
  );
};

export default Component;
