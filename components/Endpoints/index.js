import config from "../../config";

import {
  useContext,
  useRef,
  createRef,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import classnames from "classnames";

import Block from "./Block";
import DeleteModal from "./DeleteModal";
import Spinner from "../_common/Spinner";

import EndpointService from "../../services/endpoint.service";

import { HelperContext } from "../../context/helper";

const Component = () => {
  const router = useRouter();

  const _deleteEndpoint = useRef(null);
  const _sidebar = useRef(null);

  const { showAlert } = useContext(HelperContext);

  const [inProgress, setProgress] = useState(false);
  const [data, setData] = useState([]);
  const [searchText, onSearch] = useState("");
  const [isFocused, setFocus] = useState(false);
  const [selectedEndpoint, setSelectedEndpoint] = useState(null);

  const _refs = useMemo(() => data.map(() => createRef(null)), [data]);

  const fetch = useCallback(async () => {
    try {
      setProgress(true);

      const response = await EndpointService.getList();
      setData(response);
    } catch (e) {
      showAlert(e.message);
    } finally {
      setProgress(false);
    }
  }, [showAlert]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const scrollTo = useCallback(
    (key) => {
      const targetRef = _refs[key];

      if (targetRef?.current) {
        window.scrollTo({
          top: targetRef.current.offsetTop,
          behavior: "smooth",
        });
      }
    },
    [_refs]
  );

  const renderBtns = useCallback(() => (
      <ul>
        {data.map((el, i) => (
            <li key={i}>
              <button
                type="button"
                className="btn small gradient-blue"
                onClick={() => scrollTo(i)}
              >
                {el.name}
              </button>
              {el.name_badge && (
                <div className={classnames("badge", el.name_badge_style)}>
                  {el.name_badge}
                </div>
              )}
            </li>
          ))}
      </ul>
    ), [data, scrollTo]);

  const renderBlocks = useCallback(() => (
      <div className="content-block">
        <div className="title">
          <span>API Documentation</span>
        </div>
        {data.map((el, i) => (
            <Block
              key={i}
              ref={_refs[i]}
              data={el}
              unauthorizedClick={() => {
                showAlert("Authorization is required");

                router.push("/account/login");
              }}
              clickDelete={(id) => {
                setSelectedEndpoint(id);

                _deleteEndpoint.current?.show();
              }}
            />
          ))}
      </div>
    ), [_refs, data, router, showAlert]);

  const renderSidebar = useCallback(() => {
    const dropdownItems = data.filter((el) => {
      if (searchText) {
        return el.name.toLowerCase().includes(searchText.toLowerCase());
      }
      return true;
    });

    return (
      <div ref={_sidebar} className="sidebar-block">
        <div className="top-section">
          <Link href="/endpoints/add">
            <a className="add-endpoint-btn">+ Add new endpoint</a>
          </Link>
          <div className="search-field">
            <div className="inp-with-dropdown">
              <input
                type="text"
                placeholder="Search for endpoint"
                value={searchText}
                onFocus={() => {
                  setFocus(true);
                }}
                onBlur={() => {
                  setFocus(false);
                }}
                onChange={(e) => onSearch(e.target.value)}
              />
              <button
                type="button"
                className={classnames("clear-btn", { active: searchText })}
                onClick={() => onSearch("")}
              />
              {!!(searchText && dropdownItems.length) && (
                <div className={classnames("menu", { active: isFocused })}>
                  {dropdownItems.map((item, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          onSearch(item.name);

                          scrollTo(item.key);
                        }}
                      >
                        {item.name}
                      </div>
                    ))}
                </div>
              )}
            </div>
            <button type="button" className="filter-btn" />
          </div>
        </div>
        <div className="bottom-section">
          <div className="title">API Methods</div>
          {renderBtns()}
        </div>
      </div>
    );
  }, [_sidebar, data, searchText, isFocused, scrollTo, renderBtns]);

  return (
    <>
      <Head>
        <title>Endpoints - {config.meta.title}</title>
      </Head>
      {inProgress && <Spinner />}
      <div className="page endpoints-page">
        {renderSidebar()}
        {renderBlocks()}
      </div>
      <DeleteModal
        ref={_deleteEndpoint}
        id={selectedEndpoint}
        onSuccess={fetch}
      />
    </>
  );
};

export default Component;
