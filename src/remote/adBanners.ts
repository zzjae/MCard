import { collection, getDocs } from 'firebase/firestore';
import { store } from './firebase';

import { COLLECTIONS } from '@constants/index';
import { AdBanner } from '@/models/card';

export async function getBanners() {
  const adBannerSnapShot = await getDocs(
    collection(store, COLLECTIONS.ADBANNER),
  );

  adBannerSnapShot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as AdBanner),
  }));
}
