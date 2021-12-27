import config from "../../config";

import { useCallback, useContext, useEffect, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import Dropdown from "../_common/Dropdown";
import Spinner from "../_common/Spinner";
import DeleteModal from "./DeleteModal";

import CustomerService from "../../services/customer.service";

import { HelperContext } from "../../context/helper";

const Users = () => {
  const router = useRouter();

  const _deleteModal = useRef(null);

  const { showAlert } = useContext(HelperContext);

  const [inProgress, setProgress] = useState(false);
  const [data, setData] = useState([]);
  const [searchVal, setSearchVal] = useState("");

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
        e.target.className === "user-context-menu" ||
        e.target.parentNode.classList.contains("dropdown") ||
        e.target.parentNode.classList.contains("dropdownContent")
      ) {
        return;
      }

      router.push(`/users/${item.uid}`);
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
          <div className={"col"}>API Key</div>
          <div className={"col"}>Tier</div>
          <div className={"col"}>Last Seen</div>
          <div className={"col"}>Status</div>
          <div className={"col"}>Spent</div>
          <div className={"col"}>Quota</div>
        </div>
        <div className={"users-list-data"}>
          {list.map((customer) => {
            const lastSeenDate = new Date(customer.last_seen * 1000);
            const [month, day, year] = [
              lastSeenDate.getMonth(),
              lastSeenDate.getDate(),
              lastSeenDate.getFullYear(),
            ];

            return (
              <div
                key={customer.uid}
                className={"row"}
                onClick={(e) => clickItem(e, customer)}
              >
                <div className={"col with-long-text"}>
                  {customer.custom_uid}
                </div>
                <div className={"col with-long-text"}>{customer.apikey}</div>
                <div className={"col"}>
                  {customer.tier ? (
                    <Link href={`tiers/${customer.tier_id}`}>
                      {customer.tier_id}
                    </Link>
                  ) : (
                    "--"
                  )}
                </div>
                <div className={"col"}>{`${day}/${month + 1}/${year}`}</div>
                <div className={"col"}>{customer.status.replace("_", " ")}</div>
                <div className={"col"}>$0</div>
                <div className={"col"}>
                  <div>{customer.quota}</div>
                  <Dropdown title={<div className={"user-context-menu"} />}>
                    <Link href={`/users/edit/${customer.uid}`}>
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
              </div>
            );
          })}
        </div>
      </>
    );
  }, [data, searchVal]);

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
      <DeleteModal modalRef={_deleteModal} />
    </div>
  );
};

export default Users;
