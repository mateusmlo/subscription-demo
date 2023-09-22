# subscription-demo
MVP de uma tela de efetivação de assinatura com cartão de crédito em um plano de cobrança recorrente utilizando o Pagseguro.
A ideia foi fazer um projeto "vanilla", sem frameworks ou libs que forcem um padrão (opinionated). Aplicar alterações de estado de componentes e DOM events foi o desafio mais divertido aqui.
Obs: foi feito para rodar num server Nginx, não vai funcionar subindo com `npm start` ou algo do tipo, mas um dia tomo um tempo pra "Dockerizar" isso.
 
## Stack:
- Express
- MySQL
- Sequelize
- Docker
- Nodemon
- PagSeguro
- Bulma CSS

Certifique-se de ter o Docker instalado e configurado em sua máquina, então rode no terminal:
```bash
docker-compose up -d
```

Acesse localhost:8080, entre com as credenciais usuario: root, senha: root e crie uma database chamada test.

Depois:
```bash
npm start
```
