CREATE TABLE Sam3_DeficitMateriales
(
	DeficitID int IDENTITY(1,1) Primary key not null,
	OrdenTrabajoID int not null,
	ItemCodeID int not null,
	SpoolID int null,
	Deficit int not null,
	Activo bit not null,
	UsuarioModificacion int null,
	FechaModificacion datetime null
)