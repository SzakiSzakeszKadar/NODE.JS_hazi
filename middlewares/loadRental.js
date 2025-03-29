/**
  * egy rental betoltese az adatbazisbol, rental db-bol ki ha nem letezik redirect /rental-re, egyebkent next hivas
  * @param objRepo
  * @returns {function(*,*,*): *}
*/
module.exports = (objRepo) => {
    return (req, res, next)=> {
        return next();
    }
}