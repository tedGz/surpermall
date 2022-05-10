import Toast from './Toast'

const MyPlugin = {}

MyPlugin.install = function(Vue) {
  //1.创建构造器
  const ToastConstructor = Vue.extend(Toast)
  
  //2.new一个vue组件对象
  const toast = new ToastConstructor()

  //3.手动挂载到某个元素
  toast.$mount(document.createElement('div'))

  //4.产生一个元素
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}

export default MyPlugin