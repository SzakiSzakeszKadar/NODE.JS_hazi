/**
 * kirenderel egy html-t
 * @param objRepo
 * @returns {function(*,*,*): *}
 */
module.exports = (objRepo) => {
    return (req, res, next)=> {
        return next();
    }
}