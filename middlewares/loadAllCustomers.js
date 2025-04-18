/**
 * Az �sszes �gyf�l bet�lt�se az adatb�zisb�l
 * @param objRepo
 * @returns {function(*,*,*): *}
 */
module.exports = (objRepo) => {
    return (req, res, next) => {
        // P�lda �gyf�l lista
        const customerList = [
            {
                id: 1,
                name: "Kov�cs J�nos",
                email: "kovacs.janos@example.com",
                phone: "+36 30 123 4567",
                address: "Budapest, F� utca 1.",
                membershipType: "Gold",
                joinDate: "2023-01-15"
            },
            {
                id: 2,
                name: "Nagy �va",
                email: "nagy.eva@example.com",
                phone: "+36 20 987 6543",
                address: "Debrecen, Pet�fi utca 42.",
                membershipType: "Silver",
                joinDate: "2023-03-20"
            },
            {
                id: 3,
                name: "Szab� P�ter",
                email: "szabo.peter@example.com",
                phone: "+36 70 555 1234",
                address: "Szeged, Kossuth t�r 5.",
                membershipType: "Bronze",
                joinDate: "2023-05-10"
            }
        ];
        
        res.locals.customerList = customerList;
        return next();
    }
}