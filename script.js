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
        partialDiscount : ['BEAUTY','APARTMENT','MUSIC','W_BEAUTY'] //these things are only 25% off
    }

    // document.addEventListener('click', function() {
       // init(angular.element('[ng-controller=MainCtrl]').scope().serviceGroup.products.productList[0].prodData.prices.high)
    // }, false)

    // Product Detail Page Init
    var init = function(price){

        if(price !== undefined) {

            //prevent price duplicates
            if(!document.getElementsByClassName('urban-discount-extension-price')[0]){
                document.getElementsByClassName('product-price')[0].insertAdjacentHTML('beforeend', '<span class="urban-discount-extension-price"> - ' + formatCurrency(parseFloat(price)) + '</span>');
            }
            else{
                document.getElementsByClassName('urban-discount-extension-price')[0].innerHTML = formatCurrency(price);
            }
        }
    }

    // Category Page Init
    var categoryInit = function(){
        // If we're on a product loop page
        var productArray = document.getElementsByClassName('product');
        for(var i=0, arrayLen = productArray.length; i < arrayLen; i++){

            var priceElement;
            var rootPriceElem = productArray[i].getElementsByClassName('price')[0];

            if(productArray[i].getElementsByClassName('price-old')[0]){
                priceElement = productArray[i].getElementsByClassName('price-old')[0];
            }
            else if(productArray[i].getElementsByClassName('price-promo')[0]){
                priceElement = productArray[i].getElementsByClassName('price')[0];
                //tempPrice.toString();
            }
            else{
                priceElement = rootPriceElem;
            }

            var price  = parseFloat(priceElement.innerHTML.replace(/[^\d\.]/g,''));

            price = formatCurrency( price );

            rootPriceElem.insertAdjacentHTML('beforeend', ' - <span class="urban-discount-extension-price">' + price + '</span>');
        }
    }

    //return parent category
    var stockParentCategory = function(){
        var elem = document.getElementsByClassName("header-nav-data")
        return elem[0].getAttribute('data-selected');
    }

    //check if partial discount category
    var isPartialDiscount = function(){
        var parentCat = stockParentCategory()
        return (config.partialDiscount.contains(parentCat) ? true : false);
    }

    // Format Price
    var formatCurrency = function(formatPrice){
        var discount = isPartialDiscount() ? .25 : .4;
        formatPrice = formatPrice - (formatPrice * discount)
        formatPrice = formatPrice.toFixed(2);
        formatPrice = '$' + formatPrice;
        return formatPrice;
    }


    function stockLoop() {
        if(document.URL.indexOf("productdetail.jsp") > -1){
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

        if(document.URL.indexOf("category.jsp") > -1){
            categoryInit();
        }
    }

    stockLoop();
}

stockLevelExtension();
