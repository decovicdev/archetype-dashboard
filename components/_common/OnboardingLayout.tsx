import { Fragment } from 'react';

const BLUE_DOTS = [
  'top-[33%] left-[7%]',
  'top-[66%] left-[7%]',
  'top-[40%] left-[20%]',
  'top-[60%] left-[20%]',
  'top-[24%] right-[40%]',
  'top-[50%] right-[32%]',
  'bottom-[24%] right-[44%]',
  'bottom-[24%] right-[16%]'
];

const OnboardingLayout = ({ children }) => (
  <div className="w-screen h-screen bg-gradient-radial from-tblue-500 to-tblue-600 overflow-x-hidden overflow-y-auto relative">
    <div className="absolute left-0 top-0 w-full h-full pointer-events-none z-0">
      {BLUE_DOTS.map((dotPosition) => (
        <Fragment key={dotPosition}>
          <span
            className={`absolute w-[6px] h-[6px] bg-tblue-100 rounded-full ${dotPosition}`}
          />
          <span
            className={`absolute w-[6px] h-[6px] bg-tblue-100 rounded-full blur-[3px] ${dotPosition}`}
          />
        </Fragment>
      ))}
    </div>
    <div className="relative w-full h-full z-10">{children}</div>
  </div>
);

export default OnboardingLayout;
