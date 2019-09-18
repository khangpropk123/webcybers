import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import FollowButton from './FollowButton'
import Sweet from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify'
import { 
    getUserProfile, 
    deleteArticle,
    addSerie,
    updateArticle,
    follow
} from './../redux/actions/actions'
import Axios from 'axios';
const url = process.env.NODE_ENV === 'production' ? "/api/" : "http://localhost:5000/api/"
const jwtToken =""
class MyProfile extends Component {

    sucsNofi = ()=>toast("Add to Series Succsessful!")
    componentDidMount() {
        document.body.className = 'users show'
    }
    componentWillUnmount() {
        document.body.className = ''
    }
    componentWillMount() {
        let id = JSON.parse(localStorage.getItem("Auth"));
        if(id){
            console.log(JSON.parse(localStorage.getItem("Auth")).jwtToken.access_token || "ff")
            this.props.getUserProfile(id._id)
        }
    }
    
    render() {

        return ( 
            <div>
            {Object.keys(this.props.profile).length > 0 ? <ItemList items ={this.props} /> : ''}
            </div>
        );
    }
}
function createNewSerie() {
        return Sweet.mixin({
            input: 'text',
            confirmButtonText: 'Next &rarr;',
            showCancelButton: true,
            progressSteps: ['1', '2', '3','4']
          }).queue([
            {
              title: 'Name of Serie??',
              text: 'Type name'
            },
            'Name of hashtag #1??',
            'Name of hashtag #2??',
            'Serie description???'
          ]).then((result) => {
            if (result.value) {
            let data = new FormData()
            data.append('name',result.value[0])
            data.append('title',result.value[1])
            data.append('hashtag',result.value[2])
            data.append('description',result.value[3])
            data.append('token',JSON.parse(localStorage.getItem("Auth")).jwtToken.access_token)
            Axios.post(url +'add-serie/',data) 
              Sweet.fire({
                title: 'All done!',
                html:
                  'Your Serie: <pre><code>' +
                    JSON.stringify(result.value) +
                  '</code></pre>',
                confirmButtonText: 'Done!'
              })
            }
          })
}
function ItemList ({items}) {
    return (
            <div className="users show">
            <div className="container-fluid main-container">
            <div className="banner-container animated fadeInUp-small" data-animation="fadeInUp-fadeOutDown-slow">
                <div className="hero-wrapper">
                    <header className="hero">
                        <div className="profile-info">
                            <h1 className="hero-title">{items.profile.user.name}</h1>
                            <p className="hero-description">{items.profile.user.email}</p>
                            <div className="hero-location">
                                <i className="fa fa-map-marker"></i>{items.profile.user.provider}
                            </div>
                        </div>
                        <div className="hero-avatar">
                            <img alt={items.profile.user.name} className="avatar-image" src={items.profile.user.provider_pic} height="100" width="100"/>
                        </div>
                    </header>

                    <div>
                        <div data-react-className="UserFollowContainer" data-react-props="{&quot;followerCount&quot;:6,&quot;followingCount&quot;:2,&quot;following&quot;:false,&quot;followed_id&quot;:396,&quot;hideButton&quot;:false,&quot;username&quot;:&quot;mark&quot;,&quot;overlayTrigger&quot;:true}">
                            <div data-reactroot="">
                                <div className="following-metadata"><span className="following-count"><span><span><b>{items.profile.user.following.length}</b> Following</span></span>
                                    </span><span className="follower-count"><span><span><b>{items.profile.user.followers.length}</b> Followers</span></span>
                                    </span>
                                </div>
                                <div>{items.user.name ? <FollowButton user="" to_follow="" /> : ''}</div>
                                
                            </div>
                        </div>

                    </div>
                </div>
            </div>
           <div style={{marginTop:'20px', textAlign:'center'}}> 
            <button onClick={()=>{createNewSerie()}} id="btn-create-new" className="button green-border-button follow-button">Create new series???</button>
            </div>

            <div className="posts-wrapper animated fadeInUp" data-animation="fadeInUp-fadeOutDown">

                <h4 className="small-heading border-top">latest</h4>
                { items.profile.articles.map((article)=>
                <div className="post-panel">

                    <div className="post-metadata">
                        <img alt="mark" className="avatar-image" src={items.profile.user.provider_pic} height="40" width="40"/>
                        <div className="post-info">
                            <div data-react-className="PopoverLink"><span className="popover-link" data-reactroot=""><a href="javascript:void(0);">{items.profile.user.name}</a></span></div>
                            <small>Published • a must read</small>
                        </div>
                    </div>


                    {article.feature_img != null? <div className="post-picture-wrapper">
                        <img src={article.feature_img} alt="alt"/>
                    </div> : ''}

                    <div className="main-body">
                        <h3 className="post-title"><a href={`/articleview/${article._id}`}>{article.title}</a></h3>
                        <div className="post-body">
                            <p className="" dangerouslySetInnerHTML={{__html: article.description}}></p>
                        </div>
                        <a className="read-more" href={`/articleview/${article._id}`}>Read more</a>
                    </div>

                    <div className="post-stats clearfix">
                        <div className="pull-left">
                            <div className="like-button-wrapper">
                                <form className="button_to" method="get" action="">
                                    <button className="like-button" data-behavior="trigger-overlay" type="submit"><i className="fa fa-heart-o"></i><span className="hide-text">Like</span></button>
                                </form>
                                <span className="like-count">{article.claps}</span>
                            </div>
                            

                        </div>

                        <div className="like-button-wrapper">
                            
                                <div className="button_to" method="get" action="">
                                    <button onClick={()=>{
                                        document.getElementById('a_edit').click()
                                    }}  className="like-button" data-behavior="trigger-overlay" type="submit"><i className="fa  fa-pencil-square-o  "></i><span className="hide-text">Edit</span></button>
                                </div>
                                <a id="a_edit" href={`/edit-article/${article._id}`}>

                            </a>
                            </div>
                            <div className="like-button-wrapper">
                                <div className="button_to" method="" action="">
                                    <button onClick={deleteArticle(article._id,JSON.parse(localStorage.getItem("Auth")).jwtToken.access_token||"")} className="like-button" data-behavior="trigger-overlay" type="submit"><i className="fa fa-trash-o"></i><span className="hide-text">Delete</span></button>
                                </div>
                            </div>
                            <div className="like-button-wrapper">
                                <div className="button_to" >
                                    <button onClick={async ()=>{
                                       await Axios.post(url+`get-author-series/${JSON.parse(localStorage.getItem("Auth")).jwtToken.access_token}`).then((series)=>{
                                            console.log(series)
                                            localStorage.setItem('series',JSON.stringify(series.data))
                                        })
                                        .catch((err)=>{
                                            console.log(err)
                                        })
                                       let json = JSON.parse(localStorage.getItem('series'))
                                       let series_id="{"
                                       json.map((data)=>{
                                           series_id+= '"'+data._id+'":"'+data.name +'",'
                                       })
                                       series_id+="}"
                                       series_id=series_id.replace(",}","}")
                                       console.log(series_id)
                                       
                                        const {value: series} = await Sweet.fire({
                                            title: 'Add to series',
                                            input: 'select',
                                            inputOptions:JSON.parse(series_id),
                                            inputPlaceholder: 'Select a serie',
                                            inputValidator: (value) => {
                                                
                                            }
                                          })
                                          if (series) {
                                            Axios.post(url+`/add-article-to-serie/${series}/${article._id}/${JSON.parse(localStorage.getItem("Auth")).jwtToken.access_token}`)
                                            .then((data)=>{
                                                toast("Add to Series Succsessful!")
                                                Sweet.fire('Ok!')
                                            })
                                            
                                          }
                                    }} className="like-button" data-behavior="trigger-overlay" type=""><i className="fa fa-plus-circle"></i><span className="hide-text">Add to series</span></button>
                                </div>
                            </div>
                        <div className="response-count pull-right">
                            <a className="response-count" href="javascript:void(0);">0 responses</a>
                        </div>
                    </div>
                </div>
                )}

            </div>

            </div>
            <ToastContainer/>
            </div>
    )
}
MyProfile.propTypes = {
    params: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return {
        _article: state.articles.article,
        user: state.authUser.user,
        profile: state.authUser.profile,
    }
}
export default connect(mapStateToProps, {
    getUserProfile,
    follow
})(MyProfile);