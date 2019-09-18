import React, { Component } from 'react';
import { connect } from 'react-redux';
import MediumEditor from 'medium-editor';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { 
    getArticle, 
    clap,
    follow
} from './../redux/actions/actions'
import PropTypes, { number } from 'prop-types'
import FollowButton from './FollowButton'
import './../../node_modules/medium-editor/dist/css/medium-editor.min.css'
import '../assets/article.css'
const _url = process.env.NODE_ENV === 'production' ? "/api/" : "http://localhost:5000/api/"

const mapStateToProps = state => {
    return {
        _article: state.articles.article,
        user: state.authUser.user, 
        isAuth: state.authUser.isAuth  
    }
}
function Comments(){
    return({
    })
}
class ArticleView extends Component {
    constructor () {
        super()
        this.state = {
          name: '',
          comment: '',
        }
        this.handelComment=this.handelComment.bind(this)
        this.countComments = this.countComments.bind(this)
        this.showComments = this.showComments.bind(this)
        this.loginOnComment = this.loginOnComment.bind(this)
    }
    sucsNofi = ()=>toast("Thanks For Your Comment!!!")
    componentDidMount() {
        if(this.props.user._id !=null)
            document.getElementById("editor-title").value = this.props.user.name||""
        document.body.className = 'posts show'
        const editor = new MediumEditor(/*dom, */".medium-editable",{ 
            autoLink: true,
            delay: 1000,
            targetBlank: true,
            toolbar: {
                buttons: [
                  'bold', 
                  'italic', 
                  'quote', 
                  'underline', 
                  'anchor', 
                  'h1',
                  'h2', 
                  'h3',
                  'h4',
                  'h5',
                  'h6',
                  'strikethrough',
                  'subscript',
                  'superscript',
                  'pre',
                  'image',
                  'html',
                  'justifyCenter'
                ],
                diffLeft: 25,
                diffTop: 10,
            },
            anchor: {
                placeholderText: 'Type a link',
                customClassOption: 'btn',
                customClassOptionText: 'Create Button'
            },
            paste: {
                cleanPastedHTML: true,
                cleanAttrs: ['style', 'dir'],
                cleanTags: ['label', 'meta'],
                unwrapTags: ['sub', 'sup']
            },
            anchorPreview: {
                hideDelay: 300
            },
            placeholder: {
                text: 'Tell us your felling...'
            }
          /*
          placeholder: { text: "Tell your Story ...", hideOnClick: true },
          toolbar: {
            buttons: ['bold', 'italic']
          } */
        })
        editor.subscribe('editableInput', (ev, editable) => {

        })
    }

    componentWillMount() {
        this.props.getArticle(this.props.match.params.id)
        
    }    
    countComments(){
        let a=this.props._article.comments
        if(a){
            let count = a.length.toString()
           return(count)
           }
        else return '0'
    }
    showComments = (comments)=>{
       if(comments){
        return comments.map((comment)=>{
            return(
            <div>
                <div className="post-metadata">
                    <img alt={comment.author.name} className="avatar-image" src={comment.author.provider_pic} height="40" width="40" />
                    <div className="post-info">
                        <div data-react-className="PopoverLink" data-react-props="{&quot;user_id&quot;:608,&quot;url&quot;:&quot;/users/netk&quot;,&quot;children&quot;:&quot;netk&quot;}"><span className="popover-link" data-reactroot=""><a href={`/profile/${comment.author._id}`}>{comment.author.name}</a></span></div>
                        <small>Member</small>
                    </div>
                </div>
                <div style={{paddingTop:'5px',paddingLeft:'10%', fontSize:'18pt'}}>
                <p className=""dangerouslySetInnerHTML={{__html: comment.text}}/>
                </div>
            </div>
            )
        })
        }
    }
    handelComment(){
      let name=  document.getElementById("editor-title").value;
      let comment = document.getElementById("medium-editable").value;
      if(comment==""||name==""||comment.length>1000)
      alert("You missing something or your comment too long!!!! ");
      else{
        const formdata = new FormData()
        formdata.append('article_id',this.props.match.params.id)
        formdata.append('name',this.props.user._id||document.getElementById("editor-title").value)
        formdata.append('comment',comment)
        axios.post(`${_url}article/comment/`, /*{
    text: this.state.text,Z
    title: document.getElementById('editor-title').value,
    claps: 0,
    description: this.state.description,
    feature_img: this.state.imgSrc,
    author_id: this.props.user._id
  }*/formdata).then((res) => {
    this.sucsNofi()
    this.setState({})
    console.log(res.data)
  }).catch((err)=>{})
      }
    }
    loginOnComment(){
        document.getElementById("login").click()
    }
    componentWillUnmount() {
        document.body.className = ''
    }

