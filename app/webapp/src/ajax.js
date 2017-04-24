const ajax_host = 'http://backend.collabor8.edu/api'

export const ajaxRequest = (url, authInfo, params) => {
    let $ = window.jQuery

    if (!params) params = { data: {} }
    
    const { authToken, authMethod } = authInfo ? authInfo : { authToken: 0, authMethod: ''}
    params.data = Object.assign({}, params.data, {authToken, authMethod})

    $.ajax(ajax_host + url, params)
}

export default ajaxRequest