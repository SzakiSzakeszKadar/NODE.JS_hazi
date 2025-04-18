/**
 * Egy bérlés betöltése az adatbázisból
 * @param objRepo
 * @returns {function(*,*,*): *}
 */
module.exports = (objRepo) => {
    return (req, res, next) => {
        // Példa bérlés lista
        const rentalList = [
            {
                id: 1,
                customerName: "Kovács János",
                vhsTitle: "Star Wars: A New Hope",
                rentalDate: "2024-03-15",
                returnDate: "2024-03-22",
                status: "Aktív"
            },
            {
                id: 2,
                customerName: "Nagy Éva",
                vhsTitle: "The Godfather",
                rentalDate: "2024-03-10",
                returnDate: "2024-03-17",
                status: "Visszahozva"
            },
            {
                id: 3,
                customerName: "Szabó Péter",
                vhsTitle: "Pulp Fiction",
                rentalDate: "2024-03-20",
                returnDate: "2024-03-27",
                status: "Aktív"
            }
        ];

        // Megkeressük a kért bérlést az ID alapján
        const rental = rentalList.find(r => r.id === parseInt(req.params.id));
        
        if (!rental) {
            return res.redirect('/rental');
        }
        
        res.locals.rental = rental;
        return next();
    }
}