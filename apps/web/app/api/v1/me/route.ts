import { NextRequest } from 'next/server';
import { successResponse, errorResponse } from '@/lib/api-response';
import { UpdateProfileSchema } from '@projectbee/shared-types';

let MOCK_PROFILE: {
  id: string;
  display_name: string;
  gender: string | null;
  class_level: number | null;
  board: string;
  profile_completion: number;
  is_parent_guardian: boolean;
  updated_at: string;
} = {
  id: 'usr_sample_student_01',
  display_name: 'Aarav Sharma',
  gender: 'male',
  class_level: 8,
  board: 'CBSE',
  profile_completion: 80,
  is_parent_guardian: true,
  updated_at: new Date().toISOString(),
};

export async function GET() {
  return successResponse({
    profile: MOCK_PROFILE,
  });
}

export async function PATCH(request: NextRequest) {
  try {
    const rawBody = await request.json();
    const validated = UpdateProfileSchema.parse(rawBody);

    MOCK_PROFILE = {
      ...MOCK_PROFILE,
      ...validated,
      updated_at: new Date().toISOString(),
    };

    return successResponse({
      profile: MOCK_PROFILE,
      message: 'Profile updated successfully.',
    });
  } catch (err: any) {
    return errorResponse('VALIDATION_ERROR', err.message || 'Invalid profile update', 400);
  }
}

