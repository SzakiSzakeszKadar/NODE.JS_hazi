const Rental = require('../models/rental');
const Customer = require('../models/customer');
const Vhs = require('../models/vhs');

/**
 * elmenti a rental-t az adatbazisba
 * @param objRepo
 * @returns {function(*,*,*): *}
 */
async function saveRental(req, res, next) {
    try {
        const { customerId, vhsId, returnDate, status } = req.body;

        if (!customerId || !vhsId || !returnDate) {
            throw new Error('Minden mezõ kitöltése kötelezõ!');
        }

        const customer = await Customer.findById(customerId);
        if (!customer) {
            throw new Error('Az ügyfél nem található!');
        }

        const vhs = await Vhs.findById(vhsId);
        if (!vhs) {
            throw new Error('A VHS nem található!');
        }

        if (req.params.id) {
            // Módosítás
            const rental = await Rental.findById(req.params.id);
            if (!rental) {
                throw new Error('A kölcsönzés nem található!');
            }

            rental.returnDate = returnDate;
            rental.status = status;

            if (status === 'visszahozott') {
                await Vhs.findByIdAndUpdate(vhsId, { available: true });
            }

            await rental.save();
        } else {
            // Új kölcsönzés
            if (!vhs.available) {
                throw new Error('A VHS nem elérhetõ!');
            }

            const rental = new Rental({
                customerId,
                vhsId,
                returnDate,
                status: 'aktív'
            });

            await rental.save();
            await Vhs.findByIdAndUpdate(vhsId, { available: false });
        }

        res.redirect('/rental');
    } catch (error) {
        console.error('Hiba a kölcsönzés mentése közben:', error);
        next(error);
    }
}

module.exports = saveRental;