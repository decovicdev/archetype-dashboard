import Button from 'components/_common/Button';
import Card from 'components/_common/Card';
import Paragraph from 'components/_typography/Paragraph';
import Title from 'components/_typography/Title';
import { ButtonVariant } from 'types/Button';
import { TypographyVariant } from 'types/Typography';

const Transactions: React.FC = () => (
  <div className="grid grid-cols-6 gap-2 mb-4  ">
    <Card className="mt-4 col-span-2 h-full">
      <div className="flex gap-4 mb-8">
        <Title
          className="!text-left w-fit"
          level={5}
          variant={TypographyVariant.dark}
        >
          Get started
        </Title>
        <Button
          className="bg-blue-100/75 text-sky-700 py-1	px-1.5 rounded "
          variant={ButtonVariant.outlined}
        >
          Documentation
        </Button>
      </div>
      <div className="flex mb-4">
        <input type="checkbox" name="Initiate API" id="Initiate API" />
        <label className="-mt-1.5 ml-5" htmlFor="Initiate API">
          Initiate API
        </label>
      </div>
      <div className="flex mb-4">
        <input type="checkbox" name="Initiate API" id="Initiate API" />
        <label className="-mt-1.5 ml-5" htmlFor="Initiate API">
          Initiate API
        </label>
      </div>
      <div className="flex mb-4">
        <input type="checkbox" name="Initiate API" id="Initiate API" />
        <label className="-mt-1.5 ml-5" htmlFor="Initiate API">
          Initiate API
        </label>
      </div>
    </Card>
    <Card className="mt-4 col-span-4 h-full">
      <div className="flex gap-4">
        <Title
          className="!text-left"
          level={5}
          variant={TypographyVariant.dark}
        >
          Recent Transactions
        </Title>
        <Button
          className="bg-blue-100/75 text-sky-700 py-1	px-1.5 rounded "
          variant={ButtonVariant.outlined}
        >
          Documentation
        </Button>
      </div>
      <div className="grid grid-cols-3 mb-3  mt-3 text-right ">
        <Paragraph className="!text-sm" variant={TypographyVariant.dark}>
          Subscription
        </Paragraph>
        <Paragraph className="!text-sm" variant={TypographyVariant.dark}>
          Billing Date
        </Paragraph>
        <Paragraph className="!text-sm" variant={TypographyVariant.dark}>
          Amount
        </Paragraph>
      </div>
      <div className="mt-8 border-dashed border-2 border-zinc-900 h-[90px] flex justify-center content-center">
        <Paragraph
          className="leading-[90px] text-center"
          variant={TypographyVariant.dark}
        >
          No transactions to show
        </Paragraph>
      </div>
    </Card>
  </div>
);

export default Transactions;
