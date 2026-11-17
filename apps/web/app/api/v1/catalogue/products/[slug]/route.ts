import { NextRequest } from 'next/server';
import { successResponse, errorResponse } from '@/lib/api-response';

const PRODUCT_DETAILS: Record<string, any> = {
  'hydraulic-lift-working-science-model': {
    id: 'f0000000-0000-0000-0000-000000000001',
    sku: 'PB-SCI-HYD-01',
    slug: 'hydraulic-lift-working-science-model',
    title: "Hydraulic Lift Working Science Model (Pascal's Law Demonstration)",
    short_description: 'Ready-to-demonstrate syringe-based hydraulic jack illustrating fluid pressure and mechanical advantage.',
    full_description: 'This working hydraulic lift model visually demonstrates Pascal\'s Law for CBSE and ICSE Physics curricula. Using dual fluid syringes, flexible tubing, and an acrylic scissor-lift mechanism, students can easily operate the lift by applying manual force to elevate a small toy vehicle or weight.',
    specifications: {
      materials: ['BPA-free medical grade syringes', 'Non-toxic food-color fluid', 'Clear acrylic scissor frame', 'Silicone tubing'],
      dimensions: '22 x 14 x 18 cm',
      weight_grams: 380,
      difficulty: 'Easy',
      assembly_required: false,
    },
    selling_price: 499.0,
    compare_at_price: 649.0,
    board: 'CBSE',
    class_number: 8,
    category_slug: 'working-science-models',
    in_stock: true,
    available_quantity: 25,
  },
  'windmill-electricity-generator-working-model': {
    id: 'f0000000-0000-0000-0000-000000000002',
    sku: 'PB-SCI-WND-02',
    slug: 'windmill-electricity-generator-working-model',
    title: 'Windmill Electricity Generator Working Model with LED Glow',
    short_description: 'Working wind energy converter model that turns kinetic blade rotation into electrical energy to illuminate an LED house.',
    full_description: 'Designed specifically for Class 7 to 10 science exhibitions, this working windmill generator converts wind energy into electrical power.',
    specifications: {
      materials: ['High-grade ABS propeller', 'Low-RPM DC generator motor', 'Wooden display base', 'High-luminance 5mm LED'],
      dimensions: '25 x 15 x 30 cm',
      weight_grams: 420,
      difficulty: 'Easy',
      assembly_required: false,
    },
    selling_price: 599.0,
    compare_at_price: 799.0,
    board: 'CBSE',
    class_number: 9,
    category_slug: 'working-science-models',
    in_stock: true,
    available_quantity: 18,
  },
};

export async function GET(
  _request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const product = PRODUCT_DETAILS[params.slug];

  if (!product) {
    return errorResponse('NOT_FOUND', `Product with slug '${params.slug}' not found.`, 404);
  }

  return successResponse({
    product,
  });
}

