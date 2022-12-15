import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Context } from '../..';

const RequireAuth = () => {
  const { store } = useContext(Context);
  console.log('store.isAuth', store.isAuth);

  return store.isAuth ? <Outlet /> : <Navigate to={'/login'} />;
};
export default RequireAuth;
