/**
  * egy customer betoltese az adatbazisbol, customer db-bol ki ha nem letezik redirect /cuustomer-re, egyebkent next hivas
  * @param objRepo
  * @returns {function(*,*,*): *}
*/
module.exports = (objRepo) => {
    return (req, res, next)=> {
        return next();
    }
}