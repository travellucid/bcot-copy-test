if(!$)var $=jQuery.noConflict();var sapient=sapient||{},datePickerObj=function($,window,sapient){function createDatePickerInstance(){var bindDatePicker=function(){$(".date").datetimepicker({maxDate:"2020/01/01",format:"YYYY-MM-DD"}).find("input:first").on("blur",function(){var date=sapient.datepicker.parseDate($(this).val());sapient.datepicker.sValidDate(date)||(date=moment().format("YYYY-MM-DD")),$(this).val(date)}),$(".calender-icon").on("click",function(){$("#edit-preferred-date").focus(),"block"===$(".bootstrap-datetimepicker-widget ").css("display")&&$(".bootstrap-datetimepicker-widget ").css("left",$(".calender-icon").offset().left)}),$(".enquire-form .brancott-form").on("focus",function(){$(this).siblings().find(" .highlight1").css({left:"50%"},{width:"0.1%"}).animate({left:"-0.1%",width:"50.1%"},"slow"),$(this).siblings().find(" .highlight2").css({width:"0.1%"}).animate({width:"49.9%"},"slow")}),$(".enquire-form .brancott-form").on("focusout",function(){$(this).siblings().find(" .highlight1").css({left:"0"},{width:"50%"}).animate({left:"50%",width:"0"},"slow"),$(this).siblings().find(" .highlight2").css({width:"50%"}).animate({width:"0"},"slow")})},isValidDate=function(value,format){format=format||!1,format&&(value=sapient.datepicker.parseDate(value));var timestamp=Date.parse(value);return 0==isNaN(timestamp)},parseDate=function(value){var m=value.match(/^(\d{1,2})(\/|-)?(\d{1,2})(\/|-)?(\d{4})$/);return m&&(value=m[5]+"-"+("00"+m[3]).slice(-2)+"-"+("00"+m[1]).slice(-2)),value};return{bindDatePicker:bindDatePicker,isValidDate:isValidDate,parseDate:parseDate}}var datetimepickerInstance;return{getInstance:function(){return datetimepickerInstance||(datetimepickerInstance=createDatePickerInstance()),datetimepickerInstance}}}(jQuery,window,sapient);sapient.datepicker=datePickerObj.getInstance(),sapient.datepicker.bindDatePicker();var commonObj=function($,window,sapient){function createInstance(){var scrollToNext=function(){var hrefLink=$($(".scroll-to")[1]).attr("id");$(".scroll-down").attr("href","#"+hrefLink)},hideLinkText=function(){$("footer section.social-icons nav ul li a").text("")},toggleAwardsDetails=function(){$(".awards-accolades .see-more-btn-wrapper .see-more-btn").click(function(){$(".awards-accolades .list-wrapper .awards-details-wrapper").removeClass("hidden-details-wrapper"),$(this).hide()})},addBgNoise=function(){for(var section=$("section .views-element-container"),i=1;i<section.length;i+=2)$(section[i]).addClass("background-noise-section")};return{scrollToNext:scrollToNext,hideLinkText:hideLinkText,toggleAwardsDetails:toggleAwardsDetails,addBgNoise:addBgNoise}}var commonInstance;return{getInstance:function(){return commonInstance||(commonInstance=createInstance()),commonInstance}}}(jQuery,window,sapient);sapient.common=commonObj.getInstance(),sapient.common.hideLinkText(),sapient.common.addBgNoise(),sapient.common.toggleAwardsDetails();var carouselObj=function($,window,sapient){function createCarouselInstance(){var enableTouchCarousel=function(value){$(value).on("touchstart",function(event){var xClick=event.originalEvent.touches[0].pageX;$(this).one("touchmove",function(event){var xMove=event.originalEvent.touches[0].pageX;Math.floor(xClick-xMove)>5?$(value).carousel("next"):Math.floor(xClick-xMove)<-5&&$(value).carousel("prev")}),$(value).on("touchend",function(){$(this).off("touchmove")})})},resize=function(){$(window).on("resize",function(){debounce(sapient.carousel.positionCarousel,500,"resizing carouselIndicator")})},positionCarousel=function(){var maxHeight,heightArr=[],interval=setInterval(function(){var $heightImg=$($("#carousel-new-story .carousel-inner  picture img")[0]).height();$heightImg>0&&($("#carousel-new-story .carousel-indicators").css("top",$heightImg-36+"px"),$.each($("#carousel-new-story .carousel-inner .item"),function(index){var $heightCarousal=$($("#carousel-new-story .carousel-inner .item")[index]).height();heightArr.push($heightCarousal),maxHeight=Math.max.apply(Math,heightArr),$("#carousel-new-story .carousel-inner").css("height",maxHeight)}),clearInterval(interval))},200)},toggleCarouselArrow=function(id){$(id).hover(function(){$(this).find(".carousel-control-wrapper").animate({opacity:["1"]},500)},function(){$(this).find(".carousel-control-wrapper").animate({opacity:["0"]},500)})};return{enableTouchCarousel:enableTouchCarousel,toggleCarouselArrow:toggleCarouselArrow,positionCarousel:positionCarousel,resize:resize}}var carouselInstance;return{getInstance:function(){return carouselInstance||(carouselInstance=createCarouselInstance()),carouselInstance}}}(jQuery,window,sapient);sapient.carousel=carouselObj.getInstance(),sapient.carousel.enableTouchCarousel("#carousel-our-story"),sapient.carousel.enableTouchCarousel("#carousel-our-wines"),sapient.carousel.enableTouchCarousel("#carousel-new-story"),sapient.carousel.enableTouchCarousel("#product-grid-carousal"),sapient.carousel.positionCarousel(),sapient.carousel.resize();var headerObj=function($,window,sapient){function createHeaderInstance(){var getMenuHeadingVal=function(){$windowWidth=$(window).width();var allowSubmit=!1;$(document).on("click","#navbar-header .menu > .dropdown",function(e){$windowWidth<990&&!allowSubmit&&(e.preventDefault(),e.stopPropagation(),$(this).find(".sub-menu-wrapper .menu-heading span.text").text($(this).children("a").text().trim()),allowSubmit=!0),allowSubmit=!1}),$(document).on("click","#navbar-header .sub-menu .sub-menu-wrapper .sub-menu-link ",function(e){allowSubmit=!0}),$(document).on("click","#navbar-header .menu > .dropdown  .expand-icon ",function(e){$(this).parents(".menu-item").find(".sub-menu-wrapper .menu-heading span.text").text($(this).parents("a").text().trim())})},animateMobileMenu=function(){$("#navbar-header .menu .menu-item").on("click",function(){$(this).parents(".menu").hasClass("menu-open")?$(this).parents(".menu").removeClass("menu-open"):$(this).parents(".menu").addClass("menu-open")})},accessibleMenu=function(){$(".dropdown a").keydown(function(event){32==event.which&&(event.preventDefault(),$(this).siblings(".sub-menu").toggle())})},removeMobileLogoText=function(){$("#navbar-header .logo a").text("")},collapseMobileMenu=function(){var windowWidth=$(window).width();windowWidth<769&&$("#navbar-header").removeClass("in").addClass("collapse")},setMenuBarHeight=function(){var windowWidth=$(window).width();windowWidth>990&&$("#navbar-header .menu-item, #wine-filters .menu-item").hover(function(){$(this).find(">a").css("color","#d50032"),$(this).find(".sub-menu .sub-menu-wrapper").show();var subMenuHeight=$(this).find(".sub-menu .sub-menu-wrapper").height();$(this).find(".sub-menu ").height(subMenuHeight)},function(){$(this).find(">a").css("color","white"),$(this).find(".sub-menu .sub-menu-wrapper").hide(),$(this).find(".sub-menu ").removeAttr("style")})},toggleGhostMenu=function(){$(window).on("scroll",function(){0!==$(window).scrollTop()?($("#navbar-header").addClass("semi-solid-menu"),$("header").addClass("white-background")):$("#navbar-header").hasClass("in")||($("#navbar-header").removeClass("semi-solid-menu"),$("header").removeClass("white-background"))}),$("header").hover(function(){$("#navbar-header").addClass("semi-solid-menu solid-menu"),$("header").removeClass("white-background")},function(){$("#navbar-header").removeClass("solid-menu"),0==$(window).scrollTop()&&$("#navbar-header").removeClass("semi-solid-menu")})},menuMobile=function(){var clickDelay=500,clickDelayTimer=null;$(".burger-click-region").on("click",function(){if($("#navbar-header").hasClass("in")&&0==$(window).scrollTop()?$("header").removeClass("white-background").css("opacity",.96):($("header").addClass("white-background").css("opacity",1),$("#navbar-header .navbar-nav").removeClass("menu-open")),null===clickDelayTimer){var $burger=$(this);$burger.toggleClass("active"),$burger.parent().toggleClass("is-open"),$burger.hasClass("active")||$burger.addClass("closing"),clickDelayTimer=setTimeout(function(){$burger.removeClass("closing"),clearTimeout(clickDelayTimer),clickDelayTimer=null},clickDelay)}})},scrollingSubMenu=function(){$(window).width()<991?$(".sub-menu-wrapper").each(function(){$(this).height($(window).height()-$("header.navbar").height()).addClass("scrollItBaby")}):$(".sub-menu-wrapper").each(function(){$(this).height("").removeClass("scrollItBaby")})},onResize=function(){$(window).on("resize",function(){debounce(sapient.header.scrollingSubMenu,500,"scroll the subnav")})};return{getMenuHeadingVal:getMenuHeadingVal,animateMobileMenu:animateMobileMenu,removeMobileLogoText:removeMobileLogoText,collapseMobileMenu:collapseMobileMenu,setMenuBarHeight:setMenuBarHeight,toggleGhostMenu:toggleGhostMenu,menuMobile:menuMobile,accessibleMenu:accessibleMenu,scrollingSubMenu:scrollingSubMenu,onResize:onResize}}var headerInstance;return{getInstance:function(){return headerInstance||(headerInstance=createHeaderInstance()),headerInstance}}}(jQuery,window,sapient);sapient.header=headerObj.getInstance(),sapient.header.getMenuHeadingVal(),sapient.header.animateMobileMenu(),sapient.header.removeMobileLogoText(),sapient.header.collapseMobileMenu(),sapient.header.setMenuBarHeight(),sapient.header.accessibleMenu(),sapient.header.toggleGhostMenu(),sapient.header.menuMobile(),sapient.header.scrollingSubMenu(),sapient.header.onResize();var followUsObj=function($,window,sapient){function createInstagramInstance(){var setContentWidth=function(){$(window).width()>1600?$("#follow-us #content").width($(window).width()-($("#follow-us #gallery").width()+10)):$("#follow-us #content").width("")},onResize=function(){$(window).on("resize",function(){debounce(sapient.followUs.setContentWidth,100,"resizing instagram content")})};return{setContentWidth:setContentWidth,onResize:onResize}}var instagramInstance;return{getInstance:function(){return instagramInstance||(instagramInstance=createInstagramInstance()),instagramInstance}}}(jQuery,window,sapient);sapient.followUs=followUsObj.getInstance(),sapient.followUs.setContentWidth(),sapient.followUs.onResize();var ourWines=function($,window,sapient){function createFilterWinesCollection(){var filterWines=function(){var allProductsGrid=$("#response-wrapper").html();$(".filter-item").on("click",function(e){if(e.preventDefault(),"all-data"===$(this).data("categoryFilter"))$("#response-wrapper").html(allProductsGrid),$(".filter-item").removeClass("active-filter");else{var wineCategory=$(this).data("category"),wineCategoryFilter=$(this).data("categoryFilter");$(".filter-item").removeClass("active-filter"),$(this).addClass("active-filter"),$.ajax({url:"/search-page?"+wineCategory+"="+wineCategoryFilter,type:"GET",success:function(data){$("#response-wrapper").html(data)}})}if($(window).width()<990){$("#close-filters").trigger("click");var p=$("#product-grid"),offset=p.offset();$("body, html").animate({scrollTop:offset.top},"slow")}})},mobileFiltersMenu=function(){$("#open-filters").on("click",function(){$("#mobile-filters").addClass("filters-active"),$(this).addClass("filters-activated");var navTop=$("#mobile-filters h2").outerHeight();$("#mobile-filters-scroll-wrapper").css({height:$(window).height()-navTop})}),$("#close-filters").on("click",function(){$("#mobile-filters").removeClass("filters-active"),$("a.category").removeClass("iamalive"),$("ul.nav.categories").css("left",""),$("#mobile-filters-scroll-wrapper").removeAttr("style"),$("#open-filters").removeClass("filters-activated")}),$("a.category").on("click",function(e){e.preventDefault(),$("a.category").removeClass("iamalive"),$(this).addClass("iamalive"),$("ul.nav.categories").animate({left:"-100%"},350,"linear")}),$("a.sub-nav-return").on("click",function(e){e.preventDefault(),$(this).parent("li").find("iamalive").removeClass("iamalive"),$("ul.nav.categories").animate({left:"0"},350,"linear")})};return{filterWines:filterWines,mobileFiltersMenu:mobileFiltersMenu}}var filterWinesCollection;return{getInstance:function(){return filterWinesCollection||(filterWinesCollection=createFilterWinesCollection()),filterWinesCollection}}}(jQuery,window,sapient);sapient.winesFilter=ourWines.getInstance(),sapient.winesFilter.filterWines(),sapient.winesFilter.mobileFiltersMenu();var footerObj=function($,window,sapient){function createFooterInstance(){var setFooterDdownPos=function(){var windowWidth=$(window).width();if(windowWidth>1200){var right=(windowWidth-1170)/2;$("footer .select-wrapper").css("right",right+"px")}},onResize=function(){$(window).on("resize",function(){debounce(sapient.footer.setFooterDdownPos,500,"testing debounce")})};return{setFooterDdownPos:setFooterDdownPos,onResize:onResize}}var footerInstance;return{getInstance:function(){return footerInstance||(footerInstance=createFooterInstance()),footerInstance}}}(jQuery,window,sapient);sapient.footer=footerObj.getInstance(),sapient.footer.setFooterDdownPos(),sapient.footer.onResize();var validationObj=function($,window,sapient){function createValidtaionInstance(){var validate=function(){var $input=$(".enquire-form  .group input"),$select=$(".enquire-form .group select");$(".fa-clock-o").closest(".picker-switch").hide(),$(".table-condensed .next").html(""),$(".table-condensed .prev").html(""),$(".enquire-form button.submit-btn").removeClass().addClass("cta dark submit-btn"),$input.focusout(function(){0!==$(this).val().length?$(this).siblings("label").addClass("text-entered"):$(this).siblings("label").removeClass("text-entered")}),$(".enquire-form .submit-info .submit-btn").click(function(){$("#errMsg .messages").html("");var checked=$(".enquire-form  .subscription-checkbox").is(":checked"),inputflag=0,inputarr=[],selectflag=0,selectarr=[],msgarr=[];return $.each($input,function(index){0==$($input[index]).val().length?($($(".enquire-form .group label")[index]).addClass("error"),$($input[index]).addClass("error-border"),msgarr.push($($(".enquire-form .group label")[index]).html())):($($(".enquire-form .group label")[index]).removeClass("error"),$($input[index]).removeClass("error-border")),inputarr.push($($input[index]).val().length)}),$.each($select,function(index){""==$select[index].value?($($select[index]).addClass("error-border"),msgarr.push($($(".enquire-form .group select option[value='']")[index]).text())):$($select[index]).removeClass("error-border"),selectarr.push($select[index].value)}),0!==msgarr.length?($("#errMsg").addClass("error"),$("#errMsg").css("display","block"),$.each(msgarr,function(index){$("#errMsg .messages").append('<span class="msg">'+msgarr[index]+"</span>")})):$("#errMsg").css("display","none"),$.each(inputarr,function(index){if(0===inputarr[index])return inputflag=0,!1}),$.each(selectarr,function(index){if(""==selectarr[index])return selectflag=0,!1}),checked||$(".enquire-form input[type=checkbox] + label").addClass("change"),!0})};return{validate:validate}}var validationInstance;return{getInstance:function(){return validationInstance||(validationInstance=createValidtaionInstance()),validationInstance}}}(jQuery,window,sapient);sapient.validation=validationObj.getInstance(),sapient.validation.validate();