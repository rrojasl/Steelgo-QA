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
	)

	INSERT INTO @registroTemporal
			   (
			    
			   )
			SELECT
			FROM inserted

	--Creo un cusor para recorrer los registros insertados
	DECLARE @ID INT


	DECLARE RecorrerRegistros CURSOR FOR
	SELECT ProyectoID, Codigo, ItemCodeID FROM @registroTemporal
	OPEN RecorrerRegistros
	FETCH NEXT FROM RecorrerRegistros INTO @proyectoID, @codigo, @itemCodeID
	WHILE @@FETCH_STATUS = 0
	BEGIN

		

		FETCH NEXT FROM RecorrerRegistros INTO @proyectoID, @codigo, @itemCodeID
	END
	CLOSE RecorrerRegistros;
	DEALLOCATE RecorrerRegistros;


END
