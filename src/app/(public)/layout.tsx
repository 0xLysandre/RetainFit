import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <header className="border-b bg-white sticky top-0 z-50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="font-bold text-2xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                        RetainFit
                    </Link>
                    <nav className="flex items-center gap-4">
                        <Link href="/sign-in">
                            <Button variant="ghost">Sign In</Button>
                        </Link>
                        <Link href="/sign-up">
                            <Button>Get Started</Button>
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Content */}
            <main className="flex-1">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-slate-50 border-t py-12">
                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="font-bold text-lg mb-4">RetainFit</h3>
                        <p className="text-gray-600 max-w-sm">
                            The intelligent member retention platform for boutique fitness studios.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Product</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><Link href="/#features">Features</Link></li>
                            <li><Link href="/#pricing">Pricing</Link></li>
                            <li><Link href="/sign-in">Login</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><Link href="/legal/terms">Terms of Service</Link></li>
                            <li><Link href="/legal/privacy">Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="container mx-auto px-4 mt-12 pt-8 border-t text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} RetainFit. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
