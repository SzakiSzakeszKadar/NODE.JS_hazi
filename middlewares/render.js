/**
 * kirenderel egy html-t
 * @param objRepo
 * @returns {function(*,*,*): *}
 */
module.exports = (objRepo, view) => {
    return (req, res, next)=> {
        res.render(view, res.locals);
    }
}