import { connect } from 'react-redux';

import LoginPage from './LoginPage';
import {login, register} from '../store/actions.js';
import history from '../history.js';
import store from '../store/store.js';
import {STATUS} from '../web.js';


const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (evt, ref) => {
      var username = ref.current[0].value;
      var password = ref.current[1].value;
      dispatch(login(username, password));
      setTimeout(() => {
        if (store.getState().auth.authStatus === STATUS.SUCCESS) {
          history.push('/browse')
        }
      }, 500);
    },
    onRegister: (evt, ref) => {
      var username = ref.current[0].value;
      var password = ref.current[1].value;
      var email = ref.current[2].value;
      dispatch(register(username, email, password));
      setTimeout(() => {
        if (store.getState().auth.authStatus === STATUS.SUCCESS) {
          history.push('/browse')
        }
      }, 500);
    },
  }
}

const LoginManager = connect(mapStateToProps, mapDispatchToProps)(LoginPage);

export default LoginManager;
