const axios = require("axios");

class PaymentService {
    constructor() {
        this.tokensMercadoPago = {
            prod: {
                access_token: "APP_USR-245100120432824-042720-426de88bcb61d32009351e949fbef67d-284862052"
                    // el access_token de MP
            },
            test: {
                access_token: "TEST-245100120432824-042720-9f51b9772fabe31469e3a620a6227b53-284862052"
                    // el access_token de MP
            }
        };
        // declaramos de la siguiente manera el token, para que sea más fácil cambiarlo dependiendo del ambiente
        this.mercadoPagoUrl = "https://api.mercadopago.com/checkout";
        // declaramos la url en el constructor para poder accederla a lo largo de toda la clase
    }

    async createPaymentMercadoPago(name, price, unit, img) {
        // recibimos las props que le mandamos desde el PaymentController
        const url = `${this.mercadoPagoUrl}/preferences?access_token=${this.tokensMercadoPago.test.access_token}`;
        // url a la que vamos a hacer los requests

        const items = [{
            id: "SP7-1",
            // id interno (del negocio) del item
            title: name,
            // nombre que viene de la prop que recibe del controller
            description: "Recarga SportSiete.com",
            // descripción del producto
            picture_url: "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1348&q=80",
            // url de la imágen del producto
            category_id: "SP7",
            // categoría interna del producto (del negocio)
            quantity: parseInt(unit),
            // cantidad, que tiene que ser un intiger
            currency_id: "ARS",
            // id de la moneda, que tiene que ser en ISO 4217
            unit_price: parseFloat(price)
                // el precio, que por su complejidad tiene que ser tipo FLOAT
        }];

        const preferences = {
            // declaramos las preferencias de pago
            items,
            // el array de objetos, items que declaramos más arriba
            external_reference: "referencia del negocio",
            // referencia para identificar la preferencia, puede ser practicamente cualquier valor
            payer: {
                // información del comprador, si estan en producción tienen que //traerlos del request
                //(al igual que hicimos con el precio del item) 
                name: "Santiago",
                surname: "Landa",
                email: "test_user_63274575@testuser.com",
                // si estan en sandbox, aca tienen que poner el email de SU usuario de prueba
                phone: {
                    area_code: "11",
                    number: "22223333"
                },
                address: {
                    zip_code: "1111",
                    street_name: "False",
                    street_number: "123"
                }
            },
            payment_methods: {
                // declaramos el método de pago y sus restricciones
                excluded_payment_methods: [
                    // aca podemos excluir metodos de pagos, tengan en cuenta que es un array de objetos
                    {
                        id: "amex"
                    }
                ],
                excluded_payment_types: [{ id: "atm" }],
                // aca podemos excluir TIPOS de pagos, es un array de objetos
                installments: 6,
                // limite superior de cantidad de cuotas permitidas
                default_installments: 6
                    // la cantidad de cuotas que van a aparecer por defecto
            },
            back_urls: {
                // declaramos las urls de redireccionamiento
                success: "https://localhost:3000/success",
                // url que va a redireccionar si sale todo bien
                pending: "https://localhost:3000.com/pending",
                // url a la que va a redireccionar si decide pagar en efectivo por ejemplo
                failure: "https://localhost:3000.com/error"
                    // url a la que va a redireccionar si falla el pago
            },
            notification_url: "https://mercadopago-checkout.herokuapp.com/webhook",
            // declaramos nuestra url donde recibiremos las notificaciones
            auto_return: "approved"
                // si la compra es exitosa automaticamente redirige a "success" de back_urls
        };

        try {
            const request = await axios.post(url, preferences, {
                // hacemos el POST a la url que declaramos arriba, con las preferencias
                headers: {
                    // y el header, que contiene content-Type
                    "Content-Type": "application/json"
                }
            });

            return request.data;
            // devolvemos la data que devuelve el POST
        } catch (e) {
            console.log(e);
            // mostramos error en caso de que falle el POST
        }
    }
}

//NOTA: TODAS las URLS que usemos tienen que ser reales, 
//si prueban con localhost, va a fallar

module.exports = PaymentService;