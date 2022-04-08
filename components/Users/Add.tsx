import React, { useState, useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import config from 'config';
import Spinner from 'components/_common/Spinner';
import CustomerService from 'services/customer.service';
import { getHash } from 'helpers/utils';
import { useHelpers } from 'context/HelperProvider';
import { ROUTES } from 'constant/routes';
import Input from 'components/_common/Input';
import Button from 'components/_common/Button';
import { ButtonVariant } from 'types/Button';
import Divider from 'components/_common/Divider';
import Title from 'components/_typography/Title';
import BreadCrumbs from 'components/_common/BreadCrumbs';
import { TypographyVariant } from 'types/Typography';

const Component = () => {
  const router = useRouter();
  const { showAlert } = useHelpers();
  const [fields, setFields] = useState({
    id: getHash(20),
    name: '',
    email: ''
  });

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

  const { mutate: submitForm, isLoading } = useMutation(
    async () => {
      try {
        if (isLoading) return;
        if (!fields.id) {
          return showAlert('ID is required field');
        }
        if (!fields.name) {
          return showAlert('Name is required field');
        }
        if (!fields.email) {
          return showAlert('Email is required field');
        }

        await CustomerService.addNew({
          uid: fields.id,
          attrs: { name: fields.name },
          email: fields.email
        });
      } catch (e) {
        showAlert(e.message);
      }
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries('users');
        showAlert('Success', true);
        void router.push(ROUTES.USERS.BASE_URL);
      },
      onError: (e: any) => showAlert(e.message)
    }
  );

  return (
    <>
      <Head>
        <title>Add User - {config.meta.title}</title>
      </Head>
      {isLoading && <Spinner />}
      <BreadCrumbs
        links={[
          { url: ROUTES.USERS.BASE_URL, title: 'Users' },
          { url: ROUTES.USERS.ADD, title: 'Add User' }
        ]}
      />

      <Title
        variant={TypographyVariant.dark}
        level={3}
        className="!text-left my-3"
      >
        Customer Information
      </Title>
      <Input
        name="fieldId"
        placeholder="ID"
        label="ID"
        value={fields.id}
        onChange={(e) => changeFields('id', e.target.value)}
      />
      <Button onClick={() => changeFields('id', getHash(20))}>Generate</Button>
      <Input
        name="name"
        placeholder="Name"
        label="Name"
        value={fields.name}
        onChange={(e) => changeFields('name', e.target.value)}
      />
      <Input
        name="email"
        placeholder="Email"
        label="Email"
        value={fields.email}
        htmlType="email"
        onChange={(e) => changeFields('email', e.target.value)}
      />

      <Divider />
      <Button onClick={() => submitForm()}>Create</Button>
      <Button variant={ButtonVariant.link} url={ROUTES.USERS.BASE_URL}>
        Cancel
      </Button>
    </>
  );
};

export default Component;
