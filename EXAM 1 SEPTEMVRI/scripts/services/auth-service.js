let auth = (() => {
    function isAuth() {
        return sessionStorage.getItem('authtoken') !== null;
    }

    function getUser(userId) {
        return remote.get('user', '_me', 'kinvey');
    }

    function getMemesByUserName(userName) {
        return remote.get('appdata',`memes?query={"creator":"${userName}"}&sort={"_kmd.ect": -1}`)
    }

    function saveSession(userData) {
        sessionStorage.setItem('authtoken', userData._kmd.authtoken);
        sessionStorage.setItem('username', userData.username);
        sessionStorage.setItem('userId', userData._id);
    }

    function register (username, password, email, avatarUrl) {
        let obj = { username, password, email, avatarUrl };

        return remote.post('user', '', 'basic', obj);
    }

    function login(username, password) {
        let obj = { username, password };

        return remote.post('user', 'login', 'basic', obj)
    }

    function logout() {
        return remote.post('user', '_logout', 'kinvey');
    }

    function deleteUser(userId) {
        return remote.remove('user', userId, 'kinvey')
    }

    function deleteMeme(memeId) {
        return remote.remove('appdata',`memes/${memeId}`,'kinvey')
    }

    function editMeme(memeId, data) {
        return remote.update('appdata',`memes/${memeId}`,'kivey', data )
    }

    function getOneMemeById(memeId) {
        return remote.get('appdata', `memes/${memeId}`, 'kinvey')
    }

    return {
        isAuth,
        login,
        logout,
        register,
        saveSession,
        getUser,
        deleteUser,
        getMemesByUserName,
        deleteMeme,
        editMeme,
        getOneMemeById,

    }
})();