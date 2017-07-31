import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getInfoData } from '../../../fetch/detail/detail.js'

class Info extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            info:false
        }
    }
    render() {
        return (
            <div>
                {
                    this.state.info
                    ?
                    <div>Yes</div>
                    :
                    ''
                }
            </div>
        )
    }
    componentDidMount(){
        let id = this.props.id
        let result = getInfoData(id)
        result.then(res=>(res.json()))
        .then(json=>{
            this.setState({
                info:json
            })
        })
    }
}


module.exports = Info
