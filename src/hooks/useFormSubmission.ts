import { NewsletterFormData } from '@/lib/validation/contact';
import { useState } from 'react';

interface ApiResponse {
    success: boolean;
    message: string;
    messageId?: string;
    errors?: unknown;
}

interface UseFormSubmissionReturn<T> {
    isLoading: boolean;
    isSuccess: boolean;
    error: string | null;
    submitForm: (data: T) => Promise<void>;
    reset: () => void;
}

// Hook for newsletter form submission
export function useNewsletterFormSubmission(): UseFormSubmissionReturn<NewsletterFormData> {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submitForm = async (data: NewsletterFormData) => {
        setIsLoading(true);
        setError(null);
        setIsSuccess(false);

        try {
            const response = await fetch('/api/newsletter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result: ApiResponse = await response.json();

            if (result.success) {
                setIsSuccess(true);
            } else {
                setError(result.message || 'Failed to subscribe to newsletter');
            }
        } catch (err) {
            console.error('Newsletter subscription error:', err);
            setError('Network error. Please check your connection and try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const reset = () => {
        setIsLoading(false);
        setIsSuccess(false);
        setError(null);
    };

    return {
        isLoading,
        isSuccess,
        error,
        submitForm,
        reset,
    };
}
