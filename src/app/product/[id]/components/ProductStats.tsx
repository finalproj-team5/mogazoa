import { Star, Heart, MessageSquare } from 'lucide-react';

const StatCard = ({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: number;
}) => (
  <div className='bg-[#2C2C3A] rounded-xl p-6 text-center transform transition-transform hover:-translate-y-1'>
    <p className='text-base text-gray-400 font-semibold'>{title}</p>
    <div className='flex items-center justify-center gap-2 mt-3'>
      {icon}
      <span className='text-2xl font-bold text-white'>{value}</span>
    </div>
  </div>
);

interface Props {
  stats: {
    rating: number;
    wishCount: number;
    reviewCount: number;
  };
}

export default function ProductStats({ stats }: Props) {
  return (
    <section className='mt-16'>
      <h2 className='text-xl font-bold text-white mb-6'>상품 통계</h2>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
        <StatCard
          icon={<Star size={20} className='text-yellow-400' />}
          title='별점 평균'
          value={stats.rating}
        />
        <StatCard
          icon={<Heart size={20} className='text-red-500' />}
          title='찜'
          value={stats.wishCount}
        />
        <StatCard
          icon={<MessageSquare size={20} className='text-blue-400' />}
          title='리뷰'
          value={stats.reviewCount}
        />
      </div>
    </section>
  );
}
