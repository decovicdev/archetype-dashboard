import config from "../../config";

import { useRef, useState, useEffect, useCallback, useContext } from "react";
import Head from "next/head";
import Link from "next/link";

import Spinner from "../_common/Spinner";
import Modal from "../_common/Modal";

import UserService from "../../services/user.service";

import { HelperContext } from "../../context/helper";

const Component = () => {
  const _addUser = useRef();

  const { showAlert } = useContext(HelperContext);

  const [inProgress, setProgress] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetch() {
      try {
        setProgress(true);

        const response = await UserService.getList();
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
    if (!data.length) {
      return <div>No users added yet.</div>;
    }

    return data.map((item, i) => {
      return (
        <div key={i} className={"users-list-item"}>
          User
        </div>
      );
    });
  }, [data]);

  return (
    <div className="page users-page">
      <Head>
        <title>Users - {config.meta.title}</title>
      </Head>
      {inProgress && <Spinner />}
      <div className={"content"}>
        <div className={"top-block"}>
          <button
            type={"button"}
            className={"btn gradient-pink"}
            onClick={() => {
              if (_addUser.current) {
                _addUser.current.show();
              }
            }}
          >
            Add new user
          </button>
        </div>
        {renderContent()}
      </div>
      <Modal ref={_addUser}>
        <div className={"data"}>
          <h1>Add new user</h1>
        </div>
        <div className={"btns"}>
          <button
            type={"button"}
            className={"btn light-blue"}
            onClick={() => {
              if (_addUser.current) {
                _addUser.current.hide();
              }
            }}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Component;
