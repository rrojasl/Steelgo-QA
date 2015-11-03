begin try
begin tran

	DECLARE @itemCodeID int, @ItemCodeSteelgoID int, @diametro1ID int, @diametro2ID int

	DECLARE RecorrerRegistros CURSOR FOR
	SELECT ItemCodeID FROM Sam3_ItemCode where Activo = 1
	OPEN RecorrerRegistros
	FETCH NEXT FROM RecorrerRegistros INTO @itemCodeID
	WHILE @@FETCH_STATUS = 0
	BEGIN
		
		set @diametro1ID = (
			select DiametroID from Sam3_Diametro
			where Valor = 4
		)
		set @diametro2ID = (
			select DiametroID from Sam3_Diametro
			where Valor = 2
		)

		insert into Sam3_Rel_ItemCode_Diametro(
			ItemCodeID,
			Diametro1ID,
			Diametro2ID,
			Activo
		)
		values(
			@itemCodeID,
			@diametro1ID,
			@diametro2ID,
			1
		)

		FETCH NEXT FROM RecorrerRegistros INTO @itemCodeID
	END
	CLOSE RecorrerRegistros;
	DEALLOCATE RecorrerRegistros;

commit tran
end try
begin catch
	EXECUTE Sam3_GetErrorInfo;
	rollback tran
end catch
go

begin try
begin tran

	DECLARE @ItemCodeSteelgoID int, @diametro1ID int, @diametro2ID int

	DECLARE RecorrerRegistros CURSOR FOR
	SELECT ItemCodeSteelgoID FROM Sam3_ItemCodeSteelgo where Activo = 1
	OPEN RecorrerRegistros
	FETCH NEXT FROM RecorrerRegistros INTO @ItemCodeSteelgoID
	WHILE @@FETCH_STATUS = 0
	BEGIN
		
		set @diametro1ID = (
			select DiametroID from Sam3_Diametro
			where Valor = 4
		)
		set @diametro2ID = (
			select DiametroID from Sam3_Diametro
			where Valor = 2
		)

		insert into Sam3_Rel_ItemCodeSteelgo_Diametro(
			ItemCodeSteelgoID,
			Diametro1ID,
			Diametro2ID,
			Activo
		)
		values(
			@ItemCodeSteelgoID,
			@diametro1ID,
			@diametro2ID,
			1
		)

		FETCH NEXT FROM RecorrerRegistros INTO @ItemCodeSteelgoID
	END
	CLOSE RecorrerRegistros;
	DEALLOCATE RecorrerRegistros;

commit tran
end try
begin catch
	EXECUTE Sam3_GetErrorInfo;
	rollback tran
end catch
go

begin tran
begin try

	update Sam3_NumeroUnico set Diametro1 = 4, Diametro2 = 2
	select * from Sam3_NumeroUnico
commit tran
end try
begin catch
	EXECUTE Sam3_GetErrorInfo;
	rollback tran
end catch
go