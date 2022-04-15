import {
  billingOptions,
  pricingOptions,
  PRICING_MODEL_VALUES,
  trialTimeOptions
} from './assets';
import Button from 'components/_common/Button';
import Divider from 'components/_common/Divider';
import Dropdown, { Option } from 'components/_common/Dropdown';
import Input from 'components/_common/Input';
import Switch from 'components/_common/Switch';
import Title from 'components/_typography/Title';
import { ROUTES } from 'constant/routes';
import { ButtonVariant } from 'types/Button';
import { TypographyVariant } from 'types/Typography';

const dimensionOptions: Option[] = [
  { label: 'Requests', value: 'requests' },
  { label: 'Domain', value: 'domain' }
];
const Form = ({
  fields,
  changeFields,
  clickAddTrial,
  submitForm,
  type = 'create'
}) => {
  const title = type === 'edit' ? 'Edit a product' : 'Create a product';
  const onConfirmText = type === 'edit' ? 'Save' : 'Create';
  const onCancelText = type === 'edit' ? 'Discard' : 'Cancel';

  return (
    <form
      className="flex flex-col space-y-2 max-w-[800px] mx-10"
      onSubmit={(e) => {
        e?.preventDefault();
        submitForm();
      }}
    >
      <Title
        level={3}
        className="!text-left my-4"
        variant={TypographyVariant.dark}
      >
        {title}
      </Title>
      <Input
        name="name"
        className="grid grid-cols-aside"
        labelClassName="text-tblack-400 mb-0"
        placeholder="Add name"
        label="Name"
        value={fields.name}
        onChange={(e) => changeFields('name', e.target.value)}
      />
      <Input
        name="description"
        className="grid grid-cols-aside"
        labelClassName="text-tblack-400 mb-0"
        placeholder="Add description"
        label="Description"
        value={fields.description}
        onChange={(e) => changeFields('description', e.target.value)}
      />
      <div className="grid grid-cols-aside items-center">
        <Switch
          label={fields.meteredUsage ? 'Limited Quota' : 'Unlimited Quota'}
          checked={fields.meteredUsage}
          onChange={(checked) => changeFields('meteredUsage', checked)}
        />
        {fields.meteredUsage && (
          <Input
            name="quota"
            className="grid grid-cols-aside items-center"
            labelClassName="text-tblack-400 mb-0"
            placeholder="Add quota"
            label="Quota"
            htmlType="number"
            value={fields.quota}
            onChange={(e) => {
              if (e.target.value && !/^[0-9]*$/g.test(e.target.value)) return;
              changeFields('quota', e.target.value);
            }}
          />
        )}
      </div>
      <Dropdown
        label="Pricing model"
        // name="pricingModel"
        placeholder="choose pricing model"
        innerClassName="grid grid-cols-aside items-center"
        value={pricingOptions.find(
          (option) => option.value === fields.pricingModel?.id
        )}
        onChange={(option) =>
          changeFields('pricingModel', PRICING_MODEL_VALUES[option.value])
        }
        options={pricingOptions}
      />
      <Input
        name="price"
        className="grid grid-cols-aside items-center"
        labelClassName="text-tblack-400 mb-0"
        placeholder="Add price"
        label="Price"
        value={fields.price}
        onChange={(e) => {
          if (e.target.value && !/^[0-9]*\.?[0-9]*$/g.test(e.target.value))
            return;
          changeFields('price', e.target.value);
        }}
        onBlur={(e) => {
          if (!e.target.value) return;
          changeFields('price', parseFloat(e.target.value).toFixed(2));
        }}
      />
      <Dropdown
        // name="billingPeriod"
        placeholder="Add billing period"
        innerClassName="grid grid-cols-aside items-center"
        label="Billing period"
        value={billingOptions.find(
          (option) =>
            (option.value as string)?.toLowerCase?.() ===
            fields.billingPeriod?.toLowerCase?.()
        )}
        onChange={(option) => changeFields('billingPeriod', option.value)}
        options={billingOptions}
      />
      <div className="grid grid-cols-aside items-center">
        <Switch
          label={fields.hasTrial ? '- Remove free trial' : '+ Add free trial'}
          checked={fields.hasTrial}
          onChange={clickAddTrial}
        />
        {fields.hasTrial && (
          <div className="flex flex-col space-y-2">
            <Input
              name="length"
              className="grid grid-cols-aside items-center"
              labelClassName="text-tblack-400 mb-0"
              placeholder="Add length"
              label="Length"
              htmlType="number"
              value={fields.trialLen}
              onChange={(e) => changeFields('trialLen', e.target.value)}
            />
            <Dropdown
              // name="trialTimeFrame"
              placeholder="Add trial time"
              innerClassName="grid grid-cols-aside items-center"
              label="Type"
              value={trialTimeOptions.find(
                (option) =>
                  (option.value as string)?.toLowerCase?.() ===
                  fields.trialTimeFrame?.toLowerCase?.()
              )}
              onChange={(option) =>
                changeFields('trialTimeFrame', option.value)
              }
              options={trialTimeOptions}
            />
          </div>
        )}
      </div>
      <Divider className="!my-4" />
      {fields.pricingModel?.id === 'subscription' ? null : (
        <>
          <Button
            onClick={() => {
              changeFields('plans', [
                ...(fields.plans || []),
                { id: Date.now() }
              ]);
            }}
          >
            + Add Plan
          </Button>
          {fields.plans?.map((plan) => (
            <div key={plan.id} className="grid grid-cols-3 items-center">
              {/* <Dropdown
                placeholder="Dimention"
                value={dimensionOptions.find(
                  (option) =>
                    (option.value as string)?.toLowerCase?.() ===
                    plan.dimension?.toLowerCase?.()
                )}
                onChange={(option) => {
                  changeFields(
                    'plans',
                    fields.plans?.map((p) =>
                      p.id === plan.id ? { ...p, dimension: option.value } : p
                    ) || []
                  );
                }}
                options={dimensionOptions}
              /> */}
              <Input
                name="price"
                labelClassName="text-tblack-400 mb-0"
                placeholder="Price"
                htmlType="number"
                value={plan.unit_amount}
                onChange={(e) => {
                  changeFields(
                    'plans',
                    fields.plans?.map((p) =>
                      p.id === plan.id
                        ? { ...p, unit_amount: e.target.value }
                        : p
                    ) || []
                  );
                }}
              />
              {/* <Input
                name="startCount"
                labelClassName="text-tblack-400 mb-0"
                placeholder="Start Count"
                htmlType="number"
                value={plan.startCount}
                onChange={(e) => {
                  changeFields(
                    'plans',
                    fields.plans?.map((p) =>
                      p.id === plan.id
                        ? { ...p, startCount: parseInt(e.target.value) }
                        : p
                    ) || []
                  );
                }}
              /> */}
              <Input
                name="endCount"
                labelClassName="text-tblack-400 mb-0"
                placeholder="End Count"
                htmlType="number"
                value={plan.up_to}
                onChange={(e) => {
                  changeFields(
                    'plans',
                    fields.plans?.map((p) =>
                      p.id === plan.id ? { ...p, up_to: e.target.value } : p
                    ) || []
                  );
                }}
              />
              <Button
                className="w-fit h-fit ml-auto !p-2 text-xs"
                variant={ButtonVariant.danger}
                onClick={() => {
                  changeFields(
                    'plans',
                    fields.plans.filter((p) => p.id !== plan.id) || []
                  );
                }}
              >
                X
              </Button>
            </div>
          ))}
          <Divider className="!my-4" />
        </>
      )}
      <div className="flex justify-between">
        <Button
          type="button"
          className="px-10"
          variant={ButtonVariant.outlined}
          url={ROUTES.PRODUCTS.BASE_URL}
        >
          {onCancelText}
        </Button>
        <Button className="px-10" type="submit">
          {onConfirmText}
        </Button>
      </div>
    </form>
  );
};

export default Form;
