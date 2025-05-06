const Customer = require('../models/customer');

/**
 * elmenti a customer-t az adatbazisba
 * @returns {function(*,*,*): *}
 */
module.exports = async function (req, res, next) {
    try {
        console.log('Customer mentése kezdõdik:', req.body);
        const { name, email, phone, address, membershipType, joinDate, active } = req.body;

        // Validációk
        if (!name || !email || !phone || !address || !membershipType) {
            console.error('Hiányzó kötelezõ mezõk');
            return next(new Error('Minden mezõ kitöltése kötelezõ!'));
        }

        // Email validáció
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            console.error('Érvénytelen email cím:', email);
            return next(new Error('Érvénytelen email cím!'));
        }

        if (req.params.id) {
            // Módosítás - findByIdAndUpdate használata
            console.log('Customer módosítása:', req.params.id);
            const updatedCustomer = await Customer.findByIdAndUpdate(
                req.params.id,
                {
                    name,
                    email,
                    phone,
                    address,
                    membershipType,
                    joinDate: joinDate ? new Date(joinDate) : undefined,
                    active: active === 'true'
                },
                { new: true }
            );

            if (!updatedCustomer) {
                console.error('Customer nem található:', req.params.id);
                return next(new Error('Az ügyfél nem található!'));
            }

            console.log('Customer sikeresen módosítva:', updatedCustomer._id);
        } else {
            // Új customer létrehozása
            console.log('Új customer létrehozása');
            const customer = new Customer({
                name,
                email,
                phone,
                address,
                membershipType,
                joinDate: joinDate ? new Date(joinDate) : new Date(),
                active: active === 'true'
            });
            await customer.save();
            console.log('Új customer sikeresen létrehozva:', customer._id);
        }
        
        // Átirányítás a customer listára
        return res.redirect('/customer');
    } catch (err) {
        console.error('Hiba a customer mentésekor:', err);
        return next(err);
    }
};