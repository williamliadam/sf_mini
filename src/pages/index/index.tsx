import { View } from '@tarojs/components'
import { Button, TextArea } from '@nutui/nutui-react-taro'
import { Button as TaroButton } from '@tarojs/components'
import './index.scss'
import { useDispatch, useSelector } from 'react-redux'
import { setName, wxLogin, type RootState, type AppDispatch } from 'src/store'

function Index() {
  const { global, user } = useSelector<RootState, RootState>(state => state)
  const dispatch = useDispatch<AppDispatch>()
  return (
    <View className='nutui-react-demo'>
      <View>Hello, {user?.name}</View>
      <View>Global: {global?.user}</View>
      <Button onClick={() => dispatch(setName('Taro'))}>Set Name</Button>
      <TaroButton onClick={() => dispatch(wxLogin())}>Login</TaroButton>
    </View>
  )
}

export default Index
