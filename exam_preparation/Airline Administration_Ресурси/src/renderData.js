function renderHomeView(flights) {
    for (const flight of flights) {
        let a = $(`<a href="#" class="add-flight"></a>`).on('click', function () {
            //TODO:
        })
        a.append($(`<img src="${flight.img}" alt='' class="picture-added-flight">`))
        a.append($(`<h3>${flight.destination}</h3>`))
        a.append($(`<span>from ${flight.origin}</span><span>${flight.departureDate}</span>`))
        $('#viewCatalog > div').append(a)
    }
}

function renderDetailsView(flight) {
    hideAllViews()
    $('#viewFlightDetails').show()
    $('#viewFlightDetails').empty()
    let mainDiv = $(`<div clss="ticket-area"></div>`)
    mainDiv.append($(`<div class="ticket-area-left"><img src="${flight.img}" alt=""></div>`))
    let innerDiv = $(`<div class="ticket-area-right"></div>`)
    innerDiv.append($(`<h3>${flight.destination}</h3><div>from ${flight.origin}</div>`))
    let mostInnerDiv = $(`<div class="data-and-time">${flight.departureDate} ${flight.departureTime}</div>`)
    if (sessionStorage.getItem('userId') === flight._acl.creator) {
        mostInnerDiv.append($(`<a href="#" class="edit-flight-detail"></a>`)).on('click', function () {
            // TODO:
        })
    }
    innerDiv.append(mostInnerDiv)
    innerDiv.append($(`<div>${flight.seats} Seats (${flight.cost} per seat)</div>`))
    mainDiv.append(innerDiv)
    $('#viewFlightDetails').append(mainDiv)
}

function renderEditView(flight) {
    hideAllViews()
    $('#viewEditFlight').show()
    $('#viewEditFlight').attr('flightId', flight._id)
    $("#formAddFlight input[name=destination]").val(flight.destination)
    $("#formAddFlight input[name=origin]").val(flight.origin)
    $("#formAddFlight input[name=departureDate]").val(flight.departureDate)
    $("#formAddFlight input[name=departureTime]").val(flight.departureTime)
    $("#formAddFlight input[name=seats]").val(flight.seats)
    $("#formAddFlight input[name=cost]").val(flight.cost)
    $("#formAddFlight input[name=img]").val(flight.img)
    $("#formAddFlight input[type=checkbox]").val(flight.isPublic)
}

function renderMyFlights(flights) {
    $('#viewMyFlights > div').remove()
    for (const flight of flights) {

        let mainDiv = $(`<div class="flight-ticket"></div>`)
        mainDiv.append($(`<div class="flight-left"><img src="${flight.img}" alt=""></div>`))
        let innerDiv = $(`<div class="flight-right"></div>`)
        innerDiv.append($(`<div><h3>${flight.destination}</h3><span>${flight.departureDate}</span></div>`))
        innerDiv.append($(`<div>from ${flight.origin} <span>${flight.departureTime}</span></div>`))
        innerDiv.append($(`<p>${flight.seats} Seats (${flight.cost} per seat) </p>`))
        innerDiv.append($(`<a href="#" class="remove">REMOVE</a>`).on('click', function () {
            kinveyRequester.removeFlight(flight._id)
        }))
        innerDiv.append($(`<a href="#" class="details">Details</a>`).on('click', function () {
            renderDetailsView(flight)
        }))
        mainDiv.append(innerDiv)
        $('#viewMyFlights').append(mainDiv)
    }
}

/*










            </div>

        </div>

 */