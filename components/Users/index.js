import config from "../../config";

import { useCallback, useContext, useEffect, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import Dropdown from "../_common/Dropdown";
import Spinner from "../_common/Spinner";
import DeleteModal from "./DeleteModal";
import GenerateKey from "./GenerateKey";

import CustomerService from "../../services/customer.service";

import { HelperContext } from "../../context/helper";

const Users = () => {
  const router = useRouter();

  const _deleteModal = useRef(null);
  const _generateKey = useRef(null);

  const { showAlert } = useContext(HelperContext);

  const [inProgress, setProgress] = useState(false);
  const [data, setData] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const fetch = useCallback(async () => {
    try {
      setProgress(true);

      const response = await CustomerService.getList();
      setData(response);
    } catch (e) {
      showAlert(e.message);
    } finally {
      setProgress(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, []);

  const clickItem = useCallback(
    (e, item) => {
      if (
        e.target.className === "context-menu-dots" ||
        e.target.parentNode.classList.contains("dropdown") ||
        e.target.parentNode.classList.contains("dropdownContent")
      ) {
        return;
      }

      router.push(`/users/${item.custom_uid}`);
    },
    [router]
  );

  const renderContent = useCallback(() => {
    let list = [...data];

    if (searchVal) {
      list = list.filter((item) => {
        return (
          item.attrs?.name.toLowerCase().indexOf(searchVal.toLowerCase()) >= 0
        );
      });
    }

    return (
      <>
        <div className={"users-list-header"}>
          <div className={"col"}>Customer</div>
          <div className={"col"}>API key</div>
          <div className={"col"}>Tier</div>
          <div className={"col"}>Last seen</div>
          <div className={"col"}>Status</div>
        </div>
        <div className={"users-list-data"}>
          {list.map((customer) => {
            return (
              <div
                key={customer.custom_uid}
                className={"row"}
                onClick={(e) => clickItem(e, customer)}
              >
                <div className={"col with-long-text"}>
                  {customer.custom_uid}
                </div>
                <div className={"col with-long-text"}>{customer.apikey}</div>
                <div className={"col with-long-text"}>
                  {customer.tier_id || "-"}
                </div>
                <div className={"col"}>
                  {new Date(customer.last_seen * 1000).toLocaleDateString()}
                </div>
                <div className={"col"}>
                  {customer.status.replace("_", " ")}
                  <Dropdown title={<div className={"context-menu-dots"} />}>
                    <Link href={`/users/edit/${customer.custom_uid}`}>
                      <a className={"edit-btn"}>Edit</a>
                    </Link>
                    <button
                      type={"button"}
                      className={"generate-key-btn"}
                      onClick={() => {
                        setSelectedId(customer.custom_uid);

                        _generateKey.current?.show();
                      }}
                    >
                      Reset API key
                    </button>
                    <button
                      type={"button"}
                      className={"delete-btn"}
                      onClick={() => {
                        setSelectedId(customer.custom_uid);

                        _deleteModal.current?.show();
                      }}
                    >
                      Delete
                    </button>
                  </Dropdown>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }, [_deleteModal, data, searchVal]);

  return (
    <div className="page users-page">
      <Head>
        <title>Users - {config.meta.title}</title>
      </Head>
      {inProgress && <Spinner />}
      <div className={"content"}>
        <div className="header-block">
          <h1>Customers</h1>
          <input
            type="text"
            placeholder="Find customer"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
          />
          <Link href={"/users/add"}>
            <a className={"add-user-btn"}>Add user</a>
          </Link>
        </div>
        <div className="cards">
          <div className="card">
            <span>Total customers</span>
            <span>0</span>
          </div>
          <div className="card">
            <span>Active trials</span>
            <span>0</span>
          </div>
          <div className="card">
            <span>Active subscriptions</span>
            <span>0</span>
          </div>
          <div className="card">
            <span>Total revenue</span>
            <span>$0</span>
          </div>
        </div>
        {renderContent()}
      </div>
      <DeleteModal
        ref={_deleteModal}
        id={selectedId}
        onSuccess={() => {
          fetch();
        }}
      />
      <GenerateKey
        ref={_generateKey}
        id={selectedId}
        onSuccess={() => {
          fetch();
        }}
      />
    </div>
  );
};

export default Users;
