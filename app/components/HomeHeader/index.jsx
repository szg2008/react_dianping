import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Link,hashHistory } from 'react-router'
import SearchInput from '../SearchInput'
import './style.less'

class HomeHeader extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div className="clear-fix" id="home-header">
                <div className="home-header-left float-left">
                    <Link to="/city">
                        {this.props.cityName}
                        <i className="icon-angle-down"></i>
                    </Link>
                </div>
                <div className="home-header-right float-right">
                    <Link to="/Login">
                        <i className='icon-user'></i>
                    </Link>

                </div>
                <div className="home-header-middle">
                    <div className="search-container">
                        <i className="icon-search"></i>
                        &nbsp;
                        <SearchInput value="" enterHandle={this.enterHandle.bind(this)}/>
                    </div>
                </div>
            </div>
        )
    }
    enterHandle(value){
        hashHistory.push('/search/all/' + encodeURIComponent(value))
    }
}


module.exports = HomeHeader
