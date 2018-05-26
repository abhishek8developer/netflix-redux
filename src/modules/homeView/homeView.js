import React from 'react'
import Header from '../../components/header/header'
import './homeView.scss'

class HomeView extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
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
                            <a href="#" className="Button" data-primary={false}>+ My list</a>
                        </div>
                        </div>
                        <div className="overlay"></div>
                        {/* <TitleList title="Search Results" url={this.state.searchUrl} /> */}
                        {/* <TitleList title="Top TV picks for Jack" url='discover/tv?sort_by=popularity.desc&page=1' />
                        <TitleList title="Trending now" url='discover/movie?sort_by=popularity.desc&page=1' />
                        <TitleList title="Most watched in Horror" url='genre/27/movies?sort_by=popularity.desc&page=1' />
                        <TitleList title="Sci-Fi greats" url='genre/878/movies?sort_by=popularity.desc&page=1' />
                        <TitleList title="Comedy magic" url='genre/35/movies?sort_by=popularity.desc&page=1' /> */}
                    </div>
                </div>
            </div>
        );
    }
}

export default HomeView;
