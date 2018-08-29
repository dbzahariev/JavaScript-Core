function showHideLinks() {
    hideAllLinks();
    if (sessionStorage.getItem("authoToken")){
        $('#linkflights').show()
        $('#linkLogout').show()
    } else {
        $('#linkLogin').show()
        $('#linkRegister').show()
    }
}

function hideAllViews() {
    $('#container > section').hide()
    // $('#viewRegister').hide()
    // $('#viewLogin').hide()
    // $('#viewCatalog').hide()
    // $('#viewAddFlight').hide()
    // $('#viewFlightDetails').hide()
    // $('#viewEditFlight').hide()
    // $('#viewMyFlights').hide()
}

function attachEvents() {
    $('#linkFlights').on('click', function () {
        hideAllViews()
        $('#viewMyFlights').show()
    })
    $('#linkHome').on('click', function () {
        hideAllViews()
        $('#viewCatalog').show()
    })
    $('#linkLogin').on('click', function () {
        hideAllViews()
        $('#viewLogin').show()
    })
    $('#linkRegister').on('click', function () {
        hideAllViews()
        $('#viewRegister').show()
    })
    $('#linkLogout').on('click', function () {
        //TODO:
    })
}

function hideAllLinks() {
    $('#linkFlights').hide();
    $('#linkLogin').hide();
    $('#linkRegister').hide();
    $('#linkLogout').hide()
}