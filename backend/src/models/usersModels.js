const conn = require('./connection');

const getAll = async () => {
    const [tasks] = await conn.execute('SELECT * FROM tasks');
    return tasks;
};

const createUser = async (user) => {

    try {

        //var dateUTC = new Date(Date.now()).toUTCString();

        const { nome, email, senha, tipo_usuario } = user;
        const query = 'INSERT INTO USUARIO(NOME, EMAIL, SENHA, STATUS, TIPO_USUARIO) VALUES(?, ?, ?, ?, ?)'
        const [createdUser] = await conn.execute(query, [nome, email, senha, 1, tipo_usuario]);
        return {insertId: createdUser.insertId};

    } catch (error) {
        return response.status(500).json({ ERROR: error});
    }


};

const userExist = async (user) => {

try {
    const { email } = user;

    const query = 'SELECT id FROM USUARIO WHERE EMAIL = ?'
    const [userExistRows] = await conn.execute(query, [email]);

    if (userExistRows.length === 0) {
        return false; // Usuário não existe
    } else {
        return true;  // Usuário existe
    }    
} catch (error) {
    return response.status(500).json({ ERROR: error});
}

}

const checkSenha = async (body) => {
    try {
        const { email } = body;
        const query = 'SELECT id, senha FROM USUARIO WHERE EMAIL = ? AND STATUS = 1';
        const [userExistRows] = await conn.execute(query, [email]);

        if (userExistRows.length === 0) {
            return 0; // Usuário não existe
        } else {
            const userId = userExistRows[0].id;
            const dbSenha = userExistRows[0].senha;
            return [userId, dbSenha]; // Retorna o ID e a senha se o usuário existe
        }
    } catch (error) {
        return response.status(500).json({ ERROR: error });
    }
};

const deleteUser = async (id) => {

    const query = 'UPDATE USUARIO SET STATUS = 2 WHERE ID = ?'
    const deleteUser = await conn.execute(query, [id]);
    return deleteUser;
}
/*
const updateUser = async (id, task) => {
    const { title, status } = task;
    const query = 'UPDATE TASKS SET TITLE = ?, STATUS = ? WHERE ID = ?'
    const [updateTaskTask] = await conn.execute(query, [title, status, id]);
    return updateTask;
};*/


module.exports = {
    //getAll,
    createUser,
    userExist,
    checkSenha,
    deleteUser
    //updateUser
};