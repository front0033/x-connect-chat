const routes = {
  main: () => '/',
  signIn: () => '/sign-in',
  signUp: () => '/sign-up',
  profile: () => '/profile',
  chat: (id = ':id') => `/chat${id}`,
};

export default routes;
