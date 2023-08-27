const jwt = require('jsonwebtoken')

const validarNome = (request, response, next) => {
    const { body } = request;

    if(body.nome == undefined || body.nome == ''){
        return response.status(400).json( { message: "O nome esta vazio ou nulo"});
    }

    next();
}

const validarSenha = (request, response, next) => {
    const { body } = request;

    if(body.senha == undefined || body.senha == ''){
        return response.status(400).json( { message: "A senha esta vazia ou nula"});
    }



    next();
}

const confirmarSenha = (request, response, next) => {

    const { body } = request;
    if(body.senha != body.confirmarSenha){
        return response.status(400).json( { message: "As senhas estão diferentes"});
    }

    next();

}

const validarEmail = (request, response, next) => {
    const { body } = request;

    if(body.email == undefined || body.email == ''){
        return response.status(400).json( { message: "O Email esta vazio ou nulo"});
    }
    /*
    if(userModels.userExist(body) == true){
        return response.status(400).json( { message: "Esse email já esta cadastrado"});
    }*/


    next();
}

// ATENÇÂO: Esse algoritmo de checkToken foi copiado: https://github.com/matheusbattisti/curso_node/blob/main/18_AUTH_NODE_JWT/app.js 

function checkToken(request, response, next) {

    const authHeader = request.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
  
    if (!token) return response.status(401).json({ mensagem: "Acesso negado!" });
  
    try {
      const secret = process.env.SECRET;
  
      jwt.verify(token, secret);
  
      next();
    } catch (erro) {
      response.status(400).json({ mensagem: "O Token é inválido!" });
    }
  };

  // FIM.


module.exports = {
    validarNome,
    validarEmail,
    validarSenha,
    confirmarSenha,
    checkToken
}