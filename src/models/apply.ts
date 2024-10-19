import { User } from './user';

export interface Term {
  id: string;
  link?: string;
  title: string;
}

export interface ApplyValues {
  userId: User['uid'];
  terms: Array<Term['id']>;
  appliedAt: Date;
  cardId: string;
  salary: string;
  creditScore: string;
  payDate: string;
  isMaster: boolean;
  isHipass: boolean;
  isRf: boolean;
  status: keyof typeof APPLY_STATUS;
}

export interface Option {
  label: string;
  value: string | number | undefined;
}

export const APPLY_STATUS = {
  READY: 'READY',
  PROGRESS: 'PROGRESS',
  COMPLETE: 'COMPLETE',
  REJECT: 'REJECT',
} as const;
