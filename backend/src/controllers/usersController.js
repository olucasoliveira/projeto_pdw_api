const usersModel = require('../models/usersModels.js');
const userToken = require('./securityController.js');
const bcrypt = require('bcrypt');


const createUser = async (request, response) => {

    //Validando se o usuario já esta cadastrado.
    const userExist = await usersModel.userExist(request.body);
    if(userExist == true){
        return response.status(400).json( { message: "Esse email já esta cadastrado"});
    }

    //Criptografando a senha
    const senha = request.body.senha;
    const salt = await bcrypt.genSalt(12)
    request.body.senha = await bcrypt.hash(senha, salt);

    const createdUser = await usersModel.createUser(request.body);
    return response.status(201).json(createdUser);
}

const loginUser = async (request, response) => {

    //Validando se o usuario existe.
    const checkSenha = await usersModel.checkSenha(request.body);

    if(checkSenha == 0 || checkSenha == "0"){
        //Se não existir, retorna mensagem
        return response.status(404).json( { message: "Usuario Invalido"});
    }else{
        //Se exitir, comparação com o DB
        const resultSenha = await bcrypt.compare(request.body.senha, checkSenha[1]);

        if (resultSenha == false){
            return response.status(422).json( { message: "Senha incorreta"});
        }else{
            
            const gerarToken = await userToken.gerarToken(checkSenha[0]);
            console.log(gerarToken)
            return response.status(200).json({ message: "Autenticação realizada com sucesso", token: gerarToken});
        }
    }
    return 0;
}

const deleteUser = async (request, response) => {
    const { id } = request.params;
    await usersModel.deleteUser(id);
    return response.status(204).json();

}


module.exports = {
    createUser,
    loginUser,
    deleteUser

}
