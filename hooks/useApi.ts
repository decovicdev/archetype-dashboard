import { useQuery } from 'react-query';
import { useHelpers } from 'context/HelperProvider';
import ApiService from 'services/api.service';
import { useAuth } from 'context/AuthProvider';

export const useApi = ({ onError }: { onError?: (err: any) => void } = {}) => {
  const { showAlert } = useHelpers();
  const { currentUser, isAuthLoading } = useAuth();
  const { data, isLoading, isError } = useQuery('api', ApiService.getCurrent, {
    onError:
      onError ??
      ((err: any) => {
        showAlert(err?.message);
      }),
    enabled:
      !!currentUser && !isAuthLoading && !!sessionStorage.getItem('appId')
  });
  return { data, isLoading, isError };
};
