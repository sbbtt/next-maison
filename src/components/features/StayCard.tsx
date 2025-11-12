import Image from 'next/image';
import { Stay } from '@/types';

interface StayCardProps {
  stay: Stay;
}

export default function StayCard({ stay }: StayCardProps) {
  return (
    <article className="group cursor-pointer">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden mb-4 bg-neutral-100">
        <Image 
          src={stay.images[0]} 
          alt={stay.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-neutral-900 group-hover:text-neutral-600 transition">
          {stay.name}
        </h2>
        
        <p className="text-sm text-neutral-600 line-clamp-2">
          {stay.description}
        </p>

        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-neutral-500 uppercase tracking-wide">
            {stay.region}
          </span>
          <span className="text-base font-bold text-neutral-900">
            ₩{stay.price_per_night.toLocaleString()}
          </span>
        </div>
      </div>
    </article>
  );
}
