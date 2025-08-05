'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { newsletterFormSchema, NewsletterFormData } from '@/lib/validation/contact';
import { useNewsletterFormSubmission } from '@/hooks/useFormSubmission';
import { useEffect } from 'react';
import CheckIcon from './icon/CheckIcon';

export default function NewsletterForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<NewsletterFormData>({
        resolver: zodResolver(newsletterFormSchema),
        mode: 'onBlur'
    });

    const { isLoading, isSuccess, error, submitForm, reset: resetSubmission } = useNewsletterFormSubmission();

    const onSubmit = async (data: NewsletterFormData) => {
        await submitForm(data);
    };

    // Reset form after successful submission
    useEffect(() => {
        if (isSuccess) {
            reset();
            // Auto-reset success state after 3 seconds
            const timer = setTimeout(() => {
                resetSubmission();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isSuccess, reset, resetSubmission]);

    return (
        <div className="space-y-1 w-full lg:w-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="contents">
                    <div className="flex items-center gap-[11px] w-full">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Enter your email"
                                {...register('email')}
                                disabled={isLoading || isSubmitting || isSuccess}
                                className={`w-full bg-transparent border rounded-full px-[18px] py-2 text-caption font-medium text-white placeholder:text-white/50 min-w-auto lg:min-w-[262px] transition-colors ${errors.email
                                    ? 'border-red-400'
                                    : isSuccess
                                        ? 'border-green-400'
                                        : 'border-white'
                                    } ${isLoading || isSubmitting || isSuccess
                                        ? 'opacity-60 cursor-not-allowed'
                                        : ''
                                    }`}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading || isSubmitting || isSuccess}
                            className={`px-4 py-2 rounded-full text-body font-bold transition-colors min-w-[100px] ${isLoading || isSubmitting || isSuccess
                                ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                                : 'bg-white text-black hover:bg-k-green-300'
                                }`}
                        >
                            {isLoading || isSubmitting ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            fill="none"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                </span>
                            ) : isSuccess ? (
                                <>
                                    <CheckIcon className="inline-block w-4 h-4 mr-1 text-green-400" />
                                    Done
                                </>
                            ) : (
                                'Subscribe'
                            )}
                        </button>
                    </div>
                </fieldset>
            </form>

            {/* Status Messages */}
            {errors.email && (
                <p className="text-red-400 text-body">{errors.email.message}</p>
            )}

            {isSuccess && (
                <p className="text-green-400 text-body flex items-center gap-1">
                    <CheckIcon className="inline-block w-3 h-3" /> Successfully subscribed to our newsletter!
                </p>
            )}

            {error && (
                <p className="text-red-400 text-body">
                    {error}
                </p>
            )}
        </div>
    );
}
