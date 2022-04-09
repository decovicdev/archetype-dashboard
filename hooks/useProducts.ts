import { useQuery } from 'react-query';
import { useHelpers } from 'context/HelperProvider';
import TierService from 'services/tier.service';

export const useProducts = ({
  onError
}: { onError?: (err: any) => void } = {}) => {
  const { showAlert } = useHelpers();
  const { data, isLoading, isError } = useQuery(
    'products',
    TierService.getList,
    {
      onError:
        onError ??
        ((err: any) => {
          showAlert(err?.message);
        })
    }
  );

  return { data, isLoading, isError };
};
