import Card from 'components/_common/Card';
import Button from 'components/_common/Button';
import { Variant } from 'types/Button';
import PlusCircle from 'components/_icons/PlusCircle';
import Input from 'components/_common/Input';
import Dropdown from 'components/_common/Dropdown';
import Switch from 'components/_common/Switch';

const Components = () => (
  <>
    <Card>Hello</Card>
    <Button>Primary</Button>
    <Button variant={Variant.outlined}>Outlined</Button>
    <Button variant={Variant.link}>Link</Button>
    <Button leftIcon={<PlusCircle className="text-white" />}>Primary</Button>
    <Button leftIcon={<PlusCircle />} variant={Variant.outlined}>
      Outlined
    </Button>
    <Button leftIcon={<PlusCircle />} variant={Variant.link}>
      Link
    </Button>
    <Input placeholder="Input Text" />
    <Dropdown
      placeholder="Select option"
      options={[
        { label: 'Yearly', value: 'yearly' },
        { label: 'Monthly', value: 'monthly' },
        { label: 'Weekly', value: 'weekly' }
      ]}
    />
    <Switch />
  </>
);

export default Components;
