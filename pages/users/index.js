import { useContext, useState, useEffect } from "react";

import PrivateRoute from "../../components/_common/PrivateRoute";
import Spinner from "../../components/_common/Spinner";
import Users from "../../components/Users";

import CustomerService from "../../services/customer.service";

import { AuthContext } from "../../context/auth";

const Component = () => {
  const { authPending } = useContext(AuthContext);
  const [listLoading, setListLoading] = useState(false);
  const [customersList, setCustomersList] = useState([]);

  useEffect(() => {
    setListLoading(true);
    CustomerService.getList().then((data) => {
      setCustomersList([...data]);
      setListLoading(false);
    });
  }, []);

  if (authPending || listLoading) {
    return <Spinner />;
  }

  return (
    <PrivateRoute>
      <Users data={customersList} />
    </PrivateRoute>
  );
};

export default Component;
