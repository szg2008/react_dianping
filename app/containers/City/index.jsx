import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'
import { hashHistory } from 'react-router'
import * as userInfoActionsFromOtherFile from '../../actions/userinfo'
import Header from '../../components/Header'
import CurrentCity from '../../components/CurrentCity'
import CityList from '../../components/CityList'
import LocalStore from '../../util/localStore'
import {CITYNAME} from '../../config/localStoreKey'
class City extends React.Component {
    constructor(props, context) {
        super(props, context);
        //组件性能优化方式
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        //在每次更新之前判断state和props是否有变化，如果有变化则返回true，没有变化则返回false
    }
    componentDidMount(){
        // console.log(this.props.userinfo,this.props.userInfoActions)
    }
    render() {
        return (
            <div>
                <Header title="选择城市"/>
                <CurrentCity userinfo={this.props.userinfo}/>
                <CityList changeFn={this.changeCity.bind(this)}/>
            </div>
        )
    }
    changeCity(newCity){
        if(newCity == null){
            return;
        }
        //修改redux
        const userinfo = this.props.userinfo
        userinfo.cityName = newCity
        this.props.userInfoActions.update(userinfo)

        //修改localStorage
        LocalStore.setItem(CITYNAME,newCity)
        //跳转到首页
        hashHistory.push('/')
        // console.log(newCity)
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
)(City)
