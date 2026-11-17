import { successResponse } from '@/lib/api-response';

const CATEGORIES = [
  { id: 'd0000000-0000-0000-0000-000000000001', name: 'Working Science Models', slug: 'working-science-models' },
  { id: 'd0000000-0000-0000-0000-000000000002', name: 'Still 3D Educational Models', slug: 'still-educational-models' },
  { id: 'd0000000-0000-0000-0000-000000000003', name: 'DIY Science Kits', slug: 'diy-science-kits' },
  { id: 'd0000000-0000-0000-0000-000000000004', name: 'Educational Charts & Posters', slug: 'educational-charts' },
  { id: 'd0000000-0000-0000-0000-000000000005', name: 'School Assignment & Craft Kits', slug: 'school-assignment-kits' },
];

export async function GET() {
  return successResponse({ categories: CATEGORIES });
}

