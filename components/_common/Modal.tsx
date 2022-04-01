import classnames from 'classnames';

type Props = {
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
  alwaysVisible?: boolean;
  title?: string;
  isBusy?: boolean;
};

const Modal: React.FC<Props> = ({
  isOpen,
  onClose,
  className,
  isBusy,
  title,
  alwaysVisible,
  children
}) =>
  console.log(isOpen) || (
    <div
      className={classnames('modal-layer', className, { visible: isOpen })}
      style={{
        backgroundColor: isOpen ? '#333' : 'white',
        overflowY: 'auto',
        height: isOpen ? '600px' : '0'
      }}
    >
      <div>
        {title && <div className="tit">{title}</div>}
        {children}
        {!alwaysVisible && <button type="button" onClick={onClose} />}
        {isBusy ? (
          <div>
            <div className="spinner" />
          </div>
        ) : null}
      </div>
    </div>
  );

export default Modal;
