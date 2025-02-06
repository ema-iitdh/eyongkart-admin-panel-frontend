import React from 'react';
import { Button } from '@/components/ui/button';

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
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
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
              {process.env.NODE_ENV === 'development' && (
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

export default ErrorBoundary;
