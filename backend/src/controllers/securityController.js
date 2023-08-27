const jwt = require('jsonwebtoken')

//Metodo para gerar o token
const gerarToken = async (request, response) => {

    const SECRET = process.env.SECRET
    const token = jwt.sign (
        {
            id: request.id,
        },
        SECRET,
    )
    return token;
}

module.exports = {
    gerarToken
}