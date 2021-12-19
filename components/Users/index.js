import { useRef } from "react";
import config from "../../config";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import MenuIcon from "../../public/icons/menu.svg";
import FilterIcon from "../../public/icons/filter.svg";
import ListViewIcon from "../../public/icons/list-view.svg";
import CardViewIcon from "../../public/icons/card-view.svg";

import EditIcon from "../_icons/EditIcon";
import DeleteIcon from "../_icons/DeleteIcon";
import Dropdown from "../_common/Dropdown";

import DeleteModal from "./DeleteModal";

const Users = ({ data }) => {
  const _deleteModal = useRef(null);
  return (
    <div className="page users-page">
      <Head>
        <title>Users - {config.meta.title}</title>
      </Head>
      <div className={"content"}>
        <div className="header">
          <h1>Customers</h1>
          <input
            className="searchInput"
            type="text"
            placeholder="Find customer"
          />

          <button className="btn filter-btn">
            <Image src={FilterIcon} width={17} height={17} />
            Filter
          </button>

          <div className="btn-group">
            <button className="btn">
              <Image src={CardViewIcon} width={15} height={15} />
            </button>
            <button className="btn active">
              <Image src={ListViewIcon} width={15} height={15} />
            </button>
          </div>
        </div>
        <div className="cards">
          <div className="card">
            <span>Total customers</span>
            <span>10</span>
          </div>
          <div className="card">
            <span>Active trials</span>
            <span>2</span>
          </div>
          <div className="card">
            <span>Active subscriptions</span>
            <span>8</span>
          </div>
          <div className="card">
            <span>Total revenue</span>
            <span>$590</span>
          </div>
        </div>
        <div className="list">
          <table>
            <tr>
              <th>Customers</th>
              <th>API Key</th>
              <th>Tier</th>
              <th>Last seen date</th>
              <th>Status</th>
              <th>Spent</th>
              <th>% of quota</th>
              <th></th>
            </tr>
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
                  <td>{customer.status}</td>
                  {/* spent value not provided */}
                  <td>$0</td>
                  {/* percent value not provided */}
                  <td>{customer.quota}%</td>
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
          </table>
          <div className="paging">
            <a className="pageIcon active">1</a>
            <a className="pageIcon">2</a>
            <a className="pageIcon">3</a>
            <a className="pageIcon">4</a>
            <a className="pageIcon">5</a>
            <a className="pageIcon">
              <i className="next-arrow"></i>
            </a>
          </div>
        </div>
      </div>
      <DeleteModal modalRef={_deleteModal} />
    </div>
  );
};

export default Users;
