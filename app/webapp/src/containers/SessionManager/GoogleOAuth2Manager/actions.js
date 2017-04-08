// import {} from './constants';

export const GM_SET_GAUTH2 = 'GM_SET_GAUTH2'
export const GM_UPDATE_AUTHID = 'GM_UPDATE_AUTHID'

export const setGAuth2 = (auth2) => ({
    type: GM_SET_GAUTH2,
    auth2
})

export const updateAuthId = (authId) => ({
    type: GM_UPDATE_AUTHID,
    authId
})
