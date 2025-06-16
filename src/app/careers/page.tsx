import React from "react";

export default function CareersPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
            <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full text-center">
                <img
                    src="https://cdn.pixabay.com/photo/2024/05/07/00/39/schedule-8744592_1280.png"
                    alt="Careers"
                    className="mx-auto mb-6 w-32 h-32"
                />
                <h1 className="text-3xl font-bold text-indigo-700 mb-2">Careers at Bullish Eyes</h1>
                <p className="text-gray-600 mb-6">
                    We appreciate your interest in joining our team!
                </p>
                <div className="bg-indigo-50 rounded-lg p-4 mb-4">
                    <span className="text-lg font-semibold text-indigo-600">
                        No active positions open
                    </span>
                    <p className="text-gray-500 mt-2">
                        Kindly wait for future opportunities. Please check back soon or follow us for updates.
                    </p>
                </div>
                <a
                    href="/"
                    className="inline-block mt-4 text-indigo-600 hover:underline transition"
                >
                    Back to Home
                </a>
            </div>
        </div>
    );
}