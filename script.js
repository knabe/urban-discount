 var stockLevelExtension = function(){
    Array.prototype.contains = function(obj) {
        var i = this.length;
        while (i--) {
            if (this[i] === obj) {
                return true;
            }
        }
        return false;
    }

    var loopcounter = 0,
    config = {
        partialDiscount : ['BEAUTY','APARTMENT','MUSIC'] //these things are only 20% off
    }

    document.addEventListener('click', function() {
        init(angular.element('[ng-controller=MainCtrl]').scope().serviceGroup.products.productList[0].prodData.prices.high)
    }, false)

    var init = function(price){
        
        if(price !== undefined) {
            var discount = isPartialDiscount ? .2 : .4,
            qtyContainer = document.getElementById("urban-discount-plugin");

            price = '$' + (price - (price * discount) ).toFixed(2)

            if(qtyContainer != null){
                qtyContainer.parentNode.removeChild(qtyContainer);
            }
            document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', '<h2 id="urban-discount-plugin">'+price+'</h2>');
        }
    }

    var stockParentCategory = function(){
        var elem = document.getElementsByClassName("header-nav-data")
        return elem[0].getAttribute('data-selected');
    }

    var isPartialDiscount = function(){
        var parentCat = stockParentCategory()
        return (config.partialDiscount.contains(parentCat) ? true : false);
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