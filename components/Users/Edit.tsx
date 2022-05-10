import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import DeleteUserModal from './DeleteUserModal';
import Spinner from 'components/_common/Spinner';
import { useHelpers } from 'context/HelperProvider';
import useDisclosure from 'hooks/useDisclosure';
import { ROUTES } from 'constant/routes';
import Button from 'components/_common/Button';
import { ButtonVariant } from 'types/Button';
import Divider from 'components/_common/Divider';
import ErrorText from 'components/_typography/ErrorText';
import Input from 'components/_common/Input';
import Title from 'components/_typography/Title';
import { TypographyVariant } from 'types/Typography';
import { Form, Formik, FormikProvider, useFormik } from 'formik';
import { object, string } from 'yup';
import { useApi } from 'context/ApiProvider';

type FormSchema = {
  email: string;
};

const Component = () => {
  const router = useRouter();
  const { user } = useApi();
  const { showAlert } = useHelpers();

  const formik = useFormik<FormSchema>({
    initialValues: {
      email: ''
    },
    validationSchema: object().shape({
      email: string().email().required()
    }),
    onSubmit: async (values, helpers) => {
      try {
        await user.updateById(router.query.userId as string, {
          email: values.email
        });

        showAlert('Success!', true);
      } catch (error) {
        console.error(error);
        showAlert('Something went wrong', false);
      }
    }
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { isLoading } = useQuery(
    ['user', router.query.userId],
    async () => user.getById(router.query.userId as string),
    {
      onError: (e: any) => showAlert(e.message),
      onSuccess: (user) => {
        formik.setFieldValue('email', user.email);
      }
    }
  );

  if (isLoading) return <Spinner />;

  return (
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

      <FormikProvider value={formik}>
        <Form>
          <Input
            placeholder="Email"
            label="Email"
            {...formik.getFieldProps('email')}
          />
          <ErrorText>{formik.touched.email && formik.errors.email}</ErrorText>
          <div className="w-full flex space-x-2">
            <Button type="submit">Save</Button>
            <Button
              variant={ButtonVariant.link}
              url={`${ROUTES.USERS.BASE_URL}/${router.query.userId}`}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </FormikProvider>
      <Divider className="my-2" />
      <DeleteUserModal id="data" isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Component;
