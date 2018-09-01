const handlers = {};

$(() => {
    const app = Sammy('#container', function () {

        this.use('Handlebars', 'hbs');

        this.get('index.html', handlers.getWelcomePage);
        this.get('#/home', handlers.getWelcomePage);

        this.get('#/register', handlers.getRegisterUser)
        this.post('#/register', handlers.postRegisterUser);

        this.get('#/login', handlers.getLoginUser);
        this.post('#/login', handlers.postLoginUser);
        this.get('#/logout', handlers.logout);

        this.get('#/myProfile', handlers.myProfile)

        this.get('#/user/delete/:id', handlers.deleteUser)
        this.get('#/meme/delete/:id', handlers.deleteMeme)

        this.get('#/meme/edit/:id', handlers.editMemeGet)
    });

    app.run();
});