function showHideLinks() {
    hideAllLinks();
    if (sessionStorage.getItem("authToken")){
        $('#linkFlights').show()
        $('#linkLogout').show()
    } else {
        $('#linkLogin').show()
        $('#linkRegister').show()
    }
}

function hideAllViews() {
    $('#container > section').hide()
    $('#viewRegister').hide()
    $('#viewLogin').hide()
    $('#viewCatalog').hide()
    $('#viewAddFlight').hide()
    $('#viewFlightDetails').hide()
    $('#viewEditFlight').hide()
    $('#viewMyFlights').hide()
}

function attachEvents() {
    $('#linkHome').on('click', function () {
        hideAllViews()
        $('#viewCatalog').show()
    })
    $('#linkFlights').on('click', async function() {
        hideAllViews()
        let flights = await kinveyRequester.getMyFlights()
        renderMyFlights(flights)
        $('#viewMyFlights').show()
    })
    $('#linkLogin').on('click', function () {
        hideAllViews()
        $('#viewLogin').show()
    })
    $('#linkRegister').on('click', function () {
        hideAllViews()
        $('#viewRegister').show()
    })
    $('#viewCatalog > ').on('click', function () {
        hideAllLinks()
        $('#viewAddFlight').show()
    })
}

async function showHomeView() {
    let myUsername = sessionStorage.getItem("username")
    $('#linkLogout > span').text("Welcome, " + myUsername + '!')
    hideAllViews()
    $('#viewCatalog > div > a').remove()
    if (myUsername) {
        let flights = await kinveyRequester.getAllPublicFlight()
        renderHomeView(flights)
        $('#viewCatalog').show()
        $('#viewCatalog > a').show()
    } else {
        $('#viewCatalog > a').hide()
    }
}

function hideAllLinks() {
    $('#linkFlights').hide();
    $('#linkLogin').hide();
    $('#linkRegister').hide();
    $('#linkLogout').hide()
}