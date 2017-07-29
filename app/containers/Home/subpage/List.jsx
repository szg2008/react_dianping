import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getListData } from '../../../fetch/home/home.js'
import ListComponent from '../../../components/List'
import LoadMore from '../../../components/LoadMore'
import './style.less'
class List extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            data:[],//存储列表信息
            hasMore:false,//记录当前是否有更多数据需要加载
            isLoadingMore:false,//记录当前状态下，是加载中还是点击加载更多
            page:1,//下一页的页码
        }
    }
    //获取首平数据
    loadFirstPage(){
        const cityName = this.props.cityName
        const result = getListData(cityName,0)
        this.resultHandle(result)
    }
    //加载更多数据
    loadMoreData(){
        // this.resultHandle()
        this.setState({
            isLoadingMore:true
        })
        const cityName = this.props.cityName
        const page = this.state.page
        const result = getListData(cityName,page)
        this.resultHandle(result)

        this.setState({
            page:page + 1,
            isLoadingMore:false
        })
    }
    resultHandle(result){
        result.then((result)=>(result.json()))
        .then((json)=>{
            const hasMore = json.hasMore
            const data = json.data
            this.setState({
                data:this.state.data.concat(data),
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
                {
                    this.state.data.length
                    ?<ListComponent data={this.state.data}/>
                    :'加载中...'
                }
                {
                    this.state.hasMore
                    ?<LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.loadMoreData.bind(this)}/>
                    :''
                }


            </div>
        )
    }
}

module.exports = List
