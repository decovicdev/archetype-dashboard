import { useState, useCallback, ReactNode } from 'react';
import classnames from 'classnames';

type Props = {
  className?: string;
  title?: ReactNode;
};

const DropdownMenu: React.FC<Props> = ({ className, title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = useCallback(
    (e) => {
      e.stopPropagation();
      setIsOpen(!isOpen);
    },
    [isOpen]
  );

  return (
    <div
      className={classnames('dropdown', className, { opened: isOpen })}
      onClick={toggleDropdown}
    >
      <a className="dropdownBtn">{title}</a>
      <div className={classnames('dropdownContent')}>{children}</div>
    </div>
  );
};

export default DropdownMenu;
