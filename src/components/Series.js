import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    loadArticles,
    getSeries
} from './../redux/actions/actions'
import AsideFeed from './AsideFeed'
import './../assets/card.css'
import Axios from 'axios';
const url = process.env.NODE_ENV === 'production' ? "/api/" : "http://localhost:5000/api/"
const mapStateToProps = state => {
    return {
        articles: state.articles.articles,
        series: state.series.series
    }
}
class Series extends Component {
  constructor(props){
    super(props)
    this.state={
      series : []
    }
  }
    componentWillReceiveProps(nextProps) {
        
    }
    componentDidMount(){
     
    }
   async componentWillMount() {
      this.props.loadArticles()
      this.props.getSeries()
    console.log("ok");
     await Axios.get(url+'get-all').then(res=>{
      //console.log(this.props.articles)
        this.setState({
          series:res.data
        })
      })
    }
   renderSeries = function(series){
       return series.map(serie=>{
         return(
                        <div className="post-panel"style={{marginTop:'20px'}}>
                        <div className="wrapper" style={{marginRight:'50px'}}>
                  <div className="main_series_card">
                  <div className="card_series_left">
                  <div className="card_series_datails">
                  <h1>{serie.name}</h1>
                  <div className="card_series_cat">
                    <p className="PG">{serie.author.name}</p>
                    <p className="year">{new Date().getFullYear()}</p>
                    <p className="genre">{serie.title} </p>
                    <p className="time">{serie.hashtag}</p>
                  </div>  
                  <p className="disc">{serie.decription}</p>
                  <div className="social-btn">
                    {/* WATCH TRAILER*/}
                    <button className="button series" onClick={()=>{window.location.href="/series-reader/"+`${serie._id}`}}>
                      <i className="fa ellipsis-h" /> READ SERIES
                    </button>
                  </div>	
                  </div>
                  </div>
                  <div className="card_series_right">
                  <div className="img_container">
                  <img src={this.props.articles[Math.floor((Math.random() * serie.series.length) + 0)].feature_img} alt="" />
                  </div>
                  <div className="play_btn">
                  <a href={`series-reader/${serie._id}`} target="_blank">
                    <i className="fa fa-angle-double-right" />
                  </a>
                  </div>
                  </div>
                  </div>
                  </div>

                        
                    </div>
         )
     })
   }
    render() {
    const articles = this.props.articles.reverse().map((article)=>
                <div className="post-panel"style={{marginTop:'20px'}}>
                    <div className="wrapper" style={{marginRight:'50px'}}>
        <div className="main_series_card">
          <div className="card_series_left">
            <div className="card_series_datails">
              <h1>Tôi đã "khô máu" với nodejs như thế nào?</h1>
              <div className="card_series_cat">
                <p className="PG">Tuấn Khang</p>
                <p className="year">2018</p>
                <p className="genre">Nodejs </p>
                <p className="time">HTML</p>
              </div>
              <p className="disc">Đây là series chuyên sâu về nodejs!!</p>
              <a href={`articleview/${article._id}`} target="_blank">Read More</a>
              <div className="social-btn">
                {/* WATCH TRAILER*/}
                <button className="button series" onClick={()=>{this.props.series.map(a=>{console.log(a)})}}>
                  <i className="fa ellipsis-h" /> READ SERIES
                </button>
              </div>	
            </div>
          </div>
          <div className="card_series_right">
            <div className="img_container">
              <img src="https://images.wallpaperscraft.com/image/mountains_lake_trees_144998_1366x768.jpg" alt="" />
            </div>
            <div className="play_btn">
              <a href={`articleview/${article._id}`} target="_blank">
                <i className="fa fa-angle-double-right" />
              </a>
            </div>
          </div>
        </div>
      </div>
      
                    
                </div>
            )

        return ( 
            <div>
                <div className="container-fluid main-container">
                    <div className="col-md-6 col-md-offset-1 dashboard-main-content">
                        <div className="posts-wrapper animated fadeInUp" data-behavior="endless-scroll" data-animation="fadeInUp-fadeOutDown">
                            {this.renderSeries(this.state.series)}
                        </div>
                    </div>
                    {this.props.articles ? <AsideFeed _articles={this.props.articles} /> : ''}
                </div>

            </div>
        );
    }
}

export default connect(mapStateToProps, { loadArticles,getSeries })(Series);