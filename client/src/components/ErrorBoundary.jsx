import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="flex items-center justify-center p-4 min-h-screen bg-gray-100 dark:bg-gray-900">
             <div className="text-center">
                <h1 className="text-2xl font-bold text-red-600 mb-2">Something went wrong.</h1>
                <p className="text-gray-600 dark:text-gray-400">Please refresh the page or try again later.</p>
             </div>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
