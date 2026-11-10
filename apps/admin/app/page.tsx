import Link from 'next/link';
import { ShoppingBag, AlertTriangle, MessageSquare, TrendingUp, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Badge } from '@projectbee/ui';

export default function AdminDashboardPage() {
  const stats = [
    { label: 'Active COD Orders', value: '14', icon: ShoppingBag, color: 'text-amber-500', badge: '5 need packing' },
    { label: 'Low Stock Warnings', value: '3', icon: AlertTriangle, color: 'text-red-500', badge: 'Action needed' },
    { label: 'Reviews Awaiting Moderation', value: '2', icon: MessageSquare, color: 'text-blue-500', badge: 'Verified buyers' },
    { label: 'Total COD Collected (MTD)', value: '₹42,850', icon: TrendingUp, color: 'text-emerald-500', badge: 'Bengaluru' },
  ];

  const recentOrders = [
    {
      id: 'PB-202611-00123',
      recipient: 'Aarav Sharma (Class 8)',
      guardian: 'Ananya Sharma',
      phone: '+91 9876543210',
      total: 499,
      status: 'pending_confirmation',
      pincode: '560038 (Indiranagar)',
      time: '12 mins ago',
    },
    {
      id: 'PB-202611-00122',
      recipient: 'Diya Patel (Class 10)',
      guardian: 'Rohan Patel',
      phone: '+91 9845012345',
      total: 1098,
      status: 'confirmed',
      pincode: '560001 (MG Road)',
      time: '1 hour ago',
    },
    {
      id: 'PB-202611-00121',
      recipient: 'Karan Rao (Class 6)',
      guardian: 'Sunita Rao',
      phone: '+91 9740112233',
      total: 799,
      status: 'packed',
      pincode: '560100 (Electronic City)',
      time: '3 hours ago',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Operational Dashboard
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Real-time summary of school project orders, inventory thresholds, and review moderation.
        </p>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <Card key={idx} className="p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{s.label}</span>
                <Icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div className="pt-3">
                <span className="text-2xl font-extrabold text-slate-900">{s.value}</span>
                <span className="block text-[11px] font-medium text-slate-400 mt-0.5">{s.badge}</span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Operational Queues */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Recent Active Orders */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h2 className="text-base font-bold text-slate-900">Orders Requiring Action</h2>
            <Link href="/orders" className="text-xs font-semibold text-amber-600 hover:underline">
              View all orders →
            </Link>
          </div>

          <div className="space-y-3">
            {recentOrders.map((ord) => (
              <div
                key={ord.id}
                className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-900">{ord.id}</span>
                    <Badge variant={ord.status === 'confirmed' ? 'success' : 'warning'}>
                      {ord.status.replace('_', ' ')}
                    </Badge>
                    <span className="text-slate-400">{ord.time}</span>
                  </div>
                  <p className="font-semibold text-slate-800">{ord.recipient}</p>
                  <p className="text-slate-500">Guardian: {ord.guardian} ({ord.phone}) • {ord.pincode}</p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between border-t sm:border-0 pt-2 sm:pt-0">
                  <span className="text-base font-extrabold text-slate-900">₹{ord.total}</span>
                  <Link
                    href={`/orders`}
                    className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800"
                  >
                    Fulfil Order
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Low Stock Warnings */}
        <div className="space-y-4">
          <div className="border-b border-slate-200 pb-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-red-500" /> Low Stock Alerts
            </h2>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-3 text-xs">
            <div className="space-y-2">
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <div>
                  <p className="font-bold text-slate-800">Human Heart 3D Model</p>
                  <p className="text-slate-400 font-mono text-[10px]">PB-BIO-HRT-03</p>
                </div>
                <span className="font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">3 left</span>
              </div>

              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <div>
                  <p className="font-bold text-slate-800">3D Motorized Solar System</p>
                  <p className="text-slate-400 font-mono text-[10px]">PB-AST-SOL-04</p>
                </div>
                <span className="font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">3 left</span>
              </div>
            </div>

            <Link
              href="/inventory"
              className="block text-center text-xs font-semibold text-amber-600 hover:underline pt-1"
            >
              Adjust Inventory Stock →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
