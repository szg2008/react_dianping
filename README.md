# react-dianping

learning...

1.css字体图标   自定义字体图标fontawesome  
2.css float 浮动
3.js 节流  scroll resize mousemove
3.加载更多滚动scroll onsize的时候为了提高性能，最好使用截流的方式，即不要滚动就触发，应该使用setTimeout进行控制,具体代码参照components/LoadMore/index.jsx
4.加载更多的新的判断方法，通过getBoundingClientRect获取加载更多位置距离页面顶部的距离，并且和window的height的值进行比较，如果加载更多到了页面可视范围内，那么就触发加载更多
