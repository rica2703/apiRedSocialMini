create database RedSocial;
use RedSocial;
create user 'ricardo'@'localhost'IDENTIfIED BY 'parangar01';
grant all privileges on RedSocial.*to'ricardo'@'localhost';
alter user 'ricardo'@'localhost'IDENTIFIED WITH mysql_native_password BY 'parangar01';
create table usuarios(
NombreUsuario varchar(60) primary key,
contraseña varchar(30),
nombre varchar(40),
apellidos varchar(50),
correo varchar(60),
telefono int4,
carrera varchar(60),
escuela varchar(60),
redSocial varchar(60),
foto varchar(100),
rol varchar(40)
);
create table publicaciones(
nombreUsuario varchar(60),
id integer auto_increment primary key,
textoPublicado varchar(300),
horaPublicado time,
fechaPublicado date,
evento bool
);
drop table usuarios;
drop table publicaciones;