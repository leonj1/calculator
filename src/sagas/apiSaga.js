import { all, call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios';
import { START_CREATE_SECRET, START_FETCH_SECRET, SUCCESS_CREATE_SECRET, FAILED_CREATE_SECRET, SUCCESS_FETCH_SECRET, FAILED_FETCH_SECRET } from '../redux/actions';

// worker Saga: will be fired on START_CREATE_SECRET actions
function* createSecret(action) {
   try {
      const token = yield call(axios.post, "https://peekaboo-api.3camels.us/secrets", action.payload);
      let value = "";
      if (token) {
          value = token.data;
      }
      yield put({type: SUCCESS_CREATE_SECRET, token: value});
   } catch (e) {
      yield put({type: FAILED_CREATE_SECRET, current: e.message});
   }
}

// worker Saga: will be fired on START_FETCH_SECRET actions
function* fetchSecret(action) {
   try {
      const contents = yield call(axios.get, "https://peekaboo-api.3camels.us/secrets/" + action.payload);
      let value = "";
      if (contents) {
          value = contents.data;
      }
      yield put({
          type: SUCCESS_FETCH_SECRET,
          payload: {
              contents: value,
              request: {
                  status: contents.status,
                  reason: contents.statusText
              }
          }
      });
   } catch (e) {
      yield put({
          type: FAILED_FETCH_SECRET,
          request: {
              status: e.response.status,
              reason: e.response.data
          }
      });
   }
}

const createSecretSaga = takeLatest(START_CREATE_SECRET, createSecret);
const fetchTokenSaga = takeLatest(START_FETCH_SECRET, fetchSecret);

function* rootSaga() {
    yield all([
        fetchTokenSaga,
        createSecretSaga
    ])
}

export default rootSaga;
