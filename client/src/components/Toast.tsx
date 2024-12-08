import { useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';

// Accept a single `loadingState` object instead of separate loading arguments
const useToast = (loadingState: { loading: boolean; checkoutLoading: boolean; error: any }) => {
  const { loading, checkoutLoading, error } = loadingState;
  const loadingToastId = useRef<string | null>(null); // Keep track of the toast ID

  useEffect(() => {
    // For regular loading
    if (loading && !loadingToastId.current) {
      loadingToastId.current = toast.loading("Loading your cart...");
    } else if (!loading && loadingToastId.current) {
      toast.dismiss(loadingToastId.current);
      loadingToastId.current = null;
    }

    // For checkout loading
    if (checkoutLoading && !loadingToastId.current) {
      loadingToastId.current = toast.loading("Redirecting to checkout...");
    } else if (!checkoutLoading && loadingToastId.current) {
      toast.dismiss(loadingToastId.current);
      loadingToastId.current = null;
    }

    // Handle error
    if (error) {
      toast.error(`Error: ${error.message}`);
    }
  }, [loading, checkoutLoading, error]);
};

export default useToast;