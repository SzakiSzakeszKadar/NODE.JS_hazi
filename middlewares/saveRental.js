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
        const { customerId, vhsId, returnDate } = req.body;

        if (!customerId || !vhsId || !returnDate) {
            throw new Error('Minden mez� kit�lt�se k�telez�!');
        }

        const customer = await Customer.findById(customerId);
        if (!customer) {
            throw new Error('Az �gyf�l nem tal�lhat�!');
        }

        const vhs = await Vhs.findById(vhsId);
        if (!vhs) {
            throw new Error('A VHS nem tal�lhat�!');
        }

        if (req.params.id) {
            // M�dos�t�s
            const rental = await Rental.findById(req.params.id);
            if (!rental) {
                throw new Error('A k�lcs�nz�s nem tal�lhat�!');
            }

            rental.returnDate = returnDate;
            rental.status = req.body.status || rental.status;

            if (rental.status === 'visszahozott') {
                await Vhs.findByIdAndUpdate(vhsId, { available: true });
            }

            await rental.save();
        } else {
            // �j k�lcs�nz�s
            if (!vhs.available) {
                throw new Error('A VHS nem el�rhet�!');
            }

            const rental = new Rental({
                customerId,
                vhsId,
                rentalDate: new Date(),
                returnDate,
                status: 'akt�v',
                customerName: customer.name,
                vhsTitle: vhs.title
            });

            await rental.save();
            await Vhs.findByIdAndUpdate(vhsId, { available: false });
        }

        res.redirect('/rental');
    } catch (error) {
        console.error('Hiba a k�lcs�nz�s ment�se k�zben:', error);
        next(error);
    }
}

module.exports = saveRental;