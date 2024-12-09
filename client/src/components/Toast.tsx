import { useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';

const useToast = ({
  loading,
  error,
  loadingMessage = "Loading...", // Default message for loading state
  errorMessage = "An error occurred", // Default message for error state
}: {
  loading: boolean;
  error: any;
  loadingMessage?: string; // Optional custom message for loading
  errorMessage?: string; // Optional custom message for error
}) => {
  const loadingToastId = useRef<string | null>(null);

  useEffect(() => {
    // Handle loading state
    if (loading && !loadingToastId.current) {
      loadingToastId.current = toast.loading(loadingMessage);
    } else if (!loading && loadingToastId.current) {
      toast.dismiss(loadingToastId.current);
      loadingToastId.current = null;
    }

    // Handle error state
    if (error) {
      toast.error(errorMessage);
    }
  }, [loading, error, loadingMessage, errorMessage]);
};

export default useToast;