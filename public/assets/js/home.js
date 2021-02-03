
let hbbScrollPosition = 0; 

let colWidth = () => {
    return document.querySelector('#hbb .col').clientWidth;
} 

const moveRight = () => { 
    hbbScrollPosition =  $('#hbb .row').scrollLeft();
    $('#hbb .row').animate( { scrollLeft: hbbScrollPosition + colWidth() }, 500); 
};

const moveLeft = () => { 
    hbbScrollPosition =  $('#hbb .row').scrollLeft();
    $('#hbb .row').animate( { scrollLeft: (hbbScrollPosition - colWidth()) }, 500); 
};
    
let dessertScrollPosition = 0; 

const dessertMoveRight = () => { 
    dessertScrollPosition =  $('#desserts .row').scrollLeft();
    $('#desserts .row').animate( { scrollLeft: dessertScrollPosition + colWidth() }, 500); 
};

const dessertMoveLeft = () => { 
    dessertScrollPosition =  $('#desserts .row').scrollLeft();
    $('#desserts .row').animate( { scrollLeft: (dessertScrollPosition - colWidth()) }, 500); 
};

