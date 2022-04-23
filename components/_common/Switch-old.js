import { useState, useCallback } from 'react';
import classnames from 'classnames';

const Component = (props) => {
  const [val, setVal] = useState(props.value);

  const changeSwitch = useCallback(() => {
    setVal(!val);

    if (props.onChange) {
      props.onChange(!val);
    }
  }, [props, val]);

  return (
    <div
      className={classnames('nice-switch', props.className, {
        leading: props.leadingOriented,
        checked: !!val
      })}
    >
      <input type="checkbox" defaultChecked={val} />
      <span onClick={changeSwitch}>
        <small />
      </span>
    </div>
  );
};

export default Component;
