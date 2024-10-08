import Top from '@/components/shared/Top';

import { useEffect } from 'react';
import { getCards } from '@remote/card';

function HomePage() {
  useEffect(() => {
    getCards().then((response) => {
      console.log('response', response);
    });
  }, []);
  return (
    <div>
      <Top
        title="혜택 좋은 카드"
        subTitle="회원님을 위해서 혜택 좋은 카드를 모아봤어요"
      ></Top>
    </div>
  );
}

export default HomePage;
