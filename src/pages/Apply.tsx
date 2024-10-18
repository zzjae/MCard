import { useState } from 'react';
import Terms from '@/components/apply/Terms';
import CardInfo from '@/components/apply/CardInfo';
import BasicInfo from '@/components/apply/BasicInfo';

function ApplyPage() {
  const [step, setStep] = useState(0);

  return (
    <div>
      {step === 0 ? <Terms /> : null}
      {step === 1 ? <CardInfo /> : null}
      {step === 2 ? <BasicInfo /> : null}
    </div>
  );
}

export default ApplyPage;
