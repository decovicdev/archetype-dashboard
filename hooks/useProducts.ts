import { useQuery } from 'react-query';
import { useHelpers } from 'context/HelperProvider';
import TierService from 'services/tier.service';

export const useProducts = ({
  onError,
  enabled = true
}: { onError?: (err: any) => void; enabled?: boolean } = {}) => {
  const { showAlert } = useHelpers();
  const { data, isLoading, isError } = useQuery(
    'products',
    TierService.getList,
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
