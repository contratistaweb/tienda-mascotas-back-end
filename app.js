var express = require('express');
var cors = require('cors');
const app = express();

app.use(cors())

app.get('/api/products', (req, res) => {
    console.log('req.headers.page :>> ', req.headers.page);
    console.log('req.headers.limit :>> ', req.headers.limit);

    let page = req.headers.page;
    let limit = req.headers.limit;
    let products = productList();
    productsFiltered = products.filter(product => product.id >= ((limit * page) - limit) && product.id < ((limit * page)));
    let next = (limit * page) <= products.length;
    let previous = parseInt(page) == 1 ? false : true;
    let pages = parseInt(((products.length / limit) + 1).toString());
    return res.status(200).json({ products: productsFiltered, pages: pages, page: page, next: next, previous: previous, count: products.length });

})

app.get('/api/categories', (req, res) => {

    let categories = ['alimento', 'snacks', 'farmapet', 'cuidado e higiene', 'juguetes', 'Accesorios', 'para petLovers'];
    console.log('req.headers.category :>> ', req.headers.category);
    if (req.headers.category !== undefined) {
        let cat = categories[parseInt(req.headers.category)];
        res.status(200).json([cat]);
    } else {
        res.status(200).json(categories)
    }

})

app.get('/api/brands', (req, res) => {

    let brands = [];
    let i = 1;
    do {
        let brand = 'brand-' + i;
        brands.push({
            id: i,
            name: brand,
            image: '/assets/images/preview.jpg'
        });
        i++;
    } while (brands.length < 100);
    let brandsFiltered = [];
    console.log('req.headers.name :>> ', req.headers.name);
    console.log('req.headers.next :>> ', req.headers.next);
    console.log('req.headers.brands_limit :>> ', req.headers.brands_limit);
    if (req.headers.name !== undefined) {
        let name = req.headers.name;
        brandsFiltered = brands.filter(brand => brand.name === name)
        res.status(200).json(brandsFiltered);
    } else if (req.headers.next !== undefined && req.headers.brands_limit !== undefined) {
        let next = parseInt(req.headers.next);
        let limit = parseInt(req.headers.brands_limit);
        brandsFiltered = brands.filter(brand => brand.id > next && brand.id <= next + limit)
        res.status(200).json(brandsFiltered);
    } else {
        res.status(200).json(brands)
    }

})

app.get('/api/payment-methods', (req, res) => {
    let methods = [];

    methods.push({ name: 'Mercado Pago', image: 'https://zettabyte-solutions.com/wp-content/uploads/2018/04/mercado-pago.png' });
    methods.push({ name: 'Mastercard', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/2560px-MasterCard_Logo.svg.png' });
    methods.push({ name: 'Visa', image: 'https://1000marcas.net/wp-content/uploads/2019/12/Visa-Logo-2005.jpg' });
    methods.push({ name: 'American Xpress', image: 'https://1000marcas.net/wp-content/uploads/2020/03/logo-American-Express.png' });

    res.status(200).json(methods);
})

app.get('/api/mobile-apps', (req, res) => {
    let stores = [];

    stores.push({ name: 'App Store', image: 'https://www.cristonautas.com/wp-content/uploads/app-store-logo.png' });
    stores.push({ name: 'Google Play', image: 'https://es.logodownload.org/wp-content/uploads/2019/06/disponible-en-google-play-badge-1.png' });
    stores.push({ name: 'App Gallery', image: 'https://www.cristonautas.com/wp-content/uploads/app-store-logo.png' });

    res.status(200).json(stores);
})
app.get('/api/footer-content', (req, res) => {
    let footerSections = [];

    footerSections.push({ title: 'acerca de Laika', links: ['sobre Laika', 'servicios', 'trabaja con nosotros', 'blog', 'terminos y condiciones'] });
    footerSections.push({ title: 'links de interés', links: ['Preguntas frecuentes', '¿Cómo comprar en Laika?', 'Política de privacidad', 'Contáctanos', 'Politicas de entrega'] });
    footerSections.push({ title: 'información', links: ['Teléfono: 3009108496', 'servicioclientes@laika.com.co', 'BBogotá D.C., Colombia', '', ''] });

    res.status(200).json(footerSections);
})

app.get('/api/product/:id', (req, res) => {
    console.log(req.params.id);
    let products = productList();
    let product = products.filter(product => product.id === parseInt(req.params.id));
    res.json(product);
})

app.listen(3000, () => {
    console.log('app running at port 3000');
})

let productList = () => {
    let products = [];
    let i = 0
    do {
        let numRandom = Math.random();
        let product = {
            id: i + 1,
            name: 'product ' + (i + 1),
            stars: getStars(parseInt((numRandom * 10).toString())),
            price: parseInt((numRandom * 1000).toString()) * 100,
            image: '/assets/images/preview.jpg'
        }
        products.push(product);
        i++;
    }
    while (i < 100)
    return products;
}

getStars = (number) => {
    let again = true;
    while (again) {
        if (number >= 3 && number <= 5) {
            return number;
        }
        number = parseInt((Math.random() * 10).toString());
    }
}