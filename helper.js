/**
 * Returns position of element under mouse click
 * @param element
 * @returns {{x: number, y: number}}
 */

function getElementPosition(element) {
    var box = element.getBoundingClientRect();
    return {
        x: box.left,
        y: box.top
    };
}

/**
 * Returns location of event based on element position in context of page
 * @param element
 * @param event
 * @returns {{x: number, y: number}}
 */
function getEventLocation(element,event){
    // Relies on the getElementPosition function.
    var pos = getElementPosition(element);

    return {
        x: (event.pageX - pos.x),
        y: (event.pageY - pos.y)
    };
}
