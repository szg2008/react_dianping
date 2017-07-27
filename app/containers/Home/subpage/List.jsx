import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getListData } from '../../../fetch/home/home.js'
import './style.less'
class List extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            data:[],
            hasMore:false
        }
    }
    //获取首平数据
    loadFirstPage(){
        const cityName = this.props.cityName
        const result = getListData(cityName,1)
        this.resultHandle(result)
    }
    resultHandle(result){
        result.then((result)=>(result.json()))
        .then((json)=>{
            const hasMore = json.hasMore
            const data = json.data
            this.setState({
                data:data,
                hasMore:hasMore
            })
        })

    }
    componentDidMount(){
        //获取首页数据
        this.loadFirstPage()
    }
    render() {
        return (
            <div>
                <h2 className="home-list-title">猜你喜欢</h2>
                <div>
                    {this.state.hasMore.toString()}
                    {this.state.data.length}
                </div>
            </div>
        )
    }
}

module.exports = List
