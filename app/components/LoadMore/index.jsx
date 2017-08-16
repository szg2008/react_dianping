import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'
class LoadMore extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    loadMoreData(){
        this.props.loadMoreFn()
    }
    render() {
        return (
            <div className="load-more" ref="wrapper">
                {
                    this.props.isLoadingMore
                    ?<span>加载中...</span>
                    :<span>加载更多</span>
                }
            </div>
        )
    }
    componentDidMount(){
        let loadMoreFn = this.props.loadMoreFn
        let wrapper = this.refs.wrapper

        let timeoutId
        window.addEventListener('scroll',function(){
            if(this.props.isLoadingMore){
                return
            }
            if(timeoutId){
                clearTimeout(timeoutId)
            }
            timeoutId = setTimeout(()=>{
                const top = wrapper.getBoundingClientRect().top
                const windowHeight = window.screen.height
                if(top && top < windowHeight){
                    //当wrapper已经滚滚动到页面可视范围内的时候进行加载
                    loadMoreFn();
                }
            },50)
        }.bind(this),false)
    }
}

module.exports = LoadMore
