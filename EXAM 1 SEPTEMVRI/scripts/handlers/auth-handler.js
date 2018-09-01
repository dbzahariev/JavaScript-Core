handlers.getWelcomePage = function (ctx) {
    ctx.username = sessionStorage.getItem('username')
    if (!auth.isAuth()){
        ctx.loadPartials({
            loginForm: 'templates/forms/login-form.hbs',
            registerForm: 'templates/forms/register-form.hbs',
            footer: 'templates/common/footer.hbs',
            login: 'templates/common/loginButton.hbs',
            header: 'templates/common/header-empty.hbs',
        }).then(function () {
            this.partial.username = sessionStorage.getItem('username');
            this.partial('templates/login-form-login.hbs');
        })
    } else {
        ctx.loadPartials({
            header: 'templates/common/header.hbs',
            loginForm: 'templates/forms/login-form.hbs',
            registerForm: 'templates/forms/register-form.hbs',
            footer: 'templates/common/footer.hbs',
        }).then(function () {
            this.partial.username = sessionStorage.getItem('username');
            this.partial('templates/login-form.hbs');
        })
    }
};
handlers.getRegisterUser = function (ctx) {
    ctx.username = sessionStorage.getItem('username')
    ctx.loadPartials({
        header: 'templates/common/header-empty.hbs',
        footer: 'templates/common/footer.hbs'
    })
        .then(function () {
            this.partial.username = sessionStorage.getItem('username');
            this.partial('templates/forms/register-form.hbs');
        })
};
handlers.postRegisterUser = function (ctx) {
    const username = ctx.params.username;
    const password = ctx.params.password;
    const passwordCheck = ctx.params.repeatPass;
    const email = ctx.params.email;
    const avatarUrl = ctx.params.avatarUrl;


    if(username.length <= 2){
        notify.showError('Username must be at least 3 symbols long!');
    } else if (password.length <= 5) {
        notify.showError('Password must be at least 6 symbols long!');
    } else if (password !== passwordCheck) {
        notify.showError('Both passwords must match!');
    } else {
        auth.register(username, password, email, avatarUrl)
            .then((userData) => {
                auth.saveSession(userData);
                notify.showInfo('User registration successful.');
                ctx.redirect('#/home');
            })
            .catch(notify.handleError)
    }
};
handlers.postLoginUser = function (ctx) {
    const username = ctx.params.username;
    const password = ctx.params.password;

    if (username.length === 0) {
        notify.showError('Username is requried!');
    } else if (password.length === 0) {
        notify.showError('Password is requried!');
    } else {
        auth.login(username, password)
            .then((userData) => {
                auth.saveSession(userData);
                notify.showInfo('Login successful.');
                ctx.redirect('#/home');
            })
            .catch(notify.handleError);
    }
};
handlers.getLoginUser = function (ctx) {
    ctx.username = sessionStorage.getItem('username')
    ctx.loadPartials({
        header: 'templates/common/header-empty.hbs',
        footer: 'templates/common/footer.hbs'
    }).then(function () {
        this.partial.username = sessionStorage.getItem('username');
        this.partial('templates/forms/login-form.hbs');
    })
};
handlers.myProfile = function (ctx) {
    let userId = sessionStorage.getItem('userId')
    auth.getUser(userId).then((user) => {
        ctx.username = user

        auth.getMemesByUserName(ctx.username.username).then((memes) => {
            ctx.memes = memes
            ctx.username = sessionStorage.getItem('username')
            ctx.loadPartials({
                header: 'templates/common/header.hbs',
                footer: 'templates/common/footer.hbs',
                memeList: 'templates/forms/memeList.hbs',
            }).then(function () {
                this.partial.username = sessionStorage.getItem('username');
                this.partial('templates/forms/myProfile.hbs');
            })
        })
    })
}

handlers.deleteUser = function(ctx) {
    auth.deleteUser(sessionStorage.getItem('userId')).then((res)=>{
        sessionStorage.clear()
        ctx.redirect('#/home');
    })
}

handlers.deleteMeme = function(ctx) {
    let memeId = ctx.params.id
    console.log(memeId)
    auth.deleteMeme(memeId).then(() => {
        ctx.redirect('#/home');
    })
}

handlers.editMemeGet = function(ctx) {
    ctx.username = sessionStorage.getItem('username')
    let memeId = ctx.params.id
    auth.getOneMemeById(memeId).then((res) => {
        ctx.loadPartials({
            header: 'templates/common/header.hbs',
            footer: 'templates/common/footer.hbs'
        }).then(function () {
            ctx.title = res.title
            ctx.description = res.description
            ctx.imageUrl = res.imageUrl
            this.partial.username = sessionStorage.getItem('username');
            this.partial('templates/forms/meme-edit.hbs');
        })
    })

}

handlers.logout = function (ctx) {
    auth.logout()
        .then(() => {
            sessionStorage.clear();
            notify.showInfo('Logout successful.');
            ctx.redirect('#/home');
        })
};