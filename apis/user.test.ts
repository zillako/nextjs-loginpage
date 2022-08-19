import { AxiosError } from 'axios';
import { api_login } from './user';

describe(`user api test`, () => {
  describe(`login`, () => {
    it('login good', async () => {
      expect.assertions(1);
      const accessToken = await api_login({ email: 'ably@dummy.com', password: '!abc321#$' });
      expect(accessToken).not.toBeNull();
    });

    it('login error', async () => {
      expect.assertions(1);

      try {
        await api_login({ email: 'ably@dummy.com', password: '!!!!!' });
      } catch (error: AxiosError | any) {
        expect(error.response.status).toEqual(400);
      }
    });
  });
});
