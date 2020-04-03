import { combineReducers } from 'redux';
import user from './user_reducer';
import media from './media_reducer';

const rootReducer = combineReducers({
    user,
    media
})

export default rootReducer;