import React, { useState, useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import DeleteUserModal from './DeleteUserModal';
import config from 'config';
import Spinner from 'components/_common/Spinner';
import CustomerService from 'services/customer.service';
import { useHelpers } from 'context/HelperProvider';
import useDisclosure from 'hooks/useDisclosure';
import { ROUTES } from 'constant/routes';
import BreadCrumbs from 'components/_common/BreadCrumbs';
import Button from 'components/_common/Button';
import { ButtonVariant } from 'types/Button';
import Divider from 'components/_common/Divider';
import ErrorText from 'components/_typography/ErrorText';
import Input from 'components/_common/Input';
import Title from 'components/_typography/Title';
import { TypographyVariant } from 'types/Typography';

const Component = () => {
  const router = useRouter();
  const { showAlert } = useHelpers();
  const [fields, setFields] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { isLoading } = useQuery(
    ['user', router.query.userId],
    async () => CustomerService.getById(router.query.userId),
    {
      onError: (e: any) => showAlert(e.message),
      onSuccess: (newData: any) => {
        setFields({ email: newData?.email });
      }
    }
  );

  const changeFields = useCallback(
    (field, value, obj?: any) => {
      const result = { ...fields };

      if (!field && !value && obj) {
        for (const key in obj) {
          result[key] = obj[key];
        }
      } else {
        result[field] = value;
      }

      setFields(result);
    },
    [fields]
  );

  const queryClient = useQueryClient();

  const { mutate: saveUser, isLoading: isEditUserLoading } = useMutation(
    async () => {
      if (isEditUserLoading) return;
      await CustomerService.updateById(router.query.userId, {
        email: fields.email
      });
    },
    {
      onError: (e: any) => showAlert(e.message),
      onSuccess: async () => {
        await queryClient.invalidateQueries(['user', router.query.userId]);
        showAlert('Success', true);
      }
    }
  );

  return (
    <>
      <Head>
        <title>Edit Customer - {config.meta.title}</title>
      </Head>
      {isLoading && <Spinner />}
      <BreadCrumbs
        links={[
          { url: ROUTES.USERS.BASE_URL, title: 'Customers' },
          {
            url: `${ROUTES.USERS.EDIT}/${router.query.userId}`,
            title: 'Edit Customer'
          }
        ]}
      />
      {fields ? (
        <>
          <div className="flex items-center">
            <Title
              variant={TypographyVariant.dark}
              level={3}
              className="!text-left mb-2"
            >
              Customer Information
            </Title>
            <Button variant={ButtonVariant.danger} onClick={onOpen}>
              Delete
            </Button>
          </div>
          <Input
            name="email"
            placeholder="Email"
            label="Email"
            value={fields.email}
            onChange={(e) => changeFields('email', e.target.value)}
          />
          <Divider className="my-2" />
          <div className="w-full flex space-x-2">
            <Button onClick={() => saveUser()}>Save</Button>
            <Button variant={ButtonVariant.link} url={ROUTES.USERS.BASE_URL}>
              Cancel
            </Button>
          </div>
        </>
      ) : (
        <ErrorText>Customer not found.</ErrorText>
      )}
      <DeleteUserModal id="data" isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Component;
