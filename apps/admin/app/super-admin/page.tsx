'use client';

import React, { useState } from 'react';
import { Button, Input, Badge } from '@projectbee/ui';
import { ShieldAlert, UserPlus, Lock, Key, FileText, CheckCircle2, AlertOctagon } from 'lucide-react';

export default function SuperAdminConsolePage() {
  const [admins, setAdmins] = useState([
    {
      id: 'adm-0',
      email: 'superadmin@projectbee.in',
      name: 'Lead Super Admin',
      is_super: true,
      status: 'active',
      roles: ['Super Administrator'],
    },
    {
      id: 'adm-1',
      email: 'catalogue.lead@projectbee.in',
      name: 'Ramesh Verma',
      is_super: false,
      status: 'active',
      roles: ['Catalogue Manager'],
    },
    {
      id: 'adm-2',
      email: 'fulfilment@projectbee.in',
      name: 'Sunil Gowda',
      is_super: false,
      status: 'active',
      roles: ['Order Fulfilment Executive'],
    },
  ]);

  const [auditLogs] = useState([
    {
      id: 'aud-101',
      actor: 'superadmin@projectbee.in',
      action: 'admin.create',
      resource: 'admin_accounts / fulfilment@projectbee.in',
      timestamp: 'Today 10:14 AM',
      metadata: '{"role": "Order Fulfilment Executive"}',
    },
    {
      id: 'aud-102',
      actor: 'catalogue.lead@projectbee.in',
      action: 'products.publish',
      resource: 'products / PB-SCI-HYD-01',
      timestamp: 'Today 09:30 AM',
      metadata: '{"status": "published", "selling_price": 499}',
    },
    {
      id: 'aud-103',
      actor: 'fulfilment@projectbee.in',
      action: 'orders.record_cod',
      resource: 'orders / PB-202611-00120',
      timestamp: 'Yesterday 04:45 PM',
      metadata: '{"amount_collected": 699, "currency": "INR"}',
    },
  ]);

  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteName, setInviteName] = useState('');
  const [selectedRole, setSelectedRole] = useState('Catalogue Manager');

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail || !inviteName) return;

    setAdmins((prev) => [
      ...prev,
      {
        id: `adm-${Date.now()}`,
        email: inviteEmail,
        name: inviteName,
        is_super: false,
        status: 'active',
        roles: [selectedRole],
      },
    ]);

    setInviteEmail('');
    setInviteName('');
  };

  const toggleAdminStatus = (id: string) => {
    setAdmins((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          if (a.is_super) {
            alert('Security Invariant: The single Super Admin account cannot be deactivated.');
            return a;
          }
          return {
            ...a,
            status: a.status === 'active' ? 'suspended' : 'active',
          };
        }
        return a;
      })
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-100 px-2.5 py-1 rounded-md border border-amber-300 mb-2">
          <Lock className="w-3.5 h-3.5 text-amber-700" />
          <span>Super Admin Governance — Model A Single Super Admin Active</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <ShieldAlert className="w-6 h-6 text-amber-500" /> Super Admin Console
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Admin account provisioning, role-based access control, and immutable audit log exploration.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Admin Provisioning & Account Management */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h2 className="text-base font-bold text-slate-900">Provisioned Admin Accounts</h2>
            <span className="text-xs text-slate-500">
              Admins execute permitted tasks without routine approval
            </span>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-2xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Admin Name &amp; Email</th>
                  <th className="py-3 px-4">Assigned Role</th>
                  <th className="py-3 px-4">Account Status</th>
                  <th className="py-3 px-4 text-right">Access Controls</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {admins.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50/60">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{a.name}</span>
                        {a.is_super && (
                          <span className="text-[10px] font-extrabold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded border border-amber-300">
                            Single Super Admin
                          </span>
                        )}
                      </div>
                      <p className="font-mono text-slate-500 text-[11px]">{a.email}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-slate-700 font-medium">{a.roles.join(', ')}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge variant={a.status === 'active' ? 'success' : 'danger'}>
                        {a.status}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {!a.is_super ? (
                        <button
                          type="button"
                          onClick={() => toggleAdminStatus(a.id)}
                          className={`px-2.5 py-1 text-[11px] font-semibold rounded ${
                            a.status === 'active'
                              ? 'bg-red-50 text-red-700 hover:bg-red-100'
                              : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                          }`}
                        >
                          {a.status === 'active' ? 'Suspend' : 'Activate'}
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-400 font-medium">Protected Invariant</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Invite Admin Form */}
          <form onSubmit={handleInvite} className="p-5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-4 text-xs">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <UserPlus className="w-4 h-4 text-amber-500" /> Provision / Invite Operational Admin
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Input
                label="Full Name"
                placeholder="Staff full name"
                value={inviteName}
                onChange={(e) => setInviteName(e.target.value)}
                required
              />
              <Input
                label="Official Email"
                type="email"
                placeholder="staff@projectbee.in"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                required
              />
              <div className="space-y-1.5 text-left">
                <label className="block text-sm font-medium text-slate-700">Role</label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-base text-slate-900 focus:border-amber-500 focus:outline-none"
                >
                  <option value="Catalogue Manager">Catalogue Manager</option>
                  <option value="Order Fulfilment Executive">Order Fulfilment Executive</option>
                  <option value="Customer Support Representative">Customer Support Representative</option>
                </select>
              </div>
            </div>
            <Button type="submit" size="sm" className="font-bold">
              Send Provisioning Invitation
            </Button>
          </form>
        </div>

        {/* Right Col: Immutable Audit Trail Viewer */}
        <div className="space-y-4">
          <div className="border-b border-slate-200 pb-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-amber-500" /> Immutable Audit Logs
            </h2>
            <p className="text-[11px] text-slate-500">Append-only operational history</p>
          </div>

          <div className="space-y-2.5">
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-1.5 text-xs"
              >
                <div className="flex justify-between items-center">
                  <span className="font-mono font-bold text-slate-900 text-[11px]">{log.action}</span>
                  <span className="text-[10px] text-slate-400">{log.timestamp}</span>
                </div>
                <p className="font-mono text-slate-600 text-[11px]">{log.resource}</p>
                <p className="text-[11px] text-slate-500">By: {log.actor}</p>
                <div className="p-2 rounded bg-slate-50 text-[10px] font-mono text-slate-700 break-all">
                  {log.metadata}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
