import React from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../../redux/actions'
import Header from '../../components/header/header'
import './MyList.scss'

class MyList extends React.Component{
    constructor(props){
        super(props)
        this.state={
            email: 'abhishek@excellence',
            password: '123456'
        }
    }
    componentDidMount(){
        this.props.requestMyList();
    }
    render(){
        console.log(this.props);
        const { email, password } = this.state;
        return(
            <div className='login-view container-fluid'>
                <Header />
                <div className='row'>
                    <div className='col-sm-12'>
                        <div className='row'>
                            <div className='col-sm-3'></div>
                            <div className='col-sm-6'>
                                
                            </div>
                            <div className='col-sm-3'>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export function mapStateToProps(state) {
    return {
        myList: state.myList
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MyList);
