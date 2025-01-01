import http from "./http"

const wxLogin = async (code: string) => {
  const res = await http.post('/auth/wxlogin', { code });
  return res
}

export default {
  wxLogin,
}