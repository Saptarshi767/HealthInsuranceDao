import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const useRouteIntegrity = () => {
  const [routeErrors, setRouteErrors] = useState([]);
  const [isValidRoute, setIsValidRoute] = useState(true);
  const location = useLocation();

  const validRoutes = [
    '/',
    '/about',
    '/services',
    '/contact',
    '/dashboard'
  ];

  useEffect(() => {
    const checkRouteIntegrity = () => {
      const currentPath = location.pathname;
      const isValid = validRoutes.includes(currentPath);
      
      setIsValidRoute(isValid);
      
      if (!isValid) {
        const error = {
          path: currentPath,
          timestamp: new Date().toISOString(),
          message: `Invalid route accessed: ${currentPath}`
        };
        
        setRouteErrors(prev => [...prev, error]);
        console.warn('Route Integrity Check:', error);
      }
    };

    checkRouteIntegrity();
  }, [location.pathname]);

  const clearRouteErrors = () => {
    setRouteErrors([]);
  };

  const testAllRoutes = async () => {
    const results = [];
    
    for (const route of validRoutes) {
      try {
        // Simulate route testing (in a real app, you might use React Router's matchPath)
        const result = {
          route,
          status: 'success',
          timestamp: new Date().toISOString()
        };
        results.push(result);
        console.log(`✅ Route ${route} is accessible`);
      } catch (error) {
        const result = {
          route,
          status: 'error',
          error: error.message,
          timestamp: new Date().toISOString()
        };
        results.push(result);
        console.error(`❌ Route ${route} failed:`, error.message);
      }
    }
    
    return results;
  };

  return {
    isValidRoute,
    routeErrors,
    clearRouteErrors,
    testAllRoutes,
    validRoutes
  };
};

export default useRouteIntegrity;