

 var stockLevelExtension = function(){

     var loopcounter = 0;

    document.addEventListener('click', function() {
        init(angular.element('[ng-controller=MainCtrl]').scope().serviceGroup.products.productList[0].prodData.prices.high)
    }, false)

	var init = function(price){
        if(price !== undefined) {
            price = (price - (price * .4) )
            var qtyContainer = document.getElementById("urban-discount-plugin");
            if(qtyContainer != null){
                qtyContainer.parentNode.removeChild(qtyContainer);
            }
            document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', '<h2 id="urban-discount-plugin">'+price+'</h2>');
        }
    }

    function stockLoop() {
        //loop through angular scope no more than 6 times 
        if(loopcounter <= 6){
            loopcounter++;
            setTimeout(function () {
                if(loopcounter <= 6){
                    var prodList = angular.element('[ng-controller=MainCtrl]').scope().serviceGroup.products.productList[0].prodData.prices.high;
                    if(prodList !== undefined){
                        init(prodList);
                        //kill the loop
                        loopcounter = 9;
                    }
                }

                stockLoop();
            }, 1000);
        }
    }

    stockLoop();
}

stockLevelExtension();
