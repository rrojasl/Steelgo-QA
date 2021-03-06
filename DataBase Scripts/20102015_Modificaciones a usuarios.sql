begin tran
begin try
	alter table Sam3_Usuario
		Add Sam2UserID uniqueidentifier null

	commit tran
end try
begin catch
	rollback tran
end catch

begin tran
begin try

	--select * from Sam3_Usuario
	--select top 1 * from sam2.sam.dbo.Usuario

	declare @perfilId int
	
	set @perfilId = (
		select PerfilID from Sam3_Perfil
		where Nombre = 'Sin Permisos'
	)

	insert into Sam3_Usuario(
		Nombre,
		ApellidoPaterno,
		ApellidoMaterno,
		BloqueadoPorAdministracion,
		Activo,
		Sam2UserID,
		PerfilID,
		ContrasenaHash,
		NombreUsuario
	)
	select 
		Nombre,
		ApPaterno,
		ApMaterno,
		BloqueadoPorAdministrador,
		1,
		us.UserId,
		@perfilId,
		m.[Password],
		asp.UserName
	from sam2.sam.dbo.Usuario us inner join sam2.sam.[dbo].[aspnet_Membership] m on us.UserId = m.UserId
	inner join sam2.sam.dbo.aspnet_Users asp on us.UserId = asp.UserId

	commit tran
end try
begin catch
	rollback tran
end catch