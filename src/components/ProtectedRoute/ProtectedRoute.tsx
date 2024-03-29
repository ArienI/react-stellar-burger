import { Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { checkAndRefreshTokens } from '../../services/actions/authenticationActions';
import { LoadingIndicator } from '../../pages/LoadingIndicator';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

interface ProtectedRouteProps {
  children: JSX.Element;
  redirectToHomeIfLoggedIn?: boolean;
}

// children: page - используем деструктуризацию чтобы обращаться к пропу не как children, а как page
function ProtectedRoute({ children: page, redirectToHomeIfLoggedIn = false }: ProtectedRouteProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const from = location.state?.from || '/';
  const isLoggedIn = useAppSelector((state) => state.authentication.isLoggedIn);
  const isCheckingTokens = useAppSelector((state) => state.authentication.isCheckingTokens);

  useEffect(() => {
    dispatch(checkAndRefreshTokens())
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