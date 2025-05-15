import { CountryInfo } from '@/lib/storage/location';

const CALENDARIFIC_API_KEY = "hMH42UBD9ZO3AYSBkLNGKk7217cAZm1t";

interface CalendarificHoliday {
  name: string;
  description: string;
  date: {
    iso: string;
  };
  type: string[];
}

interface CalendarificResponse {
  response: {
    holidays: CalendarificHoliday[];
  };
}

/**
 * Fetches public holidays for India using Calendarific API
 */
export const getIndiaHolidays = async (year = new Date().getUTCFullYear()) => {
  if (!CALENDARIFIC_API_KEY) {
    console.error('Calendarific API key is not configured');
    return [];
  }

  try {
    const response = await fetch(
      `https://calendarific.com/api/v2/holidays?api_key=${CALENDARIFIC_API_KEY}&country=IN&year=${year}&type=national`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch India holidays');
    }

    const data: CalendarificResponse = await response.json();
    
    return data.response.holidays.map(holiday => ({
      name: holiday.name,
      date: new Date(holiday.date.iso),
      type: 'public',
      description: holiday.description
    }));
  } catch (error) {
    console.error('Error fetching India holidays:', error);
    return [];
  }
};

/**
 * Get India's country info
 */
export const getIndiaCountryInfo = (): CountryInfo => ({
  country: 'IN',
  state: '',
  region: ''
}); 