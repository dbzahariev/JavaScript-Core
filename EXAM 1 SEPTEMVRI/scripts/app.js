const handlers = {};

$(() => {
    // Define routes here using Sammy.js
    const app = Sammy('#container', function () {

        this.use('Handlebars', 'hbs');

        this.get('index.html', handlers.getWelcomePage);
        this.get('#/home', handlers.getWelcomePage);

        this.get('#/register', handlers.getRegisterUser)
        this.post('#/register', handlers.postRegisterUser);

        this.get('#/login', handlers.getLoginUser);
        this.post('#/login', handlers.postLoginUser);
        this.get('#/logout', handlers.logout);

        this.get('#/editor', handlers.getEditor);
        this.post('#/entry/create', handlers.createEntry);
        this.post('#/entry/delete', handlers.deleteEntry);
        this.post('#/checkout', handlers.checkout);

        this.get('#/overview', handlers.getMyReceipts);
        this.get('#/receipt/details/:id', handlers.getReceiptDetails);
    });

    app.run();
});