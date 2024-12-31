import { useEffect } from 'react'
import { Provider } from "react-redux"
import { useDidShow, useDidHide } from '@tarojs/taro'
import 'event-target-polyfill';
import 'yet-another-abortcontroller-polyfill';
// 全局样式
import './app.scss'
import store from './store'

function App(props) {
  // 可以使用所有的 React Hooks
  useEffect(() => { })

  // 对应 onShow
  useDidShow(() => { })

  // 对应 onHide
  useDidHide(() => { })

  return <Provider store={store}> {props.children} </Provider>
}

export default App
