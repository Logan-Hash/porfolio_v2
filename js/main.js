$(document).ready(function () {


    let $btns = $('.project-area .button-group button');


    $btns.click(function (e) {

        $('.project-area .button-group button').removeClass('active');
        e.target.classList.add('active');

        let selector = $(e.target).attr('data-filter');
        $('.project-area .grid').isotope({
            filter: selector
        });

        return false;
    })
    
    $('.project-area .button-group #btn1').trigger('click');

    $('.project-area .grid .test-popup-link').magnificPopup({
        type: 'image',
        gallery: { enabled: true }
    });


    // Owl-carousel

    $('.site-main .about-area .owl-carousel').owlCarousel({
        loop: true,
        autoplay: true,
        dots: true,
        responsive: {
            0: {
                items: 1
            },
            560: {
                items: 2
            }
        }
    })

    // sticky navigation menu

    let nav_offset_top = $('.header_area').height() + 50;

    function navbarFixed() {
        if ($('.header_area').length) {
            $(window).scroll(function () {
                let scroll = $(window).scrollTop();
                if (scroll >= nav_offset_top) {
                    $('.header_area .main-menu').addClass('navbar_fixed');
                } else {
                    $('.header_area .main-menu').removeClass('navbar_fixed');
                }
            })
        }
    }

    navbarFixed();

});

// Scroll 
$(function() {
    $('a[href*=\\#]:not([href=\\#])').on('click', function() {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.substr(1) +']');
        if (target.length) {
            $('html,body').animate({
                scrollTop: target.offset().top
            }, 1000);
            return false;
        }
    });
});

$(window).scroll(function() {
    var scrollDistance = $(window).scrollTop();
  
    // Assign active class to nav links while scolling
    $('.page-section').each(function(i) {
        if ($(this).position().top <= scrollDistance) {
            $('.nav-item a.active').removeClass('active');
            $('.nav-item a').eq(i).addClass('active');
        }
    });
}).scroll();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function textScramble() {
    var TextScramble = function () {
      function TextScramble(el) {
        _classCallCheck(this, TextScramble);
  
        this.el = el;
        this.chars = 'abcdefghijklmnopqrstuvwxyz';
        this.update = this.update.bind(this);
      }
  
      TextScramble.prototype.setText = function setText(newText) {
        var _this = this;
  
        var oldText = this.el.innerText;
        var length = Math.max(oldText.length, newText.length);
        var promise = new Promise(function (resolve) {
          return _this.resolve = resolve;
        });
        this.queue = [];
        for (var i = 0; i < length; i++) {
          var from = oldText[i] || '';
          var to = newText[i] || '';
          var start = Math.floor(Math.random() * 40);
          var end = start + Math.floor(Math.random() * 100);
          this.queue.push({ from: from, to: to, start: start, end: end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
      };
  
      TextScramble.prototype.update = function update() {
        var output = '';
        var complete = 0;
        for (var i = 0, n = this.queue.length; i < n; i++) {
          var _queue$i = this.queue[i];
          var from = _queue$i.from;
          var to = _queue$i.to;
          var start = _queue$i.start;
          var end = _queue$i.end;
          var char = _queue$i.char;
  
          if (this.frame >= end) {
            complete++;
            output += to;
          } else if (this.frame >= start) {
            if (!char || Math.random() < .28) {
              char = this.randomChar();
              this.queue[i].char = char;
            }
            output += '<span class="dud">' + char + '</span>';
          } else {
            output += from;
          }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
          this.resolve();
        } else {
          this.frameRequest = requestAnimationFrame(this.update);
          this.frame++;
        }
      };
  
      TextScramble.prototype.randomChar = function randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
      };
  
      return TextScramble;
    }();
  
    var phrases = ['website','wordpress','android'];
   
  
    var el = document.querySelector('.text');
    var fx = new TextScramble(el);
  
    var counter = 0;
    var next = function next() {
      fx.setText(phrases[counter]).then(function () {
        setTimeout(next, 2000);
      });
      counter = (counter + 1) % phrases.length;
    };
  
    next();
}
setTimeout(textScramble, 0);


// Stats
// const stats = new Stats(); stats.showPanel(0); document.body.appendChild(stats.dom);

const cursor = document.querySelector('.cursor');
const cursorInner = document.querySelector('.cursor-move-inner');
const cursorOuter = document.querySelector('.cursor-move-outer');

const trigger = document.getElementById('cursor');

let mouseX = 0;
let mouseY = 0;
let mouseA = 0;

let innerX = 0;
let innerY = 0;

let outerX = 0;
let outerY = 0;

let loop = null;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  
  if (!loop) {
    loop = window.requestAnimationFrame(render);
  }
});

trigger.addEventListener('mouseenter', () => {
  cursor.classList.add('cursor--hover');
});

trigger.addEventListener('mouseleave', () => {
  cursor.classList.remove('cursor--hover');
});

function render() {
  // stats.begin();

  loop = null;
  
  innerX = lerp(innerX, mouseX, 0.15);
  innerY = lerp(innerY, mouseY, 0.15);
  
  outerX = lerp(outerX, mouseX, 0.13);
  outerY = lerp(outerY, mouseY, 0.13);
  
  const angle = Math.atan2(mouseY - outerY, mouseX - outerX) * 180 / Math.PI;
  
  const normalX = Math.min(Math.floor((Math.abs(mouseX - outerX) / outerX) * 1000) / 1000, 1);
  const normalY = Math.min(Math.floor((Math.abs(mouseY - outerY) / outerY) * 1000) / 1000, 1);
  const normal  = normalX + normalY * .5;
  const skwish  = normal * .7;
    
  cursorInner.style.transform = `translate3d(${innerX}px, ${innerY}px, 0)`;
  cursorOuter.style.transform = `translate3d(${outerX}px, ${outerY}px, 0) rotate(${angle}deg) scale(${1 + skwish}, ${1 - skwish})`;
  
  // stats.end();
  
  // Stop loop if interpolation is done.
  if (normal !== 0) {
    loop = window.requestAnimationFrame(render);
  }
}

function lerp(s, e, t) {
  return (1 - t) * s + t * e;
}

(function() {
  var loaderText = document.getElementById("loading-msg");
  var refreshIntervalId = setInterval(function() {
      loaderText.innerHTML = getLoadingText();
  }, 1500);

  function getLoadingText() {
      var strLoadingText;
      var arrLoadingText = ["Reciving Data","Loading Layout","I Love You",];
      var rand = Math.floor(Math.random() * arrLoadingText.length);
      return arrLoadingText[rand];
  }
})();


$(document).ready(function(){
  setTimeout(function() {
    $('.preloader').delay(500).fadeOut('slow',function() {
      $('.preloader').hide();
    });
  },3000);
});
