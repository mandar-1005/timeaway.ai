import { NextResponse } from 'next/server';
import { getIndiaHolidays } from '@/services/indiaHolidays';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const holidays = await getIndiaHolidays(2024);
    return NextResponse.json({ success: true, holidays });
  } catch (error) {
    console.error('Error testing India holidays:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch India holidays' },
      { status: 500 }
    );
  }
} 