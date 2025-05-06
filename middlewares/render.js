/**
 * kirenderel egy html-t
 * @param viewName A megjelenítendõ view neve
 * @returns {function(*,*,*): *}
 */
function render(viewName) {
    return function(req, res) {
        console.log('Rendering view:', viewName);
        console.log('Data:', res.locals);
        res.render(viewName, res.locals);
    };
}

module.exports = render;