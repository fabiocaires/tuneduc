// Vanilla.js :)
// youmightnotneedjquery.com

(function(){
    document.addEventListener( 'DOMContentLoaded', function () {
        var arrowLeft = document.getElementById('arrow-left');
        var arrowRight = document.getElementById('arrow-right');
        var bannerItems = document.getElementsByClassName('banner-item');
        var maxPos = bannerItems.length -1;
        var currentPos = 0;
        var waitingEvent = false;
        
        var banner = {
            animation: function(x){
                console.log(currentPos);
                addRemoveClass(bannerItems[currentPos], 'banner-item--is-show', 'remove');
                (x == 0) ? currentPos-- : currentPos++;
                addRemoveClass(bannerItems[currentPos], 'banner-item--is-show', 'add');
                fadeIn(bannerItems[currentPos]);
                waitingEvent = false;
            },
            reset: function(){
                currentPos = 0;
                addRemoveClass(bannerItems[currentPos], 'banner-item--is-show', "add");
                fadeIn(bannerItems[currentPos]);
            }
        };
        banner.reset();
        
        arrowLeft.addEventListener('click', function(e){
            if(currentPos > 0 && waitingEvent == false){
                waitingEvent = true;
                banner.animation(0);
            }
        });
        arrowRight.addEventListener('click', function(e){
            if(currentPos < maxPos && waitingEvent == false){
                waitingEvent = true;
                banner.animation(1);
            }
        });
    }, false );      
})();





























// fadeIn effect
    function fadeIn(el) {
      el.style.opacity = 0;

      var last = +new Date();
      var tick = function() {
        el.style.opacity = +el.style.opacity + (new Date() - last) / 400;
        last = +new Date();

        if (+el.style.opacity < 1) {
          (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16)
        }
      };
      tick();
    }
    
    // add/remove classes
    function addRemoveClass(el, className, action){
        if(action == "add"){
            if (el.classList)
                el.classList.add(className);
            else
                el.className += ' ' + className;
        }
        if(action == "remove"){
            if (el.classList)
                el.classList.remove(className);
            else
                el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'),' ');
        }
    }