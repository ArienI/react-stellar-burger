import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// children: page - используем деструктуризацию чтобы обращаться к пропу не как children, а как page
function ProtectedRoute({ children: page, redirectToHomeIfLoggedIn = false }) {
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);

  if (!isLoggedIn) {
    return redirectToHomeIfLoggedIn ? page : <Navigate to="/login" replace />;
  } else if (redirectToHomeIfLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return page;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  redirectToHomeIfLoggedIn: PropTypes.bool
};

export { ProtectedRoute };