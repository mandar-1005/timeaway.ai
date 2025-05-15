import Holidays, { HolidaysTypes } from 'date-holidays';
import { CountryInfo } from '@/lib/storage/location';
import { getIndiaHolidays } from './indiaHolidays';

const lang = 'en';

const publicOptions: HolidaysTypes.Options = {
  languages: [lang],
  types: ['public'],
};

const allTypesOptions: HolidaysTypes.Options = {
  languages: [lang],
};

// const COUNTRIES_THAT_ARE_CAUSING_A_BUG = ['IR', 'CX', 'KE', 'RW', 'KM', 'DJ', 'SD', 'AW'];
// const COUNTRIES_THAT_ARE_CAUSING_A_BUG = [];

/**
 * Fetches public holidays for a specific country
 */
export const getPublicHolidaysByCountry = async (
  year = new Date().getUTCFullYear(),
  countryInfo: CountryInfo,
) => {
  // Special handling for India
  if (countryInfo.country === 'IN') {
    return getIndiaHolidays(year);
  }

  const hd = new Holidays(countryInfo, publicOptions);
  return hd.getHolidays(year, lang);
};

/**
 * Fetches all types of holidays for a specific country (for SEO pages)
 */
export const getAllHolidaysByCountry = async (
  year = new Date().getUTCFullYear(),
  countryInfo: CountryInfo,
) => {
  // Special handling for India
  if (countryInfo.country === 'IN') {
    return getIndiaHolidays(year);
  }

  const hd = new Holidays(countryInfo, allTypesOptions);
  return hd.getHolidays(year, lang);
};

/**
 * Get all available countries
 */
export const getAvailableCountries = () => {
  const hd = new Holidays(publicOptions);
  const countries = hd.getCountries(lang);
  if (!countries) return [];

  // Add India to the list of countries
  const countryList = Object.entries(countries).map(([countryCode, name]) => ({ countryCode, name }));
  countryList.push({ countryCode: 'IN', name: 'India' });
  
  // Sort countries alphabetically by name
  return countryList.sort((a, b) => a.name.localeCompare(b.name));
};

/**
 * Get states for a specific country
 */
export const getStates = (countryCode: string) => {
  // Special handling for India
  if (countryCode === 'IN') {
    return [
      { code: 'AN', name: 'Andaman and Nicobar Islands' },
      { code: 'AP', name: 'Andhra Pradesh' },
      { code: 'AR', name: 'Arunachal Pradesh' },
      { code: 'AS', name: 'Assam' },
      { code: 'BR', name: 'Bihar' },
      { code: 'CH', name: 'Chandigarh' },
      { code: 'CT', name: 'Chhattisgarh' },
      { code: 'DL', name: 'Delhi' },
      { code: 'GA', name: 'Goa' },
      { code: 'GJ', name: 'Gujarat' },
      { code: 'HP', name: 'Himachal Pradesh' },
      { code: 'HR', name: 'Haryana' },
      { code: 'JH', name: 'Jharkhand' },
      { code: 'KA', name: 'Karnataka' },
      { code: 'KL', name: 'Kerala' },
      { code: 'MP', name: 'Madhya Pradesh' },
      { code: 'MH', name: 'Maharashtra' },
      { code: 'MN', name: 'Manipur' },
      { code: 'ML', name: 'Meghalaya' },
      { code: 'MZ', name: 'Mizoram' },
      { code: 'NL', name: 'Nagaland' },
      { code: 'OR', name: 'Odisha' },
      { code: 'PB', name: 'Punjab' },
      { code: 'PY', name: 'Puducherry' },
      { code: 'RJ', name: 'Rajasthan' },
      { code: 'SK', name: 'Sikkim' },
      { code: 'TN', name: 'Tamil Nadu' },
      { code: 'TS', name: 'Telangana' },
      { code: 'TR', name: 'Tripura' },
      { code: 'UP', name: 'Uttar Pradesh' },
      { code: 'UT', name: 'Uttarakhand' },
      { code: 'WB', name: 'West Bengal' }
    ];
  }

  const hd = new Holidays(countryCode, publicOptions);
  const states = hd.getStates(countryCode, lang);
  if (!states) return [];

  return Object.entries(states).map(([code, name]) => ({ code, name }));
};

/**
 * Get regions for a specific country and state
 */
export const getRegions = (countryCode: string, stateCode: string) => {
  const hd = new Holidays(countryCode, stateCode, publicOptions);
  const regions = hd.getRegions(countryCode, stateCode, lang);
  if (!regions) return [];

  return Object.entries(regions).map(([code, name]) => ({ code, name }));
};
