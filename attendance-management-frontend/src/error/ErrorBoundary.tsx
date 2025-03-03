// react ErrorBoundary only catches errors during rendering, not in async code
import React, { Component, ReactNode } from "react";
import ErrorPage from "./ErrorPage";
interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
  error: Error | null;
}
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }
  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }
  resetError = () => {
    this.setState({ hasError: false, error: null });
  };
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    //You can log the error to an error reporting service here
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <ErrorPage error={this.state.error} resetError={this.resetError} />
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
