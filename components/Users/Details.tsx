import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import DeleteUserModal from './DeleteUserModal';
import DropdownMenu from 'components/_common/DropdownMenu';
import Spinner from 'components/_common/Spinner';
import CustomerService from 'services/customer.service';
import { useHelpers } from 'context/HelperProvider';
import useDisclosure from 'hooks/useDisclosure';
import { ROUTES } from 'constant/routes';
import Title from 'components/_typography/Title';
import { TypographyVariant } from 'types/Typography';
import Button from 'components/_common/Button';
import { ButtonVariant } from 'types/Button';
import Divider from 'components/_common/Divider';
import ErrorText from 'components/_typography/ErrorText';
import { useProducts } from 'hooks/useProducts';
import { Tier } from 'types/Tiers';
import { useState } from 'react';
import GeneratePaymentLinkModal from './GeneratePaymentLinkModal';

const Component = () => {
  const router = useRouter();
  const { showAlert } = useHelpers();

  const [isGeneratePaymentModalOpen, setIsGeneratePaymentModalOpen] = useState(false);
  const [paymentLink, setPaymentLink] = useState('')

  const { data, isLoading, error, refetch } = useQuery(
    ['user', router.query.userId],
    () => CustomerService.getById(router.query.userId),
    { onError: (e: any) => showAlert(e.message) }
  );

  const { data: tiers = [] } = useProducts();

  const handleAssignSubscription = async (id: string) => {
    try {
      await CustomerService.assignSandboxSubscription({ custom_uid: router.query.userId, tier_id: id })

      showAlert('Success!', true);

      refetch();
    } catch (error) {
      console.error(error);
      showAlert('Something went wrong', false);
    }
  }

  const handleCreatePaymentLink = async (id: string) => {
    try {
      const result = await CustomerService.generatePaymentLink({ custom_uid: router.query.userId as string, tier_id: id });

      setPaymentLink((result as any).url);
      setIsGeneratePaymentModalOpen(true);
    } catch (error) {
      console.error(error);
      showAlert('Something went wrong', false);
    }
  }

  const handleSendInvoice = async (id: string) => {
    if (!data.email) {
      router.push(`${ROUTES.USERS.EDIT}/${data.custom_uid}`);
      showAlert('Provide customer email', false);
      return;
    }

    try {
      await CustomerService.generatePaymentLinkEmail({ custom_uid: router.query.userId as string, tier_id: id })

      showAlert('Success!', true);
    } catch (error) {
      console.error(error);
      showAlert('Something went wrong', false);
    }
  }

  const { isOpen, onClose, onOpen } = useDisclosure();

  if (error)
    return <ErrorText>Oops there was an error {error.message}</ErrorText>;

  if (isLoading) return <Spinner />

  return (
    <div className='users-details-page'>
      <div className="flex space-x-2 items-center">
        <Title
          variant={TypographyVariant.dark}
          level={3}
          className="!text-left mb-2"
        >
          Customer Profile
        </Title>
        <div className='flex flex-row gap-1'>
          <Button url={`${ROUTES.USERS.EDIT}/${data.custom_uid}`} className="w-full mb-2">
            Edit
          </Button>
          <Button variant={ButtonVariant.danger} onClick={onOpen} className="w-full mb-2">
            Delete
          </Button>
        </div>
      </div>
      <Divider className="my-4" />
      <div>
        <Title
          variant={TypographyVariant.dark}
          level={3}
          className="!text-left mb-2"
        >
          Customer details
        </Title>
        <table className="border-collapse table-auto w-full">
          <tbody>
            <tr>
              <td className='p-1'><p>App User ID</p></td>
              <td className='p-1'><p>{data.custom_uid}</p></td>
            </tr>
            <tr>
              <td className='p-1'>User apiKeys</td>
              <td className='p-1'>{data.apikeys?.join(',') || ''}</td>
            </tr>
            <tr>
              <td className='p-1'>Name</td>
              <td className='p-1'>{data.attrs?.name}</td>
            </tr>
            <tr>
              <td className='p-1'>Email</td>
              <td className='p-1'>{data.email}</td>
            </tr>
            <tr>
              <td className='p-1'>Status</td>
              <td className='p-1'>{data.status}</td>
            </tr>
            <tr>
              <td className='p-1'>Trial active</td>
              <td className='p-1'>{data.is_trial ? 'true' : 'false'}</td>
            </tr>
            <tr>
              <td className='p-1'>Tier</td>
              <td className='p-1 link'>{data.tier_id && <Link href={`/products/${data.tier_id}`}>{data.tier_id}</Link>}</td>
            </tr>
            <tr>
              <td className='p-1'>Last Seen</td>
              <td className='p-1'>{new Date(data.last_seen * 1000).toLocaleDateString()}</td>
            </tr>
          </tbody>
        </table>
      </div>


      <Divider className="my-4" />
      <Title
        variant={TypographyVariant.dark}
        level={3}
        className="!text-left mb-3"
      >
        Tiers
      </Title>
      <table className="border-collapse table-auto w-full text-sm">
        <thead>
          <tr className='border text-left'>
            <th className='p-1'>Name</th>
            <th className='p-1'>Price</th>
            <th className='p-1'>Length</th>
            <th className='p-1'>Quota</th>
            <th className='p-1'></th>
          </tr>
        </thead>
        <tbody>
          {(tiers as Tier[]).map(tier => (
            <tr key={tier.tier_id} className='border'>
              <td className='p-1'>{tier.name}</td>
              <td className='p-1'>{tier.price}</td>
              <td className='p-1'>{tier.trial_length}</td>
              <td className='p-1'>{tier.quota ? `${tier.quota}/day` : `Unlimited`}</td>
              <td className='p-1'>
                <DropdownMenu title={<Button variant={ButtonVariant.outlined}>...</Button>}>
                  <Button className='w-full mb-2' onClick={() => { handleAssignSubscription(tier.tier_id) }}>
                    Assign
                  </Button>
                  <Button className='w-full mb-2' onClick={() => { handleCreatePaymentLink(tier.tier_id) }}>
                    Payment link
                  </Button>
                  <Button className='w-full' onClick={() => { handleSendInvoice(tier.tier_id) }}>
                    Send invoice
                  </Button>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Divider className="my-4" />
      <Title
        variant={TypographyVariant.dark}
        level={3}
        className="!text-left mb-2"
      >
        Customer history
      </Title>
      <DeleteUserModal id="test" isOpen={isOpen} onClose={onClose} />
      <GeneratePaymentLinkModal
        link={paymentLink}
        isOpen={isGeneratePaymentModalOpen}
        onClose={() => { setIsGeneratePaymentModalOpen(!isGeneratePaymentModalOpen) }}
      />
    </div>
  )
};

export default Component;
