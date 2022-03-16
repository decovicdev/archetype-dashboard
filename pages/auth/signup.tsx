import type { NextPage } from 'next';
import Button from 'components/_common/Button';
import { ButtonVariant } from 'types/Button';
import OnboardingLayout from 'components/_common/OnboardingLayout';
import Title from 'components/_typography/Title';
import Paragraph from 'components/_typography/Paragraph';
import ArcheTypeLogo from 'components/_icons/ArcheTypeLogo';
import Card from 'components/_common/Card';
import { LogoVariant } from 'types/ArcheTypeLogo';
import List from 'components/_typography/List';
import { TypographyVariant } from 'types/Typography';
import Input from 'components/_common/Input';
import { FormVariant } from 'types/Form';
import Divider from 'components/_common/Divider';

const SignupPage: NextPage = () => (
  <OnboardingLayout>
    <div className="w-full h-full grid grid-cols-2 gap-x-20 items-center px-60">
      <div className="w-full h-full flex flex-col justify-center items-start space-y-6">
        <Paragraph className="!text-left">Archetype handles</Paragraph>
        <List className="space-y-6">
          <li>infrastructure for creating plans</li>
          <li>managing quotas</li>
          <li>editing permissions</li>
          <li>dynamic pricing for APIs</li>
        </List>
        <Paragraph className="!text-left">
          with just a few lines of code!
        </Paragraph>
      </div>
      <Card className="flex flex-col space-y-10 p-[60px] max-w-[540px]">
        <ArcheTypeLogo
          variant={LogoVariant.darkText}
          className="w-40 mx-auto"
        />
        <div className="flex flex-col space-y-4">
          <Title variant={TypographyVariant.dark}>Create an Account</Title>
          <div className="flex space-x-2 justify-center items-center">
            <Paragraph
              variant={TypographyVariant.darkFaint}
              className="!w-auto"
              level={2}
            >
              Have an Account?
            </Paragraph>
            <Button variant={ButtonVariant.link} className="!p-0">
              Sign In
            </Button>
          </div>
        </div>
        <div className="w-full flex flex-col space-y-[24px]">
          <Input
            name="email"
            label="Email"
            variant={FormVariant.outlined}
            placeholder="Enter Email Address"
          />
          <Input
            name="password"
            label="Password"
            variant={FormVariant.outlined}
            placeholder="Create Password"
          />
          <Button className="w-full">Register</Button>
          <div className="flex justify-center items-center">
            <Button variant={ButtonVariant.link} className="!p-0">
              Terms of Service
            </Button>
            <Divider direction="vertical" className="mx-2 h-5" />
            <Button variant={ButtonVariant.link} className="!p-0">
              Privacy Policy
            </Button>
          </div>
          <Divider className="my-2" />
          <Paragraph variant={TypographyVariant.darkFaint} level={2}>
            Or create an account using:
          </Paragraph>
          <Button variant={ButtonVariant.outlined}>Continue with Google</Button>
          <Button variant={ButtonVariant.outlined}>Continue with GitHub</Button>
        </div>
      </Card>
    </div>
  </OnboardingLayout>
);

export default SignupPage;
