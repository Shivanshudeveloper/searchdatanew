import * as types from '../constants'
/* eslint no-underscore-dangle: 0 */
export const CampaignReducer = (state = { campaignItems: [] }, action) => {
  switch (action.type) {
    // create content cases
    case types.CREATE_CAMPAIGN: {
      const item = action.payload
      return {
        ...state,
        campaignItems: [...state.campaignItems, item],
        error: null,
        success: 'Campaign created succssfully',
      }
    }

    case types.CREATE_CAMPAIGN_FAIL:
      return { loading: false, error: action.payload, success: null }

    // get campaign cases
    case types.GET_CAMPAIGN:
      return { loading: false, campaignItems: action.payload, error: null }
    case types.GET_CAMPAIGN_FAIL:
      return { loading: false, error: action.payload }

    // delete campaign cases
    case types.DELETE_CAMPAIGN:
      return {
        ...state,
        campaignItems: state.campaignItems.filter(
          (x) => x._id !== action.payload
        ),
        error: null,
        success: 'Campaign deleted succssfully',
      }
    case types.DELETE_CAMPAIGN_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const GetCampaignDetailsReducer = (
  state = { campaignDetails: {} },
  action
) => {
  switch (action.type) {
    case types.GET_CAMPAIGN_DETAILS:
      return { campaignDetails: action.payload, error: null }
    case types.GET_CAMPAIGN_DETAILS_FAIL:
      return { error: action.payload }
    default:
      return state
  }
}
