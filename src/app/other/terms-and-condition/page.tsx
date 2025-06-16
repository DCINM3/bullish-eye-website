import React from "react";

// /src/app/other/terms-and-condition/page.tsx


export default function TermsAndConditionsPage() {
    return (
        <main className="max-w-3xl mx-auto px-4 py-12 text-gray-800">
            <h1 className="text-3xl font-bold mb-6 text-primary-600">
                Terms and Conditions
            </h1>
            <p className="mb-4">
                Welcome to <span className="font-semibold">Bullish Eyes</span> (“we,” “us,” or “our”). By accessing and using our website, services, or any financial information provided, you agree to the following Terms and Conditions. If you do not agree with these terms, please refrain from using our services.
            </p>

            <ol className="list-decimal pl-6 space-y-4">
                <li>
                    <span className="font-semibold">No Financial Advice</span>
                    <p>
                        All information provided on this website, including articles, market analyses, research, and other content, is for informational and educational purposes only. It should not be interpreted as financial, investment, legal, or tax advice. You should consult with a qualified financial advisor before making any financial decisions.
                    </p>
                </li>
                <li>
                    <span className="font-semibold">No Guarantees on Accuracy and Completeness</span>
                    <p>
                        We strive to provide accurate and up-to-date information; however, we do not guarantee the accuracy, reliability, or completeness of any content. Financial markets are subject to rapid changes, and past performance is not indicative of future results.
                    </p>
                </li>
                <li>
                    <span className="font-semibold">Investment Risks</span>
                    <p>
                        Trading and investing in financial markets carry inherent risks, including the risk of losing capital. We are not responsible for any financial losses incurred based on the information provided on our platform. You assume full responsibility for any financial decisions you make.
                    </p>
                </li>
                <li>
                    <span className="font-semibold">Third-Party Links and Content</span>
                    <p>
                        Our website may contain links to third-party websites, products, or services. We do not endorse, control, or take responsibility for the content or services provided by these third parties.
                    </p>
                </li>
                <li>
                    <span className="font-semibold">Intellectual Property</span>
                    <p>
                        All content, including text, graphics, logos, and other materials, is the property of Bullish Eyes and is protected under applicable copyright and trademark laws. Unauthorized reproduction or distribution is prohibited.
                    </p>
                </li>
                <li>
                    <span className="font-semibold">No Liability</span>
                    <p>
                        To the fullest extent permitted by law, we disclaim all liability for any damages, losses, or consequences arising from the use of our website or reliance on the information provided.
                    </p>
                </li>
                <li>
                    <span className="font-semibold">Changes to These Terms</span>
                    <p>
                        We reserve the right to modify or update these Terms and Conditions at any time. Continued use of our website after changes are posted constitutes acceptance of the revised terms.
                    </p>
                </li>
                <li>
                    <span className="font-semibold">Governing Law</span>
                    <p>
                        These Terms and Conditions are governed by the laws of Maharashtra state jurisdiction, and any disputes shall be resolved in the appropriate courts of Nagpur or nearby High Courts.
                    </p>
                </li>
                <li>
                    <span className="font-semibold">Contact Information</span>
                    <p>
                        If you have any questions about these Terms and Conditions, please contact us at:<br />
                        <span className="font-mono">Email: contact@bullisheyes.com</span>
                    </p>
                </li>
            </ol>
        </main>
    );
}