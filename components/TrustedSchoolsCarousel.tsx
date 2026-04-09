"use client";

import { School } from 'lucide-react';

interface TrustedSchool {
  name: string;
  location: string;
}

interface TrustedSchoolsCarouselProps {
  lang?: string;
}

export const TrustedSchoolsCarousel = ({ lang = "en" }: TrustedSchoolsCarouselProps) => {
  const trustedSchools: TrustedSchool[] = lang === 'zh-HK'
    ? [
        { name: '國際學校', location: 'K–12 • 全球' },
        { name: '公立學校', location: '學區' },
        { name: '私立學校', location: 'K–12' },
        { name: '特許學校聯網', location: '多校區' },
        { name: '蒙特梭利課程', location: '幼兒' },
        { name: 'IB 課程體系', location: 'PYP • MYP • DP' },
        { name: '教師與團隊', location: '學科組' },
        { name: '學校領導', location: '行政 • 運營' },
      ]
    : [
        { name: 'International Schools', location: 'K–12 • Global' },
        { name: 'Public Schools', location: 'Districts' },
        { name: 'Private Schools', location: 'K–12' },
        { name: 'Charter Networks', location: 'Multi-campus' },
        { name: 'Montessori Programs', location: 'Early Years' },
        { name: 'IB Continuums', location: 'PYP • MYP • DP' },
        { name: 'Teachers & Teams', location: 'Departments' },
        { name: 'School Leaders', location: 'Admin & Ops' },
      ];

  // Duplicate schools array for seamless infinite scroll
  const duplicatedSchools = [...trustedSchools, ...trustedSchools];

  return (
    <section className="py-8">
      <div className="container mb-6">
        <p className="text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
          {lang === 'zh-HK' ? '專為全球學校打造' : 'Built for schools worldwide'}
        </p>
      </div>

      <div className="relative overflow-hidden">
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

        {/* Scrolling track */}
        <div className="flex gap-6 animate-scroll-x">
          {duplicatedSchools.map((school, index) => (
            <div
              key={`${school.name}-${index}`}
              className="flex-shrink-0 px-4 py-3 bg-gray-900 rounded-xl border border-gray-800 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#16a34a]/5 overflow-hidden flex-shrink-0 border border-gray-800">
                  <School className="h-6 w-6 text-[#16a34a]" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-white whitespace-nowrap">
                    {school.name}
                  </p>
                  <p className="text-xs text-gray-500 whitespace-nowrap">
                    {school.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedSchoolsCarousel;
