import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

type Options = {
  error?: string | null;
  success?: string | null;
  successTitle?: string;
  errorTitle?: string;
};

export default function useFormToast({
  error,
  success,
  successTitle = "Success",
  errorTitle = "Error",
}: Options) {
  const { toast } = useToast();
  const lastError = useRef<string | null>(null);
  const lastSuccess = useRef<string | null>(null);

  useEffect(() => {
    if (error && error !== lastError.current) {
      toast({
        variant: "destructive",
        title: errorTitle,
        description: error,
      });
      lastError.current = error;
    }
    if (!error) {
      lastError.current = null;
    }
  }, [error, errorTitle, toast]);

  useEffect(() => {
    if (success && success !== lastSuccess.current) {
      toast({
        title: successTitle,
        description: success,
      });
      lastSuccess.current = success;
    }
    if (!success) {
      lastSuccess.current = null;
    }
  }, [success, successTitle, toast]);
}
