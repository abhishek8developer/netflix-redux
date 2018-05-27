import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../redux/actions'
import Header from '../../components/header/header'
import TitleList from './component/titleList'
import './homeView.scss'

class HomeView extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    componentDidMount(){
        this.props.requestHomeMovies();
    }
    render(){
        console.log(this.props.homeMovies,'00000')
        const { homeMovies } = this.props;
        return(
            <div className='homeView container-fluid'>
                <Header />
                <div className='row'>
                    <div id="hero" className="Hero" style={{backgroundImage: 'url(https://images.alphacoders.com/633/633643.jpg)'}}>
                        <div className="content">
                        <img className="logo" src="http://www.returndates.com/backgrounds/narcos.logo.png" alt="narcos background" />
                        <h2>Season 2 now available</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque id quam sapiente unde voluptatum alias vero debitis, magnam quis quod.</p>
                        <div className="button-wrapper">
                            <a href="#" className="Button" data-primary={true}>Watch now </a>
                            <a href="#/mylist" className="Button" data-primary={false}>+ My list</a>
                        </div>
                        </div>
                        <div className="overlay"></div>
                    </div>
                </div>
                <TitleList title="Search Results" data={homeMovies.data.movie} />
                <TitleList title="Top TV picks for Jack" data={homeMovies.data.topTVPicks} />
                <TitleList title="Trending now" data={homeMovies.data.movie} />
                <TitleList title="Most watched in Horror" data={homeMovies.data.horror} />
                <TitleList title="Sci-Fi greats" data={homeMovies.data.sciFi} />
                <TitleList title="Comedy magic" data={homeMovies.data.comedy} />
            </div>
        );
    }
}

export function mapStateToProps(state) {
    return {
        myList: state.myList,
        homeMovies: state.myList.homeMovies
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
