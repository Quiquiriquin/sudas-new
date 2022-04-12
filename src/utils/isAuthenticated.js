export const isAuthenticated = () => {
  return !!localStorage.getItem('mail');
};
