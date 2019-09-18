import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import FollowButton from './FollowButton'
import { 
    getUserProfile, 
    follow
} from './../redux/actions/actions'

class Contact extends Component {

    componentDidMount() {
        document.body.className = 'users shoaaaaw'
    }
    componentWillUnmount() {
        document.body.className = ''
    }
    componentWillMount() {
//this.props.getUserProfile(this.props.match.params.id)
    }

    render() {

        return ( 
            <div>
                Helll
            </div>
        );
    }
}
export default Contact