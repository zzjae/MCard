import { useCallback, useState, MouseEvent } from 'react';

import Agreement from '@/components/shared/Agreement';

import { 약관목록 } from '@constants/apply';
import FixedBottomButton from '@/components/shared/FixedBottonButton';
import { ApplyValues } from '@/models/apply';
function Terms({ onNext }: { onNext: (terms: ApplyValues['terms']) => void }) {
  const [termsAgreement, setTermsAgreement] = useState(() => {
    return 약관목록.reduce<Record<string, boolean>>(
      (prev, term) => ({
        ...prev,
        [term.id]: false,
      }),
      {},
    );
  });

  const 모든동의_여부 = Object.values(termsAgreement).every(
    (동의여부) => 동의여부,
  );

  const handleAllAgreement = useCallback(
    (_: MouseEvent<HTMLElement>, checked: boolean) => {
      setTermsAgreement((prevTerms) => {
        return Object.keys(prevTerms).reduce(
          (prev, key) => ({
            ...prev,
            [key]: checked,
          }),
          {},
        );
      });
    },
    [],
  );
  return (
    <div>
      <Agreement>
        <Agreement.Title checked={모든동의_여부} onChange={handleAllAgreement}>
          약관에 모두 동의
        </Agreement.Title>

        {약관목록.map(({ id, title, link }) => (
          <Agreement.Description
            key={id}
            link={link}
            checked={termsAgreement[id]}
            onChange={(_, checked) => {
              setTermsAgreement((prevTerms) => ({
                ...prevTerms,
                [id]: checked,
              }));
            }}
          >
            {title}
          </Agreement.Description>
        ))}
      </Agreement>
      <FixedBottomButton
        label="약관동의"
        disabled={모든동의_여부 === false}
        onClick={() => {
          onNext(Object.keys(termsAgreement));
        }}
      />
    </div>
  );
}
export default Terms;
