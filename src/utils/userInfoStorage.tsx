const userIdKey = 'userId';
export const userInfoStorage = {
  getUserId: () => {
    const get = localStorage.getItem(userIdKey);
    return get ? Number(get) : null;
  },
  setUserId: (id: number) => localStorage.setItem(userIdKey, String(id)),
  removeUserId: () => localStorage.removeItem(userIdKey),
};
