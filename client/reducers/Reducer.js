import { combineReducers } from "redux";
import userReducer from '../features/userSlice';
import appReducer from '../features/appSlice';
import settingsReducer from '../features/settingsSlice'
import toggleReducer from '../features/toggleSlice'

const Reducer = combineReducers({
  user: userReducer,
  app: appReducer,
  settings: settingsReducer,
  toggle: toggleReducer
})

export default Reducer;