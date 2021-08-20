import throttle  from 'lodash/throttle';
import  debounce  from 'lodash/debounce';

class RevealOnScroll{
    constructor(els, thresholdPercent){
        this.thresholdPercent=thresholdPercent;
        this.itemsToReveal= els;
        this.browserHeight=window.innerHeight;
        this.hideInitially();
        this.scrollThrottle = throttle(this.clacCaller, 200).bind(this);
        this.events();
    }

    events(){
        window.addEventListener("scroll",this.scrollThrottle)
        window.addEventListener("resize",debounce(() => {
            this.browserHeight=window.innerHeight;
        }, 333))
    }

    clacCaller(){
        this.itemsToReveal.forEach(el => {
            if(el.isRevealed == false){
                this.calculateIfScrolledTo(el);
            }
        })
    }

    calculateIfScrolledTo(el){
        /*scrollY is pixels from actual top of webpage */ 
        if(window.scrollY + this.browserHeight > el.offsetTop){
            let scrollPercennt=(el.getBoundingClientRect().y/this.browserHeight) * 100;
            if(scrollPercennt < this.thresholdPercent){
                el.classList.add("reveal-item--is-visible");
                el.isRevealed = true;
                if(el.isLastItem){
                    window.removeEventListener("scroll",this.scrollThrottle);
                }
            }
        }
    }

    hideInitially(){
        this.itemsToReveal.forEach(el => {
            el.classList.add("reveal-item");
            el.isRevealed = false;
        });
        this.itemsToReveal[this.itemsToReveal.length-1].isLastItem = true;
    }
}

export default RevealOnScroll