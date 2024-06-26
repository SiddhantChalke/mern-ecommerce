import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import stripe from 'stripe'
import cors from 'cors'

dotenv.config();


const port = process.env.PORT;
// a fn to make DB connection & handle errors async-ly
connectDB();

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())
app.use(cors());

app.get('/', (req, res)=>{
    res.send('Hello world !')
})

// app.get('/cors', (req, res) => {
    //     res.set('Access-Control-Allow-Origin', '*');
    // })
    
    app.use('/api/users', userRoutes);
    app.use('/api/products', productRoutes);
    app.use('/api/upload', uploadRoutes);
    app.use('/api/orders', orderRoutes);
    
    const stripeInstance = stripe(process.env.STRIPE_PRIVATE_KEY);
    
    // app.post('/pay-stripe', async (req, res)=>{
        //     res.send({url});
        // });
        
// checkout api
app.post("/api/create-checkout-session",async(req,res)=>{
    const {products} = req.body;
    // console.log(products);   // -> return object with cartItems[]

    const lineItems = products.cartItems.map((product)=>({
        price_data:{
            currency:"inr",
            product_data:{
                name:product.name,
                // images:[product.image]
            },
            unit_amount:product.price * 100,
        },
        quantity:product.quantity
    }));

    const session = await stripeInstance.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:lineItems,
        mode:"payment",             // other are 'subscription' & 'setup'
        success_url:"http://localhost:5173/success",
        cancel_url:"http://localhost:5173/cancel",
    });

    res.json({id:session.id})
 
})

// for absolute path of current working folder(root-folder)
const __dirname = path.resolve()
// when a req is made at '/uploads' express will look for static files in given folder
app.use('/uploads', express.static(path.join(__dirname + '/uploads')));


app.listen(port, ()=>{
    console.log('Listening to 3000')
})