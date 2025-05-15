import { PROJECT_NAME } from '@/constants';
import Link from 'next/link';

interface LogoProps {
  hideTaglineOnMobile?: boolean;
}

export const Logo = ({ hideTaglineOnMobile = false }: LogoProps) =>
  <Link href="/" tabIndex={0} aria-label="Timeaway.ai Home">
    <div className="flex items-center space-x-2">
      <img src="/timeawayai.png" alt="Timeaway.ai Logo" className="h-8 w-8 rounded shadow-sm" />
      <div>
        <h2
          className="text-base font-semibold text-gray-900 dark:text-white">
          {PROJECT_NAME}
        </h2>
        <p className={`text-xs text-gray-500 dark:text-gray-400 ${hideTaglineOnMobile ? 'hidden sm:block' : ''}`}>
          Maximize your time off in {new Date().getUTCFullYear()}
        </p>
      </div>
    </div>
  </Link>;