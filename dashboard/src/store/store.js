import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  CampaignReducer,
  GetCampaignDetailsReducer,
} from './reducers/campaignReducers'

const reducer = combineReducers({
  campaigns: CampaignReducer,
  campaign: GetCampaignDetailsReducer,
})

const campaignItemsFromStorage = sessionStorage.getItem('campaignItems')
  ? JSON.parse(sessionStorage.getItem('campaignItems'))
  : []

const initialState = {
  campaigns: { campaignItems: campaignItemsFromStorage },
}
const middleware = [thunk]
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
