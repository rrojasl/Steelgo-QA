
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE Sam3_ObtenerFormatoEtiquetas
	@OrdenRecepcionID int
AS
BEGIN
	declare @formato varchar(max), @numeroDigitos int
	set @formato='';
	set @numeroDigitos=0;

	select distinct @numeroDigitos=p.DigitosNumeroUnico from Sam3_OrdenRecepcion r
	inner join Sam3_Rel_OrdenRecepcion_ItemCode rel
		on r.OrdenRecepcionID= rel.OrdenRecepcionID
	inner join Sam3_ItemCode  i
		on rel.ItemCodeID=i.ItemCodeID
	inner join Sam3_ProyectoConfiguracion p
		on i.ProyectoID=p.ProyectoID
	where r.Activo=1 and rel.Activo=1 and i.Activo=1
	and rel.OrdenRecepcionID=@OrdenRecepcionID

	set @formato= convert(varchar(max), @numeroDigitos)


	select  ISNULL(r.Cedula,'') as [Cedula],
			c.NumeroCertificado as [Certificado],
			c.NumeroColada as [Colada],
			it.DescripcionEspanol as [Descripcion],
			r.Diametro1 as [Diametro1],
			r.Diametro2 as [Diametro2],
			it.Codigo as [ItemCode],
			R.Prefijo +'-' + REPLACE(STR(r.Consecutivo,CASE WHEN LEN(r.Consecutivo)> @numeroDigitos THEN LEN(r.Consecutivo) ELSE @numeroDigitos END), SPACE(1), '0') as [NumeroUnico],
			P.Nombre as [Proyecto],
			R.Prefijo +'-' + REPLACE(STR(r.Consecutivo,CASE WHEN LEN(r.Consecutivo)> @numeroDigitos THEN LEN(r.Consecutivo) ELSE @numeroDigitos END), SPACE(1), '0') as [Material]
	from Sam3_NumeroUnico r
	inner join Sam3_Rel_OrdenRecepcion_ItemCode  o
		on r.ItemCodeID=o.ItemCodeID
	inner join Sam3_ItemCode it
		on o.ItemCodeID=it.ItemCodeID
	inner join Sam3_Colada c
		on r.ColadaID= c.ColadaID
	inner join Sam3_Proyecto p
		on r.ProyectoID=p.ProyectoID
	where o.OrdenRecepcionID=@OrdenRecepcionID
	and r.Activo=1 and o.Activo=1


END
GO
