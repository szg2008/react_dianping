import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import LocalStore from '../util/localStore'
import {CITYNAME} from '../config/localStoreKey'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as userInfoActionsFromOtherFile from '../actions/userinfo'
class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            initDone:false
        }
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    componentDidMount(){
        //从localStorage中获取城市
        let cityName = LocalStore.getItem(CITYNAME)
        if(cityName == null){
            cityName = '北京'
        }

        //入口文件，首先从redux中获取cityName,如果没有，设置一个默认值

        //将城市信息存储到Redux中
        this.props.userInfoActions.update({
            cityName:cityName
        })
        this.setState({
            initDone:true
        })
    }
    render() {
        return (
            <div>
                {
                    this.state.initDone
                    ?this.props.children
                    :'加载中...'
                }
            </div>
        )
    }
}

function mapStateToProps(state){
    return{

    }
}

function mapDispatchToProps(dispatch){
    return {
        userInfoActions:bindActionCreators(userInfoActionsFromOtherFile,dispatch)//将相应的action通过dispatch派发出去
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
