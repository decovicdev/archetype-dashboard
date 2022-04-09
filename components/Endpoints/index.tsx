import { useRef, createRef, useMemo, useState, useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import classnames from 'classnames';
import DeleteModal from './DeleteModal';
import Block from './Block';
import config from 'config';
import Spinner from 'components/_common/Spinner';
import { useHelpers } from 'context/HelperProvider';
import useDisclosure from 'hooks/useDisclosure';
import Button from 'components/_common/Button';
import { ROUTES } from 'constant/routes';
import Input from 'components/_common/Input';
import { ButtonVariant } from 'types/Button';
import Title from 'components/_typography/Title';
import { TypographyVariant } from 'types/Typography';
import { useEndpoints } from 'hooks/useEndpoints';

const Component = () => {
  const router = useRouter();
  const _sidebar = useRef(null);
  const { showAlert } = useHelpers();
  const [searchText, onSearch] = useState('');
  const [selectedEndpoint, setSelectedEndpoint] = useState(null);

  const { data, isLoading } = useEndpoints();

  const _refs = useMemo(() => data?.map(() => createRef(null)), [data]);

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
      data?.filter((el) =>
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
      {isLoading && <Spinner />}
      <div>
        <div ref={_sidebar} className="flex space-x-2 items-center my-2">
          <Button className="whitespace-nowrap" url={ROUTES.ENDPOINTS.ADD}>
            + Add new endpoint
          </Button>
          <Input
            name="search"
            placeholder="Search for endpoint"
            value={searchText}
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
        </div>

        <Title
          level={3}
          className="!text-left my-4"
          variant={TypographyVariant.dark}
        >
          API Methods
        </Title>
        <ul>
          {data?.map((el, i) => (
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
        <Title
          level={3}
          className="!text-left my-4"
          variant={TypographyVariant.dark}
        >
          API Documentation
        </Title>
        {data?.map((el, i) => (
          <Block
            key={i}
            ref={_refs[i]}
            data={el}
            unauthorizedClick={() => {
              showAlert('Authorization is required');
              void router.push(ROUTES.AUTH.LOGIN);
            }}
            clickDelete={(id) => {
              setSelectedEndpoint(id);
              onOpen();
            }}
          />
        ))}
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
