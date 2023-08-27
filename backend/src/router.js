const express = require('express');

// Importando os controllers e Middlewares.
const usersController = require('./controllers/usersController.js');
const usersMiddlewares = require('./middlewares/usersMiddlewarer.js');

const router = express.Router();

//Rota publica para todos cadastrarem usuarios
router.post('/users/signup', 
    usersMiddlewares.validarEmail,
    usersMiddlewares.validarNome,
    usersMiddlewares.validarSenha,
    usersMiddlewares.confirmarSenha,
    usersController.createUser
);

router.post('/users/login', 
    usersMiddlewares.validarEmail,    
    usersMiddlewares.validarSenha,
    usersController.loginUser
);

//Rota Privada
router.delete('/users/:id', 
    usersMiddlewares.checkToken,
    usersController.deleteUser
);

//router.put('/users/:id', validar, usersController.updateUser);


//Exportando as rotas para serem utilizadas no app.js
module.exports = router;