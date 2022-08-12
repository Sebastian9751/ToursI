const express =  require('express'); 
const morgan = require('morgan'); //Se encarga de mostrar datos de la visita por la consola.
const path = require('path');
const cors = require('cors');

//Initializations
const app = express();

//Settings
app.set('port', process.env.PORT || 4000);
app.set('json spaces', 2);

//Middleweres
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const corsOptions ={
    origin:'trustedwebsite.com',
    credentials:true,
    optionSuccessStatus:200
 }
 app.use(cors(corsOptions));

// Global Variables
app.use((_req, _res, next) => {
    next();
});

//Routes
app.use('/tours', require('./routes/tours.routes'));
app.use('/reservas', require('./routes/reservas.routes'));

//Public
app.use(express.static(path.join(__dirname, 'public')));

//Starting the Server
app.listen(app.get('port'), () => {
    console.log('Server on port ',  app.get('port'));
});
