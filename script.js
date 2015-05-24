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

            price = price - (price * discount);

            if(qtyContainer != null){
                qtyContainer.parentNode.removeChild(qtyContainer);
            }

            document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', '<h2 id="urban-discount-plugin">'+price+'</h2>');

            if(!document.getElementsByClassName('urban-discount-extension-price')[0]){
                document.getElementsByClassName('product-price')[0].insertAdjacentHTML('beforeend', '<span class="urban-discount-extension-price">' + formatCurrency(parseFloat(price)) + '</span>');
            }

            else{
                document.getElementsByClassName('urban-discount-extension-price')[0].innerHTML = formatCurrency(price);
            }

            // If we're on a product loop page
            document.getElementsByClassName('product').every(function(element, index, array){
                console.log(index);
            });
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

    // Format Price
    var formatCurrency = function(price){
        price.toFixed(2);
        price = '$' + price;
        return price;
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
