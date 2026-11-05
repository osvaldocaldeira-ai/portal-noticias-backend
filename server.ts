const express= require("express");

const pg= require("pg");
const dotenv= require("dotenv");
const cors= require("cors");

//carregar as variáveis do arquivo .env
dotenv.config();

//criar o servidor express
const app= express();
app.use(express.json());
app.use(cors());

//conectar ao banco de dados postgresql 
const pool= new pg.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

//rota de login
app.post("/login", async(req, res)=>{
//receber os dados enviados pelo formulário
const {email, senha}= req.body;

try {
  
    //consultar os dados de login no banco de dados.
    const resultado= await pool.query(
        "SELECT id, nome, email FROM administrador WHERE email=$1 AND senha=$2",
        [email, senha]
    );
    
    //verificar se o administrador foi encontrado.
if(resultado.rows.length==0){
return res.status(401).json({
    mensagem: "Email ou senha incorretos."
})
}else{
    return res.json({
    mensagem:"Login realizado com sucesso!",
    administrador: resultado.rows[0]   
    });
}

} catch (error) {
    console.log("Erro ao realizar login!", error);
    return res.status(500).json({
        mensagem: "Erro no servidor - rota de login."
    })
}
});


app.listen(3000, ()=>{
    console.log("Servidor iniciado na porta 3000!")
});
