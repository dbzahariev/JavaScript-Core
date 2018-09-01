handlers.getWelcomePage = function (ctx) {
    ctx.username = sessionStorage.getItem('username')
    if (!auth.isAuth()){
        ctx.loadPartials({
            loginForm: 'templates/forms/login-form.hbs',
            registerForm: 'templates/forms/register-form.hbs',
            footer: 'templates/common/footer.hbs',
            login: 'templates/common/loginButton.hbs'
        }).then(function () {
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
    ctx.loadPartials()
        .then(function () {
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
    ctx.loadPartials().then(function () {
        this.partial('templates/forms/login-form.hbs');
    })
};
handlers.myProfile = function (ctx) {
    let userId = sessionStorage.getItem('userId')
    // ctx.usernameAvatarUrl =
    // console.log(ctx.userId)
    auth.getUser(userId).then((user) => {
        ctx.username = user
        ctx.loadPartials().then(function () {
            this.partial('templates/forms/myProfile.hbs');
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