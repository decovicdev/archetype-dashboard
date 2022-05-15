import { useFormContext } from 'react-hook-form';
import { MouseEventHandler, useEffect } from 'react';
import Input from 'components/_common/Input';
import Title from 'components/_typography/Title';
import Button from 'components/_common/Button';
import { ErrorMessage, Form, FormikProvider, useFormik } from 'formik';
import { object, string } from 'yup';
import ErrorText from 'components/_typography/ErrorText';

type Props = {
  handleSubmit: (values) => void;
  values: { name: string; company: string; url: string };
};

const StepTwoForm: React.FC<Props> = ({ handleSubmit, values }) => {
  const formik = useFormik({
    initialValues: values,
    validationSchema: object().shape({
      name: string().required(),
      company: string().required(),
      url: string().url().required()
    }),
    onSubmit: (values, helpers) => {
      handleSubmit(values);
    }
  });
  const { getFieldProps, errors, touched } = formik;

  return (
    <div className="w-full h-full flex flex-col space-y-10 justify-center items-center">
      <Title className="!text-left" level={3}>
        1. Set up your API
      </Title>
      <FormikProvider value={formik}>
        <Form className="w-full">
          <div className="pb-2">
            <Input
              autoComplete="name"
              placeholder="Api Name"
              label="Name"
              {...getFieldProps('name')}
            />
            {Boolean(touched.name && errors.name) && (
              <ErrorText>{errors.name}</ErrorText>
            )}
          </div>
          <div className="pb-2">
            <Input
              placeholder="Company Name"
              label="Company"
              {...getFieldProps('company')}
            />
            {Boolean(touched.company && errors.company) && (
              <ErrorText>{errors.company}</ErrorText>
            )}
          </div>
          <div className="pb-4">
            <Input
              placeholder="Base URL"
              label="Base URL"
              {...getFieldProps('url')}
            />
            {Boolean(touched.url && errors.url) && (
              <ErrorText>{errors.url}</ErrorText>
            )}
          </div>
          <Button type="submit">Next</Button>
        </Form>
      </FormikProvider>
    </div>
  );
};

export default StepTwoForm;
