import { useCallback, useContext, useEffect, useRef, useState } from "react";
import config from "../../config";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import MenuIcon from "../../public/icons/menu.svg";
import ListViewIcon from "../../public/icons/list-view.svg";
import CardViewIcon from "../../public/icons/card-view.svg";

import EditIcon from "../_icons/EditIcon";
import DeleteIcon from "../_icons/DeleteIcon";
import Dropdown from "../_common/Dropdown";
import Spinner from "../_common/Spinner";
import DeleteModal from "./DeleteModal";

import CustomerService from "../../services/customer.service";

import { HelperContext } from "../../context/helper";

const Users = () => {
  const _deleteModal = useRef(null);

  const { showAlert } = useContext(HelperContext);

  const [inProgress, setProgress] = useState(false);
  const [data, setData] = useState([]);

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

  return (
    <div className="page users-page">
      <Head>
        <title>Users - {config.meta.title}</title>
      </Head>
      {inProgress && <Spinner />}
      <div className={"content"}>
        <div className="header">
          <h1>Customers</h1>
          <input
            className="searchInput"
            type="text"
            placeholder="Find customer"
          />
          <div className="btn-group">
            <button className="btn">
              <Image src={CardViewIcon} width={15} height={15} />
            </button>
            <button className="btn active">
              <Image src={ListViewIcon} width={15} height={15} />
            </button>
          </div>
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
        <div className="list">
          <table>
            <thead>
              <tr>
                <th>Customers</th>
                <th>API Key</th>
                <th>Tier</th>
                <th>Last seen date</th>
                <th>Status</th>
                <th>Spent</th>
                <th>Quota</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((customer) => {
                const lastSeenDate = new Date(customer.last_seen * 1000);
                const [month, day, year] = [
                  lastSeenDate.getMonth(),
                  lastSeenDate.getDate(),
                  lastSeenDate.getFullYear(),
                ];

                return (
                  <tr key={customer.uid}>
                    <td>ID: {customer.uid}</td>
                    <td>{customer.apikey}</td>
                    <td>
                      {customer.tier ? (
                        <Link href={`tiers/${customer.tier_id}`}>
                          {customer.tier_id}
                        </Link>
                      ) : (
                        "--"
                      )}
                    </td>
                    <td>{`${day}/${month + 1}/${year}`}</td>
                    <td className="capitalize">
                      {customer.status.replace("_", " ")}
                    </td>
                    {/* spent value not provided */}
                    <td>$0</td>
                    <td>{customer.quota}</td>
                    <td>
                      <Dropdown
                        title={<Image src={MenuIcon} width={3} height={18} />}
                      >
                        <Link href={`users/${customer.id}`}>
                          <a className="dropdownLink">
                            <EditIcon fill="#ffffff" />
                            Edit a customer
                          </a>
                        </Link>
                        <a
                          className="dropdownLink"
                          onClick={() => {
                            if (_deleteModal.current) {
                              _deleteModal.current.show();
                            }
                          }}
                        >
                          <DeleteIcon fill="#ffffff" />
                          Delete a customer
                        </a>
                      </Dropdown>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* Hide Pagination */}
          {/* <div className="paging">
            <a className="pageIcon active">1</a>
            <a className="pageIcon">2</a>
            <a className="pageIcon">3</a>
            <a className="pageIcon">4</a>
            <a className="pageIcon">5</a>
            <a className="pageIcon">
              <i className="next-arrow"></i>
            </a>
          </div> */}
        </div>
      </div>
      <DeleteModal modalRef={_deleteModal} />
    </div>
  );
};

export default Users;
