import { Textarea } from '@/components/ui/textarea';

export default function TextareaTestPage() {
  return (
    <div className='p-8 space-y-8 bg-[#1C1C22] min-h-screen'>
      <h1 className='text-2xl font-bold text-foreground'>TextArea Component Tests</h1>

      {/* 기본 상태 - 사이즈별 */}
      <section className='space-y-4'>
        <h2 className='text-lg font-semibold text-foreground'>기본 상태 - 사이즈별</h2>

        <div className='space-y-4'>
          <Textarea placeholder='리뷰를 작성해 주세요' size='lg' />
          <Textarea placeholder='리뷰를 작성해 주세요' size='md' />
          <Textarea placeholder='리뷰를 작성해 주세요' size='sm' />
        </div>
      </section>

      {/* 에러 상태 */}
      <section className='space-y-4'>
        <h2 className='text-lg font-semibold text-foreground'>에러 상태</h2>

        <div className='space-y-4'>
          <Textarea placeholder='에러 상태 테스트' variant='error' size='md' />
        </div>
      </section>

      {/* 문자 카운터 숨김 */}
      <section className='space-y-4'>
        <h2 className='text-lg font-semibold text-foreground'>문자 카운터 숨김</h2>

        <div className='space-y-4'>
          <Textarea placeholder='문자 카운터가 표시되지 않음' showCharCount={false} size='md' />
        </div>
      </section>
    </div>
  );
}
