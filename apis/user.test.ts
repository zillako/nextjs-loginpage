import { AxiosError } from 'axios';
import { api_login, api_logout } from './user';

describe(`user api test`, () => {
  describe(`login`, () => {
    it('login good', async () => {
      expect.assertions(1);
      const accessToken = await api_login({ email: 'ably@dummy.com', password: '!abc321#$' });
      expect(accessToken).not.toBeNull();
    });

    it('login error - password bad', async () => {
      expect.assertions(1);

      try {
        await api_login({ email: 'ably@dummy.com', password: '!!!!!' });
      } catch (error: AxiosError | any) {
        expect(error.response.status).toEqual(400);
      }
    });

    it('login error - email bad', async () => {
      expect.assertions(1);

      try {
        await api_login({ email: 'ably@duy.c', password: '!!!!!' });
      } catch (error: AxiosError | any) {
        expect(error.response.status).toEqual(404);
      }
    });
  });

  describe(`logout`, () => {
    it('logout good', async () => {
      expect.assertions(1);
      const accessToken = await api_login({ email: 'ably@dummy.com', password: '!abc321#$' });
      const lastConnectedAt = await api_logout({ accessToken });
      expect(lastConnectedAt).not.toBeNull();
    });

    it('logout - empty accessToken', async () => {
      expect.assertions(1);
      try {
        await api_logout({ accessToken: '' });
      } catch (error: AxiosError | any) {
        expect(error.status).toEqual('401');
      }
    });

    it('logout - bad accessToken', async () => {
      expect.assertions(1);
      try {
        await api_logout({ accessToken: '123123' });
      } catch (error: AxiosError | any) {
        expect(error.status).toEqual(401);
      }
    });
  });
});
