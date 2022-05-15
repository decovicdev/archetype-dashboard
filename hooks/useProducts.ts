import { useQuery } from 'react-query';
import { useHelpers } from 'context/HelperProvider';
import { useApi } from 'context/ApiProvider';

export const useProducts = ({
  onError,
  enabled = true
}: { onError?: (err: any) => void; enabled?: boolean } = {}) => {
  const { showAlert } = useHelpers();
  const { tier } = useApi();
  const { data, isLoading, isError } = useQuery(
    'products',
    () => tier.getList(),
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
