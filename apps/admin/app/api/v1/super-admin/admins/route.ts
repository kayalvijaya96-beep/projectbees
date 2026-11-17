import { NextRequest } from 'next/server';
import { successResponse, errorResponse } from '@/lib/api-response';
import { InviteAdminSchema } from '@projectbee/shared-types';

const ADMIN_ACCOUNTS = [
  {
    id: 'usr_super_admin_001',
    email: 'superadmin@projectbee.in',
    full_name: 'Lead Super Admin',
    is_super_admin: true,
    status: 'active',
    roles: ['Super Administrator'],
    created_at: '2026-11-01T00:00:00Z',
  },
  {
    id: 'usr_admin_002',
    email: 'catalogue.lead@projectbee.in',
    full_name: 'Ramesh Verma',
    is_super_admin: false,
    status: 'active',
    roles: ['Catalogue Manager'],
    created_at: '2026-11-05T10:00:00Z',
  },
];

export async function GET() {
  return successResponse({
    admins: ADMIN_ACCOUNTS,
    total: ADMIN_ACCOUNTS.length,
    single_super_admin_verified: true,
  });
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.json();
    const validated = InviteAdminSchema.parse(rawBody);

    const newAdmin = {
      id: `adm_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      email: validated.email,
      full_name: validated.full_name,
      is_super_admin: false,
      status: 'active',
      role_id: validated.role_id,
      created_at: new Date().toISOString(),
    };

    return successResponse({
      admin: newAdmin,
      message: `Provisioning invitation sent to ${validated.email}.`,
    }, 201);
  } catch (err: any) {
    return errorResponse('VALIDATION_ERROR', err.message || 'Admin invitation failed', 400);
  }
}

