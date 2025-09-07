import Image from 'next/image';

interface Props {
  imageUrl: string;
  productName: string;
}

export default function ProductImages({ imageUrl, productName }: Props) {
  return (
    <div className='flex justify-center items-start'>
      <div className='relative aspect-square w-full max-w-sm bg-[#1E1E26] rounded-lg overflow-hidden'>
        <Image
          src={imageUrl}
          alt={`${productName} 대표 이미지`}
          fill
          className='object-cover'
          priority
        />
      </div>
    </div>
  );
}
