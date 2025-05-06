const Customer = require('../models/customer');

/**
 * elmenti a customer-t az adatbazisba
 * @returns {function(*,*,*): *}
 */
module.exports = async function (req, res, next) {
    try {
        console.log('Customer ment�se kezd�dik:', req.body);
        const { name, email, phone, address, membershipType, joinDate, active } = req.body;

        // Valid�ci�k
        if (!name || !email || !phone || !address || !membershipType) {
            console.error('Hi�nyz� k�telez� mez�k');
            return next(new Error('Minden mez� kit�lt�se k�telez�!'));
        }

        // Email valid�ci�
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            console.error('�rv�nytelen email c�m:', email);
            return next(new Error('�rv�nytelen email c�m!'));
        }

        if (req.params.id) {
            // M�dos�t�s - findByIdAndUpdate haszn�lata
            console.log('Customer m�dos�t�sa:', req.params.id);
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
                console.error('Customer nem tal�lhat�:', req.params.id);
                return next(new Error('Az �gyf�l nem tal�lhat�!'));
            }

            console.log('Customer sikeresen m�dos�tva:', updatedCustomer._id);
        } else {
            // �j customer l�trehoz�sa
            console.log('�j customer l�trehoz�sa');
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
            console.log('�j customer sikeresen l�trehozva:', customer._id);
        }
        
        // �tir�ny�t�s a customer list�ra
        return res.redirect('/customer');
    } catch (err) {
        console.error('Hiba a customer ment�sekor:', err);
        return next(err);
    }
};