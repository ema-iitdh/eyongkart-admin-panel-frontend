import React from 'react';
import { Button } from '@/components/ui/button';
import { useLogout } from '@/features/auth/hooks/useAuth';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to error reporting service
    console.error('Error caught by boundary:', error, errorInfo);

    // Check for 401 status in axios error response
    if (error?.response?.status === 401 || error?.status === 401) {
      // Handle unauthorized by calling the logout function
      this.props.onUnauthorized();
      return;
    }

    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (
      this.state.error?.response?.status === 401 ||
      this.state.error?.status === 401
    ) {
      return (
        <div className='min-h-screen flex flex-col items-center justify-center p-4'>
          <div className='max-w-md w-full space-y-8 text-center'>
            <h1 className='text-4xl font-bold text-gray-900'>
              Session Expired
            </h1>
            <p className='text-gray-600'>
              Your login session may have expired or you are unauthorized.
              Please login again.
            </p>
            <Button onClick={() => window.location.reload()} className='w-full'>
              Refresh Page
            </Button>
          </div>
        </div>
      );
    }
    if (this.state.hasError) {
      return (
        <div className='min-h-screen flex flex-col items-center justify-center p-4'>
          <div className='max-w-md w-full space-y-8 text-center'>
            <h1 className='text-4xl font-bold text-gray-900'>
              Oops! Something went wrong
            </h1>
            <p className='text-gray-600'>
              We're sorry for the inconvenience. Please try refreshing the page
              or contact support if the problem persists.
            </p>
            <div className='space-y-4'>
              <Button
                onClick={() => window.location.reload()}
                className='w-full'
              >
                Refresh Page
              </Button>
              {import.meta.env.mode === 'development' && (
                <div className='mt-4 p-4 bg-red-50 rounded-lg'>
                  <p className='text-red-800 font-mono text-sm whitespace-pre-wrap'>
                    {this.state.error?.toString()}
                  </p>
                  <p className='text-red-700 font-mono text-sm mt-2 whitespace-pre-wrap'>
                    {this.state.errorInfo?.componentStack}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const ErrorBoundaryWrapper = (props) => {
  const { mutate: logout } = useLogout();

  return <ErrorBoundary {...props} onUnauthorized={logout} />;
};

export default ErrorBoundaryWrapper;
