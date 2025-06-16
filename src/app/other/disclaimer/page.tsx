import React from 'react';


export default function DisclaimerPage() {
    return (
        <div className="max-w-2xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-6 text-primary">Disclaimer</h1>
            <div className="bg-white rounded-lg shadow p-6 text-gray-800 space-y-4">
                <p>
                    The information provided by <span className="font-semibold">Bullish Eyes</span> is for informational and educational purposes only and should not be considered as financial, investment, or legal advice. All investments carry risks, and past performance is not indicative of future results. Before making any financial decisions, we recommend consulting with a qualified financial advisor, tax professional, or legal expert. Bullish Eyes does not guarantee the accuracy, completeness, or reliability of any information provided. We are not responsible for any losses incurred as a result of using our services or relying on our content.
                </p>
                <p>
                    Trading and investing involve substantial risk, including the risk of loss. Do not invest money you cannot afford to lose. Any opinions, news, research, analyses, prices, or other information provided by Bullish Eyes are provided as general market commentary and do not constitute investment advice.
                </p>
                <p>
                    By using our services, you acknowledge and agree to these terms.
                </p>
            </div>
        </div>
    );
}