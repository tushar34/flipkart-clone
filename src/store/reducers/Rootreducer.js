import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import Loginreducer from './Login';
import Getallproductreducer from './Product';
import Getspecificproductreducer from './Getspecificproduct';
import Addtocartreducer from './Addtocart';
import Usercartlistreducer from './Usercartlist';
const persistConfig = {
  key: 'auth',
  storage: storage,
  whitelist: ['LoginReducer','GetallproductReducer','GetspecificproductReducer','AddtocartReducer','UsercartlistReducer']
};

const rootReducer = combineReducers({
  LoginReducer: Loginreducer,
  GetallproductReducer: Getallproductreducer,
  GetspecificproductReducer:Getspecificproductreducer,
  AddtocartReducer:Addtocartreducer,
  UsercartlistReducer:Usercartlistreducer
});
export default persistReducer(persistConfig, rootReducer);

