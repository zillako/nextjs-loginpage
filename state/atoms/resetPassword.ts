import { atom, useRecoilState } from 'recoil';

export const resetPasswordState = atom<{
  email?: string;
  issueToken?: string;
  endMillisecond?: number;
  confirmToken?: string;
}>({
  key: 'resetPassword',
  default: {},
});

export const useResetPasswordState = () => {
  const [state, setState] = useRecoilState(resetPasswordState);

  return { state, setState };
};
