import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { ProjectBeeLogo } from '@projectbee/ui';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Boxes,
  MessageSquare,
  ShieldAlert,
  ExternalLink,
  Lock,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'ProjectBee — Operational Admin & Super Admin Console',
  description: 'Catalogue, inventory, order fulfilment, and governance workspace.',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { label: 'Dashboard', href: '/', icon: LayoutDashboard },
    { label: 'Products & Catalogue', href: '/products', icon: Package },
    { label: 'Orders & COD Fulfilment', href: '/orders', icon: ShoppingBag },
    { label: 'Inventory & Stock Movements', href: '/inventory', icon: Boxes },
    { label: 'Review Moderation', href: '/reviews', icon: MessageSquare },
    { label: 'Super Admin & RBAC', href: '/super-admin', icon: ShieldAlert },
  ];

  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-100 text-slate-900 flex flex-col antialiased">
        {/* Top Operational Bar */}
        <header className="h-14 bg-slate-900 text-white px-4 sm:px-6 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <ProjectBeeLogo size="sm" className="text-white" />
            <span className="text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded">
              Console
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a
              href="http://localhost:3000"
              target="_blank"
              rel="noreferrer"
              className="text-slate-300 hover:text-white flex items-center gap-1 font-medium"
            >
              <span>View Customer Storefront</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1 rounded-md text-slate-300 border border-slate-700">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Super Admin Session Active</span>
            </div>
          </div>
        </header>

        {/* Workspace Shell */}
        <div className="flex-1 flex flex-col md:flex-row">
          {/* Left Navigation Sidebar */}
          <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-4 space-y-6 shrink-0">
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 pb-1">
                Operations
              </p>
              <nav className="space-y-0.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 rounded-lg hover:bg-slate-100 hover:text-amber-600 transition-colors"
                    >
                      <Icon className="w-4 h-4 text-slate-500" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-200/60 text-[11px] text-amber-900 space-y-1">
              <p className="font-bold">Architectural Rule:</p>
              <p>Admins operate according to assigned permissions; no approval workflow is required. All actions are logged to immutable audit trail.</p>
            </div>
          </aside>

          {/* Main Work Area */}
          <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

