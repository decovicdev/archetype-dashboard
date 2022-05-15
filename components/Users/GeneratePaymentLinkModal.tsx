
import Button from 'components/_common/Button';
import Modal from 'components/_common/Modal';
import { useHelpers } from 'context/HelperProvider';


const GeneratePaymentLinkModal = ({ link, isOpen, onClose }) => {
  const { showAlert } = useHelpers();
  const handleCopy = () => {
    navigator.clipboard.writeText(link);

    showAlert('Copied to clipboard', true);
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Payment link" className='flex'>

      <div className='flex gap-2 items-center text-zinc-400 border-solid rounded-sm bg-gray-100 p-2 mt-2'>
        <p className='overflow-clip'>{link}</p>
        <Button onClick={handleCopy}>Copy</Button>
      </div>

    </Modal>
  );
};

export default GeneratePaymentLinkModal;
