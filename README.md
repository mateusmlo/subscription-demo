# subscription-demo
Demonstração de uma efetivação de assinatura com cartão de crédito em um plano de cobrança recorrente utilizando o Pagseguro.


docker run --name mysql-general -e MYSQL_ROOT_PASSWORD=root -p 3302:3302 -d mysql:latest
docker run --link mysql-general:db -p 8080:8080 adminer