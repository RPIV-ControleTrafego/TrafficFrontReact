const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://mendes:113113@cluster0.46fvged.mongodb.net/users';
const client = new MongoClient(uri, { useNewUrlParser: true });

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://mendes:113113@cluster0.46fvged.mongodb.net/users', { useNewUrlParser: true, useUnifiedTopology: true });

// Função para conectar ao banco de dados
async function connectToMongoDB() {
    try {
        await client.connect();
        console.log('Conectado ao MongoDB Atlas');
    } catch (err) {
        console.error(err);
    }
}

// Chame a função para conectar
connectToMongoDB();

// Exemplo de consulta para buscar usuários com um papel específico
async function getUsersWithRole(role) {
    try {
        const usersCollection = client.db('users').collection('user');
        const result = await usersCollection.find({ roles: role }).toArray();
        return result;
    } catch (err) {
        console.error(err);
        return [];
    }
}

// Chame a função para buscar usuários com um papel específico
getUsersWithRole('admin').then((users) => {
    console.log('Usuários com papel "admin":', users);
});