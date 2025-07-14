// Hàm mã hóa id sang base64 (fake link)
export const encodeId = (id: number | string) => {
  try {
    return btoa(id.toString());
  } catch {
    return id.toString();
  }
};
