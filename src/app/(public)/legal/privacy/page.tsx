export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-3xl">
            <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
            <div className="prose prose-slate">
                <p>Last updated: {new Date().toLocaleDateString()}</p>

                <h3>1. Information Collection</h3>
                <p>We collect information you provide directly to us, such as studio details, member data (names, emails), and attendance records for the purpose of providing our services.</p>

                <h3>2. Use of Information</h3>
                <p>We use the collected information to:
                    <ul>
                        <li>Provide and maintain the Service</li>
                        <li>Process payments</li>
                        <li>Send automated retention emails (on your behalf)</li>
                        <li>Analyze usage to improve our product</li>
                    </ul>
                </p>

                <h3>3. Data Security</h3>
                <p>We implement appropriate security measures to protect your personal information. Payment information is handled solely by Stripe.</p>

                <h3>4. Data Sharing</h3>
                <p>We do not sell your personal data. We may share data with third-party service providers (like Clerk for auth, Resend for email) only as necessary to provide the Service.</p>

                <h3>5. Contact Us</h3>
                <p>If you have questions about this Privacy Policy, please contact us at support@retainfit.com</p>
            </div>
        </div>
    )
}
