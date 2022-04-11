import { useQuery } from 'react-query';
import { useHelpers } from 'context/HelperProvider';
import CustomerService from 'services/customer.service';

export const useUsers = ({
  onError,
  enabled = true
}: { onError?: (err: any) => void; enabled?: boolean } = {}) => {
  const { showAlert } = useHelpers();
  const { data, isLoading, isError } = useQuery(
    'users',
    CustomerService.getList,
    {
      onError:
        onError ??
        ((err: any) => {
          showAlert(err?.message);
        }),
      enabled
    }
  );

  return { data, isLoading, isError };
};
