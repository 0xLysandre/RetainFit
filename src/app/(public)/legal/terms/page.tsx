export default function TermsPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-3xl">
            <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
            <div className="prose prose-slate">
                <p>Last updated: {new Date().toLocaleDateString()}</p>

                <h3>1. Acceptance of Terms</h3>
                <p>By accessing and using RetainFit ("the Service"), you agree to be bound by these Terms of Service.</p>

                <h3>2. Description of Service</h3>
                <p>RetainFit provides fitness studio management and retention software. We reserve the right to modify or discontinue the service at any time.</p>

                <h3>3. User Accounts</h3>
                <p>You are responsible for maintaining the security of your account and password. The Service is for professional use by fitness studio owners and managers.</p>

                <h3>4. Payment and Subscription</h3>
                <p>Services are billed on a subscription basis. You agree to pay the fees associated with your chosen plan. Payments are processed securely via Stripe.</p>

                <h3>5. Cancellation</h3>
                <p>You may cancel your subscription at any time via the billing dashboard. Access will continue until the end of the billing period.</p>

                <h3>6. Limitation of Liability</h3>
                <p>RetainFit shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.</p>
            </div>
        </div>
    )
}
