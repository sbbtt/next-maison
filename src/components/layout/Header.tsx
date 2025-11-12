'use client';

import Link from 'next/link';
import { useState } from 'react';
import SearchModal from '@/components/features/SearchModal';

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="border-b border-neutral-900 bg-white sticky top-0 z-40">
        <nav className="px-6 py-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link href="/" className="text-3xl font-bold text-neutral-900">
              Next Maison
            </Link>
            <div
              className="flex-1 flex justify-center cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              <form
                className="w-[340px] flex items-center border border-neutral-300 rounded-full shadow-sm px-4 py-2 bg-white"
                onSubmit={e => e.preventDefault()}
              >
                <input
                  type="text"
                  readOnly
                  placeholder="어디로 떠나시나요?"
                  className="flex-1 bg-transparent outline-none text-sm text-neutral-800 cursor-pointer"
                />
                <button type="submit" className="ml-2 text-neutral-800 hover:text-neutral-600 cursor-pointer">
                  <svg width={20} height={20} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </form>
            </div>
            <div className="flex items-center gap-8">
              <Link href="/" className="text-sm text-neutral-900 hover:text-neutral-600 transition">
                Find Stay
              </Link>
              <Link href="/journal" className="text-sm text-neutral-900 hover:text-neutral-600 transition">
                Promotion
              </Link>
              <button className="px-4 py-2 bg-neutral-900 text-white rounded-full text-sm font-medium hover:bg-neutral-800 transition">
                Sign in
              </button>
            </div>
          </div>
        </nav>
      </header>
      <SearchModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
