// Vanilla JS :)

(function(){
    document.addEventListener( 'DOMContentLoaded', function () {
        var arrowLeft = document.getElementById('arrow-left');
        var arrowRight = document.getElementById('arrow-right');
        var bannerItems = document.querySelectorAll('.banner-item');
        var bullets = document.querySelectorAll('.thumbs__square');
        var maxPos = bannerItems.length -1;
        var currentPos, newPos;
        var waitingEvent = false;
        
        var banner = {
            animation: function(newPos){
                addRemoveClass(bannerItems[currentPos], 'banner-item--is-show', 'remove');
                addRemoveClass(bannerItems[newPos], 'banner-item--is-show', 'add');
                fadeIn(bannerItems[newPos]);
                currentPos = newPos;
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
            e.preventDefault();
            moveCarousel(0);
        });
        arrowRight.addEventListener('click', function(e){
            e.preventDefault();
            moveCarousel(1);
        });
        
        for(var i=0; i <= bullets.length; i++){
            bullets[i].dataset.index = i;
            bullets[i].addEventListener('click', function(e){
                e.preventDefault();
                if(waitingEvent == false){
                    waitingEvent = true;
                    newPos = parseInt(this.dataset.index);
                    banner.animation(newPos);
                }
            });
        }
        
        function moveCarousel(x){
            // evita múltiplos cliques
            if(waitingEvent == false){
                if(x == 0)
                    // recua apenas se maior que 0, caso contrário vá ao último índice
                    currentPos > 0 ? (newPos = (currentPos - 1)) : newPos = maxPos;
                else
                    // avança apenas se menor que o máximo, caso contrário vá ao primeiro índice
                    currentPos < maxPos ? (newPos = (currentPos + 1)) : newPos = 0;
                waitingEvent = true;
                banner.animation(newPos);
            }
        }


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
        
    }, false );      
})();