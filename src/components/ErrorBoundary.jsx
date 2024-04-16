import { useState } from 'react';
import PropTypes from 'prop-types';

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  try {
    return hasError ? <h2>Something went wrong.</h2> : children;
  } catch (error) {
    console.error('Error caught by ErrorBoundary:', error);
    setHasError(true);
    return <h2>Something went wrong.</h2>;
  }
};

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
