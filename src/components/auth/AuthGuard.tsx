import { useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/remote/firebase';
import { useSetRecoilState } from 'recoil';
import { userAtom } from '@/atoms/user';

function AuthGuard({ children }: { children: React.ReactNode }) {
  const [initialize, setInitialize] = useState(false);
  const setUser = useSetRecoilState(userAtom);

  onAuthStateChanged(auth, (user) => {
    console.log('user', user);

    if (user != null) {
      setUser({
        uid: user.uid,
        email: user.email ?? '',
        displayName: user.displayName ?? '',
      });
    } else {
      setUser(null);
    }

    setInitialize(true);
  });

  if (initialize === false) {
    return null;
  }
  return <>{children}</>;
}

export default AuthGuard;
