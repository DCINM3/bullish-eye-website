import React from "react";




export default function DisclosurePage() {
    return (
        <main className="max-w-3xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-6 text-primary">Disclosure</h1>
            <p className="mb-6 text-base text-muted-foreground">
                The content provided on <span className="font-semibold">Bullish Eyes</span> (“we,” “us,” or “our”) is for informational and educational purposes only. We do not provide financial, investment, tax, or legal advice.
            </p>
            <ol className="space-y-6 list-decimal list-inside">
                <li>
                    <h2 className="font-semibold text-lg mb-1">No Professional Financial Advice</h2>
                    <p>
                        The financial information, market insights, news, analysis, and opinions shared on this platform are intended for general informational purposes only. They do not constitute personalized investment recommendations or professional financial advice. You should consult with a qualified financial advisor, tax professional, or legal expert before making any financial decisions.
                    </p>
                </li>
                <li>
                    <h2 className="font-semibold text-lg mb-1">Investment Risks</h2>
                    <p>
                        Investing and trading in financial markets involve risks, including potential loss of capital. Past performance is not indicative of future results. You should assess your risk tolerance and financial situation before making any investment decisions. We do not guarantee any specific financial outcomes.
                    </p>
                </li>
                <li>
                    <h2 className="font-semibold text-lg mb-1">Accuracy and Completeness</h2>
                    <p>
                        While we strive to ensure the accuracy of our information, we do not guarantee that the content is complete, reliable, or up to date. Financial markets are dynamic, and data may change rapidly. We are not responsible for any inaccuracies or omissions.
                    </p>
                </li>
                <li>
                    <h2 className="font-semibold text-lg mb-1">No Endorsement or Responsibility for Third-Party Content</h2>
                    <p>
                        Our website may feature third-party content, links, or advertisements. We do not endorse or take responsibility for the accuracy, reliability, or performance of any third-party content, products, or services. Users should conduct their own due diligence before engaging with third parties.
                    </p>
                </li>
                <li>
                    <h2 className="font-semibold text-lg mb-1">No Liability</h2>
                    <p>
                        We are not liable for any direct or indirect financial losses, damages, or consequences resulting from the use of our website, reliance on our content, or investment decisions made based on our information. Users assume full responsibility for their financial actions.
                    </p>
                </li>
                <li>
                    <h2 className="font-semibold text-lg mb-1">Forward-Looking Statements</h2>
                    <p>
                        Any forward-looking statements or projections regarding market trends, investment strategies, or economic conditions are speculative in nature and subject to change. We do not guarantee future financial performance or investment returns.
                    </p>
                </li>
                <li>
                    <h2 className="font-semibold text-lg mb-1">Changes to This Disclosure</h2>
                    <p>
                        We reserve the right to update or modify this disclosure at any time. Continued use of our website and services constitutes acceptance of any changes made.
                    </p>
                </li>
                <li>
                    <h2 className="font-semibold text-lg mb-1">Contact Information</h2>
                    <p>
                        If you have any questions regarding this disclosure, please contact us at:<br />
                        <span className="font-mono">Email: <a href="mailto:contact@bullisheyes.com" className="text-primary underline">contact@bullisheyes.com</a></span>
                    </p>
                </li>
            </ol>
        </main>
    );
}