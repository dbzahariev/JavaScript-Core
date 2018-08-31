let receiptService = (()=> {
    function getActive(userId) {
        const endPoint = `receipts?query={"_acl.creator":"${userId}","active":"true"}`

        return remote.get('appdata', endPoint, 'kinvey')
    }
    function create() {
        const data = {
            active: true,
            productsCount: 0,
            total: 0
        }

        return remote.post('appdata', 'receipts', 'kinvey', data)
    }
    function getMyReceipts(userId) {
        const endPoint = `receipts?query={"_acl.creator":"${userId}","active":"false"}`

        return remote.get('appdata', endPoint, 'kinvey')
    }
    function getById(receiptId) {
        const endPoint = `receipts/${receiptId}`

        return remote.get('appdata', endPoint, 'kinvey')
    }
    async function checkOut(receiptId, productCount, total) {
        const endPoint = `receipts/${receiptId}`
        let receipt = await getById(receiptId)
        receipt['active'] = false
        receipt['productsCount'] = productCount
        receipt['total'] = total

        return remote.update('appdata', endPoint, 'kinvey', receipt)
    }

    return {
        getActive,
        create,
        getMyReceipts,
        getById
    }
})()