import { useState, useCallback } from 'react';
import classnames from 'classnames';

const DropdownMenu = ({ className, title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <div
      className={classnames('dropdown', className, {
        opened: isOpen
      })}
      onClick={toggleDropdown}
    >
      <a className="dropdownBtn">{title}</a>
      <div className={classnames('dropdownContent')}>{children}</div>
    </div>
  );
};

export default DropdownMenu;
