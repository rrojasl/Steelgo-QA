
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE Sam3_ObtenerFormatoEtiquetas
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



/****** Object:  StoredProcedure [dbo].[Sam3_ObtenerFormatoIncidencias]    Script Date: 10/12/2015 12:03:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[Sam3_ObtenerFormatoIncidencias]
	@FolioAvisoLlegadaID int
AS
BEGIN
	

	Select  1 as [numRFI], 
			0 as [numRFIRevNo], 
			1 as [numNoOfAttachment],
			FORMAT(convert(datetime,GETDATE()),'MM/dd/yy hh:mm:ss tt') as datDate,
			'michael.mainvielle' as [txtAskedBy],
			'Mitchel Richardson' as [ResponseBy],
			 FORMAT(convert(datetime,GETDATE()),'MM/dd/yy') as [ResponseDate],
			 0 as [TransNo],
			'michael.minvielle' as [ActionBy],
			 FORMAT(convert(datetime,GETDATE()),'MM/dd/yy hh:mm:ss tt') as [ActionDate],
			 1 as [ynClosed],
			 'Confirm Nominal Wall Thickness for 26 Pipe' as [Reference],
			 'Please review the attached Material pre-Buy for line item 24' as [mmQuestion],
			 'Confirmed, the wall thickness shown for the 26 nps is nominal wall thickness' as [mmResponse]
	union all
			Select  1 as [numRFI], 
			0 as [numRFIRevNo], 
			1 as [numNoOfAttachment],
			FORMAT(convert(datetime,GETDATE()),'MM/dd/yy hh:mm:ss tt') as datDate,
			'michael.mainvielle' as [txtAskedBy],
			'Mitchel Richardson' as [ResponseBy],
			 FORMAT(convert(datetime,GETDATE()),'MM/dd/yy') as [ResponseDate],
			 0 as [TransNo],
			'michael.minvielle' as [ActionBy],
			 FORMAT(convert(datetime,GETDATE()),'MM/dd/yy hh:mm:ss tt') as [ActionDate],
			 1 as [ynClosed],
			 'Confirm Nominal Wall Thickness for 26 Pipe' as [Reference],
			 'Please review the attached Material pre-Buy for line item 24' as [mmQuestion],
			 'Confirmed, the wall thickness shown for the 26 nps is nominal wall thickness' as [mmResponse]

END
GO


SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Sam3_ObtenerFormatoPaseSalida]
	@FolioAvisoLlegadaID int	
AS
BEGIN
	SET NOCOUNT ON;

	declare @i int, 
			@strPlacas varchar(max);

	set @i=1;
	set @strPlacas='';


	create table #Placas(
	idx int identity(1,1),
	Placas varchar(20)
	)

	insert into #Placas
	select Placas from Sam3_Rel_FolioAvisoLlegada_Vehiculo a
	inner join Sam3_Vehiculo b on a.VehiculoID=b.VehiculoID
	inner join Sam3_TipoVehiculo c on b.TipoVehiculoID=c.TipoVehiculoID
	where a.Activo=1 and b.Activo=1 and c.Activo=1
	and FolioAvisoLlegadaID=@FolioAvisoLlegadaID

	declare @FechaInicioDescarga varchar(12),@FechaFinDescarga varchar(12),
			@cantidadPackingFirmado int,  @cantidadPlanas int

	select @FechaInicioDescarga=isnull(FORMAT(convert(datetime,FechainicioDescarga),'hh:mm:ss tt'),''),
		   @FechaFinDescarga=isnull(FORMAT(convert(datetime,FechaFinDescarga),'hh:mm:ss tt'),'')
	from Sam3_FolioAvisoEntrada where FolioAvisoLlegadaID=@FolioAvisoLlegadaID


	set @cantidadPlanas=(select COUNT(*) from #Placas)

	create table #Plana(
		FolioAvisoLlegadaID int,
		Plana varchar(max),
		ValorPlana varchar(max)
	)

	while(@i<= @cantidadPlanas)
	begin
		declare @Plana varchar(max), @Placas varchar(max)
		set @Plana='Plana '+convert(varchar(max),@i);

		select @Placas=Placas from #Placas where idx=@i

		insert into #Plana values(@FolioAvisoLlegadaID, @Plana,@Placas )
		set @i+=1;
	end

	declare @string varchar(max)
	SET @string='';

	select  convert(varchar(10),getdate(),103) as Fecha,
			@FechaInicioDescarga  as FechaInicioDescarga,
			@FechaFinDescarga as FechaFinDescarga,
			 FORMAT(convert(datetime,FechaRecepcion),'hh:mm:ss tt') as FechaLlegada,
			(select Nombre from Sam3_Chofer where ChoferID= a.ChoferID) as [NombreOperador],
			1 as IncidenciaFirmada,
			15001 as NumeroIncidencia, 
			p.Nombre as Proyecto,
			(select Placas from Sam3_Vehiculo where VehiculoID= a.VehiculoID) as Tracto, 
			fae.OrdenCompra as Pedimento, 
			fae.Factura as Factura, 
			'N/A'  as Remision,
			convert(varchar(max),@cantidadPlanas)  as [NumeroPlanas],
			Plana,
			ValorPlana
	from Sam3_FolioAvisoLlegada a 
	inner join Sam3_Rel_FolioAvisoLlegada_Proyecto relp 
	on a.FolioAvisoLlegadaID=relp.FolioAvisoLlegadaID 
	inner join Sam3_Proyecto  p 
	on  relp.ProyectoID=p.ProyectoID 
	inner join Sam3_FolioAvisoEntrada  fae 
	on  fae.FolioAvisoLlegadaID=a.FolioAvisoLlegadaID 
	left join #Plana pl
	on pl.FolioAvisoLlegadaID=a.FolioAvisoLlegadaID
	where a.FolioAvisoLlegadaID=@FolioAvisoLlegadaID




END