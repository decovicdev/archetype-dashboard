import * as React from 'react';

import { createContext, useContext } from 'react';

import { ApiService, HttpService } from 'services';

const initialState = new ApiService(new HttpService());

const Context = createContext(initialState);

const { Provider } = Context;

const ApiProvider: React.FC = ({ children }) => (
  <Provider value={initialState}>{children}</Provider>
);

const useApi = () => useContext(Context);

export { ApiProvider, useApi };
