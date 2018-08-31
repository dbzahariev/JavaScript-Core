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
                notify.showInfo()
            })
    }
}