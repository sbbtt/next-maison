// src/components/features/SearchModal.tsx

'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const scrollYRef = useRef<number>(0);
  // 자연스러운 나타남/사라짐 트랜지션 상태
  const [show, setShow] = useState(false);
  // 닫기 애니메이션 진행 상태 관리
  const [closing, setClosing] = useState(false);

  // 닫기 처리(ESC, X버튼, 오버레이: 중복 방지)
  const initiateClose = useCallback(() => {
    if (closing) return;
    setClosing(true);
    setShow(false);
  }, [closing]);

  // 애니메이션 끝나면 스크롤/스타일 복구 후 종료
  const handleAnimationEnd = () => {
    if (closing) {
      window.scrollTo(0, scrollYRef.current);
      document.body.style.overflow = '';
      document.body.style.marginRight = '';
      setClosing(false);
      onClose();
    }
  };

  // ESC키 닫기
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') initiateClose();
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKey);
      return () => window.removeEventListener('keydown', handleKey);
    }
  }, [isOpen, initiateClose]);

  // 모달 등장 시 스크롤락, 밀림보정
  useEffect(() => {
    if (isOpen) {
      scrollYRef.current = window.scrollY || window.pageYOffset;
      window.scrollTo(0, scrollYRef.current);
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.marginRight = `${scrollBarWidth}px`;
      setShow(true);
      setClosing(false);
      if (modalRef.current) modalRef.current.focus();
    } else {
      document.body.style.overflow = '';
      document.body.style.marginRight = '';
    }
  }, [isOpen]);

  // 렌더 조건: show, closing(애니메이션 진행중)이거나 모달 오픈 중일 때만
  if (!isOpen && !show && !closing) return null;

  return (
    <>
      {/* 반투명+blur 백드롭 오버레이 */}
      <div
        className={`fixed inset-0 top-[72px] z-50 bg-white bg-opacity-60 backdrop-blur-md transition-opacity duration-300 ${
          show ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={initiateClose}
        aria-hidden="true"
      />
      <div
        className={`fixed left-1/2 top-[120px] z-50 flex justify-center transform -translate-x-1/2 transition-all duration-300 ${
          show ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        style={{ pointerEvents: show ? 'auto' : 'none' }}
        aria-modal="true"
        role="dialog"
        ref={modalRef}
        tabIndex={-1}
        onTransitionEnd={handleAnimationEnd}
      >
        <div
          className="bg-white rounded-2xl shadow-lg max-w-2xl w-full mx-4 outline-none"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-6 py-5 border-b">
            <h2 className="text-xl font-bold">어디로 떠날까요?</h2>
            <button
              onClick={initiateClose}
              className="text-2xl text-neutral-600 hover:text-neutral-900 cursor-pointer"
              aria-label="Close modal"
              style={{ cursor: 'pointer' }}
            >
              ×
            </button>
          </div>
          <div className="p-6 space-y-8">
            <div>
              <label className="text-sm font-medium mb-3 block">지역</label>
              <input
                type="text"
                placeholder="서울"
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-3 block">날짜</label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-3 block">인원</label>
              <input
                type="number"
                placeholder="1"
                min="1"
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-3 block">테마</label>
              <div className="grid grid-cols-3 gap-3">
                {['Ocean', 'Hanok', 'Modern', 'Forest', 'City', 'All'].map((theme) => (
                  <button
                    key={theme}
                    className="px-4 py-3 border border-neutral-300 rounded-lg hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition text-sm font-medium"
                  >
                    {theme}
                  </button>
                ))}
              </div>
            </div>
            <button className="w-full px-6 py-4 bg-neutral-900 text-white rounded-lg font-medium hover:bg-neutral-800 transition">
              검색
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
