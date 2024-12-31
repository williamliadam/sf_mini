import { View } from '@tarojs/components'
import { Button } from '@nutui/nutui-react-taro'
import './index.scss'
import { useDispatch, useSelector } from 'react-redux'
import { wxLogin, type RootState, type AppDispatch } from 'src/store'

function Index() {
  const { global, user } = useSelector<RootState, RootState>(state => state)
  const dispatch = useDispatch<AppDispatch>()
  return (
    <View className='nutui-react-demo'>
      <View>Hello, {user?.name}</View>
      <View>Global: {global?.user}</View>
      <Button onClick={() => {
        dispatch(wxLogin())
      }}>Login</Button>

    </View>
  )
}

export default Index
