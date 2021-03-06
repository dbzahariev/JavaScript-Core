handlers.getWelcomePage = function (ctx) {
    ctx.loadPartials({
        loginForm: './templates/forms/login-form.hbs',
        registerForm: './templates/forms/register-form.hbs',
        footer: './templates/common/footer.hbs'
    })
        .then(function () {
            this.partial('./templates/login-form.hbs')
        })
}

handlers.registerUser = function (ctx) {
    const username = ctx.params.username
    const password = ctx.params.password
    const passwordCheck = ctx.params.passwordCheck

    if (username.length < 5) {
        notify.showError('Username must be at least 5 symbols long!')
    } else if (password.length === 0) {
        notify.showError('Password must be non-empty!');
    } else if (password !== passwordCheck) {
        notify.showError('Both passwords must match')
    } else {
        auth.register(username, password)
            .then((userData) => {
                auth.saveSession(userData)
                notify.showInfo('User registration successful.')
            })
            .catch(notify.handleError)
    }
}
handlers.loginUser = function (ctx) {
    const username = ctx.params.username
    const password = ctx.params.password

    if (username.length===0 || password.length===0) {
        notify.showError('Both is required!')
    } else {
        auth.login(username, password)
            .then((userData) => {
                auth.saveSession(userData)
                notify.showInfo('Login successful.')
                ctx.redirect('#/editor')
            }).catch(notify.handleError)
    }
}
handlers.logout = function (ctx) {
    auth.logout()
        .then(() => {
            sessionStorage.clear()
            notify.showInfo('Logout successful.')
            ctx.redirect('#/home')
        })
}