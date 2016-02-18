  CREATE TABLE Sam3_Rel_Proyecto_Correo
  (
  Rel_Proyecto_Correo int NOT NULL PRIMARY KEY identity(1,1),
  ProyectoID int NOT NULL,
  Correo varchar(250) NOT NULL,
  EnviaCorreo bit NOT NULL,
  Activo bit NOT NULL,
  Fecha datetime NULL,
  UsuarioModificacion int NULL,
  foreign key (ProyectoID) references Sam3_Proyecto(ProyectoID),
  )