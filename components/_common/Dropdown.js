import { useState, useCallback } from 'react';
import classnames from 'classnames';

const Component = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <div
      className={classnames('dropdown', props.className, {
        opened: isOpen
      })}
      onClick={toggleDropdown}
    >
      <a className="dropdownBtn">{props.title}</a>
      <div className={classnames('dropdownContent')}>{props.children}</div>
    </div>
  );
};

export default Component;
