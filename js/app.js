//create angular module
var app = angular.module('marketplace', ['ui.bootstrap', 'ngDialog', 'ngSanitize', 'angular-loading-bar', 'ngAnimate']);


app.value('MarketplaceConfig',{
	xmlUrl: 'marketplace.xml'
});

//creating PluginsMetadata service, as an injectable argument, getting the metadata from the provided XML
app.factory('PluginsMetadata', function($http, MarketplaceConfig){
	return {
		getMetadata: function(){
			return $http.get( MarketplaceConfig.xmlUrl ).then( function(result){
				return $.xml2json(result.data).market_entry;
			});
		}
	};
});

//create angular controller to our app
app.controller('MarketplaceController', function( $filter, $scope, PluginsMetadata, ngDialog, $rootScope, $timeout ){
    var inputFilter = $filter('filter');

	$scope.pluginsList = [];
    $scope.filteredList = [];

	$scope.searchTerm = "";

    $scope.$watch('searchTerm', function( oldVal, newVal ){
        $timeout( function(){
            $scope.filteredList = inputFilter( $scope.pluginsList, newVal );
            $scope.totalItems = $scope.filteredList.length;
        }, 0);
    });

	PluginsMetadata.getMetadata().then(function(data){
        $scope.pluginsList = $scope.filteredList = data;
        $scope.totalItems = $scope.pluginsList.length;
    });

    $scope.itemsPerPage = 12;
    $scope.currentPage = 1;

    $scope.pageChanged = function() {
        console.log('Page changed to: ' + $scope.currentPage);
    };

    $scope.open = function(plugin) {
        $scope.plugin = plugin;
        ngDialog.open({
            template: 'templates/pluginDetails.html',
            scope: $scope,
            className: 'plugin-window',
            showClose: false
        });
    };

    $scope.openDevStages = function() {
        ngDialog.open({
            template: 'templates/devStages.html',
            scope: $scope,
            className: 'plugin-window',
            showClose: false
        });
    };

    $scope.openContribute = function() {
        ngDialog.open({
            template: 'templates/contribute.html',
            scope: $scope,
            className: 'plugin-window',
            showClose: false
        });
    };

    $scope.openFindMarketplace = function() {
        ngDialog.open({
            template: 'templates/findMarketplace.html',
            scope: $scope,
            className: 'plugin-window',
            showClose: false
        });
    };

    $rootScope.$on('ngDialog.opened', function (e, $dialog) {
        setTimeout(function(){            
            var dialogContentHeight = $dialog.find('.ngdialog-content').height();
            var dialogContentTotalHeight = dialogContentHeight+100;
            $dialog.find('.ngdialog-overlay').css('min-height', dialogContentTotalHeight);
            console.log('ngDialog opened: ' + $dialog.attr('id') + '; ngDialog height: ' + dialogContentHeight + '; ngDialog height with margins: ' + dialogContentTotalHeight);
        }, 10);
    });

    /*$rootScope.$on('ngDialog.closed', function (e, $dialog, $document) {
        if($('.plugin-modal-gallery .owl-carousel').length) {
            $('.plugin-modal-gallery .owl-carousel').hide().data('owlCarousel').destroy();
        }
        console.log('ngDialog closed: ' + $dialog.attr('id'));
    });*/
});


app.filter('startFrom', function () {
    return function (input, start) {
        start = +start; //parse to int
        return input.slice(start);
    };
});
app.filter('paginate', function ($filter) {
    var startFrom = $filter('startFrom'),
        limitTo = $filter('limitTo');

    return function (items, currentPage, itemsPerPage) {
        var start = (currentPage - 1) * itemsPerPage;
        return limitTo( startFrom( items, start ) , itemsPerPage );
    };
});
//angular module to cut strings considering chosen character number, wordwise and tail
app.filter('cut', function () {
    return function (value, wordwise, max, tail) {
        if (!value) return '';

        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;

        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace != -1) {
                value = value.substr(0, lastspace);
            }
        }

        return value + (tail || ' …');
    };
});

//owlcarousel directive
app.value('OwlCarouselConfig', {
    loop:false,
    items: 1,
    smartSpeed: 800
});
app.directive('owlcarousel',function(OwlCarouselConfig){

    function linker (scope,element,attr){

        //carrega o carrosel
        var loadCarousel = function(){
            element.owlCarousel( getOptions() );
        };

        var getOptions = function(){
            return angular.extend( {}, OwlCarouselConfig, scope.$eval( attr.carouselOptions ) );
        }
 
        //toda vez que adicionar ou remover um item da lista ele carrega o carrosel novamente
        scope.$watch("batatas", function(value) {
            loadCarousel();
        });

        //loadCarousel();
 
    };
 
    return{
        restrict : "A",
        link: linker
    };
 
});

app.directive('wdCloak', function($timeout){
    return {
        link: function(scope, element, attr) {
            var delay = attr.cloakDelay || 0;

            attr.$set('wdCloak', undefined);
            element.removeClass('wd-cloak');

            $timeout(function(){
                attr.$set('cloakDelay', undefined);
                element.removeClass('cloak-delay');
            }, delay);
        }
    }
});
