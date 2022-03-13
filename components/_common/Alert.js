import { useRef, useEffect, useCallback } from 'react';
import classnames from 'classnames';

let timeoutId;

const Component = (props) => {
  const _block = useRef(null);

  const hide = useCallback(() => {
    if (!_block.current) {
      return;
    }

    _block.current.className = `${props.className}`;
    _block.current.style.marginLeft = `-${Math.abs(
      _block.current.offsetWidth / 2
    )}px`;
  }, [props.className, _block]);

  const show = useCallback(
    (message, isSuccess) => {
      _block.current.className = classnames(props.className, 'visible', {
        isSuccess
      });
      _block.current.style.left = `0%`;
      _block.current.style.marginLeft = `-${Math.abs(
        _block.current.offsetWidth / 2
      )}px`;
      _block.current.style.left = `50%`;

      const words = message ? message.split(' ') : [];

      let timeout = props.timeout || words.length * 0.5 * 1000;
      if (timeout < props.minTimeout) {
        timeout = props.minTimeout;
      }

      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        if (_block.current) {
          delete _block.current.style.width;
        }

        hide();
      }, timeout);
    },
    [props.className, props.minTimeout, props.timeout, _block, hide]
  );

  useEffect(() => {
    const { message, isSuccess } = props.data || {};

    if (message) {
      show(message, isSuccess);
    } else {
      hide();
    }
  }, [props.data, show, hide]);

  return (
    <div ref={_block} className={props.className}>
      {props.data.message}
      <button type="button" className="close" onClick={hide} />
    </div>
  );
};

Component.defaultProps = {
  className: 'alert-msg',
  minTimeout: 2000
};

export default Component;
