(function (time) {
    let container = document.querySelector('#carousel');
    let slides = container.querySelectorAll('.slide');
    let indicatorsContainer = container.querySelector('#indicators-container');
    let indicators = indicatorsContainer.querySelectorAll('.indicator');
    let controls = container.querySelector('#controls-container');
    let pauseBtn = controls.querySelector('#pause-btn');
    let prevBtn = controls.querySelector('#prev-btn');
    let nextBtn = controls.querySelector('#next-btn');

    let currentSlide = 0;
    let slidesCount = slides.length;
    let interval = time;
    let timerID = null;
    let isPlaying = true;
    let swipeStartX = null;
    let swipeEndX = null;

    const SPACE = ' ';
    const LEFT_ARROW = 'ArrowLeft';
    const RIGHT_ARROW = 'ArrowRight';
    const FA_PAUSE = '<i class="far fa-pause-circle"></i>';
    const FA_PLAY = '<i class="far fa-play-circle"></i>';

    let gotoNth = (n) => {
        slides[currentSlide].classList.toggle('active');
        indicators[currentSlide].classList.toggle('active');
        currentSlide = (n + slidesCount) % slidesCount;
        slides[currentSlide].classList.toggle('active');
        indicators[currentSlide].classList.toggle('active');
    };

    let gotoNext = () => gotoNth(currentSlide + 1);

    let gotoPrev = () => gotoNth(currentSlide - 1);

    function pause(){
        if(isPlaying) {
            pauseBtn.innerHTML = FA_PLAY;
            isPlaying = false;
            clearInterval(timerID);
        }
    }

    function play() {
        pauseBtn.innerHTML = FA_PAUSE;
        isPlaying = true;
        timerID = setInterval(gotoNext, interval);
    }

    function pausePlay() {
        if(isPlaying) {
            pause();
        } else {
            play();
        }
    }

    function prev() {
        pause();
        gotoPrev();
    }

    function next() {
        pause();
        gotoNext();
    }

    function indicate(e) {
        let target = e.target;

        if(target.classList.contains('indicator')) {
            pause();
            gotoNth(+target.dataset.slideTo);
        }
    }

    function pressKey(e) {
        if(e.key === LEFT_ARROW) prev();
        if(e.key === RIGHT_ARROW) next();
        if(e.key === SPACE) pausePlay();
    }

    function swipeStart(e) {
        swipeStartX = e.changedTouches[0].pageX;
    }

    function swipeEnd(e) {
        swipeEndX = e.changedTouches[0].pageX;
        swipeStartX - swipeEndX > 100 && next();
        swipeStartX - swipeEndX < -100 && prev();
    }
    function initListeners() {
        pauseBtn.addEventListener('click', pausePlay);
        prevBtn.addEventListener('click', prev);
        nextBtn.addEventListener('click', next);
        indicatorsContainer.addEventListener('click', indicate);
        container.addEventListener('touchstart', swipeStart);
        container.addEventListener('touchend', swipeEnd);
        document.addEventListener('keydown', pressKey);
        
    }

    function init() {
        initListeners();
        timerID = setInterval(gotoNext, interval);
    }

    init();
})(2000);