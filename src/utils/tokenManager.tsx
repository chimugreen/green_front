const token_key = "AccessToken";

export const tokenManager = {
  getAccess: () => localStorage.getItem(token_key),
  setAccess: (token: string) => localStorage.setItem(token_key, token),
  remove: () => {
      localStorage.removeItem(token_key)
  }
};
