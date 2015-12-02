IF EXISTS (SELECT * FROM sysobjects WHERE name='Sam3_Trg_ReplicarNumeroUnico') BEGIN
	DROP TRIGGER dbo.Sam3_Trg_ReplicarNumeroUnico
END
GO

CREATE TRIGGER Sam3_Trg_ReplicarNumeroUnico
ON Sam3_NumeroUnico
FOR INSERT
AS
BEGIN

	DECLARE @registroTemporal TABLE(
		NumeroUnicoID int,
		ProyectoID int,
        ItemCodeID int,
        ColadaID int,
        ProveedorID int,
        FabricanteID int,
        TipoCorte1ID int,
        TipoCorte2ID int,
        Estatus nchar(1),
        Factura nvarchar(25),
        PartidaFactura nvarchar(10),
        OrdenDeCompra nvarchar(20),
        PartidaOrdenDeCompra nvarchar(10),
        Diametro1 decimal(7,4),
        Diametro2 decimal(7,4),
        Cedula nvarchar(10),
        NumeroUnicoCliente nvarchar(50),
        MarcadoAsme bit,
        MarcadoGolpe bit,
        MarcadoPintura bit,
        TieneDano bit,
        Rack varchar(50),
        EsVirtual bit,
        RecepcionID int,
        Activo bit,
        UsuarioModificacion int,
        FechaModificacion datetime,
        Prefijo varchar(20),
        Consecutivo int
	)

	INSERT INTO @registroTemporal
			   (
			    NumeroUnicoID,
				ProyectoID,
				ItemCodeID,
				ColadaID,
				ProveedorID,
				FabricanteID,
				TipoCorte1ID,
				TipoCorte2ID,
				Estatus,
				Factura,
				PartidaFactura,
				OrdenDeCompra,
				PartidaOrdenDeCompra,
				Diametro1,
				Diametro2,
				Cedula,
				NumeroUnicoCliente,
				MarcadoAsme,
				MarcadoGolpe,
				MarcadoPintura,
				TieneDano,
				Rack,
				EsVirtual,
				RecepcionID,
				Activo,
				UsuarioModificacion,
				FechaModificacion,
				Prefijo,
				Consecutivo
			   )
			SELECT
				NumeroUnicoID,
				ProyectoID,
				ItemCodeID,
				ColadaID,
				ProveedorID,
				FabricanteID,
				TipoCorte1ID,
				TipoCorte2ID,
				Estatus,
				Factura,
				PartidaFactura,
				OrdenDeCompra,
				PartidaOrdenDeCompra,
				Diametro1,
				Diametro2,
				Cedula,
				NumeroUnicoCliente,
				MarcadoAsme,
				MarcadoGolpe,
				MarcadoPintura,
				TieneDano,
				Rack,
				EsVirtual,
				RecepcionID,
				Activo,
				UsuarioModificacion,
				FechaModificacion,
				Prefijo,
				Consecutivo
			FROM inserted

	--Creo un cusor para recorrer los registros insertados
	DECLARE @numeroUnicoID INT,
			@sam2_numeroUnicoID INT,
			@sam2_ProyectoID INT,
			@proyectoID INT,
			@sam2_ItemCodeID INT,
			@itemCodeID INT,
			@sam2_ProveedorID INT, 
			@proveedorID INT,
			@sam2_FabricanteID INT,
			@fabricanteID INT,
			@codigo VARCHAR(100),
			@prefijo VARCHAR(50),
			@consecutivo INT,
			@numeroDigitos INT,
			@sam2_coladaID INT,
			@coladaID INT



	DECLARE RecorrerRegistros CURSOR FOR
	SELECT NumeroUnicoID, ProyectoID, ItemCodeID, ProveedorID, FabricanteID, Prefijo, Consecutivo, ColadaID
		FROM @registroTemporal
	OPEN RecorrerRegistros
	FETCH NEXT FROM RecorrerRegistros 
		INTO @numeroUnicoID, @proyectoID, @itemCodeID, @proveedorID, @fabricanteID, @prefijo, @consecutivo, @coladaID 
	WHILE @@FETCH_STATUS = 0
	BEGIN

		SET @sam2_ProyectoID = (
			SELECT Sam2_ProyectoID FROM Sam3_EquivalenciaProyecto
			WHERE Sam3_ProyectoID = @proyectoID 
			AND Activo = 1
		)
		
		SET @sam2_ItemCodeID = (
			SELECT SAM2_ItemCodeID FROM Sam3_EquivalenciaItemCode
			WHERE Sam3_ItemCodeID = @itemCodeID
			AND Activo = 1
		)

		SET @sam2_ProveedorID = (
			SELECT Sam2_ProveedorID FROM Sam3_EquivalenciaProveedor
			WHERE Sam3_ProveedorID = @proveedorID
			AND Activo = 1
		)

		SET @sam2_FabricanteID = (
			SELECT Sam2_FabricanteID FROM Sam3_EquivalenciaFabricante
			WHERE Sam3_FabricanteID = @fabricanteID
			AND Activo = 1
 		)

		SET @numeroDigitos = (
			SELECT DigitosNumeroUnico FROM SAM2.SAM.DBO.ProyectoConfiguracion
			WHERE ProyectoID = @sam2_ProyectoID
		)

		SET @codigo = @prefijo + '-' + 
			(REPLICATE('0',(@numeroDigitos - LEN(@consecutivo))) + CONVERT(varchar, @consecutivo))

		SET @sam2_coladaID = (
			SELECT Sam2_ColadaID FROM Sam3_EquivalenciaColada 
			WHERE Sam3_ColadaID = @coladaID
		)

		--Verificamos si existe este numero unico en la base de sam2
		IF (SELECT NumeroUnicoID FROM SAM2.SAM.DBO.NumeroUnico
			WHERE Codigo = @codigo AND ProyectoID = @proyectoID) IS NULL
		BEGIN
			--insertamos el numero Unico
			INSERT INTO SAM2.SAM.DBO.NumeroUnico(
			    [ProyectoID]
			   ,[ItemCodeID]
			   ,[ColadaID]
			   ,[ProveedorID]
			   ,[FabricanteID]
			   ,[TipoCorte1ID]
			   ,[TipoCorte2ID]
			   ,[Codigo]
			   ,[Estatus]
			   ,[Factura]
			   ,[PartidaFactura]
			   ,[OrdenDeCompra]
			   ,[PartidaOrdenDeCompra]
			   ,[Diametro1]
			   ,[Diametro2]
			   ,[Cedula]
			   ,[NumeroUnicoCliente]
			   ,[MarcadoAsme]
			   ,[MarcadoGolpe]
			   ,[MarcadoPintura]
			   ,[TieneDano]
			   ,[Rack]
			   ,[FechaModificacion]
		   )
		   SELECT 
				@sam2_ProyectoID,
				@sam2_ItemCodeID,
				@sam2_coladaID,
				@sam2_ProveedorID,
				@sam2_FabricanteID,
				NULL,
				NULL,
				@codigo,
				'A',
				Factura,
				PartidaFactura,
				OrdenDeCompra,
				PartidaOrdenDeCompra,
				Diametro1,
				Diametro2,
				Cedula,
				NumeroUnicoCliente,
				MarcadoAsme,
				MarcadoGolpe,
				MarcadoPintura,
				TieneDano,
				Rack,
				GETDATE()
		   FROM @registroTemporal r
		   WHERE r.NumeroUnicoID = @numeroUnicoID

		   --recuperamos el ID del numero unico en sam2
		   SET @sam2_numeroUnicoID = SCOPE_IDENTITY()

		   IF (@sam2_numeroUnicoID) IS NULL
		   BEGIN
				SET @sam2_numeroUnicoID = (
					SELECT NumeroUnicoID FROM SAM2.SAM.DBO.NumeroUnico
					WHERE Codigo = @codigo AND ProyectoID = @sam2_ProyectoID
				)
		   END

		   --insertamos en la tabla de equivalencias
		   INSERT INTO Sam3_EquivalenciaNumeroUnico(
				Sam2_NumeroUnicoID,
				Sam3_NumeroUnicoID,
				Activo,
				FechaModificacion,
				UsuarioModificacion
		   )
		   VALUES(
				@sam2_numeroUnicoID,
				@numeroUnicoID,
				1,
				GETDATE(),
				1
		   )

		END
		
		FETCH NEXT FROM RecorrerRegistros 
		INTO @numeroUnicoID, @proyectoID, @itemCodeID, @proveedorID, @fabricanteID, @prefijo, @consecutivo, @coladaID
	END
	CLOSE RecorrerRegistros;
	DEALLOCATE RecorrerRegistros;

END
