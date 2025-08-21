import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-24'>
      인덱스 페이지
      <Button variant='outline' className='ml-4'>
        Outline
      </Button>
    </main>
  );
}
