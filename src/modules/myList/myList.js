import React from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../../redux/actions'
import Header from '../../components/header/header'
import './MyList.scss'
import { all } from 'redux-saga/effects';

class MyList extends React.Component{
    constructor(props){
        super(props)
        this.state={
            email: 'abhishek@excellence',
            password: '123456',
            showAddInput: false,
            createItem: ''
        }
    }
    componentDidMount(){
        this.props.requestHomeMovies();
        this.props.requestMyList();
    }
    allMoviesData(){
        const { data } = this.props.homeMovies;
        const allGenre = Object.keys(data);
        const temp = _.map(allGenre, (val, i) => data[val].results);
        let allGenresMoviesData = [];
        _.map(temp, val => {
            _.map(val, value => {
                allGenresMoviesData.push(value);
            })
        })
        return allGenresMoviesData;
    }
    listAllMovies(){
        const allGenresMoviesData = this.allMoviesData();
        const allMoviesList = _.map( allGenresMoviesData, val => val.name || val.original_title );
        return allMoviesList;
    }
    renderCollectionSuggestion(){

    }
    handleAddMovie(){
        const { showAddInput, createItem } = this.state;
        if(showAddInput && createItem) {
            const { data } = this.props.myList;
            data.push(createItem);
            this.props.successMyList(data);
        }
        this.setState({showAddInput: !showAddInput, createItem: ''});
    }
    handleDeleteList(item){
        const { data } = this.props.myList;
        const newData = [];
        _.map(data, val => { val == item ? null : newData.push(val) });
        this.props.successMyList(newData);
    }
    renderInput(){
        const { showAddInput, createItem } = this.state;
        return(
            <div className='form '>
                <div className='input-wrapper'>
                    <input type='text'
                        onChange={e => this.setState({createItem: e.target.value})}
                        className={`${showAddInput ? 'display' : 'hide'} input`}
                        style={{'color': `rgba(255,255,255,${createItem.length < 10 ? '.'+createItem.length : '1' }`}}
                        placeholder='Add item to your wish List'
                        value={createItem}
                    />
                    <button title='Add Item' onClick={e => this.handleAddMovie(e)}></button>
                </div>
                <div className='suggestion'></div>
            </div>
        );
    }
    renderFavourites(){
        const allMoviesData = this.allMoviesData();
        const { myList } = this.props;
        return myList.data.length > 0 ? 
            <div className='list-container'>
                {
                    _.map(myList.data, (val, i) => {
                        const titleArray = _.filter(allMoviesData, (o) => (o.name && o.name.toLowerCase() == val.toLowerCase()) || (o.original_title && o.original_title.toLowerCase() == val.toLowerCase()));
                        const title = titleArray ? titleArray[0] : null;
                        console.log(myList.data, val, title, title != undefined);
                        let backDrop = title != undefined ? 'http://image.tmdb.org/t/p/original' + title.backdrop_path : null;
                        return title != undefined ?
                                (<div key={i} className='Item' style={{backgroundImage: 'url(' + backDrop + ')'}} >
                                    <div className="overlay">
                                        <div className="title">{ title.name || title.original_title }</div>
                                        <div className="rating">{title.vote_average} / 10</div>
                                        <div className="plot">{title.overview}</div>
                                        <div className="ListToggle">
                                            <div onClick={() => this.handleDeleteList(val)}>
                                                <i className="fa fa-fw fa-close"></i>
                                                <i className="fa fa-fw fa-remove"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>)
                            :
                            <div className='no-data' key={i} ><h2>No movie found.</h2></div>                
                        }
                    )
                }
            </div>
        :
            <div className='no-data'><h2>Let's start creating a wishlist for your collection.</h2></div>
        ;
    }
    render(){
        console.log(this.props);
        const { email, password } = this.state;
        return(
            <div className='list-view container-fluid'>
                <Header />
                <div className='content row'>
                    <div className='col-sm-12'>
                        <div className='row'>
                            <div className='col-sm-1'></div>
                            <div className='col-sm-8'>
                                {this.renderFavourites()}
                            </div>
                            <div className='col-sm-3'>
                                {this.renderInput()}
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
        homeMovies: state.myList.homeMovies,
        myList: state.myList.myList,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MyList);
