import Taro from "@tarojs/taro";
import http from "./http"



const wxLogin = async (code: string) => {
  console.log(code);
  const res = await http.post('/auth/wxLogin', { code });
  console.log(res);
  return res
}

export default {
  wxLogin,
}