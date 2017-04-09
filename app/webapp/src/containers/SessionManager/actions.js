// import {} from './constants';

export const deleteSession = (error) => {
    return updateSession('', 0, {}, false, error)
}

export const updateSession = (method, authId, user, signedIn = true, error) => ({
    type: 'UPDATE_SESSION',
    session: {
        authInfo: {
            method,
            authId
        },
        signedIn,
        user,
        error
    }
})