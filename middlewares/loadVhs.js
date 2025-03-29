/**
  * egy vhs betoltese az adatbazisbol, vhs db-bol ki ha nem letezik redirect /vhs-re, egyebkent next hivas
  * @param objRepo
  * @returns {function(*,*,*): *}
*/
module.exports = (objRepo) => {
    return (req, res, next)=> {
        return next();
    }
}