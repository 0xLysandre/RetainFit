import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, BarChart3, Users, Mail } from "lucide-react";

export default function LandingPage() {
    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="py-20 md:py-32 bg-gradient-to-b from-white to-green-50">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                        Stop Churn Before <br />
                        <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"> It Happens.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto">
                        The intelligent retention platform for boutique fitness studios. Automate your member engagement and keep your classes full.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/sign-up">
                            <Button size="lg" className="h-12 px-8 text-lg">Start Free Trial</Button>
                        </Link>
                        <Link href="/#features">
                            <Button size="lg" variant="outline" className="h-12 px-8 text-lg">See How It Works</Button>
                        </Link>
                    </div>
                    <p className="mt-4 text-sm text-gray-500">No credit card required • 14-day free trial</p>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Everything you need to grow</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Don't let members slip through the cracks. RetainFit gives you the tools to identify and save at-risk customers.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-8 bg-white border rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                                <BarChart3 className="w-6 h-6 text-red-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Risk Analysis</h3>
                            <p className="text-gray-600">Our algorithm analyzes attendance patterns to identify members who are drifting away before they cancel.</p>
                        </div>

                        <div className="p-8 bg-white border rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                                <Mail className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Automated Win-back</h3>
                            <p className="text-gray-600">Automatically send personalized emails to at-risk members to get them back in the studio.</p>
                        </div>

                        <div className="p-8 bg-white border rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                                <Users className="w-6 h-6 text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Member Management</h3>
                            <p className="text-gray-600">A clean, simple dashboard to manage all your members, classes, and subscriptions in one place.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-20 bg-gray-900 text-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Simple, transparent pricing</h2>
                        <p className="text-gray-400">Start simply and scale as you grow.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Free Plan */}
                        <div className="p-8 bg-gray-800 rounded-2xl border border-gray-700">
                            <h3 className="text-2xl font-bold mb-2">Starter</h3>
                            <div className="text-4xl font-bold mb-6">$0 <span className="text-base font-normal text-gray-400">/mo</span></div>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center gap-3"><Check className="text-green-400" /> Up to 50 members</li>
                                <li className="flex items-center gap-3"><Check className="text-green-400" /> Basic Reporting</li>
                                <li className="flex items-center gap-3"><Check className="text-green-400" /> Email Support</li>
                            </ul>
                            <Link href="/sign-up">
                                <Button variant="outline" className="w-full text-black bg-white hover:bg-gray-100 border-0 h-12">Gets Started Free</Button>
                            </Link>
                        </div>

                        {/* Pro Plan */}
                        <div className="p-8 bg-gradient-to-br from-blue-900 to-slate-900 rounded-2xl border border-blue-500 relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-blue-500 text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
                            <h3 className="text-2xl font-bold mb-2">Pro Studio</h3>
                            <div className="text-4xl font-bold mb-6">$29 <span className="text-base font-normal text-gray-400">/mo</span></div>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center gap-3"><Check className="text-blue-400" /> Unlimited Members</li>
                                <li className="flex items-center gap-3"><Check className="text-blue-400" /> Advanced AI Risk Scoring</li>
                                <li className="flex items-center gap-3"><Check className="text-blue-400" /> Automated Email Campaigns</li>
                                <li className="flex items-center gap-3"><Check className="text-blue-400" /> Priority Support</li>
                            </ul>
                            <Link href="/sign-up">
                                <Button className="w-full bg-blue-600 hover:bg-blue-700 h-12">Start 14-Day Trial</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-6">Ready to retain more members?</h2>
                    <Link href="/sign-up">
                        <Button size="lg" className="h-12 px-12 text-lg">Join RetainFit Now</Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
