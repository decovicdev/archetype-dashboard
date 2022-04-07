import {
  useRef,
  createRef,
  useMemo,
  useState,
  useEffect,
  useCallback
} from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import classnames from 'classnames';
import config from '../../config';

import Spinner from '../_common/Spinner';

import EndpointService from '../../services/endpoint.service';

import { useHelpers } from '../../context/HelperProvider';
import DeleteModal from './DeleteModal';
import Block from './Block';
import useDisclosure from 'hooks/useDisclosure';
import Button from 'components/_common/Button';
import { ROUTES } from 'constant/routes';
import Input from 'components/_common/Input';
import { ButtonVariant } from 'types/Button';
import Title from 'components/_typography/Title';
import { TypographyVariant } from 'types/Typography';

const Component = () => {
  const router = useRouter();

  const _sidebar = useRef(null);

  const { showAlert } = useHelpers();

  const [inProgress, setProgress] = useState(false);
  const [data, setData] = useState([]);
  const [searchText, onSearch] = useState('');
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
  }, []);

  const scrollTo = useCallback(
    (key) => {
      const targetRef = _refs[key];

      if (targetRef?.current) {
        window.scrollTo({
          top: targetRef.current.offsetTop,
          behavior: 'smooth'
        });
      }
    },
    [_refs]
  );

  const dropdownItems = useMemo(
    () =>
      data.filter((el) =>
        searchText
          ? el.name.toLowerCase().includes(searchText.toLowerCase())
          : el
      ),
    [data, searchText]
  );

  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Head>
        <title>Endpoints - {config.meta.title}</title>
      </Head>
      {inProgress && <Spinner />}
      <div>
        <div ref={_sidebar}>
          <Button url={ROUTES.ENDPOINTS.ADD}>+ Add new endpoint</Button>
          <Input
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
          {searchText ? (
            <Button variant={ButtonVariant.link} onClick={() => onSearch('')}>
              X
            </Button>
          ) : null}
          {!!(searchText && dropdownItems.length) && (
            <div>
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
          <div>
            <Title variant={TypographyVariant.dark}>API Methods</Title>
            <ul>
              {data.map((el, i) => (
                <li key={i}>
                  <Button
                    variant={ButtonVariant.outlined}
                    onClick={() => scrollTo(i)}
                  >
                    {el.name}
                  </Button>
                  {el.name_badge && (
                    <div className={classnames('badge', el.name_badge_style)}>
                      {el.name_badge}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <Title variant={TypographyVariant.dark}>API Documentation</Title>
          {data.map((el, i) => (
            <Block
              key={i}
              ref={_refs[i]}
              data={el}
              unauthorizedClick={() => {
                showAlert('Authorization is required');

                router.push('/auth/login');
              }}
              clickDelete={(id) => {
                setSelectedEndpoint(id);

                onOpen();
              }}
            />
          ))}
        </div>
      </div>
      <DeleteModal
        isOpen={isOpen}
        onClose={onClose}
        id={selectedEndpoint}
        onSuccess={fetch}
      />
    </>
  );
};

export default Component;
