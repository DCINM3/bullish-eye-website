'use client';

import Link from 'next/link';
import {
  Landmark,
  AreaChart,
  Rocket,
  HeartHandshake,
  ShieldCheck,
  Home,
  Briefcase,
  Puzzle,
} from 'lucide-react';

type Service = {
  name: string;
  path: string;
  Icon: any;
  color: string;
};

const services: Service[] = [
  { name: 'Fixed Income', path: '/services/fixed-income', Icon: Landmark, color: 'text-cyan-300' },
  { name: 'Mutual Funds', path: '/services/mutual-funds', Icon: AreaChart, color: 'text-emerald-300' },
  { name: 'IPO Investing', path: '/services/ipo-investing', Icon: Rocket, color: 'text-amber-300' },
  { name: 'Life Insurance', path: '/services/life-insurance', Icon: HeartHandshake, color: 'text-rose-300' },
  { name: 'Insurance Policy', path: '/services/insurance-policy', Icon: ShieldCheck, color: 'text-sky-300' },
  { name: 'Retirement Plan', path: '/services/retirement-plan', Icon: Home, color: 'text-violet-300' },
  { name: 'Unlisted Shares', path: '/services/unlisted-shares', Icon: Briefcase, color: 'text-lime-300' },
  { name: 'Structure Product', path: '/services/structure-product', Icon: Puzzle, color: 'text-fuchsia-300' },
];

export default function ServicesTicker() {
  const extendedServices = [...services, ...services];

  return (
    <div className="bg-slate-900 group flex overflow-hidden text-white py-1">
      <div className="flex animate-marquee-continuous group-hover:paused">
          {extendedServices.map((service, index) => (
            <Link
              key={index}
              href={service.path}
              className="flex-shrink-0 flex items-center space-x-2 text-sm font-medium hover:text-white transition-colors mx-6"
            >
              <service.Icon className={`${service.color} w-4 h-4`} />
              <span className="text-slate-400 group-hover:text-white transition-colors">{service.name.toUpperCase()}</span>
            </Link>
          ))}
      </div>
    </div>
  );
}
