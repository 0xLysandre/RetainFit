import { UserButton } from "@clerk/nextjs";
import { LayoutDashboard, Users, Calendar, CreditCard, Settings, Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const navItems = [
        { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { href: "/dashboard/members", label: "Members", icon: Users },
        { href: "/dashboard/classes", label: "Classes", icon: Calendar },
        { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
        { href: "/dashboard/settings", label: "Settings", icon: Settings },
    ];

    const SidebarContent = () => (
        <div className="flex flex-col h-full bg-slate-900 text-white w-64">
            <div className="p-6">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                    RetainFit
                </h1>
            </div>
            <nav className="flex-1 px-4 space-y-2">
                {navItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-gray-300 hover:text-white hover:bg-slate-800"
                        >
                            <item.icon className="mr-2 h-4 w-4" />
                            {item.label}
                        </Button>
                    </Link>
                ))}
            </nav>
            <div className="p-4 border-t border-slate-800">
                <div className="flex items-center gap-3">
                    <UserButton />
                    <span className="text-sm font-medium">My Account</span>
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Desktop Sidebar */}
            <aside className="hidden md:block">
                <SidebarContent />
            </aside>

            {/* Mobile Sidebar */}
            <div className="md:hidden absolute top-4 left-4 z-50">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 bg-slate-900 border-r-slate-800 w-64 text-white">
                        <SidebarContent />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-4 md:p-8">
                {children}
            </main>
        </div>
    );
}
