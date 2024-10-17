import { useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/remote/firebase';

function AuthGuard({ children }: { children: React.ReactNode }) {
  const [initialize, setInitialize] = useState(false);

  onAuthStateChanged(auth, (user) => {
    console.log('user', user);

    setInitialize(true);
  });

  if (initialize === false) {
    return <div>로딩중</div>;
  }
  return <>{children}</>;
}

export default AuthGuard;
