import { View } from '@tarojs/components'
import { Button } from '@nutui/nutui-react-taro'
import { useAppSelector, useAppDispatch } from 'src/store'
import './index.scss'
import { wxLogin } from 'src/features/auth/authSlice'
import { wxGetUserInfo } from 'src/features/user/userSlice'

function Index() {
  const auth = useAppSelector(state => state.auth)
  const user = useAppSelector(state => state.user.nickName)
  const dispatch = useAppDispatch();
  return (
    <View className='nutui-react-demo'>
      <View>WelCome to Single food mini app! {user}</View>
      <View>{auth.token}</View>
      <View>{auth.refreshToken}</View>
      <Button type='primary' onClick={() => {
        dispatch(wxGetUserInfo())
      }}>GetUserInfo</Button>
      <Button type='primary' onClick={() => {
        dispatch(wxLogin())
      }}>Login</Button>
    </View>
  )
}

export default Index
