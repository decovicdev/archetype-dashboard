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

import data from "./data.json";

import Spinner from "../_common/Spinner";

import Analytics from "../../helpers/analytics";
import AccountService from "../../services/account.service";

import { HelperContext } from "../../context/helper";

const Component = () => {
  const router = useRouter();

  const _sidebar = useRef();

  const { showAlert } = useContext(HelperContext);

  const methodsList = [...data].map((el, i) => {
    el.key = i;
    return el;
  });

  const _refs = useMemo(() => {
    return methodsList.map((el) => {
      return createRef(null);
    });
  }, [methodsList]);

  const [inProgress, setProgress] = useState(false);
  const [activePlan, setActivePlan] = useState("free");
  const [apiKey, setApiKey] = useState("None");
  const [searchText, onSearch] = useState("");
  const [isFocused, setFocus] = useState(false);

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

  const renderBtns = useCallback(() => {
    return (
      <ul>
        {methodsList.map((el, i) => {
          return (
            <li key={i}>
              <button
                type="button"
                className="btn small grey"
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
          );
        })}
      </ul>
    );
  }, [methodsList, scrollTo]);

  const renderBlocks = useCallback(() => {
    return (
      <div className="content-block">
        <div className="title">API Documentation</div>
        {activePlan && (
          <div className="customer-tier-block">
            Your customer tier is
            <Link href="/pricing">
              <a className="btn grey small">{activePlan}</a>
            </Link>
            {activePlan === "free" && (
              <Link href="/pricing">
                <a
                  className="btn small green"
                  onClick={() => {
                    Analytics.event({
                      action: "click",
                      params: { name: "API Docs - Upgrade Plan" },
                    });
                  }}
                >
                  Upgrade
                </a>
              </Link>
            )}
          </div>
        )}
        {apiKey && (
          <div>
            <div className="customer-tier-block">Your API key is {apiKey}.</div>
            <div className="customer-tier-block">
              {" "}
              Add an "apikey" field with your API Key to every GET request body
              to return real data.
            </div>
          </div>
        )}
        {!apiKey && (
          <div className="customer-tier-block">
            You're not logged in so demo API Key is used.{" "}
          </div>
        )}
        {methodsList.map((el, i) => {
          return (
            <Block
              key={i}
              ref={_refs[i]}
              data={el}
              unauthorizedClick={() => {
                showAlert("Authorization is required");

                router.push("/settings");
              }}
            />
          );
        })}
      </div>
    );
  }, [_refs, methodsList, activePlan, apiKey, showAlert]);

  const renderSidebar = useCallback(() => {
    const dropdownItems = methodsList.filter((el) => {
      if (searchText) {
        return el.name.toLowerCase().includes(searchText.toLowerCase());
      }
      return true;
    });

    return (
      <div ref={_sidebar} className="sidebar-block">
        <div className="top-section">
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
                {dropdownItems.map((item, i) => {
                  return (
                    <div
                      key={i}
                      onClick={() => {
                        onSearch(item.name);

                        scrollTo(item.key);
                      }}
                    >
                      {item.name}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div className="bottom-section">
          <div className="title">API Methods</div>
          {renderBtns()}
        </div>
      </div>
    );
  }, [_sidebar, methodsList, searchText, isFocused, scrollTo, renderBtns]);

  return (
    <>
      <Head>
        <title>API Documentation - {config.meta.title}</title>
        <meta name="description" content={config.meta.description} />
        <meta name="keywords" content={config.meta.keywords} />
      </Head>
      {inProgress && <Spinner />}
      <div className="api-docs-page">
        {renderSidebar()}
        {renderBlocks()}
      </div>
    </>
  );
};

export default Component;
