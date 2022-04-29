import Paragraph from 'components/_typography/Paragraph';
import Title from 'components/_typography/Title';
import { TypographyVariant } from 'types/Typography';

const RevenueTable: React.FC = () => (
  <div className="grid grid-cols-2 gap-x-14 ">
    <Title className="!text-left" level={5} variant={TypographyVariant.dark}>
      Revenue
    </Title>
    <Paragraph
      className="!text-sm mt-1 !font-bold  text-center text-sky-600"
      variant={TypographyVariant.dark}
    >
      Details
    </Paragraph>
    <Paragraph className="!text-sm" variant={TypographyVariant.dark}>
      Monthly MTR
    </Paragraph>
    <Paragraph
      className="!text-sm !font-extrabold text-center"
      variant={TypographyVariant.dark}
    >
      $0
    </Paragraph>
    <Paragraph className="!text-sm" variant={TypographyVariant.dark}>
      Last Month
    </Paragraph>
    <Paragraph
      className="!text-sm !font-extrabold text-center "
      variant={TypographyVariant.dark}
    >
      $0
    </Paragraph>
    <Paragraph className="!text-sm" variant={TypographyVariant.dark}>
      Adjustments
    </Paragraph>
    <Paragraph
      className="!text-sm !font-extrabold text-center"
      variant={TypographyVariant.dark}
    >
      0%
    </Paragraph>
  </div>
);

export default RevenueTable;
