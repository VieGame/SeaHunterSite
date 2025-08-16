import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen p-4 flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-h2 font-bold text-k-green-50 mb-4">404</h1>
                <p className="text-title text-k-white-300 mb-8">
                    Oops! The page you are looking for does not exist.
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-k-green-300 text-k-green-50 rounded-full font-semibold hover:bg-k-green-200 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Home
                </Link>
            </div>
        </div>
    );
}
