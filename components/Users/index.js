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

const data = [
  {
    id: "13467425",
    apiKey: "WL278DXkowQDZ7kETED3W54iBE2",
    tier: { id: 1, title: "basic" },
    lastSeenDate: "08/12/2021",
    status: "active",
    spent: 99,
    percent: 10,
  },
  {
    id: "13467425",
    apiKey: "WL278DXkowQDZ7kETED3W54iBE2",
    tier: { id: 2, title: "advanced" },
    lastSeenDate: "08/12/2021",
    status: "expired",
    spent: 200,
    percent: 10,
  },
  {
    id: "13467425",
    apiKey: "WL278DXkowQDZ7kETED3W54iBE2",
    tier: null,
    lastSeenDate: "08/12/2021",
    status: "active",
    spent: 99,
    percent: 10,
  },
  {
    id: "13467425",
    apiKey: "WL278DXkowQDZ7kETED3W54iBE2",
    tier: { id: 3, title: "enterprise" },
    lastSeenDate: "08/12/2021",
    status: "active",
    spent: 99,
    percent: 10,
  },
  {
    id: "13467425",
    apiKey: "WL278DXkowQDZ7kETED3W54iBE2",
    tier: { id: 1, title: "basic" },
    lastSeenDate: "08/12/2021",
    status: "active",
    spent: 99,
    percent: 10,
  },
];

const Users = () => {
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
            <span>Active supscriptions</span>
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
              <th>% of qouta</th>
              <th></th>
            </tr>
            {data.map((customer) => (
              <tr>
                <td>ID: {customer.id}</td>
                <td>{customer.apiKey}</td>
                <td>
                  {customer.tier ? (
                    <Link href={`tiers/${customer.tier.id}`}>
                      {customer.tier.title}
                    </Link>
                  ) : (
                    "--"
                  )}
                </td>
                <td>{customer.lastSeenDate}</td>
                <td>{customer.status}</td>
                <td>${customer.spent}</td>
                <td>{customer.percent}%</td>
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
            ))}
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
