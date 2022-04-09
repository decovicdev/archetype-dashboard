import { useQuery } from 'react-query';
import { useHelpers } from 'context/HelperProvider';
import EndpointService from 'services/endpoint.service';

export const useEndpoints = ({
  onError
}: { onError?: (err: any) => void } = {}) => {
  const { showAlert } = useHelpers();
  const { data, isLoading, isError } = useQuery(
    'endpoints',
    EndpointService.getList,
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
