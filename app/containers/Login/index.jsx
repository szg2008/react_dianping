import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'
import { hashHistory } from 'react-router'
import * as userInfoActionsFromOtherFile from '../../actions/userinfo'
import Header from '../../components/Header'
class Login extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            checking:true
        }
    }
    render() {
        return (
            <div>
                <Header title="登录" />
                {
                    this.state.checking
                    ?<div>等待中</div>
                    :<div>登录页面</div>
                }
                {/**<LoginComponent loginHandle={this.loginHandle.bind(this)}/>*/}
            </div>
        )
    }
    componentDidMount(){
        this.doCheck()
    }
    loginHandle(username){
        //登录成功之后的业务逻辑
        //将username保存到redux中
        const actions = this.props.userInfoActions
        let userinfo = this.props.userinfo
        userinfo.username = username
        actions.update(userinfo)

        //跳转链接
        const params = this.props.params
        const router = params.router
        if(router){
            //跳转到指定页面
            hashHistory.push(router)
        }else{
            this.goUserPage()//跳转到用户中心页面
        }
    }
    doCheck(){
        const userinfo = this.props.userinfo
        if(userinfo.username){
            //denglu
            this.goUserPage()
        }else{
            //shangwei denglu
            this.setState({
                checking:false
            })
        }
    }
    goUserPage(){
        hashHistory.push('/User')
    }
}


function mapStateToProps(state){
    return{
        userinfo:state.userinfo
    }
}

function mapDispatchToProps(dispatch){
    return {
        userInfoActions:bindActionCreators(userInfoActionsFromOtherFile,dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)
