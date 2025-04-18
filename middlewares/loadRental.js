/**
 * Egy b�rl�s bet�lt�se az adatb�zisb�l
 * @param objRepo
 * @returns {function(*,*,*): *}
 */
module.exports = (objRepo) => {
    return (req, res, next) => {
        // P�lda b�rl�s lista
        const rentalList = [
            {
                id: 1,
                customerName: "Kov�cs J�nos",
                vhsTitle: "Star Wars: A New Hope",
                rentalDate: "2024-03-15",
                returnDate: "2024-03-22",
                status: "Akt�v"
            },
            {
                id: 2,
                customerName: "Nagy �va",
                vhsTitle: "The Godfather",
                rentalDate: "2024-03-10",
                returnDate: "2024-03-17",
                status: "Visszahozva"
            },
            {
                id: 3,
                customerName: "Szab� P�ter",
                vhsTitle: "Pulp Fiction",
                rentalDate: "2024-03-20",
                returnDate: "2024-03-27",
                status: "Akt�v"
            }
        ];

        // Megkeress�k a k�rt b�rl�st az ID alapj�n
        const rental = rentalList.find(r => r.id === parseInt(req.params.id));
        
        if (!rental) {
            return res.redirect('/rental');
        }
        
        res.locals.rental = rental;
        return next();
    }
}