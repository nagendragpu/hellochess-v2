import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import ReactTimeout from 'react-timeout';

import SearchBar from '../components/search_bar';
import TwoBoard from '../components/two_board';
import ChatViewer from '../containers/chat_viewer';
import NewGame from '../components/new_game';
import AvailableRooms from '../components/available_rooms';
import { logout, saveUsername, clearError, userConnect} from '../actions'

class Live extends Component {

    constructor(props) {
        super(props);

        this.state = {
            usernameInput: '',
            errorMessage: '',
        }

        this.onInputChange = this.onInputChange.bind(this);
        this.saveUsername = this.saveUsername.bind(this);
        this.saveUsername = this.saveUsername.bind(this);
    }

    componentWillMount() {
        this.props.userConnect(this.props.profile);    //Connect the user to the server
    }

    logout() {
        this.props.logout();
        browserHistory.replace('/')
    }

    onCloseError(event) {
        console.log(this.props);
    }

    saveUsername(event) {
        const username = this.state.usernameInput;
        if(username.length > 3) {
            this.props.saveUsername(this.props.profile._id, username);
        }
        event.preventDefault();
    }

    onInputChange(event) {
        this.setState({usernameInput: event.target.value})
    }

    renderInputUsername() {
        if(!this.props.profile.username) {
            return (
                <ModalContainer >
                  <ModalDialog>
                      <form onSubmit={this.saveUsername} >
                          <h2>Enter a username</h2>
                          <input
                              value={this.state.usernameInput}
                              onChange={this.onInputChange}
                              className="form-control"
                              placeholder="Type here..."/>
                          <button
                              type="submit"
                              className="btn btn-warning btn-save-username float-xs-right">
                              Save
                         </button>
                     </form>
                  </ModalDialog>
                </ModalContainer>
            );
        }
    }

    render() {

        if(this.props.connection.error) {
            return <div>
                <ModalContainer >
                  <ModalDialog>
                      Multiple Logins detected!
                  </ModalDialog>
                </ModalContainer>
            </div>
        }

        if(!this.props.profile) {
            return (
                <div>Loading...</div>
            )
        }

        if(!this.props.connection.status) {
            return <div>Attempting to connect!</div>
        }
        else {
            return (
                <div id="main-panel">
                    { this.renderInputUsername() }

                    <div className="row flex-items-xs-right">

                        <div className="col-xs-10 col-md-6 col-lg-4">
                            <SearchBar/>
                        </div>
                        <div className="col-xs-2 col-md-4 col-lg-4">
                            <div className="dropdown float-xs-right">
                                <a className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <img id="profile-pic" className="img-fluid rounded-circle" src={this.props.profile.picture} alt="" />
                                </a>

                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
                                    <a className="dropdown-item" onClick={this.logout.bind(this)} href="#">Logout</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="wrapper" className="row">
                        <div id="chatbox-wrapper" className="hidden-sm-down col-md-4 col-lg-6">
                            <ChatViewer username=""/>
                        </div>
                        <div id="right-side-wrapper" className="col-sm-12 col-md-8 col-lg-6 text-xs-center">
                            <div id="top-btns-wrapper" className="row flex-items-xs-center">
                                <NewGame/>
                            </div>
                            <div id="board-wrapper" className="row flex-items-xs-center">
                                <div className="col-xs-10 col-sm-10 col-md-8 col-lg-7">
                                    <TwoBoard/>
                                </div>
                            </div>
                            <div id="right-bottom-wrapper" className="row flex-items-xs-center">
                                <AvailableRooms/>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

    }
}
function mapStateToProps(state) {
    return {
        profile: state.auth.profile,
        connection: state.connection,
    }
}

Live = ReactTimeout(Live);

export default connect (mapStateToProps, {logout, saveUsername, clearError, userConnect}) (Live);