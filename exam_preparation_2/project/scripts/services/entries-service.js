let entriesService = (()=> {
    function getAllByReceiptId(receiptId) {
        const endPoint = `entries?query={"receiptId":"${receiptId}"}`

        return remote.get('appdata', endPoint, 'kinvey')
    }
    function create(type, quantity, price, receiptId) {
        const data = {type, quantity, price, receiptId}

        return remote.post('appdata', 'entries', 'kinvey', data)
    }
    function remove(entryId) {
        const endPoint = `entries/${entryId}`

        return remote.remove('appdata', endPoint, 'kinvey')
    }
    return {
        getAllByReceiptId,
        create,
        remove
    }
})()