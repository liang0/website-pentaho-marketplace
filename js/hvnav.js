var hds = window.hds || {};
(function(window, document, $, hds) {
    hds.buildShowNav = {
        init: function(options) {
            hds.buildShowNav.desktopMobileFunction();
        },
        desktopMobileFunction: function() {
            $('.globalNavWrapper > li.hds-default-nav').hover(function() {
                $('.globalNavWrapper li.hds-default-nav').removeClass('open');
                $('.hds-megaMenuWrapper', this).stop(true, true).delay(200).slideDown(100);
                var megaMenuWrapper = $(this).find( ".hds-megaMenuWrapper");
                var bgImgUrl = $(megaMenuWrapper).attr('data-bg-url');
                //$(megaMenuWrapper).css("background-image", "url("+bgImgUrl+")");
                $(megaMenuWrapper).css("background-image", "url(" + bgImgUrl == null ? '' : bgImgUrl + ")");
                $(this).addClass('open');
            }, function() {
                $(this).removeClass('open');
                $('.hds-megaMenuWrapper', this).stop(true, true).slideUp(200);
            });
        }
    }
}(window, document, jQuery, hds));
 
$(function() {
    if($('.globalNavWrapper li:has(div.hds-megaMenuWrapper)')){
        hds.buildShowNav.init();
    }  
})

