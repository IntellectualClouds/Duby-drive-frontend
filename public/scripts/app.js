
// window.onscroll = function (e) {

//     const direction = this.oldScroll > this.scrollY;
//     console.log(direction);

//     document.querySelector('.top-btn').style.display = "flex";
//     // print "false" if direction is down and "true" if up
//     // this.oldScroll = this.scrollY;
// }


let window_body = document.body;

const checkDirection = (e) => {
    if (e.wheelDelta > 0) {
        // console.log('Up');
        document.querySelector('.top-btn').style.display = 'none';
    } else {
        if (e.wheelDelta < 0) {
            // console.log('Down');
            document.querySelector('.top-btn').style.display = 'flex';
        }
    }
};

window_body.addEventListener('wheel', checkDirection);