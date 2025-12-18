import Image from 'next/image';

import { Button } from '@/components/retroui/button';
import { Card } from '@/components/retroui/card';

const Page = () => {
  return (
    <div>
      <Card className='w-[350px] shadow-none hover:shadow-none'>
        <Card.Content className='pb-0'>
          <img
            alt='Gameboy'
            className='h-full w-full'
            src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png'
          />
        </Card.Content>
        <Card.Header className='pb-0'>
          <Card.Title>Classic 8-bit Gameboy</Card.Title>
        </Card.Header>
        <Card.Content className='flex items-center justify-between'>
          <p className='text-lg font-semibold'>$29.90</p>
          <Button>Add to cart</Button>
        </Card.Content>
      </Card>
    </div>
  );
};

export default Page;
