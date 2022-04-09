import { useQuery } from 'react-query';
import { useHelpers } from 'context/HelperProvider';
import ApiService from 'services/api.service';

export const useApi = ({ onError }: { onError?: (err: any) => void } = {}) => {
  const { showAlert } = useHelpers();
  const { data, isLoading, isError } = useQuery('api', ApiService.getCurrent, {
    onError:
      onError ??
      ((err: any) => {
        showAlert(err?.message);
      })
  });
  return { data, isLoading, isError };
};
