import { GetServerSidePropsContext } from 'next';

const getCookie = (name: string, ctx?: GetServerSidePropsContext) => {
  let cookie = '';
  if (ctx) {
    cookie = ctx.req.headers.cookie ?? '';
  } else if (document) {
    cookie = document.cookie;
  }

  if (!cookie) {
    return '';
  }

  const matches = cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

const setCookie = (
  name: string,
  value: string,
  options: any = {},
  ctx?: GetServerSidePropsContext
) => {
  options = {
    path: '/',
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

  for (const optionKey in options) {
    updatedCookie += '; ' + optionKey;
    const optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += '=' + optionValue;
    }
  }

  if (ctx) {
    ctx.res.setHeader('set-Cookie', updatedCookie);
  } else if (document) {
    document.cookie = updatedCookie;
  }
};

const deleteCookie = (name: string, ctx?: GetServerSidePropsContext) => {
  setCookie(
    name,
    '',
    {
      'max-age': -1,
    },
    ctx
  );
};

export const getAccessToken = (ctx?: GetServerSidePropsContext) => {
  return getCookie('accessToken', ctx);
};

export const setAccessToken = (accessToken: string, ctx?: GetServerSidePropsContext) => {
  return setCookie('accessToken', accessToken, {}, ctx);
};

export const deleteAccessToken = (ctx?: GetServerSidePropsContext) => {
  return deleteCookie('accessToken', ctx);
};
