'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useStays } from '@/hooks/useStays';
import StayCard from '@/components/features/StayCard';
import SearchModal from '@/components/features/SearchModal';

export default function Home() {
  const { data: stays, isLoading, error } = useStays();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-[30vh] md:h-[40vh]">
          <div className="absolute inset-0 bg-neutral-900">
            <Image 
              src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=2070"
              alt="Hero"
              fill
              priority
              className="object-cover opacity-70"
              sizes="100vw"
            />
          </div>

          <div className="relative h-full flex items-center justify-center text-center px-6">
            <div className="max-w-2xl text-white">
              <h1 className="text-3xl md:text-5xl font-bold mb-3 tracking-tight">
                staycation
              </h1>
              <p className="text-sm md:text-base mb-6 font-light">
                제주 애월읍 14-3
              </p>
            </div>
          </div>
        </section>

        {/* Search Bar - 클릭 시 모달 열기 */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-8">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-full max-w-2xl px-6 py-4 border-b-2 border-neutral-900 text-left text-base text-neutral-400 hover:text-neutral-600 transition bg-transparent"
            >
              어디로 떠나시겠어요?
            </button>
          </div>

          {/* 테마 카테고리 */}
          <div className="flex gap-4 overflow-x-auto pb-2">
            {['All', 'Ocean', 'Hanok', 'Modern', 'Forest', 'City'].map((theme) => (
              <button 
                key={theme}
                className="text-sm font-medium text-neutral-600 hover:text-neutral-900 uppercase tracking-widest whitespace-nowrap pb-2 border-b-2 border-transparent hover:border-neutral-900 transition"
              >
                {theme}
              </button>
            ))}
          </div>
        </section>

        {/* Featured Stays */}
        <section className="max-w-7xl mx-auto px-6 py-8">
          <h2 className="text-3xl font-bold mb-8 tracking-tight">Featured Stays</h2>
          
          {stays && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {stays.slice(0, 2).map((stay, index) => (
                <div key={stay.id} className="group cursor-pointer">
                  <div className="relative h-[350px] md:h-[400px] overflow-hidden mb-4">
                    <Image 
                      src={stay.images[0]} 
                      alt={stay.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={index === 0}
                    />
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs uppercase tracking-wider text-neutral-500">{stay.region}</span>
                    <h3 className="text-2xl font-bold tracking-tight group-hover:text-neutral-600 transition">
                      {stay.name}
                    </h3>
                    <p className="text-sm text-neutral-600 line-clamp-2">{stay.description}</p>
                    <div className="pt-2">
                      <span className="text-xl font-bold">₩{stay.price_per_night.toLocaleString()}</span>
                      <span className="text-neutral-500 text-sm ml-1">/ night</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* All Stays */}
        <section className="max-w-7xl mx-auto px-6 py-8 pb-20">
          <h2 className="text-3xl font-bold mb-8 tracking-tight">All Stays</h2>
          
          {stays && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stays.slice(2).map((stay) => (
                <StayCard key={stay.id} stay={stay} />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Search Modal */}
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  );
}
