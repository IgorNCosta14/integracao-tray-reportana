export interface IClient {
    consumer_key: string,
    consumer_secret: string,
    code: string
}

export interface IGetCredential {
    client: IClient,
    url: string
}

export interface IRawData {
    
}

export interface IFormatedData {
    reference_id: string,
    number: string,
    admin_url: string,
    customer_name: string,
    customer_email: string,
    customer_phone: string,
    billing_address: IAddress,
    shipping_address: IAddress,
    line_items: ILineItems[],
    currency: string,
    total_price: number,
    subtotal_price: number,
    payment_status: string,
    payment_method: string,
    tracking_numbers: string,
    referring_site: string,
    status_url: string,
    billet_url: string,
    billet_line: string,
    billet_expired_at: string,
    original_created_at: string
}

export interface IAddress {
    name: string,
    first_name: string,
    last_name: string,
    company?: string,
    phone: string,
    address1: string,
    address2: string,
    city: string,
    province: string,
    province_code: string,
    country: string,
    country_code: string,
    zip: string,
    latitude?: string | null,
    longitude?: string | null
}

export interface ILineItems {
    title: string,
    variant_title: string,
    quantity: number,
    price: number
    path: string,
    image_url: string, 
    tracking_number: string
}

export interface IProfile2 {
    id: string;
    price_list_id: string;
    name: string;
    approves_registration: string;
    show_price: string;
    theme_id: string;
    selected: string;
}

export interface ICustomerAddress2 {
    id: string;
    customer_id: string;
    address: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
    type: string;
    active: string;
    description: string;
    recipient: string;
    type_delivery: string;
    not_list: string;
}

export interface ICustomerAddress {
    CustomerAddress: ICustomerAddress2;
}

export interface ISku {
    type: string;
    value: string;
}

export interface IProductSoldImage {
    http: string;
    https: string;
    thumbs: any;
}

export interface ICategory {
    id: string;
    name: string;
    main_category: string;
}

export interface IProductsSold2 {
    product_kit_id: string;
    product_kit_id_kit: string;
    id_campaign: string;
    product_id: string;
    quantity: string;
    id: string;
    order_id: string;
    name: string;
    original_name: string;
    virtual_product: string;
    ean: string;
    Sku: ISku[];
    price: string;
    cost_price: string;
    original_price: string;
    weight: string;
    weight_cubic: string;
    brand: string;
    model: string;
    reference: string;
    length: string;
    width: string;
    height: string;
    variant_id: string;
    additional_information: string;
    text_variant: string;
    warranty: string;
    bought_together_id: string;
    ncm: string;
    included_items: string;
    release_date: string;
    commissioner_value: string;
    comissao: string;
    ProductSoldImage: IProductSoldImage[];
    Category: ICategory[];
    is_giveaway: string;
    BoughtTogether: any[];
    url: {
        http: string;
        https: string;
    };
    Discount: any[];
    Stock: {
        id: string;
        name: string;
    };
}

export interface IProductsSold {
    ProductsSold: IProductsSold2;
}

export interface IMarketplaceOrder2 {
    order_id: string;
    marketplace_name: string;
    marketplace_seller_name: string;
    marketplace_seller_id: string;
    marketplace_document: string;
    payment_responsible_document: string;
    marketplace_order_id: string;
    marketplace_shipping_id: string;
    marketplace_shipping_type: string;
    marketplace_internal_status: string;
    created: string;
    updated: string;
}

export interface IMarketplaceOrder {
    MarketplaceOrder: IMarketplaceOrder2;
}

export interface IOrderTransaction {
    url_payment: string;
    bank_slip: string;
}

export interface IRawObject {
    Order: {
        status: string;
        id: string;
        date: string;
        hour: string;
        customer_id: string;
        partial_total: string;
        taxes: string;
        discount: string;
        point_sale: string;
        shipment: string;
        shipment_value: string;
        shipment_date: string;
        delivered: string;
        shipping_cancelled: string;
        store_note: string;
        customer_note: string;
        partner_id: string;
        discount_coupon: string;
        payment_method_rate: string;
        installment: string;
        value_1: string;
        sending_code: string;
        sending_date: string;
        billing_address: string;
        delivery_time: string;
        payment_method_id: string;
        payment_method: string;
        session_id: string;
        total: string;
        payment_date: string;
        access_code: string;
        shipment_integrator: string;
        modified: string;
        printed: string;
        interest: string;
        id_quotation: string;
        estimated_delivery_date: string;
        is_traceable: string;
        external_code: string;
        tracking_url: string;
        has_payment: string;
        has_shipment: string;
        has_invoice: string;
        total_comission_user: string;
        total_comission: string;
        OrderStatus: {
            id: string;
            default: string;
            type: string;
            show_backoffice: string;
            allow_edit_order: string;
            description: string;
            status: string;
            show_status_central: string;
            background: string;
        };
        PickupLocation: any[];
        cost: string;
        urls: {
            payment: string;
        };
        payment_method_type: string;
        Customer: {
            cnpj: string;
            newsletter: string;
            created: string;
            terms: string;
            id: string;
            name: string;
            registration_date: string;
            rg: string;
            cpf: string;
            phone: string;
            cellphone: string;
            birth_date: string;
            gender: string;
            email: string;
            nickname: string;
            token: string;
            total_orders: string;
            observation: string;
            type: string;
            company_name: string;
            state_inscription: string;
            reseller: string;
            discount: string;
            blocked: string;
            credit_limit: string;
            indicator_id: string;
            profile_customer_id: string;
            last_sending_newsletter: string;
            last_purchase: string;
            last_visit: string;
            last_modification: string;
            address: string;
            zip_code: string;
            number: string;
            complement: string;
            neighborhood: string;
            city: string;
            state: string;
            country: string;
            modified: string;
            Extensions: {
                Profile: {
                    id: string;
                    name: string;
                };
                Profiles: IProfile2[];
            };
            CustomerAddresses: ICustomerAddress[];
        };
        ProductsSold: IProductsSold[];
        OrderInvoice: any[];
        Payment: any[];
        MlOrder: any[];
        MarketplaceOrder: IMarketplaceOrder[];
        OrderTransactions: IOrderTransaction[];
        OrderInvoiceAmount: any[];
        ExtraTabs: any[];
        ShippingLabel: {
            application: string;
            url: string;
        };
        PaymentMethodMessage: {
            text: string;
            text_pag: string;
            text_confirm: string;
            confirmation: string;
        };
        payments_notification: {
            notification: string;
        };
        partner_name: string;
    };
    Extensions: any[];
    User: any[];
    Confirmation: any[];
}

export interface IFormatData {
    purchase: IRawObject,
    url: string
}