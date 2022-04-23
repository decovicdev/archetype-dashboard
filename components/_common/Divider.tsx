type Props = {
  direction?: 'horizontal' | 'vertical';
  className?: string;
};

const styles = {
  horizontal: 'w-full h-px',
  vertical: 'h-full w-px'
};

const Divider: React.FC<Props> = ({ direction, className }) => (
  <div className={`bg-tblack-100 ${styles[direction]} ${className || ''}`} />
);

Divider.defaultProps = {
  direction: 'horizontal'
};

export default Divider;
