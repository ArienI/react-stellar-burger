import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { checkAndRefreshTokens } from '../../services/actions/authenticationActions';
import { LoadingIndicator } from '../../pages/LoadingIndicator';

interface ProtectedRouteProps {
  children: JSX.Element;
  redirectToHomeIfLoggedIn?: boolean;
}

// children: page - используем деструктуризацию чтобы обращаться к пропу не как children, а как page
function ProtectedRoute({ children: page, redirectToHomeIfLoggedIn = false }: ProtectedRouteProps): React.ReactElement {
  const dispatch = useDispatch();
  const location = useLocation();
  const from = location.state?.from || '/';
  const isLoggedIn = useSelector((state: any) => state.authentication.isLoggedIn);
  const [isCheckingTokens, setIsCheckingTokens] = useState(true);

  useEffect(() => {
    // @ts-ignore
    dispatch(checkAndRefreshTokens())
      .then(() => {
        setIsCheckingTokens(false);
      })
  }, [dispatch]);

  if (isCheckingTokens) {
    return (<LoadingIndicator />);
  }

  if (!isLoggedIn) {
    return redirectToHomeIfLoggedIn ? page : <Navigate to="/login" state={{ from: location }} replace />;
  } else if (redirectToHomeIfLoggedIn) {
    return <Navigate to={from} replace />;
  }

  return page;
};

export { ProtectedRoute };