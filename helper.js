function getElementPosition(element) {
    var box = element.getBoundingClientRect();
    return {
        x: box.left,
        y: box.top
    };
}


function getEventLocation(element,event){
    // Relies on the getElementPosition function.
    var pos = getElementPosition(element);

    return {
        x: (event.pageX - pos.x),
        y: (event.pageY - pos.y)
    };
}
