import React from 'react'

class TitleList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: [], 
            mounted: false,
            toggled: false
        };
        this.handleAddRemove = this.handleAddRemove.bind(this);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.url !== this.props.url && nextProps.url !== ''){
            this.setState({mounted:true,url:nextProps.url},()=>{
                // this.props.loadContent();
            });
        }
    }
    componentDidMount() {
        if(this.props.url !== ''){
            // this.loadContent();
            this.setState({mounted:true});
        }
    }
    handleClick(id){
        this.setState({
            toggled: !this.state.toggled });
    }
    handleAddRemove(item){
        const { data } = this.props.myList;
        let itemInList = false;
        let newData = []
        _.map(data, val => {
            if( val == item ){
                itemInList = true;
            } else {
                newData.push(val)
            }
        })
        console.log(data, item, newData,'00000000000')
        this.props.successMyList(newData);
    }
    render() {
        var titles ='';
        if(this.props.data) {
        titles = this.props.data.results.map(function(title, i) {
            if(i < 5) {
            var name = '';
            var backDrop = 'http://image.tmdb.org/t/p/original' + title.backdrop_path;
            if(!title.name) {
                name = title.original_title;
            } else {
                name = title.name;
            }
            return (
                <div key={title.id} className="Item" style={{backgroundImage: 'url(' + backDrop + ')'}} >
                    <div className="overlay">
                        <div className="title">{name}</div>
                        <div className="rating">{title.vote_average} / 10</div>
                        <div className="plot">{title.overview}</div>
                        <div className="ListToggle" onClick={(name) => this.handleAddRemove(name)}>
                            <div>
                                <i className="fa fa-fw fa-plus"></i>
                                <i className="fa fa-fw fa-check"></i>
                            </div>
                        </div>
                    </div>
                </div>
            );

            }else{
                return (<div key={title.id}></div>);
            }
        }); 

        } 
        
        return (
        <div ref="titlecategory" className="TitleList" data-loaded={this.state.mounted}>
            <div className="Title">
            <h1>{this.props.title}</h1>
            <div className="titles-wrapper">
                {titles}
            </div>
            </div>
        </div>
        );
    }
}

export default TitleList;