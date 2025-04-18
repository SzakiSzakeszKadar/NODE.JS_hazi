/**
 * Egy ˜gyf˜l bet˜lt˜se az adatb˜zisb˜l
 * @param objRepo
 * @returns {function(*,*,*): *}
 */
module.exports = (objRepo) => {
    return (req, res, next) => {
        // P˜lda ˜gyf˜l lista
        const customerList = [
            {
                id: 1,
                name: "Kovács János",
                email: "kovacs.janos@example.com",
                phone: "+36 30 123 4567",
                address: "Budapest, Fõ utca 1.",
                membershipType: "Gold",
                joinDate: "2023-01-15"
            },
            {
                id: 2,
                name: "Nagy Éva",
                email: "nagy.eva@example.com",
                phone: "+36 20 987 6543",
                address: "Debrecen, Petõfi utca 42.",
                membershipType: "Silver",
                joinDate: "2023-03-20"
            },
            {
                id: 3,
                name: "Szabó Péter",
                email: "szabo.peter@example.com",
                phone: "+36 70 555 1234",
                address: "Szeged, Kossuth tér 5.",
                membershipType: "Bronze",
                joinDate: "2023-05-10"
            }
        ];

        // Megkeressük a kért ügyfelet ID alapján.
        const customer = customerList.find(c => c.id === parseInt(req.params.id));
        
        if (!customer) {
            return res.redirect('/customer');
        }
        
        res.locals.customer = customer;
        return next();
    }
}