create table Sam3_EquivalenciaAcero(
	EquivalenciaAceroID int not null primary key identity,
	Sam2_AceroID int not null, 
	Sam3_AceroID int not null,
	Activo bit not null default(1),
	FechaModificacion datetime null,
	UsuarioModificacion int null
)

create table Sam3_EquivalenciaColada(
	EquivalenciaColadaID int not null primary key identity,
	Sam2_ColadaID int not null,
	Sam3_ColadaID int not null,
	Activo bit not null default(1),
	FechaModificacion datetime null,
	UsuarioModificacion int null
)

create table Sam3_EquivalenciaFamiliaAcero(
	EquivalenciaFamiliaAceroID int not null primary key identity,
	Sam2_FamiliaAceroID int not null,
	Sam3_FamiliAceroID int not null,
	Activo bit not null default(1),
	FechaModificacion datetime null,
	UsuarioModificacion int null
)

create table Sam3_EquivalenciaFamiliaMaterial(
	EquivalenciaFamiliaMaterialID int not null primary key identity,
	Sam2_FamiliaMaterialID int not null,
	Sam3_FamiliaMaterialID int not null,
	Activo bit not null default(1),
	FechaModificacion datetime null,
	UsuarioModificacion int null
)

create table Sam3_EquivalenciaFabricante(
	EquivalenciaFabricanteID int not null primary key identity,
	Sam2_FabricanteID int not null,
	Sam3_FabricanteID int not null,
	Activo bit not null default(1),
	FechaModificacion datetime null,
	UsuarioModificacion int null
)

create table Sam3_EquivalenciaProyecto(
	EquivalenciaProyectoID int not null primary key identity,
	Sam2_ProyectoID int not null,
	Sam3_ProyectoID int not null,
	Activo bit not null default(1),
	FechaModificacion datetime null,
	UsuarioModificacion int null
)

create table Sam3_EquivalenciaPatio(
	EquivalenciaPatioID int not null primary key identity,
	Sam2_PatioID int not null,
	Sam3_PatioID int not null,
	Activo bit not null default(1),
	FechaModificacion datetime null,
	UsuarioModificacion int null
)

create table Sam3_EquivalenciaProveedor(
	EquivalenciaProveedorID int not null primary key identity,
	Sam2_ProveedorID int not null,
	Sam3_ProveedorID int not null,
	Activo bit not null default(1),
	FechaModificacion datetime null,
	UsuarioModificacion int null
)

create table Sam3_EquivalenciaNumeroUnico(
	EquivalenciaNumeroUnicoID int not null primary key identity,
	Sam2_NumeroUnicoID int not null,
	Sam3_NumeroUnicoID int not null,
	Activo bit not null default(1),
	FechaModificacion datetime null,
	UsuarioModificacion int null
)

create table Sam3_EquivalenciaItemCode(
	EquivalenciaItemCodeID int not null primary key identity,
	Sam2_ItemCodeID int not null,
	Sam3_ItemCodeID int not null,
	Activo bit not null default(1),
	FechaModificacion datetime null,
	UsuarioModificacion int null
)

create table Sam3_EquivalenciaDespacho(
	EquivalenciaDespachoID int not null primary key identity,
	Sam2_DespachoID int not null,
	Sam3_DespachoID int not null,
	Activo bit not null default(1),
	FechaModificacion datetime null,
	UsuarioModificacion int null
)

create table Sam3_EquivalenciaCorte(
	EquivalenciaCorteID int not null primary key identity,
	Sam2_CorteID int not null,
	Sam3_CorteID int not null,
	Activo bit not null default(1),
	FechaModificacion datetime null,
	UsuarioModificacion int null
)

create table Sam3_EquivalenciaNumeroUnicoMovimiento(
	EquivalenciaNumeroUnicoMovimientoID int not null primary key identity,
	Sam2_NumeroUnicoMovimientoID int not null,
	Sam3_NumeroUnicoMovimientoID int not null,
	Activo bit not null default(1),
	FechaModificacion datetime null,
	UsuarioModificacion int null
)