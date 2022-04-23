import React, { useCallback, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { HTTP_METHODS } from './assets';
import config from 'config';
import DefaultDropdown from 'components/_common/DefaultDropdown';
import Spinner from 'components/_common/Spinner';
import EndpointService from 'services/endpoint.service';
import { useHelpers } from 'context/HelperProvider';
import BreadCrumbs from 'components/_common/BreadCrumbs';
import { ROUTES } from 'constant/routes';
import Title from 'components/_typography/Title';
import { TypographyVariant } from 'types/Typography';
import Input from 'components/_common/Input';
import Divider from 'components/_common/Divider';
import Button from 'components/_common/Button';
import { ButtonVariant } from 'types/Button';

const Component = () => {
  const router = useRouter();
  const { showAlert } = useHelpers();

  const [fields, setFields] = useState({
    name: '',
    description: '',
    methods: [],
    path: '/'
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

  const { mutate: submitForm, isLoading: isMutationLoading } = useMutation(
    async () => {
      if (isMutationLoading) return;
      if (!fields.name) {
        return showAlert('Name is required field');
      }
      if (!fields.methods.length) {
        return showAlert('Please select at least one HTTP method');
      }
      if (!/^\//.test(fields.path)) {
        return showAlert(`Path is relative, starts with "/" symbol`);
      }

      await EndpointService.addNew({
        name: fields.name,
        description: fields.description,
        path: fields.path,
        allowed_methods: fields.methods,
        allowed_tiers: []
      });
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries('endpoints');
        showAlert('Success', true);
        await router.push(ROUTES.ENDPOINTS.BASE_URL);
      },
      onError: (e: any) => showAlert(e.message)
    }
  );

  return (
    <>
      <Head>
        <title>Add Endpoint - {config.meta.title}</title>
      </Head>
      {isMutationLoading && <Spinner />}

      <BreadCrumbs
        links={[
          { url: ROUTES.ENDPOINTS.BASE_URL, title: 'Endpoints' },
          { url: ROUTES.ENDPOINTS.ADD, title: 'Add Endpoint' }
        ]}
      />

      <Title
        variant={TypographyVariant.dark}
        level={3}
        className="!text-left mb-2"
      >
        Add new endpoint
      </Title>
      <Input
        name="name"
        placeholder="Name your endpoint"
        label="Name"
        value={fields.name}
        onChange={(e) => changeFields('name', e.target.value)}
      />
      <Input
        name="description"
        placeholder="Describe what this endpoint does"
        label="Description"
        value={fields.description}
        onChange={(e) => changeFields('description', e.target.value)}
      />

      <Divider className="my-4" />

      <div className="flex flex-col mb-2">
        <label className="text-black">Method</label>
        <DefaultDropdown
          isMulti={true}
          placeholder="Select"
          options={Object.entries(HTTP_METHODS).map(([key, val]) => ({
            label: key,
            value: val
          }))}
          value={fields.methods.map((method) => ({
            label: method,
            value: method
          }))}
          onChange={(values) => {
            changeFields(
              'methods',
              values.map((item) => item.value)
            );
          }}
        />
      </div>
      <Input
        name="path"
        placeholder="Path"
        label="Path"
        value={fields.path}
        onChange={(e) => changeFields('path', e.target.value)}
      />
      <small>{`Use <curly braces> to indicate path parameters if needed e.g.,/employees/{id}`}</small>

      <Divider className="my-4" />
      <div className="flex items-center space-x-2">
        <Button onClick={() => submitForm()}>Create</Button>
        <Button
          variant={ButtonVariant.outlined}
          url={ROUTES.ENDPOINTS.BASE_URL}
        >
          Cancel
        </Button>
      </div>
    </>
  );
};

export default Component;
