const ajax_host = 'http://backend.collabor8.edu/api'

export const ajaxRequest = (url, authInfo, params) => {
    let $ = window.jQuery

    if (!params) params = { data: {} }
    
    const { authId, authMethod } = authInfo ? authInfo : { authId: 0, authMethod: ''}

    params.data = Object.assign({}, params.data, {authId, authMethod})

    params.data.authInfo = authInfo

    $.ajax(ajax_host + url, params)
}