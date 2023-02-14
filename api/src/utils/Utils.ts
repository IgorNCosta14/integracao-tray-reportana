import { IClient, IFormatData, IGetCredential, ILineItems, IProductsSold } from "../interfaces/interfaces";
import { Purchase } from "../Purchase";

export async  function convertProvince(rovinceCode: string): Promise<string> {
  let provinceName: string = "";
  switch (rovinceCode.toUpperCase()) {
    case "AC" :	provinceName = "Acre";					break;
    case "AL" :	provinceName = "Alagoas";				break;
    case "AM" :	provinceName = "Amazonas";				break;
    case "AP" :	provinceName = "Amapá";					break;
    case "BA" :	provinceName = "Bahia";					break;
    case "CE" :	provinceName = "Ceará";					break;
    case "DF" :	provinceName = "Distrito Federal";		break;
    case "ES" :	provinceName = "Espírito Santo";		break;
    case "GO" :	provinceName = "Goiás";					break;
    case "MA" :	provinceName = "Maranhão";				break;
    case "MG" :	provinceName = "Minas Gerais";			break;
    case "MS" :	provinceName = "Mato Grosso do Sul";	break;
    case "MT" :	provinceName = "Mato Grosso";			break;
    case "PA" :	provinceName = "Pará";					break;
    case "PB" :	provinceName = "Paraíba";				break;
    case "PE" :	provinceName = "Pernambuco";			break;
    case "PI" :	provinceName = "Piauí";					break;
    case "PR" :	provinceName = "Paraná";				break;
    case "RJ" :	provinceName = "Rio de Janeiro";		break;
    case "RN" :	provinceName = "Rio Grande do Norte";	break;
    case "RO" :	provinceName = "Rondônia";				break;
    case "RR" :	provinceName = "Roraima";				break;
    case "RS" :	provinceName = "Rio Grande do Sul";		break;
    case "SC" :	provinceName = "Santa Catarina";		break;
    case "SE" :	provinceName = "Sergipe";				break;
    case "SP" :	provinceName = "São Paulo";				break;
    case "TO" :	provinceName = "Tocantíns";				break;
  }

  return provinceName;
}

export async function convertPurchasePaymentStatus(purchaseStatus: any) {    
  if (purchaseStatus.aprovado === true && purchaseStatus.cancelado === false) {
    return 'PAID';
  } else if (purchaseStatus.aprovado === false && purchaseStatus.cancelado === true) {
    return 'NOT_PAID';
  } else if (purchaseStatus.aprovado === false && purchaseStatus.cancelado === false) {
    return 'PENDING';
  }
}

export async function convertPurchasePaymentType(codigo: string) {
  if (codigo === "psredirect") {
    return 'CREDIT_CARD';
  } else if (codigo === "paghiper" || codigo === "pagali-pix") {
    return 'PIX';
  } else {
    return 'OTHER';
  }
}

export async function formatData( {purchase, url}: IFormatData): Promise<Purchase> {

  console.log("/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////")

  const purchaseDataToSend = new Purchase();

  const itemArray: ILineItems[] = [];

  purchaseDataToSend.reference_id = purchase.Order.session_id,
  purchaseDataToSend.number = purchase.Order.session_id,
  purchaseDataToSend.admin_url = `https://391250.commercesuite.com.br/adm/pedidos/detalhe_pedido.php?id_pedido=${purchase.Order.session_id}`,
  purchaseDataToSend.customer_name = purchase.Order.Customer.name,
  purchaseDataToSend.customer_email = purchase.Order.Customer.email,
  purchaseDataToSend.customer_phone = `+55${purchase.Order.Customer.cellphone}`,
  purchaseDataToSend.billing_address = {
    name: purchase.Order.Customer.name,
    first_name: purchase.Order.Customer.name.split(" ")[0],
    last_name: purchase.Order.Customer.name.split(" ")[purchase.Order.Customer.name.split(" ").length - 1],
    company: purchase.Order.Customer.company_name,
    phone: `+55${purchase.Order.Customer.cellphone}`,
    address1: `${purchase.Order.Customer.address}, ${purchase.Order.Customer.number}`,
    address2: `${purchase.Order.Customer.CustomerAddresses[0].CustomerAddress.address}, ${purchase.Order.Customer.CustomerAddresses[0].CustomerAddress.number}`,
    city: purchase.Order.Customer.city,
    province: await convertProvince(purchase.Order.Customer.state),
    province_code: purchase.Order.Customer.state,
    country: 'Brazil',
    country_code: 'BR',
    zip: purchase.Order.Customer.zip_code,
    latitude: null,
    longitude: null
  },
  purchaseDataToSend.shipping_address = {
    name: purchase.Order.Customer.name,
    first_name: purchase.Order.Customer.name.split(" ")[0],
    last_name: purchase.Order.Customer.name.split(" ")[purchase.Order.Customer.name.split(" ").length - 1],
    company: purchase.Order.Customer.company_name,
    phone: `+55${purchase.Order.Customer.cellphone}`,
    address1: `${purchase.Order.Customer.address}, ${purchase.Order.Customer.number}`,
    address2: `${purchase.Order.Customer.CustomerAddresses[0].CustomerAddress.address}, ${purchase.Order.Customer.CustomerAddresses[0].CustomerAddress.number}`,
    city: purchase.Order.Customer.city,
    province: await convertProvince(purchase.Order.Customer.state),
    province_code: purchase.Order.Customer.state,
    country: 'Brazil',
    country_code: 'BR',
    zip: purchase.Order.Customer.zip_code,
    latitude: null,
    longitude: null
  },
  
  purchase.Order.ProductsSold.forEach((product:  IProductsSold) => {
    const itemOject = {
      title: product.ProductsSold.original_name,
      variant_title: '',
      quantity: parseInt(product.ProductsSold.quantity),
      price: parseFloat(product.ProductsSold.price),
      path: product.ProductsSold.url.https.split(';')[0],
      image_url: '', 
      tracking_number: ''
    }

    itemArray.push(itemOject);
  })

  purchaseDataToSend.line_items = itemArray,
  purchaseDataToSend.currency = 'BRL',
  purchaseDataToSend.total_price = parseFloat(purchase.Order.total),
  purchaseDataToSend.subtotal_price = parseFloat(purchase.Order.partial_total),
  purchaseDataToSend.payment_status = 'PAID',
  purchaseDataToSend.payment_method = 'PIX',
  purchaseDataToSend.tracking_numbers = "",
  purchaseDataToSend.referring_site = url.split("web_api")[0],
  purchaseDataToSend.status_url = `${url.split("web_api")[0]}my-account/orders`,
  purchaseDataToSend.billet_url = purchase.Order.urls.payment,
  purchaseDataToSend.billet_line = '',
  purchaseDataToSend.billet_expired_at = '',
  purchaseDataToSend.original_created_at = `${purchase.Order.date} ${purchase.Order.hour}`

  return purchaseDataToSend;
}


export async function getCredential(id: any): Promise<IGetCredential > {  
  let client: IClient = {
    consumer_key: `${process.env.CONSUMERKEY}`,
    consumer_secret: `${process.env.CONSUMERSECRET}`,
    code: ""
  }

  let url: string = "";

  switch (`${id}`) {
    case "391250" : client.code = `${process.env.CODE391250}`, url = `${process.env.URL391250}`; break;
    case "391251" : client.code = `${process.env.CODE391251}`, url = `${process.env.URL391251}`; break;
  }

  const credential = { 
    client,
    url
  }

  return credential;
}