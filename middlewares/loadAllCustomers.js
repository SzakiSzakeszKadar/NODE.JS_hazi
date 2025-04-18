/**
 * Az összes ügyfél betöltése az adatbázisból
 * @param objRepo
 * @returns {function(*,*,*): *}
 */
module.exports = (objRepo) => {
    return (req, res, next) => {
        // Példa ügyfél lista
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
        
        res.locals.customerList = customerList;
        return next();
    }
}