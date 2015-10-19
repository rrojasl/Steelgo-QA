IF EXISTS (SELECT * FROM sysobjects WHERE name='Sam3_Trg_ReplicarNumeroUnicoInventario') BEGIN
	DROP TRIGGER dbo.Sam3_Trg_ReplicarNumeroUnicoInventario
END
GO

CREATE TRIGGER Sam3_Trg_ReplicarNumeroUnicoInventario
ON Sam3_NumeroUnicoInventario
FOR INSERT
AS
BEGIN

	DECLARE @registroTemporal TABLE(
		[NumeroUnicoID] [int],
		[ProyectoID] [int],
		[CantidadRecibida] [int],
		[CantidadDanada] [int],
		[InventarioFisico] [int],
		[InventarioBuenEstado] [int],
		[InventarioCongelado] [int],
		[InventarioTransferenciaCorte] [int],
		[InventarioDisponibleCruce] [int],
		[EsVirtual] [bit],
		[Activo] [bit],
		[UsuarioModificacion] [int],
		[FechaModificacion] [datetime]
	)

	INSERT INTO @registroTemporal
			   (
				NumeroUnicoID,
				ProyectoID,
				CantidadRecibida,
				CantidadDanada,
				InventarioFisico,
				InventarioBuenEstado,
				InventarioCongelado,
				InventarioTransferenciaCorte,
				InventarioDisponibleCruce,
				EsVirtual,
				Activo,
				UsuarioModificacion,
				FechaModificacion
			   )
			SELECT
				NumeroUnicoID,
				ProyectoID,
				CantidadRecibida,
				CantidadDanada,
				InventarioFisico,
				InventarioBuenEstado,
				InventarioCongelado,
				InventarioTransferenciaCorte,
				InventarioDisponibleCruce,
				EsVirtual,
				Activo,
				UsuarioModificacion,
				FechaModificacion
			FROM inserted

	--Creo un cusor para recorrer los registros insertados
	DECLARE @numeroUnicoID INT


	DECLARE RecorrerRegistros CURSOR FOR
	SELECT NumeroUnicoID FROM @registroTemporal
	OPEN RecorrerRegistros
	FETCH NEXT FROM RecorrerRegistros INTO @numeroUnicoID
	WHILE @@FETCH_STATUS = 0
	BEGIN

		

		FETCH NEXT FROM RecorrerRegistros INTO @proyectoID, @codigo, @itemCodeID
	END
	CLOSE RecorrerRegistros;
	DEALLOCATE RecorrerRegistros;


END