    render() {
        const { text, claps, title, feature_img, author } = this.props._article
        let author_name, author_img, author_id
        if (author) {
            const { name, provider_pic, _id } = author
            author_name = name
            author_id = _id
            author_img = provider_pic
        }
        return ( 
                <div>
                <div className="container-fluid main-container">
                <div className="row animated fadeInUp" data-animation="fadeInUp-fadeOutDown">
                    <div id="main-post" className="col-xs-10 col-md-8 col-md-offset-2 col-xs-offset-1 main-content">

                        <div className="pull-right">
                            {this.props.user ? <FollowButton user={`${this.props.user.following}`} to_follow={`${author_id}`} /> : ''}
                        </div>

                        <div className="post-metadata">
                            <img alt={author_name} className="avatar-image" src={author_img} height="40" width="40" />
                            <div className="post-info">
                                <div data-react-className="PopoverLink" data-react-props="{&quot;user_id&quot;:608,&quot;url&quot;:&quot;/users/netk&quot;,&quot;children&quot;:&quot;netk&quot;}"><span className="popover-link" data-reactroot=""><a href={`/profile/${author_id}`}>{author_name}</a></span></div>
                                <small>Published • nice story</small>
                            </div>
                        </div>


                        {!feature_img || !feature_img.length > 0 ? '' : <div className="post-picture-wrapper">
                            <img src={feature_img} alt="feature img 540" />
                        </div> }

                        <h3 className="title">{title}</h3>
                        <div className="body" style={{ margin:'0 auto',fontFamily:'medium-content-serif-font, Georgia, Cambria, "Times New Roman", Times, serif;'}}>
                            <p></p>
                            <p style={{fontSize:"20px"}} className="" dangerouslySetInnerHTML={{__html: text}}>
                            </p>
                            <p></p>
                        </div>

                        <div className="post-tags">
                            <a className="tag" href="">Story</a>
                            <a className="tag" href="">Community</a>
                        </div>

                        <div className="post-stats clearfix">
                            <div className="pull-left">
                                <div className="like-button-wrapper">
                                    <button onClick={() => this.props.clap(this.props._article._id)} className="like-button" data-behavior="trigger-overlay" type="submit">
                                    <i className="fa fa-heart-o"></i><span className="hide-text">Like</span>
                                    </button>
                                     <span className="like-count">{claps}</span>
                                </div>

                            </div>
                            <div className="pull-left">
                                <a className="response-icon-wrapper" href="#">
                                    <i className="fa fa-comment-o"></i>
                                    <span className="response-count" data-behavior="response-count">{this.countComments()}</span>
                                </a>
                            </div>

                            <div className="pull-right">
                                <div className="bookmark-button-wrapper">
                                    <form className="button_to" method="get" action=""><button className="bookmark-button" data-behavior="trigger-overlay" type="submit">      <span className="icon-bookmark-o"></span><span className="hide-text">Bookmark</span></button>
                                    </form>
                                </div>

                            </div>
                        </div>
                        <div className="author-info">
                            <div clas="author-metadata">
                                <img alt={author_name} className="avatar-image" src={author_img} height="50" width="50" />
                                <div className="username-description">
                                    <h4>{author_name}</h4>
                                    <p>Author</p>
                                </div>
                            </div>
                            {this.props.user ? <FollowButton user={`${this.props.user.following}`} to_follow={`${author_id}`} /> : ''}
                        </div>
                        <div></div>
                        <div className="comment"  id="comment">
                            Comments: 
                        </div>
                        <div className="boder-comment">
                           {this.showComments(this.props._article.comments)}
                        </div>
                        {this.props.isAuth?<div>
                        <form className="editor-form main-editor" autocomplete="off"  style={{paddingLeft:'20px'}}>

                                                <div className="form-group">
                                                <textarea col="1" className="editor-title" id="editor-title" /*value={this.state.title}*/ placeholder="Your Name"></textarea>
                                                </div>

                                                <div className="form-group" contenteditable data-placeholder="Click me and start typing!">
                                                <textarea id="medium-editable" className="medium-editable" maxLength="20" ></textarea>
                                                </div>
                                                <div className="btn-right" onClick={()=>{console.log("Ok")}}>
                                                    <a onClick={this.handelComment} className="button green-border-button follow-button" >Comment!</a>
                                                </div>

                        </form>
                        </div>:<div className="btn-login-comment" onClick={()=>{console.log("Ok")}}>
                                                    <a onClick={this.loginOnComment} className="button green-border-button follow-button" >Login to Comment!</a>
                                                </div>}
                    </div>
                </div>

                <div className="post-show-footer row animated fadeInUp" data-animation="fadeInUp-fadeOutDown">
                    <div className="col-xs-10 col-md-6 col-xs-offset-1 col-md-offset-3 main-content related-stories">
                        <h4 className="small-heading">Related stories</h4>
                        <div className="post-list-item">
                            <div className="flex-container">
                                <div className="avatar-wrapper">
                                    <img alt="" className="avatar-image" src={author_img} height="40" width="40" />
                                </div>
                                <div className="post-info">
                                    <strong className="pli-title"><a href="#">This</a></strong><br/>
                                    <small className="pli-username"><a href="#">Sone</a></small>
                                </div>
                            </div>
                            
                        </div>

                    </div>

                    <div id="responses" className="col-xs-10 col-md-6 col-xs-offset-1 col-md-offset-3 main-content">
                        <h4 className="small-heading">Responses</h4>

                        <div data-behavior="responses-list">
                        </div>
                    </div>
                </div>

                <div className="post-metadata-bar" data-page="post-metadata-bar">
                    <div className="flex-container is-inView" data-behavior="animated-metadata">
                        <div className="post-stats flex-container">
                            <div className="like-button-wrapper">
                                <div className="button_to"><button onClick={() => this.props.clap(this.props._article._id)} className="like-button" data-behavior="trigger-overlay" ><i className="fa fa-heart-o">&nbsp;</i><span className="like-count">{claps}</span><span className="hide-text">Like</span></button>
                                </div> 
                            </div>


                            <div className="div-comment">
                                <a className="response-icon-wrapper"  onClick={()=>{
                                    document.getElementById("comment").scrollIntoView()
                                }}>
                                    <i className="fa fa-comment-o"></i>
                                    <span className="response-count" data-behavior="response-count">{this.countComments()}</span>
                                </a>
                            </div>
                                
                            <div className="bookmark-button">
                                <div className="bookmark-button-wrapper">
                                    <form className="button_to" method="get" action=""><button className="bookmark-button" data-behavior="trigger-overlay" type="submit">      <span className="icon-bookmark-o"></span><span className="hide-text">Bookmark</span></button>
                                    </form>
                                </div>

                            </div>
                            <div className="btn-right" onClick={()=>{console.log("Ok")}}>
                                                    <a onClick={()=>{document.getElementById("main-post").scrollIntoView()}} className="button green-border-button follow-button" >Back To Top</a>
                            </div>
                        </div>
                        <div className="metabar-author-info flex-container flex-space-btw">
                        <div className="post-metadata">
                            <img alt={author_name} className="avatar-image" src={author_img} height="40" width="40" />
                            <div className="post-info">
                                <div data-react-className="PopoverLink" data-react-props="{&quot;user_id&quot;:608,&quot;url&quot;:&quot;/users/netk&quot;,&quot;children&quot;:&quot;netk&quot;}"><span className="popover-link" data-reactroot=""><a href={`/profile/${author_id}`}>{author_name}</a></span></div>
                                <small>Author</small>
                            </div>
                        </div>
                            <div data-react-className="UserFollowButton" >
                                {this.props.user ? <FollowButton user={`${this.props.user.following}`} to_follow={`${author_id}`} /> : ''}
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                <ToastContainer />
                </div>
        );
    }
}
/*function mapStateToProps (state, ownProps) {
    const article_id = ownProps.match.params.id
    let article = {}
    state.articles.articles.forEach((_article)=>{
        if(article_id == _article._id) {
            article = _article
        }
    })
    return { article }
}*/
ArticleView.propTypes = {
    params: PropTypes.object.isRequired,
}
export default connect(mapStateToProps, { 
    getArticle,
    clap,
    follow
})(ArticleView);