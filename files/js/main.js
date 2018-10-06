$(function(){

    $('body').css('display','block');

	//Safari Back Reload
	window.onpageshow = function(event) {if (event.persisted) {window.location.reload();}};
	//Detect Responsive
	function smartDevice() {return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);}
	function ie() {if (document.documentMode || /Edge/.test(navigator.userAgent)) {return true;} else {return false;}}
	function maxXS() {return window.matchMedia('(max-width: 320px)').matches;}
	function maxSM() {return window.matchMedia('(max-width: 425px)').matches;}
	function maxMD() {return window.matchMedia('(max-width: 1024px)').matches;}
	function maxLG() {return window.matchMedia('(max-width: 1366px)').matches;}
	function minXS() {return window.matchMedia('(min-width: 321px)').matches;}
	function minSM() {return window.matchMedia('(min-width: 426px)').matches;}
	function minMD() {return window.matchMedia('(min-width: 1025px)').matches;}
	function minLG() {return window.matchMedia('(min-width: 1367px)').matches;}
	// Resize Handler
	var resizeW;
	$(window).resize(function() {
	    if($(this).width() != resizeW){
	        resizeW = $(this).width();
		    resizeHandler();
		}
	});
	function resizeHandler() {
        //reset header
        TweenMax.set($('header .left'), {clearProps:"all"});	
        $('.header .burgMenu').removeClass('tapped');

        allFully();
	};
    
	resizeHandler();

	//your custom js here onwards
	////////////////////////////////////////////////
	



    //HEADER & NAV
    ////////////////////////////////////////////////
    $('[data-scrollToSec]').waypoint({
        handler: function(dir) {
            if(dir == 'down'){
                $('header nav a').removeClass('atPage');
                scrollToSec = $(this.element).attr('data-scrollToSec');              
                $('header nav [data-scrollTo="'+scrollToSec+'"]').addClass('atPage');
            }
        },
        offset: '90%'
    });

    $('[data-scrollToSec]').waypoint({
        handler: function(dir) {
            if(dir == 'up'){
                $('header nav a').removeClass('atPage');
                scrollToSec = $(this.element).attr('data-scrollToSec');              
                $('header nav [data-scrollTo="'+scrollToSec+'"]').addClass('atPage');
            }
        },
        offset: '-10%'
    });

    $('header nav a[data-scrollTo], header nav div[data-scrollTo]').click(function(){
        $('header nav a').removeClass('atPage');
        $(this).addClass('atPage');
        Waypoint.refreshAll();
        scrollTo = $(this).attr('data-scrollTo');
        $("html,body").animate({scrollTop: $('[data-scrollToSec='+scrollTo+']').position().top - 100}, 600);           

        if(maxMD()){
            $('.burgMenu').removeClass('tapped');
            TweenMax.to($('header .left'), 0.3, {x:"100%", ease: Power4.easeOut});
        }        
    })

    $('main [data-scrollTo]').click(function(){
        Waypoint.refreshAll();
        scrollTo = $(this).attr('data-scrollTo');
        $("html,body").animate({scrollTop: $('[data-scrollToSec='+scrollTo+']').position().top - 100}, 600);                
    })    

    $('.burgMenu').click(function(){
        if(maxMD()){
            $(this).toggleClass('tapped');
            if($(this).hasClass('tapped')){
                TweenMax.to($('header .left'), 0.3, {x:"0%", ease: Power4.easeOut});
            } else {
                TweenMax.to($('header .left'), 0.3, {x:"100%", ease: Power4.easeOut});                
            }
        }
    });

    $('main').waypoint({
        handler: function(dir) {
            if(dir == 'down'){                
                $('header').toggleClass('scrolled');
                TweenMax.to($('.pastSponsors'), 0.3, {opacity:0, ease: Power4.easeOut});
            } else {
                $('header').toggleClass('scrolled');
                TweenMax.to($('.pastSponsors'), 0.3, {opacity:1, ease: Power4.easeOut});
                TweenMax.set($('.pastSponsorLogos'),{scrollTo:{x:0}});
                TweenMax.to($('.pastSponsorLogos'), 60, {scrollTo:{x:$('.pastSponsorLogos').get(0).scrollWidth - $(document).width(), ease:Linear.easeNone}});
            }
        },
        offset: '-1px'
    });

    TweenMax.to($('.pastSponsorLogos'), 60, {scrollTo:{x:$('.pastSponsorLogos').get(0).scrollWidth - $(document).width(), ease:Linear.easeNone}});

    $('.tap').on('click',function(){
        $this = $(this)
        href = $(this).attr('href');
        TweenMax.set($this,{scale:0.8, opacity: 0.2});   
        TweenMax.to($this, 0.3, {scale:1, opacity:1, ease: Power4.easeOut, onComplete:function(){
            if(href){
                if($this.attr('target') == '_blank'){
                    window.open(href);
                } else {
                    window.location = href;
                }
                
            }
        }});
        return false;   
    });



































    //OWL CAROSEL
    ////////////////////////////////////////////////
    function caroChg(e) {
        var target = e.target;
        var total = e.item.count;
        var i = e.item.index;
        var size = e.page.size;
        updateBtn(target,(i+1),total,size);
    }

    function updateBtn(target,i,count,size){
        $(target).parents('.owlWithBtns').find('.owlNavBtn').css('display','block');

        if(i <= 1){
            $(target).parents('.owlWithBtns').find('.btnLeft').css('display','none');
        }

        if(size+i >= (count+1)){
            $(target).parents('.owlWithBtns').find('.btnRight').css('display','none');
        }
    }
    updateBtn(0,0,0,0);

    var owlPastSponsors = $('.owlPastSponsors');
    owlPastSponsors.owlCarousel({
        stagePadding: 0,
        margin: 50,
        dots: false,
        autoWidth:true,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,   
        loop: true,     
        onInitialized: caroChg
    });




    //SCROLL MAGIC
    ////////////////////////////////////////////////

    var controller = new ScrollMagic.Controller();

    $('.downNormal').each(function(){
        var current = this;
        var tween = TweenMax.to($(this), 0.1, {y: '100%', ease: Linear.easeNone});
        var scene = new ScrollMagic.Scene({triggerElement: current, duration: '100%'})
            .setTween(tween)
            .tweenChanges(true)
            .triggerHook('onEnter')
            .addTo(controller);
    });

    $('.upNormal').each(function(){
        var current = this;
        var tween = TweenMax.to($(this), 0.1, {y: '-100%', ease: Linear.easeNone});
        var scene = new ScrollMagic.Scene({triggerElement: current, duration: '100%'})
            .setTween(tween)
            .tweenChanges(true)
            .triggerHook('onEnter')
            .addTo(controller);
    });

    $('.upFast').each(function(){
        var current = this;
        var tween = TweenMax.to($(this), 0.1, {y: '-500%', ease: Linear.easeNone});
        var scene = new ScrollMagic.Scene({triggerElement: current, duration: '100%'})
            .setTween(tween)
            .tweenChanges(true)
            .triggerHook('onEnter')
            .addTo(controller);
    });   













    //TOP FOLD SPONSORS
    ////////////////////////////////////////////////
    Number.prototype.toFixedDown = function(digits) {
        if(this >= 0) {
            var re = new RegExp("(\\d+\\.\\d{" + digits + "})(\\d)"),
                m = this.toString().match(re);
            return m ? parseFloat(m[1]) : this.valueOf();
        } else {
            return 0;
        }
    };

    $('.eachSponsor').mouseenter(function(){
        if(minSM()) {
            $this = $(this);
            i = $('.eachSponsor').length - $this.index();
            elPos = ($this.index()/($('.eachSponsor').length - 1)) * 100;
            totalScroll = $('.pastSponsorLogos').get(0).scrollWidth - $(document).width();

            scrollTo = (elPos/100) * totalScroll;

             TweenMax.to($('.pastSponsorLogos'), 0.3, {scrollTo:{x:scrollTo}});
        };
    });   

    $('.pastSponsorLogos').scroll(function(){
        if(minSM()) {
            $this = $(this);
            totalEl = $('.pastSponsorLogos .eachSponsor').length;
            scrollP = $this.scrollLeft();
            totalScrollW = $('.pastSponsorLogos').get(0).scrollWidth - $(document).width();

            clearTimeout($.data(this, 'scrollTimer'));
            $.data(this, 'scrollTimer', setTimeout(function() {
                atIndex = ((scrollP/totalScrollW)*totalEl).toFixedDown(0);
                if(atIndex >= totalEl){atIndex = (totalEl-1)};
                if(atIndex <= 0){atIndex = 0};

                el = $this.children('*').removeClass('active');
                el = $this.children('*:nth-of-type('+(atIndex+1)+')').addClass('active');
            }, 10));
        };
    })





    //COUNT DOWN
    ////////////////////////////////////////////////
    function count() {
        var now = new Date().getTime();
        var distance = countDownDate - now;
        function pad(number) {
            return (number < 10 ? '0' : '') + number
        }   

        var days = pad(Math.floor(distance / (1000 * 60 * 60 * 24)));
        // var hours = pad(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        // var minutes = pad(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
        // var seconds = pad(Math.floor((distance % (1000 * 60)) / 1000));
                
        $('.countDown .d').html(days);
        // $('.countDown .h').html(hours);
        // $('.countDown .m').html(minutes);
        // $('.countDown .s').html(seconds);

        if (distance < 0) {
            //if 00:00:00:00
            clearInterval(x);
            $('.countDown .d').html('00');
            // $('.countDown .h').html('00');
            // $('.countDown .m').html('00');
            // $('.countDown .s').html('00');                                
        }            
    }


    var countDownDate = new Date("February 23, 2019  00:00:00").getTime();
    var x = setInterval(function() {
        count();
    }, 1000);
    count();


    //LIGHTBOX
    ////////////////////////////////////////////////
    // $(document).ready(function() {
    //     $('#selector1').lightGallery({
    //         selector: '.item'
    //     });
    // });


    //FULLY
    ////////////////////////////////////////////////
    function allFully(){
        $('.fully').fully();
        $('.fullyCen').fully({vAlign: 'center'});
        $('.fullyTopFold').fully({vAlign: 'center'});
    }

    allFully();



});







