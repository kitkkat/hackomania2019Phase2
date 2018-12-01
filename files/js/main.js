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
    $('body *[scrollToId]').click(function(){
        Waypoint.refreshAll();
        scrollTo = $(this).attr('scrollToId');
        setTimeout(function(){ $("html,body").animate({scrollTop: $('#'+scrollTo+'').position().top}, 600); }, 100);
        
    })


    // STOP START SCROLL
    ////////////////////////////////////////////////
    var offseY;

    function stopScroll() {
        offseY = window.pageYOffset;
        var topY = -offseY + 'px';              
        $('html').addClass('noScroll');     
        $('body').css({'top':topY});
    }

    function startScroll() {
        $('html').removeClass('noScroll');
        $('html, body').scrollTop(offseY);
    }   

    // BURG MENU
    ////////////////////////////////////////////////
    function toggleMenu() {
        if($('html').hasClass('noScroll')) {
            startScroll();
        } else {
            stopScroll();
        }

        $('.burgMenu').toggleClass('tapped');
        $('.fixedNav').toggleClass('show');   
    }

    $('.burgMenu').click(function(){
        toggleMenu();
    });

    $('main, .fixedNav a').click(function(){
        if($('html').hasClass('noScroll')){
           toggleMenu(); 
        }        
    });

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


    //STICKY 
    ////////////////////////////////////////////////

    var stacked = $('.stacked section').length * $('.sectionTitle').outerHeight();
    $('.fullyTopFold .content').css('margin-bottom',stacked);
    $('.stacked section').each(function() {    
        h = $(this).find('.sectionTitle').outerHeight();
        stacked -= h;
        $(this).find('.sectionTitle').css('bottom',stacked);
        $(this).find('.sectionContent').prepend("<div class='push' style='height:"+h+"px;'></div>");
    });

    //STUCK DETECTION
    function scrollPass(el,i){
        if (typeof jQuery === "function" && el instanceof jQuery) {el = el[0];}
        var $title = $(el).find('.sectionTitle');
        var h = $title.outerHeight();
        var $content = $(el).find('.sectionContent');
        var rect = el.getBoundingClientRect();

        index = (($('.stacked section').length+1)-(i+1));

        p = rect.top <= ((window.innerHeight || document.documentElement.clientHeight)) - (h*index);
        if(p){
            $title.removeClass('stuck');
            $content.find('.push').remove();
            //console.log(el.className+" "+ p);       
        } else {
            $title.addClass('stuck');
            if($content.find('.push').length < 1){
                $content.prepend("<div class='push' style='height:"+h+"px;'></div>");
            }        
            //console.log(el.className+" "+ p);
        }
    }
    $(window).on('scroll',function(){
        //$('.console').html('scroll top at: '+$(this).scrollTop());
        $('.stacked section').each(function(i) {
            scrollPass(this, i);
        });
    });
    $('.stacked section').each(function(i) {
        scrollPass(this, i);
    });
    //END STUCK DETECTION

    //CLICK SCROLLTO
    // $('.stacked').on('click touchstart', '.sectionTitle.stuck', function(e){
    //     TweenMax.to(window, 0.8, {scrollTo:{y:$(this).parents('section').offset().top, autoKill:false}, ease:Power2.easeInOut});
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







