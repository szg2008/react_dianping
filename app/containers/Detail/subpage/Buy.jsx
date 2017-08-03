import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'
import { hashHistory } from 'react-router'
import * as userInfoActionsFromOtherFile from '../../../actions/userinfo'
import BuyAndStore from '../../../components/BuyAndStore'
import * as storeActionsFromOtherFile from '../../../actions/store'
class Buy extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            isStore:false
        }
    }
    render() {
        return (
            <div>
                <BuyAndStore isStore={this.state.isStore} buyHandle={this.buyHandle.bind(this)} storeHandle={this.storeHandle.bind(this)}/>
            </div>
        )
    }
    buyHandle(){
        //购买事件
        const loginFlag = this.loginCheck()
        if(!loginFlag){
            return
        }
        //购买流程
        //跳转到用户主页
        hashHistory.push('/User')
    }
    storeHandle(){
        //收藏事件
        const loginFlag = this.loginCheck()
        if(!loginFlag){
            return
        }
    }
    //验证登录
    loginCheck(){
        const id = this.prop.id
        const userinfo = this.props.userinfo
        if(!userinfo.username){
            //跳转到登录页面
            hashHistory.push('/Login' + encodeURIComponent('/detail/' + id))
            return false
        }
        return true
    }
    componentDidMount(){
        console.log(this.props.store)
        console.log(this.props.storeActions)
    }
}

function mapStateToProps(state){
    return{
        userinfo:state.userinfo,
        store:state.store
    }
}

function mapDispatchToProps(dispatch){
    return {
        userInfoActions:bindActionCreators(userInfoActionsFromOtherFile,dispatch),
        storeActions:bindActionCreators(storeActionsFromOtherFile,dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Buy)
