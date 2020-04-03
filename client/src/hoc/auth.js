import React, { Component } from 'react';

// ===================================
//  Load Style
// ===================================
import './../resources/custom/preloader.scss';

// ===================================
//  Load Redux Connection & Auth Check
// ===================================
import { auth } from '../redux/actions/user_actions';
import { connect } from 'react-redux';

export default function(ComposedClass, reload){

	class AuthenticationCheck extends Component {
        _isMounted = true;
		state = {
			loading: true
		} 
		componentDidMount(){

			/* -----------------------------
			||---@Check Auth Dispatch
			------------------------------*/
			this.props.dispatch(auth()).then( response => {
				let user = this.props.user.userData;
				
				/* -------------------------------------
				||---@Config Super Admin Registration
				--------------------------------------*/
				if(user.config === "superadmin"){
					this.props.history.push('/config');
				}

				/* -----------------------------
				||---@Get User Data To Check &
				||---@Redirect to Page
				------------------------------*/
                if(!user.isAuth){
                    if(reload){
                        this.props.history.push('/login');
                    }
                }else{
                    if(reload === false){
                        this.props.history.push('/dashboard');
                    }
                }
                if (this._isMounted) {
                    this.setState({ loading: false })
                }
            })
        }
        componentWillUnmount(){
            this._isMounted = false;
		} 
		
		/* -----------------------------
		||---@Load Component Class
		----------------------------- */
		render(){

			if (this.state.loading) {
				/* -----------------------------
				||---@Use PreLoader
				------------------------------*/
				return (
					<div className="preloader_waper d-flex align-items-center justify-content-center">
						<div className="preloader"></div>
					</div>
				)
			}

			return(
				<ComposedClass {...this.props} user={this.props.user} />
			)
		}

	}

	function mapStateToProps(state){
		return {
			user:state.user
		}
	}

	return connect(mapStateToProps)(AuthenticationCheck)

}