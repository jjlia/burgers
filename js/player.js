// const video = document.querySelector('#video');
// const videoBtn = document.querySelector('#playBtn');
// const progress = document.querySelector('#progress');
// const progressTime = document.querySelector('#progressTime');
// const allTime = document.querySelector('#allTime');
// const videoVolume = document.querySelector('#volume');
// const workPlay = document.querySelector('.video__play');
// const svgButton = document.querySelector('.play-button');
// const bigButton = document.querySelector('.video__play');
// const volumeX = document.querySelector('.work__volume-x');


// video.ontimeupdate = progressUpdate;
// video.volume = 10 / 100;


// volume.addEventListener('input', function() {
//     let v = this.value;
//     video.volume = v / 100;

//     console.log(videoVolume.value);

//     if (videoVolume.value == 0) {
//         volumeX.style.display = 'block';
//     } else {
//         volumeX.style.display = 'none';
//     }
// });

// bigButton.addEventListener('click', e => {
//     bigButton.style.display = 'none';
//     video.play();
//     videoBtn.classList.add('play-button--pause');
//     svgButton.style.display = 'none';
// });

// videoBtn.addEventListener('click', e => {
//     if (video.paused) {
//         video.play();
//         bigButton.style.display = 'none';
//     } else {
//         video.pause();
//         //video.currentTime = 0; //сбросить время
//         //video.playbackRate = 2; //в два раза быстрее проигрывается
//         //video.volume = this.value / 100; //регулировка громкости
//     }
//     if (video.paused) {
//         videoBtn.classList.remove('play-button--pause');
//         svgButton.style.display = 'block';
//     } else {
//         svgButton.style.display = 'none';
//         videoBtn.classList.add('play-button--pause');
//         bigButton.style.display = 'none';
//     }
// });

// video.addEventListener('click', e => {
//     if (video.paused) {
//         video.play();
//     } else {
//         video.pause();
//     }
//     if (video.paused) {
//         videoBtn.classList.remove('play-button--pause');
//         svgButton.style.display = 'block';
//     } else {
//         svgButton.style.display = 'none';
//         videoBtn.classList.add('play-button--pause');
//         bigButton.style.display = 'none';
//     }
// });

// progress.addEventListener('click', function() {
//     let widthProgress = this.offsetWidth;
//     let targetClick = event.offsetX;

//     this.value = (100 * targetClick) / widthProgress;
//     video.pause();
//     video.currentTime = video.duration * (targetClick / widthProgress);
//     video.play();
// });


// progress.addEventListener('mousedown', function() {
//     let widthProgress = this.offsetWidth;
//     let targetClick = event.offsetX;

//     this.value = (100 * targetClick) / widthProgress;
//     video.pause();

// });

// progress.addEventListener('mouseup', function() {
//     let widthProgress = this.offsetWidth;
//     let targetClick = event.offsetX;

//     this.value = (100 * targetClick) / widthProgress;
//     video.currentTime = video.duration * (targetClick / widthProgress);
//     video.play();
//     svgButton.style.display = 'none';
//     videoBtn.classList.add('play-button--pause');
//     bigButton.style.display = 'none';
// });


// function progressUpdate() {
//     let d = video.duration; //полное время
//     let c = video.currentTime; //прогресс времени

//     progress.value = (100 * c) / d;
//     progressTime.textContent = '00:' + Math.floor(c);

//     if (video.currentTime < 10) {
//         progressTime.textContent = '00:0' + Math.floor(c);
//     }
//     // allTime.textContent = '00:' + Math.floor(d);
//     if (progress.value == 100) {
//         progress.value = 0;
//         video.currentTime = 0;
//         videoBtn.classList.remove('play-button--pause');
//         svgButton.style.display = 'block';
//         video.pause();
//     }
// }

const videoBtn = document.querySelector('#playBtn');
const svgButton = document.querySelector('.play-button');
const bigButton = document.querySelector('.video__play');
let video;
let durationControl;
let soundControl;
let intervalId;

document.addEventListener('DOMContentLoaded', e => {
    video = document.getElementById('video');

    // вешаем обработчик события на на тег video
    video.addEventListener('click', playStop);

    // находим все кнопки play и навешиваем через цикл на каждую обработчик
    let playButtons = document.querySelectorAll('.play');
    for (let i = 0; i < playButtons.length; i++) {
        playButtons[i].addEventListener('click', playStop);
    }
    
    // обработчики события для ползунка продолжительности видео
    durationControl = document.getElementById('durationLevel');
    durationControl.addEventListener('mousedown', stopInterval);
    durationControl.addEventListener('click', setVideoDuration);

    durationControl.min = 0;
    durationControl.value = 0;

    // обработчики события для ползунка громоксти
    soundControl = document.getElementById('volumeLevel');
    soundControl.addEventListener('click', changeSoundVolume);
    soundControl.addEventListener('mouseup', changeSoundVolume);

    // задаем максимальное и минимальное значение volume
    soundControl.min = 0;
    soundControl.max = 10;

    soundControl.value = soundControl.max;

});

