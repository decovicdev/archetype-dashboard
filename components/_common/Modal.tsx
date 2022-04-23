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
}) => (
  <div
    className={
      isOpen
        ? `fixed top-0 left-0 w-screen h-screen overflow-hidden flex justify-center items-center z-50 ${className}`
        : 'hidden'
    }
  >
    <div className="bg-white w-[600px] min-h-[400px] max-w-full rounded-lg shadow-lag z-10 p-4 text-black">
      {title && (
        <div className="font-bold text-xl flex justify-between">
          <span>{title}</span>
          {!alwaysVisible ? (
            <button type="button" onClick={onClose}>
              X
            </button>
          ) : null}
        </div>
      )}
      {children}
      {isBusy ? (
        <div>
          <div className="spinner" />
        </div>
      ) : null}
    </div>
    <div className="absolute w-full h-full left-0 top-0 bg-[#333] opacity-50" />
  </div>
);

export default Modal;
