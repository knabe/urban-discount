

 var stockLevelExtension = function(){

     var loopcounter = 0;

    document.addEventListener('click', function() {
        init(angular.element('[ng-controller=MainCtrl]').scope().serviceGroup.products.productList[0].prodData.prices.high)
    }, false)

	var init = function(price){
        if(price !== undefined) {
            price = (price - (price * .4) );
            var priceContainer = document.getElementById("urban-discount-plugin");
            if(priceContainer != null){
                priceContainer.parentNode.removeChild(priceContainer);
            }
            document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', '<h2 id="urban-discount-plugin">'+price+'</h2>');

            document.getElementsByClassName('mainPrice')[0].innerHTML = formatCurrency(price);

            // If we're on a product loop page
            document.getElementsByClassName('product').every(function(element, index, array){
                console.log(index);
            });

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

// Format Price
function formatCurrency(price){
    price.toFixed(2);
    price = '$' + price;
    return price;
}
