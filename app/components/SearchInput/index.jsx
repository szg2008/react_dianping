import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import ReactSwipe from 'react-swipe'
import { Link } from 'react-router'
import './style.less'
class SearchInput extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            value:''
        }
    }
    componentDidMount(){
        this.setState({
            value:this.props.value || ''
        })
    }
    render() {
        return (
            <div className="search-header">
                <input
                type="text"
                className="search-input"
                placeholder="请输入关键字"
                value={this.state.value}
                onChange={this.changeHandle.bind(this)}
                onKeyUp={this.keyUpHandle.bind(this)}
                />
            </div>
        )
    }
    changeHandle(e){
        this.setState({
            value:e.target.value
        })
    }
    keyUpHandle(e){
        if(e.keyCode != 13){
            return
        }
        this.props.enterHandle(this.state.value)
    }
}

module.exports = SearchInput
