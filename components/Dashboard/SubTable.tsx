import Paragraph from 'components/_typography/Paragraph';
import Title from 'components/_typography/Title';
import { TypographyVariant } from 'types/Typography';

const SubTable: React.FC = () => (
  <div className="grid grid-cols-2 gap-x-10 mb-1 gap-y-8  ml-4 w-full">
    <Title className="!text-left" level={5} variant={TypographyVariant.dark}>
      Subscriptions
    </Title>
    <Paragraph
      className="!text-sm mt-1 !font-bold  text-center text-sky-600"
      variant={TypographyVariant.dark}
    >
      Details
    </Paragraph>
    <Paragraph className="!text-sm" variant={TypographyVariant.dark}>
      Active Users
    </Paragraph>
    <Paragraph
      className="!text-sm !font-extrabold text-center "
      variant={TypographyVariant.dark}
    >
      0
    </Paragraph>
    <Paragraph className="!text-sm" variant={TypographyVariant.dark}>
      Trials Users
    </Paragraph>
    <Paragraph
      className="!text-sm !font-extrabold text-center"
      variant={TypographyVariant.dark}
    >
      0
    </Paragraph>
    <Paragraph className="!text-sm" variant={TypographyVariant.dark}>
      Expired Users
    </Paragraph>
    <Paragraph
      className="!text-sm !font-extrabold text-center"
      variant={TypographyVariant.dark}
    >
      0
    </Paragraph>
  </div>
);
export default SubTable;
