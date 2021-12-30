/////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////BACKGROUND//////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////


$(document).ready(function() {
	var docHeight = $('.space').height(),
			docWidth = $('.space').width(),
			heightMax = docHeight,
			widthMax = docWidth - 4;
	
	for(var i=0; 80 >= i; i++){
		$('.space').append('<div style="left:' + Math.floor( Math.random() * widthMax ) + 'px;top:' + Math.floor( Math.random() * heightMax ) + 'px" class="star '+ i +'"></div>');
	}
});



/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////NAVBAR//////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////



const menuBar = document.querySelector('.menu-bar');
const navBar = document.querySelector('.nav-bar');

menuBar.addEventListener('click', () => {
  navBar.classList.toggle('toggle');
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////HEADING//////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////


const wrapper = document.querySelector('.wrapper');
let currentSpan;

const TEXTLEN = wrapper.textContent.trim().length;
const Animation = {
  ROOT: 1.375,
  DURATION: .3625,
  DELAY: .125
};

wrapper.addEventListener('click', wrapperClick);
wrapper.addEventListener('mousemove', wrapperMove);
wrapper.addEventListener('mouseleave', wrapperLeave);

function wrapperClick(e) {
  const target = e.target;
  if (!target.classList.contains('wrapper')) {
    for (var i = 1; i <= TEXTLEN; i++) {
      wrapper.classList.remove('wave' + i);
    }
    void wrapper.offsetHeight; // Trigger a document reflow

    const count = target.dataset.count;
    const iterations =
      Math.abs(Number(count) - Math.ceil(TEXTLEN / 2)) +
      Math.ceil(TEXTLEN / 2);
    const runTime =
      Animation.DURATION +
      Animation.DELAY * Math.pow(iterations - 1, 1 / Animation.ROOT);

    wrapper.classList.add('wave' + count);
    setTimeout(function() {
      wrapper.classList.remove('wave' + count);
    }, runTime * 1000);
  }
}
function wrapperMove(e) {
  const target = e.target;
  if (!target.classList.contains('wrapper') && target != currentSpan) {
    if (currentSpan) toggleAdjacentNodes(currentSpan, 2, 'remove');

    toggleAdjacentNodes(target, 2, 'add');

    currentSpan = e.target;
  }
}
function wrapperLeave() {
  toggleAdjacentNodes(currentSpan, 2, 'remove');
  currentSpan = null;
}

function toggleAdjacentNodes(node, depth, operation, dir, i = 0) {
  if (!node || i > depth) return;
  node.classList[operation]('scale' + (i + 1));
  if (!dir || dir == 'prev') toggleAdjacentNodes(node.previousElementSibling, depth, operation, 'prev', i + 1);
  if (!dir || dir == 'next') toggleAdjacentNodes(node.nextElementSibling, depth, operation, 'next', i + 1);
}