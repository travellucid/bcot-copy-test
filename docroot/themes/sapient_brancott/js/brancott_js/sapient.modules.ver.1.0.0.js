if(!$)var $=jQuery.noConflict();var sapient=sapient||{};$(document).ready(function(){$(".nav").setup_navigation(),$("body").addClass("js")});var keyCodeMap={48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",59:";",65:"a",66:"b",67:"c",68:"d",69:"e",70:"f",71:"g",72:"h",73:"i",74:"j",75:"k",76:"l",77:"m",78:"n",79:"o",80:"p",81:"q",82:"r",83:"s",84:"t",85:"u",86:"v",87:"w",88:"x",89:"y",90:"z",96:"0",97:"1",98:"2",99:"3",100:"4",101:"5",102:"6",103:"7",104:"8",105:"9"};$.fn.setup_navigation=function(settings){settings=jQuery.extend({menuHoverClass:"show-menu"},settings),$(this).attr("role","menubar").find("li").attr("role","menuitem");var top_level_links=$(this).find("> li > a");$(top_level_links).next("ul").attr("data-test","true").attr({"aria-hidden":"true",role:"menu"}).find("a").attr("tabIndex",-1),$(top_level_links).each(function(){$(this).next("ul").length>0&&$(this).parent("li").attr("aria-haspopup","true")}),$(top_level_links).parent("li").hover(function(){$(this).addClass("hovered")},function(){$(this).removeClass("hovered")}),$(top_level_links).hover(function(){$(".level-2.list-reset").removeAttr("style"),$(this).parent("li").addClass("hovered"),$(this).closest("ul").attr("aria-hidden","false").find("."+settings.menuHoverClass).attr("aria-hidden","true").removeClass(settings.menuHoverClass).find("a").attr("tabIndex",-1),$(this).next("ul").attr("aria-hidden","false").addClass(settings.menuHoverClass).find("a").attr("tabIndex",0)},function(){$(this).next("ul").attr("aria-hidden","true").removeClass(settings.menuHoverClass).find("a").attr("tabIndex",0)}),$(top_level_links).focus(function(){$(".level-2.list-reset").removeAttr("style"),$(this).closest("ul").find("."+settings.menuHoverClass).attr("aria-hidden","true").removeClass(settings.menuHoverClass).find("a").attr("tabIndex",-1),$(this).next("ul").attr("aria-hidden","false").addClass(settings.menuHoverClass).find("a").attr("tabIndex",0)}),$(top_level_links).keydown(function(e){37==e.keyCode?(e.preventDefault(),0==$(this).parent("li").prev("li").length?$(this).parents("ul").find("> li").last().find("a").first().focus():$(this).parent("li").prev("li").find("a").first().focus()):38==e.keyCode?(e.preventDefault(),$(this).parent("li").find("ul").length>0&&$(this).parent("li").find("ul").attr("aria-hidden","false").addClass(settings.menuHoverClass).find("a").attr("tabIndex",0).last().focus()):39==e.keyCode?(e.preventDefault(),0==$(this).parent("li").next("li").length?$(this).parents("ul").find("> li").first().find("a").first().focus():$(this).parent("li").next("li").find("a").first().focus()):40==e.keyCode?(e.preventDefault(),$(this).parent("li").find("ul").length>0&&$(this).parent("li").find("ul").attr("aria-hidden","false").addClass(settings.menuHoverClass).find("a").attr("tabIndex",0).first().focus()):13==e.keyCode||32==e.keyCode?$(this).parent("li").find("ul[aria-hidden=true]").attr("aria-hidden","false").addClass(settings.menuHoverClass).find("a").attr("tabIndex",0).first().focus():27==e.keyCode?(e.preventDefault(),$("."+settings.menuHoverClass).attr("aria-hidden","true").removeClass(settings.menuHoverClass).find("a").attr("tabIndex",-1)):$(this).parent("li").find("ul[aria-hidden=false] a").each(function(){if($(this).text().substring(0,1).toLowerCase()==keyCodeMap[e.keyCode])return $(this).focus(),!1})});var links=$(top_level_links).parent("li").find("ul").find("a");$(links).keydown(function(e){if(38==e.keyCode)e.preventDefault(),0==$(this).parent("li").prev("li").length?$(this).parents("ul").parents("li").find("a").first().focus():$(this).parent("li").prev("li").find("a").first().focus();else if(40==e.keyCode)e.preventDefault(),0==$(this).parent("li").next("li").length?$(this).parents("ul").parents("li").find("a").first().focus():$(this).parent("li").next("li").find("a").first().focus();else if(27==e.keyCode||37==e.keyCode)e.preventDefault(),$(this).parents("ul").first().prev("a").focus().parents("ul").first().find("."+settings.menuHoverClass).attr("aria-hidden","true").removeClass(settings.menuHoverClass).find("a").attr("tabIndex",-1);else if(32==e.keyCode)e.preventDefault(),window.location=$(this).attr("href");else{var found=!1;$(this).parent("li").nextAll("li").find("a").each(function(){if($(this).text().substring(0,1).toLowerCase()==keyCodeMap[e.keyCode])return $(this).focus(),found=!0,!1}),found||$(this).parent("li").prevAll("li").find("a").each(function(){if($(this).text().substring(0,1).toLowerCase()==keyCodeMap[e.keyCode])return $(this).focus(),!1})}}),$(this).find("a").last().keydown(function(e){9==e.keyCode&&$("."+settings.menuHoverClass).attr("aria-hidden","true").removeClass(settings.menuHoverClass).find("a").attr("tabIndex",-1)}),$(document).click(function(){$("."+settings.menuHoverClass).attr("aria-hidden","true").removeClass(settings.menuHoverClass).find("a").attr("tabIndex",-1)}),$(this).click(function(e){e.stopPropagation()})};var datePickerObj=function($,window,sapient){function createDatePickerInstance(){var bindDatePicker=function(){$(".enquire-form .date-wrapper .date").datetimepicker({maxDate:"2020/01/01",format:"DD-MM-YYYY"}).find("input:first").on("blur",function(){var date=sapient.datepicker.parseDate($(this).val());sapient.datepicker.isValidDate(date)||(date=moment().format("YYYY-MM-DD")),$(this).val(date)}),$(".fa-clock-o").closest(".picker-switch").hide(),$(".table-condensed .next").html(""),$(".table-condensed .prev").html(""),$(".enquire-form .date-wrapper input").attr("readonly","readonly"),$(".calender-icon").on("click",function(){$("#edit-preferred-date").focus(),sapient.datepicker.positionCalender()}),$(window).on("resize",function(){debounce(sapient.datepicker.positionCalender,50,"changing calenderPostion")}),$(".enquire-form .date-wrapper .date").on("change",function(){var getDay,newDate,monthArray=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],weekArray=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],val=$(this).val().split("-");val[1]=monthArray[val[1]-1],getDay=weekArray[new Date($(this).val().replace(/(\d{2})-(\d{2})-(\d{4})/,"$2/$1/$3")).getDay()],val.unshift(getDay),newDate=val.join(" "),$(this).val(newDate),$(" .bootstrap-datetimepicker-widget").hide()})},positionCalender=function(){var iconPos=$(".calender-icon").offset();$(".bootstrap-datetimepicker-widget ").is(":visible")===!0&&($(this).blur(),$windowWidth>1281&&$(".bootstrap-datetimepicker-widget ").css("left",iconPos.left))},isValidDate=function(value,format){format=format||!1,format&&(value=sapient.datepicker.parseDate(value));var timestamp=Date.parse(value);return 0==isNaN(timestamp)},parseDate=function(value){var m=value.match(/^(\d{1,2})(\/|-)?(\d{1,2})(\/|-)?(\d{4})$/);return m&&(value=m[5]+"-"+("00"+m[3]).slice(-2)+"-"+("00"+m[1]).slice(-2)),value};return{bindDatePicker:bindDatePicker,positionCalender:positionCalender,isValidDate:isValidDate,parseDate:parseDate}}var datetimepickerInstance;return{getInstance:function(){return datetimepickerInstance||(datetimepickerInstance=createDatePickerInstance()),datetimepickerInstance}}}(jQuery,window,sapient);sapient.datepicker=datePickerObj.getInstance(),sapient.datepicker.bindDatePicker();var commonObj=function($,window,sapient){function createInstance(){var scrollToNext=function(){var hrefLink=$($(".scroll-to")[1]).attr("id");$(".scroll-down").attr("href","#"+hrefLink)},hideLinkText=function(){$("footer section.social-icons nav ul li a").text("")},toggleAwardsDetails=function(){$(".awards-accolades .see-more-btn-wrapper .see-more-btn").click(function(){$(".awards-accolades .list-wrapper .awards-details-wrapper").removeClass("hidden-details-wrapper"),$(this).hide()})},addBgNoise=function(){for(var section=$("section .views-element-container"),i=1;i<section.length;i+=2)$(section[i]).addClass("background-noise-section")},emptyform=function(){var cacheChecker=document.getElementById("cacheTest");cacheChecker&&(cacheChecker.value.length&&document.location.reload(),cacheChecker.value="cacheTest")},assignTouchDeviceClass=function(){var isIOS=!!navigator.platform&&/iPad|iPhone|iPod/.test(navigator.platform),isAndroid=navigator.userAgent.indexOf("Android")>=0;(isIOS||isAndroid)&&$("body").addClass("touch-device")},telAppledevices=function(){var isIOS=!!navigator.platform&&/iPad|iPhone|iPod/.test(navigator.platform),isAndroid=navigator.userAgent.indexOf("Android")>=0;(isIOS||isAndroid)&&$("#find-us-component #map-overlay a[href^='tel']").addClass("touchDevices")},posSignup=function(){var $main=$("footer").prev();0===$main.find(".sign-up").parent().next().length?$main.find(".sign-up").parent().css("padding",0):$main.find(".sign-up").parent().next().hasClass("background-noise-section")&&$main.find(".sign-up").parent().addClass("background-noise-section")},posFilters=function(){$($("section.padding-class")[$("section.padding-class").length-1]).find("#product-grid .category-wrapper");var $filter=$($("section.padding-class")[$("section.padding-class").length-1]);$filter.find("#product-grid .category-wrapper").length>0&&$filter.css("padding",0)},instaGrain=function(){var $instaComp=$(".block-views-blocksocial-feed-instagram-component-social-feed-instagram-component");$instaComp.next().hasClass("background-noise-section")&&$instaComp.addClass("background-noise-section")},awardsGrain=function(){var $awardsGrain=$(".block-views-blockwines-hero-component-awards-and-accolades");$awardsGrain.next().hasClass("background-noise-section")||$awardsGrain.css("padding",0)},posForm=function(){var $form=$("form").parent();$form.prev().hasClass("background-noise-section")&&!$form.hasClass("background-noise-section")&&$form.css("padding-top","100px")},killHash=function(){$("a").each(function(){"#"==$(this).attr("href")&&$(this).click(function(e){e.preventDefault()})})};return{scrollToNext:scrollToNext,hideLinkText:hideLinkText,toggleAwardsDetails:toggleAwardsDetails,addBgNoise:addBgNoise,emptyform:emptyform,assignTouchDeviceClass:assignTouchDeviceClass,telAppledevices:telAppledevices,posSignup:posSignup,instaGrain:instaGrain,posForm:posForm,posFilters:posFilters,awardsGrain:awardsGrain,killHash:killHash}}var commonInstance;return{getInstance:function(){return commonInstance||(commonInstance=createInstance()),commonInstance}}}(jQuery,window,sapient);sapient.common=commonObj.getInstance(),sapient.common.hideLinkText(),sapient.common.addBgNoise(),sapient.common.toggleAwardsDetails(),sapient.common.assignTouchDeviceClass(),sapient.common.killHash(),sapient.common.emptyform(),sapient.common.telAppledevices(),sapient.common.posSignup(),sapient.common.instaGrain(),sapient.common.posForm(),sapient.common.awardsGrain(),sapient.common.posFilters();var carouselObj=function($,window,sapient){function createCarouselInstance(){var enableTouchCarousel=function(value){$(value).find(".item").length>1?$(value).on("touchstart",function(event){var xClick=event.originalEvent.touches[0].pageX;$(this).one("touchmove",function(event){var xMove=event.originalEvent.touches[0].pageX;Math.floor(xClick-xMove)>5?$(value).carousel("next"):Math.floor(xClick-xMove)<-5&&$(value).carousel("prev")}),$(value).on("touchend",function(){$(this).off("touchmove")})}):$(value).find(".carousel-control-wrapper").remove()},disableTouchCarousel=function(value){},togggleCarouselView=function(id){$(window).width()<690?(sapient.carousel.enableTouchCarousel("#product-grid-carousal"),$(id).addClass("slide")):$(id).removeClass("slide")},findCarousalItems=function(id){$(id).find(".carousel-inner .item").each(function(){var gifLength=$(this).find("video").siblings(".fallback-gif").length,videoLength=($(this).find("video").siblings(".fallback-image").length,$(this).find("video").length),isIOS=!!navigator.platform&&/iPad|iPhone|iPod/.test(navigator.platform),isAndroid=navigator.userAgent.indexOf("Android")>=0;isIOS||isAndroid?($(this).find("video").hide(),$(this).find(".fallback-gif").show(),$(this).find(".fallback-image").hide()):0===videoLength&&gifLength>0?($(this).find("video").hide(),$(this).find(".fallback-gif").show(),$(this).find(".fallback-image").hide()):0===videoLength&&0===gifLength?($(this).find("video").hide(),$(this).find(".fallback-gif").hide(),$(this).find(".fallback-image").show()):($(this).find("video").show(),$(this).find(".fallback-gif").hide(),$(this).find(".fallback-image").hide())})},disableArrowsControlsSmallDevices=function(){var isIOS=!!navigator.platform&&/iPad|iPhone|iPod/.test(navigator.platform),isAndroid=navigator.userAgent.indexOf("Android")>=0;isIOS||isAndroid||$(window).width()<1025?($(".carousel-control-wrapper .prev-carousal").css("left",0),$(".carousel-control-wrapper .next-carousal").css("right",0)):$(".carousel-control-wrapper").show()},onResize=function(){$(window).on("resize",function(){sapient.carousel.togggleCarouselView("#product-grid-carousal"),debounce(sapient.carousel.positionCarousel,500,"resizing carouselIndicator"),debounce(sapient.carousel.positionCarouselControl,500,"resizing carouselControl"),debounce(sapient.carousel.disableArrowsControlsSmallDevices,500,"resizing disableArrowsControlsSmallDevices")})},positionCarouselControl=function(){setInterval(function(){var $heightImg=$($("#carousel-new-story .carousel-inner  picture img")[0]).height();$heightImg>0&&($("#carousel-new-story .carousel-control-wrapper .prev-carousal").css("top",$heightImg/2),$("#carousel-new-story .carousel-control-wrapper .next-carousal").css("top",$heightImg/2))},200)},playPauseVideo=function(){var vid=$(".carousel-inner video"),vidPos=vid.offset();if(0===vid.length)return $(this).siblings().find(".fallback-image").show(),!1;if($(window).scrollTop()>vidPos.top-vid.height()&&$(window).scrollTop()<vidPos.top+vid.height()){if(!vid.parents(".item").hasClass("active"))return vid.get(0).pause(),!1;vid.get(0).play(),vid.on("timeupdate",function(){this.currentTime>=Math.floor(vid.get(0).duration)&&(this.currentTime=0)})}else vid.get(0).pause()},bindSlideEvent=function(id){$(id).on("slid.bs.carousel",function(e){sapient.carousel.playPauseVideo()})},onScroll=function(){$(window).scroll(function(){debounce(sapient.carousel.playPauseVideo,200,"playPauseVideo on scroll")})},positionCarousel=function(){var maxHeight,heightArr=[],interval=setInterval(function(){var $heightImg=$($("#carousel-new-story .carousel-inner  picture img")[0]).height();$heightImg>0&&($("#carousel-new-story .carousel-indicators").css("top",$heightImg-36+"px"),$.each($("#carousel-new-story .carousel-inner .item"),function(index){var $heightCarousal=$($("#carousel-new-story .carousel-inner .item")[index]).height();heightArr.push($heightCarousal),maxHeight=Math.max.apply(Math,heightArr),$("#carousel-new-story .carousel-inner").css("height",maxHeight)}),clearInterval(interval))},200)},toggleCarouselArrow=function(id){$(id).hover(function(){$(this).find(".carousel-control-wrapper").animate({opacity:["1"]},500)},function(){$(this).find(".carousel-control-wrapper").animate({opacity:["0"]},500)})};return{enableTouchCarousel:enableTouchCarousel,toggleCarouselArrow:toggleCarouselArrow,positionCarousel:positionCarousel,onResize:onResize,onScroll:onScroll,positionCarouselControl:positionCarouselControl,playPauseVideo:playPauseVideo,bindSlideEvent:bindSlideEvent,disableArrowsControlsSmallDevices:disableArrowsControlsSmallDevices,findCarousalItems:findCarousalItems,togggleCarouselView:togggleCarouselView,disableTouchCarousel:disableTouchCarousel}}var carouselInstance;return{getInstance:function(){return carouselInstance||(carouselInstance=createCarouselInstance()),carouselInstance}}}(jQuery,window,sapient);sapient.carousel=carouselObj.getInstance(),sapient.carousel.enableTouchCarousel("#carousel-our-story"),sapient.carousel.enableTouchCarousel("#carousel-our-wines"),sapient.carousel.enableTouchCarousel("#carousel-new-story"),sapient.carousel.bindSlideEvent("#carousel-our-story"),sapient.carousel.bindSlideEvent("#carousel-our-wines"),sapient.carousel.bindSlideEvent("#carousel-new-story"),sapient.carousel.positionCarousel(),sapient.carousel.positionCarouselControl(),sapient.carousel.onResize(),sapient.carousel.togggleCarouselView("#product-grid-carousal"),sapient.carousel.onScroll(),sapient.carousel.playPauseVideo(),sapient.carousel.disableArrowsControlsSmallDevices(),sapient.carousel.findCarousalItems("#carousel-our-story"),sapient.carousel.findCarousalItems("#carousel-new-story");var heroObj=function($,window,sapient){function createHeroInstance(){var setLocalTime=function(offset){var d=new Date,utc=d.getTime()+6e4*d.getTimezoneOffset(),time=new Date(utc+36e5*offset),m_names=new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"),curr_year=time.getFullYear(),curr_month=time.getMonth(),curr_date=time.getDate(),hours=time.getHours(),mins=time.getMinutes(),timeStr="";mins<10&&(mins="0"+mins),hours-12<0?amPm="am":(amPm="pm",hours-=12),timeStr=curr_date+" "+m_names[curr_month]+" "+curr_year+" / "+hours+":"+mins+amPm;var dateTimeHeading=$("#hero-component .date-time");dateTimeHeading.length>0&&$("#hero-component .date-time").text(timeStr)};return{setLocalTime:setLocalTime}}var heroInstance;return{getInstance:function(){return heroInstance||(heroInstance=createHeroInstance()),heroInstance}}}(jQuery,window,sapient);sapient.hero=heroObj.getInstance(),sapient.hero.setLocalTime("+13");var headerObj=function($,window,sapient){function createHeaderInstance(){var getMenuHeadingVal=function(){$windowWidth=$(window).width();var allowSubmit=!1;$(document).on("click","#navbar-header .menu > .dropdown",function(e){$windowWidth<990&&!allowSubmit&&(e.preventDefault(),e.stopPropagation(),$(this).find(".sub-menu-wrapper .menu-heading span.text").text($(this).children("a").text().trim()),allowSubmit=!0),allowSubmit=!1}),$(document).on("click","#navbar-header .sub-menu .sub-menu-wrapper .sub-menu-link ",function(e){allowSubmit=!0}),$(document).on("click","#navbar-header .menu > .dropdown  .expand-icon ",function(e){$(this).parents(".menu-item").find(".sub-menu-wrapper .menu-heading span.text").text($(this).parents("a").text().trim())})},animateMobileMenu=function(){$("#navbar-header .menu .menu-item").on("click",function(){$(this).parents(".menu").hasClass("menu-open")?$(this).parents(".menu").removeClass("menu-open"):$(this).parents(".menu").addClass("menu-open")})},accessibleMenu=function(){$(".dropdown a").keydown(function(event){32==event.which&&(event.preventDefault(),$(this).siblings(".sub-menu").toggle())})},removeMobileLogoText=function(){$("#navbar-header .logo a").text("")},collapseMobileMenu=function(){var windowWidth=$(window).width();windowWidth<769&&$("#navbar-header").removeClass("in").addClass("collapse")},setMenuBarHeight=function(){var windowWidth=$(window).width();windowWidth>990&&$("#navbar-header .menu-item, #wine-filters .menu-item").hover(function(){$(this).find(">a").css("color","#d50032"),$(this).find(".sub-menu .sub-menu-wrapper").show();var subMenuHeight=$(this).find(".sub-menu .sub-menu-wrapper").height();$(this).find(".sub-menu ").height(subMenuHeight)},function(){$(this).find(">a").css("color","white"),$(this).find(".sub-menu .sub-menu-wrapper").hide(),$(this).find(".sub-menu ").removeAttr("style")})},toggleGhostMenu=function(){$(window).on("scroll",function(){0!==$(window).scrollTop()?($("#navbar-header").addClass("semi-solid-menu"),$("header").addClass("white-background")):$("#navbar-header").hasClass("in")||($("#navbar-header").removeClass("semi-solid-menu"),$("header").removeClass("white-background"))}),$("header").hover(function(){$("#navbar-header").addClass("semi-solid-menu solid-menu")},function(){$("#navbar-header").removeClass("solid-menu"),0==$(window).scrollTop()&&$("#navbar-header").removeClass("semi-solid-menu")})},menuMobile=function(){var clickDelay=500,clickDelayTimer=null;$(".burger-click-region").on("click",function(){if($("#navbar-header").hasClass("in")&&0==$(window).scrollTop()?$("header").removeClass("white-background").css("opacity",.96):($("header").addClass("white-background").css("opacity",1),$("#navbar-header .navbar-nav").removeClass("menu-open")),null===clickDelayTimer){var $burger=$(this);$burger.toggleClass("active"),$burger.parent().toggleClass("is-open"),$burger.hasClass("active")||$burger.addClass("closing"),clickDelayTimer=setTimeout(function(){$burger.removeClass("closing"),clearTimeout(clickDelayTimer),clickDelayTimer=null},clickDelay)}})},scrollingSubMenu=function(){$(window).width()<991?$(".sub-menu-wrapper").each(function(){$(this).height($(window).height()-$("header.navbar").height()).addClass("scrollItBaby")}):$(".sub-menu-wrapper").each(function(){$(this).height("").removeClass("scrollItBaby")})},onResize=function(){$(window).on("resize",function(){debounce(sapient.header.scrollingSubMenu,500,"scroll the subnav")})};return{getMenuHeadingVal:getMenuHeadingVal,animateMobileMenu:animateMobileMenu,removeMobileLogoText:removeMobileLogoText,collapseMobileMenu:collapseMobileMenu,setMenuBarHeight:setMenuBarHeight,toggleGhostMenu:toggleGhostMenu,menuMobile:menuMobile,accessibleMenu:accessibleMenu,scrollingSubMenu:scrollingSubMenu,onResize:onResize}}var headerInstance;return{getInstance:function(){return headerInstance||(headerInstance=createHeaderInstance()),headerInstance}}}(jQuery,window,sapient);sapient.header=headerObj.getInstance(),sapient.header.getMenuHeadingVal(),sapient.header.animateMobileMenu(),sapient.header.removeMobileLogoText(),sapient.header.collapseMobileMenu(),sapient.header.setMenuBarHeight(),sapient.header.accessibleMenu(),sapient.header.toggleGhostMenu(),sapient.header.menuMobile(),sapient.header.scrollingSubMenu(),sapient.header.onResize();var followUsObj=function($,window,sapient){function createInstagramInstance(){var setContentWidth=function(){$(window).width()>1600?$("#follow-us #content").width($(window).width()-($("#follow-us #gallery").width()+10)):$("#follow-us #content").width("")},onResize=function(){$(window).on("resize",function(){debounce(sapient.followUs.setContentWidth,100,"resizing instagram content")})};return{setContentWidth:setContentWidth,onResize:onResize}}var instagramInstance;return{getInstance:function(){return instagramInstance||(instagramInstance=createInstagramInstance()),instagramInstance}}}(jQuery,window,sapient);sapient.followUs=followUsObj.getInstance(),sapient.followUs.setContentWidth(),sapient.followUs.onResize();var ourWines=function($,window,sapient){function createFilterWinesCollection(){var filterWines=function(){var allProductsGrid=$("#response-wrapper").html(),filtersTop=$("#block-Filter_block_our_wines").offset(),wineFilter=$(".wine-filters-desktop"),localeCode=drupalSettings.path.currentLanguage;$(".filter-item").on("click",function(e){if(e.preventDefault(),!$(this).hasClass("active-filter")){if("all-data"===$(this).data("categoryFilter"))$("#response-wrapper").html(allProductsGrid),$(".filter-item").removeClass("active-filter");else{var wineCategory=$(this).data("category"),wineCategoryFilter=$(this).data("categoryFilter");$(".filter-item").removeClass("active-filter"),$(this).addClass("active-filter"),$.ajax({url:"/"+localeCode+"/search-page?"+wineCategory+"="+wineCategoryFilter,type:"GET",success:function(data){$("#response-wrapper").html(data),sapient.common.killHash()}})}setTimeout(function(){if($(window).width()<990){$("#close-filters").trigger("click");var headerHeight=$("header.navbar").outerHeight(),topPos=filtersTop.top-headerHeight;$("body, html").animate({scrollTop:topPos},"slow")}else{$(".level-2.list-reset").css({opacity:0,left:-9999});var headerHeight=$("header.navbar").outerHeight(),topPos=filtersTop.top-headerHeight;$("body, html").animate({scrollTop:topPos},"slow"),$(wineFilter).find("li.hovered").blur().removeClass("hovered")}},250)}})},seeMoreLess=function(){$(document).on("click","#product-grid .see-less",function(){$(this).hide(),$(this).siblings().find(".ellipses").show(),$(this).siblings(".extra-text").hide(),$(this).siblings(".see-more").show()}),$(document).on("click","#product-grid .see-more",function(){$(this).hide(),$(this).prev().find(".ellipses").hide(),$(this).siblings(".extra-text").css("display","block"),$(this).siblings(".see-less").show()})},mobileFiltersMenu=function(){$("#open-navigation").on("click",function(){$("#mobile-navigation").addClass("navigation-active"),$(this).addClass("navigation-activated");var navTop=$("#mobile-navigation h2").outerHeight();$("#mobile-navigation-scroll-wrapper").css({height:$(window).height()-navTop})}),$("#close-navigation").on("click",function(){$("#mobile-navigation").removeClass("navigation-active"),$(".iamalive").removeClass("iamalive"),$("ul.nav.categories").css("left",""),$("#mobile-navigation-scroll-wrapper").removeAttr("style"),$("#open-navigation").removeClass("navigation-activated")}),$("#open-filters").on("click",function(){$("#mobile-filters").addClass("filters-active"),$(this).addClass("filters-activated");var navTop=$("#mobile-filters h2").outerHeight();$("#mobile-filters-scroll-wrapper").css({height:$(window).height()-navTop})}),$("#close-filters").on("click",function(){$("#mobile-filters").removeClass("filters-active"),$(".iamalive").removeClass("iamalive"),$("ul.nav.categories").css("left",""),$("#mobile-filters-scroll-wrapper").removeAttr("style"),$("#open-filters").removeClass("filters-activated")}),$(window).scroll(function(){var navTopnavigation=$("#mobile-navigation h2").outerHeight();$("#mobile-navigation-scroll-wrapper").css({height:$(window).height()-navTopnavigation});var navTopfilters=$("#mobile-filters h2").outerHeight();$("#mobile-filters-scroll-wrapper").css({height:$(window).height()-navTopfilters})}),$("a.category").on("click",function(e){e.preventDefault(),$(this).addClass("iamalive"),$("ul.nav.categories").animate({left:"-"+100*$(this).data("level")+"%"},350,"linear")}),$("a.sub-nav-return").on("click",function(e){e.preventDefault();var parentHider=$(this).closest(".sub-categories").prev(".category.iamalive");$("ul.nav.categories").animate({left:"-"+100*($(this).data("level")-1)+"%"},350,"linear"),setTimeout(function(){$(parentHider).removeClass("iamalive"),parentHider=null},500)})},closeMobileNavs=function(){$(window).width()>990&&($("#close-navigation").trigger("click"),$("#close-filters").trigger("click"))},onResize=function(){$(window).on("resize",function(){debounce(sapient.winesFilter.closeMobileNavs,100,"close Mobile Navs")})};return{filterWines:filterWines,mobileFiltersMenu:mobileFiltersMenu,closeMobileNavs:closeMobileNavs,onResize:onResize,seeMoreLess:seeMoreLess}}var filterWinesCollection;return{getInstance:function(){return filterWinesCollection||(filterWinesCollection=createFilterWinesCollection()),filterWinesCollection}}}(jQuery,window,sapient);sapient.winesFilter=ourWines.getInstance(),sapient.winesFilter.filterWines(),sapient.winesFilter.mobileFiltersMenu(),sapient.winesFilter.onResize(),sapient.winesFilter.seeMoreLess();var footerObj=function($,window,sapient){function createFooterInstance(){var setFooterDdownPos=function(){var windowWidth=$(window).width();if(windowWidth>1200){var right=(windowWidth-1170)/2;$("footer .select-wrapper").css("right",right+"px")}},onResize=function(){$(window).on("resize",function(){debounce(sapient.footer.setFooterDdownPos,500,"testing debounce")})},regionSelector=function(name){$(document).on("click","footer .region-text",function(){document.cookie=name+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;",location.reload()})};return{setFooterDdownPos:setFooterDdownPos,onResize:onResize,regionSelector:regionSelector}}var footerInstance;return{getInstance:function(){return footerInstance||(footerInstance=createFooterInstance()),footerInstance}}}(jQuery,window,sapient);sapient.footer=footerObj.getInstance(),sapient.footer.regionSelector("age_checked");var validationObj=function($,window,sapient){function createValidtaionInstance(){var validate=function(){var $input=$(".enquire-form  .group input").filter("[required]:visible"),$select=$(".enquire-form .group select").filter("[required]:visible");$(".enquire-form .submit-info .submit-btn").click(function(event){$("#errMsg .messages").html("");var checked=$(".enquire-form  .subscription-checkbox").filter("[required]:visible"),inputflag=0,inputarr=[],selectflag=0,selectarr=[],msgarr=[];$.each($input,function(index){0==$($input[index]).val().length?($($input[index]).siblings("label").addClass("error"),$($input[index]).addClass("error-border"),msgarr.push($($input[index]).siblings("label").text())):($($(".enquire-form .group label")[index]).removeClass("error"),$($input[index]).removeClass("error-border")),inputarr.push($($input[index]).val().length)}),$.each($select,function(index){""==$select[index].value?($($select[index]).siblings("label").addClass("error"),$($select[index]).addClass("error-border"),msgarr.push($($select[index]).siblings("label").text())):$($select[index]).removeClass("error-border"),selectarr.push($select[index].value)}),0!==msgarr.length?($("#errMsg").addClass("error"),$("#errMsg").css("display","block"),$.each(msgarr,function(index){$("#errMsg .messages").append('<li class="msg">'+msgarr[index]+"</li>")})):$("#errMsg").css("display","none"),$.each(inputarr,function(index){0===inputarr[index]&&(inputflag=0,event.preventDefault())}),$.each(selectarr,function(index){""==selectarr[index]&&(selectflag=0,event.preventDefault())}),$.each(checked,function(index){checked.is(":checked")?($(this).siblings("label").removeClass("change"),$(this).siblings("label").removeClass("error")):($(this).siblings("label").addClass("change"),$(this).siblings("label").addClass("error"),event.preventDefault())})})},inputSelect=function(){var $input=$(".enquire-form  .group input").filter("[required]:visible");$input.each(function(){0!==$(this).val().length?$(this).siblings("label").addClass("text-entered"):$(this).siblings("label").removeClass("text-entered")})},selectInMac=function(){var $select=$(".enquire-form .group select"),mac=!!navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i);mac&&$.each($select,function(){$(this).addClass("mac-specific")})},submitBtnClass=function(){$(".enquire-form button.submit-btn").removeClass().addClass("cta dark submit-btn"),$(".enquire-form .other-information textarea").removeClass().addClass("detail-info header_e")},inputOnFocus=function(){$(".enquire-form input.brancott-form").on("focus",function(){$(this).removeClass("error-border"),$(this).siblings("label").removeClass("error"),$(this).siblings().find(" .highlight1").css({left:"50%"},{width:"0.1%"}).animate({left:"-0.1%",width:"50.1%"},"slow"),$(this).siblings().find(" .highlight2").css({width:"0.1%"}).animate({width:"49.9%"},"slow")})},inputOnFocusOut=function(){$(".enquire-form input.brancott-form").on("focusout",function(){$(this).siblings().find(" .highlight1").css({left:"0"},{width:"50%"}).animate({left:"50%",width:"0"},"slow"),$(this).siblings().find(" .highlight2").css({width:"50%"}).animate({width:"0"},"slow")})},selectChange=function(){var $select=$(".enquire-form .group select");$select.on("change",function(){$(this).removeClass("error-border"),$(this).siblings("label").removeClass("error")})},handleBackEndSucess=function(){var successMsg=$(".successfull-msg").find("li");if(successMsg.length>0){var str=successMsg.text();$(".successfull-msg").hide(),$("html, body").animate({scrollTop:$("#block-webform_block").offset().top},1e3),$(".enquire-form .error-msg").show(),$(".enquire-form .error-msg").find(".header_e").css("display","none"),$(".enquire-form ol  ").append("<li>"+str+"</li>")}},handleBackEndError=function(){var beErrLength=$(".custom-error li").length,$input=$(".enquire-form  .group input");if(beErrLength>0){var str="";$(".custom-error li").each(function(){str=$(this).text(),$("html, body").animate({scrollTop:$("#block-webform_block").offset().top},1e3),$(".enquire-form .error-msg").addClass("error").show(),$(".enquire-form ol  ").append("<li class='msg'>"+str+"</li>")})}$.each($input,function(index){$($input[index]).hasClass("error")?($($input[index]).siblings("label").addClass("error"),$($input[index]).addClass("error-border")):($($input[index]).siblings("label").removeClass("error"),
$($input[index]).removeClass("error-border"))})};return{validate:validate,handleBackEndSucess:handleBackEndSucess,inputOnFocus:inputOnFocus,inputOnFocusOut:inputOnFocusOut,selectChange:selectChange,submitBtnClass:submitBtnClass,handleBackEndError:handleBackEndError,selectInMac:selectInMac,inputSelect:inputSelect}}var validationInstance;return{getInstance:function(){return validationInstance||(validationInstance=createValidtaionInstance()),validationInstance}}}(jQuery,window,sapient);sapient.validation=validationObj.getInstance(),sapient.validation.validate(),sapient.validation.handleBackEndError(),sapient.validation.handleBackEndSucess(),sapient.validation.inputOnFocus(),sapient.validation.inputOnFocusOut(),sapient.validation.selectChange(),sapient.validation.submitBtnClass(),sapient.validation.selectInMac(),sapient.validation.inputSelect();