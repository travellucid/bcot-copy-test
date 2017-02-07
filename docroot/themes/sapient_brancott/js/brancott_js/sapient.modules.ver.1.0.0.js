if(!$)var $=jQuery.noConflict();var sapient=sapient||{},commonObj=function($,window,sapient){function createInstance(){var scrollToNext=function(){var hrefLink=$($(".scroll-to")[1]).attr("id");$(".scroll-down").attr("href","#"+hrefLink)},hideLinkText=function(){$("footer section.social-icons nav ul li a").text("")};return{scrollToNext:scrollToNext,hideLinkText:hideLinkText}}var commonInstance;return{getInstance:function(){return commonInstance||(commonInstance=createInstance()),commonInstance}}}(jQuery,window,sapient);sapient.common=commonObj.getInstance(),sapient.common.hideLinkText();var carouselObj=function($,window,sapient){function createCarouselInstance(){var enableTouchCarousel=function(value){$(value).on("touchstart",function(event){var xClick=event.originalEvent.touches[0].pageX;$(this).one("touchmove",function(event){var xMove=event.originalEvent.touches[0].pageX;Math.floor(xClick-xMove)>5?$(value).carousel("next"):Math.floor(xClick-xMove)<-5&&$(value).carousel("prev")}),$(value).on("touchend",function(){$(this).off("touchmove")})})},resize=function(){$(window).on("resize",function(){})},toggleCarouselArrow=function(id){$(id).hover(function(){$(this).find(".carousel-control-wrapper").animate({opacity:["1"]},500)},function(){$(this).find(".carousel-control-wrapper").animate({opacity:["0"]},500)})};return{enableTouchCarousel:enableTouchCarousel,toggleCarouselArrow:toggleCarouselArrow,positionCarouselIndicator:positionCarouselIndicator,resize:resize}}var carouselInstance;return{getInstance:function(){return carouselInstance||(carouselInstance=createCarouselInstance()),carouselInstance}}}(jQuery,window,sapient);sapient.carousel=carouselObj.getInstance(),sapient.carousel.enableTouchCarousel("#carousel-our-story"),sapient.carousel.enableTouchCarousel("#carousel-our-wines"),sapient.carousel.enableTouchCarousel("#carousel-new-story"),sapient.carousel.positionCarouselIndicator(),sapient.carousel.resize();var heroObj=function($,window,sapient){function createHeroInstance(){var getHeightHero=function(){$(".scroll-down").click(function(){var heightHero=$("#hero-component").height();$("html, body").animate({scrollTop:heightHero},1e3)})};return{getHeightHero:getHeightHero}}var heroInstance;return{getInstance:function(){return heroInstance||(heroInstance=createHeroInstance()),heroInstance}}}(jQuery,window,sapient);sapient.hero=heroObj.getInstance();var headerObj=function($,window,sapient){function createHeaderInstance(){var getMenuHeadingVal=function(){$(document).on("click",".menu > .menu-item .expand-icon",function(e){$(this).parents(".menu-item").find(".sub-menu-wrapper .menu-heading span.text").text($(this).parents("a").text())})},animateMobileMenu=function(){$("#navbar-header .menu .menu-item").on("click",function(){$(this).parents(".menu").hasClass("menu-open")?$(this).parents(".menu").removeClass("menu-open"):$(this).parents(".menu").addClass("menu-open")})},removeMobileLogoText=function(){$("#navbar-header .logo a").text("")},collapseMobileMenu=function(){var windowWidth=$(window).width();windowWidth<769&&$("#navbar-header").removeClass("in").addClass("collapse")},setMenuBarHeight=function(){var windowWidth=$(window).width();$("#navbar-header .menu-item").hover(function(){var subMenuHeight=$(this).find(".sub-menu-wrapper").height();windowWidth>991&&$(this).find(".sub-menu").height(subMenuHeight)},function(){windowWidth>991&&$(this).find(".sub-menu").height(70)})},toggleGhostMenu=function(){$(window).on("scroll",function(){0!==$(window).scrollTop()?($("#navbar-header").addClass("semi-solid-menu"),$("header").addClass("white-background")):$("#navbar-header").hasClass("in")||($("#navbar-header").removeClass("semi-solid-menu"),$("header").removeClass("white-background"))}),$("header").hover(function(){$("#navbar-header").addClass("semi-solid-menu solid-menu"),$("header").removeClass("white-background")},function(){$("#navbar-header").removeClass("solid-menu"),0==$(window).scrollTop()&&$("#navbar-header").removeClass("semi-solid-menu")})},menuMobile=function(){var clickDelay=500,clickDelayTimer=null;$(".burger-click-region").on("click",function(){if($("#navbar-header").hasClass("in")&&0==$(window).scrollTop()?$("header").removeClass("white-background").css("opacity",.96):($("header").addClass("white-background").css("opacity",1),$("#navbar-header .navbar-nav").removeClass("menu-open")),null===clickDelayTimer){var $burger=$(this);$burger.toggleClass("active"),$burger.parent().toggleClass("is-open"),$burger.hasClass("active")||$burger.addClass("closing"),clickDelayTimer=setTimeout(function(){$burger.removeClass("closing"),clearTimeout(clickDelayTimer),clickDelayTimer=null},clickDelay)}})};return{getMenuHeadingVal:getMenuHeadingVal,animateMobileMenu:animateMobileMenu,removeMobileLogoText:removeMobileLogoText,collapseMobileMenu:collapseMobileMenu,setMenuBarHeight:setMenuBarHeight,toggleGhostMenu:toggleGhostMenu,menuMobile:menuMobile}}var headerInstance;return{getInstance:function(){return headerInstance||(headerInstance=createHeaderInstance()),headerInstance}}}(jQuery,window,sapient);sapient.header=headerObj.getInstance(),sapient.header.getMenuHeadingVal(),sapient.header.animateMobileMenu(),sapient.header.removeMobileLogoText(),sapient.header.collapseMobileMenu(),sapient.header.setMenuBarHeight(),sapient.header.toggleGhostMenu(),sapient.header.menuMobile();var followUsObj=function($,window,sapient){function createInstagramInstance(){var setInstagramDimensions=function(){var windowWidth=$(window).width();if(windowWidth>1600&&$(".follow-us-text .text-wrapper").height("auto"),windowWidth>979&&windowWidth<1600){var heightImages=$(".inner-wrapper .image-link").height();$(".follow-us-text .text-wrapper").height(heightImages),$(".follow-us-text .text-wrapper").height("auto")}else if(windowWidth>767&&windowWidth<979){var heightImages=$(".inner-wrapper .image-link").height();$(".follow-us-text .text-wrapper").height(2*heightImages),$(".follow-us-text .text-wrapper").width("100%")}else $(".follow-us-text .text-wrapper").height(320)},onResize=function(){$(window).on("resize",function(){debounce(sapient.footer.setInstagramDimensions,500,"resizing instagram")})};return{setInstagramDimensions:setInstagramDimensions,onResize:onResize}}var instagramInstance;return{getInstance:function(){return instagramInstance||(instagramInstance=createInstagramInstance()),instagramInstance}}}(jQuery,window,sapient);sapient.footer=followUsObj.getInstance();var footerObj=function($,window,sapient){function createFooterInstance(){var setFooterDdownPos=function(){var windowWidth=$(window).width();if(windowWidth>1200&&windowWidth<1400){var right=(windowWidth-1170)/2;$("footer .select-wrapper").css("right",right+15+"px")}else if(windowWidth>1400){var right=(windowWidth-1400)/2;$("footer .select-wrapper").css("right",right+15+"px")}},onResize=function(){$(window).on("resize",function(){debounce(sapient.footer.setFooterDdownPos,500,"testing debounce")})};return{setFooterDdownPos:setFooterDdownPos,onResize:onResize}}var footerInstance;return{getInstance:function(){return footerInstance||(footerInstance=createFooterInstance()),footerInstance}}}(jQuery,window,sapient);sapient.footer=footerObj.getInstance(),sapient.footer.setFooterDdownPos(),sapient.footer.onResize();