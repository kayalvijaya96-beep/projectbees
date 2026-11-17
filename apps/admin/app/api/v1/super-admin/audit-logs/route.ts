import { NextRequest } from 'next/server';
import { successResponse } from '@/lib/api-response';

const AUDIT_LOGS = [
  {
    id: 'aud-001',
    actor_id: 'usr_super_admin_001',
    actor_email: 'superadmin@projectbee.in',
    action: 'admin.invite',
    resource_type: 'admin_accounts',
    resource_id: 'usr_admin_002',
    timestamp: '2026-11-10T04:45:00Z',
    safe_metadata: { role: 'Catalogue Manager', target_email: 'catalogue.lead@projectbee.in' },
  },
  {
    id: 'aud-002',
    actor_id: 'usr_admin_002',
    actor_email: 'catalogue.lead@projectbee.in',
    action: 'products.publish',
    resource_type: 'products',
    resource_id: 'f0000000-0000-0000-0000-000000000001',
    timestamp: '2026-11-10T04:00:00Z',
    safe_metadata: { sku: 'PB-SCI-HYD-01', selling_price: 499.0 },
  },
  {
    id: 'aud-003',
    actor_id: 'usr_admin_003',
    actor_email: 'fulfilment@projectbee.in',
    action: 'orders.record_cod',
    resource_type: 'orders',
    resource_id: 'PB-202611-00120',
    timestamp: '2026-11-09T11:15:00Z',
    safe_metadata: { amount_collected: 699.0, method: 'COD' },
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const actionFilter = searchParams.get('action');

  let filtered = AUDIT_LOGS;
  if (actionFilter) {
    filtered = filtered.filter((l) => l.action.includes(actionFilter));
  }

  return successResponse({
    audit_logs: filtered,
    total: filtered.length,
    is_immutable: true,
  });
}

