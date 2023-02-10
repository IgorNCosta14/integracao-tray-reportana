    window.onload = () => {
    //window.location.href

    const url = 'https://www.usebelafit.com.br/checkout?session_id=5hkbt4qima57tuol3vmkv3q742&store_id=1074121&iniSession=1#principal';

    !(function(){
        if( window.location.href.match(/https:\/\/www.usebelafit\.com\.br\/checkout*/g)) {
            console.log('ok');
        } else {
            console.log("not ok");
        }
    })();

    let date = new Date();
    let dateFormatted = `${date.getFullYear()}-${((date.getMonth()+1)<10?'0':'') + (date.getMonth()+1)}-${(date.getDate()<10?'0':'') + date.getDate()} ${date.getHours()}:${(date.getMinutes()<10?'0':'') + date.getMinutes()}`;

    let listedProductArray = []

    let addressData = {
        address1: "",
        address2: "",
        city: "",
        province_code: "",
        country: "Brazil",
        country_code: "BR",
        zip: "",
    };

    let userData = {
        userName: "",
        userFirstName: "",
        userLastName: "",
        userCel: "",
        userEmail: ""
    }
    
    function getUserData() {
        let userInfoArray = document.querySelectorAll("div.ch-vspace-md p")[1].innerText.split('\n');
        let splitedUserName = userInfoArray[0].split(" ");
        

        userData.userName = userInfoArray[0];
        userData.userFirstName = splitedUserName[0];
        userData.userLastName = splitedUserName[splitedUserName.length - 1];
        userData.userCel = `+55${userInfoArray[1].replace(/\D/g,'')}`;
        userData.userEmail = document.querySelectorAll("div.ch-vspace-md p")[0].innerText;
    }

    function getUserAddressData() {
        let addressDataArray = document.querySelector("div.clearfix div p").innerText.split('\n');

        addressData.address1 = addressDataArray[0];
        addressData.address2 = addressDataArray[0];
        addressData.city = addressDataArray[1].split(" - ")[1].split("/")[0];
        addressData.province_code = addressDataArray[1].split(" - ")[1].split("/")[1];
        addressData.zip = addressDataArray[2].split("CEP: ")[1].replace(/\D/g,'');

        return addressData;
    }

    function getCartData() {
        let productDataArray;

        if (window.innerWidth > 991) {
            productDataArray = document.querySelectorAll("div.col-md-4.hidden-xs.hidden-sm div div table.ch-table.ch-products tbody tr");
        } else {
            productDataArray = document.querySelectorAll("div.col-xs-12.col-md-4.hidden-md.hidden-lg.ch-mobile-order div div  table.ch-table.ch-products tbody tr");
        }

        productDataArray.forEach((product) => {
            let listedProduct = {
                title: product.querySelector("td.col-xs-5.ch-no-padding-right.ch-space-sm p.ch-product-name").innerText,
                variant_title: `${product.querySelector("ul.ch-list.ch-product-variant").innerText.split("\n")[0]} - ${product.querySelector("ul.ch-list.ch-product-variant").innerText.split("\n")[1]}`,
                quantity: parseInt(product.querySelector("td.col-xs-3 span.ch-product-count").innerText),
                price: parseFloat((product.querySelector("td.col-xs-4.ch-no-padding-right.ch-text-right strong.ch-product-price").innerText).split("R$ ")[1].replace( ',','.')),
                path: "",
                image_url: product.querySelector("td.col-xs-3 img.img-responsive.ch-center-block").src, 
                tracking_number: null
            };
 
            listedProductArray.push(listedProduct);
        })
    }

    function getDataToSend() {
        const userInfoObject = {
            reference_id: userId.toString(),
            reason_type: null,
            admin_url: "",
            number: userId.toString(),
            customer_name: userData.userName,
            customer_email: userData.userEmail,
            customer_phone: userData.userCel,
            billing_address: {
               //////
            },
            shipping_address: {
                name: userData.userName,
                first_name: userData.userFirstName,
                last_name: userData.userLastName,
                company: null,
                phone: userData.userCel,
                address1: addressData.address1,
                address2: addressData.address2,
                city: addressData.city,
                province_code: addressData.province_code,
                country: addressData.country,
                country_code: addressData.country_code,
                zip: addressData.zip,
                latitude: null,
                longitude: null
            },
            line_items: productObject.userCart,
            currency: "BRL",
            total_price: productObject.totalPrice,
            subtotal_price: productObject.subtotalPrice,
            referring_site: "",
            checkout_url: "",
            completed_at: dateFormatted,
            original_created_at: dateFormatted
        };
        
        return userInfoObject;
    }

    getUserData(),
    getUserAddressData(),
    getCartData()

    const dataToSend = getCartData()
    console.log(userData);
}