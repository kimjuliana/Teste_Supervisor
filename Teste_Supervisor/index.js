const express = require('express');
const app = express();
const swaggerJsDoc = require ('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const log  = require('./logger');
var usuario = [];

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Testando Supervisor e Swagger",
            description: "Gerando automaticamente a documentação pelo swagger",
        
        servers: ['http://localhost:3000']
    }
},
// ['.routes/*.js']
apis: ['index.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Routes
/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Lista de usuários
 *     description: Retorna todos os usuários
 *     responses:
 *       200:
 *         description: Sucesso
 */
app.get('/users', (req, res) => {
    log.info(res);
    res.status(200).json(usuario);
    
});

app.post('/user', (req, res) => 
{
        usuario.push('usuario2');
        console.log(usuario)
        res.status(200).send("Usuário: " + usuario + " "+ "adicionado com sucesso");
        log.info(res) 
});
       
/**
 * @swagger
 * /user:
 *    post:
 *      tags:
 *       - Inclusão de usuários
 *      description: Incluindo usuários
 *    parameters:
 *      - name: usuário
 *        in: query
 *        description: Nome do usuário
 *        required: false
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '201':
 *        description: Sucesso ao criar usuário
 */


           
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});