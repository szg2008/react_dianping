import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {getOrderListData} from '../../../fetch/user/orderlist.js'
import './style.less'
class OrderList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            data:[]
        }
    }
    render() {

        return (
            <div className="order-list-container">
                {
                    this.state.data.length
                    ?<div>展示数据</div>
                    :<div></div>
                }
            </div>
        )
    }
    componentDidMount(){
        const username = this.props.username
        //if(username){
            this.loadOrderList(username)
        //}
    }
    loadOrderList(username){
        const result = getOrderListData(username)
        result.then(res=>{
            return res.json()
        }).then(json=>{
            this.setState({
                data:json
            })
        })
    }
}

export default OrderList
