import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    loadArticles,
    getSeries
} from './../redux/actions/actions'
import AsideFeed from './AsideFeed'
import './../assets/list-item.css'
import Axios from 'axios';
const url = process.env.NODE_ENV === 'production' ? "/api/" : "http://localhost:5000/api/"
const mapStateToProps = state => {
    return {
        articles: state.articles.articles,
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
  componentWillMount() {
      this.props.loadArticles()
      //this.props.getSeries()
   Axios.post(url+'get-full'+`/${this.props.match.params.id}`).then(res=>{
      console.log(res.data)
        this.setState({
          series:res.data
        })
      })
      console.log(typeof(this.state.series.series))
    }
   renderSeries = function(series){
       return series.map(serie=>{
         return(
             
                            <li onClick={()=>window.location.href=`/articleview/${serie._id}`} className="item">
                            <h2 className="headline">{serie.title}</h2>
                            <img onClick={()=>window.location.href=`/articleview/${serie._id}`} className="post-img" src={serie.feature_img}/>
                            <p className="post-decription" dangerouslySetInnerHTML={{__html: serie.description}}></p>
                            <b><p className="post-decription">...</p></b>
                            </li>
         )
     })
   }
    render() {
        return ( 
            <div>
                <div className="container-fluid main-container">
                    <div className="col-md-6 col-md-offset-1 dashboard-main-content">
                        <div className="posts-wrapper animated fadeInUp" data-behavior="endless-scroll" data-animation="fadeInUp-fadeOutDown">
                        <div className="post-panel"style={{marginTop:'20px'}}>
                          <ol class="list">
                            {this.renderSeries(this.state.series.series||[])}
                          </ol>   
                        </div>
                      </div>
                    </div>
                    {this.props.articles ? <AsideFeed _articles={this.props.articles} /> : ''}
                </div>

            </div>
        );
    }
}

export default connect(mapStateToProps, { loadArticles,getSeries })(Series);