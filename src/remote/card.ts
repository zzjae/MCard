import {
  collection,
  getDocs,
  QuerySnapshot,
  query,
  limit,
  startAfter,
} from 'firebase/firestore';
import { store } from './firebase';

import { COLLECTIONS } from '@constants/';
import { Card } from '@/models/card';

export async function getCards(pageParam?: QuerySnapshot<Card>) {
  const cardQuery =
    pageParam == null
      ? query(collection(store, COLLECTIONS.CARD), limit(10))
      : query(
          collection(store, COLLECTIONS.CARD),
          startAfter(pageParam),
          limit(10),
        );
  const cardSnapShot = await getDocs(cardQuery);

  const lastVisible = cardSnapShot.docs[cardSnapShot.docs.length - 1];

  const items = cardSnapShot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Card),
  }));

  return { items, lastVisible };
}
