const ajax_host = 'http://backend.collabor8.edu'

export const ajaxRequest = (url, authInfo, params) => {
    let $ = window.jQuery

    if(!params) params = {}
    params.data = Object.assign({}, params.data, {authId: authInfo.authId, authMethod: authInfo.method})

    params.data.authInfo = authInfo

    $.ajax(ajax_host + url, params)
}