function playStop() {
    // нахожу мою кнопку с картинкой PLAY и показываю или скрываю ее
    let playImg = document.querySelector('.video__play');
    playImg.classList.toggle('video__play--active');

    // присваиваем ползунку проолжительности видео максимальное значение 
    // равное продолжительности нашего видео
    durationControl.max = video.duration;

    // проверяем стоит ли видео на паузе, если да то продолжаем воспроизведение
    if (video.paused) {
        // запускаем видео
        video.play();
        // обновляем ползунок каждые 15 мили секунд функцией updateDuration
        intervalId = setInterval(updateDuration, 1000 / 66);
    } else {
        // понимаем что видео не стоит на паузе,и ставим его на паузу
        video.pause();
        clearInterval(intervalId);
    }
}

// обновляет позицию ползунка продолжительности видео
function updateDuration() {
    durationControl.value = video.currentTime;
}

function stopInterval() {
    video.pause();
    clearInterval(intervalId);
}

// Реализует возможность перемотки видео
function setVideoDuration() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }

    video.currentTime = durationControl.value;
    // обновляем ползунок каждые 15 мили секунд функцией updateDuration
    intervalId = setInterval(updateDuration, 1000 / 66);
}

// управление звуком видео
function changeSoundVolume() {
    // свойстов video.volume может иметь значени от 0 до 1 
    // поэтому делим все на 10 , что бы более четко контролировать значение

    video.volume = soundControl.value / 10;
}

function soundOf() {
    // делаем проверку уровня громкости 
    // если у нашего видео есть звук , то мы его выключаем 
    // предварительно запомнив текущую позицию громкости в переменную soundLevel

    if (video.volume === 0) {
        video.volume = soundLevel;
        soundControl.value = soundLevel * 10;
    } else {
        soundLevel = video.volume;
        video.volume = 0;
        soundControl.value = 0;
    }
}
// (function() {
//     var video = document.querySelector('#video');
//     var bigPlayBtn = document.querySelector('.video__play--big');
//     var smallPlayBtn = document.querySelector('#playBtn');
//     var smallPauseBtn = document.querySelector('#pauseBtn');
//     var volumeBtn = document.querySelector('#micLevel');
//     // var poster = document.querySelector('.video__controlls-volume');
//     var circleProgress = document.querySelector('.playback__way--circle');
//     var progressBar = document.querySelector('#durationLevel');
//     var circleVolume = document.querySelector('.playback__way--circle-volume');
//     var volumeBar = document.querySelector('#volumeLevel');
  
//     circleVolume.style.left = '30%';
//     var currentVolume = 0.3;
//     video.volume = currentVolume;
  
//     bigPlayBtn.addEventListener('click', function(e) {
//       e.preventDefault();
//       video.play();
//       bigPlayBtn.style.display  = 'none';
//       smallPauseBtn.style.display = 'block';
//       smallPlayBtn.style.display = 'none';
//     });
  
//     video.addEventListener('click', function() {
//       if (video.paused) {
//         video.play();
//         bigPlayBtn.style.display  = 'none';
//         smallPlayBtn.style.display = 'none';
//         smallPauseBtn.style.display = 'block';
//       } else {
//         video.pause();
//         bigPlayBtn.style.display = 'block';
//         smallPlayBtn.style.display = 'block';
//         smallPauseBtn.style.display = 'none';
//       }
//     });
  
//     video.addEventListener('timeupdate', function () {
//       var position = video.currentTime / video.duration;
//       circleProgress.style.left = position * 100 + '%';
//     });
  
//     smallPlayBtn.addEventListener('click', function(e) {
//         e.preventDefault();
//         if (video.paused) {
//           video.play();
//           bigPlayBtn.style.display  = 'none';
//           this.style.display = 'none';
//           smallPauseBtn.style.display = 'block';
//         } else {
//           video.pause();
//         }
//     });
  
//     smallPauseBtn.addEventListener('click', function(e) {
//       e.preventDefault();
//       if (!video.paused) {
//         video.pause();
//         this.style.display = 'none';
//         smallPlayBtn.style.display = 'block';
//         bigPlayBtn.style.display  = 'block';
//       } else {
//         video.play();
//       }
//     });
  
//     progressBar.addEventListener('click', function(e) {
//       if (video.paused) {
//         bigPlayBtn.style.display  = 'none';
//         smallPauseBtn.style.display = 'block';
//         smallPlayBtn.style.display = 'none';
//       }
//       let barWidth = this.offsetWidth;
//       let clickPosition = e.offsetX;
//       circleProgress.style.left = (100 * clickPosition / barWidth) + '%';
//       video.currentTime = video.duration *  clickPosition / barWidth;
//       video.play();
//     });
  
//     volumeBtn.addEventListener('click', function() {
//       if (this.classList.contains('muted')) {
//         this.classList.remove('muted');
//         video.volume = currentVolume;
//         this.style.fill = '';
//       } else {
//         this.classList.add('muted');
//         video.volume = 0;
//       }
//     });
  
//     volumeBar.addEventListener('click', function(e) {
//       let barWidth = this.offsetWidth;
//       let clickPosition = e.offsetX;
//       circleVolume.style.left = (100 * clickPosition / barWidth) + '%';
//       currentVolume = clickPosition / barWidth;
//       video.volume = currentVolume;
//       if (volumeBtn.classList.contains('muted')) {
//         volumeBtn.classList.remove('muted');
//       }
  
//     });
//   })();
  