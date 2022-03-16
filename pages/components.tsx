import Card from 'components/_common/Card';
import Button from 'components/_common/Button';
import { ButtonVariant } from 'types/Button';
import PlusCircle from 'components/_icons/PlusCircle';
import Input from 'components/_common/Input';
import Dropdown from 'components/_common/Dropdown';
import Switch from 'components/_common/Switch';
import OnboardingLayout from 'components/_common/OnboardingLayout';
import Title from 'components/_typography/Title';
import Paragraph from 'components/_typography/Paragraph';
import ArcheTypeLogo from 'components/_icons/ArcheTypeLogo';
import { TypographyVariant } from 'types/Typography';
import { LogoVariant } from 'types/ArcheTypeLogo';

const Components = () => (
  <OnboardingLayout>
    <div className="flex flex-col space-y-4 p-20">
      <Card>Hello</Card>
      <Button>Primary</Button>
      <Button variant={ButtonVariant.outlined}>Outlined</Button>
      <Button variant={ButtonVariant.link}>Link</Button>
      <Button leftIcon={<PlusCircle className="text-white" />}>Primary</Button>
      <Button leftIcon={<PlusCircle />} variant={ButtonVariant.outlined}>
        Outlined
      </Button>
      <Button leftIcon={<PlusCircle />} variant={ButtonVariant.link}>
        Link
      </Button>
      <Input name="test" placeholder="Input Text" />
      <Dropdown
        placeholder="Select option"
        options={[
          { label: 'Yearly', value: 'yearly' },
          { label: 'Monthly', value: 'monthly' },
          { label: 'Weekly', value: 'weekly' }
        ]}
      />
      <Switch />
      <Title variant={TypographyVariant.light}>This is a title</Title>
      <Title variant={TypographyVariant.dark}>This is a title</Title>
      <Paragraph>This is a paragraph</Paragraph>
      <ArcheTypeLogo variant={LogoVariant.light} />
      <ArcheTypeLogo variant={LogoVariant.dark} />
      <ArcheTypeLogo variant={LogoVariant.lightText} />
      <ArcheTypeLogo variant={LogoVariant.darkText} />
    </div>
  </OnboardingLayout>
);

export default Components;
