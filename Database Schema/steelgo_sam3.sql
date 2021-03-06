USE [master]
GO
/****** Object:  Database [steelgo-sam3]    Script Date: 9/9/2015 3:53:59 PM ******/
CREATE DATABASE [steelgo-sam3]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'steelgo-sam3', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL11.MSSQLSERVER2012\MSSQL\DATA\steelgo-sam3.mdf' , SIZE = 5120KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'steelgo-sam3_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL11.MSSQLSERVER2012\MSSQL\DATA\steelgo-sam3_log.ldf' , SIZE = 24384KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [steelgo-sam3] SET COMPATIBILITY_LEVEL = 110
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [steelgo-sam3].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [steelgo-sam3] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [steelgo-sam3] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [steelgo-sam3] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [steelgo-sam3] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [steelgo-sam3] SET ARITHABORT OFF 
GO
ALTER DATABASE [steelgo-sam3] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [steelgo-sam3] SET AUTO_CREATE_STATISTICS ON 
GO
ALTER DATABASE [steelgo-sam3] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [steelgo-sam3] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [steelgo-sam3] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [steelgo-sam3] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [steelgo-sam3] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [steelgo-sam3] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [steelgo-sam3] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [steelgo-sam3] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [steelgo-sam3] SET  DISABLE_BROKER 
GO
ALTER DATABASE [steelgo-sam3] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [steelgo-sam3] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [steelgo-sam3] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [steelgo-sam3] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [steelgo-sam3] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [steelgo-sam3] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [steelgo-sam3] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [steelgo-sam3] SET RECOVERY FULL 
GO
ALTER DATABASE [steelgo-sam3] SET  MULTI_USER 
GO
ALTER DATABASE [steelgo-sam3] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [steelgo-sam3] SET DB_CHAINING OFF 
GO
ALTER DATABASE [steelgo-sam3] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [steelgo-sam3] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
USE [steelgo-sam3]
GO
/****** Object:  StoredProcedure [dbo].[Sam3_SP_ObtenerFoliosParaListado]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Julián Hernández Tenorio
-- Create date: 26-06-2015
-- Description:	Obtiene los datos para Listado de Aviso de Llegada
-- =============================================
CREATE PROCEDURE [dbo].[Sam3_SP_ObtenerFoliosParaListado]
	-- Add the parameters for the stored procedure here
	@FolioAvisoEntrada int, 
	@FolioAvisoLlegada int,
	@proyectoIds varchar(max),
	@PatioIds varchar(max),
	@fechaInicial datetime,
	@fechaFinal datetime

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	DECLARE @IDsProyectos TABLE (ID int)
	INSERT INTO @IDsProyectos
		SELECT ID = Item FROM dbo.Sam3_SplitInts(@proyectoIds, ',')
	SELECT * FROM @IDsProyectos

	DECLARE @IDsPatios TABLE (ID int)
	INSERT INTO @IDsPatios
		SELECT ID = Item FROM dbo.Sam3_SplitInts(@PatioIds, ',')
	SELECT * FROM @IDsPatios

	SELECT DISTINCT(a.FolioAvisoLlegadaID) FROM Sam3_FolioAvisoLlegada a inner join Sam3_Rel_FolioAvisoLlegada_Proyecto rap
		on a.FolioAvisoLlegadaID = rap.FolioAvisoLlegadaID
	INNER JOIN Sam3_Patio p on a.PatioID = p.PatioID
	INNER JOIN Sam3_Proyecto py on rap.ProyectoID = py.ProyectoID
	INNER JOIN Sam3_FolioAvisoEntrada ae on a.FolioAvisoLlegadaID = ae.FolioAvisoLlegadaID
	WHERE a.Activo = 1
	AND a.FolioAvisoLlegadaID Like @FolioAvisoLlegada
	AND ae.FolioAvisoEntradaID Like @FolioAvisoEntrada
	AND p.PatioID IN (SELECT ID FROM @IDsPatios)
	AND py.ProyectoID IN (SELECT ID FROM @IDsProyectos)
	 

END

GO
/****** Object:  Table [dbo].[Sam3_Acero]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_Acero](
	[AceroID] [int] IDENTITY(1,1) NOT NULL,
	[FamiliaAceroID] [int] NOT NULL,
	[Nomenclatura] [nvarchar](50) NOT NULL,
	[VerificadoPorCalidad] [bit] NOT NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
 CONSTRAINT [PK_Acero] PRIMARY KEY CLUSTERED 
(
	[AceroID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_Bulto]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Sam3_Bulto](
	[BultoID] [int] IDENTITY(1,1) NOT NULL,
	[FolioCuantificacionID] [int] NOT NULL,
	[Estatus] [varchar](150) NULL,
	[FechaModificacion] [datetime] NULL,
	[UsuarioModificacion] [int] NULL,
	[Activo] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[BultoID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Sam3_Chofer]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_Chofer](
	[ChoferID] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [nvarchar](100) NOT NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
	[TransportistaID] [int] NOT NULL,
 CONSTRAINT [PK_Chofer] PRIMARY KEY CLUSTERED 
(
	[ChoferID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_Cliente]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_Cliente](
	[ClienteID] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [nvarchar](150) NOT NULL,
	[Direccion] [nvarchar](max) NULL,
	[Ciudad] [nvarchar](50) NULL,
	[Estado] [nvarchar](50) NULL,
	[Pais] [nvarchar](50) NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
	[Sam2ClienteID] [int] NULL,
 CONSTRAINT [PK_Cliente] PRIMARY KEY CLUSTERED 
(
	[ClienteID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_Colada]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_Colada](
	[ColadaID] [int] IDENTITY(1,1) NOT NULL,
	[FabricanteID] [int] NULL,
	[AceroID] [int] NOT NULL,
	[ProyectoID] [int] NOT NULL,
	[NumeroColada] [nvarchar](20) NOT NULL,
	[NumeroCertificado] [nvarchar](20) NULL,
	[HoldCalidad] [bit] NOT NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
 CONSTRAINT [PK_Colada] PRIMARY KEY CLUSTERED 
(
	[ColadaID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_Color]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_Color](
	[ColorID] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [nvarchar](50) NOT NULL,
	[NombreIngles] [nvarchar](50) NULL,
	[CodigoHexadecimal] [nvarchar](7) NOT NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
 CONSTRAINT [PK_Color] PRIMARY KEY CLUSTERED 
(
	[ColorID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_Contacto]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_Contacto](
	[ContactoID] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [nvarchar](50) NOT NULL,
	[ApPaterno] [nvarchar](50) NOT NULL,
	[ApMaterno] [nvarchar](50) NULL,
	[CorreoElectronico] [nvarchar](255) NULL,
	[TelefonoOficina] [nvarchar](20) NULL,
	[TelefonoParticular] [nvarchar](20) NULL,
	[TelefonoCelular] [nvarchar](20) NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
 CONSTRAINT [PK_Contacto] PRIMARY KEY CLUSTERED 
(
	[ContactoID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_Corte]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_Corte](
	[CorteID] [int] IDENTITY(1,1) NOT NULL,
	[ProyectoID] [int] NOT NULL,
	[NumeroUnicoCorteID] [int] NOT NULL,
	[Sobrante] [int] NULL,
	[Merma] [int] NULL,
	[MermaMovimientoID] [int] NULL,
	[PreparacionCorteMovimientoID] [int] NULL,
	[Cancelado] [bit] NOT NULL,
	[Rack] [int] NOT NULL,
	[CortadorID] [int] NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
 CONSTRAINT [PK_Corte] PRIMARY KEY CLUSTERED 
(
	[CorteID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_CorteDetalle]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_CorteDetalle](
	[CorteDetalleID] [int] IDENTITY(1,1) NOT NULL,
	[CorteID] [int] NOT NULL,
	[OrdenTrabajoSpoolID] [int] NOT NULL,
	[MaterialSpoolID] [int] NOT NULL,
	[SalidaInventarioID] [int] NULL,
	[Cantidad] [int] NOT NULL,
	[FechaCorte] [datetime] NULL,
	[MaquinaID] [int] NULL,
	[Cancelado] [bit] NOT NULL,
	[EsAjuste] [bit] NOT NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
 CONSTRAINT [PK_CorteDetalle] PRIMARY KEY CLUSTERED 
(
	[CorteDetalleID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_Diametro]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_Diametro](
	[DiametroID] [int] IDENTITY(1,1) NOT NULL,
	[Valor] [decimal](7, 4) NOT NULL,
	[VerificadoPorCalidad] [bit] NOT NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
 CONSTRAINT [PK_Diametro] PRIMARY KEY CLUSTERED 
(
	[DiametroID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_Entidad]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_Entidad](
	[EntidadID] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [nvarchar](100) NOT NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
 CONSTRAINT [PK_Entidad] PRIMARY KEY CLUSTERED 
(
	[EntidadID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_EstatusOrden]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_EstatusOrden](
	[EstatusOrdenID] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [nvarchar](50) NOT NULL,
	[NombreIngles] [nvarchar](50) NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
 CONSTRAINT [PK_EstatusOrden] PRIMARY KEY CLUSTERED 
(
	[EstatusOrdenID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_ExtensionDocumento]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_ExtensionDocumento](
	[ExtencionDocumentoID] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [nvarchar](50) NULL,
	[Extension] [nvarchar](50) NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
 CONSTRAINT [PK_ExtensionDocumento] PRIMARY KEY CLUSTERED 
(
	[ExtencionDocumentoID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_Fabricante]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_Fabricante](
	[FabricanteID] [int] IDENTITY(1,1) NOT NULL,
	[ContactoID] [int] NOT NULL,
	[Nombre] [nvarchar](50) NOT NULL,
	[Descripcion] [nvarchar](50) NULL,
	[Direccion] [nvarchar](max) NULL,
	[Telefono] [nvarchar](50) NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
 CONSTRAINT [PK_Fabricante] PRIMARY KEY CLUSTERED 
(
	[FabricanteID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_FamiliaAcero]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_FamiliaAcero](
	[FamiliaAceroID] [int] IDENTITY(1,1) NOT NULL,
	[FamiliaMaterialID] [int] NOT NULL,
	[Nombre] [nvarchar](50) NOT NULL,
	[Descripcion] [nvarchar](500) NULL,
	[VerificadoPorCalidad] [bit] NOT NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
 CONSTRAINT [PK_FamiliaAcero] PRIMARY KEY CLUSTERED 
(
	[FamiliaAceroID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_FamiliaItemCode]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_FamiliaItemCode](
	[FamiliaItemCodeID] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [nvarchar](100) NOT NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
 CONSTRAINT [PK_FamiliaItemCode] PRIMARY KEY CLUSTERED 
(
	[FamiliaItemCodeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_FamiliaMaterial]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_FamiliaMaterial](
	[FamiliaMaterialID] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [nvarchar](50) NOT NULL,
	[Descripcion] [nvarchar](500) NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
 CONSTRAINT [PK_FamiliaMaterial] PRIMARY KEY CLUSTERED 
(
	[FamiliaMaterialID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_FolioAvisoEntrada]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Sam3_FolioAvisoEntrada](
	[FolioAvisoEntradaID] [int] IDENTITY(1,1) NOT NULL,
	[Consecutivo] [int] NULL,
	[FolioAvisoLlegadaID] [int] NULL,
	[Estatus] [nvarchar](100) NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
	[Factura] [varchar](max) NULL,
	[OrdenCompra] [varchar](max) NULL,
	[ProveedorID] [int] NULL,
	[ClienteID] [int] NOT NULL,
	[PatioID] [int] NOT NULL,
	[FolioDescarga] [int] NOT NULL,
	[FechaFolioDescarga] [datetime] NULL,
	[FechaFinDescarga] [datetime] NULL,
	[FechainicioDescarga] [datetime] NULL,
	[FechaCreacion] [datetime] NULL,
	[ComboEstatus] [varchar](max) NULL,
 CONSTRAINT [PK_FolioLlegada] PRIMARY KEY CLUSTERED 
(
	[FolioAvisoEntradaID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Sam3_FolioAvisoLlegada]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_FolioAvisoLlegada](
	[FolioAvisoLlegadaID] [int] IDENTITY(1,1) NOT NULL,
	[Consecutivo] [int] NULL,
	[EsVirtual] [bit] NULL,
	[Estatus] [nvarchar](50) NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
	[TransportistaID] [int] NOT NULL,
	[PatioID] [int] NOT NULL,
	[ChoferID] [int] NOT NULL,
	[PaseSalidaEnviado] [bit] NULL,
	[FechaRecepcion] [datetime] NULL,
	[VehiculoID] [int] NOT NULL,
	[ClienteID] [int] NULL,
	[TipoAvisoID] [int] NULL,
 CONSTRAINT [PK_FolioAvisoLlegada] PRIMARY KEY CLUSTERED 
(
	[FolioAvisoLlegadaID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_FolioCuantificacion]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Sam3_FolioCuantificacion](
	[FolioCuantificacionID] [int] IDENTITY(1,1) NOT NULL,
	[FolioAvisoEntradaID] [int] NOT NULL,
	[ProyectoID] [int] NOT NULL,
	[PackingList] [varchar](max) NULL,
	[TipoUsoID] [int] NOT NULL,
	[Estatus] [varchar](150) NULL,
	[FechaCreacion] [datetime] NULL,
	[FechaModificacion] [datetime] NULL,
	[UsuarioModificacion] [int] NULL,
	[Activo] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[FolioCuantificacionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Sam3_Incidencia]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Sam3_Incidencia](
	[IncidenciaID] [int] IDENTITY(1,1) NOT NULL,
	[IncidenciaOriginalID] [int] NULL,
	[Titulo] [nvarchar](100) NOT NULL,
	[Descripcion] [nvarchar](500) NOT NULL,
	[NoRFI] [int] NULL,
	[FechaCreacion] [datetime] NOT NULL,
	[UsuarioID] [int] NOT NULL,
	[Respuesta] [nvarchar](500) NULL,
	[FechaRespuesta] [datetime] NULL,
	[UsuarioIDRespuesta] [int] NULL,
	[Version] [int] NOT NULL,
	[Estatus] [varchar](50) NOT NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
 CONSTRAINT [PK_Incidencia] PRIMARY KEY CLUSTERED 
(
	[IncidenciaID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Sam3_ItemCode]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_ItemCode](
	[ItemCodeID] [int] IDENTITY(1,1) NOT NULL,
	[ProyectoID] [int] NOT NULL,
	[TipoMaterialID] [int] NOT NULL,
	[Codigo] [nvarchar](50) NOT NULL,
	[ItemCodeCliente] [nvarchar](50) NULL,
	[DescripcionEspanol] [nvarchar](max) NOT NULL,
	[DescripcionIngles] [nvarchar](max) NULL,
	[Peso] [decimal](7, 2) NULL,
	[DescripcionInterna] [nvarchar](max) NULL,
	[Diametro1] [decimal](7, 4) NULL,
	[Diametro2] [decimal](7, 4) NULL,
	[FamiliaAceroID] [int] NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
	[Cantidad] [int] NULL,
	[MM] [int] NULL,
	[ColadaID] [int] NOT NULL,
 CONSTRAINT [PK_ItemCode] PRIMARY KEY CLUSTERED 
(
	[ItemCodeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_ItemCodeSteelgo]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Sam3_ItemCodeSteelgo](
	[ItemCodeSteelgoID] [int] IDENTITY(1,1) NOT NULL,
	[DescripcionEspanol] [nvarchar](max) NOT NULL,
	[DescripcionIngles] [nvarchar](max) NULL,
	[Peso] [decimal](7, 2) NOT NULL,
	[Diametro1] [decimal](7, 4) NOT NULL,
	[Diametro2] [decimal](7, 4) NOT NULL,
	[FamiliaAceroID] [int] NOT NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
	[Area] [int] NOT NULL,
	[Cedula] [varchar](max) NOT NULL,
	[Codigo] [varchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ItemCodeSteelgoID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Sam3_Maquina]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_Maquina](
	[MaquinaID] [int] IDENTITY(1,1) NOT NULL,
	[PatioID] [int] NOT NULL,
	[Nombre] [nvarchar](150) NOT NULL,
	[MermaTeorica] [int] NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
 CONSTRAINT [PK_Maquina] PRIMARY KEY CLUSTERED 
(
	[MaquinaID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_MaterialSpool]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_MaterialSpool](
	[MaterialSpoolID] [int] IDENTITY(1,1) NOT NULL,
	[SpoolID] [int] NOT NULL,
	[ItemCodeID] [int] NOT NULL,
	[Diametro1] [decimal](7, 4) NOT NULL,
	[Diametro2] [decimal](7, 4) NOT NULL,
	[Etiqueta] [nvarchar](10) NOT NULL,
	[Cantidad] [int] NOT NULL,
	[Peso] [decimal](7, 2) NULL,
	[Area] [decimal](7, 2) NULL,
	[Especificacion] [nvarchar](10) NULL,
	[Grupo] [nvarchar](150) NULL,
	[DescripcionMaterial] [nvarchar](max) NULL,
	[Campo1] [nvarchar](100) NULL,
	[Campo2] [nvarchar](100) NULL,
	[Campo3] [nvarchar](100) NULL,
	[Campo4] [nvarchar](100) NULL,
	[Campo5] [nvarchar](100) NULL,
	[Reserva] [nvarchar](200) NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
 CONSTRAINT [PK_MaterialSpool] PRIMARY KEY CLUSTERED 
(
	[MaterialSpoolID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_MenuContextual]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Sam3_MenuContextual](
	[MenuID] [int] IDENTITY(1,1) NOT NULL,
	[Texto] [nvarchar](100) NOT NULL,
	[Liga] [nvarchar](100) NOT NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
	[Descripcion] [varchar](max) NULL,
 CONSTRAINT [PK_MenuContextual] PRIMARY KEY CLUSTERED 
(
	[MenuID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Sam3_MenuGeneral]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Sam3_MenuGeneral](
	[MenuID] [int] IDENTITY(1,1) NOT NULL,
	[Texto] [nvarchar](500) NOT NULL,
	[Liga] [nvarchar](1000) NOT NULL,
	[IDPadre] [int] NOT NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
	[Icono] [varchar](max) NULL,
	[Nivel] [int] NULL,
	[Descripcion] [varchar](max) NULL,
 CONSTRAINT [PK_MenuGeneral] PRIMARY KEY CLUSTERED 
(
	[MenuID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Sam3_Notificacion]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_Notificacion](
	[NotificacionID] [int] IDENTITY(1,1) NOT NULL,
	[UsuarioIDReceptor] [int] NOT NULL,
	[UsuarioIDEmisor] [int] NULL,
	[TipoNotificacionID] [int] NULL,
	[Mensaje] [nvarchar](500) NULL,
	[FechaEnvio] [datetime] NOT NULL,
	[FechaRecepcion] [datetime] NULL,
	[EstatusLectura] [bit] NULL,
	[Activo] [bit] NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
 CONSTRAINT [PK_Notificacion] PRIMARY KEY CLUSTERED 
(
	[NotificacionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_NumeroUnico]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Sam3_NumeroUnico](
	[NumeroUnicoID] [int] IDENTITY(1,1) NOT NULL,
	[ProyectoID] [int] NOT NULL,
	[ItemCodeID] [int] NULL,
	[ColadaID] [int] NULL,
	[ProveedorID] [int] NULL,
	[FabricanteID] [int] NULL,
	[TipoCorte1ID] [int] NULL,
	[TipoCorte2ID] [int] NULL,
	[Estatus] [nchar](1) NULL,
	[Factura] [nvarchar](25) NULL,
	[PartidaFactura] [nvarchar](10) NULL,
	[OrdenDeCompra] [nvarchar](20) NULL,
	[PartidaOrdenDeCompra] [nvarchar](10) NULL,
	[Diametro1] [decimal](7, 4) NOT NULL,
	[Diametro2] [decimal](7, 4) NOT NULL,
	[Cedula] [nvarchar](10) NULL,
	[NumeroUnicoCliente] [nvarchar](50) NULL,
	[MarcadoAsme] [bit] NOT NULL,
	[MarcadoGolpe] [bit] NOT NULL,
	[MarcadoPintura] [bit] NOT NULL,
	[PruebasHidrostaticas] [nvarchar](100) NULL,
	[TieneDano] [bit] NOT NULL,
	[Rack] [varchar](50) NULL,
	[Observaciones] [varchar](200) NULL,
	[CampoLibreRecepcion1] [nvarchar](100) NULL,
	[CampoLibreRecepcion2] [nvarchar](100) NULL,
	[CampoLibreRecepcion3] [nvarchar](100) NULL,
	[CampoLibreRecepcion4] [nvarchar](100) NULL,
	[CampoLibreRecepcion5] [nvarchar](100) NULL,
	[CampoLibre1] [nvarchar](100) NULL,
	[CampoLibre2] [nvarchar](100) NULL,
	[CampoLibre3] [nvarchar](100) NULL,
	[CampoLibre4] [nvarchar](100) NULL,
	[CampoLibre5] [nvarchar](100) NULL,
	[EsVirtual] [bit] NOT NULL,
	[RecepcionID] [int] NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
	[Prefijo] [varchar](20) NOT NULL,
	[Consecutivo] [int] NOT NULL,
 CONSTRAINT [PK_NumeroUnico] PRIMARY KEY CLUSTERED 
(
	[NumeroUnicoID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Sam3_NumeroUnicoCorte]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_NumeroUnicoCorte](
	[NumeroUnicoCorteID] [int] IDENTITY(1,1) NOT NULL,
	[NumeroUnicoID] [int] NOT NULL,
	[ProyectoID] [int] NOT NULL,
	[SalidaMovimientoID] [int] NOT NULL,
	[OrdenTrabajoID] [int] NOT NULL,
	[UbicacionFisicaID] [int] NULL,
	[Segmento] [nchar](1) NOT NULL,
	[Longitud] [int] NOT NULL,
	[FechaTraspaso] [datetime] NOT NULL,
	[TieneCorte] [bit] NOT NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
 CONSTRAINT [PK_NumeroUnicoCorte] PRIMARY KEY CLUSTERED 
(
	[NumeroUnicoCorteID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_NumeroUnicoInventario]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_NumeroUnicoInventario](
	[NumeroUnicoID] [int] NOT NULL,
	[ProyectoID] [int] NOT NULL,
	[CantidadRecibida] [int] NOT NULL,
	[CantidadDanada] [int] NOT NULL,
	[InventarioFisico] [int] NOT NULL,
	[InventarioBuenEstado] [int] NOT NULL,
	[InventarioCongelado] [int] NOT NULL,
	[InventarioTransferenciaCorte] [int] NOT NULL,
	[InventarioDisponibleCruce] [int] NOT NULL,
	[EsVirtual] [bit] NOT NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[NumeroUnicoID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_NumeroUnicoMovimiento]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_NumeroUnicoMovimiento](
	[NumeroUnicoMovimientoID] [int] IDENTITY(1,1) NOT NULL,
	[NumeroUnicoID] [int] NOT NULL,
	[ProyectoID] [int] NOT NULL,
	[TipoMovimientoID] [int] NOT NULL,
	[Cantidad] [int] NOT NULL,
	[Segmento] [nchar](1) NULL,
	[FechaMovimiento] [datetime] NOT NULL,
	[Referencia] [nvarchar](150) NULL,
	[Estatus] [nchar](1) NOT NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[NumeroUnicoMovimientoID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_NumeroUnicoSegmento]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Sam3_NumeroUnicoSegmento](
	[NumeroUnicoSegmentoID] [int] IDENTITY(1,1) NOT NULL,
	[NumeroUnicoID] [int] NOT NULL,
	[ProyectoID] [int] NOT NULL,
	[Segmento] [nchar](1) NOT NULL,
	[CantidadDanada] [int] NOT NULL,
	[InventarioFisico] [int] NOT NULL,
	[InventarioBuenEstado] [int] NOT NULL,
	[InventarioCongelado] [int] NOT NULL,
	[InventarioTransferenciaCorte] [int] NOT NULL,
	[InventarioDisponibleCruce] [int] NOT NULL,
	[Rack] [varchar](50) NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[NumeroUnicoSegmentoID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Sam3_OrdenAlmacenaje]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_OrdenAlmacenaje](
	[OrdenAlmacenajeID] [int] IDENTITY(1,1) NOT NULL,
	[Folio] [int] NOT NULL,
	[FechaCreacion] [datetime] NOT NULL,
	[Activo] [bit] NOT NULL,
	[FechaModificacion] [datetime] NULL,
	[UsuarioModificacion] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[OrdenAlmacenajeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_OrdenRecepcion]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_OrdenRecepcion](
	[OrdenRecepcionID] [int] IDENTITY(1,1) NOT NULL,
	[Folio] [int] NOT NULL,
	[Activo] [bit] NOT NULL,
	[FechaCreacion] [datetime] NOT NULL,
	[FechaModificacion] [datetime] NULL,
	[UsuarioModificacion] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[OrdenRecepcionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_OrdenTrabajo]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_OrdenTrabajo](
	[OrdenTrabajoID] [int] IDENTITY(1,1) NOT NULL,
	[EstatusOrdenID] [int] NOT NULL,
	[ProyectoID] [int] NOT NULL,
	[TallerID] [int] NOT NULL,
	[NumeroOrden] [nvarchar](50) NULL,
	[FechaOrden] [datetime] NOT NULL,
	[EsAsignado] [bit] NOT NULL,
	[VersionOrden] [int] NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
 CONSTRAINT [PK_OrdenTrabajo] PRIMARY KEY CLUSTERED 
(
	[OrdenTrabajoID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_OrdenTrabajoSpool]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_OrdenTrabajoSpool](
	[OrdenTrabajoSpoolID] [int] IDENTITY(1,1) NOT NULL,
	[OrdenTrabajoID] [int] NOT NULL,
	[SpoolID] [int] NOT NULL,
	[Partida] [int] NOT NULL,
	[NumeroControl] [nvarchar](50) NULL,
	[EsAsignado] [bit] NOT NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
 CONSTRAINT [PK_OrdenTrabajoSpool] PRIMARY KEY CLUSTERED 
(
	[OrdenTrabajoSpoolID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_Pagina]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_Pagina](
	[PaginaID] [int] IDENTITY(1,1) NOT NULL,
	[Accion] [nvarchar](100) NULL,
	[Controlador] [nvarchar](100) NULL,
	[Activo] [bit] NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
 CONSTRAINT [PK_Pagina] PRIMARY KEY CLUSTERED 
(
	[PaginaID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_Patio]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_Patio](
	[PatioID] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [nvarchar](150) NOT NULL,
	[Propietario] [nvarchar](500) NULL,
	[Descripcion] [nvarchar](500) NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
	[RequierePermisoAduana] [bit] NOT NULL,
 CONSTRAINT [PK_Patio] PRIMARY KEY CLUSTERED 
(
	[PatioID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_Perfil]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_Perfil](
	[PerfilID] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [nvarchar](100) NOT NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
 CONSTRAINT [PK_Perfil] PRIMARY KEY CLUSTERED 
(
	[PerfilID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_PermisoAduana]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_PermisoAduana](
	[PermisoAduanaID] [int] IDENTITY(1,1) NOT NULL,
	[FolioAvisoLlegadaID] [int] NOT NULL,
	[Estatus] [nvarchar](50) NOT NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
	[PermisoAutorizado] [bit] NOT NULL,
	[PermisoTramite] [bit] NOT NULL,
	[NumeroPermiso] [int] NULL,
	[FechaGeneracion] [datetime] NULL,
	[FechaAutorización] [datetime] NULL,
 CONSTRAINT [PK_PermisoAduana] PRIMARY KEY CLUSTERED 
(
	[PermisoAduanaID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_PinturaNumeroUnico]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_PinturaNumeroUnico](
	[PinturaNumeroUnicoID] [int] IDENTITY(1,1) NOT NULL,
	[ProyectoID] [int] NOT NULL,
	[NumeroUnicoID] [int] NOT NULL,
	[RequisicionNumeroUnicoDetalleID] [int] NOT NULL,
	[FechaPrimarios] [datetime] NULL,
	[ReportePrimarios] [nvarchar](50) NULL,
	[FechaIntermedio] [datetime] NULL,
	[ReporteIntermedio] [nvarchar](50) NULL,
	[Liberado] [bit] NOT NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[PinturaNumeroUnicoID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_Preferencia]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_Preferencia](
	[PreferenciaId] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [nvarchar](50) NOT NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
 CONSTRAINT [PK_Preferencia] PRIMARY KEY CLUSTERED 
(
	[PreferenciaId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_Propiedad]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_Propiedad](
	[PropiedadID] [int] IDENTITY(1,1) NOT NULL,
	[EntidadID] [int] NULL,
	[Nombre] [nvarchar](100) NULL,
	[Activo] [bit] NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
 CONSTRAINT [PK_Propiedad] PRIMARY KEY CLUSTERED 
(
	[PropiedadID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_Proveedor]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_Proveedor](
	[ProveedorID] [int] IDENTITY(1,1) NOT NULL,
	[ContactoID] [int] NOT NULL,
	[Nombre] [nvarchar](50) NOT NULL,
	[Descripcion] [nvarchar](50) NULL,
	[Direccion] [nvarchar](max) NULL,
	[Telefono] [nvarchar](50) NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
 CONSTRAINT [PK_Proveedor] PRIMARY KEY CLUSTERED 
(
	[ProveedorID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_Proyecto]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_Proyecto](
	[ProyectoID] [int] IDENTITY(1,1) NOT NULL,
	[PatioID] [int] NOT NULL,
	[ClienteID] [int] NOT NULL,
	[ContactoID] [int] NOT NULL,
	[ColorID] [int] NOT NULL,
	[Nombre] [nvarchar](100) NOT NULL,
	[Descripcion] [nvarchar](500) NULL,
	[FechaInicio] [datetime] NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
 CONSTRAINT [PK_Proyecto] PRIMARY KEY CLUSTERED 
(
	[ProyectoID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_ProyectoConfiguracion]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_ProyectoConfiguracion](
	[ProyectoID] [int] NOT NULL,
	[PrefijoNumeroUnico] [nvarchar](10) NOT NULL,
	[PrefijoOrdenTrabajo] [nvarchar](10) NOT NULL,
	[DigitosNumeroUnico] [tinyint] NOT NULL,
	[DigitosOrdenTrabajo] [tinyint] NOT NULL,
	[ToleranciaCortes] [int] NULL,
	[AnguloBisel] [nvarchar](20) NULL,
	[CuadroTubero] [money] NOT NULL,
	[CuadroRaiz] [money] NOT NULL,
	[CuadroRelleno] [money] NOT NULL,
	[UsuarioModifica] [uniqueidentifier] NULL,
	[FechaModificacion] [datetime] NULL,
	[VersionRegistro] [timestamp] NOT NULL,
	[ActualizaLocalizacion] [bit] NOT NULL,
	[CorreoPeqKgEsp] [nvarchar](max) NULL,
	[DigitosFolioPreparacion] [int] NULL,
	[ManejaReserva] [bit] NULL,
	[UsuarioModificacion] [int] NULL,
	[Activo] [bit] NOT NULL,
	[DigitosOrdeAlmacenaje] [int] NOT NULL,
	[DigitosFolioDescarga] [int] NOT NULL,
	[DigitosFolioAvisollegada] [int] NOT NULL,
	[GigitosFolioPaseSalida] [int] NOT NULL,
	[DigitosFolioOrdenRecepcion] [int] NOT NULL,
	[DigitosFolioCuantifiacion] [int] NOT NULL,
	[DigitosFolioOrdenAlmacenaje] [int] NOT NULL,
	[DigitosFolioPermisoAduana] [int] NOT NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_ProyectoConsecutivo]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_ProyectoConsecutivo](
	[ProyectoID] [int] NOT NULL,
	[ConsecutivoFolioAvisollegada] [int] NOT NULL,
	[ConsecutivoFolioEntradaMateiral] [int] NOT NULL,
	[ConsecutivoFolioDescargaMaterial] [int] NOT NULL,
	[ConsecutivoPaseSalida] [int] NOT NULL,
	[ConsecutivoPermisoAduana] [int] NOT NULL,
	[ConsucutivoFolioPackingList] [int] NOT NULL,
	[ConsecutivoODT] [int] NOT NULL,
	[ConsecutivoNumerounico] [int] NOT NULL,
	[Activo] [bit] NOT NULL,
	[FechaModificacion] [datetime] NULL,
	[UsuarioModificacion] [int] NULL,
	[ConsecutivoOrdeRecepcion] [int] NOT NULL,
	[ConsecutivoOrdenAlmacenaje] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ProyectoID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_Recepcion]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_Recepcion](
	[RecepcionID] [int] IDENTITY(1,1) NOT NULL,
	[ItemCodeID] [int] NOT NULL,
	[FamiliaItemCodeID] [int] NULL,
	[CedulaID] [int] NULL,
	[TipoAceroID] [int] NULL,
	[Diametro1] [decimal](7, 4) NULL,
	[Diametro2] [decimal](7, 4) NULL,
	[Cantidad] [int] NULL,
	[TieneNumerosUnicos] [bit] NULL,
	[FechaGeneracionNumerosUnicos] [datetime] NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
	[FolioCuantificacionID] [int] NOT NULL,
 CONSTRAINT [PK_Recepcion] PRIMARY KEY CLUSTERED 
(
	[RecepcionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_Rel_Bulto_ItemCode]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_Rel_Bulto_ItemCode](
	[Rel_Bulto_ItemCode_ID] [int] IDENTITY(1,1) NOT NULL,
	[BultoID] [int] NOT NULL,
	[ItemCodeID] [int] NOT NULL,
	[TieneNumerosUnicos] [bit] NOT NULL,
	[FechaModificacion] [datetime] NULL,
	[UsuarioModificacion] [int] NULL,
	[Activo] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Rel_Bulto_ItemCode_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_Rel_Documento_Entidad]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_Rel_Documento_Entidad](
	[TipoDocumentoID] [int] IDENTITY(1,1) NOT NULL,
	[EntidadID] [int] NULL,
	[RepositorioID] [int] NULL,
	[UsuarioID] [int] NULL,
	[Identificador] [nvarchar](50) NULL,
	[FechaSubida] [datetime] NULL,
	[Activo] [bit] NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
 CONSTRAINT [PK__Rel_Documento_Entidad] PRIMARY KEY CLUSTERED 
(
	[TipoDocumentoID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_Rel_FolioAvisoEntrada_Documento]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Sam3_Rel_FolioAvisoEntrada_Documento](
	[Rel_FolioAvisoEntrada_DocumentoID] [int] IDENTITY(1,1) NOT NULL,
	[FolioAvisoEntradaID] [int] NOT NULL,
	[DocumentoID] [int] NOT NULL,
	[Nombre] [varchar](200) NOT NULL,
	[Extencion] [varchar](5) NOT NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
	[DocGuid] [uniqueidentifier] NULL,
	[Url] [varchar](max) NULL,
	[TipoArchivoID] [int] NOT NULL,
	[ContentType] [varchar](50) NULL,
	[Descripcion] [varchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[Rel_FolioAvisoEntrada_DocumentoID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Sam3_Rel_FolioAvisoEntrada_OrdenRecepcion]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_Rel_FolioAvisoEntrada_OrdenRecepcion](
	[Rel_FolioAvisoEntrada_OrdeRecepcion_ID] [int] IDENTITY(1,1) NOT NULL,
	[FolioAvisoEntradaID] [int] NOT NULL,
	[OrdenRecepcionID] [int] NOT NULL,
	[Activo] [bit] NOT NULL,
	[FechaModificacion] [datetime] NULL,
	[UsuarioModificacion] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Rel_FolioAvisoEntrada_OrdeRecepcion_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento](
	[Rel_FolioAvisoLlegada_DocumentoID] [int] IDENTITY(1,1) NOT NULL,
	[FolioAvisoLlegadaID] [int] NOT NULL,
	[DocumentoID] [int] NOT NULL,
	[Nombre] [varchar](200) NOT NULL,
	[Extencion] [varchar](5) NOT NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
	[DocGuid] [uniqueidentifier] NULL,
	[Url] [varchar](max) NULL,
	[TipoArchivoID] [int] NOT NULL,
	[ContentType] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[Rel_FolioAvisoLlegada_DocumentoID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Sam3_Rel_FolioAvisoLlegada_PaseSalida_Archivo]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Sam3_Rel_FolioAvisoLlegada_PaseSalida_Archivo](
	[Rel_Folio_PaseSalida_Archivo_ID] [int] IDENTITY(1,1) NOT NULL,
	[FolioAvisoLlegadaID] [int] NOT NULL,
	[DocumentoID] [int] NOT NULL,
	[Nombre] [varchar](200) NOT NULL,
	[Extencion] [varchar](10) NOT NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
	[DocGuid] [uniqueidentifier] NULL,
	[Url] [varchar](max) NULL,
	[ContentType] [varchar](50) NULL,
	[TipoArchivoID] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Rel_Folio_PaseSalida_Archivo_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto](
	[Rel_FolioAviso_ProyectoID] [int] IDENTITY(1,1) NOT NULL,
	[FolioAvisoLlegadaID] [int] NOT NULL,
	[ProyectoID] [int] NOT NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[Rel_FolioAviso_ProyectoID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo](
	[Rel_FolioAvisoLlegada_Vehiculo_ID] [int] IDENTITY(1,1) NOT NULL,
	[FolioAvisoLlegadaID] [int] NOT NULL,
	[VehiculoID] [int] NOT NULL,
	[Activo] [bit] NOT NULL,
	[FechaModificacion] [datetime] NULL,
	[UsuarioModificacion] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Rel_FolioAvisoLlegada_Vehiculo_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_Rel_FolioCuantificacion_ItemCode]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_Rel_FolioCuantificacion_ItemCode](
	[Rel_FolioCuantificacion_ItemCode_ID] [int] IDENTITY(1,1) NOT NULL,
	[FolioCuantificacionID] [int] NOT NULL,
	[ItemCodeID] [int] NOT NULL,
	[TieneNumerosUnicos] [bit] NOT NULL,
	[FechaModificacion] [datetime] NULL,
	[UsuarioModificacion] [int] NULL,
	[Activo] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Rel_FolioCuantificacion_ItemCode_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_Rel_Incidencia_Entidad]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_Rel_Incidencia_Entidad](
	[IncidenciaID] [int] NOT NULL,
	[EntidadID] [int] NOT NULL,
	[PermitidoLevantarIncidencias] [bit] NOT NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
 CONSTRAINT [PK_Rel_Incidencia_Entidad] PRIMARY KEY CLUSTERED 
(
	[IncidenciaID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_Rel_Incidencia_NumeroUnico]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_Rel_Incidencia_NumeroUnico](
	[Rel_Incidencia_NumeroUnico_ID] [int] IDENTITY(1,1) NOT NULL,
	[IncidenciaID] [int] NOT NULL,
	[NumeroUnicoID] [int] NOT NULL,
	[Activo] [bit] NOT NULL,
	[FechaModificacion] [datetime] NULL,
	[UsuarioModificacion] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Rel_Incidencia_NumeroUnico_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_Rel_ItemCode_ItemCodeSteelgo]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_Rel_ItemCode_ItemCodeSteelgo](
	[Rel_ItemCode_ItemCodeSteelgo] [int] IDENTITY(1,1) NOT NULL,
	[ItemCodeID] [int] NOT NULL,
	[ItemCodeSteelgoID] [int] NOT NULL,
	[Activo] [bit] NOT NULL,
	[FechaModificacion] [datetime] NULL,
	[UsuarioModificacion] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Rel_ItemCode_ItemCodeSteelgo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_Rel_OrdenAlmacenaje_NumeroUnico]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_Rel_OrdenAlmacenaje_NumeroUnico](
	[Rel_OrdenAlmacenaje_NumeroUnico_ID] [int] IDENTITY(1,1) NOT NULL,
	[OrdenAlmacenajeID] [int] NOT NULL,
	[NumeroUnicoID] [int] NOT NULL,
	[FechaCreacion] [datetime] NOT NULL,
	[Activo] [bit] NOT NULL,
	[FechaModificacion] [datetime] NULL,
	[UsuarioModificacion] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Rel_OrdenAlmacenaje_NumeroUnico_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_Rel_OrdenRecepcion_ItemCode]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_Rel_OrdenRecepcion_ItemCode](
	[Rel_OrdenRecepcion_ItemCode_ID] [int] IDENTITY(1,1) NOT NULL,
	[OrdenRecepcionID] [int] NOT NULL,
	[ItemCodeID] [int] NOT NULL,
	[Activo] [bit] NOT NULL,
	[FechaModificacion] [datetime] NULL,
	[UsuarioModificacion] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Rel_OrdenRecepcion_ItemCode_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_Rel_Perfil_Entidad_Pagina]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_Rel_Perfil_Entidad_Pagina](
	[PerfilID] [int] NOT NULL,
	[EntidadID] [int] NOT NULL,
	[PaginaID] [int] NOT NULL,
	[PermisoDetalle] [bit] NOT NULL,
	[PermisoCreacion] [bit] NOT NULL,
	[PermisoEliminacion] [bit] NOT NULL,
	[PermisoListado] [bit] NOT NULL,
	[PermisoCapturaIncidencia] [bit] NOT NULL,
	[PermisoSolucionIncidencia] [bit] NOT NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_Rel_Perfil_MenuContextual]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_Rel_Perfil_MenuContextual](
	[Perfil_MenuID] [int] IDENTITY(1,1) NOT NULL,
	[PerfilID] [int] NOT NULL,
	[MenuContextualID] [int] NOT NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[Perfil_MenuID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_Rel_Perfil_MenuGeneral]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_Rel_Perfil_MenuGeneral](
	[Perfil_MenuID] [int] IDENTITY(1,1) NOT NULL,
	[PerfilID] [int] NOT NULL,
	[MenuGeneralID] [int] NOT NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[Perfil_MenuID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina](
	[PerfilID] [int] NOT NULL,
	[PropiedadID] [int] NOT NULL,
	[PaginaID] [int] NOT NULL,
	[PermisoEdicion] [bit] NOT NULL,
	[PermisoLectura] [bit] NOT NULL,
	[Requerido] [bit] NOT NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[PerfilID] ASC,
	[PropiedadID] ASC,
	[PaginaID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_Rel_PermisoAduana_Documento]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Sam3_Rel_PermisoAduana_Documento](
	[PermisoAduanaID] [int] NOT NULL,
	[DocumentoID] [int] NOT NULL,
	[Nombre] [varchar](200) NOT NULL,
	[Extencion] [varchar](5) NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
	[DocGuid] [uniqueidentifier] NULL,
	[Url] [varchar](max) NULL,
	[ContentType] [varchar](50) NULL,
	[TipoArchivoID] [int] NOT NULL,
	[Rel_Permiso_Documento_ID] [int] IDENTITY(1,1) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Rel_Permiso_Documento_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Sam3_Rel_TiposDocumentos_ExtencionesDocumentos]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_Rel_TiposDocumentos_ExtencionesDocumentos](
	[TipoDocumentoID] [int] NOT NULL,
	[ExtencionDocumentoID] [int] NOT NULL,
	[TamañoMaximoKB] [int] NULL,
	[NumeroMaximoKB] [int] NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[TipoDocumentoID] ASC,
	[ExtencionDocumentoID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_Rel_Usuario_Preferencia]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_Rel_Usuario_Preferencia](
	[UsuarioID] [int] IDENTITY(1,1) NOT NULL,
	[PreferenciaID] [int] NOT NULL,
	[ValorPreferencia] [nvarchar](100) NOT NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
 CONSTRAINT [PK_Rel_Usuario_Preferencia] PRIMARY KEY CLUSTERED 
(
	[UsuarioID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_Rel_Usuario_Proyecto]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_Rel_Usuario_Proyecto](
	[ProyectoID] [int] NOT NULL,
	[UsuarioID] [int] NOT NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[ProyectoID] ASC,
	[UsuarioID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_Rel_Vehiculo_Chofer]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_Rel_Vehiculo_Chofer](
	[Rel_Vehiculo_Chofer_ID] [int] IDENTITY(1,1) NOT NULL,
	[VehiculoID] [int] NOT NULL,
	[ChoferID] [int] NOT NULL,
	[Activo] [bit] NOT NULL,
	[FechaModificacion] [datetime] NULL,
	[UsuarioModificacion] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Rel_Vehiculo_Chofer_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_Rel_Vehiculo_Transportista]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_Rel_Vehiculo_Transportista](
	[Rel_Vehiculo_Transportista_ID] [int] IDENTITY(1,1) NOT NULL,
	[VehiculoID] [int] NOT NULL,
	[TransportistaID] [int] NOT NULL,
	[Activo] [bit] NOT NULL,
	[FechaModificacion] [datetime] NULL,
	[UsuarioModificacion] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Rel_Vehiculo_Transportista_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_Repositorio]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_Repositorio](
	[RepositorioId] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [nvarchar](100) NULL,
	[Activo] [bit] NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
 CONSTRAINT [PK_Repositorio] PRIMARY KEY CLUSTERED 
(
	[RepositorioId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_RequisicionNumeroUnico]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_RequisicionNumeroUnico](
	[RequisicionNumeroUnicoID] [int] IDENTITY(1,1) NOT NULL,
	[ProyectoID] [int] NOT NULL,
	[NumeroRequisicion] [nvarchar](50) NULL,
	[FechaRequisicion] [datetime] NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[RequisicionNumeroUnicoID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_RequisicionNumeroUnicoDetalle]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_RequisicionNumeroUnicoDetalle](
	[RequisicionNumeroUnicoDetalleID] [int] IDENTITY(1,1) NOT NULL,
	[RequisicionNumeroUnicoID] [int] NOT NULL,
	[NumeroUnicoID] [int] NOT NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[RequisicionNumeroUnicoDetalleID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_Sesion]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_Sesion](
	[SesionID] [int] IDENTITY(1,1) NOT NULL,
	[UsuarioID] [int] NOT NULL,
	[Token] [nvarchar](1000) NOT NULL,
	[FechaCreacion] [datetime] NOT NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
 CONSTRAINT [PK_Sesion] PRIMARY KEY CLUSTERED 
(
	[SesionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_Spool]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Sam3_Spool](
	[SpoolID] [int] IDENTITY(1,1) NOT NULL,
	[ProyectoID] [int] NOT NULL,
	[FamiliaAcero1ID] [int] NOT NULL,
	[FamiliaAcero2ID] [int] NULL,
	[Nombre] [nvarchar](50) NOT NULL,
	[Dibujo] [nvarchar](50) NOT NULL,
	[Especificacion] [nvarchar](15) NULL,
	[Cedula] [nvarchar](10) NULL,
	[Pdis] [decimal](10, 4) NULL,
	[DiametroPlano] [decimal](10, 4) NULL,
	[Peso] [decimal](7, 2) NULL,
	[Area] [decimal](7, 2) NULL,
	[PorcentajePnd] [int] NULL,
	[RequierePwht] [bit] NOT NULL,
	[PendienteDocumental] [bit] NOT NULL,
	[AprobadoParaCruce] [bit] NOT NULL,
	[Prioridad] [int] NULL,
	[Revision] [nvarchar](10) NULL,
	[RevisionCliente] [nvarchar](10) NULL,
	[Segmento1] [nvarchar](20) NULL,
	[Segmento2] [nvarchar](20) NULL,
	[Segmento3] [nvarchar](20) NULL,
	[Segmento4] [nvarchar](20) NULL,
	[Segmento5] [nvarchar](20) NULL,
	[Segmento6] [nvarchar](20) NULL,
	[Segmento7] [nvarchar](20) NULL,
	[SistemaPintura] [nvarchar](50) NULL,
	[ColorPintura] [nvarchar](50) NULL,
	[CodigoPintura] [nvarchar](50) NULL,
	[FechaEtiqueta] [datetime] NULL,
	[NumeroEtiqueta] [nvarchar](20) NULL,
	[Campo1] [nvarchar](100) NULL,
	[Campo2] [nvarchar](100) NULL,
	[Campo3] [nvarchar](100) NULL,
	[Campo4] [nvarchar](100) NULL,
	[Campo5] [nvarchar](100) NULL,
	[DiametroMayor] [decimal](10, 4) NULL,
	[CuadranteID] [int] NULL,
	[FechaImportacion] [datetime] NULL,
	[RequierePruebaHidrostatica] [varchar](10) NULL,
	[FechaLocalizacion] [datetime] NULL,
	[UltimoProceso] [nvarchar](500) NULL,
	[AreaGrupo] [nvarchar](500) NULL,
	[KgsGrupo] [nvarchar](500) NULL,
	[DiamGrupo] [nvarchar](500) NULL,
	[PeqGrupo] [nvarchar](500) NULL,
	[SistemaPinturaFinal] [nvarchar](500) NULL,
	[Paint] [nvarchar](500) NULL,
	[DiametroPromedio] [nvarchar](500) NULL,
	[PaintLine] [nvarchar](500) NULL,
	[AreaEq] [nvarchar](500) NULL,
	[Inox] [nvarchar](500) NULL,
	[ClasifInox] [nvarchar](500) NULL,
	[FechaHomologacion] [datetime] NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
 CONSTRAINT [PK_Spool] PRIMARY KEY CLUSTERED 
(
	[SpoolID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Sam3_Taller]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_Taller](
	[TallerID] [int] IDENTITY(1,1) NOT NULL,
	[PatioID] [int] NOT NULL,
	[Nombre] [nvarchar](150) NOT NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
 CONSTRAINT [PK_Taller] PRIMARY KEY CLUSTERED 
(
	[TallerID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_TipoArchivo]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Sam3_TipoArchivo](
	[TipoArchivoID] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](100) NOT NULL,
	[Activo] [bit] NOT NULL,
	[FechaModificacion] [datetime] NULL,
	[UsuarioModificacion] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[TipoArchivoID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Sam3_TipoAviso]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Sam3_TipoAviso](
	[TipoAvisoID] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](max) NOT NULL,
	[Activo] [bit] NOT NULL,
	[FechaModificacion] [datetime] NULL,
	[UsuarioModificacion] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[TipoAvisoID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Sam3_TipoCorte]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_TipoCorte](
	[TipoCorteID] [int] IDENTITY(1,1) NOT NULL,
	[Codigo] [nvarchar](10) NOT NULL,
	[Nombre] [nvarchar](50) NULL,
	[Descripcion] [nvarchar](500) NULL,
	[VerificadoPorCalidad] [bit] NOT NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
 CONSTRAINT [PK_TipoCorte] PRIMARY KEY CLUSTERED 
(
	[TipoCorteID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_TipoDocumento]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_TipoDocumento](
	[TipoDocumentoID] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [nvarchar](150) NOT NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
 CONSTRAINT [PK_TipoDocumento] PRIMARY KEY CLUSTERED 
(
	[TipoDocumentoID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_TipoMaterial]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_TipoMaterial](
	[TipoMaterialID] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [nvarchar](50) NOT NULL,
	[NombreIngles] [nvarchar](50) NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
 CONSTRAINT [PK_ClasificacionMaterial] PRIMARY KEY CLUSTERED 
(
	[TipoMaterialID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_TipoMovimiento]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_TipoMovimiento](
	[TipoMovimientoID] [int] IDENTITY(1,1) NOT NULL,
	[EsEntrada] [bit] NOT NULL,
	[EsTransferenciaProcesos] [bit] NOT NULL,
	[ApareceEnSaldos] [bit] NOT NULL,
	[DisponibleMovimientosUI] [bit] NOT NULL,
	[Nombre] [nvarchar](50) NOT NULL,
	[NombreIngles] [nvarchar](50) NULL,
	[Descripcion] [nvarchar](500) NULL,
	[Activo] [int] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
 CONSTRAINT [PK_TipoMovimiento] PRIMARY KEY CLUSTERED 
(
	[TipoMovimientoID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_TipoNotificacion]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_TipoNotificacion](
	[TipoNotificacionID] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [nvarchar](50) NOT NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
 CONSTRAINT [PK_TipoNotificacion] PRIMARY KEY CLUSTERED 
(
	[TipoNotificacionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_TipoUso]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Sam3_TipoUso](
	[TipoUsoID] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](max) NOT NULL,
	[Activo] [bit] NOT NULL,
	[FechaModificacion] [datetime] NULL,
	[UsuarioModificacion] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[TipoUsoID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Sam3_TipoVehiculo]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Sam3_TipoVehiculo](
	[TipoVehiculoID] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](100) NOT NULL,
	[Activo] [bit] NOT NULL,
	[FechaModificacion] [datetime] NULL,
	[UsuarioModificacion] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[TipoVehiculoID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Sam3_Transportista]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_Transportista](
	[TransportistaID] [int] IDENTITY(1,1) NOT NULL,
	[ContactoID] [int] NOT NULL,
	[Nombre] [nvarchar](50) NOT NULL,
	[Descripcion] [nvarchar](50) NULL,
	[Direccion] [nvarchar](max) NULL,
	[Telefono] [nvarchar](50) NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
 CONSTRAINT [PK_Transportista] PRIMARY KEY CLUSTERED 
(
	[TransportistaID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_UbicacionFisica]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_UbicacionFisica](
	[UbicacionFisicaID] [int] IDENTITY(1,1) NOT NULL,
	[PatioID] [int] NOT NULL,
	[Nombre] [nvarchar](200) NOT NULL,
	[EsAreaCorte] [bit] NOT NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
 CONSTRAINT [PK_UbicacionFisica] PRIMARY KEY CLUSTERED 
(
	[UbicacionFisicaID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_Usuario]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sam3_Usuario](
	[UsuarioID] [int] IDENTITY(1,1) NOT NULL,
	[PerfilID] [int] NOT NULL,
	[NombreUsuario] [nvarchar](50) NOT NULL,
	[ContrasenaHash] [nvarchar](128) NOT NULL,
	[Nombre] [nvarchar](50) NOT NULL,
	[ApellidoPaterno] [nvarchar](50) NOT NULL,
	[ApellidoMaterno] [nvarchar](50) NULL,
	[BloqueadoPorAdministracion] [bit] NOT NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
 CONSTRAINT [PK_Usuario] PRIMARY KEY CLUSTERED 
(
	[UsuarioID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sam3_UsuariosNotificaciones]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Sam3_UsuariosNotificaciones](
	[UsuariosNotificacionesID] [int] IDENTITY(1,1) NOT NULL,
	[TipoNotificacionID] [int] NULL,
	[UsuarioID] [int] NULL,
	[Email] [varchar](250) NULL,
	[Plantilla] [varchar](250) NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[UsuariosNotificacionesID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Sam3_Vehiculo]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Sam3_Vehiculo](
	[VehiculoID] [int] IDENTITY(1,1) NOT NULL,
	[TipoVehiculoID] [int] NOT NULL,
	[Placas] [varchar](20) NULL,
	[TarjetaCirculacion] [varchar](150) NULL,
	[PolizaSeguro] [varchar](150) NULL,
	[Unidad] [varchar](max) NULL,
	[Modelo] [varchar](max) NULL,
	[TractoID] [int] NULL,
	[Activo] [bit] NOT NULL,
	[FechaModificacion] [datetime] NULL,
	[UsuarioModificacion] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[VehiculoID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  UserDefinedFunction [dbo].[Sam3_SplitInts]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[Sam3_SplitInts]
(
   @List      VARCHAR(MAX),
   @Delimiter VARCHAR(255)
)
RETURNS TABLE
AS
  RETURN ( SELECT Item = CONVERT(INT, Item) FROM
      ( SELECT Item = x.i.value('(./text())[1]', 'varchar(max)')
        FROM ( SELECT [XML] = CONVERT(XML, '<i>'
        + REPLACE(@List, @Delimiter, '</i><i>') + '</i>').query('.')
          ) AS a CROSS APPLY [XML].nodes('i') AS x(i) ) AS y
      WHERE Item IS NOT NULL
  );

GO
/****** Object:  UserDefinedFunction [dbo].[SplitInts]    Script Date: 9/9/2015 3:53:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[SplitInts]
(
   @List      VARCHAR(MAX),
   @Delimiter VARCHAR(255)
)
RETURNS TABLE
AS
  RETURN ( SELECT Item = CONVERT(INT, Item) FROM
      ( SELECT Item = x.i.value('(./text())[1]', 'varchar(max)')
        FROM ( SELECT [XML] = CONVERT(XML, '<i>'
        + REPLACE(@List, @Delimiter, '</i><i>') + '</i>').query('.')
          ) AS a CROSS APPLY [XML].nodes('i') AS x(i) ) AS y
      WHERE Item IS NOT NULL
  );

GO
SET IDENTITY_INSERT [dbo].[Sam3_Acero] ON 

INSERT [dbo].[Sam3_Acero] ([AceroID], [FamiliaAceroID], [Nomenclatura], [VerificadoPorCalidad], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 1, N'Default', 1, 1, 1, CAST(0x0000A4FF00C8C365 AS DateTime))
SET IDENTITY_INSERT [dbo].[Sam3_Acero] OFF
SET IDENTITY_INSERT [dbo].[Sam3_Bulto] ON 

INSERT [dbo].[Sam3_Bulto] ([BultoID], [FolioCuantificacionID], [Estatus], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (2010, 84, N'', CAST(0x0000A50D014D423B AS DateTime), 1, 1)
INSERT [dbo].[Sam3_Bulto] ([BultoID], [FolioCuantificacionID], [Estatus], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (2011, 90, N'En Proceso de Recepción', CAST(0x0000A50D015E43BA AS DateTime), 1, 1)
INSERT [dbo].[Sam3_Bulto] ([BultoID], [FolioCuantificacionID], [Estatus], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (2012, 92, N'En Proceso de Recepción', CAST(0x0000A50D01608E6B AS DateTime), 1, 1)
INSERT [dbo].[Sam3_Bulto] ([BultoID], [FolioCuantificacionID], [Estatus], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (2013, 93, N'', CAST(0x0000A50E00270B65 AS DateTime), 1, 1)
INSERT [dbo].[Sam3_Bulto] ([BultoID], [FolioCuantificacionID], [Estatus], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (2016, 106, N'', CAST(0x0000A50E000CF687 AS DateTime), 1, 1)
INSERT [dbo].[Sam3_Bulto] ([BultoID], [FolioCuantificacionID], [Estatus], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (2017, 107, N'', CAST(0x0000A50E0032FDF2 AS DateTime), 1, 1)
INSERT [dbo].[Sam3_Bulto] ([BultoID], [FolioCuantificacionID], [Estatus], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (2018, 107, N'En Proceso de Recepción', CAST(0x0000A50E00247D1D AS DateTime), 1, 1)
INSERT [dbo].[Sam3_Bulto] ([BultoID], [FolioCuantificacionID], [Estatus], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (2019, 93, N'En Proceso de Recepción', CAST(0x0000A50E0027116F AS DateTime), 1, 1)
INSERT [dbo].[Sam3_Bulto] ([BultoID], [FolioCuantificacionID], [Estatus], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (2020, 107, N'En Proceso de Recepción', CAST(0x0000A50E003307E2 AS DateTime), 1, 1)
INSERT [dbo].[Sam3_Bulto] ([BultoID], [FolioCuantificacionID], [Estatus], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (2021, 107, N'En Proceso de Recepción', CAST(0x0000A50E003307E2 AS DateTime), 1, 1)
INSERT [dbo].[Sam3_Bulto] ([BultoID], [FolioCuantificacionID], [Estatus], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (2022, 113, N'En Proceso de Recepción', CAST(0x0000A50E00B00E45 AS DateTime), 1, 1)
INSERT [dbo].[Sam3_Bulto] ([BultoID], [FolioCuantificacionID], [Estatus], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (2023, 116, N'En Proceso de Recepción', CAST(0x0000A50E00BE2B25 AS DateTime), 1, 1)
SET IDENTITY_INSERT [dbo].[Sam3_Bulto] OFF
SET IDENTITY_INSERT [dbo].[Sam3_Chofer] ON 

INSERT [dbo].[Sam3_Chofer] ([ChoferID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID]) VALUES (1, N'Chofer Default', 1, 1, CAST(0x0000A4B2009FEC2E AS DateTime), 1)
INSERT [dbo].[Sam3_Chofer] ([ChoferID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID]) VALUES (2, N'Chofer Pruebas', 1, 1, CAST(0x0000A4B300E83941 AS DateTime), 1)
INSERT [dbo].[Sam3_Chofer] ([ChoferID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID]) VALUES (3, N'chofer 1', 1, 1, CAST(0x0000A4BA00EC8577 AS DateTime), 1)
INSERT [dbo].[Sam3_Chofer] ([ChoferID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID]) VALUES (1003, N'Chofer FME', 1, 1, CAST(0x0000A4CD00A15A1E AS DateTime), 1003)
INSERT [dbo].[Sam3_Chofer] ([ChoferID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID]) VALUES (1004, N'Chofer Prueba Transportista 1', 1, 1, CAST(0x0000A4CD00A56F02 AS DateTime), 1002)
SET IDENTITY_INSERT [dbo].[Sam3_Chofer] OFF
SET IDENTITY_INSERT [dbo].[Sam3_Cliente] ON 

INSERT [dbo].[Sam3_Cliente] ([ClienteID], [Nombre], [Direccion], [Ciudad], [Estado], [Pais], [Activo], [UsuarioModificacion], [FechaModificacion], [Sam2ClienteID]) VALUES (1, N'Cliente Default', N'Av. Jose Vasconcelos', N'San Pedro Garza Garcia', N'Nuevo Leon', N'Mexico', 1, 1, CAST(0x0000A4B2009BEB40 AS DateTime), NULL)
INSERT [dbo].[Sam3_Cliente] ([ClienteID], [Nombre], [Direccion], [Ciudad], [Estado], [Pais], [Activo], [UsuarioModificacion], [FechaModificacion], [Sam2ClienteID]) VALUES (2, N'SAPCO', N'', N'', N'', N'', 1, 1, CAST(0x0000A4EC00BFEBF5 AS DateTime), 13)
INSERT [dbo].[Sam3_Cliente] ([ClienteID], [Nombre], [Direccion], [Ciudad], [Estado], [Pais], [Activo], [UsuarioModificacion], [FechaModificacion], [Sam2ClienteID]) VALUES (3, N'CB&I', N'2103 Research Forest Drive', N'The Woodlands', N'TX', N'USA', 1, 1, CAST(0x0000A4EC00F073A7 AS DateTime), 1)
INSERT [dbo].[Sam3_Cliente] ([ClienteID], [Nombre], [Direccion], [Ciudad], [Estado], [Pais], [Activo], [UsuarioModificacion], [FechaModificacion], [Sam2ClienteID]) VALUES (4, N'CONSTRUCCION YSERVICIOS, RELACIONADOS S.A. DE C.V.', N'', N'', N'', N'', 1, 1, CAST(0x0000A4F000CBBE55 AS DateTime), 2)
INSERT [dbo].[Sam3_Cliente] ([ClienteID], [Nombre], [Direccion], [Ciudad], [Estado], [Pais], [Activo], [UsuarioModificacion], [FechaModificacion], [Sam2ClienteID]) VALUES (5, N'FLUOR', N'', N'CORPUS CHRISTI', N'', N'', 1, 1, CAST(0x0000A4F000D55650 AS DateTime), 3)
INSERT [dbo].[Sam3_Cliente] ([ClienteID], [Nombre], [Direccion], [Ciudad], [Estado], [Pais], [Activo], [UsuarioModificacion], [FechaModificacion], [Sam2ClienteID]) VALUES (6, N'Tioga Gas Plant, Inc. C/O Mustang Engineering L.P.', N'1414 Valero Way', N'Corpus Christi', N'Texas', N'USA', 1, 1, CAST(0x0000A4F000E5B02E AS DateTime), 4)
INSERT [dbo].[Sam3_Cliente] ([ClienteID], [Nombre], [Direccion], [Ciudad], [Estado], [Pais], [Activo], [UsuarioModificacion], [FechaModificacion], [Sam2ClienteID]) VALUES (7, N'Tecnip/CNRL', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FB00F92E61 AS DateTime), 5)
INSERT [dbo].[Sam3_Cliente] ([ClienteID], [Nombre], [Direccion], [Ciudad], [Estado], [Pais], [Activo], [UsuarioModificacion], [FechaModificacion], [Sam2ClienteID]) VALUES (8, N'CONOCO PHILLIPS', N'CORP INVOICING, PO BOX 2200', N'BARTLESVILLE', N'OK 74005', N'USA', 1, 1, CAST(0x0000A4FF0101C005 AS DateTime), 6)
INSERT [dbo].[Sam3_Cliente] ([ClienteID], [Nombre], [Direccion], [Ciudad], [Estado], [Pais], [Activo], [UsuarioModificacion], [FechaModificacion], [Sam2ClienteID]) VALUES (9, N'IBERDROLA', N'Melchor Ocampo 193 Torre C, piso 9', N'Mexico', N'D.F.', N'Mexico', 1, 1, CAST(0x0000A4FF0101C005 AS DateTime), 7)
INSERT [dbo].[Sam3_Cliente] ([ClienteID], [Nombre], [Direccion], [Ciudad], [Estado], [Pais], [Activo], [UsuarioModificacion], [FechaModificacion], [Sam2ClienteID]) VALUES (10, N'COMDISTRAL', N'', N'Barranquilla', N'', N'Colombia', 1, 1, CAST(0x0000A4FF0101C005 AS DateTime), 8)
INSERT [dbo].[Sam3_Cliente] ([ClienteID], [Nombre], [Direccion], [Ciudad], [Estado], [Pais], [Activo], [UsuarioModificacion], [FechaModificacion], [Sam2ClienteID]) VALUES (11, N'ETHYLENE XXI CONTRACTORS, S.A.P.I DE C.V.', N'Nanchital de Lazaro Cardenas del Rio', N'Veracruz', N'Veracruz', N'Mexico', 1, 1, CAST(0x0000A4FF0101C005 AS DateTime), 9)
INSERT [dbo].[Sam3_Cliente] ([ClienteID], [Nombre], [Direccion], [Ciudad], [Estado], [Pais], [Activo], [UsuarioModificacion], [FechaModificacion], [Sam2ClienteID]) VALUES (12, N'DUPONT/JACOBS', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF0101C005 AS DateTime), 10)
INSERT [dbo].[Sam3_Cliente] ([ClienteID], [Nombre], [Direccion], [Ciudad], [Estado], [Pais], [Activo], [UsuarioModificacion], [FechaModificacion], [Sam2ClienteID]) VALUES (13, N'DRAGADOS OFFSHORE MEXICO', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF0101C005 AS DateTime), 11)
INSERT [dbo].[Sam3_Cliente] ([ClienteID], [Nombre], [Direccion], [Ciudad], [Estado], [Pais], [Activo], [UsuarioModificacion], [FechaModificacion], [Sam2ClienteID]) VALUES (14, N'EXTERRAN', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF0101C005 AS DateTime), 12)
INSERT [dbo].[Sam3_Cliente] ([ClienteID], [Nombre], [Direccion], [Ciudad], [Estado], [Pais], [Activo], [UsuarioModificacion], [FechaModificacion], [Sam2ClienteID]) VALUES (15, N'CORE INTERNATIONAL', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF0101C005 AS DateTime), 14)
INSERT [dbo].[Sam3_Cliente] ([ClienteID], [Nombre], [Direccion], [Ciudad], [Estado], [Pais], [Activo], [UsuarioModificacion], [FechaModificacion], [Sam2ClienteID]) VALUES (16, N'BUFETE CONSTRUCTOR AMERICA, SA. DE CV.', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF0101C005 AS DateTime), 15)
INSERT [dbo].[Sam3_Cliente] ([ClienteID], [Nombre], [Direccion], [Ciudad], [Estado], [Pais], [Activo], [UsuarioModificacion], [FechaModificacion], [Sam2ClienteID]) VALUES (17, N'TECHINT', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF0101C005 AS DateTime), 16)
INSERT [dbo].[Sam3_Cliente] ([ClienteID], [Nombre], [Direccion], [Ciudad], [Estado], [Pais], [Activo], [UsuarioModificacion], [FechaModificacion], [Sam2ClienteID]) VALUES (18, N'AOT PIPELINES', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF0101C005 AS DateTime), 17)
SET IDENTITY_INSERT [dbo].[Sam3_Cliente] OFF
SET IDENTITY_INSERT [dbo].[Sam3_Colada] ON 

INSERT [dbo].[Sam3_Colada] ([ColadaID], [FabricanteID], [AceroID], [ProyectoID], [NumeroColada], [NumeroCertificado], [HoldCalidad], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 1, 1, 1, N'Coldada Default', N'N/A', 0, 1, 1, CAST(0x0000A4FF00CA0F17 AS DateTime))
INSERT [dbo].[Sam3_Colada] ([ColadaID], [FabricanteID], [AceroID], [ProyectoID], [NumeroColada], [NumeroCertificado], [HoldCalidad], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3, 1, 1, 1, N'1', N'2', 1, 1, 1, CAST(0x0000A50700AC2AC7 AS DateTime))
INSERT [dbo].[Sam3_Colada] ([ColadaID], [FabricanteID], [AceroID], [ProyectoID], [NumeroColada], [NumeroCertificado], [HoldCalidad], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (4, 1, 1, 2, N'15', N'16', 1, 1, 1, CAST(0x0000A50D013BCF39 AS DateTime))
SET IDENTITY_INSERT [dbo].[Sam3_Colada] OFF
SET IDENTITY_INSERT [dbo].[Sam3_Color] ON 

INSERT [dbo].[Sam3_Color] ([ColorID], [Nombre], [NombreIngles], [CodigoHexadecimal], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, N'Negro', N'Black', N'#000000', 1, 1, CAST(0x0000A4B2009D3DC7 AS DateTime))
INSERT [dbo].[Sam3_Color] ([ColorID], [Nombre], [NombreIngles], [CodigoHexadecimal], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2, N'Café', N'Brown', N'#b97a57', 1, 1, CAST(0x0000A4FF01030EB1 AS DateTime))
INSERT [dbo].[Sam3_Color] ([ColorID], [Nombre], [NombreIngles], [CodigoHexadecimal], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3, N'Verde', N'Green', N'#339933', 1, 1, CAST(0x0000A4FF01030EB1 AS DateTime))
INSERT [dbo].[Sam3_Color] ([ColorID], [Nombre], [NombreIngles], [CodigoHexadecimal], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (4, N'Olivo', N'Olive', N'#999966', 1, 1, CAST(0x0000A4FF01030EB1 AS DateTime))
INSERT [dbo].[Sam3_Color] ([ColorID], [Nombre], [NombreIngles], [CodigoHexadecimal], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (5, N'Marino', N'Dark blue', N'#333399', 1, 1, CAST(0x0000A4FF01030EB1 AS DateTime))
INSERT [dbo].[Sam3_Color] ([ColorID], [Nombre], [NombreIngles], [CodigoHexadecimal], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (6, N'Púrpura', N'Purple', N'#993399', 1, 1, CAST(0x0000A4FF01030EB1 AS DateTime))
INSERT [dbo].[Sam3_Color] ([ColorID], [Nombre], [NombreIngles], [CodigoHexadecimal], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (7, N'Turquesa', N'Turquoise', N'#339999', 1, 1, CAST(0x0000A4FF01030EB1 AS DateTime))
INSERT [dbo].[Sam3_Color] ([ColorID], [Nombre], [NombreIngles], [CodigoHexadecimal], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (8, N'Plata', N'Silver', N'#b2b2b2', 1, 1, CAST(0x0000A4FF01030EB1 AS DateTime))
INSERT [dbo].[Sam3_Color] ([ColorID], [Nombre], [NombreIngles], [CodigoHexadecimal], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (9, N'Gris', N'Gray', N'#666666', 1, 1, CAST(0x0000A4FF01030EB1 AS DateTime))
INSERT [dbo].[Sam3_Color] ([ColorID], [Nombre], [NombreIngles], [CodigoHexadecimal], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (10, N'Rojo', N'Red', N'#ff0000', 1, 1, CAST(0x0000A4FF01030EB1 AS DateTime))
INSERT [dbo].[Sam3_Color] ([ColorID], [Nombre], [NombreIngles], [CodigoHexadecimal], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (11, N'Lima', N'Lime', N'#66ff33', 1, 1, CAST(0x0000A4FF01030EB1 AS DateTime))
INSERT [dbo].[Sam3_Color] ([ColorID], [Nombre], [NombreIngles], [CodigoHexadecimal], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (12, N'Amarillo', N'Yellow', N'#ffff66', 1, 1, CAST(0x0000A4FF01030EB1 AS DateTime))
INSERT [dbo].[Sam3_Color] ([ColorID], [Nombre], [NombreIngles], [CodigoHexadecimal], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (13, N'Azul', N'Blue', N'#0033ff', 1, 1, CAST(0x0000A4FF01030EB1 AS DateTime))
INSERT [dbo].[Sam3_Color] ([ColorID], [Nombre], [NombreIngles], [CodigoHexadecimal], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (14, N'Blanco', N'White', N'#ffffff', 1, 1, CAST(0x0000A4FF01030EB1 AS DateTime))
SET IDENTITY_INSERT [dbo].[Sam3_Color] OFF
SET IDENTITY_INSERT [dbo].[Sam3_Contacto] ON 

INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, N'Contacto Default', N'SAM', N'Pruebas', N'proyectosam@desfinityfirst.com', N'81922554', N'', N'', 1, 1, CAST(0x0000A4B2009CB958 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2, N'Adan', N'Cavazos Vargas ', N'', N'avargas@cbi.com', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (4, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (5, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (6, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (7, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (8, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (9, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (10, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (11, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (12, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (13, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (14, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (15, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (16, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (17, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (18, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (19, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (20, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (21, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (22, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (23, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (24, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (25, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (26, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (27, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (28, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (29, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (30, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (31, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (32, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (33, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (34, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (35, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (36, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (37, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (38, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (39, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (40, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (41, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (42, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (43, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (44, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (45, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (46, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (47, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (48, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (49, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (50, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (51, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (52, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (53, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (54, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (55, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (56, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (57, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (58, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (59, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (60, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (61, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (62, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (63, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (64, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (65, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (66, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (67, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (68, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (69, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (70, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (71, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (72, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (73, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (74, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (75, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (76, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (77, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (78, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (79, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (80, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (81, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (82, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (83, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (84, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (85, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (86, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (87, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (88, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (89, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (90, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (91, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (92, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (93, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (94, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (95, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (96, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (97, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (98, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (99, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
GO
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (100, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (101, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (102, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (103, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (104, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (105, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (106, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (107, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (108, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (109, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (110, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (111, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (112, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (113, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (114, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (115, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (116, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (117, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (118, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (119, N'ROBIN ', N'BEVALET', N'', N'bevaletr@bayltd.com', N'361-693-2965', N'', N'361-533-3367', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (120, N'ROBIN ', N'BEVALET', N'', N'bevaletr@bayltd.com', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (121, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (122, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (123, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (124, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (125, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (126, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (127, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (128, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (129, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (130, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (131, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (132, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (133, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (134, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (135, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (136, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (137, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (138, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (139, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (140, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (141, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (142, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (143, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (144, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (145, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (146, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (147, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (148, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (149, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (150, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (151, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (152, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (153, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (154, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (155, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (156, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (157, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (158, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (159, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (160, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (161, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (162, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (163, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (164, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (165, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (166, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (167, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (168, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (169, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (170, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (171, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (172, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (173, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (174, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (175, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (176, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (177, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (178, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (179, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (180, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (181, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (182, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (183, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (184, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (185, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (186, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (187, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (188, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (189, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (190, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (191, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (192, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (193, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (194, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (195, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (196, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (197, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (198, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (199, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
GO
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (200, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (201, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (202, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (203, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (204, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (205, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (206, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (207, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (208, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (209, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (210, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (211, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (212, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (213, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (214, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (215, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (216, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (217, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (218, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (219, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (220, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (221, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (222, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (223, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (224, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (225, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (226, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (227, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (228, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (229, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (230, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (231, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (232, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (233, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (234, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (235, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (236, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (237, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (238, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (239, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (240, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (241, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (242, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (243, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (244, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (245, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (246, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (247, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (248, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (249, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (250, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (251, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (252, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (253, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (254, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (255, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (256, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (257, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (258, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (259, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (260, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (261, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (262, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (263, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (264, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (265, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (266, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (267, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (268, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (269, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (270, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (271, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (272, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (273, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (274, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (275, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (276, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (277, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (278, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (279, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (280, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (281, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (282, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (283, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (284, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (285, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (286, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (287, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (288, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (289, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (290, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (291, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (292, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (293, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (294, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (295, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (296, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (297, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (298, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (299, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
GO
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (300, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (301, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (302, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (303, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (304, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (305, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (306, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (307, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (308, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (309, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (310, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (311, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (312, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (313, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (314, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (315, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (316, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (317, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (318, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (319, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (320, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (321, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (322, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (323, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (324, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (325, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (326, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (327, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (328, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (329, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (330, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (331, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (332, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (333, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (334, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (335, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (336, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (337, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (338, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (339, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (340, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (341, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (342, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (343, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (344, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (345, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (346, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (347, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (348, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (349, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (350, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (351, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (352, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (353, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (354, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (355, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (356, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (357, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (358, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (359, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (360, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (361, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (362, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (363, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (364, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (365, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (366, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (367, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (368, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (369, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (370, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (371, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (372, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (373, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (374, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (375, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (376, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (377, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (378, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (379, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (380, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (381, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (382, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (383, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (384, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (385, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (386, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (387, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (388, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (389, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (390, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (391, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (392, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (393, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (394, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (395, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (396, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (397, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (398, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (399, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
GO
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (400, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (401, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (402, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (403, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (404, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (405, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (406, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (407, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (408, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (409, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (410, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (411, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (412, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (413, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (414, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (415, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (416, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (417, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (418, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (419, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (420, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (421, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (422, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (423, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (424, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (425, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (426, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (427, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (428, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (429, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (430, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (431, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (432, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (433, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (434, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (435, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (436, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (437, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (438, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (439, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (440, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (441, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (442, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (443, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (444, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (445, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (446, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (447, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (448, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (449, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (450, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (451, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (452, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (453, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (454, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (455, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (456, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (457, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (458, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (459, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (460, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (461, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (462, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (463, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (464, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (465, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (466, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (467, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (468, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (469, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (470, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (471, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (472, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (473, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (474, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (475, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (476, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (477, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (478, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (479, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (480, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (481, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (482, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (483, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (484, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (485, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (486, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (487, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (488, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (489, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (490, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (491, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (492, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (493, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (494, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (495, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (496, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (497, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (498, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (499, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
GO
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (500, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (501, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (502, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (503, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (504, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (505, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (506, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (507, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (508, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (509, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (510, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (511, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (512, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (513, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (514, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (515, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (516, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (517, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (518, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (519, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (520, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (521, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (522, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (523, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (524, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (525, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (526, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (527, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (528, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (529, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (530, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (531, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (532, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (533, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (534, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (535, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (536, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (537, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (538, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (539, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (540, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (541, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (542, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (543, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (544, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (545, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (546, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (547, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (548, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (549, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (550, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (551, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (552, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (553, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (554, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (555, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (556, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (557, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (558, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (559, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (560, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (561, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (562, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (563, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (564, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (565, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (566, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (567, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (568, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (569, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (570, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (571, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (572, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (573, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (574, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (575, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (576, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (577, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (578, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (579, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (580, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (581, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (582, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (583, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (584, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (585, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (586, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (587, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (588, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (589, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (590, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (591, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (592, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (593, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (594, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (595, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (596, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (597, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (598, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (599, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
GO
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (600, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (601, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (602, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (603, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (604, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (605, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (606, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (607, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (608, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (609, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (610, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (611, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (612, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (613, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (614, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (615, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (616, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (617, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (618, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (619, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (620, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (621, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (622, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (623, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (624, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (625, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (626, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (627, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (628, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (629, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (630, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (631, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (632, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (633, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (634, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (635, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (636, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (637, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (638, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (639, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (640, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (641, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (642, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (643, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (644, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (645, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (646, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (647, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (648, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (649, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (650, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (651, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (652, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (653, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (654, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (655, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (656, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (657, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (658, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (659, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (660, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (661, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (662, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (663, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (664, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (665, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (666, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (667, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (668, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
INSERT [dbo].[Sam3_Contacto] ([ContactoID], [Nombre], [ApPaterno], [ApMaterno], [CorreoElectronico], [TelefonoOficina], [TelefonoParticular], [TelefonoCelular], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (669, N'', N'', N'', N'', N'', N'', N'', 1, 1, CAST(0x0000A4FF00FF5228 AS DateTime))
SET IDENTITY_INSERT [dbo].[Sam3_Contacto] OFF
SET IDENTITY_INSERT [dbo].[Sam3_Entidad] ON 

INSERT [dbo].[Sam3_Entidad] ([EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, N'Login', 1, NULL, NULL)
INSERT [dbo].[Sam3_Entidad] ([EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2, N'Layout', 1, NULL, NULL)
INSERT [dbo].[Sam3_Entidad] ([EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3, N'SideMenu', 1, NULL, NULL)
INSERT [dbo].[Sam3_Entidad] ([EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (4, N'Context Menu', 1, NULL, NULL)
INSERT [dbo].[Sam3_Entidad] ([EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (5, N'Quick Links', 1, NULL, NULL)
INSERT [dbo].[Sam3_Entidad] ([EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (6, N'Incidencias', 1, NULL, NULL)
INSERT [dbo].[Sam3_Entidad] ([EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (9, N'Aviso Entrada', 1, NULL, NULL)
INSERT [dbo].[Sam3_Entidad] ([EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (10, N'Permiso Aduana', 1, NULL, NULL)
INSERT [dbo].[Sam3_Entidad] ([EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (11, N'Autorización de Permiso', 1, NULL, NULL)
INSERT [dbo].[Sam3_Entidad] ([EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (12, N'Pase de Salida', 1, NULL, NULL)
INSERT [dbo].[Sam3_Entidad] ([EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (14, N'LLegada Material', 1, NULL, NULL)
INSERT [dbo].[Sam3_Entidad] ([EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (17, N'Numeros Unicos', 1, NULL, NULL)
INSERT [dbo].[Sam3_Entidad] ([EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (18, N'Proveedor', 1, NULL, NULL)
INSERT [dbo].[Sam3_Entidad] ([EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (19, N'Patio', 1, NULL, NULL)
INSERT [dbo].[Sam3_Entidad] ([EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (20, N'Transportista', 1, NULL, NULL)
INSERT [dbo].[Sam3_Entidad] ([EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (21, N'Tracto', 1, NULL, NULL)
INSERT [dbo].[Sam3_Entidad] ([EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (22, N'Chofer', 1, NULL, NULL)
INSERT [dbo].[Sam3_Entidad] ([EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (23, N'Plana', 1, NULL, NULL)
INSERT [dbo].[Sam3_Entidad] ([EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (24, N'Cuantificacion', 1, NULL, NULL)
INSERT [dbo].[Sam3_Entidad] ([EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (25, N'Item Code', 1, NULL, NULL)
INSERT [dbo].[Sam3_Entidad] ([EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (26, N'Item Code Steelgo', 1, NULL, NULL)
INSERT [dbo].[Sam3_Entidad] ([EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (27, N'Colada', 1, NULL, NULL)
INSERT [dbo].[Sam3_Entidad] ([EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (28, N'Orden Recepcion', 1, NULL, NULL)
INSERT [dbo].[Sam3_Entidad] ([EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (29, N'Orden Almacenaje', 1, NULL, NULL)
SET IDENTITY_INSERT [dbo].[Sam3_Entidad] OFF
SET IDENTITY_INSERT [dbo].[Sam3_Fabricante] ON 

INSERT [dbo].[Sam3_Fabricante] ([FabricanteID], [ContactoID], [Nombre], [Descripcion], [Direccion], [Telefono], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 1, N'Fabricante Default', N'Registro por Dafault', N'Monterrey, Nuevo Leon', N'000000000', 1, 1, CAST(0x0000A4FF00C9C5A0 AS DateTime))
SET IDENTITY_INSERT [dbo].[Sam3_Fabricante] OFF
SET IDENTITY_INSERT [dbo].[Sam3_FamiliaAcero] ON 

INSERT [dbo].[Sam3_FamiliaAcero] ([FamiliaAceroID], [FamiliaMaterialID], [Nombre], [Descripcion], [VerificadoPorCalidad], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 1, N'Familia acero 1', N'familia acero 1', 1, 1, 1, CAST(0x0000A4FA00000000 AS DateTime))
INSERT [dbo].[Sam3_FamiliaAcero] ([FamiliaAceroID], [FamiliaMaterialID], [Nombre], [Descripcion], [VerificadoPorCalidad], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2, 2, N'Familia acero 2', N'familia acero 2', 1, 1, 1, CAST(0x0000A4FA00000000 AS DateTime))
SET IDENTITY_INSERT [dbo].[Sam3_FamiliaAcero] OFF
SET IDENTITY_INSERT [dbo].[Sam3_FamiliaItemCode] ON 

INSERT [dbo].[Sam3_FamiliaItemCode] ([FamiliaItemCodeID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, N'Brida', 1, 1, CAST(0x0000A45400000000 AS DateTime))
SET IDENTITY_INSERT [dbo].[Sam3_FamiliaItemCode] OFF
SET IDENTITY_INSERT [dbo].[Sam3_FamiliaMaterial] ON 

INSERT [dbo].[Sam3_FamiliaMaterial] ([FamiliaMaterialID], [Nombre], [Descripcion], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, N'Familia Prueba 1', N'familia de prueba 1', 1, 1, CAST(0x0000A4FA00000000 AS DateTime))
INSERT [dbo].[Sam3_FamiliaMaterial] ([FamiliaMaterialID], [Nombre], [Descripcion], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2, N'Familia Prueba 2', N'familia de prueba 2', 1, 1, CAST(0x0000A4FA00000000 AS DateTime))
SET IDENTITY_INSERT [dbo].[Sam3_FamiliaMaterial] OFF
SET IDENTITY_INSERT [dbo].[Sam3_FolioAvisoEntrada] ON 

INSERT [dbo].[Sam3_FolioAvisoEntrada] ([FolioAvisoEntradaID], [Consecutivo], [FolioAvisoLlegadaID], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [Factura], [OrdenCompra], [ProveedorID], [ClienteID], [PatioID], [FolioDescarga], [FechaFolioDescarga], [FechaFinDescarga], [FechainicioDescarga], [FechaCreacion], [ComboEstatus]) VALUES (1, 1, 9, N'En Patio', 1, 1, CAST(0x0000A4F0011EC5AD AS DateTime), N'1', N'123', 1, 1, 2002, 0, NULL, NULL, NULL, CAST(0x0000A4F0011EC5AD AS DateTime), N'En Patio')
INSERT [dbo].[Sam3_FolioAvisoEntrada] ([FolioAvisoEntradaID], [Consecutivo], [FolioAvisoLlegadaID], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [Factura], [OrdenCompra], [ProveedorID], [ClienteID], [PatioID], [FolioDescarga], [FechaFolioDescarga], [FechaFinDescarga], [FechainicioDescarga], [FechaCreacion], [ComboEstatus]) VALUES (14, 1, 1010, N'Generado', 1, 1, CAST(0x0000A4EC00BFEC28 AS DateTime), N'0123456', N'012452', 1, 2, 1, 0, NULL, NULL, NULL, CAST(0x0000A4EC00BFEC28 AS DateTime), NULL)
INSERT [dbo].[Sam3_FolioAvisoEntrada] ([FolioAvisoEntradaID], [Consecutivo], [FolioAvisoLlegadaID], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [Factura], [OrdenCompra], [ProveedorID], [ClienteID], [PatioID], [FolioDescarga], [FechaFolioDescarga], [FechaFinDescarga], [FechainicioDescarga], [FechaCreacion], [ComboEstatus]) VALUES (15, 1, 1018, N'Generado', 1, 1, CAST(0x0000A4ED00B78930 AS DateTime), N'123456', N'123456', 1, 2, 1, 0, NULL, NULL, NULL, CAST(0x0000A4ED00B78930 AS DateTime), NULL)
INSERT [dbo].[Sam3_FolioAvisoEntrada] ([FolioAvisoEntradaID], [Consecutivo], [FolioAvisoLlegadaID], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [Factura], [OrdenCompra], [ProveedorID], [ClienteID], [PatioID], [FolioDescarga], [FechaFolioDescarga], [FechaFinDescarga], [FechainicioDescarga], [FechaCreacion], [ComboEstatus]) VALUES (52, 1, 5, N'Cierre de Folio Por Devolución', 1, 1, CAST(0x0000A4F700F5AE00 AS DateTime), N'FACT001', N'ORDEN001', 1, 3, 1, 0, NULL, CAST(0x0000A4F101101506 AS DateTime), NULL, CAST(0x0000A4F700F5AE00 AS DateTime), N'Cierre de Folio Por Devolución')
INSERT [dbo].[Sam3_FolioAvisoEntrada] ([FolioAvisoEntradaID], [Consecutivo], [FolioAvisoLlegadaID], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [Factura], [OrdenCompra], [ProveedorID], [ClienteID], [PatioID], [FolioDescarga], [FechaFolioDescarga], [FechaFinDescarga], [FechainicioDescarga], [FechaCreacion], [ComboEstatus]) VALUES (53, 1, 3051, N'En Patio', 1, 1, CAST(0x0000A4F101230D28 AS DateTime), N'fact001', N'orden001', 1, 3, 1, 2, CAST(0x0000A4F10122E623 AS DateTime), CAST(0x0000A4F1011FCCE7 AS DateTime), CAST(0x0000A4F10122E623 AS DateTime), CAST(0x0000A4F101230D28 AS DateTime), N'En Patio')
INSERT [dbo].[Sam3_FolioAvisoEntrada] ([FolioAvisoEntradaID], [Consecutivo], [FolioAvisoLlegadaID], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [Factura], [OrdenCompra], [ProveedorID], [ClienteID], [PatioID], [FolioDescarga], [FechaFolioDescarga], [FechaFinDescarga], [FechainicioDescarga], [FechaCreacion], [ComboEstatus]) VALUES (54, 1, 3053, N'Orden de Descarga Generada', 1, 1, CAST(0x0000A4F700F21A12 AS DateTime), N'fact001', N'orden001', 1, 3, 2, 3, CAST(0x0000A4F10128730B AS DateTime), CAST(0x0000A4F200A61672 AS DateTime), CAST(0x0000A4F10128730B AS DateTime), CAST(0x0000A4F700F21A12 AS DateTime), N'En Patio')
INSERT [dbo].[Sam3_FolioAvisoEntrada] ([FolioAvisoEntradaID], [Consecutivo], [FolioAvisoLlegadaID], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [Factura], [OrdenCompra], [ProveedorID], [ClienteID], [PatioID], [FolioDescarga], [FechaFolioDescarga], [FechaFinDescarga], [FechainicioDescarga], [FechaCreacion], [ComboEstatus]) VALUES (58, 1, 3054, N'En Patio', 1, 1, CAST(0x0000A4F700F47B60 AS DateTime), N'fact001', N'orden001', 1, 3, 1, 0, NULL, NULL, NULL, CAST(0x0000A4F700F47B60 AS DateTime), N'En Patio')
INSERT [dbo].[Sam3_FolioAvisoEntrada] ([FolioAvisoEntradaID], [Consecutivo], [FolioAvisoLlegadaID], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [Factura], [OrdenCompra], [ProveedorID], [ClienteID], [PatioID], [FolioDescarga], [FechaFolioDescarga], [FechaFinDescarga], [FechainicioDescarga], [FechaCreacion], [ComboEstatus]) VALUES (59, 1, 3050, N'Orden de Descarga Generada', 1, 1, CAST(0x0000A4F700F49620 AS DateTime), N'fact001', N'orden001', 1, 2, 2, 4, CAST(0x0000A4F200F4DBF3 AS DateTime), NULL, CAST(0x0000A4F200F4DBF3 AS DateTime), CAST(0x0000A4F700F49620 AS DateTime), N'En Patio')
INSERT [dbo].[Sam3_FolioAvisoEntrada] ([FolioAvisoEntradaID], [Consecutivo], [FolioAvisoLlegadaID], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [Factura], [OrdenCompra], [ProveedorID], [ClienteID], [PatioID], [FolioDescarga], [FechaFolioDescarga], [FechaFinDescarga], [FechainicioDescarga], [FechaCreacion], [ComboEstatus]) VALUES (60, 1, 4, N'En Patio', 1, 1, CAST(0x0000A4F700F34915 AS DateTime), N'fact001', N'orden001', 1, 3, 1, 0, NULL, NULL, NULL, CAST(0x0000A4F700F34915 AS DateTime), N'En Patio')
INSERT [dbo].[Sam3_FolioAvisoEntrada] ([FolioAvisoEntradaID], [Consecutivo], [FolioAvisoLlegadaID], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [Factura], [OrdenCompra], [ProveedorID], [ClienteID], [PatioID], [FolioDescarga], [FechaFolioDescarga], [FechaFinDescarga], [FechainicioDescarga], [FechaCreacion], [ComboEstatus]) VALUES (61, 1, 2054, N'En Patio', 1, 1, CAST(0x0000A4F700F35BFE AS DateTime), N'333', N'12345', 1002, 6, 1002, 0, NULL, NULL, NULL, CAST(0x0000A4F700F35BFE AS DateTime), N'En Patio')
INSERT [dbo].[Sam3_FolioAvisoEntrada] ([FolioAvisoEntradaID], [Consecutivo], [FolioAvisoLlegadaID], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [Factura], [OrdenCompra], [ProveedorID], [ClienteID], [PatioID], [FolioDescarga], [FechaFolioDescarga], [FechaFinDescarga], [FechainicioDescarga], [FechaCreacion], [ComboEstatus]) VALUES (62, 1, 3056, N'Orden de Descarga Generada', 1, 1, CAST(0x0000A4FA00971FD4 AS DateTime), N'fact001', N'orden001', 1, 4, 1, 5, CAST(0x0000A4FA00971B87 AS DateTime), NULL, CAST(0x0000A4FA00971B87 AS DateTime), CAST(0x0000A4FA00971FD4 AS DateTime), N'En Patio')
INSERT [dbo].[Sam3_FolioAvisoEntrada] ([FolioAvisoEntradaID], [Consecutivo], [FolioAvisoLlegadaID], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [Factura], [OrdenCompra], [ProveedorID], [ClienteID], [PatioID], [FolioDescarga], [FechaFolioDescarga], [FechaFinDescarga], [FechainicioDescarga], [FechaCreacion], [ComboEstatus]) VALUES (63, 1, 3057, N'Cierre de Folio Por Devolución', 1, 1, CAST(0x0000A4FB00F93069 AS DateTime), N'fact001', N'orden001', 1003, 7, 1, 0, NULL, NULL, NULL, CAST(0x0000A4FB00F93069 AS DateTime), N'Cierre de Folio Por Devolución')
INSERT [dbo].[Sam3_FolioAvisoEntrada] ([FolioAvisoEntradaID], [Consecutivo], [FolioAvisoLlegadaID], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [Factura], [OrdenCompra], [ProveedorID], [ClienteID], [PatioID], [FolioDescarga], [FechaFolioDescarga], [FechaFinDescarga], [FechainicioDescarga], [FechaCreacion], [ComboEstatus]) VALUES (64, 1, 3058, N'En Patio', 1, 1, CAST(0x0000A4FB00FA9B8D AS DateTime), N'fact1', N'orden1', 2, 4, 2, 0, NULL, NULL, NULL, CAST(0x0000A4FB00FA9B8D AS DateTime), N'En Patio')
INSERT [dbo].[Sam3_FolioAvisoEntrada] ([FolioAvisoEntradaID], [Consecutivo], [FolioAvisoLlegadaID], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [Factura], [OrdenCompra], [ProveedorID], [ClienteID], [PatioID], [FolioDescarga], [FechaFolioDescarga], [FechaFinDescarga], [FechainicioDescarga], [FechaCreacion], [ComboEstatus]) VALUES (65, 1, 4057, N'En Patio', 1, 1, CAST(0x0000A5050081FCB2 AS DateTime), N'fact001', N'orden001', 1, 3, 1, 0, NULL, NULL, NULL, CAST(0x0000A5050081FCB2 AS DateTime), N'En Patio')
INSERT [dbo].[Sam3_FolioAvisoEntrada] ([FolioAvisoEntradaID], [Consecutivo], [FolioAvisoLlegadaID], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [Factura], [OrdenCompra], [ProveedorID], [ClienteID], [PatioID], [FolioDescarga], [FechaFolioDescarga], [FechaFinDescarga], [FechainicioDescarga], [FechaCreacion], [ComboEstatus]) VALUES (66, 1, 7, N'En Patio', 1, 1, CAST(0x0000A50800C920E3 AS DateTime), N'544124', N'8756454', 2, 5, 2, 0, NULL, NULL, NULL, CAST(0x0000A50800C920E3 AS DateTime), N'En Patio')
INSERT [dbo].[Sam3_FolioAvisoEntrada] ([FolioAvisoEntradaID], [Consecutivo], [FolioAvisoLlegadaID], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [Factura], [OrdenCompra], [ProveedorID], [ClienteID], [PatioID], [FolioDescarga], [FechaFolioDescarga], [FechaFinDescarga], [FechainicioDescarga], [FechaCreacion], [ComboEstatus]) VALUES (67, 1, 4058, N'Orden de Descarga Generada', 1, 1, CAST(0x0000A50C00EE8D90 AS DateTime), N'fact001', N'orden001', 1, 3, 1, 6, CAST(0x0000A50C00EE8D90 AS DateTime), NULL, CAST(0x0000A50C00EE8D90 AS DateTime), CAST(0x0000A50C00EE8AF6 AS DateTime), N'En Patio')
SET IDENTITY_INSERT [dbo].[Sam3_FolioAvisoEntrada] OFF
SET IDENTITY_INSERT [dbo].[Sam3_FolioAvisoLlegada] ON 

INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (4, 1, 0, N'Creado', 1, 1, CAST(0x0000A4F1010FF0F2 AS DateTime), 1, 1, 1, 1, CAST(0x0000A4BA00000000 AS DateTime), 1, NULL, NULL)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (5, 2, 0, N'Creado', 1, 1, CAST(0x0000A4F101101505 AS DateTime), 1, 1, 1, 1, CAST(0x0000A4BA00000000 AS DateTime), 1, NULL, NULL)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (6, 3, 0, N'Creado', 1, 1, CAST(0x0000A4DE00DFE675 AS DateTime), 1, 1, 1, 0, CAST(0x0000A4BA00000000 AS DateTime), 1, NULL, NULL)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (7, 4, 0, N'Creado', 1, 1, CAST(0x0000A4BB00A69A81 AS DateTime), 1, 1, 1, 0, CAST(0x0000A4BA00000000 AS DateTime), 1, NULL, NULL)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (8, 5, 0, N'Autorizado', 1, 1, CAST(0x0000A4CA00C40859 AS DateTime), 1, 1, 3, 0, CAST(0x0000A4BA00000000 AS DateTime), 1, 1, NULL)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (9, 6, 0, N'Creado', 1, 1, CAST(0x0000A4BB00FA5062 AS DateTime), 1, 1, 2, 0, CAST(0x0000A4BB00000000 AS DateTime), 1, NULL, NULL)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (1010, 7, 0, N'Creado', 1, 1, CAST(0x0000A4C600C1ED60 AS DateTime), 1, 1002, 2, 0, CAST(0x0000A4C000000000 AS DateTime), 1, 1, 2)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (1011, 8, 0, N'Creado', 1, 1, CAST(0x0000A4C8010D04EB AS DateTime), 1, 1, 2, 0, CAST(0x0000A4C000000000 AS DateTime), 3, 2, 2)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (1012, 9, 0, N'Creado', 1, 1, CAST(0x0000A4C000E8B325 AS DateTime), 1, 1, 1, 0, CAST(0x0000A4C000000000 AS DateTime), 1, 2, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (1013, 10, 0, N'Creado', 1, 1, CAST(0x0000A4C100A0598D AS DateTime), 1, 2, 2, 0, CAST(0x0000A4C100000000 AS DateTime), 1, 0, 2)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (1014, 11, 0, N'Creado', 1, 1, CAST(0x0000A4C100A09BBA AS DateTime), 1, 1002, 2, 0, CAST(0x0000A4C100000000 AS DateTime), 1, 0, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (1015, 12, 0, N'Creado', 1, 1, CAST(0x0000A4C100A10651 AS DateTime), 1, 1, 2, 0, CAST(0x0000A4C100000000 AS DateTime), 2, 0, 2)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (1016, 13, 0, N'Autorizado', 1, 1, CAST(0x0000A4CA00EDA67F AS DateTime), 1, 1, 2, 0, CAST(0x0000A4C100000000 AS DateTime), 2, 1, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (1017, 14, 0, N'Autorizado', 1, 1, CAST(0x0000A4C100A6E212 AS DateTime), 1, 1002, 2, 0, CAST(0x0000A4C100000000 AS DateTime), 1, 0, 2)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (1018, 15, 0, N'Autorizado', 1, 1, CAST(0x0000A4C600F44172 AS DateTime), 1, 1002, 2, 0, CAST(0x0000A4C100000000 AS DateTime), 2, 0, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (1019, 16, 0, N'Autorizado', 1, 1, CAST(0x0000A4C600F4B3D0 AS DateTime), 1, 1002, 3, 0, CAST(0x0000A4C100000000 AS DateTime), 3, 2, 2)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (1020, 17, 0, N'Autorizado', 1, 1, CAST(0x0000A4C600D69367 AS DateTime), 1, 1002, 2, 0, CAST(0x0000A4C100000000 AS DateTime), 1, 1, 2)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (1021, 18, 0, N'Creado', 1, 1, CAST(0x0000A4C100BDB7EC AS DateTime), 1, 1002, 3, 0, CAST(0x0000A4C100000000 AS DateTime), 2, 1, 2)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (1022, 19, 0, N'Creado', 1, 1, CAST(0x0000A4C100BE5B18 AS DateTime), 1, 1, 2, 0, CAST(0x0000A4C100000000 AS DateTime), 3, 2, 2)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (1023, 20, 0, N'Creado', 1, 1, CAST(0x0000A4C20076BE32 AS DateTime), 1, 2, 1, 0, CAST(0x0000A4C200000000 AS DateTime), 1, 1, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (1024, 21, 0, N'Creado', 1, 1, CAST(0x0000A4C900E243CF AS DateTime), 1, 1, 2, 0, CAST(0x0000A4DD00000000 AS DateTime), 1, 2, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (1025, 22, 0, N'Creado', 1, 1, CAST(0x0000A4C2007A4BD8 AS DateTime), 1, 2, 1, 0, CAST(0x0000A4C200000000 AS DateTime), 1, 2, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (1026, 23, 0, N'Creado', 0, 1, CAST(0x0000A4C90105AC92 AS DateTime), 1, 1, 2, 0, CAST(0x0000A4C200000000 AS DateTime), 1, 2, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (1027, 24, 0, N'Creado', 1, 1, CAST(0x0000A4C200859971 AS DateTime), 1, 1002, 1, 0, CAST(0x0000A4C200000000 AS DateTime), 1, 2, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (1028, 25, 0, N'Creado', 1, 1, CAST(0x0000A4C20086171E AS DateTime), 1, 1002, 2, 0, CAST(0x0000A4C200000000 AS DateTime), 1, 2, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (1029, 26, 0, N'Creado', 0, 1, CAST(0x0000A4C90106BB90 AS DateTime), 1, 1, 1, 0, CAST(0x0000A4C200000000 AS DateTime), 1, 2, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (1030, 27, 0, N'Generado', 1, 1, CAST(0x0000A4C200E0F477 AS DateTime), 1, 1, 1, 0, CAST(0x0000A4C200000000 AS DateTime), 2, 3, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (1031, 28, 0, N'Generado', 0, 1, CAST(0x0000A4C901071EF9 AS DateTime), 1, 1, 1, 0, CAST(0x0000A4C300000000 AS DateTime), 1, 1, 2)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (1033, 29, 0, N'Generado', 1, 1, CAST(0x0000A4CA00C8BC79 AS DateTime), 1, 1, 1, 0, CAST(0x0000A4C300000000 AS DateTime), 2, 2, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (2009, 30, 0, N'Generado', 1, 1, CAST(0x0000A4C900D90667 AS DateTime), 1, 1, 1, 0, CAST(0x0000A4E600000000 AS DateTime), 1, 1, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (2010, 31, 0, N'Generado', 1, 1, CAST(0x0000A4C900D93085 AS DateTime), 1, 1, 2, 0, CAST(0x0000A4DD00000000 AS DateTime), 3, 2, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (2011, 32, 0, N'Generado', 1, 1, CAST(0x0000A4C900D962FE AS DateTime), 1, 1, 1, 0, CAST(0x0000A4E600000000 AS DateTime), 1, 2, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (2012, 33, 0, N'Generado', 1, 1, CAST(0x0000A4C60074A0F5 AS DateTime), 1, 1, 1, 0, CAST(0x0000A4C600000000 AS DateTime), 1, 2, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (2013, 34, 0, N'Generado', 0, 1, CAST(0x0000A4C90106ED3D AS DateTime), 1, 1, 1, 0, CAST(0x0000A4C600000000 AS DateTime), 1, 1, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (2014, 35, 0, N'Generado', 1, 1, CAST(0x0000A4CD00A57558 AS DateTime), 1002, 1, 1004, 0, CAST(0x0000A4C600000000 AS DateTime), 1, 1, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (2015, 36, 0, N'Generado', 1, 1, CAST(0x0000A4C900A1C3EC AS DateTime), 1, 1, 1, 0, CAST(0x0000A4C600000000 AS DateTime), 1, 1, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (2016, 37, 0, N'Generado', 1, 1, CAST(0x0000A4C600CD0DC8 AS DateTime), 1, 1, 2, 0, CAST(0x0000A4C600000000 AS DateTime), 1, 2, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (2017, 38, 0, N'Generado', 1, 1, CAST(0x0000A4C600CDD5EB AS DateTime), 1, 1002, 2, 0, CAST(0x0000A4C600000000 AS DateTime), 1, 2, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (2018, 39, 0, N'Generado', 1, 1, CAST(0x0000A4C600CEE2B9 AS DateTime), 1, 1002, 1, 0, CAST(0x0000A4C600000000 AS DateTime), 1, 1, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (2019, 40, 0, N'Generado', 1, 1, CAST(0x0000A4C600D0609B AS DateTime), 1, 1002, 1, 0, CAST(0x0000A4C600000000 AS DateTime), 1, 2, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (2020, 41, 0, N'Generado', 1, 1, CAST(0x0000A4C600D32AA5 AS DateTime), 1, 1002, 1, 0, CAST(0x0000A4C600000000 AS DateTime), 1, 1, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (2021, 42, 0, N'Generado', 1, 1, CAST(0x0000A4C600D3EBEA AS DateTime), 1, 1002, 2, 0, CAST(0x0000A4C600000000 AS DateTime), 1, 1, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (2022, 43, 0, N'Generado', 1, 1, CAST(0x0000A4C60100553D AS DateTime), 1, 1, 2, 0, CAST(0x0000A4C600000000 AS DateTime), 1, 2, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (2023, 44, 0, N'Generado', 1, 1, CAST(0x0000A4C60100CC4F AS DateTime), 1, 1, 2, 0, CAST(0x0000A4C600000000 AS DateTime), 3, 2, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (2024, 45, 0, N'Generado', 1, 1, CAST(0x0000A4C6010270D8 AS DateTime), 1, 1, 3, 0, CAST(0x0000A4C600000000 AS DateTime), 3, 1, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (2025, 46, 0, N'Generado', 0, 1, CAST(0x0000A4CE012440E3 AS DateTime), 1, 1, 2, 0, CAST(0x0000A4C700000000 AS DateTime), 1, 1, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (2026, 47, 0, N'Generado', 1, 1, CAST(0x0000A4C7008080F1 AS DateTime), 1, 1, 2, 0, CAST(0x0000A4C700000000 AS DateTime), 1, 2, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (2027, 48, 0, N'Generado', 1, 1, CAST(0x0000A4C700815824 AS DateTime), 1, 1, 2, 0, CAST(0x0000A4C700000000 AS DateTime), 1, 1, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (2028, 49, 0, N'Generado', 1, 1, CAST(0x0000A4C80110F8B6 AS DateTime), 1, 1, 2, 0, CAST(0x0000A4D300000000 AS DateTime), 1, 1, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (2029, 50, 0, N'Generado', 1, 1, CAST(0x0000A4C801119690 AS DateTime), 1, 1, 2, 0, CAST(0x0000A4C900000000 AS DateTime), 1, 2, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (2030, 51, 0, N'Generado', 1, 1, CAST(0x0000A4C80111D2B8 AS DateTime), 1, 1, 2, 0, CAST(0x0000A4DF00000000 AS DateTime), 1, 2, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (2031, 52, 0, N'Generado', 1, 1, CAST(0x0000A4C9008C1D50 AS DateTime), 1, 1, 2, 0, CAST(0x0000A4C900000000 AS DateTime), 1, 2, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (2032, 53, 0, N'Generado', 1, 1, CAST(0x0000A4C900B9C1A9 AS DateTime), 1, 1, 2, 0, CAST(0x0000A43800000000 AS DateTime), 1, 2, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (2033, 54, 0, N'Generado', 1, 1, CAST(0x0000A4C900BB4947 AS DateTime), 1, 1, 1, 0, CAST(0x0000A43800000000 AS DateTime), 2, 1, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (2034, 55, 0, N'Generado', 1, 1, CAST(0x0000A4C900BA703E AS DateTime), 1, 1, 2, 0, CAST(0x0000A4C900000000 AS DateTime), 1, 1, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (2035, 56, 0, N'Generado', 1, 1, CAST(0x0000A4C900BBAE9D AS DateTime), 1002, 1, 2, 0, CAST(0x0000A4C900000000 AS DateTime), 2, 2, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (2036, 57, 0, N'Generado', 1, 1, CAST(0x0000A4C900BDA5E6 AS DateTime), 1, 1, 3, 0, CAST(0x0000A4CE00000000 AS DateTime), 1, 1, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (2037, 58, 0, N'Autorizado', 1, 1, CAST(0x0000A4CA00C395D8 AS DateTime), 1002, 1, 2, 0, CAST(0x0000A43800000000 AS DateTime), 3, 1, 2)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (2038, 59, 0, N'Generado', 1, 1, CAST(0x0000A4C900E218D5 AS DateTime), 1, 1, 2, 0, CAST(0x0000A4C900000000 AS DateTime), 1, 1, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (2039, 60, 0, N'Generado', 1, 1, CAST(0x0000A4C901019E4D AS DateTime), 1, 1, 1, 0, CAST(0x0000A4C900000000 AS DateTime), 2, 1, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (2040, 61, 0, N'Generado', 1, 1, CAST(0x0000A4CA00BC016D AS DateTime), 1, 1, 2, 0, CAST(0x0000A4C900000000 AS DateTime), 1, 2, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (2041, 62, 0, N'Autorizado', 1, 1, CAST(0x0000A4CA00C3441B AS DateTime), 1, 1, 1, 0, CAST(0x0000A4E600000000 AS DateTime), 1, 1, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (2042, 63, 0, N'Generado', 0, 1, CAST(0x0000A4CD0083D6A7 AS DateTime), 1005, 1, 1, 0, CAST(0x0000A4CA00000000 AS DateTime), 1020, 2, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (2043, 64, 0, N'Autorizado', 1, 1, CAST(0x0000A4CA00EBCB8A AS DateTime), 1, 1, 2, 0, CAST(0x0000A4CA00000000 AS DateTime), 1, 1, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (2044, 65, 0, N'Autorizado', 1, 1, CAST(0x0000A4CA00E3A450 AS DateTime), 1, 1, 2, 0, CAST(0x0000A4CA00000000 AS DateTime), 1, 2, 2)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (2045, 66, 0, N'Generado', 1, 1, CAST(0x0000A4CA00EBF2FF AS DateTime), 1, 1, 1, 0, CAST(0x0000A4CA00000000 AS DateTime), 1, 2, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (2046, 67, 0, N'Generado', 1, 1, CAST(0x0000A4CD0081E113 AS DateTime), 1, 1, 1, 0, CAST(0x0000A4CD00000000 AS DateTime), 1, 1, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (2047, 68, 0, N'Generado', 1, 1, CAST(0x0000A4CD0094234D AS DateTime), 1, 1, 1, 0, CAST(0x0000A4CD00000000 AS DateTime), 1, 1, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (2048, 69, 0, N'Autorizado', 1, 1, CAST(0x0000A4CF008DB49B AS DateTime), 1, 1, 1, 0, CAST(0x0000A4CD00000000 AS DateTime), 1, 2, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (2049, 70, 0, N'Generado', 1, 1, CAST(0x0000A4CD00BB4F85 AS DateTime), 1, 1, 1, 0, CAST(0x0000A4CD00000000 AS DateTime), 1, 1, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (2050, 71, 0, N'Generado', 1, 1, CAST(0x0000A4CD00BC158F AS DateTime), 1, 1, 1, 0, CAST(0x0000A4CD00000000 AS DateTime), 1, 1, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (2051, 72, 0, N'Generado', 1, 1, CAST(0x0000A4CD00BD958D AS DateTime), 1, 1, 1, 0, CAST(0x0000A4CD00000000 AS DateTime), 1, 1, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (2052, 73, 0, N'Generado', 1, 1, CAST(0x0000A4CD00BEDB9B AS DateTime), 1, 1, 1, 0, CAST(0x0000A4CD00000000 AS DateTime), 1, 2, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (2053, 74, 0, N'Autorizado', 1, 1, CAST(0x0000A4CD00C16E3C AS DateTime), 1, 1, 1, 0, CAST(0x0000A4CD00000000 AS DateTime), 1, 1, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (2054, 75, 0, N'Autorizado', 1, 1, CAST(0x0000A4CD00E8C2F5 AS DateTime), 1, 2003, 1, 0, CAST(0x0000A4CD00000000 AS DateTime), 2, 1, 2)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (2055, 76, 0, N'Generado', 1, 1, CAST(0x0000A4CE00B25CA7 AS DateTime), 1, 1, 1, 0, CAST(0x0000A4CE00000000 AS DateTime), 1, 2, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (2056, 77, 0, N'Autorizado', 1, 1, CAST(0x0000A4CE00B3C69D AS DateTime), 1, 1, 2, 0, CAST(0x0000A4CE00000000 AS DateTime), 1, 1, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (2057, 78, 0, N'Generado', 1, 1, CAST(0x0000A4CE00F570A0 AS DateTime), 1, 1, 1, 0, CAST(0x0000A4CE00000000 AS DateTime), 1, 1, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (2058, 79, 0, N'Generado', 1, 1, CAST(0x0000A4CE00F66E2C AS DateTime), 1, 1002, 1, 0, CAST(0x0000A4CE00000000 AS DateTime), 1, 1, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (2059, 80, 0, N'Generado', 1, 1, CAST(0x0000A4CE00F6A467 AS DateTime), 1, 1, 2, 0, CAST(0x0000A4CE00000000 AS DateTime), 3, 1, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (2060, 81, 0, N'Autorizado', 1, 1, CAST(0x0000A4CE00F782B9 AS DateTime), 1, 1, 1, 0, CAST(0x0000A4CE00000000 AS DateTime), 1, 1, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (2061, 82, 0, N'Autorizado', 0, 1, CAST(0x0000A4CF00AF8CB3 AS DateTime), 1, 1, 1, 0, CAST(0x0000A4CF00000000 AS DateTime), 1, 1, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (2062, 83, 0, N'Generado', 1, 1, CAST(0x0000A4CF00B00F58 AS DateTime), 1, 1, 1, 0, CAST(0x0000A4CF00000000 AS DateTime), 1, 1, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (2063, 84, 0, N'Autorizado', 1, 1, CAST(0x0000A4CF00B122E1 AS DateTime), 1, 1, 1, 0, CAST(0x0000A4CF00000000 AS DateTime), 1, 1, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (3046, 85, 0, N'Generado', 1, 1, CAST(0x0000A4ED00B08AA3 AS DateTime), 1, 1, 2, 0, CAST(0x0000A4ED00000000 AS DateTime), 1, 1, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (3047, 86, 0, N'Generado', 1, 1, CAST(0x0000A4F0011AC4B6 AS DateTime), 1, 1, 1, 0, CAST(0x0000A4F000000000 AS DateTime), 1, 1, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (3048, 87, 0, N'Generado', 1, 1, CAST(0x0000A4F0011FA2E1 AS DateTime), 1, 1, 1, 0, CAST(0x0000A4F000000000 AS DateTime), 1, 1, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (3049, 88, 0, N'Generado', 1, 1, CAST(0x0000A4F00120FD57 AS DateTime), 1, 1, 1, 0, CAST(0x0000A4F000000000 AS DateTime), 1, 1, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (3050, 89, 0, N'Generado', 1, 1, CAST(0x0000A4F0012129C6 AS DateTime), 1, 1, 1, 0, CAST(0x0000A4F000000000 AS DateTime), 1, 1, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (3051, 90, 0, N'Generado', 1, 1, CAST(0x0000A4F1011FCBC9 AS DateTime), 1, 1, 2, 1, CAST(0x0000A4F100000000 AS DateTime), 1, 1, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (3052, 91, 0, N'Generado', 1, 1, CAST(0x0000A4F10117B7C5 AS DateTime), 1003, 2, 1003, 0, CAST(0x0000A4F100000000 AS DateTime), 1, 2, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (3053, 92, 0, N'Generado', 1, 1, CAST(0x0000A4F200A6166F AS DateTime), 1002, 1, 1004, 1, CAST(0x0000A4F100000000 AS DateTime), 2, 1, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (3054, 93, 0, N'Generado', 1, 1, CAST(0x0000A4F1012E1A0D AS DateTime), 1, 1, 1, 1, CAST(0x0000A4F100000000 AS DateTime), 1, 1, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (3055, 94, 0, N'Generado', 1, 1, CAST(0x0000A4F200B07593 AS DateTime), 1, 1, 1, 0, CAST(0x0000A4F200000000 AS DateTime), 1, 1, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (3056, 95, 0, N'Generado', 1, 1, CAST(0x0000A4FA0096829A AS DateTime), 1, 1, 1, 0, CAST(0x0000A4FA009680E8 AS DateTime), 1, 1, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (3057, 96, 0, N'Generado', 1, 1, CAST(0x0000A4FB00EA0588 AS DateTime), 1, 1, 1, 0, CAST(0x0000A4FB00EA0240 AS DateTime), 1, 1, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (3058, 97, 0, N'Generado', 1, 1, CAST(0x0000A4FB00F99547 AS DateTime), 1, 1, 1, 0, CAST(0x0000A4FB00F992A0 AS DateTime), 1, 2, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (4057, 98, 0, N'Generado', 1, 1, CAST(0x0000A5050081517F AS DateTime), 1, 1, 2, 0, CAST(0x0000A5050081504C AS DateTime), 2, 1, 1)
INSERT [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID], [Consecutivo], [EsVirtual], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [TransportistaID], [PatioID], [ChoferID], [PaseSalidaEnviado], [FechaRecepcion], [VehiculoID], [ClienteID], [TipoAvisoID]) VALUES (4058, 99, 0, N'Generado', 1, 1, CAST(0x0000A50C00EE668F AS DateTime), 1002, 1, 1004, 0, CAST(0x0000A50C00EE6614 AS DateTime), 1, 1, 1)
GO
SET IDENTITY_INSERT [dbo].[Sam3_FolioAvisoLlegada] OFF
SET IDENTITY_INSERT [dbo].[Sam3_FolioCuantificacion] ON 

INSERT [dbo].[Sam3_FolioCuantificacion] ([FolioCuantificacionID], [FolioAvisoEntradaID], [ProyectoID], [PackingList], [TipoUsoID], [Estatus], [FechaCreacion], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (2, 15, 2, N'131704', 2, N'Entrada por Cuantificar', CAST(0x0000A4FA00000000 AS DateTime), CAST(0x0000A50C000A50A4 AS DateTime), 1, 1)
INSERT [dbo].[Sam3_FolioCuantificacion] ([FolioCuantificacionID], [FolioAvisoEntradaID], [ProyectoID], [PackingList], [TipoUsoID], [Estatus], [FechaCreacion], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (3, 14, 1, N'88888', 1, N'Entrada por cuantificar', CAST(0x0000A4FA00000000 AS DateTime), CAST(0x0000A50800FAF04A AS DateTime), 1, 1)
INSERT [dbo].[Sam3_FolioCuantificacion] ([FolioCuantificacionID], [FolioAvisoEntradaID], [ProyectoID], [PackingList], [TipoUsoID], [Estatus], [FechaCreacion], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (5, 54, 2, N'1678652', 1, N'Entrada por cuantificar', CAST(0x0000A50800F0753C AS DateTime), CAST(0x0000A50800F07678 AS DateTime), 1, 1)
INSERT [dbo].[Sam3_FolioCuantificacion] ([FolioCuantificacionID], [FolioAvisoEntradaID], [ProyectoID], [PackingList], [TipoUsoID], [Estatus], [FechaCreacion], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (84, 67, 1, N'0001', 2, N'En Proceso Recepción', CAST(0x0000A50D014C2F52 AS DateTime), CAST(0x0000A50D014D4235 AS DateTime), 1, 1)
INSERT [dbo].[Sam3_FolioCuantificacion] ([FolioCuantificacionID], [FolioAvisoEntradaID], [ProyectoID], [PackingList], [TipoUsoID], [Estatus], [FechaCreacion], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (85, 67, 1, N'', 1, N'En Proceso Recepción', CAST(0x0000A50D01539171 AS DateTime), CAST(0x0000A50D01539171 AS DateTime), 1, 1)
INSERT [dbo].[Sam3_FolioCuantificacion] ([FolioCuantificacionID], [FolioAvisoEntradaID], [ProyectoID], [PackingList], [TipoUsoID], [Estatus], [FechaCreacion], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (86, 67, 2, N'pl0001', 2, N'En Proceso Recepción', CAST(0x0000A50D015542B7 AS DateTime), CAST(0x0000A50D015542B7 AS DateTime), 1, 1)
INSERT [dbo].[Sam3_FolioCuantificacion] ([FolioCuantificacionID], [FolioAvisoEntradaID], [ProyectoID], [PackingList], [TipoUsoID], [Estatus], [FechaCreacion], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (87, 67, 2, N'pl0001', 2, N'En Proceso Recepción', CAST(0x0000A50D0155FDB2 AS DateTime), CAST(0x0000A50D0155FDB2 AS DateTime), 1, 1)
INSERT [dbo].[Sam3_FolioCuantificacion] ([FolioCuantificacionID], [FolioAvisoEntradaID], [ProyectoID], [PackingList], [TipoUsoID], [Estatus], [FechaCreacion], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (88, 67, 2, N'pl001', 2, N'En Proceso Recepción', CAST(0x0000A50D015720B6 AS DateTime), CAST(0x0000A50D015720B6 AS DateTime), 1, 1)
INSERT [dbo].[Sam3_FolioCuantificacion] ([FolioCuantificacionID], [FolioAvisoEntradaID], [ProyectoID], [PackingList], [TipoUsoID], [Estatus], [FechaCreacion], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (89, 67, 2, N'aaaa', 1, N'En Proceso Recepción', CAST(0x0000A50D0157AACE AS DateTime), CAST(0x0000A50D0157AACE AS DateTime), 1, 1)
INSERT [dbo].[Sam3_FolioCuantificacion] ([FolioCuantificacionID], [FolioAvisoEntradaID], [ProyectoID], [PackingList], [TipoUsoID], [Estatus], [FechaCreacion], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (90, 67, 2, N'pl333', 2, N'En Proceso Recepción', CAST(0x0000A50D015DCB52 AS DateTime), CAST(0x0000A50D015DCB52 AS DateTime), 1, 1)
INSERT [dbo].[Sam3_FolioCuantificacion] ([FolioCuantificacionID], [FolioAvisoEntradaID], [ProyectoID], [PackingList], [TipoUsoID], [Estatus], [FechaCreacion], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (91, 67, 2, N'PL919', 2, N'En Proceso Recepción', CAST(0x0000A50D015FC653 AS DateTime), CAST(0x0000A50D015FC653 AS DateTime), 1, 1)
INSERT [dbo].[Sam3_FolioCuantificacion] ([FolioCuantificacionID], [FolioAvisoEntradaID], [ProyectoID], [PackingList], [TipoUsoID], [Estatus], [FechaCreacion], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (92, 67, 2, N'PL919', 2, N'En Proceso Recepción', CAST(0x0000A50D01606998 AS DateTime), CAST(0x0000A50D01606998 AS DateTime), 1, 1)
INSERT [dbo].[Sam3_FolioCuantificacion] ([FolioCuantificacionID], [FolioAvisoEntradaID], [ProyectoID], [PackingList], [TipoUsoID], [Estatus], [FechaCreacion], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (93, 67, 2, N'PL925', 2, N'En Proceso Recepción', CAST(0x0000A50D01612963 AS DateTime), CAST(0x0000A50E00270B5C AS DateTime), 1, 1)
INSERT [dbo].[Sam3_FolioCuantificacion] ([FolioCuantificacionID], [FolioAvisoEntradaID], [ProyectoID], [PackingList], [TipoUsoID], [Estatus], [FechaCreacion], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (94, 67, 2, N'pl0001', 2, N'En Proceso Recepción', CAST(0x0000A50D0163ACE8 AS DateTime), CAST(0x0000A50D0163ACE8 AS DateTime), 1, 1)
INSERT [dbo].[Sam3_FolioCuantificacion] ([FolioCuantificacionID], [FolioAvisoEntradaID], [ProyectoID], [PackingList], [TipoUsoID], [Estatus], [FechaCreacion], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (95, 67, 2, N'pl0001', 2, N'En Proceso Recepción', CAST(0x0000A50D0163FDFE AS DateTime), CAST(0x0000A50D0163FDFE AS DateTime), 1, 1)
INSERT [dbo].[Sam3_FolioCuantificacion] ([FolioCuantificacionID], [FolioAvisoEntradaID], [ProyectoID], [PackingList], [TipoUsoID], [Estatus], [FechaCreacion], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (96, 67, 2, N'pl0001', 2, N'En Proceso Recepción', CAST(0x0000A50D0164304C AS DateTime), CAST(0x0000A50D0164304C AS DateTime), 1, 1)
INSERT [dbo].[Sam3_FolioCuantificacion] ([FolioCuantificacionID], [FolioAvisoEntradaID], [ProyectoID], [PackingList], [TipoUsoID], [Estatus], [FechaCreacion], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (97, 67, 2, N'aaa', 2, N'En Proceso Recepción', CAST(0x0000A50D0164C150 AS DateTime), CAST(0x0000A50D0164C150 AS DateTime), 1, 1)
INSERT [dbo].[Sam3_FolioCuantificacion] ([FolioCuantificacionID], [FolioAvisoEntradaID], [ProyectoID], [PackingList], [TipoUsoID], [Estatus], [FechaCreacion], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (98, 67, 2, N'PL1003', 2, N'En Proceso Recepción', CAST(0x0000A50D016BB590 AS DateTime), CAST(0x0000A50D016BB590 AS DateTime), 1, 1)
INSERT [dbo].[Sam3_FolioCuantificacion] ([FolioCuantificacionID], [FolioAvisoEntradaID], [ProyectoID], [PackingList], [TipoUsoID], [Estatus], [FechaCreacion], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (99, 67, 2, N'', 3, N'En Proceso Recepción', CAST(0x0000A50D01721C28 AS DateTime), CAST(0x0000A50D01741E19 AS DateTime), 1, 1)
INSERT [dbo].[Sam3_FolioCuantificacion] ([FolioCuantificacionID], [FolioAvisoEntradaID], [ProyectoID], [PackingList], [TipoUsoID], [Estatus], [FechaCreacion], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (100, 67, 2, N'as', 1, N'En Proceso Recepción', CAST(0x0000A50D0178F718 AS DateTime), CAST(0x0000A50D0178F718 AS DateTime), 1, 1)
INSERT [dbo].[Sam3_FolioCuantificacion] ([FolioCuantificacionID], [FolioAvisoEntradaID], [ProyectoID], [PackingList], [TipoUsoID], [Estatus], [FechaCreacion], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (101, 67, 2, N'', 2, N'En Proceso Recepción', CAST(0x0000A50D017D2291 AS DateTime), CAST(0x0000A50D017D9372 AS DateTime), 1, 1)
INSERT [dbo].[Sam3_FolioCuantificacion] ([FolioCuantificacionID], [FolioAvisoEntradaID], [ProyectoID], [PackingList], [TipoUsoID], [Estatus], [FechaCreacion], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (102, 67, 2, N'', 3, N'En Proceso Recepción', CAST(0x0000A50D017DD8FF AS DateTime), CAST(0x0000A50E002568CE AS DateTime), 1, 1)
INSERT [dbo].[Sam3_FolioCuantificacion] ([FolioCuantificacionID], [FolioAvisoEntradaID], [ProyectoID], [PackingList], [TipoUsoID], [Estatus], [FechaCreacion], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (103, 67, 2, N'PL159', 3, N'En Proceso Recepción', CAST(0x0000A50D017E4395 AS DateTime), CAST(0x0000A50E0022FB71 AS DateTime), 1, 1)
INSERT [dbo].[Sam3_FolioCuantificacion] ([FolioCuantificacionID], [FolioAvisoEntradaID], [ProyectoID], [PackingList], [TipoUsoID], [Estatus], [FechaCreacion], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (104, 67, 2, N'PL1134', 2, N'En Proceso Recepción', CAST(0x0000A50D0184BCAD AS DateTime), CAST(0x0000A50D0184BCAE AS DateTime), 1, 1)
INSERT [dbo].[Sam3_FolioCuantificacion] ([FolioCuantificacionID], [FolioAvisoEntradaID], [ProyectoID], [PackingList], [TipoUsoID], [Estatus], [FechaCreacion], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (105, 62, 1, N'PL1143', 2, N'En Proceso Recepción', CAST(0x0000A50D0187B7DA AS DateTime), CAST(0x0000A50E000307DF AS DateTime), 1, 1)
INSERT [dbo].[Sam3_FolioCuantificacion] ([FolioCuantificacionID], [FolioAvisoEntradaID], [ProyectoID], [PackingList], [TipoUsoID], [Estatus], [FechaCreacion], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (106, 67, 2, N'PL1212', 2, N'En Proceso Recepción', CAST(0x0000A50E00041BB2 AS DateTime), CAST(0x0000A50E000CF67E AS DateTime), 1, 1)
INSERT [dbo].[Sam3_FolioCuantificacion] ([FolioCuantificacionID], [FolioAvisoEntradaID], [ProyectoID], [PackingList], [TipoUsoID], [Estatus], [FechaCreacion], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (107, 67, 2, N'PL207', 2, N'En Proceso Recepción', CAST(0x0000A50E002344F6 AS DateTime), CAST(0x0000A50E0032FDEA AS DateTime), 1, 1)
INSERT [dbo].[Sam3_FolioCuantificacion] ([FolioCuantificacionID], [FolioAvisoEntradaID], [ProyectoID], [PackingList], [TipoUsoID], [Estatus], [FechaCreacion], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (108, 67, 2, N'Pl230', 2, N'En Proceso Recepción', CAST(0x0000A50E0027C659 AS DateTime), CAST(0x0000A50E0032ED8A AS DateTime), 1, 1)
INSERT [dbo].[Sam3_FolioCuantificacion] ([FolioCuantificacionID], [FolioAvisoEntradaID], [ProyectoID], [PackingList], [TipoUsoID], [Estatus], [FechaCreacion], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (109, 67, 2, N'Pl230', 2, N'En Proceso Recepción', CAST(0x0000A50E002CC22E AS DateTime), CAST(0x0000A50E002CC22E AS DateTime), 1, 1)
INSERT [dbo].[Sam3_FolioCuantificacion] ([FolioCuantificacionID], [FolioAvisoEntradaID], [ProyectoID], [PackingList], [TipoUsoID], [Estatus], [FechaCreacion], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (110, 67, 2, N'Pl230', 2, N'En Proceso Recepción', CAST(0x0000A50E002E92E3 AS DateTime), CAST(0x0000A50E002E92E3 AS DateTime), 1, 1)
INSERT [dbo].[Sam3_FolioCuantificacion] ([FolioCuantificacionID], [FolioAvisoEntradaID], [ProyectoID], [PackingList], [TipoUsoID], [Estatus], [FechaCreacion], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (111, 67, 2, N'Pl230', 2, N'En Proceso Recepción', CAST(0x0000A50E002ED29C AS DateTime), CAST(0x0000A50E002ED29C AS DateTime), 1, 1)
INSERT [dbo].[Sam3_FolioCuantificacion] ([FolioCuantificacionID], [FolioAvisoEntradaID], [ProyectoID], [PackingList], [TipoUsoID], [Estatus], [FechaCreacion], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (112, 67, 2, N'a001', 3, N'En Proceso Recepción', CAST(0x0000A50E00AE742D AS DateTime), CAST(0x0000A50E00AEE39F AS DateTime), 1, 1)
INSERT [dbo].[Sam3_FolioCuantificacion] ([FolioCuantificacionID], [FolioAvisoEntradaID], [ProyectoID], [PackingList], [TipoUsoID], [Estatus], [FechaCreacion], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (113, 67, 2, N'aa090', 2, N'En Proceso Recepción', CAST(0x0000A50E00AF47AA AS DateTime), CAST(0x0000A50E00AFDE74 AS DateTime), 1, 1)
INSERT [dbo].[Sam3_FolioCuantificacion] ([FolioCuantificacionID], [FolioAvisoEntradaID], [ProyectoID], [PackingList], [TipoUsoID], [Estatus], [FechaCreacion], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (114, 53, 2, N'Prueba002', 1, N'En Proceso Recepción', CAST(0x0000A50E00BD3E54 AS DateTime), CAST(0x0000A50E0105A2E2 AS DateTime), 1, 1)
INSERT [dbo].[Sam3_FolioCuantificacion] ([FolioCuantificacionID], [FolioAvisoEntradaID], [ProyectoID], [PackingList], [TipoUsoID], [Estatus], [FechaCreacion], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (115, 67, 2, N'', 1, N'En Proceso Recepción', CAST(0x0000A50E00BDDB2A AS DateTime), CAST(0x0000A50E00BDDB2A AS DateTime), 1, 1)
INSERT [dbo].[Sam3_FolioCuantificacion] ([FolioCuantificacionID], [FolioAvisoEntradaID], [ProyectoID], [PackingList], [TipoUsoID], [Estatus], [FechaCreacion], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (116, 67, 2, N'', 1, N'En Proceso Recepción', CAST(0x0000A50E00BE21E1 AS DateTime), CAST(0x0000A50E00BE21E1 AS DateTime), 1, 1)
INSERT [dbo].[Sam3_FolioCuantificacion] ([FolioCuantificacionID], [FolioAvisoEntradaID], [ProyectoID], [PackingList], [TipoUsoID], [Estatus], [FechaCreacion], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (117, 67, 2, N'', 1, N'En Proceso Recepción', CAST(0x0000A50E00BE8774 AS DateTime), CAST(0x0000A50E00BE8774 AS DateTime), 1, 1)
INSERT [dbo].[Sam3_FolioCuantificacion] ([FolioCuantificacionID], [FolioAvisoEntradaID], [ProyectoID], [PackingList], [TipoUsoID], [Estatus], [FechaCreacion], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (118, 67, 2, N'', 1, N'En Proceso Recepción', CAST(0x0000A50E00C0D24C AS DateTime), CAST(0x0000A50E00C0D24C AS DateTime), 1, 1)
INSERT [dbo].[Sam3_FolioCuantificacion] ([FolioCuantificacionID], [FolioAvisoEntradaID], [ProyectoID], [PackingList], [TipoUsoID], [Estatus], [FechaCreacion], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (119, 67, 1, N'', 1, N'En Proceso Recepción', CAST(0x0000A50E00C1D83F AS DateTime), CAST(0x0000A50E00C1D83F AS DateTime), 1, 1)
INSERT [dbo].[Sam3_FolioCuantificacion] ([FolioCuantificacionID], [FolioAvisoEntradaID], [ProyectoID], [PackingList], [TipoUsoID], [Estatus], [FechaCreacion], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (120, 67, 1, N'', 1, N'En Proceso Recepción', CAST(0x0000A50E00C2CDA9 AS DateTime), CAST(0x0000A50E00C2CDA9 AS DateTime), 1, 1)
INSERT [dbo].[Sam3_FolioCuantificacion] ([FolioCuantificacionID], [FolioAvisoEntradaID], [ProyectoID], [PackingList], [TipoUsoID], [Estatus], [FechaCreacion], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (121, 67, 1, N'', 1, N'En Proceso Recepción', CAST(0x0000A50E00C38FA2 AS DateTime), CAST(0x0000A50E00C38FA2 AS DateTime), 1, 1)
INSERT [dbo].[Sam3_FolioCuantificacion] ([FolioCuantificacionID], [FolioAvisoEntradaID], [ProyectoID], [PackingList], [TipoUsoID], [Estatus], [FechaCreacion], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (122, 67, 1, N'', 1, N'En Proceso Recepción', CAST(0x0000A50E00C44FA8 AS DateTime), CAST(0x0000A50E00C44FA8 AS DateTime), 1, 1)
INSERT [dbo].[Sam3_FolioCuantificacion] ([FolioCuantificacionID], [FolioAvisoEntradaID], [ProyectoID], [PackingList], [TipoUsoID], [Estatus], [FechaCreacion], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (123, 67, 1, N'', 1, N'En Proceso Recepción', CAST(0x0000A50E00C54497 AS DateTime), CAST(0x0000A50E00C54497 AS DateTime), 1, 1)
INSERT [dbo].[Sam3_FolioCuantificacion] ([FolioCuantificacionID], [FolioAvisoEntradaID], [ProyectoID], [PackingList], [TipoUsoID], [Estatus], [FechaCreacion], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (124, 67, 2, N'', 1, N'En Proceso Recepción', CAST(0x0000A50E00C6E575 AS DateTime), CAST(0x0000A50E00C6E575 AS DateTime), 1, 1)
INSERT [dbo].[Sam3_FolioCuantificacion] ([FolioCuantificacionID], [FolioAvisoEntradaID], [ProyectoID], [PackingList], [TipoUsoID], [Estatus], [FechaCreacion], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (125, 67, 2, N'', 1, N'En Proceso Recepción', CAST(0x0000A50E00C6FF48 AS DateTime), CAST(0x0000A50E00C6FF48 AS DateTime), 1, 1)
INSERT [dbo].[Sam3_FolioCuantificacion] ([FolioCuantificacionID], [FolioAvisoEntradaID], [ProyectoID], [PackingList], [TipoUsoID], [Estatus], [FechaCreacion], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (126, 53, 2, N'Prueba001', 1, N'En Proceso Recepción', CAST(0x0000A50E00DF8D6F AS DateTime), CAST(0x0000A50E00DF8D6F AS DateTime), 1, 1)
INSERT [dbo].[Sam3_FolioCuantificacion] ([FolioCuantificacionID], [FolioAvisoEntradaID], [ProyectoID], [PackingList], [TipoUsoID], [Estatus], [FechaCreacion], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (127, 53, 2, N'Prueba001', 1, N'En Proceso Recepción', CAST(0x0000A50E00DFF586 AS DateTime), CAST(0x0000A50E00DFF586 AS DateTime), 1, 1)
INSERT [dbo].[Sam3_FolioCuantificacion] ([FolioCuantificacionID], [FolioAvisoEntradaID], [ProyectoID], [PackingList], [TipoUsoID], [Estatus], [FechaCreacion], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (128, 53, 2, N'Prueba001', 1, N'En Proceso Recepción', CAST(0x0000A50E00E0F7DB AS DateTime), CAST(0x0000A50E00E0F7DB AS DateTime), 1, 1)
INSERT [dbo].[Sam3_FolioCuantificacion] ([FolioCuantificacionID], [FolioAvisoEntradaID], [ProyectoID], [PackingList], [TipoUsoID], [Estatus], [FechaCreacion], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (129, 53, 2, N'', 1, N'En Proceso Recepción', CAST(0x0000A50E00FF91F1 AS DateTime), CAST(0x0000A50E00FF91F1 AS DateTime), 1, 1)
SET IDENTITY_INSERT [dbo].[Sam3_FolioCuantificacion] OFF
SET IDENTITY_INSERT [dbo].[Sam3_ItemCode] ON 

INSERT [dbo].[Sam3_ItemCode] ([ItemCodeID], [ProyectoID], [TipoMaterialID], [Codigo], [ItemCodeCliente], [DescripcionEspanol], [DescripcionIngles], [Peso], [DescripcionInterna], [Diametro1], [Diametro2], [FamiliaAceroID], [Activo], [UsuarioModificacion], [FechaModificacion], [Cantidad], [MM], [ColadaID]) VALUES (1, 1, 2, N'123', N'4ABC', N'Material', N'Material', CAST(18.00 AS Decimal(7, 2)), N'Material', CAST(2.5000 AS Decimal(7, 4)), CAST(3.8000 AS Decimal(7, 4)), 1, 1, NULL, CAST(0x0000A4FA00000000 AS DateTime), 20, 15, 1)
INSERT [dbo].[Sam3_ItemCode] ([ItemCodeID], [ProyectoID], [TipoMaterialID], [Codigo], [ItemCodeCliente], [DescripcionEspanol], [DescripcionIngles], [Peso], [DescripcionInterna], [Diametro1], [Diametro2], [FamiliaAceroID], [Activo], [UsuarioModificacion], [FechaModificacion], [Cantidad], [MM], [ColadaID]) VALUES (2, 2, 2, N'852', N'444', N'Material 2', N'Material 2', CAST(200.00 AS Decimal(7, 2)), N'Material 2', CAST(32.4000 AS Decimal(7, 4)), CAST(9.0000 AS Decimal(7, 4)), 2, 1, 1, CAST(0x0000A4FA00000000 AS DateTime), 2, 32, 1)
INSERT [dbo].[Sam3_ItemCode] ([ItemCodeID], [ProyectoID], [TipoMaterialID], [Codigo], [ItemCodeCliente], [DescripcionEspanol], [DescripcionIngles], [Peso], [DescripcionInterna], [Diametro1], [Diametro2], [FamiliaAceroID], [Activo], [UsuarioModificacion], [FechaModificacion], [Cantidad], [MM], [ColadaID]) VALUES (3, 1, 2, N'432', N'086451', N'Mat 3', N'mat 3', CAST(5.00 AS Decimal(7, 2)), N'mat 3', CAST(2.4000 AS Decimal(7, 4)), CAST(4.2000 AS Decimal(7, 4)), 1, 1, 1, CAST(0x0000A4FB00000000 AS DateTime), 8, 239, 1)
INSERT [dbo].[Sam3_ItemCode] ([ItemCodeID], [ProyectoID], [TipoMaterialID], [Codigo], [ItemCodeCliente], [DescripcionEspanol], [DescripcionIngles], [Peso], [DescripcionInterna], [Diametro1], [Diametro2], [FamiliaAceroID], [Activo], [UsuarioModificacion], [FechaModificacion], [Cantidad], [MM], [ColadaID]) VALUES (4, 1, 1, N'124', N'A4ABC1', N'Material', N'Material', CAST(18.00 AS Decimal(7, 2)), N'Material', CAST(2.5000 AS Decimal(7, 4)), CAST(3.8000 AS Decimal(7, 4)), 1, 1, NULL, CAST(0x0000A4FA00000000 AS DateTime), 20, 15, 1)
INSERT [dbo].[Sam3_ItemCode] ([ItemCodeID], [ProyectoID], [TipoMaterialID], [Codigo], [ItemCodeCliente], [DescripcionEspanol], [DescripcionIngles], [Peso], [DescripcionInterna], [Diametro1], [Diametro2], [FamiliaAceroID], [Activo], [UsuarioModificacion], [FechaModificacion], [Cantidad], [MM], [ColadaID]) VALUES (5, 1, 1, N'853', N'A4441', N'Material 2', N'Material 2', CAST(200.00 AS Decimal(7, 2)), N'Material 2', CAST(32.4000 AS Decimal(7, 4)), CAST(9.0000 AS Decimal(7, 4)), 2, 1, 1, CAST(0x0000A4FA00000000 AS DateTime), 2, 32, 1)
INSERT [dbo].[Sam3_ItemCode] ([ItemCodeID], [ProyectoID], [TipoMaterialID], [Codigo], [ItemCodeCliente], [DescripcionEspanol], [DescripcionIngles], [Peso], [DescripcionInterna], [Diametro1], [Diametro2], [FamiliaAceroID], [Activo], [UsuarioModificacion], [FechaModificacion], [Cantidad], [MM], [ColadaID]) VALUES (6, 1, 1, N'433', N'A0864511', N'Mat 3', N'mat 3', CAST(5.00 AS Decimal(7, 2)), N'mat 3', CAST(2.4000 AS Decimal(7, 4)), CAST(4.2000 AS Decimal(7, 4)), 1, 1, 1, CAST(0x0000A4FB00000000 AS DateTime), 8, 239, 1)
INSERT [dbo].[Sam3_ItemCode] ([ItemCodeID], [ProyectoID], [TipoMaterialID], [Codigo], [ItemCodeCliente], [DescripcionEspanol], [DescripcionIngles], [Peso], [DescripcionInterna], [Diametro1], [Diametro2], [FamiliaAceroID], [Activo], [UsuarioModificacion], [FechaModificacion], [Cantidad], [MM], [ColadaID]) VALUES (7, 2, 1, N'125', N'B4ABC1', N'Material', N'Material', CAST(18.00 AS Decimal(7, 2)), N'Material', CAST(2.5000 AS Decimal(7, 4)), CAST(3.8000 AS Decimal(7, 4)), 1, 1, NULL, CAST(0x0000A4FA00000000 AS DateTime), 20, 15, 1)
INSERT [dbo].[Sam3_ItemCode] ([ItemCodeID], [ProyectoID], [TipoMaterialID], [Codigo], [ItemCodeCliente], [DescripcionEspanol], [DescripcionIngles], [Peso], [DescripcionInterna], [Diametro1], [Diametro2], [FamiliaAceroID], [Activo], [UsuarioModificacion], [FechaModificacion], [Cantidad], [MM], [ColadaID]) VALUES (8, 2, 1, N'854', N'B4441', N'Material 2', N'Material 2', CAST(200.00 AS Decimal(7, 2)), N'Material 2', CAST(32.4000 AS Decimal(7, 4)), CAST(9.0000 AS Decimal(7, 4)), 2, 1, 1, CAST(0x0000A4FA00000000 AS DateTime), 2, 32, 1)
INSERT [dbo].[Sam3_ItemCode] ([ItemCodeID], [ProyectoID], [TipoMaterialID], [Codigo], [ItemCodeCliente], [DescripcionEspanol], [DescripcionIngles], [Peso], [DescripcionInterna], [Diametro1], [Diametro2], [FamiliaAceroID], [Activo], [UsuarioModificacion], [FechaModificacion], [Cantidad], [MM], [ColadaID]) VALUES (9, 2, 1, N'434', N'B0864511', N'Mat 3', N'mat 3', CAST(5.00 AS Decimal(7, 2)), N'mat 3', CAST(2.4000 AS Decimal(7, 4)), CAST(4.2000 AS Decimal(7, 4)), 1, 1, 1, CAST(0x0000A4FB00000000 AS DateTime), 8, 239, 1)
INSERT [dbo].[Sam3_ItemCode] ([ItemCodeID], [ProyectoID], [TipoMaterialID], [Codigo], [ItemCodeCliente], [DescripcionEspanol], [DescripcionIngles], [Peso], [DescripcionInterna], [Diametro1], [Diametro2], [FamiliaAceroID], [Activo], [UsuarioModificacion], [FechaModificacion], [Cantidad], [MM], [ColadaID]) VALUES (10, 2, 1, N'126', N'BA4ABC11', N'Material', N'Material', CAST(18.00 AS Decimal(7, 2)), N'Material', CAST(2.5000 AS Decimal(7, 4)), CAST(3.8000 AS Decimal(7, 4)), 1, 1, NULL, CAST(0x0000A4FA00000000 AS DateTime), 20, 15, 1)
INSERT [dbo].[Sam3_ItemCode] ([ItemCodeID], [ProyectoID], [TipoMaterialID], [Codigo], [ItemCodeCliente], [DescripcionEspanol], [DescripcionIngles], [Peso], [DescripcionInterna], [Diametro1], [Diametro2], [FamiliaAceroID], [Activo], [UsuarioModificacion], [FechaModificacion], [Cantidad], [MM], [ColadaID]) VALUES (11, 2, 1, N'855', N'BA44411', N'Material 2', N'Material 2', CAST(200.00 AS Decimal(7, 2)), N'Material 2', CAST(32.4000 AS Decimal(7, 4)), CAST(9.0000 AS Decimal(7, 4)), 2, 1, 1, CAST(0x0000A4FA00000000 AS DateTime), 2, 32, 1)
INSERT [dbo].[Sam3_ItemCode] ([ItemCodeID], [ProyectoID], [TipoMaterialID], [Codigo], [ItemCodeCliente], [DescripcionEspanol], [DescripcionIngles], [Peso], [DescripcionInterna], [Diametro1], [Diametro2], [FamiliaAceroID], [Activo], [UsuarioModificacion], [FechaModificacion], [Cantidad], [MM], [ColadaID]) VALUES (12, 2, 1, N'435', N'BA08645111', N'Mat 3', N'mat 3', CAST(5.00 AS Decimal(7, 2)), N'mat 3', CAST(2.4000 AS Decimal(7, 4)), CAST(4.2000 AS Decimal(7, 4)), 1, 1, 1, CAST(0x0000A4FB00000000 AS DateTime), 8, 239, 1)
INSERT [dbo].[Sam3_ItemCode] ([ItemCodeID], [ProyectoID], [TipoMaterialID], [Codigo], [ItemCodeCliente], [DescripcionEspanol], [DescripcionIngles], [Peso], [DescripcionInterna], [Diametro1], [Diametro2], [FamiliaAceroID], [Activo], [UsuarioModificacion], [FechaModificacion], [Cantidad], [MM], [ColadaID]) VALUES (13, 1, 2, N'789', NULL, N'Brida', NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, CAST(0x0000A50700B5B7F6 AS DateTime), NULL, NULL, 1)
INSERT [dbo].[Sam3_ItemCode] ([ItemCodeID], [ProyectoID], [TipoMaterialID], [Codigo], [ItemCodeCliente], [DescripcionEspanol], [DescripcionIngles], [Peso], [DescripcionInterna], [Diametro1], [Diametro2], [FamiliaAceroID], [Activo], [UsuarioModificacion], [FechaModificacion], [Cantidad], [MM], [ColadaID]) VALUES (16, 2, 1, N'AJF18486', N'45222', N'Sockolet', N'Sockolet', CAST(12.00 AS Decimal(7, 2)), N'Sockolet', CAST(20.0000 AS Decimal(7, 4)), CAST(50.0000 AS Decimal(7, 4)), 1, 1, 1, CAST(0x0000A50E00C70112 AS DateTime), 150, 18, 1)
INSERT [dbo].[Sam3_ItemCode] ([ItemCodeID], [ProyectoID], [TipoMaterialID], [Codigo], [ItemCodeCliente], [DescripcionEspanol], [DescripcionIngles], [Peso], [DescripcionInterna], [Diametro1], [Diametro2], [FamiliaAceroID], [Activo], [UsuarioModificacion], [FechaModificacion], [Cantidad], [MM], [ColadaID]) VALUES (17, 2, 1, N'AAC957927OOY', N'45222', N'Brida', N'Brida', CAST(12.00 AS Decimal(7, 2)), N'Brida', CAST(10.0000 AS Decimal(7, 4)), CAST(2.0000 AS Decimal(7, 4)), 2, 1, 1, CAST(0x0000A50E00C3A274 AS DateTime), 30, 12, 3)
INSERT [dbo].[Sam3_ItemCode] ([ItemCodeID], [ProyectoID], [TipoMaterialID], [Codigo], [ItemCodeCliente], [DescripcionEspanol], [DescripcionIngles], [Peso], [DescripcionInterna], [Diametro1], [Diametro2], [FamiliaAceroID], [Activo], [UsuarioModificacion], [FechaModificacion], [Cantidad], [MM], [ColadaID]) VALUES (20, 2, 1, N'AJF18485', NULL, N'Sockolet', N'Sockolet', CAST(12.00 AS Decimal(7, 2)), N'Sockolet', CAST(20.0000 AS Decimal(7, 4)), CAST(50.0000 AS Decimal(7, 4)), 1, 1, 1, CAST(0x0000A50E00048274 AS DateTime), 151, 18, 1)
INSERT [dbo].[Sam3_ItemCode] ([ItemCodeID], [ProyectoID], [TipoMaterialID], [Codigo], [ItemCodeCliente], [DescripcionEspanol], [DescripcionIngles], [Peso], [DescripcionInterna], [Diametro1], [Diametro2], [FamiliaAceroID], [Activo], [UsuarioModificacion], [FechaModificacion], [Cantidad], [MM], [ColadaID]) VALUES (21, 1, 1, N'DHU542', NULL, N'Brida21', N'Brida21', CAST(12.00 AS Decimal(7, 2)), N'Brida21', CAST(20.0000 AS Decimal(7, 4)), CAST(50.0000 AS Decimal(7, 4)), 1, 1, 1, CAST(0x0000A50D00B37FF8 AS DateTime), 150, 18, 1)
INSERT [dbo].[Sam3_ItemCode] ([ItemCodeID], [ProyectoID], [TipoMaterialID], [Codigo], [ItemCodeCliente], [DescripcionEspanol], [DescripcionIngles], [Peso], [DescripcionInterna], [Diametro1], [Diametro2], [FamiliaAceroID], [Activo], [UsuarioModificacion], [FechaModificacion], [Cantidad], [MM], [ColadaID]) VALUES (22, 2, 1, N'DHU54211', NULL, N'Sockolet', N'Sockolet', CAST(12.00 AS Decimal(7, 2)), N'Sockolet', CAST(20.0000 AS Decimal(7, 4)), CAST(50.0000 AS Decimal(7, 4)), 1, 1, 1, CAST(0x0000A50E0027D3EF AS DateTime), 150, 18, 1)
INSERT [dbo].[Sam3_ItemCode] ([ItemCodeID], [ProyectoID], [TipoMaterialID], [Codigo], [ItemCodeCliente], [DescripcionEspanol], [DescripcionIngles], [Peso], [DescripcionInterna], [Diametro1], [Diametro2], [FamiliaAceroID], [Activo], [UsuarioModificacion], [FechaModificacion], [Cantidad], [MM], [ColadaID]) VALUES (29, 2, 1, N'ItemCodePrueba11', NULL, N'ItemCodePrueba111', NULL, NULL, NULL, NULL, NULL, 2, 1, 1, CAST(0x0000A50D01407387 AS DateTime), NULL, NULL, 4)
INSERT [dbo].[Sam3_ItemCode] ([ItemCodeID], [ProyectoID], [TipoMaterialID], [Codigo], [ItemCodeCliente], [DescripcionEspanol], [DescripcionIngles], [Peso], [DescripcionInterna], [Diametro1], [Diametro2], [FamiliaAceroID], [Activo], [UsuarioModificacion], [FechaModificacion], [Cantidad], [MM], [ColadaID]) VALUES (31, 2, 1, N'ItemCodePrueba12', NULL, N'ItemCodePrueba12', NULL, NULL, NULL, NULL, NULL, 1, 1, 1, CAST(0x0000A50D01415626 AS DateTime), NULL, NULL, 4)
INSERT [dbo].[Sam3_ItemCode] ([ItemCodeID], [ProyectoID], [TipoMaterialID], [Codigo], [ItemCodeCliente], [DescripcionEspanol], [DescripcionIngles], [Peso], [DescripcionInterna], [Diametro1], [Diametro2], [FamiliaAceroID], [Activo], [UsuarioModificacion], [FechaModificacion], [Cantidad], [MM], [ColadaID]) VALUES (32, 1, 1, N'IT001', NULL, N'IT001', NULL, NULL, NULL, NULL, NULL, 2, 1, 1, CAST(0x0000A50E003307E0 AS DateTime), 10, 55, 4)
INSERT [dbo].[Sam3_ItemCode] ([ItemCodeID], [ProyectoID], [TipoMaterialID], [Codigo], [ItemCodeCliente], [DescripcionEspanol], [DescripcionIngles], [Peso], [DescripcionInterna], [Diametro1], [Diametro2], [FamiliaAceroID], [Activo], [UsuarioModificacion], [FechaModificacion], [Cantidad], [MM], [ColadaID]) VALUES (33, 1, 2, N'PRB-001', NULL, N'Material prueba', NULL, NULL, NULL, NULL, NULL, 1, 1, 1, CAST(0x0000A50E00DAAFAC AS DateTime), 15, 0, 3)
INSERT [dbo].[Sam3_ItemCode] ([ItemCodeID], [ProyectoID], [TipoMaterialID], [Codigo], [ItemCodeCliente], [DescripcionEspanol], [DescripcionIngles], [Peso], [DescripcionInterna], [Diametro1], [Diametro2], [FamiliaAceroID], [Activo], [UsuarioModificacion], [FechaModificacion], [Cantidad], [MM], [ColadaID]) VALUES (34, 1, 2, N'PRB-002', NULL, N'Material Prueba', NULL, NULL, NULL, NULL, NULL, 1, 1, 1, CAST(0x0000A50E00DAAB78 AS DateTime), 10, 0, 3)
INSERT [dbo].[Sam3_ItemCode] ([ItemCodeID], [ProyectoID], [TipoMaterialID], [Codigo], [ItemCodeCliente], [DescripcionEspanol], [DescripcionIngles], [Peso], [DescripcionInterna], [Diametro1], [Diametro2], [FamiliaAceroID], [Activo], [UsuarioModificacion], [FechaModificacion], [Cantidad], [MM], [ColadaID]) VALUES (35, 1, 2, N'PRB-003', NULL, N'Prueba', NULL, NULL, NULL, NULL, NULL, 1, 1, 1, CAST(0x0000A50E00DAB13A AS DateTime), 2, 0, 3)
INSERT [dbo].[Sam3_ItemCode] ([ItemCodeID], [ProyectoID], [TipoMaterialID], [Codigo], [ItemCodeCliente], [DescripcionEspanol], [DescripcionIngles], [Peso], [DescripcionInterna], [Diametro1], [Diametro2], [FamiliaAceroID], [Activo], [UsuarioModificacion], [FechaModificacion], [Cantidad], [MM], [ColadaID]) VALUES (36, 1, 2, N'PRB-004', NULL, N'prueba', NULL, NULL, NULL, NULL, NULL, 1, 1, 1, CAST(0x0000A50E00C14E99 AS DateTime), NULL, NULL, 3)
SET IDENTITY_INSERT [dbo].[Sam3_ItemCode] OFF
SET IDENTITY_INSERT [dbo].[Sam3_ItemCodeSteelgo] ON 

INSERT [dbo].[Sam3_ItemCodeSteelgo] ([ItemCodeSteelgoID], [DescripcionEspanol], [DescripcionIngles], [Peso], [Diametro1], [Diametro2], [FamiliaAceroID], [Activo], [UsuarioModificacion], [FechaModificacion], [Area], [Cedula], [Codigo]) VALUES (1, N'ICS 1', N'ICS 1', CAST(0.00 AS Decimal(7, 2)), CAST(1.2000 AS Decimal(7, 4)), CAST(2.8000 AS Decimal(7, 4)), 1, 1, 1, CAST(0x0000A50E00C3A27E AS DateTime), 1, N'1', N'C-0001')
INSERT [dbo].[Sam3_ItemCodeSteelgo] ([ItemCodeSteelgoID], [DescripcionEspanol], [DescripcionIngles], [Peso], [Diametro1], [Diametro2], [FamiliaAceroID], [Activo], [UsuarioModificacion], [FechaModificacion], [Area], [Cedula], [Codigo]) VALUES (2, N'Brida21', N'Brida21', CAST(0.00 AS Decimal(7, 2)), CAST(20.0000 AS Decimal(7, 4)), CAST(50.0000 AS Decimal(7, 4)), 2, 1, 1, CAST(0x0000A50E00AEF02D AS DateTime), 1, N'1', N'C-0002')
INSERT [dbo].[Sam3_ItemCodeSteelgo] ([ItemCodeSteelgoID], [DescripcionEspanol], [DescripcionIngles], [Peso], [Diametro1], [Diametro2], [FamiliaAceroID], [Activo], [UsuarioModificacion], [FechaModificacion], [Area], [Cedula], [Codigo]) VALUES (3, N'ICS3', N'ICS3', CAST(0.00 AS Decimal(7, 2)), CAST(6.0000 AS Decimal(7, 4)), CAST(3.0000 AS Decimal(7, 4)), 1, 1, 1, CAST(0x0000A50E00048274 AS DateTime), 1, N'cedula 3', N'C-0003')
INSERT [dbo].[Sam3_ItemCodeSteelgo] ([ItemCodeSteelgoID], [DescripcionEspanol], [DescripcionIngles], [Peso], [Diametro1], [Diametro2], [FamiliaAceroID], [Activo], [UsuarioModificacion], [FechaModificacion], [Area], [Cedula], [Codigo]) VALUES (4, N'STEELGO001', N'STEELGO001', CAST(0.00 AS Decimal(7, 2)), CAST(1.0000 AS Decimal(7, 4)), CAST(2.0000 AS Decimal(7, 4)), 1, 1, 1, CAST(0x0000A50E00C70113 AS DateTime), 14, N'AA001', N'BB001')
INSERT [dbo].[Sam3_ItemCodeSteelgo] ([ItemCodeSteelgoID], [DescripcionEspanol], [DescripcionIngles], [Peso], [Diametro1], [Diametro2], [FamiliaAceroID], [Activo], [UsuarioModificacion], [FechaModificacion], [Area], [Cedula], [Codigo]) VALUES (5, N'Item Pruebas', N'Item Pruebas', CAST(0.00 AS Decimal(7, 2)), CAST(10.0000 AS Decimal(7, 4)), CAST(5.0000 AS Decimal(7, 4)), 1, 1, 1, CAST(0x0000A50E00DAB13A AS DateTime), 105, N'CS', N'ITCS-PRB-001')
SET IDENTITY_INSERT [dbo].[Sam3_ItemCodeSteelgo] OFF
SET IDENTITY_INSERT [dbo].[Sam3_MenuContextual] ON 

INSERT [dbo].[Sam3_MenuContextual] ([MenuID], [Texto], [Liga], [Activo], [UsuarioModificacion], [FechaModificacion], [Descripcion]) VALUES (1, N'Contextual 1', N'Home/Index.cshtml', 1, NULL, NULL, NULL)
INSERT [dbo].[Sam3_MenuContextual] ([MenuID], [Texto], [Liga], [Activo], [UsuarioModificacion], [FechaModificacion], [Descripcion]) VALUES (2, N'Contextual 2', N'Home/Index.cshtml', 1, NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[Sam3_MenuContextual] OFF
SET IDENTITY_INSERT [dbo].[Sam3_MenuGeneral] ON 

INSERT [dbo].[Sam3_MenuGeneral] ([MenuID], [Texto], [Liga], [IDPadre], [Activo], [UsuarioModificacion], [FechaModificacion], [Icono], [Nivel], [Descripcion]) VALUES (1, N'menuLabel0001', N'/Home/Landing', 0, 1, NULL, NULL, N'icn dashboard', 0, N'Inicio')
INSERT [dbo].[Sam3_MenuGeneral] ([MenuID], [Texto], [Liga], [IDPadre], [Activo], [UsuarioModificacion], [FechaModificacion], [Icono], [Nivel], [Descripcion]) VALUES (2, N'menuLabel0002', N'#', 0, 1, NULL, NULL, N'icn transactions', 0, N'Transacciones')
INSERT [dbo].[Sam3_MenuGeneral] ([MenuID], [Texto], [Liga], [IDPadre], [Activo], [UsuarioModificacion], [FechaModificacion], [Icono], [Nivel], [Descripcion]) VALUES (5, N'menuLabel0005', N'#', 2, 1, NULL, NULL, N'', 1, N'Administración')
INSERT [dbo].[Sam3_MenuGeneral] ([MenuID], [Texto], [Liga], [IDPadre], [Activo], [UsuarioModificacion], [FechaModificacion], [Icono], [Nivel], [Descripcion]) VALUES (6, N'menuLabel0006', N'#', 2, 1, NULL, NULL, N'', 1, N'Materiales')
INSERT [dbo].[Sam3_MenuGeneral] ([MenuID], [Texto], [Liga], [IDPadre], [Activo], [UsuarioModificacion], [FechaModificacion], [Icono], [Nivel], [Descripcion]) VALUES (7, N'menuLabel0007', N'/AvisoLlegada/DashboardAvisoLlegada', 5, 1, NULL, NULL, N'', 2, N'Dashboard de Avisos de Entrada')
INSERT [dbo].[Sam3_MenuGeneral] ([MenuID], [Texto], [Liga], [IDPadre], [Activo], [UsuarioModificacion], [FechaModificacion], [Icono], [Nivel], [Descripcion]) VALUES (8, N'menuLabel0008', N'/AvisoLlegada/ListadoAvisoLlegada', 7, 1, NULL, NULL, N'', 3, N'Avisos de Entrada')
INSERT [dbo].[Sam3_MenuGeneral] ([MenuID], [Texto], [Liga], [IDPadre], [Activo], [UsuarioModificacion], [FechaModificacion], [Icono], [Nivel], [Descripcion]) VALUES (10, N'menuLabel0010', N'/AvisoLlegada/DetalleAvisoLlegada', 7, 1, NULL, NULL, N'', 3, N'Generación de Aviso de Entrada')
INSERT [dbo].[Sam3_MenuGeneral] ([MenuID], [Texto], [Liga], [IDPadre], [Activo], [UsuarioModificacion], [FechaModificacion], [Icono], [Nivel], [Descripcion]) VALUES (11, N'menuLabel0011', N'/AvisoLlegada/AutorizarPermiso', 7, 1, NULL, NULL, N'', 3, N'Autorización de Aviso de Entrada')
INSERT [dbo].[Sam3_MenuGeneral] ([MenuID], [Texto], [Liga], [IDPadre], [Activo], [UsuarioModificacion], [FechaModificacion], [Icono], [Nivel], [Descripcion]) VALUES (13, N'menuLabel0013', N'/EntradaMaterial/DashboardLlegadaMaterial', 6, 1, NULL, NULL, N'', 2, N'Dashboard de Llegada de Material')
INSERT [dbo].[Sam3_MenuGeneral] ([MenuID], [Texto], [Liga], [IDPadre], [Activo], [UsuarioModificacion], [FechaModificacion], [Icono], [Nivel], [Descripcion]) VALUES (14, N'menuLabel0014', N'/EntradaMaterial/ListadoLlegadaMaterial', 13, 1, NULL, NULL, N'', 3, N'Llegadas de Material')
INSERT [dbo].[Sam3_MenuGeneral] ([MenuID], [Texto], [Liga], [IDPadre], [Activo], [UsuarioModificacion], [FechaModificacion], [Icono], [Nivel], [Descripcion]) VALUES (16, N'menuLabel0016', N'/EntradaMaterial/DetalleLlegadaMaterial', 13, 1, NULL, NULL, N'', 3, N'Generación de Llegada de Material')
INSERT [dbo].[Sam3_MenuGeneral] ([MenuID], [Texto], [Liga], [IDPadre], [Activo], [UsuarioModificacion], [FechaModificacion], [Icono], [Nivel], [Descripcion]) VALUES (17, N'menuLabel0017', N'/EntradaMaterial/PaseDeSalida', 13, 1, NULL, NULL, N'', 3, N'Generación de Pase de Salida')
INSERT [dbo].[Sam3_MenuGeneral] ([MenuID], [Texto], [Liga], [IDPadre], [Activo], [UsuarioModificacion], [FechaModificacion], [Icono], [Nivel], [Descripcion]) VALUES (18, N'menuLabel0018', N'/DespachoMaterial/DashboardDespachoMaterial', 6, 0, NULL, NULL, N'', 2, N'Dashboard de Despacho de Material')
INSERT [dbo].[Sam3_MenuGeneral] ([MenuID], [Texto], [Liga], [IDPadre], [Activo], [UsuarioModificacion], [FechaModificacion], [Icono], [Nivel], [Descripcion]) VALUES (19, N'menuLabel0019', N'/DespachoMaterial/ListadoDespachoMaterial', 18, 0, NULL, NULL, N'', 3, N'Despachos de Materiales')
INSERT [dbo].[Sam3_MenuGeneral] ([MenuID], [Texto], [Liga], [IDPadre], [Activo], [UsuarioModificacion], [FechaModificacion], [Icono], [Nivel], [Descripcion]) VALUES (20, N'menuLabel0020', N'/DespachoMaterial/Cuantificacion', 18, 0, NULL, NULL, N'', 3, N'Cuantificación')
INSERT [dbo].[Sam3_MenuGeneral] ([MenuID], [Texto], [Liga], [IDPadre], [Activo], [UsuarioModificacion], [FechaModificacion], [Icono], [Nivel], [Descripcion]) VALUES (21, N'menuLabel0021', N'/DespachoMaterial/ComplementoRecepcion', 18, 0, NULL, NULL, N'', 3, N'Complemento de la Recepción')
INSERT [dbo].[Sam3_MenuGeneral] ([MenuID], [Texto], [Liga], [IDPadre], [Activo], [UsuarioModificacion], [FechaModificacion], [Icono], [Nivel], [Descripcion]) VALUES (22, N'menuLabel0020', N'/Cuantificacion/Cuantificacion', 7, 1, NULL, NULL, N'', 3, N'Cuantificacion')
SET IDENTITY_INSERT [dbo].[Sam3_MenuGeneral] OFF
SET IDENTITY_INSERT [dbo].[Sam3_Notificacion] ON 

INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2, 1, 1, 1, N'El reporte de cemex', CAST(0x0000A4AD00F21DD7 AS DateTime), CAST(0x0000A4AD00F21DD7 AS DateTime), 1, 0, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3, 1, 1, 1, N'prueba', CAST(0x0000A4AD0111FAFE AS DateTime), CAST(0x0000A4AD0111FAFE AS DateTime), 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (4, 1, 1, 1, N'prueba', CAST(0x0000A4AD0112CF37 AS DateTime), CAST(0x0000A4AD0112CF37 AS DateTime), 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (5, 5, 5, 1, N'prueba', CAST(0x0000A4AD0112D07C AS DateTime), CAST(0x0000A4AD0112D07C AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (6, 5, 5, 1, N'prueba', CAST(0x0000A4AD01133F09 AS DateTime), CAST(0x0000A4AD01133F09 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (7, 5, 5, 1, N'prueba', CAST(0x0000A4AD01133F15 AS DateTime), CAST(0x0000A4AD01133F15 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (8, 2, 1, 1, N'prueba', CAST(0x0000A4AD01137E33 AS DateTime), CAST(0x0000A4AD01137E33 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (9, 2, 1, 1, N'prueba', CAST(0x0000A4AD01137F71 AS DateTime), CAST(0x0000A4AD01137F71 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (10, 2, 1, 1, N'prueba', CAST(0x0000A4AD01137F74 AS DateTime), CAST(0x0000A4AD01137F74 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (11, 2, 1, 1, N'prueba', CAST(0x0000A4AD01137F77 AS DateTime), CAST(0x0000A4AD01137F77 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (12, 2, 1, 1, N'prueba', CAST(0x0000A4AD01137F79 AS DateTime), CAST(0x0000A4AD01137F79 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (13, 2, 1, 1, N'prueba', CAST(0x0000A4AD01137F7A AS DateTime), CAST(0x0000A4AD01137F7A AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (14, 2, 1, 1, N'prueba', CAST(0x0000A4AD01137F7C AS DateTime), CAST(0x0000A4AD01137F7C AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (15, 2, 1, 1, N'prueba', CAST(0x0000A4AD01137F88 AS DateTime), CAST(0x0000A4AD01137F88 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (16, 2, 1, 1, N'prueba', CAST(0x0000A4AD01137F8A AS DateTime), CAST(0x0000A4AD01137F8A AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (17, 2, 1, 1, N'prueba', CAST(0x0000A4AD01137F8B AS DateTime), CAST(0x0000A4AD01137F8B AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (18, 2, 1, 1, N'prueba', CAST(0x0000A4AD01137F8D AS DateTime), CAST(0x0000A4AD01137F8D AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (19, 2, 1, 1, N'prueba', CAST(0x0000A4AE00A4CF01 AS DateTime), CAST(0x0000A4AE00A4CF01 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (20, 2, 1, 1, N'prueba', CAST(0x0000A4AE00A4D311 AS DateTime), CAST(0x0000A4AE00A4D311 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (21, 2, 1, 1, N'prueba', CAST(0x0000A4AE00A4D581 AS DateTime), CAST(0x0000A4AE00A4D581 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (22, 2, 1, 1, N'prueba', CAST(0x0000A4AE00A4D743 AS DateTime), CAST(0x0000A4AE00A4D743 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (23, 2, 1, 1, N'prueba', CAST(0x0000A4AE00A4D887 AS DateTime), CAST(0x0000A4AE00A4D887 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (24, 2, 1, 1, N'prueba', CAST(0x0000A4AE00A4D9CA AS DateTime), CAST(0x0000A4AE00A4D9CA AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (25, 2, 1, 1, N'prueba', CAST(0x0000A4AE00A4DB15 AS DateTime), CAST(0x0000A4AE00A4DB15 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (26, 2, 1, 1, N'prueba', CAST(0x0000A4AE00A4DC80 AS DateTime), CAST(0x0000A4AE00A4DC80 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (27, 2, 1, 1, N'prueba', CAST(0x0000A4AE00A4DDE0 AS DateTime), CAST(0x0000A4AE00A4DDE0 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (28, 2, 1, 1, N'prueba', CAST(0x0000A4AE00A4DF4D AS DateTime), CAST(0x0000A4AE00A4DF4D AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (29, 2, 1, 1, N'prueba', CAST(0x0000A4AE00A4E0C1 AS DateTime), CAST(0x0000A4AE00A4E0C1 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (30, 2, 1, 1, N'prueba', CAST(0x0000A4AE00AE5B34 AS DateTime), CAST(0x0000A4AE00AE5B34 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (31, 2, 1, 1, N'prueba', CAST(0x0000A4AE00AE5D84 AS DateTime), CAST(0x0000A4AE00AE5D84 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (32, 2, 1, 1, N'prueba', CAST(0x0000A4AE00AE5ED6 AS DateTime), CAST(0x0000A4AE00AE5ED6 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (33, 2, 1, 1, N'prueba', CAST(0x0000A4AE00AE5FED AS DateTime), CAST(0x0000A4AE00AE5FED AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (34, 2, 1, 1, N'prueba', CAST(0x0000A4AE00AE611F AS DateTime), CAST(0x0000A4AE00AE611F AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (35, 2, 1, 1, N'prueba', CAST(0x0000A4AE00AE6266 AS DateTime), CAST(0x0000A4AE00AE6266 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (36, 2, 1, 1, N'prueba', CAST(0x0000A4AE00AE6396 AS DateTime), CAST(0x0000A4AE00AE6396 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (37, 2, 1, 1, N'prueba', CAST(0x0000A4AE00AE64CC AS DateTime), CAST(0x0000A4AE00AE64CC AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (38, 2, 1, 1, N'prueba', CAST(0x0000A4AE00AE65FA AS DateTime), CAST(0x0000A4AE00AE65FA AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (39, 2, 1, 1, N'prueba', CAST(0x0000A4AE00AE672B AS DateTime), CAST(0x0000A4AE00AE672B AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (40, 2, 1, 1, N'prueba', CAST(0x0000A4AE00AE686A AS DateTime), CAST(0x0000A4AE00AE686A AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (41, 2, 1, 1, N'prueba', CAST(0x0000A4AE00AF9E00 AS DateTime), CAST(0x0000A4AE00AF9E00 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (42, 2, 1, 1, N'prueba', CAST(0x0000A4AE00AF9E06 AS DateTime), CAST(0x0000A4AE00AF9E06 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (43, 2, 1, 1, N'prueba', CAST(0x0000A4AE00AF9E0D AS DateTime), CAST(0x0000A4AE00AF9E0D AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (44, 2, 1, 1, N'prueba', CAST(0x0000A4AE00AF9E0F AS DateTime), CAST(0x0000A4AE00AF9E0F AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (45, 2, 1, 1, N'prueba', CAST(0x0000A4AE00AF9E11 AS DateTime), CAST(0x0000A4AE00AF9E11 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (46, 2, 1, 1, N'prueba', CAST(0x0000A4AE00AF9E12 AS DateTime), CAST(0x0000A4AE00AF9E12 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (47, 2, 1, 1, N'prueba', CAST(0x0000A4AE00AF9E13 AS DateTime), CAST(0x0000A4AE00AF9E13 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (48, 2, 1, 1, N'prueba', CAST(0x0000A4AE00AF9E17 AS DateTime), CAST(0x0000A4AE00AF9E17 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (49, 2, 1, 1, N'prueba', CAST(0x0000A4AE00AF9E19 AS DateTime), CAST(0x0000A4AE00AF9E19 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (50, 2, 1, 1, N'prueba', CAST(0x0000A4AE00AF9E1E AS DateTime), CAST(0x0000A4AE00AF9E1E AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (51, 2, 1, 1, N'prueba', CAST(0x0000A4AE00AF9E20 AS DateTime), CAST(0x0000A4AE00AF9E20 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (52, 2, 1, 1, N'prueba', CAST(0x0000A4AE00BF260D AS DateTime), CAST(0x0000A4AE00BF260D AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (53, 2, 1, 1, N'prueba', CAST(0x0000A4AE00BF2825 AS DateTime), CAST(0x0000A4AE00BF2825 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (54, 2, 1, 1, N'prueba', CAST(0x0000A4AE00BF2909 AS DateTime), CAST(0x0000A4AE00BF2909 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (55, 2, 1, 1, N'prueba', CAST(0x0000A4AE00BF29D4 AS DateTime), CAST(0x0000A4AE00BF29D4 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (56, 2, 1, 1, N'prueba', CAST(0x0000A4AE00BF2A0F AS DateTime), CAST(0x0000A4AE00BF2A0F AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (57, 2, 1, 1, N'prueba', CAST(0x0000A4AE00BF2AF8 AS DateTime), CAST(0x0000A4AE00BF2AF8 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (58, 2, 1, 1, N'prueba', CAST(0x0000A4AE00BF2AFC AS DateTime), CAST(0x0000A4AE00BF2AFC AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (59, 2, 1, 1, N'prueba', CAST(0x0000A4AE00BF2AFF AS DateTime), CAST(0x0000A4AE00BF2AFF AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (60, 2, 1, 1, N'prueba', CAST(0x0000A4AE00BF2B02 AS DateTime), CAST(0x0000A4AE00BF2B02 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (61, 2, 1, 1, N'prueba', CAST(0x0000A4AE00BF2B04 AS DateTime), CAST(0x0000A4AE00BF2B04 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (62, 2, 1, 1, N'prueba', CAST(0x0000A4AE00BF2B1A AS DateTime), CAST(0x0000A4AE00BF2B1A AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (63, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C122F1 AS DateTime), CAST(0x0000A4AE00C122F1 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (64, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C123EB AS DateTime), CAST(0x0000A4AE00C123EB AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (65, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C123EF AS DateTime), CAST(0x0000A4AE00C123EF AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (66, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C123F2 AS DateTime), CAST(0x0000A4AE00C123F2 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (67, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C123F3 AS DateTime), CAST(0x0000A4AE00C123F3 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (68, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C123F4 AS DateTime), CAST(0x0000A4AE00C123F4 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (69, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C123F6 AS DateTime), CAST(0x0000A4AE00C123F6 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (70, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C123F7 AS DateTime), CAST(0x0000A4AE00C123F7 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (71, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C123F8 AS DateTime), CAST(0x0000A4AE00C123F8 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (72, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C123FA AS DateTime), CAST(0x0000A4AE00C123FA AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (73, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C123FB AS DateTime), CAST(0x0000A4AE00C123FB AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (74, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C4FF3E AS DateTime), CAST(0x0000A4AE00C4FF3E AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (75, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C4FFD2 AS DateTime), CAST(0x0000A4AE00C4FFD2 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (76, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C4FFD4 AS DateTime), CAST(0x0000A4AE00C4FFD4 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (77, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C4FFD6 AS DateTime), CAST(0x0000A4AE00C4FFD6 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (78, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C4FFDE AS DateTime), CAST(0x0000A4AE00C4FFDE AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (79, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C4FFE1 AS DateTime), CAST(0x0000A4AE00C4FFE1 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (80, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C4FFE2 AS DateTime), CAST(0x0000A4AE00C4FFE2 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (81, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C4FFE3 AS DateTime), CAST(0x0000A4AE00C4FFE3 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (82, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C4FFE4 AS DateTime), CAST(0x0000A4AE00C4FFE4 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (83, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C4FFE5 AS DateTime), CAST(0x0000A4AE00C4FFE5 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (84, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C4FFE6 AS DateTime), CAST(0x0000A4AE00C4FFE6 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (85, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C545D3 AS DateTime), CAST(0x0000A4AE00C545D3 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (86, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C54CB9 AS DateTime), CAST(0x0000A4AE00C54CB9 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (87, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C54CC0 AS DateTime), CAST(0x0000A4AE00C54CC0 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (88, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C54CC2 AS DateTime), CAST(0x0000A4AE00C54CC2 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (89, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C54CC4 AS DateTime), CAST(0x0000A4AE00C54CC4 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (90, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C54CC5 AS DateTime), CAST(0x0000A4AE00C54CC5 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (91, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C54CC7 AS DateTime), CAST(0x0000A4AE00C54CC7 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (92, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C54CC8 AS DateTime), CAST(0x0000A4AE00C54CC8 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (93, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C54CCA AS DateTime), CAST(0x0000A4AE00C54CCA AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (94, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C54CCD AS DateTime), CAST(0x0000A4AE00C54CCD AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (95, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C54CD1 AS DateTime), CAST(0x0000A4AE00C54CD1 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (96, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C5B01B AS DateTime), CAST(0x0000A4AE00C5B01B AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (97, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C5B114 AS DateTime), CAST(0x0000A4AE00C5B114 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (98, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C5B118 AS DateTime), CAST(0x0000A4AE00C5B118 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (99, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C5B119 AS DateTime), CAST(0x0000A4AE00C5B119 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (100, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C5B11A AS DateTime), CAST(0x0000A4AE00C5B11A AS DateTime), 0, 1, NULL, NULL)
GO
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (101, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C5B11C AS DateTime), CAST(0x0000A4AE00C5B11C AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (102, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C5B11D AS DateTime), CAST(0x0000A4AE00C5B11D AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (103, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C5B11E AS DateTime), CAST(0x0000A4AE00C5B11E AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (104, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C5B120 AS DateTime), CAST(0x0000A4AE00C5B120 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (105, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C5B121 AS DateTime), CAST(0x0000A4AE00C5B121 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (106, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C5B125 AS DateTime), CAST(0x0000A4AE00C5B125 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (107, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C6128F AS DateTime), CAST(0x0000A4AE00C6128F AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (108, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C6138E AS DateTime), CAST(0x0000A4AE00C6138E AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (109, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C61392 AS DateTime), CAST(0x0000A4AE00C61392 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (110, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C61397 AS DateTime), CAST(0x0000A4AE00C61397 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (111, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C6139A AS DateTime), CAST(0x0000A4AE00C6139A AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (112, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C6139B AS DateTime), CAST(0x0000A4AE00C6139B AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (113, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C6139C AS DateTime), CAST(0x0000A4AE00C6139C AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (114, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C6139D AS DateTime), CAST(0x0000A4AE00C6139D AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (115, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C6139E AS DateTime), CAST(0x0000A4AE00C6139E AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (116, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C6139F AS DateTime), CAST(0x0000A4AE00C6139F AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (117, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C613A0 AS DateTime), CAST(0x0000A4AE00C613A0 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (118, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C67132 AS DateTime), CAST(0x0000A4AE00C67132 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (119, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C67182 AS DateTime), CAST(0x0000A4AE00C67182 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (120, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C67184 AS DateTime), CAST(0x0000A4AE00C67184 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (121, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C67185 AS DateTime), CAST(0x0000A4AE00C67185 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (122, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C67186 AS DateTime), CAST(0x0000A4AE00C67186 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (123, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C67188 AS DateTime), CAST(0x0000A4AE00C67188 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (124, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C6718A AS DateTime), CAST(0x0000A4AE00C6718A AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (125, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C6718D AS DateTime), CAST(0x0000A4AE00C6718D AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (126, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C67193 AS DateTime), CAST(0x0000A4AE00C67193 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (127, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C67196 AS DateTime), CAST(0x0000A4AE00C67196 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (128, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C67197 AS DateTime), CAST(0x0000A4AE00C67197 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (129, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C69ADA AS DateTime), CAST(0x0000A4AE00C69ADA AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (130, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C69FB5 AS DateTime), CAST(0x0000A4AE00C69FB5 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (131, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C69FBA AS DateTime), CAST(0x0000A4AE00C69FBA AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (132, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C69FBC AS DateTime), CAST(0x0000A4AE00C69FBC AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (133, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C69FBC AS DateTime), CAST(0x0000A4AE00C69FBC AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (134, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C69FBD AS DateTime), CAST(0x0000A4AE00C69FBD AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (135, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C69FBE AS DateTime), CAST(0x0000A4AE00C69FBE AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (136, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C69FBF AS DateTime), CAST(0x0000A4AE00C69FBF AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (137, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C69FC0 AS DateTime), CAST(0x0000A4AE00C69FC0 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (138, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C69FC1 AS DateTime), CAST(0x0000A4AE00C69FC1 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (139, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C69FC2 AS DateTime), CAST(0x0000A4AE00C69FC2 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (140, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C6B983 AS DateTime), CAST(0x0000A4AE00C6B983 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (141, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C6B985 AS DateTime), CAST(0x0000A4AE00C6B985 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (142, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C6B989 AS DateTime), CAST(0x0000A4AE00C6B989 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (143, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C6B98D AS DateTime), CAST(0x0000A4AE00C6B98D AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (144, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C6B98E AS DateTime), CAST(0x0000A4AE00C6B98E AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (145, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C6B990 AS DateTime), CAST(0x0000A4AE00C6B990 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (146, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C6B991 AS DateTime), CAST(0x0000A4AE00C6B991 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (147, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C6B992 AS DateTime), CAST(0x0000A4AE00C6B992 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (148, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C6B993 AS DateTime), CAST(0x0000A4AE00C6B993 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (149, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C6B994 AS DateTime), CAST(0x0000A4AE00C6B994 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (150, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C6B995 AS DateTime), CAST(0x0000A4AE00C6B995 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (151, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C6F5B8 AS DateTime), CAST(0x0000A4AE00C6F5B8 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (152, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C6F5BA AS DateTime), CAST(0x0000A4AE00C6F5BA AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (153, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C6F5BC AS DateTime), CAST(0x0000A4AE00C6F5BC AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (154, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C6F5BE AS DateTime), CAST(0x0000A4AE00C6F5BE AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (155, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C6F5C3 AS DateTime), CAST(0x0000A4AE00C6F5C3 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (156, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C6F5C4 AS DateTime), CAST(0x0000A4AE00C6F5C4 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (157, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C6F5C5 AS DateTime), CAST(0x0000A4AE00C6F5C5 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (158, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C6F5C6 AS DateTime), CAST(0x0000A4AE00C6F5C6 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (159, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C6F5CA AS DateTime), CAST(0x0000A4AE00C6F5CA AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (160, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C6F5DF AS DateTime), CAST(0x0000A4AE00C6F5DF AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (161, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C6F5E3 AS DateTime), CAST(0x0000A4AE00C6F5E3 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (162, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C712CD AS DateTime), CAST(0x0000A4AE00C712CD AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (163, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C71312 AS DateTime), CAST(0x0000A4AE00C71312 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (164, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C71314 AS DateTime), CAST(0x0000A4AE00C71314 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (165, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C71315 AS DateTime), CAST(0x0000A4AE00C71315 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (166, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C71316 AS DateTime), CAST(0x0000A4AE00C71316 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (167, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C71317 AS DateTime), CAST(0x0000A4AE00C71317 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (168, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C71318 AS DateTime), CAST(0x0000A4AE00C71318 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (169, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C71319 AS DateTime), CAST(0x0000A4AE00C71319 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (170, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C7131A AS DateTime), CAST(0x0000A4AE00C7131A AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (171, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C7131B AS DateTime), CAST(0x0000A4AE00C7131B AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (172, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C7131B AS DateTime), CAST(0x0000A4AE00C7131B AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (173, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C7AAC1 AS DateTime), CAST(0x0000A4AE00C7AAC1 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (174, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C7AB08 AS DateTime), CAST(0x0000A4AE00C7AB08 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (175, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C7AB10 AS DateTime), CAST(0x0000A4AE00C7AB10 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (176, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C7AB12 AS DateTime), CAST(0x0000A4AE00C7AB12 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (177, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C7AB13 AS DateTime), CAST(0x0000A4AE00C7AB13 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (178, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C7AB13 AS DateTime), CAST(0x0000A4AE00C7AB13 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (179, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C7AB14 AS DateTime), CAST(0x0000A4AE00C7AB14 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (180, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C7AB15 AS DateTime), CAST(0x0000A4AE00C7AB15 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (181, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C7AB16 AS DateTime), CAST(0x0000A4AE00C7AB16 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (182, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C7AB18 AS DateTime), CAST(0x0000A4AE00C7AB18 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (183, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C7AB19 AS DateTime), CAST(0x0000A4AE00C7AB19 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (184, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C84202 AS DateTime), CAST(0x0000A4AE00C84202 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (185, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C84C36 AS DateTime), CAST(0x0000A4AE00C84C36 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (186, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C84C65 AS DateTime), CAST(0x0000A4AE00C84C65 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (187, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C84C66 AS DateTime), CAST(0x0000A4AE00C84C66 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (188, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C84C67 AS DateTime), CAST(0x0000A4AE00C84C67 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (189, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C84C68 AS DateTime), CAST(0x0000A4AE00C84C68 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (190, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C84C69 AS DateTime), CAST(0x0000A4AE00C84C69 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (191, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C84C70 AS DateTime), CAST(0x0000A4AE00C84C70 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (192, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C84C75 AS DateTime), CAST(0x0000A4AE00C84C75 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (193, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C84C78 AS DateTime), CAST(0x0000A4AE00C84C78 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (194, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C84C79 AS DateTime), CAST(0x0000A4AE00C84C79 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (195, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C892D8 AS DateTime), CAST(0x0000A4AE00C892D8 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (196, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C892E1 AS DateTime), CAST(0x0000A4AE00C892E1 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (197, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C892E5 AS DateTime), CAST(0x0000A4AE00C892E5 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (198, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C892E6 AS DateTime), CAST(0x0000A4AE00C892E6 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (199, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C892EB AS DateTime), CAST(0x0000A4AE00C892EB AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (200, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C892EE AS DateTime), CAST(0x0000A4AE00C892EE AS DateTime), 0, 1, NULL, NULL)
GO
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (201, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C892EE AS DateTime), CAST(0x0000A4AE00C892EE AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (202, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C892EF AS DateTime), CAST(0x0000A4AE00C892EF AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (203, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C892F1 AS DateTime), CAST(0x0000A4AE00C892F1 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (204, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C892F1 AS DateTime), CAST(0x0000A4AE00C892F1 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (205, 2, 1, 1, N'prueba', CAST(0x0000A4AE00C892F2 AS DateTime), CAST(0x0000A4AE00C892F2 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (206, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A4AE00CA24D2 AS DateTime), CAST(0x0000A4AE00CA24D2 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (207, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A4AE00CA24D9 AS DateTime), CAST(0x0000A4AE00CA24D9 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (208, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A4AE00CA24DC AS DateTime), CAST(0x0000A4AE00CA24DC AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (209, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A4AE00CA24DC AS DateTime), CAST(0x0000A4AE00CA24DC AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (210, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A4AE00CA24DD AS DateTime), CAST(0x0000A4AE00CA24DD AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (211, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A4AE00CA24DF AS DateTime), CAST(0x0000A4AE00CA24DF AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (212, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A4AE00CA24DF AS DateTime), CAST(0x0000A4AE00CA24DF AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (213, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A4AE00CA24E0 AS DateTime), CAST(0x0000A4AE00CA24E0 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (214, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A4AE00CA24E3 AS DateTime), CAST(0x0000A4AE00CA24E3 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (215, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A4AE00CA24E7 AS DateTime), CAST(0x0000A4AE00CA24E7 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (216, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A4AE00CA24EA AS DateTime), CAST(0x0000A4AE00CA24EA AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (217, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A4AE00CEB0C8 AS DateTime), CAST(0x0000A4AE00CEB0C8 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (218, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A4AE00CEB0D8 AS DateTime), CAST(0x0000A4AE00CEB0D8 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (219, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A4AE00CEB0D9 AS DateTime), CAST(0x0000A4AE00CEB0D9 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (220, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A4AE00CEB0DB AS DateTime), CAST(0x0000A4AE00CEB0DB AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (221, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A4AE00CEB0DC AS DateTime), CAST(0x0000A4AE00CEB0DC AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (222, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A4AE00CEB0DC AS DateTime), CAST(0x0000A4AE00CEB0DC AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (223, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A4AE00CEB0DD AS DateTime), CAST(0x0000A4AE00CEB0DD AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (224, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A4AE00CEB0DE AS DateTime), CAST(0x0000A4AE00CEB0DE AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (225, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A4AE00CEB0DF AS DateTime), CAST(0x0000A4AE00CEB0DF AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (226, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A4AE00CEB0E1 AS DateTime), CAST(0x0000A4AE00CEB0E1 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (227, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A4AE00CEB0E5 AS DateTime), CAST(0x0000A4AE00CEB0E5 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (228, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A4AE00CFA1C0 AS DateTime), CAST(0x0000A4AE00CFA1C0 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (229, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A4AE00CFA1EF AS DateTime), CAST(0x0000A4AE00CFA1EF AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (230, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A4AE00CFA1F1 AS DateTime), CAST(0x0000A4AE00CFA1F1 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (231, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A4AE00CFA1F4 AS DateTime), CAST(0x0000A4AE00CFA1F4 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (232, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A4AE00CFA1F6 AS DateTime), CAST(0x0000A4AE00CFA1F6 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (233, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A4AE00CFA1FB AS DateTime), CAST(0x0000A4AE00CFA1FB AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (234, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A4AE00CFA1FD AS DateTime), CAST(0x0000A4AE00CFA1FD AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (235, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A4AE00CFA1FE AS DateTime), CAST(0x0000A4AE00CFA1FE AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (236, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A4AE00CFA1FF AS DateTime), CAST(0x0000A4AE00CFA1FF AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (237, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A4AE00CFA200 AS DateTime), CAST(0x0000A4AE00CFA200 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (238, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A4AE00CFA202 AS DateTime), CAST(0x0000A4AE00CFA202 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (239, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A4AE00D0605F AS DateTime), CAST(0x0000A4AE00D0605F AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (240, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A4AE00D06065 AS DateTime), CAST(0x0000A4AE00D06065 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (241, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A4AE00D06068 AS DateTime), CAST(0x0000A4AE00D06068 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (242, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A4AE00D06069 AS DateTime), CAST(0x0000A4AE00D06069 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (243, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A4AE00D0606A AS DateTime), CAST(0x0000A4AE00D0606A AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (244, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A4AE00D0606B AS DateTime), CAST(0x0000A4AE00D0606B AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (245, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A4AE00D0606C AS DateTime), CAST(0x0000A4AE00D0606C AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (246, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A4AE00D0606D AS DateTime), CAST(0x0000A4AE00D0606D AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (247, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A4AE00D06072 AS DateTime), CAST(0x0000A4AE00D06072 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (248, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A4AE00D06073 AS DateTime), CAST(0x0000A4AE00D06073 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (249, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A4AE00D06074 AS DateTime), CAST(0x0000A4AE00D06074 AS DateTime), 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (250, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A48B00000000 AS DateTime), CAST(0x0000A41300000000 AS DateTime), 0, 1, 0, CAST(0x0000A4AE00000000 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (251, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A48B00000000 AS DateTime), CAST(0x0000A41300000000 AS DateTime), 0, 1, 0, CAST(0x0000A4AE00000000 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (252, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A48B00000000 AS DateTime), CAST(0x0000A41300000000 AS DateTime), 0, 1, 0, CAST(0x0000A4AE00000000 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (253, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A48B00000000 AS DateTime), CAST(0x0000A41300000000 AS DateTime), 0, 1, 0, CAST(0x0000A4AE00000000 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (254, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A48B00000000 AS DateTime), CAST(0x0000A41300000000 AS DateTime), 0, 1, 0, CAST(0x0000A4AE00000000 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (255, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A48B00000000 AS DateTime), CAST(0x0000A41300000000 AS DateTime), 0, 1, 0, CAST(0x0000A4AE00000000 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (256, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A48B00000000 AS DateTime), CAST(0x0000A41300000000 AS DateTime), 0, 1, 0, CAST(0x0000A4AE00000000 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (257, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A48B00000000 AS DateTime), CAST(0x0000A41300000000 AS DateTime), 0, 1, 0, CAST(0x0000A4AE00000000 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (258, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A48B00000000 AS DateTime), CAST(0x0000A41300000000 AS DateTime), 0, 1, 0, CAST(0x0000A4AE00000000 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (259, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A48B00000000 AS DateTime), CAST(0x0000A41300000000 AS DateTime), 0, 1, 0, CAST(0x0000A4AE00000000 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (260, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A48B00000000 AS DateTime), CAST(0x0000A41300000000 AS DateTime), 0, 1, 0, CAST(0x0000A4AE00000000 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (261, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A48B00000000 AS DateTime), CAST(0x0000A41300000000 AS DateTime), 0, 1, 0, CAST(0x0000A4AE00000000 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (262, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A48B00000000 AS DateTime), CAST(0x0000A41300000000 AS DateTime), 0, 1, 0, CAST(0x0000A4AE00000000 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (263, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A48B00000000 AS DateTime), CAST(0x0000A41300000000 AS DateTime), 0, 1, 0, CAST(0x0000A4AE00000000 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (264, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A48B00000000 AS DateTime), CAST(0x0000A41300000000 AS DateTime), 0, 1, 0, CAST(0x0000A4AE00000000 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (265, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A48B00000000 AS DateTime), CAST(0x0000A41300000000 AS DateTime), 0, 1, 0, CAST(0x0000A4AE00000000 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (266, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A48B00000000 AS DateTime), CAST(0x0000A41300000000 AS DateTime), 0, 1, 0, CAST(0x0000A4AE00000000 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (267, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A48B00000000 AS DateTime), CAST(0x0000A41300000000 AS DateTime), 0, 1, 0, CAST(0x0000A4AE00000000 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (268, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A48B00000000 AS DateTime), CAST(0x0000A41300000000 AS DateTime), 0, 1, 0, CAST(0x0000A4AE00000000 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (269, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A48B00000000 AS DateTime), CAST(0x0000A41300000000 AS DateTime), 0, 1, 0, CAST(0x0000A4AE00000000 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (270, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A48B00000000 AS DateTime), CAST(0x0000A41300000000 AS DateTime), 0, 1, 0, CAST(0x0000A4AE00000000 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (271, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A48B00000000 AS DateTime), CAST(0x0000A41300000000 AS DateTime), 0, 1, 0, CAST(0x0000A4AE00000000 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (272, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A48B00000000 AS DateTime), CAST(0x0000A41300000000 AS DateTime), 0, 1, 0, CAST(0x0000A4AE00000000 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (273, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A48B00000000 AS DateTime), CAST(0x0000A41300000000 AS DateTime), 0, 1, 0, CAST(0x0000A4AE00000000 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (274, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A48B00000000 AS DateTime), CAST(0x0000A41300000000 AS DateTime), 0, 1, 0, CAST(0x0000A4AE00000000 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (275, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A48B00000000 AS DateTime), CAST(0x0000A41300000000 AS DateTime), 0, 1, 0, CAST(0x0000A4AE00000000 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (276, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A48B00000000 AS DateTime), CAST(0x0000A41300000000 AS DateTime), 0, 1, 0, CAST(0x0000A4AE00000000 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (277, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A48B00000000 AS DateTime), CAST(0x0000A41300000000 AS DateTime), 0, 1, 0, CAST(0x0000A4AE00000000 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (278, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A48B00000000 AS DateTime), CAST(0x0000A41300000000 AS DateTime), 0, 1, 0, CAST(0x0000A4AE00000000 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (279, 2, 1, 1, N'snuadkhasiudhasdgyas', CAST(0x0000A48B00000000 AS DateTime), CAST(0x0000A41300000000 AS DateTime), 0, 1, 0, CAST(0x0000A4AE00000000 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (280, 2, 1, 1, N'Mensaje de ejemplo', CAST(0x0000A47600C8A5E4 AS DateTime), CAST(0x0000A47600C8A5E4 AS DateTime), 0, 1, 1, CAST(0x0000A47600C8A5E4 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (281, 2, 1, 1, N'Mensaje de ejemplo', CAST(0x0000A47600C8A5E4 AS DateTime), CAST(0x0000A47600C8A5E4 AS DateTime), 0, 1, 1, CAST(0x0000A47600C8A5E4 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (282, 2, 1, 1, N'Mensaje de ejemplo', CAST(0x0000A47600C8A5E4 AS DateTime), CAST(0x0000A47600C8A5E4 AS DateTime), 0, 1, 1, CAST(0x0000A47600C8A5E4 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (283, 2, 1, 1, N'Mensaje de ejemplo', CAST(0x0000A47600C8A5E4 AS DateTime), CAST(0x0000A47600C8A5E4 AS DateTime), 0, 1, 1, CAST(0x0000A47600C8A5E4 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (284, 2, 1, 1, N'Mensaje de ejemplo', CAST(0x0000A47600C8A5E4 AS DateTime), CAST(0x0000A47600C8A5E4 AS DateTime), 0, 1, 1, CAST(0x0000A47600C8A5E4 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (285, 2, 1, 1, N'Mensaje de ejemplo', CAST(0x0000A47600C8A5E4 AS DateTime), CAST(0x0000A47600C8A5E4 AS DateTime), 0, 1, 1, CAST(0x0000A47600C8A5E4 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (286, 2, 1, 1, N'Mensaje de ejemplo', CAST(0x0000A47600C8A5E4 AS DateTime), CAST(0x0000A47600C8A5E4 AS DateTime), 0, 1, 1, CAST(0x0000A47600C8A5E4 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (287, 2, 1, 1, N'Mensaje de ejemplo', CAST(0x0000A47600C8A5E4 AS DateTime), CAST(0x0000A47600C8A5E4 AS DateTime), 0, 1, 1, CAST(0x0000A47600C8A5E4 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (288, 2, 1, 1, N'Mensaje de ejemplo', CAST(0x0000A47600C8A5E4 AS DateTime), CAST(0x0000A47600C8A5E4 AS DateTime), 0, 1, 1, CAST(0x0000A47600C8A5E4 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (289, 2, 1, 1, N'Mensaje de ejemplo', CAST(0x0000A47600C8A5E4 AS DateTime), CAST(0x0000A47600C8A5E4 AS DateTime), 0, 1, 1, CAST(0x0000A47600C8A5E4 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (290, 2, 1, 1, N'Mensaje de ejemplo', CAST(0x0000A47600C8A5E4 AS DateTime), CAST(0x0000A47600C8A5E4 AS DateTime), 0, 1, 1, CAST(0x0000A47600C8A5E4 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (291, 2, 1, 1, N'Mensaje de ejemplo', CAST(0x0000A47600C8A5E4 AS DateTime), CAST(0x0000A47600C8A5E4 AS DateTime), 0, 1, 1, CAST(0x0000A47600C8A5E4 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (292, 2, 1, 1, N'Mensaje de ejemplo', CAST(0x0000A47600C8A5E4 AS DateTime), CAST(0x0000A47600C8A5E4 AS DateTime), 0, 1, 1, CAST(0x0000A47600C8A5E4 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (293, 2, 1, 1, N'Mensaje de ejemplo', CAST(0x0000A47600C8A5E4 AS DateTime), CAST(0x0000A47600C8A5E4 AS DateTime), 0, 1, 1, CAST(0x0000A47600C8A5E4 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (294, 2, 1, 1, N'Mensaje de ejemplo', CAST(0x0000A47600C8A5E4 AS DateTime), CAST(0x0000A47600C8A5E4 AS DateTime), 0, 1, 1, CAST(0x0000A47600C8A5E4 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (295, 2, 1, 1, N'Mensaje de ejemplo', CAST(0x0000A47600C8A5E4 AS DateTime), CAST(0x0000A47600C8A5E4 AS DateTime), 0, 1, 1, CAST(0x0000A47600C8A5E4 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (296, 2, 1, 1, N'Mensaje de ejemplo', CAST(0x0000A47600C8A5E4 AS DateTime), CAST(0x0000A47600C8A5E4 AS DateTime), 0, 1, 1, CAST(0x0000A47600C8A5E4 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (297, 2, 1, 1, N'Mensaje de ejemplo', CAST(0x0000A47600C8A5E4 AS DateTime), CAST(0x0000A47600C8A5E4 AS DateTime), 0, 1, 1, CAST(0x0000A47600C8A5E4 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (298, 2, 1, 1, N'Mensaje de ejemplo', CAST(0x0000A47600C8A5E4 AS DateTime), CAST(0x0000A47600C8A5E4 AS DateTime), 0, 1, 1, CAST(0x0000A47600C8A5E4 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (299, 2, 1, 1, N'Mensaje de ejemplo', CAST(0x0000A47600C8A5E4 AS DateTime), CAST(0x0000A47600C8A5E4 AS DateTime), 0, 1, 1, CAST(0x0000A47600C8A5E4 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (300, 2, 1, 1, N'Mensaje de ejemplo', CAST(0x0000A47600C8A5E4 AS DateTime), CAST(0x0000A47600C8A5E4 AS DateTime), 0, 1, 1, CAST(0x0000A47600C8A5E4 AS DateTime))
GO
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (301, 2, 1, 1, N'Mensaje de ejemplo', CAST(0x0000A47600C8A5E4 AS DateTime), CAST(0x0000A47600C8A5E4 AS DateTime), 0, 1, 1, CAST(0x0000A47600C8A5E4 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (302, 2, 1, 1, N'Mensaje de ejemplo', CAST(0x0000A47600C8A5E4 AS DateTime), CAST(0x0000A47600C8A5E4 AS DateTime), 0, 1, 1, CAST(0x0000A47600C8A5E4 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (303, 2, 1, 1, N'Mensaje de ejemplo', CAST(0x0000A47600C8A5E4 AS DateTime), CAST(0x0000A47600C8A5E4 AS DateTime), 0, 1, 1, CAST(0x0000A47600C8A5E4 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (304, 2, 1, 1, N'Mensaje de ejemplo', CAST(0x0000A47600C8A5E4 AS DateTime), CAST(0x0000A47600C8A5E4 AS DateTime), 0, 1, 1, CAST(0x0000A47600C8A5E4 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (305, 2, 1, 1, N'Mensaje de ejemplo', CAST(0x0000A47600C8A5E4 AS DateTime), CAST(0x0000A47600C8A5E4 AS DateTime), 0, 1, 1, CAST(0x0000A47600C8A5E4 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (306, 2, 1, 1, N'Mensaje de ejemplo', CAST(0x0000A47600C8A5E4 AS DateTime), CAST(0x0000A47600C8A5E4 AS DateTime), 0, 1, 1, CAST(0x0000A47600C8A5E4 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (307, 2, 1, 1, N'Mensaje de ejemplo', CAST(0x0000A47600C8A5E4 AS DateTime), CAST(0x0000A47600C8A5E4 AS DateTime), 0, 1, 1, CAST(0x0000A47600C8A5E4 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (308, 2, 1, 1, N'Mensaje de ejemplo', CAST(0x0000A47600C8A5E4 AS DateTime), CAST(0x0000A47600C8A5E4 AS DateTime), 0, 1, 1, CAST(0x0000A47600C8A5E4 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (309, 2, 1, 1, N'Mensaje de ejemplo', CAST(0x0000A47600C8A5E4 AS DateTime), CAST(0x0000A47600C8A5E4 AS DateTime), 0, 1, 1, CAST(0x0000A47600C8A5E4 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1250, 2, 1, 1, N'Mensaje de ejemplo', CAST(0x0000A47600C8A5E4 AS DateTime), CAST(0x0000A47600C8A5E4 AS DateTime), 0, 1, 1, CAST(0x0000A47600C8A5E4 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1251, 2, 1, 1, N'Mensaje de ejemplo', CAST(0x0000A47600C8A5E4 AS DateTime), CAST(0x0000A47600C8A5E4 AS DateTime), 0, 1, 1, CAST(0x0000A47600C8A5E4 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1252, 2, 1, 1, N'Mensaje de ejemplo', CAST(0x0000A47600C8A5E4 AS DateTime), CAST(0x0000A47600C8A5E4 AS DateTime), 0, 1, 1, CAST(0x0000A47600C8A5E4 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1253, 2, 1, 1, N'Mensaje de ejemplo', CAST(0x0000A47600C8A5E4 AS DateTime), CAST(0x0000A47600C8A5E4 AS DateTime), 0, 1, 1, CAST(0x0000A47600C8A5E4 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1254, 2, 1, 1, N'Mensaje de ejemplo', CAST(0x0000A47600C8A5E4 AS DateTime), CAST(0x0000A47600C8A5E4 AS DateTime), 0, 1, 1, CAST(0x0000A47600C8A5E4 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1255, 2, 1, 1, N'Mensaje de ejemplo', CAST(0x0000A47600C8A5E4 AS DateTime), CAST(0x0000A47600C8A5E4 AS DateTime), 0, 1, 1, CAST(0x0000A47600C8A5E4 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1256, 2, 1, 1, N'Mensaje de ejemplo', CAST(0x0000A47600C8A5E4 AS DateTime), CAST(0x0000A47600C8A5E4 AS DateTime), 0, 1, 1, CAST(0x0000A47600C8A5E4 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1257, 2, 1, 1, N'Mensaje de ejemplo', CAST(0x0000A47600C8A5E4 AS DateTime), CAST(0x0000A47600C8A5E4 AS DateTime), 0, 1, 1, CAST(0x0000A47600C8A5E4 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1258, 2, 1, 1, N'Mensaje de ejemplo', CAST(0x0000A47600C8A5E4 AS DateTime), CAST(0x0000A47600C8A5E4 AS DateTime), 0, 1, 1, CAST(0x0000A47600C8A5E4 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1259, 2, 1, 1, N'Mensaje de ejemplo', CAST(0x0000A47600C8A5E4 AS DateTime), CAST(0x0000A47600C8A5E4 AS DateTime), 0, 1, 1, CAST(0x0000A47600C8A5E4 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1260, 2, 1, 1, N'Mensaje de ejemplo', CAST(0x0000A47600C8A5E4 AS DateTime), CAST(0x0000A47600C8A5E4 AS DateTime), 0, 1, 1, CAST(0x0000A47600C8A5E4 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2250, 1, 1, 1, N'Se creó un nuevo aviso de entrada', CAST(0x0000A4F200CA16DC AS DateTime), CAST(0x0000A4F400B81868 AS DateTime), 0, 1, 1, CAST(0x0000A4F200CA1C7C AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2251, 1, 1, 1, N'Se creó un nuevo aviso de entrada', CAST(0x0000A4F200CE7953 AS DateTime), CAST(0x0000A4F400B81B9D AS DateTime), 0, 1, 1, CAST(0x0000A4F200CE7A2B AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2252, 1, 1, 1, N'Se creó un nuevo aviso de entrada', CAST(0x0000A4F200F66B86 AS DateTime), CAST(0x0000A4F400B81BA1 AS DateTime), 0, 1, 1, CAST(0x0000A4F200F66B86 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2253, 1, 1, 1, N'Se creó un nuevo aviso de entrada', CAST(0x0000A4F200F683C3 AS DateTime), CAST(0x0000A4F400B81BA1 AS DateTime), 0, 1, 1, CAST(0x0000A4F200F683C3 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2254, 1, 1, 1, N'Se creó un nuevo aviso de entrada', CAST(0x0000A4F200F6E4D6 AS DateTime), CAST(0x0000A4F400B81BA6 AS DateTime), 0, 1, 1, CAST(0x0000A4F200F6E54C AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2255, 1, 1, 1, N'Se creó un nuevo aviso de entrada', CAST(0x0000A4F200F7B5C2 AS DateTime), CAST(0x0000A4F400B81BA6 AS DateTime), 0, 1, 1, CAST(0x0000A4F200F7B5C2 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2256, 1, 1, 1, N'Se creó un nuevo aviso de entrada', CAST(0x0000A4F200F88FBA AS DateTime), CAST(0x0000A4F400B81BA6 AS DateTime), 0, 1, 1, CAST(0x0000A4F200F88FBA AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2257, 1, 1, 1, N'Se creó un nuevo aviso de entrada', CAST(0x0000A4F201024DAB AS DateTime), CAST(0x0000A4F400B81BA6 AS DateTime), 0, 1, 1, CAST(0x0000A4F201024DAB AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2258, 1, 1, 1, N'Se creó un nuevo aviso de entrada', CAST(0x0000A4F20107AF92 AS DateTime), CAST(0x0000A4F400B81BA6 AS DateTime), 0, 1, 1, CAST(0x0000A4F20107AF92 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2259, 1, 1, 1, N'Se creó un nuevo aviso de entrada', CAST(0x0000A4F20107B4E4 AS DateTime), CAST(0x0000A4F400B81BA6 AS DateTime), 0, 1, 1, CAST(0x0000A4F20107B4E4 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2260, 1, 1, 1, N'Se creó un nuevo aviso de entrada', CAST(0x0000A4F20107CD20 AS DateTime), CAST(0x0000A4F400B81BAB AS DateTime), 0, 1, 1, CAST(0x0000A4F20107CD20 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2261, 1, 1, 1, N'Se creó un nuevo aviso de entrada', CAST(0x0000A4F201084DA8 AS DateTime), CAST(0x0000A4F400B81BAB AS DateTime), 0, 1, 1, CAST(0x0000A4F201084DA8 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2262, 1, 1, 1, N'Se creó un nuevo aviso de entrada', CAST(0x0000A4F2010888A1 AS DateTime), CAST(0x0000A4F400B81BAB AS DateTime), 0, 1, 1, CAST(0x0000A4F2010888A1 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2263, 1, 1, 1, N'Se creó un nuevo aviso de entrada', CAST(0x0000A4F20108B70E AS DateTime), CAST(0x0000A4F400B81BB4 AS DateTime), 0, 1, 1, CAST(0x0000A4F20108B70E AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2264, 1, 1, 1, N'Se creó un nuevo aviso de entrada', CAST(0x0000A4F201093FCF AS DateTime), CAST(0x0000A4F400B81BB4 AS DateTime), 0, 1, 1, CAST(0x0000A4F201093FCF AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2265, 1, 1, 1, N'Se creó un nuevo aviso de entrada', CAST(0x0000A4F201099C41 AS DateTime), CAST(0x0000A4F400B81BB9 AS DateTime), 0, 1, 1, CAST(0x0000A4F201099C41 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2266, 1, 1, 1, N'Se creó un nuevo aviso de entrada', CAST(0x0000A4F20109F5DD AS DateTime), CAST(0x0000A4F400B81BB9 AS DateTime), 0, 1, 1, CAST(0x0000A4F20109F5DD AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2267, 1, 1, 1, N'Se creó un nuevo aviso de entrada', CAST(0x0000A4F2010A8A82 AS DateTime), CAST(0x0000A4F400B81BBD AS DateTime), 0, 1, 1, CAST(0x0000A4F2010A8A82 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2268, 1, 1, 1, N'Se creó un nuevo aviso de entrada', CAST(0x0000A4F201266792 AS DateTime), CAST(0x0000A4F400B81BBD AS DateTime), 0, 1, 1, CAST(0x0000A4F201266792 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2269, 1, 1, 1, N'Se creó un nuevo aviso de entrada', CAST(0x0000A4F2012725AE AS DateTime), CAST(0x0000A4F400B81BBD AS DateTime), 0, 1, 1, CAST(0x0000A4F2012725AE AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2270, 1, 1, 1, N'Se creó un nuevo aviso de entrada', CAST(0x0000A4F2012978C1 AS DateTime), CAST(0x0000A4F400B81BBD AS DateTime), 0, 1, 1, CAST(0x0000A4F2012978C1 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2271, 1, 1, 1, N'Se creó un nuevo aviso de entrada', CAST(0x0000A4F2012C7FDE AS DateTime), CAST(0x0000A4F400B81BBD AS DateTime), 0, 1, 1, CAST(0x0000A4F2012C7FDE AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2272, 1, 1, 1, N'Se creó un nuevo aviso de entrada', CAST(0x0000A4F2012CCE55 AS DateTime), CAST(0x0000A4F400B81BC2 AS DateTime), 0, 1, 1, CAST(0x0000A4F2012CCE55 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2273, 1, 1, 1, N'Se creó un nuevo aviso de entrada', CAST(0x0000A4F2013431B3 AS DateTime), CAST(0x0000A4F400B81BC2 AS DateTime), 0, 1, 1, CAST(0x0000A4F2013431B3 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2274, 1, 1, 1, N'Se creó un nuevo aviso de entrada', CAST(0x0000A4F20134C056 AS DateTime), CAST(0x0000A4F400B81BC2 AS DateTime), 0, 1, 1, CAST(0x0000A4F20134C056 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2275, 1, 1, 1, N'Se creó un nuevo aviso de entrada', CAST(0x0000A4F3009D637F AS DateTime), CAST(0x0000A4F400B81BC7 AS DateTime), 0, 1, 1, CAST(0x0000A4F3009D637F AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2276, 1, 1, 1, N'Se creó un nuevo aviso de entrada', CAST(0x0000A4F3009DED52 AS DateTime), CAST(0x0000A4F400B81BC7 AS DateTime), 0, 1, 1, CAST(0x0000A4F3009DED52 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2277, 1, 1, 1, N'Se creó un nuevo aviso de entrada', CAST(0x0000A4F300AFE8FA AS DateTime), CAST(0x0000A4F400B81BC7 AS DateTime), 0, 1, 1, CAST(0x0000A4F300AFE8FA AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2278, 1, 1, 1, N'Se creó un nuevo aviso de entrada', CAST(0x0000A4F300AFF593 AS DateTime), CAST(0x0000A4F400B81BC7 AS DateTime), 0, 1, 1, CAST(0x0000A4F300AFF593 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2279, 1, 1, 1, N'Se creó un nuevo aviso de entrada', CAST(0x0000A4F300B07611 AS DateTime), CAST(0x0000A4F400B81BCB AS DateTime), 0, 1, 1, CAST(0x0000A4F300B07611 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2280, 1, 1, 1, N'Se creó un nuevo aviso de entrada', CAST(0x0000A4F300B0A4C6 AS DateTime), CAST(0x0000A4F400B81BCB AS DateTime), 0, 1, 1, CAST(0x0000A4F300B0A4C6 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2281, 1, 1, 1, N'Se creó un nuevo aviso de entrada', CAST(0x0000A4F300B1C78A AS DateTime), CAST(0x0000A4F400B81BCB AS DateTime), 0, 1, 1, CAST(0x0000A4F300B1C78A AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2282, 1, 1, 1, N'Se creó un nuevo aviso de entrada', CAST(0x0000A4F300B47CD2 AS DateTime), CAST(0x0000A4F400B81BCB AS DateTime), 0, 1, 1, CAST(0x0000A4F300B47CD2 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2283, 1, 1, 1, N'Se creó un nuevo aviso de entrada', CAST(0x0000A4F300BE26B1 AS DateTime), CAST(0x0000A4F400B81BD0 AS DateTime), 0, 1, 1, CAST(0x0000A4F300BE26B1 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2284, 5, 1, 1, N'Se creó un nuevo aviso de entrada', CAST(0x0000A4F300BE444E AS DateTime), CAST(0x0000A4F400B81BD0 AS DateTime), 0, 1, 1, CAST(0x0000A4F300BE444E AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2285, 1, 1, 1, N'Se creó un nuevo aviso de entrada', CAST(0x0000A4F300BF23A7 AS DateTime), CAST(0x0000A4F400B81BD0 AS DateTime), 0, 1, 1, CAST(0x0000A4F300BF23A7 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2286, 5, 1, 1, N'Se creó un nuevo aviso de entrada', CAST(0x0000A4F300BF2C9E AS DateTime), CAST(0x0000A4F400B81BD0 AS DateTime), 0, 1, 1, CAST(0x0000A4F300BF2C9E AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2287, 1, 1, 1, N'Se creó un nuevo aviso de entrada', CAST(0x0000A4F300C0E924 AS DateTime), CAST(0x0000A4F400B81BD0 AS DateTime), 0, 1, 1, CAST(0x0000A4F300C0E924 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2288, 1, 1, 1, N'Se creó un nuevo aviso de entrada', CAST(0x0000A4F300C14F00 AS DateTime), CAST(0x0000A4F400B81BD5 AS DateTime), 0, 1, 1, CAST(0x0000A4F300C14F00 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2289, 1, 1, 1, N'Mensaje de ejemplo', CAST(0x0000A4F300EA95DC AS DateTime), CAST(0x0000A4F400B81BD5 AS DateTime), 0, 1, 1, CAST(0x0000A4F300EA9893 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2290, 5, 1, 2, N'Nuevo aviso de llegada creado con el folio 12345', CAST(0x0000A4F300EB8F02 AS DateTime), CAST(0x0000A4F400B81BD5 AS DateTime), 0, 1, 1, CAST(0x0000A4F300EB8F02 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2291, 5, 1, 2, N'Nuevo aviso de llegada creado con el folio 12345', CAST(0x0000A4F300EBAB56 AS DateTime), CAST(0x0000A4F400B81BD5 AS DateTime), 0, 1, 1, CAST(0x0000A4F300EBADE1 AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2292, 5, 1, 2, N'Nuevo aviso de llegada creado con el folio 12345', CAST(0x0000A4F30101DA5C AS DateTime), CAST(0x0000A4F400B81BD5 AS DateTime), 0, 1, 1, CAST(0x0000A4F30101DADC AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2293, 5, 1, 2, N'Nuevo aviso de llegada creado con el folio 12345', CAST(0x0000A4F30101F04A AS DateTime), CAST(0x0000A4F400B81BDE AS DateTime), 0, 1, 1, CAST(0x0000A4F30101F04A AS DateTime))
INSERT [dbo].[Sam3_Notificacion] ([NotificacionID], [UsuarioIDReceptor], [UsuarioIDEmisor], [TipoNotificacionID], [Mensaje], [FechaEnvio], [FechaRecepcion], [EstatusLectura], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2294, 1, 1, 1, N'Permiso de Aduana enviado', CAST(0x0000A4F400C4F2AF AS DateTime), CAST(0x0000A4F400C7485E AS DateTime), 0, 1, 1, CAST(0x0000A4F400C4F567 AS DateTime))
SET IDENTITY_INSERT [dbo].[Sam3_Notificacion] OFF
SET IDENTITY_INSERT [dbo].[Sam3_NumeroUnico] ON 

INSERT [dbo].[Sam3_NumeroUnico] ([NumeroUnicoID], [ProyectoID], [ItemCodeID], [ColadaID], [ProveedorID], [FabricanteID], [TipoCorte1ID], [TipoCorte2ID], [Estatus], [Factura], [PartidaFactura], [OrdenDeCompra], [PartidaOrdenDeCompra], [Diametro1], [Diametro2], [Cedula], [NumeroUnicoCliente], [MarcadoAsme], [MarcadoGolpe], [MarcadoPintura], [PruebasHidrostaticas], [TieneDano], [Rack], [Observaciones], [CampoLibreRecepcion1], [CampoLibreRecepcion2], [CampoLibreRecepcion3], [CampoLibreRecepcion4], [CampoLibreRecepcion5], [CampoLibre1], [CampoLibre2], [CampoLibre3], [CampoLibre4], [CampoLibre5], [EsVirtual], [RecepcionID], [Activo], [UsuarioModificacion], [FechaModificacion], [Prefijo], [Consecutivo]) VALUES (6, 2, 2, 1, 1, 1, 1, 1, N'1', N'482', N'2', N'504', N'306', CAST(2.5000 AS Decimal(7, 4)), CAST(3.8000 AS Decimal(7, 4)), N'1', N'1704', 1, 0, 0, N'1', 0, N'1', N'no', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, 1, 1, CAST(0x0000A50200000000 AS DateTime), N'nu1', 1)
INSERT [dbo].[Sam3_NumeroUnico] ([NumeroUnicoID], [ProyectoID], [ItemCodeID], [ColadaID], [ProveedorID], [FabricanteID], [TipoCorte1ID], [TipoCorte2ID], [Estatus], [Factura], [PartidaFactura], [OrdenDeCompra], [PartidaOrdenDeCompra], [Diametro1], [Diametro2], [Cedula], [NumeroUnicoCliente], [MarcadoAsme], [MarcadoGolpe], [MarcadoPintura], [PruebasHidrostaticas], [TieneDano], [Rack], [Observaciones], [CampoLibreRecepcion1], [CampoLibreRecepcion2], [CampoLibreRecepcion3], [CampoLibreRecepcion4], [CampoLibreRecepcion5], [CampoLibre1], [CampoLibre2], [CampoLibre3], [CampoLibre4], [CampoLibre5], [EsVirtual], [RecepcionID], [Activo], [UsuarioModificacion], [FechaModificacion], [Prefijo], [Consecutivo]) VALUES (1045, 1, 6, 1, 1, 1, NULL, NULL, N'D', N'123456', NULL, N'123456', NULL, CAST(2.4000 AS Decimal(7, 4)), CAST(4.2000 AS Decimal(7, 4)), NULL, NULL, 0, 0, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 1, CAST(0x0000A507011CF60C AS DateTime), N'CE', 1)
INSERT [dbo].[Sam3_NumeroUnico] ([NumeroUnicoID], [ProyectoID], [ItemCodeID], [ColadaID], [ProveedorID], [FabricanteID], [TipoCorte1ID], [TipoCorte2ID], [Estatus], [Factura], [PartidaFactura], [OrdenDeCompra], [PartidaOrdenDeCompra], [Diametro1], [Diametro2], [Cedula], [NumeroUnicoCliente], [MarcadoAsme], [MarcadoGolpe], [MarcadoPintura], [PruebasHidrostaticas], [TieneDano], [Rack], [Observaciones], [CampoLibreRecepcion1], [CampoLibreRecepcion2], [CampoLibreRecepcion3], [CampoLibreRecepcion4], [CampoLibreRecepcion5], [CampoLibre1], [CampoLibre2], [CampoLibre3], [CampoLibre4], [CampoLibre5], [EsVirtual], [RecepcionID], [Activo], [UsuarioModificacion], [FechaModificacion], [Prefijo], [Consecutivo]) VALUES (1046, 2, 7, 1, 1, 1, NULL, NULL, N'D', N'123456', NULL, N'123456', NULL, CAST(2.5000 AS Decimal(7, 4)), CAST(3.8000 AS Decimal(7, 4)), NULL, NULL, 0, 0, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 1, CAST(0x0000A507011E850F AS DateTime), N'CE', 1)
INSERT [dbo].[Sam3_NumeroUnico] ([NumeroUnicoID], [ProyectoID], [ItemCodeID], [ColadaID], [ProveedorID], [FabricanteID], [TipoCorte1ID], [TipoCorte2ID], [Estatus], [Factura], [PartidaFactura], [OrdenDeCompra], [PartidaOrdenDeCompra], [Diametro1], [Diametro2], [Cedula], [NumeroUnicoCliente], [MarcadoAsme], [MarcadoGolpe], [MarcadoPintura], [PruebasHidrostaticas], [TieneDano], [Rack], [Observaciones], [CampoLibreRecepcion1], [CampoLibreRecepcion2], [CampoLibreRecepcion3], [CampoLibreRecepcion4], [CampoLibreRecepcion5], [CampoLibre1], [CampoLibre2], [CampoLibre3], [CampoLibre4], [CampoLibre5], [EsVirtual], [RecepcionID], [Activo], [UsuarioModificacion], [FechaModificacion], [Prefijo], [Consecutivo]) VALUES (1047, 2, 8, 1, 1, 1, NULL, NULL, N'D', N'123456', NULL, N'123456', NULL, CAST(32.4000 AS Decimal(7, 4)), CAST(9.0000 AS Decimal(7, 4)), NULL, NULL, 0, 0, 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 1, 1, CAST(0x0000A507011F2AB3 AS DateTime), N'CE', 2)
SET IDENTITY_INSERT [dbo].[Sam3_NumeroUnico] OFF
INSERT [dbo].[Sam3_NumeroUnicoInventario] ([NumeroUnicoID], [ProyectoID], [CantidadRecibida], [CantidadDanada], [InventarioFisico], [InventarioBuenEstado], [InventarioCongelado], [InventarioTransferenciaCorte], [InventarioDisponibleCruce], [EsVirtual], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1045, 1, 8, 0, 8, 8, 0, 0, 8, 0, 1, 1, CAST(0x0000A507011CF622 AS DateTime))
INSERT [dbo].[Sam3_NumeroUnicoInventario] ([NumeroUnicoID], [ProyectoID], [CantidadRecibida], [CantidadDanada], [InventarioFisico], [InventarioBuenEstado], [InventarioCongelado], [InventarioTransferenciaCorte], [InventarioDisponibleCruce], [EsVirtual], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1046, 2, 20, 0, 20, 20, 0, 0, 20, 0, 1, 1, CAST(0x0000A507011E8521 AS DateTime))
INSERT [dbo].[Sam3_NumeroUnicoInventario] ([NumeroUnicoID], [ProyectoID], [CantidadRecibida], [CantidadDanada], [InventarioFisico], [InventarioBuenEstado], [InventarioCongelado], [InventarioTransferenciaCorte], [InventarioDisponibleCruce], [EsVirtual], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1047, 2, 2, 0, 2, 2, 0, 0, 2, 0, 1, 1, CAST(0x0000A507011F31AF AS DateTime))
SET IDENTITY_INSERT [dbo].[Sam3_NumeroUnicoMovimiento] ON 

INSERT [dbo].[Sam3_NumeroUnicoMovimiento] ([NumeroUnicoMovimientoID], [NumeroUnicoID], [ProyectoID], [TipoMovimientoID], [Cantidad], [Segmento], [FechaMovimiento], [Referencia], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (44, 1045, 1, 1, 8, N'A', CAST(0x0000A507011CF624 AS DateTime), N'Recepcion', N'A', 1, 1, CAST(0x0000A507011CF624 AS DateTime))
INSERT [dbo].[Sam3_NumeroUnicoMovimiento] ([NumeroUnicoMovimientoID], [NumeroUnicoID], [ProyectoID], [TipoMovimientoID], [Cantidad], [Segmento], [FechaMovimiento], [Referencia], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (45, 1046, 2, 1, 20, N'A', CAST(0x0000A507011E8523 AS DateTime), N'Recepcion', N'A', 1, 1, CAST(0x0000A507011E8523 AS DateTime))
INSERT [dbo].[Sam3_NumeroUnicoMovimiento] ([NumeroUnicoMovimientoID], [NumeroUnicoID], [ProyectoID], [TipoMovimientoID], [Cantidad], [Segmento], [FechaMovimiento], [Referencia], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (46, 1047, 2, 1, 2, N'A', CAST(0x0000A507011F38C3 AS DateTime), N'Recepcion', N'A', 1, 1, CAST(0x0000A507011F3893 AS DateTime))
SET IDENTITY_INSERT [dbo].[Sam3_NumeroUnicoMovimiento] OFF
SET IDENTITY_INSERT [dbo].[Sam3_NumeroUnicoSegmento] ON 

INSERT [dbo].[Sam3_NumeroUnicoSegmento] ([NumeroUnicoSegmentoID], [NumeroUnicoID], [ProyectoID], [Segmento], [CantidadDanada], [InventarioFisico], [InventarioBuenEstado], [InventarioCongelado], [InventarioTransferenciaCorte], [InventarioDisponibleCruce], [Rack], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2, 1045, 1, N'A', 0, 8, 8, 0, 0, 8, NULL, 1, 1, CAST(0x0000A507011CF623 AS DateTime))
INSERT [dbo].[Sam3_NumeroUnicoSegmento] ([NumeroUnicoSegmentoID], [NumeroUnicoID], [ProyectoID], [Segmento], [CantidadDanada], [InventarioFisico], [InventarioBuenEstado], [InventarioCongelado], [InventarioTransferenciaCorte], [InventarioDisponibleCruce], [Rack], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3, 1046, 2, N'A', 0, 20, 20, 0, 0, 20, NULL, 1, 1, CAST(0x0000A507011E8522 AS DateTime))
INSERT [dbo].[Sam3_NumeroUnicoSegmento] ([NumeroUnicoSegmentoID], [NumeroUnicoID], [ProyectoID], [Segmento], [CantidadDanada], [InventarioFisico], [InventarioBuenEstado], [InventarioCongelado], [InventarioTransferenciaCorte], [InventarioDisponibleCruce], [Rack], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (4, 1047, 2, N'A', 0, 2, 2, 0, 0, 2, NULL, 1, 1, CAST(0x0000A507011F352D AS DateTime))
SET IDENTITY_INSERT [dbo].[Sam3_NumeroUnicoSegmento] OFF
SET IDENTITY_INSERT [dbo].[Sam3_OrdenRecepcion] ON 

INSERT [dbo].[Sam3_OrdenRecepcion] ([OrdenRecepcionID], [Folio], [Activo], [FechaCreacion], [FechaModificacion], [UsuarioModificacion]) VALUES (1, 1, 1, CAST(0x0000A507010AF13B AS DateTime), CAST(0x0000A507010AF13B AS DateTime), 1)
INSERT [dbo].[Sam3_OrdenRecepcion] ([OrdenRecepcionID], [Folio], [Activo], [FechaCreacion], [FechaModificacion], [UsuarioModificacion]) VALUES (2, 1, 1, CAST(0x0000A507010BE862 AS DateTime), CAST(0x0000A507010BE862 AS DateTime), 1)
INSERT [dbo].[Sam3_OrdenRecepcion] ([OrdenRecepcionID], [Folio], [Activo], [FechaCreacion], [FechaModificacion], [UsuarioModificacion]) VALUES (3, 1, 1, CAST(0x0000A507011CF5AA AS DateTime), CAST(0x0000A507011CF5AA AS DateTime), 1)
INSERT [dbo].[Sam3_OrdenRecepcion] ([OrdenRecepcionID], [Folio], [Activo], [FechaCreacion], [FechaModificacion], [UsuarioModificacion]) VALUES (5, 1, 1, CAST(0x0000A507011E8478 AS DateTime), CAST(0x0000A507011E8478 AS DateTime), 1)
INSERT [dbo].[Sam3_OrdenRecepcion] ([OrdenRecepcionID], [Folio], [Activo], [FechaCreacion], [FechaModificacion], [UsuarioModificacion]) VALUES (6, 2, 1, CAST(0x0000A507011ECE6D AS DateTime), CAST(0x0000A507011ECEAA AS DateTime), 1)
INSERT [dbo].[Sam3_OrdenRecepcion] ([OrdenRecepcionID], [Folio], [Activo], [FechaCreacion], [FechaModificacion], [UsuarioModificacion]) VALUES (7, 3, 1, CAST(0x0000A50800F1DD23 AS DateTime), CAST(0x0000A50800F1DD23 AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[Sam3_OrdenRecepcion] OFF
SET IDENTITY_INSERT [dbo].[Sam3_Pagina] ON 

INSERT [dbo].[Sam3_Pagina] ([PaginaID], [Accion], [Controlador], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, N'Index', N'HomeController', 1, NULL, NULL)
INSERT [dbo].[Sam3_Pagina] ([PaginaID], [Accion], [Controlador], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2, N'Layout', N'MainController', 1, NULL, NULL)
INSERT [dbo].[Sam3_Pagina] ([PaginaID], [Accion], [Controlador], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3, N'ListadoAvisoLlegada', N'AvisoLlegadaController', NULL, NULL, NULL)
INSERT [dbo].[Sam3_Pagina] ([PaginaID], [Accion], [Controlador], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (4, N'DetalleAvisoLlegada', N'AvisoLlegadaController', NULL, NULL, NULL)
INSERT [dbo].[Sam3_Pagina] ([PaginaID], [Accion], [Controlador], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (5, N'FormatoPaseSalida', N'AvisoLlegadaController', NULL, NULL, NULL)
INSERT [dbo].[Sam3_Pagina] ([PaginaID], [Accion], [Controlador], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (6, N'ListadoLlegadaMaterial', N'EntradaMaterialController', NULL, NULL, NULL)
INSERT [dbo].[Sam3_Pagina] ([PaginaID], [Accion], [Controlador], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (7, N'DetalleLlegadaMaterial', N'EntradaMaterialController', NULL, NULL, NULL)
INSERT [dbo].[Sam3_Pagina] ([PaginaID], [Accion], [Controlador], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (8, N'AutorizarPermiso', N'AvisoLlegadaController', NULL, NULL, NULL)
INSERT [dbo].[Sam3_Pagina] ([PaginaID], [Accion], [Controlador], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (9, N'DashboardAvisoLlegada', N'AvisoLlegadaController', NULL, NULL, NULL)
INSERT [dbo].[Sam3_Pagina] ([PaginaID], [Accion], [Controlador], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (10, N'DashboardLlegadaMaterial', N'EntradaMaterialController', NULL, NULL, NULL)
INSERT [dbo].[Sam3_Pagina] ([PaginaID], [Accion], [Controlador], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (11, N'PaseDeSalida', N'EntradaMaterialController', NULL, NULL, NULL)
INSERT [dbo].[Sam3_Pagina] ([PaginaID], [Accion], [Controlador], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (12, N'Cuantificacion', N'CuantificacionController', NULL, NULL, NULL)
INSERT [dbo].[Sam3_Pagina] ([PaginaID], [Accion], [Controlador], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (13, N'GenerarOrdenRecepcion', N'OrdenRecepcionController', NULL, NULL, NULL)
INSERT [dbo].[Sam3_Pagina] ([PaginaID], [Accion], [Controlador], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (14, N'DetalleOrdenRecepcion', N'OrdenRecepcionController', NULL, NULL, NULL)
INSERT [dbo].[Sam3_Pagina] ([PaginaID], [Accion], [Controlador], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (15, N'ListadoOrdenRecepcion', N'OrdenRecepcionController', NULL, NULL, NULL)
INSERT [dbo].[Sam3_Pagina] ([PaginaID], [Accion], [Controlador], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (16, N'GenerarOrdenAlmacenaje', N'OrdenAlmacenajeController', NULL, NULL, NULL)
INSERT [dbo].[Sam3_Pagina] ([PaginaID], [Accion], [Controlador], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (17, N'DetalleOrdenAlmacenaje', N'OrdenAlmacenajeController', NULL, NULL, NULL)
INSERT [dbo].[Sam3_Pagina] ([PaginaID], [Accion], [Controlador], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (18, N'ListadoOrdenAlmacenaje', N'OrdenAlmacenajeController', NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[Sam3_Pagina] OFF
SET IDENTITY_INSERT [dbo].[Sam3_Patio] ON 

INSERT [dbo].[Sam3_Patio] ([PatioID], [Nombre], [Propietario], [Descripcion], [Activo], [UsuarioModificacion], [FechaModificacion], [RequierePermisoAduana]) VALUES (1, N'Patio Default', N'Propietario Default', N'Patio para integridad referencial', 1, 0, CAST(0x0000A4B2009B04AB AS DateTime), 1)
INSERT [dbo].[Sam3_Patio] ([PatioID], [Nombre], [Propietario], [Descripcion], [Activo], [UsuarioModificacion], [FechaModificacion], [RequierePermisoAduana]) VALUES (2, N'patio 1', N'propietario 1', N'des 1', 1, 1, CAST(0x0000A4B900BEEA15 AS DateTime), 0)
INSERT [dbo].[Sam3_Patio] ([PatioID], [Nombre], [Propietario], [Descripcion], [Activo], [UsuarioModificacion], [FechaModificacion], [RequierePermisoAduana]) VALUES (3, N'Comdistral', N'Bay International Colombia', N'Zona Franca Barranquilla, Colombia', 1, 1, CAST(0x0000A4FF0100D963 AS DateTime), 1)
INSERT [dbo].[Sam3_Patio] ([PatioID], [Nombre], [Propietario], [Descripcion], [Activo], [UsuarioModificacion], [FechaModificacion], [RequierePermisoAduana]) VALUES (4, N'Veracruz', N'BCA', N'TRAMPAS', 1, 1, CAST(0x0000A4FF0100D963 AS DateTime), 1)
INSERT [dbo].[Sam3_Patio] ([PatioID], [Nombre], [Propietario], [Descripcion], [Activo], [UsuarioModificacion], [FechaModificacion], [RequierePermisoAduana]) VALUES (5, N'Bay-Corpus Christi', N'BAY Ltd', N'', 1, 1, CAST(0x0000A4FF0100D963 AS DateTime), 1)
INSERT [dbo].[Sam3_Patio] ([PatioID], [Nombre], [Propietario], [Descripcion], [Activo], [UsuarioModificacion], [FechaModificacion], [RequierePermisoAduana]) VALUES (6, N'Bay Housto', N'BAY Ltf', N'', 1, 1, CAST(0x0000A4FF0100D963 AS DateTime), 1)
INSERT [dbo].[Sam3_Patio] ([PatioID], [Nombre], [Propietario], [Descripcion], [Activo], [UsuarioModificacion], [FechaModificacion], [RequierePermisoAduana]) VALUES (7, N'Bay Montana', N'BAY Ltd', N'', 1, 1, CAST(0x0000A4FF0100D963 AS DateTime), 1)
INSERT [dbo].[Sam3_Patio] ([PatioID], [Nombre], [Propietario], [Descripcion], [Activo], [UsuarioModificacion], [FechaModificacion], [RequierePermisoAduana]) VALUES (8, N'Altamira', N'Steelgo Fabricacion, S.A. DE C.V.', N'', 1, 1, CAST(0x0000A4FF0100D963 AS DateTime), 1)
INSERT [dbo].[Sam3_Patio] ([PatioID], [Nombre], [Propietario], [Descripcion], [Activo], [UsuarioModificacion], [FechaModificacion], [RequierePermisoAduana]) VALUES (1002, N'Patio Prueba 1', N'Patio Prueba 1', N'Patio Prueba 1', 1, 1, CAST(0x0000A4C100837016 AS DateTime), 1)
INSERT [dbo].[Sam3_Patio] ([PatioID], [Nombre], [Propietario], [Descripcion], [Activo], [UsuarioModificacion], [FechaModificacion], [RequierePermisoAduana]) VALUES (2002, N'Patio en Puerto', N'Luis Manriquez', N'Requiere Permiso', 1, 1, CAST(0x0000A4C800AFBD2A AS DateTime), 1)
INSERT [dbo].[Sam3_Patio] ([PatioID], [Nombre], [Propietario], [Descripcion], [Activo], [UsuarioModificacion], [FechaModificacion], [RequierePermisoAduana]) VALUES (2003, N'a', NULL, NULL, 1, 1, CAST(0x0000A4C800C0BF95 AS DateTime), 0)
INSERT [dbo].[Sam3_Patio] ([PatioID], [Nombre], [Propietario], [Descripcion], [Activo], [UsuarioModificacion], [FechaModificacion], [RequierePermisoAduana]) VALUES (2004, N'aa', NULL, NULL, 1, 1, CAST(0x0000A4C800C1064F AS DateTime), 0)
INSERT [dbo].[Sam3_Patio] ([PatioID], [Nombre], [Propietario], [Descripcion], [Activo], [UsuarioModificacion], [FechaModificacion], [RequierePermisoAduana]) VALUES (2005, N'Prueba Patio DELAI', N'Prueba Patio DELAI', N'Prueba Patio DELAI', 1, 1, CAST(0x0000A4C900C97074 AS DateTime), 1)
INSERT [dbo].[Sam3_Patio] ([PatioID], [Nombre], [Propietario], [Descripcion], [Activo], [UsuarioModificacion], [FechaModificacion], [RequierePermisoAduana]) VALUES (2006, N'Patio Prueba', N'Luis Manriquez', N'Coso', 1, 1, CAST(0x0000A4CD00827956 AS DateTime), 1)
INSERT [dbo].[Sam3_Patio] ([PatioID], [Nombre], [Propietario], [Descripcion], [Activo], [UsuarioModificacion], [FechaModificacion], [RequierePermisoAduana]) VALUES (2007, N'Patio Prueba', N'Luis Manriquez', N'Tiene Permiso', 1, 1, CAST(0x0000A4CD00A03736 AS DateTime), 1)
INSERT [dbo].[Sam3_Patio] ([PatioID], [Nombre], [Propietario], [Descripcion], [Activo], [UsuarioModificacion], [FechaModificacion], [RequierePermisoAduana]) VALUES (3006, N'Pat Material', N'Pat Material', N'Pat Material', 1, 1, CAST(0x0000A4EC00A2EDD1 AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[Sam3_Patio] OFF
SET IDENTITY_INSERT [dbo].[Sam3_Perfil] ON 

INSERT [dbo].[Sam3_Perfil] ([PerfilID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, N'Admin Pruebas', 1, NULL, NULL)
INSERT [dbo].[Sam3_Perfil] ([PerfilID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2, N'Listados', 1, NULL, NULL)
INSERT [dbo].[Sam3_Perfil] ([PerfilID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3, N'NuevosItems', 1, NULL, NULL)
SET IDENTITY_INSERT [dbo].[Sam3_Perfil] OFF
SET IDENTITY_INSERT [dbo].[Sam3_PermisoAduana] ON 

INSERT [dbo].[Sam3_PermisoAduana] ([PermisoAduanaID], [FolioAvisoLlegadaID], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [PermisoAutorizado], [PermisoTramite], [NumeroPermiso], [FechaGeneracion], [FechaAutorización]) VALUES (12, 8, N'Autorizado', 1, 1, CAST(0x0000A4CA00C40858 AS DateTime), 1, 0, 0, CAST(0x0000A4C100BA4CE2 AS DateTime), CAST(0x0000A4CA00C40858 AS DateTime))
INSERT [dbo].[Sam3_PermisoAduana] ([PermisoAduanaID], [FolioAvisoLlegadaID], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [PermisoAutorizado], [PermisoTramite], [NumeroPermiso], [FechaGeneracion], [FechaAutorización]) VALUES (16, 1016, N'Autorizado', 1, 1, CAST(0x0000A4CA00EDA67E AS DateTime), 1, 0, 0, NULL, CAST(0x0000A4CA00EDA67E AS DateTime))
INSERT [dbo].[Sam3_PermisoAduana] ([PermisoAduanaID], [FolioAvisoLlegadaID], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [PermisoAutorizado], [PermisoTramite], [NumeroPermiso], [FechaGeneracion], [FechaAutorización]) VALUES (18, 1017, N'Autorizado', 1, 1, CAST(0x0000A4C600BFDA05 AS DateTime), 1, 0, 1, CAST(0x0000A4C100A73AD7 AS DateTime), CAST(0x0000A4C600BFD9AA AS DateTime))
INSERT [dbo].[Sam3_PermisoAduana] ([PermisoAduanaID], [FolioAvisoLlegadaID], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [PermisoAutorizado], [PermisoTramite], [NumeroPermiso], [FechaGeneracion], [FechaAutorización]) VALUES (19, 1018, N'Autorizado', 1, 1, CAST(0x0000A4C600F44165 AS DateTime), 1, 0, 125555, CAST(0x0000A4C100BA80A3 AS DateTime), CAST(0x0000A4C600F44165 AS DateTime))
INSERT [dbo].[Sam3_PermisoAduana] ([PermisoAduanaID], [FolioAvisoLlegadaID], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [PermisoAutorizado], [PermisoTramite], [NumeroPermiso], [FechaGeneracion], [FechaAutorización]) VALUES (20, 1019, N'Creado', 1, 1, CAST(0x0000A4CA00C17AD8 AS DateTime), 0, 1, NULL, CAST(0x0000A4CA00C17AD9 AS DateTime), NULL)
INSERT [dbo].[Sam3_PermisoAduana] ([PermisoAduanaID], [FolioAvisoLlegadaID], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [PermisoAutorizado], [PermisoTramite], [NumeroPermiso], [FechaGeneracion], [FechaAutorización]) VALUES (21, 1020, N'Autorizado', 1, 1, CAST(0x0000A4C600D66922 AS DateTime), 1, 0, 1152, CAST(0x0000A4C100BC4844 AS DateTime), CAST(0x0000A4C600D668E5 AS DateTime))
INSERT [dbo].[Sam3_PermisoAduana] ([PermisoAduanaID], [FolioAvisoLlegadaID], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [PermisoAutorizado], [PermisoTramite], [NumeroPermiso], [FechaGeneracion], [FechaAutorización]) VALUES (22, 1029, N'Creado', 1, 1, CAST(0x0000A4C900E922FB AS DateTime), 0, 1, NULL, CAST(0x0000A4C900E922FB AS DateTime), NULL)
INSERT [dbo].[Sam3_PermisoAduana] ([PermisoAduanaID], [FolioAvisoLlegadaID], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [PermisoAutorizado], [PermisoTramite], [NumeroPermiso], [FechaGeneracion], [FechaAutorización]) VALUES (1003, 2021, N'Creado', 1, 1, CAST(0x0000A4C600D415AC AS DateTime), 0, 1, NULL, CAST(0x0000A4C600D415AD AS DateTime), NULL)
INSERT [dbo].[Sam3_PermisoAduana] ([PermisoAduanaID], [FolioAvisoLlegadaID], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [PermisoAutorizado], [PermisoTramite], [NumeroPermiso], [FechaGeneracion], [FechaAutorización]) VALUES (1004, 2037, N'Autorizado', 1, 1, CAST(0x0000A4CA00C395D8 AS DateTime), 1, 0, 0, CAST(0x0000A4C900C5E9A2 AS DateTime), CAST(0x0000A4CA00C395D8 AS DateTime))
INSERT [dbo].[Sam3_PermisoAduana] ([PermisoAduanaID], [FolioAvisoLlegadaID], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [PermisoAutorizado], [PermisoTramite], [NumeroPermiso], [FechaGeneracion], [FechaAutorización]) VALUES (1005, 2041, N'Autorizado', 1, 1, CAST(0x0000A4CA00C3441A AS DateTime), 1, 0, 0, CAST(0x0000A4CA007FDD58 AS DateTime), CAST(0x0000A4CA00C3441A AS DateTime))
INSERT [dbo].[Sam3_PermisoAduana] ([PermisoAduanaID], [FolioAvisoLlegadaID], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [PermisoAutorizado], [PermisoTramite], [NumeroPermiso], [FechaGeneracion], [FechaAutorización]) VALUES (1006, 2042, N'Creado', 1, 1, CAST(0x0000A4CA00CEA82B AS DateTime), 0, 1, NULL, CAST(0x0000A4CA00CEA82B AS DateTime), NULL)
INSERT [dbo].[Sam3_PermisoAduana] ([PermisoAduanaID], [FolioAvisoLlegadaID], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [PermisoAutorizado], [PermisoTramite], [NumeroPermiso], [FechaGeneracion], [FechaAutorización]) VALUES (1007, 2043, N'Autorizado', 1, 1, CAST(0x0000A4CA00EBCB8A AS DateTime), 1, 0, 11122, CAST(0x0000A4CA00D08904 AS DateTime), CAST(0x0000A4CA00EBCB8A AS DateTime))
INSERT [dbo].[Sam3_PermisoAduana] ([PermisoAduanaID], [FolioAvisoLlegadaID], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [PermisoAutorizado], [PermisoTramite], [NumeroPermiso], [FechaGeneracion], [FechaAutorización]) VALUES (1008, 2044, N'Autorizado', 1, 1, CAST(0x0000A4CA00E3A44F AS DateTime), 1, 0, 178521, CAST(0x0000A4CA00E35C2B AS DateTime), CAST(0x0000A4CA00E3A44F AS DateTime))
INSERT [dbo].[Sam3_PermisoAduana] ([PermisoAduanaID], [FolioAvisoLlegadaID], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [PermisoAutorizado], [PermisoTramite], [NumeroPermiso], [FechaGeneracion], [FechaAutorización]) VALUES (1009, 2045, N'Creado', 1, 1, CAST(0x0000A4CA00EBFDEF AS DateTime), 0, 1, NULL, CAST(0x0000A4CA00EBFDEF AS DateTime), NULL)
INSERT [dbo].[Sam3_PermisoAduana] ([PermisoAduanaID], [FolioAvisoLlegadaID], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [PermisoAutorizado], [PermisoTramite], [NumeroPermiso], [FechaGeneracion], [FechaAutorización]) VALUES (1010, 2048, N'Autorizado', 1, 1, CAST(0x0000A4CF008DB499 AS DateTime), 1, 0, 156666, CAST(0x0000A4CD00B3B452 AS DateTime), CAST(0x0000A4CF008DB499 AS DateTime))
INSERT [dbo].[Sam3_PermisoAduana] ([PermisoAduanaID], [FolioAvisoLlegadaID], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [PermisoAutorizado], [PermisoTramite], [NumeroPermiso], [FechaGeneracion], [FechaAutorización]) VALUES (1011, 2049, N'Creado', 1, 1, CAST(0x0000A4CD00BBDBB6 AS DateTime), 0, 1, NULL, CAST(0x0000A4CD00BBDBB6 AS DateTime), NULL)
INSERT [dbo].[Sam3_PermisoAduana] ([PermisoAduanaID], [FolioAvisoLlegadaID], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [PermisoAutorizado], [PermisoTramite], [NumeroPermiso], [FechaGeneracion], [FechaAutorización]) VALUES (1012, 2050, N'Creado', 1, 1, CAST(0x0000A4CD00BC3D6D AS DateTime), 0, 1, NULL, CAST(0x0000A4CD00BC3D6D AS DateTime), NULL)
INSERT [dbo].[Sam3_PermisoAduana] ([PermisoAduanaID], [FolioAvisoLlegadaID], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [PermisoAutorizado], [PermisoTramite], [NumeroPermiso], [FechaGeneracion], [FechaAutorización]) VALUES (1013, 2051, N'Creado', 1, 1, CAST(0x0000A4CD00BDBD03 AS DateTime), 0, 1, NULL, CAST(0x0000A4CD00BDBD03 AS DateTime), NULL)
INSERT [dbo].[Sam3_PermisoAduana] ([PermisoAduanaID], [FolioAvisoLlegadaID], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [PermisoAutorizado], [PermisoTramite], [NumeroPermiso], [FechaGeneracion], [FechaAutorización]) VALUES (1014, 2053, N'Autorizado', 1, 1, CAST(0x0000A4CD00C16E3B AS DateTime), 1, 0, 0, CAST(0x0000A4CD00BFE49A AS DateTime), CAST(0x0000A4CD00C16E3B AS DateTime))
INSERT [dbo].[Sam3_PermisoAduana] ([PermisoAduanaID], [FolioAvisoLlegadaID], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [PermisoAutorizado], [PermisoTramite], [NumeroPermiso], [FechaGeneracion], [FechaAutorización]) VALUES (1015, 2054, N'Autorizado', 1, 1, CAST(0x0000A4CD00E89E0D AS DateTime), 1, 0, 123000, CAST(0x0000A4CD00E85894 AS DateTime), CAST(0x0000A4CD00E89E0D AS DateTime))
INSERT [dbo].[Sam3_PermisoAduana] ([PermisoAduanaID], [FolioAvisoLlegadaID], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [PermisoAutorizado], [PermisoTramite], [NumeroPermiso], [FechaGeneracion], [FechaAutorización]) VALUES (1016, 2056, N'Autorizado', 1, 1, CAST(0x0000A4CE00B3C695 AS DateTime), 1, 0, 1475211, CAST(0x0000A4CE00B3A40F AS DateTime), CAST(0x0000A4CE00B3C695 AS DateTime))
INSERT [dbo].[Sam3_PermisoAduana] ([PermisoAduanaID], [FolioAvisoLlegadaID], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [PermisoAutorizado], [PermisoTramite], [NumeroPermiso], [FechaGeneracion], [FechaAutorización]) VALUES (1017, 2059, N'Creado', 1, 1, CAST(0x0000A4CE00F6DB73 AS DateTime), 0, 1, NULL, CAST(0x0000A4CE00F6DB73 AS DateTime), NULL)
INSERT [dbo].[Sam3_PermisoAduana] ([PermisoAduanaID], [FolioAvisoLlegadaID], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [PermisoAutorizado], [PermisoTramite], [NumeroPermiso], [FechaGeneracion], [FechaAutorización]) VALUES (1018, 2060, N'Autorizado', 1, 1, CAST(0x0000A4CE00F782B2 AS DateTime), 1, 0, 1244114, CAST(0x0000A4CE00F76BB5 AS DateTime), CAST(0x0000A4CE00F782B2 AS DateTime))
INSERT [dbo].[Sam3_PermisoAduana] ([PermisoAduanaID], [FolioAvisoLlegadaID], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [PermisoAutorizado], [PermisoTramite], [NumeroPermiso], [FechaGeneracion], [FechaAutorización]) VALUES (1019, 2061, N'Autorizado', 1, 1, CAST(0x0000A4CF00AF58AF AS DateTime), 1, 0, 154, CAST(0x0000A4CF00AE7956 AS DateTime), CAST(0x0000A4CF00AF58AF AS DateTime))
INSERT [dbo].[Sam3_PermisoAduana] ([PermisoAduanaID], [FolioAvisoLlegadaID], [Estatus], [Activo], [UsuarioModificacion], [FechaModificacion], [PermisoAutorizado], [PermisoTramite], [NumeroPermiso], [FechaGeneracion], [FechaAutorización]) VALUES (1020, 2063, N'Autorizado', 1, 1, CAST(0x0000A4CF00B122E0 AS DateTime), 1, 0, 206312, CAST(0x0000A4CF00B0EB5E AS DateTime), CAST(0x0000A4CF00B122E0 AS DateTime))
SET IDENTITY_INSERT [dbo].[Sam3_PermisoAduana] OFF
SET IDENTITY_INSERT [dbo].[Sam3_Propiedad] ON 

INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 1, N'username', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2, 1, N'password', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (5, 2, N'search', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (6, 2, N'notifications', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (7, 2, N'useroptions', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (8, 2, N'navigation', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (9, 9, N'proyecto', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (10, 9, N'fecharecepcion', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (14, 9, N'patio', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (15, 9, N'transportista', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (16, 9, N'plana', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (17, 9, N'chofer', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (19, 10, N'generar', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (20, 11, N'archivos', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (21, 11, N'numeropermiso', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (22, 12, N'listarArchivos', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (23, 13, N'imprimirpase', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (24, 18, N'contacto', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (25, 18, N'nombre', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (26, 18, N'descripcion', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (27, 18, N'direccion', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (28, 18, N'telefono', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (29, 19, N'nombre', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (30, 19, N'propietario', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (31, 19, N'descripcion', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (32, 20, N'contacto', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (33, 20, N'nombre', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (34, 20, N'descripcion', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (35, 20, N'direccion', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (36, 20, N'telefono', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (37, 21, N'tipoVehiculo', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (38, 21, N'chofer', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (39, 21, N'placas', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (40, 22, N'nombre', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (41, 9, N'tipoAviso', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (42, 9, N'cliente', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (43, 9, N'tipoArchivo', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (44, 9, N'seleccionarArchivo', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (45, 9, N'tracto', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (46, 9, N'listarArchivos', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (47, 19, N'requierepermiso', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (48, 21, N'tarjetacirculacion', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (49, 21, N'poliza', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (50, 21, N'unidad', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (51, 21, N'modelo', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (52, 23, N'tipoVehiculo', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (53, 23, N'camion', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (54, 23, N'placas', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (55, 23, N'unidad', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (56, 23, N'modelo', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (57, 11, N'folioAvisoLlegada', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (58, 21, N'transportista', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (59, 14, N'foloAvisoEntrada', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (60, 14, N'cliente', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (61, 14, N'proyecto', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (62, 14, N'proveedor', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (63, 14, N'ordencompra', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (64, 14, N'factura', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (65, 14, N'estatus', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (66, 14, N'descripcion', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (67, 14, N'seleccionarArchivo', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (68, 14, N'listarArchivos', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (69, 14, N'patio', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (70, 12, N'folioAvisoEntrada', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (71, 12, N'tipoArchivo', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (72, 12, N'seleccionarArchivo', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (73, 12, N'listaIncidencias', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (74, 24, N'folioAvisoEntradaID', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (75, 24, N'proyecto', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (76, 24, N'folioCuantificacion', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (77, 24, N'bulto', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (78, 24, N'packinglist', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (79, 24, N'tipoPackingList', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (80, 24, N'tipouso', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (81, 24, N'cargamasiva', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (82, 24, N'colada', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (83, 24, N'cantidad', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (84, 24, N'mm', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (85, 25, N'proyecto', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (86, 25, N'tipomaterial', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (87, 25, N'colada', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (88, 25, N'codigo', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (89, 25, N'descripcion', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (90, 25, N'familia', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (91, 26, N'descripcion', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (92, 26, N'familia', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (93, 26, N'peso', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (94, 26, N'diametro1', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (95, 26, N'diametro2', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (96, 26, N'area', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (97, 26, N'cedula', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (98, 26, N'codigo', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (99, 27, N'fabricante', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (100, 27, N'acero', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (101, 27, N'proyecto', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (102, 27, N'numerocolada', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (103, 27, N'numerocertificado', 1, NULL, NULL)
INSERT [dbo].[Sam3_Propiedad] ([PropiedadID], [EntidadID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (104, 27, N'holdcalidad', 1, NULL, NULL)
SET IDENTITY_INSERT [dbo].[Sam3_Propiedad] OFF
GO
SET IDENTITY_INSERT [dbo].[Sam3_Proveedor] ON 

INSERT [dbo].[Sam3_Proveedor] ([ProveedorID], [ContactoID], [Nombre], [Descripcion], [Direccion], [Telefono], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 1, N'Proveedor Default', N'Para propositos de integridad referencial', N'Vasconcelos 124, Tampiquito, San Pedro Garza Garcia, Nuevo Leon, México. CP. 66240', N'81922554', 1, 1, CAST(0x0000A4B2009EC81A AS DateTime))
INSERT [dbo].[Sam3_Proveedor] ([ProveedorID], [ContactoID], [Nombre], [Descripcion], [Direccion], [Telefono], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2, 1, N'Proveedor 1', N'Proveedor 1', N'Proveedor #105', N'8116007652', 1, 1, CAST(0x0000A4BA00E9AB11 AS DateTime))
INSERT [dbo].[Sam3_Proveedor] ([ProveedorID], [ContactoID], [Nombre], [Descripcion], [Direccion], [Telefono], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1002, 1, N'CEMEX', N'CEMEX', N'CEMEX', N'84566711', 1, 1, CAST(0x0000A4F000F64C3B AS DateTime))
INSERT [dbo].[Sam3_Proveedor] ([ProveedorID], [ContactoID], [Nombre], [Descripcion], [Direccion], [Telefono], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1003, 1, N'femex fut', N'femex fut', N'femex fut', N'841779999', 1, 1, CAST(0x0000A4F100AC7837 AS DateTime))
SET IDENTITY_INSERT [dbo].[Sam3_Proveedor] OFF
SET IDENTITY_INSERT [dbo].[Sam3_Proyecto] ON 

INSERT [dbo].[Sam3_Proyecto] ([ProyectoID], [PatioID], [ClienteID], [ContactoID], [ColorID], [Nombre], [Descripcion], [FechaInicio], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 1, 1, 1, 1, N'Proyecto Default', N'Para propositos de pruebas e integridad de datos', CAST(0x0000A4B2009D9E7C AS DateTime), 1, 1, CAST(0x0000A4B2009D9E7C AS DateTime))
INSERT [dbo].[Sam3_Proyecto] ([ProyectoID], [PatioID], [ClienteID], [ContactoID], [ColorID], [Nombre], [Descripcion], [FechaInicio], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2, 1, 1, 1, 1, N'Proyecto Pruebas 2', N'Pruebas Sam 3.0', CAST(0x0000A4BB00000000 AS DateTime), 1, 1, CAST(0x0000A4BB01090293 AS DateTime))
INSERT [dbo].[Sam3_Proyecto] ([ProyectoID], [PatioID], [ClienteID], [ContactoID], [ColorID], [Nombre], [Descripcion], [FechaInicio], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3, 1, 1, 1, 14, N'Reficar', N'Reficar', CAST(0x0000A03000000000 AS DateTime), 1, 1, CAST(0x0000A4FF0103BE81 AS DateTime))
INSERT [dbo].[Sam3_Proyecto] ([ProyectoID], [PatioID], [ClienteID], [ContactoID], [ColorID], [Nombre], [Descripcion], [FechaInicio], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (4, 1, 1, 2, 14, N'Reficar (Pre-Buy)', N'Reficar (Pre-Buy)', CAST(0x0000A19300000000 AS DateTime), 1, 1, CAST(0x0000A4FF0103BE81 AS DateTime))
INSERT [dbo].[Sam3_Proyecto] ([ProyectoID], [PatioID], [ClienteID], [ContactoID], [ColorID], [Nombre], [Descripcion], [FechaInicio], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (5, 1, 1, 5, 14, N'Reficar (Mtls Shipped)', N'Reficar (Mtls Shipped)', CAST(0x0000A19300000000 AS DateTime), 1, 1, CAST(0x0000A4FF0103BE81 AS DateTime))
INSERT [dbo].[Sam3_Proyecto] ([ProyectoID], [PatioID], [ClienteID], [ContactoID], [ColorID], [Nombre], [Descripcion], [FechaInicio], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (6, 2, 2, 40, 14, N'Trampas 5 Presidentes', N'Trampas 5 Presidentes', CAST(0x00009F5700000000 AS DateTime), 1, 1, CAST(0x0000A4FF0103BE81 AS DateTime))
INSERT [dbo].[Sam3_Proyecto] ([ProyectoID], [PatioID], [ClienteID], [ContactoID], [ColorID], [Nombre], [Descripcion], [FechaInicio], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (7, 3, 3, 42, 14, N'Vale LHPP - Stage 2', N'Vale LHPP - Stage 2', CAST(0x00009F1A00000000 AS DateTime), 1, 1, CAST(0x0000A4FF0103BE81 AS DateTime))
INSERT [dbo].[Sam3_Proyecto] ([ProyectoID], [PatioID], [ClienteID], [ContactoID], [ColorID], [Nombre], [Descripcion], [FechaInicio], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (8, 2, 3, 52, 14, N'Prueba', N'Prueba', CAST(0x0000A1D300000000 AS DateTime), 1, 1, CAST(0x0000A4FF0103BE81 AS DateTime))
INSERT [dbo].[Sam3_Proyecto] ([ProyectoID], [PatioID], [ClienteID], [ContactoID], [ColorID], [Nombre], [Descripcion], [FechaInicio], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (9, 3, 3, 66, 14, N'Vale LHPP-Stage 1.1', N'Vale LHPP-Stage 1.1', CAST(0x00009F1800000000 AS DateTime), 1, 1, CAST(0x0000A4FF0103BE81 AS DateTime))
INSERT [dbo].[Sam3_Proyecto] ([ProyectoID], [PatioID], [ClienteID], [ContactoID], [ColorID], [Nombre], [Descripcion], [FechaInicio], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (10, 3, 4, 108, 6, N'Hess Wheelock', N'Hess Wheelock', CAST(0x00009FDB00000000 AS DateTime), 1, 1, CAST(0x0000A4FF0103BE81 AS DateTime))
INSERT [dbo].[Sam3_Proyecto] ([ProyectoID], [PatioID], [ClienteID], [ContactoID], [ColorID], [Nombre], [Descripcion], [FechaInicio], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (11, 3, 5, 118, 14, N'CNRL', N'CNRL', CAST(0x0000A23500000000 AS DateTime), 1, 1, CAST(0x0000A4FF0103BE81 AS DateTime))
INSERT [dbo].[Sam3_Proyecto] ([ProyectoID], [PatioID], [ClienteID], [ContactoID], [ColorID], [Nombre], [Descripcion], [FechaInicio], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (12, 3, 6, 124, 10, N'FAB HELENA MODULES', N'FAB PIPE RACK MODULES FOR HELENA JOB SITE', CAST(0x00009FB400000000 AS DateTime), 1, 1, CAST(0x0000A4FF0103BE81 AS DateTime))
INSERT [dbo].[Sam3_Proyecto] ([ProyectoID], [PatioID], [ClienteID], [ContactoID], [ColorID], [Nombre], [Descripcion], [FechaInicio], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (13, 3, 6, 125, 13, N'FAB SUGARLOAF MODULES', N'FAB PIPE RACK MODULES FOR SUGARLOAF JOB SITE', CAST(0x00009FB400000000 AS DateTime), 1, 1, CAST(0x0000A4FF0103BE81 AS DateTime))
INSERT [dbo].[Sam3_Proyecto] ([ProyectoID], [PatioID], [ClienteID], [ContactoID], [ColorID], [Nombre], [Descripcion], [FechaInicio], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (14, 3, 4, 126, 3, N'HESS SOARKNESS', N'', CAST(0x00009FDB00000000 AS DateTime), 1, 1, CAST(0x0000A4FF0103BE81 AS DateTime))
INSERT [dbo].[Sam3_Proyecto] ([ProyectoID], [PatioID], [ClienteID], [ContactoID], [ColorID], [Nombre], [Descripcion], [FechaInicio], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (15, 6, 7, 195, 3, N'CCC Salamanca', N'CCC Salamanca', CAST(0x0000A44500000000 AS DateTime), 1, 1, CAST(0x0000A4FF0103BE81 AS DateTime))
INSERT [dbo].[Sam3_Proyecto] ([ProyectoID], [PatioID], [ClienteID], [ContactoID], [ColorID], [Nombre], [Descripcion], [FechaInicio], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (16, 1, 8, 217, 14, N'EXPRO-PETROINDEPENDENCIA', N'EXPRO-PETROINDEPENDENCIA', CAST(0x0000A1A100000000 AS DateTime), 1, 1, CAST(0x0000A4FF0103BE81 AS DateTime))
INSERT [dbo].[Sam3_Proyecto] ([ProyectoID], [PatioID], [ClienteID], [ContactoID], [ColorID], [Nombre], [Descripcion], [FechaInicio], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (17, 6, 9, 223, 14, N'ETILENO XXI', N'ETILENO XXI', CAST(0x0000A45000000000 AS DateTime), 1, 1, CAST(0x0000A4FF0103BE81 AS DateTime))
INSERT [dbo].[Sam3_Proyecto] ([ProyectoID], [PatioID], [ClienteID], [ContactoID], [ColorID], [Nombre], [Descripcion], [FechaInicio], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (18, 6, 9, 240, 6, N'CROSSOVER PIPING', N'CROSSOVER PIPING', CAST(0x0000A1D200000000 AS DateTime), 1, 1, CAST(0x0000A4FF0103BE81 AS DateTime))
INSERT [dbo].[Sam3_Proyecto] ([ProyectoID], [PatioID], [ClienteID], [ContactoID], [ColorID], [Nombre], [Descripcion], [FechaInicio], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (19, 6, 10, 287, 3, N'DUPONT ALTAMIRA2', N'DUPONT ALTAMIRA2', CAST(0x0000A3AF00000000 AS DateTime), 1, 1, CAST(0x0000A4FF0103BE81 AS DateTime))
INSERT [dbo].[Sam3_Proyecto] ([ProyectoID], [PatioID], [ClienteID], [ContactoID], [ColorID], [Nombre], [Descripcion], [FechaInicio], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (20, 6, 11, 436, 10, N'CB LITORAL', N'CB LITORAL', CAST(0x0000A3AF00000000 AS DateTime), 1, 1, CAST(0x0000A4FF0103BE81 AS DateTime))
INSERT [dbo].[Sam3_Proyecto] ([ProyectoID], [PatioID], [ClienteID], [ContactoID], [ColorID], [Nombre], [Descripcion], [FechaInicio], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (21, 6, 12, 437, 13, N'NEJO III', N'NEJO III', CAST(0x0000A3AF00000000 AS DateTime), 1, 1, CAST(0x0000A4FF0103BE81 AS DateTime))
INSERT [dbo].[Sam3_Proyecto] ([ProyectoID], [PatioID], [ClienteID], [ContactoID], [ColorID], [Nombre], [Descripcion], [FechaInicio], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (22, 6, 14, 438, 2, N'DEFENSAS LITORAL', N'DEFENSAS LITORAL', CAST(0x0000A3AF00000000 AS DateTime), 1, 1, CAST(0x0000A4FF0103BE81 AS DateTime))
INSERT [dbo].[Sam3_Proyecto] ([ProyectoID], [PatioID], [ClienteID], [ContactoID], [ColorID], [Nombre], [Descripcion], [FechaInicio], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (23, 6, 13, 439, 12, N'MONTAJE TURBINA BOP MADERO', N'MONTAJE TURBINA BOP MADERO', CAST(0x0000A3AF00000000 AS DateTime), 1, 1, CAST(0x0000A4FF0103BE81 AS DateTime))
INSERT [dbo].[Sam3_Proyecto] ([ProyectoID], [PatioID], [ClienteID], [ContactoID], [ColorID], [Nombre], [Descripcion], [FechaInicio], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (24, 6, 11, 475, 10, N'SOPORTES CB LITORAL', N'SOPORTES CB LITORAL', CAST(0x0000A34D00000000 AS DateTime), 1, 1, CAST(0x0000A4FF0103BE81 AS DateTime))
INSERT [dbo].[Sam3_Proyecto] ([ProyectoID], [PatioID], [ClienteID], [ContactoID], [ColorID], [Nombre], [Descripcion], [FechaInicio], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (25, 6, 13, 492, 14, N'SOPORTES MONTAJE TURBINA', N'SOPORTES MONTAJE TURBINA', CAST(0x0000A37100000000 AS DateTime), 1, 1, CAST(0x0000A4FF0103BE81 AS DateTime))
INSERT [dbo].[Sam3_Proyecto] ([ProyectoID], [PatioID], [ClienteID], [ContactoID], [ColorID], [Nombre], [Descripcion], [FechaInicio], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (26, 6, 15, 504, 12, N'ARREGLO DE CUBETAS TRAMPAS', N'ARREGLO DE CUBETAS TRAMPAS', CAST(0x0000A3AF00000000 AS DateTime), 1, 1, CAST(0x0000A4FF0103BE81 AS DateTime))
INSERT [dbo].[Sam3_Proyecto] ([ProyectoID], [PatioID], [ClienteID], [ContactoID], [ColorID], [Nombre], [Descripcion], [FechaInicio], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (27, 6, 11, 572, 2, N'DECK CBLITORAL', N'DECK CBLITORAL', CAST(0x0000A3F800000000 AS DateTime), 1, 1, CAST(0x0000A4FF0103BE81 AS DateTime))
INSERT [dbo].[Sam3_Proyecto] ([ProyectoID], [PatioID], [ClienteID], [ContactoID], [ColorID], [Nombre], [Descripcion], [FechaInicio], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (28, 6, 11, 590, 14, N'SOPORTES DECK CBLITORAL', N'', CAST(0x0000A3E900000000 AS DateTime), 1, 1, CAST(0x0000A4FF0103BE81 AS DateTime))
INSERT [dbo].[Sam3_Proyecto] ([ProyectoID], [PatioID], [ClienteID], [ContactoID], [ColorID], [Nombre], [Descripcion], [FechaInicio], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (29, 6, 17, 599, 3, N'RAMONES II - AOT', N'RAMONES II - AOT', CAST(0x0000A45900000000 AS DateTime), 1, 1, CAST(0x0000A4FF0103BE81 AS DateTime))
INSERT [dbo].[Sam3_Proyecto] ([ProyectoID], [PatioID], [ClienteID], [ContactoID], [ColorID], [Nombre], [Descripcion], [FechaInicio], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (30, 6, 16, 616, 13, N'PESQUERIA CTP - TECHINT', N'PESQUERIA CTP - TECHINT', CAST(0x0000A45F00000000 AS DateTime), 1, 1, CAST(0x0000A4FF0103BE81 AS DateTime))
SET IDENTITY_INSERT [dbo].[Sam3_Proyecto] OFF
INSERT [dbo].[Sam3_ProyectoConfiguracion] ([ProyectoID], [PrefijoNumeroUnico], [PrefijoOrdenTrabajo], [DigitosNumeroUnico], [DigitosOrdenTrabajo], [ToleranciaCortes], [AnguloBisel], [CuadroTubero], [CuadroRaiz], [CuadroRelleno], [UsuarioModifica], [FechaModificacion], [ActualizaLocalizacion], [CorreoPeqKgEsp], [DigitosFolioPreparacion], [ManejaReserva], [UsuarioModificacion], [Activo], [DigitosOrdeAlmacenaje], [DigitosFolioDescarga], [DigitosFolioAvisollegada], [GigitosFolioPaseSalida], [DigitosFolioOrdenRecepcion], [DigitosFolioCuantifiacion], [DigitosFolioOrdenAlmacenaje], [DigitosFolioPermisoAduana]) VALUES (1, N'CE', N'R', 4, 3, 200, N'30', 0.0000, 0.0000, 0.0000, N'dd8ad7bf-5c37-44e6-aa34-e388c2b489ff', CAST(0x0000A03000811AD2 AS DateTime), 0, NULL, 3, NULL, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3)
INSERT [dbo].[Sam3_ProyectoConfiguracion] ([ProyectoID], [PrefijoNumeroUnico], [PrefijoOrdenTrabajo], [DigitosNumeroUnico], [DigitosOrdenTrabajo], [ToleranciaCortes], [AnguloBisel], [CuadroTubero], [CuadroRaiz], [CuadroRelleno], [UsuarioModifica], [FechaModificacion], [ActualizaLocalizacion], [CorreoPeqKgEsp], [DigitosFolioPreparacion], [ManejaReserva], [UsuarioModificacion], [Activo], [DigitosOrdeAlmacenaje], [DigitosFolioDescarga], [DigitosFolioAvisollegada], [GigitosFolioPaseSalida], [DigitosFolioOrdenRecepcion], [DigitosFolioCuantifiacion], [DigitosFolioOrdenAlmacenaje], [DigitosFolioPermisoAduana]) VALUES (2, N'CE', N'R', 4, 3, 0, N'0', 0.0000, 0.0000, 0.0000, N'95ad3b93-f752-4f06-95fe-78252b1ec715', CAST(0x0000A19300DC6D1C AS DateTime), 0, NULL, 3, NULL, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3)
INSERT [dbo].[Sam3_ProyectoConfiguracion] ([ProyectoID], [PrefijoNumeroUnico], [PrefijoOrdenTrabajo], [DigitosNumeroUnico], [DigitosOrdenTrabajo], [ToleranciaCortes], [AnguloBisel], [CuadroTubero], [CuadroRaiz], [CuadroRelleno], [UsuarioModifica], [FechaModificacion], [ActualizaLocalizacion], [CorreoPeqKgEsp], [DigitosFolioPreparacion], [ManejaReserva], [UsuarioModificacion], [Activo], [DigitosOrdeAlmacenaje], [DigitosFolioDescarga], [DigitosFolioAvisollegada], [GigitosFolioPaseSalida], [DigitosFolioOrdenRecepcion], [DigitosFolioCuantifiacion], [DigitosFolioOrdenAlmacenaje], [DigitosFolioPermisoAduana]) VALUES (3, N'CE', N'R', 4, 3, 0, N'0', 0.0000, 0.0000, 0.0000, N'95ad3b93-f752-4f06-95fe-78252b1ec715', CAST(0x0000A19300DC5B0C AS DateTime), 0, NULL, 3, NULL, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3)
INSERT [dbo].[Sam3_ProyectoConfiguracion] ([ProyectoID], [PrefijoNumeroUnico], [PrefijoOrdenTrabajo], [DigitosNumeroUnico], [DigitosOrdenTrabajo], [ToleranciaCortes], [AnguloBisel], [CuadroTubero], [CuadroRaiz], [CuadroRelleno], [UsuarioModifica], [FechaModificacion], [ActualizaLocalizacion], [CorreoPeqKgEsp], [DigitosFolioPreparacion], [ManejaReserva], [UsuarioModificacion], [Activo], [DigitosOrdeAlmacenaje], [DigitosFolioDescarga], [DigitosFolioAvisollegada], [GigitosFolioPaseSalida], [DigitosFolioOrdenRecepcion], [DigitosFolioCuantifiacion], [DigitosFolioOrdenAlmacenaje], [DigitosFolioPermisoAduana]) VALUES (4, N'TP', N'T', 4, 4, 0, N'0', 0.0000, 0.0000, 0.0000, N'95ad3b93-f752-4f06-95fe-78252b1ec715', CAST(0x00009F57007E2FFD AS DateTime), 0, NULL, 3, NULL, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3)
INSERT [dbo].[Sam3_ProyectoConfiguracion] ([ProyectoID], [PrefijoNumeroUnico], [PrefijoOrdenTrabajo], [DigitosNumeroUnico], [DigitosOrdenTrabajo], [ToleranciaCortes], [AnguloBisel], [CuadroTubero], [CuadroRaiz], [CuadroRelleno], [UsuarioModifica], [FechaModificacion], [ActualizaLocalizacion], [CorreoPeqKgEsp], [DigitosFolioPreparacion], [ManejaReserva], [UsuarioModificacion], [Activo], [DigitosOrdeAlmacenaje], [DigitosFolioDescarga], [DigitosFolioAvisollegada], [GigitosFolioPaseSalida], [DigitosFolioOrdenRecepcion], [DigitosFolioCuantifiacion], [DigitosFolioOrdenAlmacenaje], [DigitosFolioPermisoAduana]) VALUES (6, N'VL', N'F', 4, 3, 0, N'0', 0.0000, 0.0000, 0.0000, N'95ad3b93-f752-4f06-95fe-78252b1ec715', CAST(0x00009F1A00BB0031 AS DateTime), 0, NULL, 3, NULL, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3)
INSERT [dbo].[Sam3_ProyectoConfiguracion] ([ProyectoID], [PrefijoNumeroUnico], [PrefijoOrdenTrabajo], [DigitosNumeroUnico], [DigitosOrdenTrabajo], [ToleranciaCortes], [AnguloBisel], [CuadroTubero], [CuadroRaiz], [CuadroRelleno], [UsuarioModifica], [FechaModificacion], [ActualizaLocalizacion], [CorreoPeqKgEsp], [DigitosFolioPreparacion], [ManejaReserva], [UsuarioModificacion], [Activo], [DigitosOrdeAlmacenaje], [DigitosFolioDescarga], [DigitosFolioAvisollegada], [GigitosFolioPaseSalida], [DigitosFolioOrdenRecepcion], [DigitosFolioCuantifiacion], [DigitosFolioOrdenAlmacenaje], [DigitosFolioPermisoAduana]) VALUES (7, N'PU', N'P', 3, 3, 0, N'0', 0.0000, 0.0000, 0.0000, N'95ad3b93-f752-4f06-95fe-78252b1ec715', CAST(0x0000A1D300ACC0F4 AS DateTime), 0, NULL, 3, NULL, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3)
INSERT [dbo].[Sam3_ProyectoConfiguracion] ([ProyectoID], [PrefijoNumeroUnico], [PrefijoOrdenTrabajo], [DigitosNumeroUnico], [DigitosOrdenTrabajo], [ToleranciaCortes], [AnguloBisel], [CuadroTubero], [CuadroRaiz], [CuadroRelleno], [UsuarioModifica], [FechaModificacion], [ActualizaLocalizacion], [CorreoPeqKgEsp], [DigitosFolioPreparacion], [ManejaReserva], [UsuarioModificacion], [Activo], [DigitosOrdeAlmacenaje], [DigitosFolioDescarga], [DigitosFolioAvisollegada], [GigitosFolioPaseSalida], [DigitosFolioOrdenRecepcion], [DigitosFolioCuantifiacion], [DigitosFolioOrdenAlmacenaje], [DigitosFolioPermisoAduana]) VALUES (8, N'VM', N'V', 4, 4, 0, N'0', 0.0000, 0.0000, 0.0000, N'95ad3b93-f752-4f06-95fe-78252b1ec715', CAST(0x00009F1800C32A29 AS DateTime), 0, NULL, 3, NULL, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3)
INSERT [dbo].[Sam3_ProyectoConfiguracion] ([ProyectoID], [PrefijoNumeroUnico], [PrefijoOrdenTrabajo], [DigitosNumeroUnico], [DigitosOrdenTrabajo], [ToleranciaCortes], [AnguloBisel], [CuadroTubero], [CuadroRaiz], [CuadroRelleno], [UsuarioModifica], [FechaModificacion], [ActualizaLocalizacion], [CorreoPeqKgEsp], [DigitosFolioPreparacion], [ManejaReserva], [UsuarioModificacion], [Activo], [DigitosOrdeAlmacenaje], [DigitosFolioDescarga], [DigitosFolioAvisollegada], [GigitosFolioPaseSalida], [DigitosFolioOrdenRecepcion], [DigitosFolioCuantifiacion], [DigitosFolioOrdenAlmacenaje], [DigitosFolioPermisoAduana]) VALUES (9, N'HW', N'W', 3, 2, 0, N'0', 0.0000, 0.0000, 0.0000, N'c5f6b154-1d2f-423d-ac71-f8d4517a5722', CAST(0x00009FDB00AC21A3 AS DateTime), 0, NULL, 3, NULL, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3)
INSERT [dbo].[Sam3_ProyectoConfiguracion] ([ProyectoID], [PrefijoNumeroUnico], [PrefijoOrdenTrabajo], [DigitosNumeroUnico], [DigitosOrdenTrabajo], [ToleranciaCortes], [AnguloBisel], [CuadroTubero], [CuadroRaiz], [CuadroRelleno], [UsuarioModifica], [FechaModificacion], [ActualizaLocalizacion], [CorreoPeqKgEsp], [DigitosFolioPreparacion], [ManejaReserva], [UsuarioModificacion], [Activo], [DigitosOrdeAlmacenaje], [DigitosFolioDescarga], [DigitosFolioAvisollegada], [GigitosFolioPaseSalida], [DigitosFolioOrdenRecepcion], [DigitosFolioCuantifiacion], [DigitosFolioOrdenAlmacenaje], [DigitosFolioPermisoAduana]) VALUES (10, N'CN', N'C', 3, 3, 0, N'0', 0.0000, 0.0000, 0.0000, N'7e329b8f-6695-488a-a4c9-5343245a379f', CAST(0x0000A23500FF10C7 AS DateTime), 0, NULL, 3, NULL, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3)
INSERT [dbo].[Sam3_ProyectoConfiguracion] ([ProyectoID], [PrefijoNumeroUnico], [PrefijoOrdenTrabajo], [DigitosNumeroUnico], [DigitosOrdenTrabajo], [ToleranciaCortes], [AnguloBisel], [CuadroTubero], [CuadroRaiz], [CuadroRelleno], [UsuarioModifica], [FechaModificacion], [ActualizaLocalizacion], [CorreoPeqKgEsp], [DigitosFolioPreparacion], [ManejaReserva], [UsuarioModificacion], [Activo], [DigitosOrdeAlmacenaje], [DigitosFolioDescarga], [DigitosFolioAvisollegada], [GigitosFolioPaseSalida], [DigitosFolioOrdenRecepcion], [DigitosFolioCuantifiacion], [DigitosFolioOrdenAlmacenaje], [DigitosFolioPermisoAduana]) VALUES (11, N'CA', N'A', 3, 2, 0, N'0', 0.0000, 0.0000, 0.0000, N'c5f6b154-1d2f-423d-ac71-f8d4517a5722', CAST(0x00009FDB00B15884 AS DateTime), 0, NULL, 3, NULL, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3)
INSERT [dbo].[Sam3_ProyectoConfiguracion] ([ProyectoID], [PrefijoNumeroUnico], [PrefijoOrdenTrabajo], [DigitosNumeroUnico], [DigitosOrdenTrabajo], [ToleranciaCortes], [AnguloBisel], [CuadroTubero], [CuadroRaiz], [CuadroRelleno], [UsuarioModifica], [FechaModificacion], [ActualizaLocalizacion], [CorreoPeqKgEsp], [DigitosFolioPreparacion], [ManejaReserva], [UsuarioModificacion], [Activo], [DigitosOrdeAlmacenaje], [DigitosFolioDescarga], [DigitosFolioAvisollegada], [GigitosFolioPaseSalida], [DigitosFolioOrdenRecepcion], [DigitosFolioCuantifiacion], [DigitosFolioOrdenAlmacenaje], [DigitosFolioPermisoAduana]) VALUES (12, N'CS', N'S', 3, 2, 0, N'0', 0.0000, 0.0000, 0.0000, N'c5f6b154-1d2f-423d-ac71-f8d4517a5722', CAST(0x00009FDB00B1FCD9 AS DateTime), 0, NULL, 3, NULL, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3)
INSERT [dbo].[Sam3_ProyectoConfiguracion] ([ProyectoID], [PrefijoNumeroUnico], [PrefijoOrdenTrabajo], [DigitosNumeroUnico], [DigitosOrdenTrabajo], [ToleranciaCortes], [AnguloBisel], [CuadroTubero], [CuadroRaiz], [CuadroRelleno], [UsuarioModifica], [FechaModificacion], [ActualizaLocalizacion], [CorreoPeqKgEsp], [DigitosFolioPreparacion], [ManejaReserva], [UsuarioModificacion], [Activo], [DigitosOrdeAlmacenaje], [DigitosFolioDescarga], [DigitosFolioAvisollegada], [GigitosFolioPaseSalida], [DigitosFolioOrdenRecepcion], [DigitosFolioCuantifiacion], [DigitosFolioOrdenAlmacenaje], [DigitosFolioPermisoAduana]) VALUES (13, N'HS', N'H', 3, 2, 0, N'0', 0.0000, 0.0000, 0.0000, N'c5f6b154-1d2f-423d-ac71-f8d4517a5722', CAST(0x00009FDB00B2C9FB AS DateTime), 0, NULL, 3, NULL, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3)
INSERT [dbo].[Sam3_ProyectoConfiguracion] ([ProyectoID], [PrefijoNumeroUnico], [PrefijoOrdenTrabajo], [DigitosNumeroUnico], [DigitosOrdenTrabajo], [ToleranciaCortes], [AnguloBisel], [CuadroTubero], [CuadroRaiz], [CuadroRelleno], [UsuarioModifica], [FechaModificacion], [ActualizaLocalizacion], [CorreoPeqKgEsp], [DigitosFolioPreparacion], [ManejaReserva], [UsuarioModificacion], [Activo], [DigitosOrdeAlmacenaje], [DigitosFolioDescarga], [DigitosFolioAvisollegada], [GigitosFolioPaseSalida], [DigitosFolioOrdenRecepcion], [DigitosFolioCuantifiacion], [DigitosFolioOrdenAlmacenaje], [DigitosFolioPermisoAduana]) VALUES (14, N'IS', N'S', 4, 3, 0, N'0', 0.0000, 0.0000, 0.0000, N'95ad3b93-f752-4f06-95fe-78252b1ec715', CAST(0x0000A44500A9B437 AS DateTime), 0, N'', 3, NULL, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3)
INSERT [dbo].[Sam3_ProyectoConfiguracion] ([ProyectoID], [PrefijoNumeroUnico], [PrefijoOrdenTrabajo], [DigitosNumeroUnico], [DigitosOrdenTrabajo], [ToleranciaCortes], [AnguloBisel], [CuadroTubero], [CuadroRaiz], [CuadroRelleno], [UsuarioModifica], [FechaModificacion], [ActualizaLocalizacion], [CorreoPeqKgEsp], [DigitosFolioPreparacion], [ManejaReserva], [UsuarioModificacion], [Activo], [DigitosOrdeAlmacenaje], [DigitosFolioDescarga], [DigitosFolioAvisollegada], [GigitosFolioPaseSalida], [DigitosFolioOrdenRecepcion], [DigitosFolioCuantifiacion], [DigitosFolioOrdenAlmacenaje], [DigitosFolioPermisoAduana]) VALUES (15, N'EX', N'E', 4, 3, 0, N'0', 0.0000, 0.0000, 0.0000, N'95ad3b93-f752-4f06-95fe-78252b1ec715', CAST(0x0000A1A100A81466 AS DateTime), 0, NULL, 3, NULL, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3)
INSERT [dbo].[Sam3_ProyectoConfiguracion] ([ProyectoID], [PrefijoNumeroUnico], [PrefijoOrdenTrabajo], [DigitosNumeroUnico], [DigitosOrdenTrabajo], [ToleranciaCortes], [AnguloBisel], [CuadroTubero], [CuadroRaiz], [CuadroRelleno], [UsuarioModifica], [FechaModificacion], [ActualizaLocalizacion], [CorreoPeqKgEsp], [DigitosFolioPreparacion], [ManejaReserva], [UsuarioModificacion], [Activo], [DigitosOrdeAlmacenaje], [DigitosFolioDescarga], [DigitosFolioAvisollegada], [GigitosFolioPaseSalida], [DigitosFolioOrdenRecepcion], [DigitosFolioCuantifiacion], [DigitosFolioOrdenAlmacenaje], [DigitosFolioPermisoAduana]) VALUES (16, N'EI', N'X', 5, 4, 0, N'0', 0.0000, 0.0000, 0.0000, N'7e329b8f-6695-488a-a4c9-5343245a379f', CAST(0x0000A45000AD8BC7 AS DateTime), 1, N'fabiola.moran@steelgo.com;eduardo.flores@steelgo.com', 3, NULL, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3)
INSERT [dbo].[Sam3_ProyectoConfiguracion] ([ProyectoID], [PrefijoNumeroUnico], [PrefijoOrdenTrabajo], [DigitosNumeroUnico], [DigitosOrdenTrabajo], [ToleranciaCortes], [AnguloBisel], [CuadroTubero], [CuadroRaiz], [CuadroRelleno], [UsuarioModifica], [FechaModificacion], [ActualizaLocalizacion], [CorreoPeqKgEsp], [DigitosFolioPreparacion], [ManejaReserva], [UsuarioModificacion], [Activo], [DigitosOrdeAlmacenaje], [DigitosFolioDescarga], [DigitosFolioAvisollegada], [GigitosFolioPaseSalida], [DigitosFolioOrdenRecepcion], [DigitosFolioCuantifiacion], [DigitosFolioOrdenAlmacenaje], [DigitosFolioPermisoAduana]) VALUES (17, N'CT', N'C', 4, 3, 0, N'0', 0.0000, 0.0000, 0.0000, N'95ad3b93-f752-4f06-95fe-78252b1ec715', CAST(0x0000A1D201105D5D AS DateTime), 0, NULL, 3, NULL, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3)
INSERT [dbo].[Sam3_ProyectoConfiguracion] ([ProyectoID], [PrefijoNumeroUnico], [PrefijoOrdenTrabajo], [DigitosNumeroUnico], [DigitosOrdenTrabajo], [ToleranciaCortes], [AnguloBisel], [CuadroTubero], [CuadroRaiz], [CuadroRelleno], [UsuarioModifica], [FechaModificacion], [ActualizaLocalizacion], [CorreoPeqKgEsp], [DigitosFolioPreparacion], [ManejaReserva], [UsuarioModificacion], [Activo], [DigitosOrdeAlmacenaje], [DigitosFolioDescarga], [DigitosFolioAvisollegada], [GigitosFolioPaseSalida], [DigitosFolioOrdenRecepcion], [DigitosFolioCuantifiacion], [DigitosFolioOrdenAlmacenaje], [DigitosFolioPermisoAduana]) VALUES (18, N'AN', N'W', 4, 3, 0, N'0', 0.0000, 0.0000, 0.0000, N'95ad3b93-f752-4f06-95fe-78252b1ec715', CAST(0x0000A3AF00DF549D AS DateTime), 1, N'fabiola.moran@steelgo.com', 3, NULL, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3)
INSERT [dbo].[Sam3_ProyectoConfiguracion] ([ProyectoID], [PrefijoNumeroUnico], [PrefijoOrdenTrabajo], [DigitosNumeroUnico], [DigitosOrdenTrabajo], [ToleranciaCortes], [AnguloBisel], [CuadroTubero], [CuadroRaiz], [CuadroRelleno], [UsuarioModifica], [FechaModificacion], [ActualizaLocalizacion], [CorreoPeqKgEsp], [DigitosFolioPreparacion], [ManejaReserva], [UsuarioModificacion], [Activo], [DigitosOrdeAlmacenaje], [DigitosFolioDescarga], [DigitosFolioAvisollegada], [GigitosFolioPaseSalida], [DigitosFolioOrdenRecepcion], [DigitosFolioCuantifiacion], [DigitosFolioOrdenAlmacenaje], [DigitosFolioPermisoAduana]) VALUES (19, N'BK', N'L', 5, 3, 0, N'0', 0.0000, 0.0000, 0.0000, N'95ad3b93-f752-4f06-95fe-78252b1ec715', CAST(0x0000A3AF00E018A5 AS DateTime), 1, N'fabiola.moran@steelgo.com', 3, NULL, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3)
INSERT [dbo].[Sam3_ProyectoConfiguracion] ([ProyectoID], [PrefijoNumeroUnico], [PrefijoOrdenTrabajo], [DigitosNumeroUnico], [DigitosOrdenTrabajo], [ToleranciaCortes], [AnguloBisel], [CuadroTubero], [CuadroRaiz], [CuadroRelleno], [UsuarioModifica], [FechaModificacion], [ActualizaLocalizacion], [CorreoPeqKgEsp], [DigitosFolioPreparacion], [ManejaReserva], [UsuarioModificacion], [Activo], [DigitosOrdeAlmacenaje], [DigitosFolioDescarga], [DigitosFolioAvisollegada], [GigitosFolioPaseSalida], [DigitosFolioOrdenRecepcion], [DigitosFolioCuantifiacion], [DigitosFolioOrdenAlmacenaje], [DigitosFolioPermisoAduana]) VALUES (20, N'NJ', N'E', 4, 3, 0, N'0', 0.0000, 0.0000, 0.0000, N'95ad3b93-f752-4f06-95fe-78252b1ec715', CAST(0x0000A3AF00DFA270 AS DateTime), 1, N'fabiola.moran@steelgo.com;eduardo.flores@steelgo.com', 3, NULL, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3)
INSERT [dbo].[Sam3_ProyectoConfiguracion] ([ProyectoID], [PrefijoNumeroUnico], [PrefijoOrdenTrabajo], [DigitosNumeroUnico], [DigitosOrdenTrabajo], [ToleranciaCortes], [AnguloBisel], [CuadroTubero], [CuadroRaiz], [CuadroRelleno], [UsuarioModifica], [FechaModificacion], [ActualizaLocalizacion], [CorreoPeqKgEsp], [DigitosFolioPreparacion], [ManejaReserva], [UsuarioModificacion], [Activo], [DigitosOrdeAlmacenaje], [DigitosFolioDescarga], [DigitosFolioAvisollegada], [GigitosFolioPaseSalida], [DigitosFolioOrdenRecepcion], [DigitosFolioCuantifiacion], [DigitosFolioOrdenAlmacenaje], [DigitosFolioPermisoAduana]) VALUES (21, N'DL', N'B', 4, 3, 0, N'0', 0.0000, 0.0000, 0.0000, N'95ad3b93-f752-4f06-95fe-78252b1ec715', CAST(0x0000A3AF00DF4288 AS DateTime), 0, N'fabiola.moran@steelgo.com', 3, NULL, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3)
INSERT [dbo].[Sam3_ProyectoConfiguracion] ([ProyectoID], [PrefijoNumeroUnico], [PrefijoOrdenTrabajo], [DigitosNumeroUnico], [DigitosOrdenTrabajo], [ToleranciaCortes], [AnguloBisel], [CuadroTubero], [CuadroRaiz], [CuadroRelleno], [UsuarioModifica], [FechaModificacion], [ActualizaLocalizacion], [CorreoPeqKgEsp], [DigitosFolioPreparacion], [ManejaReserva], [UsuarioModificacion], [Activo], [DigitosOrdeAlmacenaje], [DigitosFolioDescarga], [DigitosFolioAvisollegada], [GigitosFolioPaseSalida], [DigitosFolioOrdenRecepcion], [DigitosFolioCuantifiacion], [DigitosFolioOrdenAlmacenaje], [DigitosFolioPermisoAduana]) VALUES (22, N'TB', N'S', 4, 3, 0, N'0', 0.0000, 0.0000, 0.0000, N'95ad3b93-f752-4f06-95fe-78252b1ec715', CAST(0x0000A3AF00DF8B46 AS DateTime), 1, N'fabiola.moran@steelgo.com;eduardo.flores@steelgo.com', 3, NULL, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3)
INSERT [dbo].[Sam3_ProyectoConfiguracion] ([ProyectoID], [PrefijoNumeroUnico], [PrefijoOrdenTrabajo], [DigitosNumeroUnico], [DigitosOrdenTrabajo], [ToleranciaCortes], [AnguloBisel], [CuadroTubero], [CuadroRaiz], [CuadroRelleno], [UsuarioModifica], [FechaModificacion], [ActualizaLocalizacion], [CorreoPeqKgEsp], [DigitosFolioPreparacion], [ManejaReserva], [UsuarioModificacion], [Activo], [DigitosOrdeAlmacenaje], [DigitosFolioDescarga], [DigitosFolioAvisollegada], [GigitosFolioPaseSalida], [DigitosFolioOrdenRecepcion], [DigitosFolioCuantifiacion], [DigitosFolioOrdenAlmacenaje], [DigitosFolioPermisoAduana]) VALUES (23, N'BX', N'SL', 4, 3, 0, N'0', 0.0000, 0.0000, 0.0000, N'dd8ad7bf-5c37-44e6-aa34-e388c2b489ff', CAST(0x0000A34D00006AB1 AS DateTime), 0, NULL, 3, NULL, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3)
INSERT [dbo].[Sam3_ProyectoConfiguracion] ([ProyectoID], [PrefijoNumeroUnico], [PrefijoOrdenTrabajo], [DigitosNumeroUnico], [DigitosOrdenTrabajo], [ToleranciaCortes], [AnguloBisel], [CuadroTubero], [CuadroRaiz], [CuadroRelleno], [UsuarioModifica], [FechaModificacion], [ActualizaLocalizacion], [CorreoPeqKgEsp], [DigitosFolioPreparacion], [ManejaReserva], [UsuarioModificacion], [Activo], [DigitosOrdeAlmacenaje], [DigitosFolioDescarga], [DigitosFolioAvisollegada], [GigitosFolioPaseSalida], [DigitosFolioOrdenRecepcion], [DigitosFolioCuantifiacion], [DigitosFolioOrdenAlmacenaje], [DigitosFolioPermisoAduana]) VALUES (24, N'TB', N'SS', 3, 3, 0, N'0', 0.0000, 0.0000, 0.0000, N'95ad3b93-f752-4f06-95fe-78252b1ec715', CAST(0x0000A37101085067 AS DateTime), 0, NULL, 3, NULL, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3)
INSERT [dbo].[Sam3_ProyectoConfiguracion] ([ProyectoID], [PrefijoNumeroUnico], [PrefijoOrdenTrabajo], [DigitosNumeroUnico], [DigitosOrdenTrabajo], [ToleranciaCortes], [AnguloBisel], [CuadroTubero], [CuadroRaiz], [CuadroRelleno], [UsuarioModifica], [FechaModificacion], [ActualizaLocalizacion], [CorreoPeqKgEsp], [DigitosFolioPreparacion], [ManejaReserva], [UsuarioModificacion], [Activo], [DigitosOrdeAlmacenaje], [DigitosFolioDescarga], [DigitosFolioAvisollegada], [GigitosFolioPaseSalida], [DigitosFolioOrdenRecepcion], [DigitosFolioCuantifiacion], [DigitosFolioOrdenAlmacenaje], [DigitosFolioPermisoAduana]) VALUES (25, N'BC', N'T', 3, 3, 0, N'0', 0.0000, 0.0000, 0.0000, N'95ad3b93-f752-4f06-95fe-78252b1ec715', CAST(0x0000A3AF00DF2E9B AS DateTime), 0, N'fabiola.moran@steelgo.com', 3, NULL, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3)
INSERT [dbo].[Sam3_ProyectoConfiguracion] ([ProyectoID], [PrefijoNumeroUnico], [PrefijoOrdenTrabajo], [DigitosNumeroUnico], [DigitosOrdenTrabajo], [ToleranciaCortes], [AnguloBisel], [CuadroTubero], [CuadroRaiz], [CuadroRelleno], [UsuarioModifica], [FechaModificacion], [ActualizaLocalizacion], [CorreoPeqKgEsp], [DigitosFolioPreparacion], [ManejaReserva], [UsuarioModificacion], [Activo], [DigitosOrdeAlmacenaje], [DigitosFolioDescarga], [DigitosFolioAvisollegada], [GigitosFolioPaseSalida], [DigitosFolioOrdenRecepcion], [DigitosFolioCuantifiacion], [DigitosFolioOrdenAlmacenaje], [DigitosFolioPermisoAduana]) VALUES (26, N'BK', N'D', 5, 3, 0, N'0', 0.0000, 0.0000, 0.0000, N'95ad3b93-f752-4f06-95fe-78252b1ec715', CAST(0x0000A3F80106B459 AS DateTime), 1, N'fabiola.moran@steelgo.com', NULL, NULL, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3)
INSERT [dbo].[Sam3_ProyectoConfiguracion] ([ProyectoID], [PrefijoNumeroUnico], [PrefijoOrdenTrabajo], [DigitosNumeroUnico], [DigitosOrdenTrabajo], [ToleranciaCortes], [AnguloBisel], [CuadroTubero], [CuadroRaiz], [CuadroRelleno], [UsuarioModifica], [FechaModificacion], [ActualizaLocalizacion], [CorreoPeqKgEsp], [DigitosFolioPreparacion], [ManejaReserva], [UsuarioModificacion], [Activo], [DigitosOrdeAlmacenaje], [DigitosFolioDescarga], [DigitosFolioAvisollegada], [GigitosFolioPaseSalida], [DigitosFolioOrdenRecepcion], [DigitosFolioCuantifiacion], [DigitosFolioOrdenAlmacenaje], [DigitosFolioPermisoAduana]) VALUES (27, N'BK', N'S', 4, 3, 0, N'0', 0.0000, 0.0000, 0.0000, N'95ad3b93-f752-4f06-95fe-78252b1ec715', CAST(0x0000A3E900F578E0 AS DateTime), 0, NULL, NULL, NULL, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3)
INSERT [dbo].[Sam3_ProyectoConfiguracion] ([ProyectoID], [PrefijoNumeroUnico], [PrefijoOrdenTrabajo], [DigitosNumeroUnico], [DigitosOrdenTrabajo], [ToleranciaCortes], [AnguloBisel], [CuadroTubero], [CuadroRaiz], [CuadroRelleno], [UsuarioModifica], [FechaModificacion], [ActualizaLocalizacion], [CorreoPeqKgEsp], [DigitosFolioPreparacion], [ManejaReserva], [UsuarioModificacion], [Activo], [DigitosOrdeAlmacenaje], [DigitosFolioDescarga], [DigitosFolioAvisollegada], [GigitosFolioPaseSalida], [DigitosFolioOrdenRecepcion], [DigitosFolioCuantifiacion], [DigitosFolioOrdenAlmacenaje], [DigitosFolioPermisoAduana]) VALUES (28, N'AO', N'R', 4, 3, 0, N'0', 0.0000, 0.0000, 0.0000, N'95ad3b93-f752-4f06-95fe-78252b1ec715', CAST(0x0000A4590141EE02 AS DateTime), 1, N'fabiola.moran@steelgo.com;eduardo.flores@steelgo.com', NULL, 0, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3)
INSERT [dbo].[Sam3_ProyectoConfiguracion] ([ProyectoID], [PrefijoNumeroUnico], [PrefijoOrdenTrabajo], [DigitosNumeroUnico], [DigitosOrdenTrabajo], [ToleranciaCortes], [AnguloBisel], [CuadroTubero], [CuadroRaiz], [CuadroRelleno], [UsuarioModifica], [FechaModificacion], [ActualizaLocalizacion], [CorreoPeqKgEsp], [DigitosFolioPreparacion], [ManejaReserva], [UsuarioModificacion], [Activo], [DigitosOrdeAlmacenaje], [DigitosFolioDescarga], [DigitosFolioAvisollegada], [GigitosFolioPaseSalida], [DigitosFolioOrdenRecepcion], [DigitosFolioCuantifiacion], [DigitosFolioOrdenAlmacenaje], [DigitosFolioPermisoAduana]) VALUES (29, N'CT', N'P', 4, 3, 0, N'0', 0.0000, 0.0000, 0.0000, N'dd8ad7bf-5c37-44e6-aa34-e388c2b489ff', CAST(0x0000A45F002512FB AS DateTime), 0, N'fabiola.moran@steelgo.com;eduardo.flores@steelgo.com', NULL, 0, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3)
INSERT [dbo].[Sam3_ProyectoConsecutivo] ([ProyectoID], [ConsecutivoFolioAvisollegada], [ConsecutivoFolioEntradaMateiral], [ConsecutivoFolioDescargaMaterial], [ConsecutivoPaseSalida], [ConsecutivoPermisoAduana], [ConsucutivoFolioPackingList], [ConsecutivoODT], [ConsecutivoNumerounico], [Activo], [FechaModificacion], [UsuarioModificacion], [ConsecutivoOrdeRecepcion], [ConsecutivoOrdenAlmacenaje]) VALUES (1, 0, 0, 0, 0, 0, 0, 0, 1, 1, NULL, NULL, 0, 0)
INSERT [dbo].[Sam3_ProyectoConsecutivo] ([ProyectoID], [ConsecutivoFolioAvisollegada], [ConsecutivoFolioEntradaMateiral], [ConsecutivoFolioDescargaMaterial], [ConsecutivoPaseSalida], [ConsecutivoPermisoAduana], [ConsucutivoFolioPackingList], [ConsecutivoODT], [ConsecutivoNumerounico], [Activo], [FechaModificacion], [UsuarioModificacion], [ConsecutivoOrdeRecepcion], [ConsecutivoOrdenAlmacenaje]) VALUES (2, 0, 0, 0, 0, 0, 0, 0, 2, 1, NULL, NULL, 0, 0)
INSERT [dbo].[Sam3_ProyectoConsecutivo] ([ProyectoID], [ConsecutivoFolioAvisollegada], [ConsecutivoFolioEntradaMateiral], [ConsecutivoFolioDescargaMaterial], [ConsecutivoPaseSalida], [ConsecutivoPermisoAduana], [ConsucutivoFolioPackingList], [ConsecutivoODT], [ConsecutivoNumerounico], [Activo], [FechaModificacion], [UsuarioModificacion], [ConsecutivoOrdeRecepcion], [ConsecutivoOrdenAlmacenaje]) VALUES (3, 0, 0, 0, 0, 0, 0, 0, 0, 1, CAST(0x0000A4FF0105D636 AS DateTime), 1, 0, 0)
INSERT [dbo].[Sam3_ProyectoConsecutivo] ([ProyectoID], [ConsecutivoFolioAvisollegada], [ConsecutivoFolioEntradaMateiral], [ConsecutivoFolioDescargaMaterial], [ConsecutivoPaseSalida], [ConsecutivoPermisoAduana], [ConsucutivoFolioPackingList], [ConsecutivoODT], [ConsecutivoNumerounico], [Activo], [FechaModificacion], [UsuarioModificacion], [ConsecutivoOrdeRecepcion], [ConsecutivoOrdenAlmacenaje]) VALUES (4, 0, 0, 0, 0, 0, 0, 0, 0, 1, CAST(0x0000A4FF0105D636 AS DateTime), 1, 0, 0)
INSERT [dbo].[Sam3_ProyectoConsecutivo] ([ProyectoID], [ConsecutivoFolioAvisollegada], [ConsecutivoFolioEntradaMateiral], [ConsecutivoFolioDescargaMaterial], [ConsecutivoPaseSalida], [ConsecutivoPermisoAduana], [ConsucutivoFolioPackingList], [ConsecutivoODT], [ConsecutivoNumerounico], [Activo], [FechaModificacion], [UsuarioModificacion], [ConsecutivoOrdeRecepcion], [ConsecutivoOrdenAlmacenaje]) VALUES (5, 0, 0, 0, 0, 0, 0, 0, 0, 1, CAST(0x0000A4FF0105D636 AS DateTime), 1, 0, 0)
INSERT [dbo].[Sam3_ProyectoConsecutivo] ([ProyectoID], [ConsecutivoFolioAvisollegada], [ConsecutivoFolioEntradaMateiral], [ConsecutivoFolioDescargaMaterial], [ConsecutivoPaseSalida], [ConsecutivoPermisoAduana], [ConsucutivoFolioPackingList], [ConsecutivoODT], [ConsecutivoNumerounico], [Activo], [FechaModificacion], [UsuarioModificacion], [ConsecutivoOrdeRecepcion], [ConsecutivoOrdenAlmacenaje]) VALUES (6, 0, 0, 0, 0, 0, 0, 0, 0, 1, CAST(0x0000A4FF0105D636 AS DateTime), 1, 0, 0)
INSERT [dbo].[Sam3_ProyectoConsecutivo] ([ProyectoID], [ConsecutivoFolioAvisollegada], [ConsecutivoFolioEntradaMateiral], [ConsecutivoFolioDescargaMaterial], [ConsecutivoPaseSalida], [ConsecutivoPermisoAduana], [ConsucutivoFolioPackingList], [ConsecutivoODT], [ConsecutivoNumerounico], [Activo], [FechaModificacion], [UsuarioModificacion], [ConsecutivoOrdeRecepcion], [ConsecutivoOrdenAlmacenaje]) VALUES (7, 0, 0, 0, 0, 0, 0, 0, 0, 1, CAST(0x0000A4FF0105D636 AS DateTime), 1, 0, 0)
INSERT [dbo].[Sam3_ProyectoConsecutivo] ([ProyectoID], [ConsecutivoFolioAvisollegada], [ConsecutivoFolioEntradaMateiral], [ConsecutivoFolioDescargaMaterial], [ConsecutivoPaseSalida], [ConsecutivoPermisoAduana], [ConsucutivoFolioPackingList], [ConsecutivoODT], [ConsecutivoNumerounico], [Activo], [FechaModificacion], [UsuarioModificacion], [ConsecutivoOrdeRecepcion], [ConsecutivoOrdenAlmacenaje]) VALUES (8, 0, 0, 0, 0, 0, 0, 0, 0, 1, CAST(0x0000A4FF0105D636 AS DateTime), 1, 0, 0)
INSERT [dbo].[Sam3_ProyectoConsecutivo] ([ProyectoID], [ConsecutivoFolioAvisollegada], [ConsecutivoFolioEntradaMateiral], [ConsecutivoFolioDescargaMaterial], [ConsecutivoPaseSalida], [ConsecutivoPermisoAduana], [ConsucutivoFolioPackingList], [ConsecutivoODT], [ConsecutivoNumerounico], [Activo], [FechaModificacion], [UsuarioModificacion], [ConsecutivoOrdeRecepcion], [ConsecutivoOrdenAlmacenaje]) VALUES (9, 0, 0, 0, 0, 0, 0, 0, 0, 1, CAST(0x0000A4FF0105D636 AS DateTime), 1, 0, 0)
INSERT [dbo].[Sam3_ProyectoConsecutivo] ([ProyectoID], [ConsecutivoFolioAvisollegada], [ConsecutivoFolioEntradaMateiral], [ConsecutivoFolioDescargaMaterial], [ConsecutivoPaseSalida], [ConsecutivoPermisoAduana], [ConsucutivoFolioPackingList], [ConsecutivoODT], [ConsecutivoNumerounico], [Activo], [FechaModificacion], [UsuarioModificacion], [ConsecutivoOrdeRecepcion], [ConsecutivoOrdenAlmacenaje]) VALUES (10, 0, 0, 0, 0, 0, 0, 0, 0, 1, CAST(0x0000A4FF0105D636 AS DateTime), 1, 0, 0)
INSERT [dbo].[Sam3_ProyectoConsecutivo] ([ProyectoID], [ConsecutivoFolioAvisollegada], [ConsecutivoFolioEntradaMateiral], [ConsecutivoFolioDescargaMaterial], [ConsecutivoPaseSalida], [ConsecutivoPermisoAduana], [ConsucutivoFolioPackingList], [ConsecutivoODT], [ConsecutivoNumerounico], [Activo], [FechaModificacion], [UsuarioModificacion], [ConsecutivoOrdeRecepcion], [ConsecutivoOrdenAlmacenaje]) VALUES (11, 0, 0, 0, 0, 0, 0, 0, 0, 1, CAST(0x0000A4FF0105D636 AS DateTime), 1, 0, 0)
INSERT [dbo].[Sam3_ProyectoConsecutivo] ([ProyectoID], [ConsecutivoFolioAvisollegada], [ConsecutivoFolioEntradaMateiral], [ConsecutivoFolioDescargaMaterial], [ConsecutivoPaseSalida], [ConsecutivoPermisoAduana], [ConsucutivoFolioPackingList], [ConsecutivoODT], [ConsecutivoNumerounico], [Activo], [FechaModificacion], [UsuarioModificacion], [ConsecutivoOrdeRecepcion], [ConsecutivoOrdenAlmacenaje]) VALUES (12, 0, 0, 0, 0, 0, 0, 0, 0, 1, CAST(0x0000A4FF0105D636 AS DateTime), 1, 0, 0)
INSERT [dbo].[Sam3_ProyectoConsecutivo] ([ProyectoID], [ConsecutivoFolioAvisollegada], [ConsecutivoFolioEntradaMateiral], [ConsecutivoFolioDescargaMaterial], [ConsecutivoPaseSalida], [ConsecutivoPermisoAduana], [ConsucutivoFolioPackingList], [ConsecutivoODT], [ConsecutivoNumerounico], [Activo], [FechaModificacion], [UsuarioModificacion], [ConsecutivoOrdeRecepcion], [ConsecutivoOrdenAlmacenaje]) VALUES (13, 0, 0, 0, 0, 0, 0, 0, 0, 1, CAST(0x0000A4FF0105D636 AS DateTime), 1, 0, 0)
INSERT [dbo].[Sam3_ProyectoConsecutivo] ([ProyectoID], [ConsecutivoFolioAvisollegada], [ConsecutivoFolioEntradaMateiral], [ConsecutivoFolioDescargaMaterial], [ConsecutivoPaseSalida], [ConsecutivoPermisoAduana], [ConsucutivoFolioPackingList], [ConsecutivoODT], [ConsecutivoNumerounico], [Activo], [FechaModificacion], [UsuarioModificacion], [ConsecutivoOrdeRecepcion], [ConsecutivoOrdenAlmacenaje]) VALUES (14, 0, 0, 0, 0, 0, 0, 0, 0, 1, CAST(0x0000A4FF0105D636 AS DateTime), 1, 0, 0)
INSERT [dbo].[Sam3_ProyectoConsecutivo] ([ProyectoID], [ConsecutivoFolioAvisollegada], [ConsecutivoFolioEntradaMateiral], [ConsecutivoFolioDescargaMaterial], [ConsecutivoPaseSalida], [ConsecutivoPermisoAduana], [ConsucutivoFolioPackingList], [ConsecutivoODT], [ConsecutivoNumerounico], [Activo], [FechaModificacion], [UsuarioModificacion], [ConsecutivoOrdeRecepcion], [ConsecutivoOrdenAlmacenaje]) VALUES (15, 0, 0, 0, 0, 0, 0, 0, 0, 1, CAST(0x0000A4FF0105D636 AS DateTime), 1, 0, 0)
INSERT [dbo].[Sam3_ProyectoConsecutivo] ([ProyectoID], [ConsecutivoFolioAvisollegada], [ConsecutivoFolioEntradaMateiral], [ConsecutivoFolioDescargaMaterial], [ConsecutivoPaseSalida], [ConsecutivoPermisoAduana], [ConsucutivoFolioPackingList], [ConsecutivoODT], [ConsecutivoNumerounico], [Activo], [FechaModificacion], [UsuarioModificacion], [ConsecutivoOrdeRecepcion], [ConsecutivoOrdenAlmacenaje]) VALUES (16, 0, 0, 0, 0, 0, 0, 0, 0, 1, CAST(0x0000A4FF0105D636 AS DateTime), 1, 0, 0)
INSERT [dbo].[Sam3_ProyectoConsecutivo] ([ProyectoID], [ConsecutivoFolioAvisollegada], [ConsecutivoFolioEntradaMateiral], [ConsecutivoFolioDescargaMaterial], [ConsecutivoPaseSalida], [ConsecutivoPermisoAduana], [ConsucutivoFolioPackingList], [ConsecutivoODT], [ConsecutivoNumerounico], [Activo], [FechaModificacion], [UsuarioModificacion], [ConsecutivoOrdeRecepcion], [ConsecutivoOrdenAlmacenaje]) VALUES (17, 0, 0, 0, 0, 0, 0, 0, 0, 1, CAST(0x0000A4FF0105D636 AS DateTime), 1, 0, 0)
INSERT [dbo].[Sam3_ProyectoConsecutivo] ([ProyectoID], [ConsecutivoFolioAvisollegada], [ConsecutivoFolioEntradaMateiral], [ConsecutivoFolioDescargaMaterial], [ConsecutivoPaseSalida], [ConsecutivoPermisoAduana], [ConsucutivoFolioPackingList], [ConsecutivoODT], [ConsecutivoNumerounico], [Activo], [FechaModificacion], [UsuarioModificacion], [ConsecutivoOrdeRecepcion], [ConsecutivoOrdenAlmacenaje]) VALUES (18, 0, 0, 0, 0, 0, 0, 0, 0, 1, CAST(0x0000A4FF0105D636 AS DateTime), 1, 0, 0)
INSERT [dbo].[Sam3_ProyectoConsecutivo] ([ProyectoID], [ConsecutivoFolioAvisollegada], [ConsecutivoFolioEntradaMateiral], [ConsecutivoFolioDescargaMaterial], [ConsecutivoPaseSalida], [ConsecutivoPermisoAduana], [ConsucutivoFolioPackingList], [ConsecutivoODT], [ConsecutivoNumerounico], [Activo], [FechaModificacion], [UsuarioModificacion], [ConsecutivoOrdeRecepcion], [ConsecutivoOrdenAlmacenaje]) VALUES (19, 0, 0, 0, 0, 0, 0, 0, 0, 1, CAST(0x0000A4FF0105D636 AS DateTime), 1, 0, 0)
INSERT [dbo].[Sam3_ProyectoConsecutivo] ([ProyectoID], [ConsecutivoFolioAvisollegada], [ConsecutivoFolioEntradaMateiral], [ConsecutivoFolioDescargaMaterial], [ConsecutivoPaseSalida], [ConsecutivoPermisoAduana], [ConsucutivoFolioPackingList], [ConsecutivoODT], [ConsecutivoNumerounico], [Activo], [FechaModificacion], [UsuarioModificacion], [ConsecutivoOrdeRecepcion], [ConsecutivoOrdenAlmacenaje]) VALUES (20, 0, 0, 0, 0, 0, 0, 0, 0, 1, CAST(0x0000A4FF0105D636 AS DateTime), 1, 0, 0)
INSERT [dbo].[Sam3_ProyectoConsecutivo] ([ProyectoID], [ConsecutivoFolioAvisollegada], [ConsecutivoFolioEntradaMateiral], [ConsecutivoFolioDescargaMaterial], [ConsecutivoPaseSalida], [ConsecutivoPermisoAduana], [ConsucutivoFolioPackingList], [ConsecutivoODT], [ConsecutivoNumerounico], [Activo], [FechaModificacion], [UsuarioModificacion], [ConsecutivoOrdeRecepcion], [ConsecutivoOrdenAlmacenaje]) VALUES (21, 0, 0, 0, 0, 0, 0, 0, 0, 1, CAST(0x0000A4FF0105D636 AS DateTime), 1, 0, 0)
INSERT [dbo].[Sam3_ProyectoConsecutivo] ([ProyectoID], [ConsecutivoFolioAvisollegada], [ConsecutivoFolioEntradaMateiral], [ConsecutivoFolioDescargaMaterial], [ConsecutivoPaseSalida], [ConsecutivoPermisoAduana], [ConsucutivoFolioPackingList], [ConsecutivoODT], [ConsecutivoNumerounico], [Activo], [FechaModificacion], [UsuarioModificacion], [ConsecutivoOrdeRecepcion], [ConsecutivoOrdenAlmacenaje]) VALUES (22, 0, 0, 0, 0, 0, 0, 0, 0, 1, CAST(0x0000A4FF0105D636 AS DateTime), 1, 0, 0)
INSERT [dbo].[Sam3_ProyectoConsecutivo] ([ProyectoID], [ConsecutivoFolioAvisollegada], [ConsecutivoFolioEntradaMateiral], [ConsecutivoFolioDescargaMaterial], [ConsecutivoPaseSalida], [ConsecutivoPermisoAduana], [ConsucutivoFolioPackingList], [ConsecutivoODT], [ConsecutivoNumerounico], [Activo], [FechaModificacion], [UsuarioModificacion], [ConsecutivoOrdeRecepcion], [ConsecutivoOrdenAlmacenaje]) VALUES (23, 0, 0, 0, 0, 0, 0, 0, 0, 1, CAST(0x0000A4FF0105D636 AS DateTime), 1, 0, 0)
INSERT [dbo].[Sam3_ProyectoConsecutivo] ([ProyectoID], [ConsecutivoFolioAvisollegada], [ConsecutivoFolioEntradaMateiral], [ConsecutivoFolioDescargaMaterial], [ConsecutivoPaseSalida], [ConsecutivoPermisoAduana], [ConsucutivoFolioPackingList], [ConsecutivoODT], [ConsecutivoNumerounico], [Activo], [FechaModificacion], [UsuarioModificacion], [ConsecutivoOrdeRecepcion], [ConsecutivoOrdenAlmacenaje]) VALUES (24, 0, 0, 0, 0, 0, 0, 0, 0, 1, CAST(0x0000A4FF0105D636 AS DateTime), 1, 0, 0)
INSERT [dbo].[Sam3_ProyectoConsecutivo] ([ProyectoID], [ConsecutivoFolioAvisollegada], [ConsecutivoFolioEntradaMateiral], [ConsecutivoFolioDescargaMaterial], [ConsecutivoPaseSalida], [ConsecutivoPermisoAduana], [ConsucutivoFolioPackingList], [ConsecutivoODT], [ConsecutivoNumerounico], [Activo], [FechaModificacion], [UsuarioModificacion], [ConsecutivoOrdeRecepcion], [ConsecutivoOrdenAlmacenaje]) VALUES (25, 0, 0, 0, 0, 0, 0, 0, 0, 1, CAST(0x0000A4FF0105D636 AS DateTime), 1, 0, 0)
INSERT [dbo].[Sam3_ProyectoConsecutivo] ([ProyectoID], [ConsecutivoFolioAvisollegada], [ConsecutivoFolioEntradaMateiral], [ConsecutivoFolioDescargaMaterial], [ConsecutivoPaseSalida], [ConsecutivoPermisoAduana], [ConsucutivoFolioPackingList], [ConsecutivoODT], [ConsecutivoNumerounico], [Activo], [FechaModificacion], [UsuarioModificacion], [ConsecutivoOrdeRecepcion], [ConsecutivoOrdenAlmacenaje]) VALUES (26, 0, 0, 0, 0, 0, 0, 0, 0, 1, CAST(0x0000A4FF0105D636 AS DateTime), 1, 0, 0)
INSERT [dbo].[Sam3_ProyectoConsecutivo] ([ProyectoID], [ConsecutivoFolioAvisollegada], [ConsecutivoFolioEntradaMateiral], [ConsecutivoFolioDescargaMaterial], [ConsecutivoPaseSalida], [ConsecutivoPermisoAduana], [ConsucutivoFolioPackingList], [ConsecutivoODT], [ConsecutivoNumerounico], [Activo], [FechaModificacion], [UsuarioModificacion], [ConsecutivoOrdeRecepcion], [ConsecutivoOrdenAlmacenaje]) VALUES (27, 0, 0, 0, 0, 0, 0, 0, 0, 1, CAST(0x0000A4FF0105D636 AS DateTime), 1, 0, 0)
INSERT [dbo].[Sam3_ProyectoConsecutivo] ([ProyectoID], [ConsecutivoFolioAvisollegada], [ConsecutivoFolioEntradaMateiral], [ConsecutivoFolioDescargaMaterial], [ConsecutivoPaseSalida], [ConsecutivoPermisoAduana], [ConsucutivoFolioPackingList], [ConsecutivoODT], [ConsecutivoNumerounico], [Activo], [FechaModificacion], [UsuarioModificacion], [ConsecutivoOrdeRecepcion], [ConsecutivoOrdenAlmacenaje]) VALUES (28, 0, 0, 0, 0, 0, 0, 0, 0, 1, CAST(0x0000A4FF0105D636 AS DateTime), 1, 0, 0)
INSERT [dbo].[Sam3_ProyectoConsecutivo] ([ProyectoID], [ConsecutivoFolioAvisollegada], [ConsecutivoFolioEntradaMateiral], [ConsecutivoFolioDescargaMaterial], [ConsecutivoPaseSalida], [ConsecutivoPermisoAduana], [ConsucutivoFolioPackingList], [ConsecutivoODT], [ConsecutivoNumerounico], [Activo], [FechaModificacion], [UsuarioModificacion], [ConsecutivoOrdeRecepcion], [ConsecutivoOrdenAlmacenaje]) VALUES (29, 0, 0, 0, 0, 0, 0, 0, 0, 1, CAST(0x0000A4FF0105D636 AS DateTime), 1, 0, 0)
INSERT [dbo].[Sam3_ProyectoConsecutivo] ([ProyectoID], [ConsecutivoFolioAvisollegada], [ConsecutivoFolioEntradaMateiral], [ConsecutivoFolioDescargaMaterial], [ConsecutivoPaseSalida], [ConsecutivoPermisoAduana], [ConsucutivoFolioPackingList], [ConsecutivoODT], [ConsecutivoNumerounico], [Activo], [FechaModificacion], [UsuarioModificacion], [ConsecutivoOrdeRecepcion], [ConsecutivoOrdenAlmacenaje]) VALUES (30, 0, 0, 0, 0, 0, 0, 0, 0, 1, CAST(0x0000A4FF0105D636 AS DateTime), 1, 0, 0)
SET IDENTITY_INSERT [dbo].[Sam3_Recepcion] ON 

INSERT [dbo].[Sam3_Recepcion] ([RecepcionID], [ItemCodeID], [FamiliaItemCodeID], [CedulaID], [TipoAceroID], [Diametro1], [Diametro2], [Cantidad], [TieneNumerosUnicos], [FechaGeneracionNumerosUnicos], [Activo], [UsuarioModificacion], [FechaModificacion], [FolioCuantificacionID]) VALUES (1, 2, 1, 1, 1, CAST(32.4000 AS Decimal(7, 4)), CAST(9.0000 AS Decimal(7, 4)), 2, 1, CAST(0x0000A50200000000 AS DateTime), 1, 1, CAST(0x0000A50200000000 AS DateTime), 2)
SET IDENTITY_INSERT [dbo].[Sam3_Recepcion] OFF
SET IDENTITY_INSERT [dbo].[Sam3_Rel_FolioAvisoEntrada_Documento] ON 

INSERT [dbo].[Sam3_Rel_FolioAvisoEntrada_Documento] ([Rel_FolioAvisoEntrada_DocumentoID], [FolioAvisoEntradaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType], [Descripcion]) VALUES (40, 52, 0, N'053fabb8-290a-447e-acab-b1ea79479a11_B1teceDIYAEnhtU.jpg', N'.jpg', 1, 1, CAST(0x0000A4F100E2EF78 AS DateTime), N'5f5a403c-2429-44c2-a4ed-583b1ca9a6fe', N'http://localhost:60960/uploads/5f5a403c-2429-44c2-a4ed-583b1ca9a6fe_053fabb8-290a-447e-acab-b1ea79479a11_B1teceDIYAEnhtU.jpg', -1, N'image/jpeg', N'PRUEBA 1')
INSERT [dbo].[Sam3_Rel_FolioAvisoEntrada_Documento] ([Rel_FolioAvisoEntrada_DocumentoID], [FolioAvisoEntradaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType], [Descripcion]) VALUES (41, 52, 0, N'053fabb8-290a-447e-acab-b1ea79479a11_B1teceDIYAEnhtU.jpg', N'.jpg', 1, 1, CAST(0x0000A4F100E30F5C AS DateTime), N'17559275-09ec-4c69-8843-a8871eac8c0f', N'http://localhost:60960/uploads/17559275-09ec-4c69-8843-a8871eac8c0f_053fabb8-290a-447e-acab-b1ea79479a11_B1teceDIYAEnhtU.jpg', -1, N'image/jpeg', N'PRUEBA 2')
INSERT [dbo].[Sam3_Rel_FolioAvisoEntrada_Documento] ([Rel_FolioAvisoEntrada_DocumentoID], [FolioAvisoEntradaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType], [Descripcion]) VALUES (46, 58, 0, N'053fabb8-290a-447e-acab-b1ea79479a11_B1teceDIYAEnhtU.jpg', N'.jpg', 1, 1, CAST(0x0000A4F2009EBACF AS DateTime), N'376b0a55-fb12-4560-be7b-49f33de88b34', N'http://localhost:60960/uploads/376b0a55-fb12-4560-be7b-49f33de88b34_053fabb8-290a-447e-acab-b1ea79479a11_B1teceDIYAEnhtU.jpg', -1, N'image/jpeg', N'prueba 1')
INSERT [dbo].[Sam3_Rel_FolioAvisoEntrada_Documento] ([Rel_FolioAvisoEntrada_DocumentoID], [FolioAvisoEntradaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType], [Descripcion]) VALUES (47, 58, 0, N'20150630114305.jpg', N'.jpg', 1, 1, CAST(0x0000A4F2009EC4A1 AS DateTime), N'88a2fd7a-5778-47e7-930e-61ded4ab9197', N'http://localhost:60960/uploads/88a2fd7a-5778-47e7-930e-61ded4ab9197_20150630114305.jpg', -1, N'image/jpeg', N'prueba 2')
INSERT [dbo].[Sam3_Rel_FolioAvisoEntrada_Documento] ([Rel_FolioAvisoEntrada_DocumentoID], [FolioAvisoEntradaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType], [Descripcion]) VALUES (48, 59, 0, N'053fabb8-290a-447e-acab-b1ea79479a11_B1teceDIYAEnhtU.jpg', N'.jpg', 1, 1, CAST(0x0000A4F200F4D5B2 AS DateTime), N'b4e2373d-621e-4eb0-aa37-46f93739cc1d', N'http://localhost:60960/uploads/b4e2373d-621e-4eb0-aa37-46f93739cc1d_053fabb8-290a-447e-acab-b1ea79479a11_B1teceDIYAEnhtU.jpg', -1, N'image/jpeg', N'prueba 1')
INSERT [dbo].[Sam3_Rel_FolioAvisoEntrada_Documento] ([Rel_FolioAvisoEntrada_DocumentoID], [FolioAvisoEntradaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType], [Descripcion]) VALUES (49, 60, 0, N'053fabb8-290a-447e-acab-b1ea79479a11_B1teceDIYAEnhtU.jpg', N'.jpg', 1, 1, CAST(0x0000A4F400892E67 AS DateTime), N'af498cc5-033b-41e7-ac6b-57e734c2b573', N'http://localhost:60960/uploads/af498cc5-033b-41e7-ac6b-57e734c2b573_053fabb8-290a-447e-acab-b1ea79479a11_B1teceDIYAEnhtU.jpg', -1, N'image/jpeg', N'prueba 1')
INSERT [dbo].[Sam3_Rel_FolioAvisoEntrada_Documento] ([Rel_FolioAvisoEntrada_DocumentoID], [FolioAvisoEntradaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType], [Descripcion]) VALUES (50, 65, 0, N'053fabb8-290a-447e-acab-b1ea79479a11_B1teceDIYAEnhtU.jpg', N'.jpg', 1, 1, CAST(0x0000A505008228A1 AS DateTime), N'4e63b40a-d30c-4027-9371-e7b8729a3c4e', N'http://localhost:60960/uploads/4e63b40a-d30c-4027-9371-e7b8729a3c4e_053fabb8-290a-447e-acab-b1ea79479a11_B1teceDIYAEnhtU.jpg', -1, N'image/jpeg', N'aa')
SET IDENTITY_INSERT [dbo].[Sam3_Rel_FolioAvisoEntrada_Documento] OFF
SET IDENTITY_INSERT [dbo].[Sam3_Rel_FolioAvisoEntrada_OrdenRecepcion] ON 

INSERT [dbo].[Sam3_Rel_FolioAvisoEntrada_OrdenRecepcion] ([Rel_FolioAvisoEntrada_OrdeRecepcion_ID], [FolioAvisoEntradaID], [OrdenRecepcionID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1, 15, 5, 1, CAST(0x0000A507011E84B3 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoEntrada_OrdenRecepcion] ([Rel_FolioAvisoEntrada_OrdeRecepcion_ID], [FolioAvisoEntradaID], [OrdenRecepcionID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (2, 15, 6, 1, CAST(0x0000A507011ED53A AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[Sam3_Rel_FolioAvisoEntrada_OrdenRecepcion] OFF
SET IDENTITY_INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ON 

INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (1, 8, 1, N'Prueba1', N'.doc', 1, 1, CAST(0x0000A4BB00AE3006 AS DateTime), NULL, NULL, 5, NULL)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (2, 8, 2, N'Prueba2', N'.docx', 1, 1, CAST(0x0000A4BB00AE33AE AS DateTime), NULL, NULL, 5, NULL)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (3, 9, 1, N'Prueba1', N'.doc', 1, 1, CAST(0x0000A4BB00FA723D AS DateTime), NULL, NULL, 5, NULL)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (4, 9, 2, N'Prueba2', N'.docx', 1, 1, CAST(0x0000A4BB00FA75B8 AS DateTime), NULL, NULL, 5, NULL)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (1002, 8, 3, N'Prueba Edicion 01', N'.docx', 1, 1, CAST(0x0000A4BB010B11FF AS DateTime), NULL, NULL, 5, NULL)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (2002, 1012, 1, N'Prueba1', N'.doc', 1, 1, CAST(0x0000A4C000E85C48 AS DateTime), NULL, NULL, 5, NULL)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (2003, 1012, 2, N'Prueba2', N'.docx', 1, 1, CAST(0x0000A4C000E85C4A AS DateTime), NULL, NULL, 5, NULL)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (2004, 1023, 1, N'Prueba1', N'.doc', 1, 1, CAST(0x0000A4C20076BE30 AS DateTime), NULL, NULL, 5, NULL)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (2005, 1023, 2, N'Prueba2', N'.docx', 1, 1, CAST(0x0000A4C20076BE32 AS DateTime), NULL, NULL, 5, NULL)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (2006, 1024, 1, N'Prueba1', N'.doc', 1, 1, CAST(0x0000A4C20079A096 AS DateTime), NULL, NULL, 5, NULL)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (2007, 1024, 2, N'Prueba2', N'.docx', 1, 1, CAST(0x0000A4C20079A096 AS DateTime), NULL, NULL, 5, NULL)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (2008, 1025, 1, N'Prueba1', N'.doc', 1, 1, CAST(0x0000A4C2007A4BD7 AS DateTime), NULL, NULL, 5, NULL)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (2009, 1025, 2, N'Prueba2', N'.docx', 1, 1, CAST(0x0000A4C2007A4BD7 AS DateTime), NULL, NULL, 5, NULL)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (2010, 1019, 0, N'listadoOdts.png', N'.png', 1, 1, CAST(0x0000A4C200C204E9 AS DateTime), N'67057df5-b8bb-488d-9de1-b0b0e822b0f1', N'C:\Sieena\SAM3.0\SAM3.0\SteelgoWebApiSolutions\BackEndSAM\App_Data\uploads\listadoOdts.png', 3, N'image/png')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (2011, 1020, 0, N'mensajeExito.png', N'.png', 1, 1, CAST(0x0000A4C200C3D0BF AS DateTime), N'405c254d-adf5-42b4-b4ed-c521fc17c91c', N'C:\Sieena\SAM3.0\SAM3.0\SteelgoWebApiSolutions\BackEndSAM\App_Data\uploads\mensajeExito.png', 1, N'image/png')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (2012, 1020, 0, N'mensajeExito.png', N'.png', 1, 1, CAST(0x0000A4C200C52ADA AS DateTime), N'00000000-0000-0000-0000-000000000000', N'C:\Sieena\SAM3.0\SAM3.0\SteelgoWebApiSolutions\BackEndSAM\App_Data\uploads\00000000-0000-0000-0000-000000000000.mensajeExito.png', 1, N'image/png')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (2013, 1020, 0, N'mensajeExito.png', N'.png', 1, 1, CAST(0x0000A4C200C57936 AS DateTime), N'00000000-0000-0000-0000-000000000000', N'C:\Sieena\SAM3.0\SAM3.0\SteelgoWebApiSolutions\BackEndSAM\App_Data\uploads\00000000-0000-0000-0000-000000000000.mensajeExito.png', 1, N'image/png')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (2014, 1020, 0, N'mensajeExito.png', N'.png', 1, 1, CAST(0x0000A4C200C74CD2 AS DateTime), N'ca23e04b-9424-47b5-8661-b0713f4474d8', N'C:\Sieena\SAM3.0\SAM3.0\SteelgoWebApiSolutions\BackEndSAM\App_Data\uploads\ca23e04b-9424-47b5-8661-b0713f4474d8.mensajeExito.png', 1, N'image/png')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (2015, 1030, 0, N'popUpGenerarOdt.png', N'.png', 1, 1, CAST(0x0000A4C200CD643A AS DateTime), N'be776f09-a5a9-471f-9dbf-c168a2efe0d7', N'C:\Sieena\SAM3.0\SAM3.0\SteelgoWebApiSolutions\BackEndSAM\App_Data\uploads\be776f09-a5a9-471f-9dbf-c168a2efe0d7.popUpGenerarOdt.png', 2, N'image/png')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (2016, 1030, 0, N'popUpGenerarOdt.png', N'.png', 1, 1, CAST(0x0000A4C200CDBA53 AS DateTime), N'24981cab-1537-4489-adce-b0b8100e5dfa', N'C:\Sam3Files\Uploads\24981cab-1537-4489-adce-b0b8100e5dfa.popUpGenerarOdt.png', 2, N'image/png')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (2017, 1018, 0, N'listadoOdts.png', N'.png', 1, 1, CAST(0x0000A4C200FD97BF AS DateTime), N'29e2d467-6d76-49c7-9928-fa499c64d36d', N'C:\Sam3Files\Uploads\29e2d467-6d76-49c7-9928-fa499c64d36d.listadoOdts.png', 3, N'image/png')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (2018, 1018, 0, N'listadoOdts.png', N'.png', 1, 1, CAST(0x0000A4C200FE249F AS DateTime), N'9ba8dfd9-b8a0-4ff5-b8ec-fe855811a533', N'C:\Sam3Files\Uploads\9ba8dfd9-b8a0-4ff5-b8ec-fe855811a533.listadoOdts.png', 3, N'image/png')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (2019, 1018, 0, N'listadoOdts.png', N'.png', 1, 1, CAST(0x0000A4C2010182B5 AS DateTime), N'07f74243-4a99-49a3-ba00-6036dec9f5f5', N'C:\Sam3Files\Uploads\07f74243-4a99-49a3-ba00-6036dec9f5f5.listadoOdts.png', 3, N'image/png')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (2020, 1018, 0, N'listadoOdts.png', N'.png', 1, 1, CAST(0x0000A4C2010245E6 AS DateTime), N'03a4aa66-6dd5-42b7-8aa0-15dd9aa8e252', N'C:\Sam3Files\Uploads\03a4aa66-6dd5-42b7-8aa0-15dd9aa8e252.listadoOdts.png', 3, N'image/png')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (2021, 1018, 0, N'listadoOdts.png', N'.png', 1, 1, CAST(0x0000A4C201030D1A AS DateTime), N'4d839d85-af88-4ebd-acdb-f39ab51c2d56', N'C:\Sam3Files\Uploads\4d839d85-af88-4ebd-acdb-f39ab51c2d56.listadoOdts.png', 3, N'image/png')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (2022, 1022, 0, N'listadoOdts.png', N'.png', 1, 1, CAST(0x0000A4C201051119 AS DateTime), N'244e7c40-89b3-4cdf-b932-7acb7b7cb3f8', N'C:\Sam3Files\Uploads\244e7c40-89b3-4cdf-b932-7acb7b7cb3f8.listadoOdts.png', 3, N'image/png')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (2023, 1020, 0, N'listadoOdts.png', N'.png', 1, 1, CAST(0x0000A4C201098ED5 AS DateTime), N'bb52c68e-b22b-49ff-86fa-2bd8052202fb', N'C:\Sam3Files\Uploads\bb52c68e-b22b-49ff-86fa-2bd8052202fb.listadoOdts.png', 1, N'image/png')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (2024, 1027, 0, N'listadoOdts.png', N'.png', 1, 1, CAST(0x0000A4C300980E11 AS DateTime), N'53df0147-e5dc-4375-8f02-1c1f6f779a4a', N'C:\Sam3Files\Uploads\53df0147-e5dc-4375-8f02-1c1f6f779a4a.listadoOdts.png', 2, N'image/png')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (2025, 1027, 0, N'listadoOdts.png', N'.png', 1, 1, CAST(0x0000A4C3009CF6B3 AS DateTime), N'3932e9e2-3f6e-4254-9dff-8e8362e47508', N'C:\Sam3Files\Uploads\3932e9e2-3f6e-4254-9dff-8e8362e47508.listadoOdts.png', 2, N'image/png')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (2026, 1010, 0, N'listadoOdts.png', N'.png', 1, 1, CAST(0x0000A4C300A8CB5D AS DateTime), N'69a959ad-3b02-44cc-b727-efa06f0ea2d3', N'C:\Sam3Files\Uploads\69a959ad-3b02-44cc-b727-efa06f0ea2d3.listadoOdts.png', 2, N'image/png')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (2027, 1010, 0, N'listadoOdts.png', N'.png', 1, 1, CAST(0x0000A4C300A936DE AS DateTime), N'dbcb7124-9e59-4e19-a08b-9b77dfc45a96', N'C:\Sam3Files\Uploads\dbcb7124-9e59-4e19-a08b-9b77dfc45a96.listadoOdts.png', 2, N'image/png')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (2028, 1010, 0, N'listadoOdts.png', N'.png', 1, 1, CAST(0x0000A4C300AA948B AS DateTime), N'a79f7bbf-8d83-4b23-9605-321ccd3bc564', N'C:\Sam3Files\Uploads\a79f7bbf-8d83-4b23-9605-321ccd3bc564.listadoOdts.png', 2, N'image/png')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (2029, 1010, 0, N'listadoOdts.png', N'.png', 1, 1, CAST(0x0000A4C300AB3E3D AS DateTime), N'cd3dc2ec-47de-4e1a-a32f-38af6f9dc49b', N'C:\Sam3Files\Uploads\cd3dc2ec-47de-4e1a-a32f-38af6f9dc49b.listadoOdts.png', 2, N'image/png')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (2030, 1010, 0, N'listadoOdts.png', N'.png', 1, 1, CAST(0x0000A4C300B049EF AS DateTime), N'8cadd6a3-08a1-4080-b644-5cdbedd32d64', N'C:\Sam3Files\Uploads\8cadd6a3-08a1-4080-b644-5cdbedd32d64.listadoOdts.png', 3, N'image/png')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (2031, 1010, 0, N'listadoOdts.png', N'.png', 1, 1, CAST(0x0000A4C300B19E2F AS DateTime), N'98bfd0da-7871-45df-858c-265ca92b6c15', N'C:\Sam3Files\Uploads\98bfd0da-7871-45df-858c-265ca92b6c15.listadoOdts.png', 3, N'image/png')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (3010, 1011, 0, N'cuadrofiltroOdt.png', N'.png', 1, 1, CAST(0x0000A4C600941C64 AS DateTime), N'afaa64b3-c9ec-40d3-8f13-7b801900af70', N'C:\Sieena\SAM3.0\SAM3.0\SteelgoWebApiSolutions\BackEndSAM\App_Data\uploads\afaa64b3-c9ec-40d3-8f13-7b801900af70.cuadrofiltroOdt.png', 1, N'image/png')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (3011, 1017, 0, N'mensajeExito.png', N'.png', 0, 1, CAST(0x0000A4C600A4AA75 AS DateTime), N'e59bd6ee-1100-4c4c-b0f4-31085d5a1511', N'C:\Sieena\SAM3.0\SAM3.0\SteelgoWebApiSolutions\BackEndSAM\App_Data\uploads\e59bd6ee-1100-4c4c-b0f4-31085d5a1511.mensajeExito.png', 3, N'image/png')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (3012, 1020, 0, N'popUpGenerarOdt.png', N'.png', 1, 1, CAST(0x0000A4C600964F10 AS DateTime), N'91d76525-7cba-4ed1-87b5-bf9499c6babc', N'C:\Sieena\SAM3.0\SAM3.0\SteelgoWebApiSolutions\BackEndSAM\App_Data\uploads\91d76525-7cba-4ed1-87b5-bf9499c6babc.popUpGenerarOdt.png', 3, N'image/png')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (3014, 1020, 0, N'mensajeExito.png', N'.png', 1, 1, CAST(0x0000A4C6009A1967 AS DateTime), N'209e928e-54cf-47f4-837b-b66457e958fd', N'http://localhost:60960/backendsam/api/app_Data/uploads/209e928e-54cf-47f4-837b-b66457e958fd.mensajeExito.png', 3, N'image/png')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (3016, 2015, 0, N'B1teceDIYAEnhtU.jpg', N'.jpg', 1, 1, CAST(0x0000A4C6009BE7EC AS DateTime), N'4f539d5d-447d-42f0-8dac-1744402e5363', N'C:\Projects\SAM3.0\SteelgoWebApiSolutions\BackEndSAM\App_Data\uploads\4f539d5d-447d-42f0-8dac-1744402e5363.B1teceDIYAEnhtU.jpg', 1, N'image/jpeg')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (3017, 1017, 0, N'descarga.jpg', N'.jpg', 1, 1, CAST(0x0000A4C6009C11CC AS DateTime), N'8b9baf72-b59c-4a5c-a9ef-8f78e0e3d6bc', N'C:\Projects\SAM3.0\SteelgoWebApiSolutions\BackEndSAM\App_Data\uploads\8b9baf72-b59c-4a5c-a9ef-8f78e0e3d6bc.descarga.jpg', 2, N'image/jpeg')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (3018, 1020, 0, N'cuadrofiltroOdt.png', N'.png', 1, 1, CAST(0x0000A4C6009C30A7 AS DateTime), N'7bd5e1be-2361-42bd-a9ba-0767f447ac2e', N'http://localhost:60960/backendsam/api/uploads/7bd5e1be-2361-42bd-a9ba-0767f447ac2e.cuadrofiltroOdt.png', 3, N'image/png')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (3019, 1020, 0, N'listadoOdts.png', N'.png', 1, 1, CAST(0x0000A4C6009CF8AB AS DateTime), N'5a592118-0826-45e7-bc7f-192ad7a2309a', N'http://localhost:60960/backendsam/api/uploads/5a592118-0826-45e7-bc7f-192ad7a2309a_listadoOdts.png', 3, N'image/png')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (3021, 1017, 0, N'cuadrofiltroOdt.png', N'.png', 1, 1, CAST(0x0000A4C600AE587A AS DateTime), N'c61cea2b-4e09-4026-95b0-b4033e773706', N'http://localhost:60960/uploads/c61cea2b-4e09-4026-95b0-b4033e773706_cuadrofiltroOdt.png', 3, N'image/png')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (3022, 1017, 0, N'popUpGenerarOdt.png', N'.png', 1, 1, CAST(0x0000A4C600AEEC63 AS DateTime), N'7756e7c9-2c5d-410c-b1a6-5a9a0da0be4b', N'http://localhost:60960/uploads/7756e7c9-2c5d-410c-b1a6-5a9a0da0be4b_popUpGenerarOdt.png', 3, N'image/png')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (3023, 1017, 0, N'popUpGenerarOdt.png', N'.png', 1, 1, CAST(0x0000A4C600AF54BC AS DateTime), N'293bf615-4726-4d8b-8cbf-611e6414f145', N'http://localhost:60960/uploads/293bf615-4726-4d8b-8cbf-611e6414f145_popUpGenerarOdt.png', 2, N'image/png')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (3024, 1017, 0, N'listadoOdts.png', N'.png', 1, 1, CAST(0x0000A4C600AF56CF AS DateTime), N'593f3e54-670f-48eb-ad49-72f812dddb48', N'http://localhost:60960/uploads/593f3e54-670f-48eb-ad49-72f812dddb48_listadoOdts.png', 2, N'image/png')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (3025, 2022, 0, N'B1teceDIYAEnhtU.jpg', N'.jpg', 1, 1, CAST(0x0000A4C6010061CA AS DateTime), N'1fc2e595-a8d2-4184-9622-e65f253d30bc', N'http://localhost:60960/uploads/1fc2e595-a8d2-4184-9622-e65f253d30bc_B1teceDIYAEnhtU.jpg', 1, N'image/jpeg')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (3026, 2022, 0, N'B1teceDIYAEnhtU.jpg', N'.jpg', 1, 1, CAST(0x0000A4C601009A76 AS DateTime), N'19852457-b898-40cd-96ad-d0beec0fc1df', N'http://localhost:60960/uploads/19852457-b898-40cd-96ad-d0beec0fc1df_B1teceDIYAEnhtU.jpg', 2, N'image/jpeg')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (3027, 2023, 0, N'B1teceDIYAEnhtU.jpg', N'.jpg', 1, 1, CAST(0x0000A4C60100D38A AS DateTime), N'7efa53d3-e1a4-4ac0-a258-a7d95c489285', N'http://localhost:60960/uploads/7efa53d3-e1a4-4ac0-a258-a7d95c489285_B1teceDIYAEnhtU.jpg', 1, N'image/jpeg')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (3028, 2024, 0, N'B1teceDIYAEnhtU.jpg', N'.jpg', 1, 1, CAST(0x0000A4C601027D4B AS DateTime), N'89dbb300-0305-49da-a29c-6a2c4539a1c2', N'http://localhost:60960/uploads/89dbb300-0305-49da-a29c-6a2c4539a1c2_B1teceDIYAEnhtU.jpg', 1, N'image/jpeg')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (3029, 2025, 0, N'B1teceDIYAEnhtU.jpg', N'.jpg', 1, 1, CAST(0x0000A4C700804805 AS DateTime), N'75ffb475-00b0-4cfe-be5f-7a2b6e494c0b', N'http://localhost:60960/uploads/75ffb475-00b0-4cfe-be5f-7a2b6e494c0b_B1teceDIYAEnhtU.jpg', 1, N'image/jpeg')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (3031, 2026, 0, N'B1teceDIYAEnhtU.jpg', N'.jpg', 1, 1, CAST(0x0000A4C700808F35 AS DateTime), N'cb87017a-2da4-4b0e-aba4-30299365f0e4', N'http://localhost:60960/uploads/cb87017a-2da4-4b0e-aba4-30299365f0e4_B1teceDIYAEnhtU.jpg', 1, N'image/jpeg')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (3032, 2027, 0, N'B1teceDIYAEnhtU.jpg', N'.jpg', 1, 1, CAST(0x0000A4C70081655A AS DateTime), N'a3b8a5cd-ab57-4b30-ba61-1802009813e7', N'http://localhost:60960/uploads/a3b8a5cd-ab57-4b30-ba61-1802009813e7_B1teceDIYAEnhtU.jpg', 1, N'image/jpeg')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (3046, 2015, 0, N'listadoOdts.png', N'.png', 1, 1, CAST(0x0000A4C900A19237 AS DateTime), N'69f1dbf2-d4b3-4aaf-911b-a5ad6c2109f7', N'http://localhost:60960/uploads/69f1dbf2-d4b3-4aaf-911b-a5ad6c2109f7_listadoOdts.png', 3, N'image/png')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (3047, 2032, 0, N'ConMet de Mexico.jpg', N'.jpg', 1, 1, CAST(0x0000A4C900B8489A AS DateTime), N'6a65027b-36b4-4e5b-adee-6a1c463df015', N'http://localhost:60960/uploads/6a65027b-36b4-4e5b-adee-6a1c463df015_ConMet de Mexico.jpg', 1, N'image/jpeg')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (3048, 2032, 0, N'descarga.jpg', N'.jpg', 1, 1, CAST(0x0000A4C900B85E09 AS DateTime), N'e5b8851a-e6cc-4ed1-bb28-3836f341ba72', N'http://localhost:60960/uploads/e5b8851a-e6cc-4ed1-bb28-3836f341ba72_descarga.jpg', 2, N'image/jpeg')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (3051, 2032, 0, N'listadoOdts.png', N'.png', 1, 1, CAST(0x0000A4C900B97708 AS DateTime), N'4a0be8e1-451f-4103-84f0-7dccf6cf7c54', N'http://localhost:60960/uploads/4a0be8e1-451f-4103-84f0-7dccf6cf7c54_listadoOdts.png', 2, N'image/png')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (3053, 2033, 0, N'listadoOdts.png', N'.png', 1, 1, CAST(0x0000A4C900BA726E AS DateTime), N'4ad62cb0-4f0b-457e-9f6e-cb44a441c573', N'http://localhost:60960/uploads/4ad62cb0-4f0b-457e-9f6e-cb44a441c573_listadoOdts.png', 3, N'image/png')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (3054, 2034, 0, N'ConMet de Mexico.jpg', N'.jpg', 1, 1, CAST(0x0000A4C900BAD0BB AS DateTime), N'57e86032-cd33-4a8b-8e61-ba3cb73c6501', N'http://localhost:60960/uploads/57e86032-cd33-4a8b-8e61-ba3cb73c6501_ConMet de Mexico.jpg', 1, N'image/jpeg')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (3055, 2034, 0, N'10947294_10155158886255582_4676491634704494481_n.jpg', N'.jpg', 1, 1, CAST(0x0000A4C900BAD8F7 AS DateTime), N'c57f0690-0805-4cf1-bc03-baafe4c4fe1c', N'http://localhost:60960/uploads/c57f0690-0805-4cf1-bc03-baafe4c4fe1c_10947294_10155158886255582_4676491634704494481_n.jpg', 2, N'image/jpeg')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (3057, 2033, 0, N'mensajeExito.png', N'.png', 1, 1, CAST(0x0000A4C900BB061C AS DateTime), N'1e205786-cbfb-4826-9574-72b7173b104a', N'http://localhost:60960/uploads/1e205786-cbfb-4826-9574-72b7173b104a_mensajeExito.png', 4, N'image/png')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (3058, 2033, 0, N'popUpGenerarOdt.png', N'.png', 1, 1, CAST(0x0000A4C900BB061C AS DateTime), N'5ebb1b7c-55a5-4205-ac0c-bf38fd794bb2', N'http://localhost:60960/uploads/5ebb1b7c-55a5-4205-ac0c-bf38fd794bb2_popUpGenerarOdt.png', 4, N'image/png')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (3059, 2036, 0, N'bajajavenger220.jpg', N'.jpg', 1, 1, CAST(0x0000A4C900BD3E47 AS DateTime), N'c877e4ed-d9ee-453a-ab3c-5dcefea67507', N'http://localhost:60960/uploads/c877e4ed-d9ee-453a-ab3c-5dcefea67507_bajajavenger220.jpg', 4, N'image/jpeg')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (3060, 2036, 0, N'bblues3.jpg', N'.jpg', 1, 1, CAST(0x0000A4C900BD3E47 AS DateTime), N'f6296c4e-5ed6-4619-91cd-0f549d74266b', N'http://localhost:60960/uploads/f6296c4e-5ed6-4619-91cd-0f549d74266b_bblues3.jpg', 4, N'image/jpeg')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (3061, 2036, 0, N'bb-king.jpg', N'.jpg', 1, 1, CAST(0x0000A4C900BD4CA6 AS DateTime), N'f6552822-697d-4bfc-8a3c-e0686f67a2ba', N'http://localhost:60960/uploads/f6552822-697d-4bfc-8a3c-e0686f67a2ba_bb-king.jpg', 3, N'image/jpeg')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (3062, 2036, 0, N'bluefullmoon.jpg', N'.jpg', 1, 1, CAST(0x0000A4C900BD90E4 AS DateTime), N'6d7a4132-a4c1-45cf-809d-ea0395fb45e9', N'http://localhost:60960/uploads/6d7a4132-a4c1-45cf-809d-ea0395fb45e9_bluefullmoon.jpg', 4, N'image/jpeg')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (3063, 2037, 0, N'10947294_10155158886255582_4676491634704494481_n.jpg', N'.jpg', 0, 1, CAST(0x0000A4C900C98C15 AS DateTime), N'5daf2bef-91e6-4446-9beb-32043faa8544', N'http://localhost:60960/uploads/5daf2bef-91e6-4446-9beb-32043faa8544_10947294_10155158886255582_4676491634704494481_n.jpg', 1, N'image/jpeg')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (3064, 2037, 0, N'descarga.jpg', N'.jpg', 1, 1, CAST(0x0000A4C900C3D04B AS DateTime), N'b8846f92-f7b5-46c3-9774-01f4c6af83a5', N'http://localhost:60960/uploads/b8846f92-f7b5-46c3-9774-01f4c6af83a5_descarga.jpg', 2, N'image/jpeg')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (3065, 2039, 0, N'bb-king.jpg', N'.jpg', 1, 1, CAST(0x0000A4C900E6AC35 AS DateTime), N'80b42b48-1c28-4e3d-a74e-4eb38d91f5ed', N'http://localhost:60960/uploads/80b42b48-1c28-4e3d-a74e-4eb38d91f5ed_bb-king.jpg', 3, N'image/jpeg')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (3066, 2040, 0, N'B1teceDIYAEnhtU.jpg', N'.jpg', 1, 1, CAST(0x0000A4C901623C80 AS DateTime), N'9edba96e-459c-4fae-8caa-80705bab7091', N'http://localhost:60960/uploads/9edba96e-459c-4fae-8caa-80705bab7091_B1teceDIYAEnhtU.jpg', 1, N'image/jpeg')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (3067, 2040, 0, N'20150630114305.jpg', N'.jpg', 1, 1, CAST(0x0000A4C9016248DB AS DateTime), N'f85ceba4-32c5-4135-9c11-a1d5cf146cae', N'http://localhost:60960/uploads/f85ceba4-32c5-4135-9c11-a1d5cf146cae_20150630114305.jpg', 1, N'image/jpeg')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (3068, 2041, 0, N'B1teceDIYAEnhtU.jpg', N'.jpg', 0, 1, CAST(0x0000A4CA0086766D AS DateTime), N'fdc066a0-25c7-4ef0-b200-520a93a8e10e', N'http://localhost:60960/uploads/fdc066a0-25c7-4ef0-b200-520a93a8e10e_B1teceDIYAEnhtU.jpg', 1, N'image/jpeg')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (3069, 2041, 0, N'B1teceDIYAEnhtU.jpg', N'.jpg', 0, 1, CAST(0x0000A4CA0086A44B AS DateTime), N'86432366-cae1-4c79-a766-db3cd8236f4e', N'http://localhost:60960/uploads/86432366-cae1-4c79-a766-db3cd8236f4e_B1teceDIYAEnhtU.jpg', 1, N'image/jpeg')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (3070, 1033, 0, N'02.jpg', N'.jpg', 1, 1, CAST(0x0000A4CA009E0249 AS DateTime), N'c75e32d7-b9b6-4e6e-94e7-9625e5915085', N'http://localhost:60960/uploads/c75e32d7-b9b6-4e6e-94e7-9625e5915085_02.jpg', 2, N'image/jpeg')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (3071, 2040, 0, N'20150630114305.jpg', N'.jpg', 1, 1, CAST(0x0000A4CA00BA6362 AS DateTime), N'4fd2c0c5-6112-4551-8396-befa367c4bdd', N'http://localhost:60960/uploads/4fd2c0c5-6112-4551-8396-befa367c4bdd_20150630114305.jpg', 2, N'image/jpeg')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (3072, 2040, 0, N'ConMet de Mexico.jpg', N'.jpg', 1, 1, CAST(0x0000A4CA00BBFC76 AS DateTime), N'425545da-3b65-4e36-9dc6-1ad4781aa4bc', N'http://localhost:60960/uploads/425545da-3b65-4e36-9dc6-1ad4781aa4bc_ConMet de Mexico.jpg', 3, N'image/jpeg')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (3073, 2012, 0, N'B1teceDIYAEnhtU.jpg', N'.jpg', 1, 1, CAST(0x0000A4CD00866DF3 AS DateTime), N'79bdc22d-0df2-4d6f-963b-f4ac2733f41f', N'http://localhost:60960/uploads/79bdc22d-0df2-4d6f-963b-f4ac2733f41f_B1teceDIYAEnhtU.jpg', 1, N'image/jpeg')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (3074, 2045, 0, N'B1teceDIYAEnhtU.jpg', N'.jpg', 1, 1, CAST(0x0000A4CD008696B8 AS DateTime), N'8833a6b7-ccd0-4eba-ac9b-a13a9907f782', N'http://localhost:60960/uploads/8833a6b7-ccd0-4eba-ac9b-a13a9907f782_B1teceDIYAEnhtU.jpg', 1, N'image/jpeg')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (3075, 2045, 0, N'B1teceDIYAEnhtU.jpg', N'.jpg', 1, 1, CAST(0x0000A4CD0086E001 AS DateTime), N'390c1313-346d-4367-9090-1e04f137c0d3', N'http://localhost:60960/uploads/390c1313-346d-4367-9090-1e04f137c0d3_B1teceDIYAEnhtU.jpg', 2, N'image/jpeg')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (3076, 2012, 0, N'aE1mmBK_460s.jpg', N'.jpg', 1, 1, CAST(0x0000A4CD008A29EF AS DateTime), N'0e169330-8aa4-4d3d-bd03-1d4caaee66b8', N'http://localhost:60960/uploads/0e169330-8aa4-4d3d-bd03-1d4caaee66b8_aE1mmBK_460s.jpg', 4, N'image/jpeg')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (3077, 2053, 0, N'B1teceDIYAEnhtU.jpg', N'.jpg', 1, 1, CAST(0x0000A4CD00C00208 AS DateTime), N'754c6ca3-89ca-4f78-98f4-99fadc183004', N'http://localhost:60960/uploads/754c6ca3-89ca-4f78-98f4-99fadc183004_B1teceDIYAEnhtU.jpg', 1, N'image/jpeg')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (3078, 2054, 0, N'B1teceDIYAEnhtU.jpg', N'.jpg', 1, 1, CAST(0x0000A4CD00E8281F AS DateTime), N'da4f0321-ff53-4d54-b7e2-68e456856d45', N'http://localhost:60960/uploads/da4f0321-ff53-4d54-b7e2-68e456856d45_B1teceDIYAEnhtU.jpg', 1, N'image/jpeg')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (3079, 2056, 0, N'B1teceDIYAEnhtU.jpg', N'.jpg', 1, 1, CAST(0x0000A4CE00B2DC4F AS DateTime), N'620b9f7b-1acb-4f0f-83ff-7a379734c0cc', N'http://localhost:60960/uploads/620b9f7b-1acb-4f0f-83ff-7a379734c0cc_B1teceDIYAEnhtU.jpg', 1, N'image/jpeg')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (3080, 2059, 0, N'B1teceDIYAEnhtU.jpg', N'.jpg', 1, 1, CAST(0x0000A4CE00F6B91F AS DateTime), N'acee1763-a273-42de-9c5a-f5e87bed6c1b', N'http://localhost:60960/uploads/acee1763-a273-42de-9c5a-f5e87bed6c1b_B1teceDIYAEnhtU.jpg', 1, N'image/jpeg')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (4073, 3055, 0, N'053fabb8-290a-447e-acab-b1ea79479a11_B1teceDIYAEnhtU.jpg', N'.jpg', 1, 1, CAST(0x0000A4F200ADA3A3 AS DateTime), N'3f6c8eaf-a29c-4689-97c2-f40528807dfd', N'http://localhost:60960/uploads/3f6c8eaf-a29c-4689-97c2-f40528807dfd_053fabb8-290a-447e-acab-b1ea79479a11_B1teceDIYAEnhtU.jpg', 1, N'image/jpeg')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (4074, 3055, 0, N'20150630114305.jpg', N'.jpg', 1, 1, CAST(0x0000A4F200ADADA4 AS DateTime), N'2b7ecb48-4a93-4c11-a09b-68705a339a0d', N'http://localhost:60960/uploads/2b7ecb48-4a93-4c11-a09b-68705a339a0d_20150630114305.jpg', 1, N'image/jpeg')
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] ([Rel_FolioAvisoLlegada_DocumentoID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [TipoArchivoID], [ContentType]) VALUES (4075, 4057, 0, N'053fabb8-290a-447e-acab-b1ea79479a11_B1teceDIYAEnhtU.jpg', N'.jpg', 1, 1, CAST(0x0000A505008164DE AS DateTime), N'0efe77d8-f86b-4bd5-8a59-b34f0c26ea4a', N'http://localhost:60960/uploads/0efe77d8-f86b-4bd5-8a59-b34f0c26ea4a_053fabb8-290a-447e-acab-b1ea79479a11_B1teceDIYAEnhtU.jpg', 1, N'image/jpeg')
SET IDENTITY_INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento] OFF
SET IDENTITY_INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_PaseSalida_Archivo] ON 

INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_PaseSalida_Archivo] ([Rel_Folio_PaseSalida_Archivo_ID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [ContentType], [TipoArchivoID]) VALUES (14, 4, 0, N'053fabb8-290a-447e-acab-b1ea79479a11_B1teceDIYAEnhtU.jpg', N'.jpg', 1, 1, CAST(0x0000A4F1010FE767 AS DateTime), N'278ca0de-60d3-4953-aba7-3ff41ed4174b', N'http://localhost:60960/uploads/278ca0de-60d3-4953-aba7-3ff41ed4174b_053fabb8-290a-447e-acab-b1ea79479a11_B1teceDIYAEnhtU.jpg', N'image/jpeg', 1007)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_PaseSalida_Archivo] ([Rel_Folio_PaseSalida_Archivo_ID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [ContentType], [TipoArchivoID]) VALUES (15, 5, 0, N'053fabb8-290a-447e-acab-b1ea79479a11_B1teceDIYAEnhtU.jpg', N'.jpg', 1, 1, CAST(0x0000A4F10110004E AS DateTime), N'333b1dc1-d3b0-4319-80ce-864439fdc2a6', N'http://localhost:60960/uploads/333b1dc1-d3b0-4319-80ce-864439fdc2a6_053fabb8-290a-447e-acab-b1ea79479a11_B1teceDIYAEnhtU.jpg', N'image/jpeg', 1006)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_PaseSalida_Archivo] ([Rel_Folio_PaseSalida_Archivo_ID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [ContentType], [TipoArchivoID]) VALUES (16, 3051, 0, N'053fabb8-290a-447e-acab-b1ea79479a11_B1teceDIYAEnhtU.jpg', N'.jpg', 1, 1, CAST(0x0000A4F101173E0F AS DateTime), N'23579b3b-9dab-40c1-b858-f195868dfa04', N'http://localhost:60960/uploads/23579b3b-9dab-40c1-b858-f195868dfa04_053fabb8-290a-447e-acab-b1ea79479a11_B1teceDIYAEnhtU.jpg', N'image/jpeg', 1007)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_PaseSalida_Archivo] ([Rel_Folio_PaseSalida_Archivo_ID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [ContentType], [TipoArchivoID]) VALUES (17, 3051, 0, N'053fabb8-290a-447e-acab-b1ea79479a11_B1teceDIYAEnhtU.jpg', N'.jpg', 1, 1, CAST(0x0000A4F101174702 AS DateTime), N'43c0c621-af15-4fb9-b559-5a6453c7f1f2', N'http://localhost:60960/uploads/43c0c621-af15-4fb9-b559-5a6453c7f1f2_053fabb8-290a-447e-acab-b1ea79479a11_B1teceDIYAEnhtU.jpg', N'image/jpeg', 1006)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_PaseSalida_Archivo] ([Rel_Folio_PaseSalida_Archivo_ID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [ContentType], [TipoArchivoID]) VALUES (18, 3052, 0, N'053fabb8-290a-447e-acab-b1ea79479a11_B1teceDIYAEnhtU.jpg', N'.jpg', 1, 1, CAST(0x0000A4F10118109D AS DateTime), N'78ee6a1f-d0f9-48c0-9088-c5a788871fd7', N'http://localhost:60960/uploads/78ee6a1f-d0f9-48c0-9088-c5a788871fd7_053fabb8-290a-447e-acab-b1ea79479a11_B1teceDIYAEnhtU.jpg', N'image/jpeg', 1007)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_PaseSalida_Archivo] ([Rel_Folio_PaseSalida_Archivo_ID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [ContentType], [TipoArchivoID]) VALUES (19, 3052, 0, N'053fabb8-290a-447e-acab-b1ea79479a11_B1teceDIYAEnhtU.jpg', N'.jpg', 1, 1, CAST(0x0000A4F101181555 AS DateTime), N'5105e606-ba4f-4ff7-b845-0bf0fb6e9a80', N'http://localhost:60960/uploads/5105e606-ba4f-4ff7-b845-0bf0fb6e9a80_053fabb8-290a-447e-acab-b1ea79479a11_B1teceDIYAEnhtU.jpg', N'image/jpeg', 1006)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_PaseSalida_Archivo] ([Rel_Folio_PaseSalida_Archivo_ID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [ContentType], [TipoArchivoID]) VALUES (20, 3053, 0, N'053fabb8-290a-447e-acab-b1ea79479a11_B1teceDIYAEnhtU.jpg', N'.jpg', 1, 1, CAST(0x0000A4F1012894AD AS DateTime), N'dc68dfac-dcb2-498b-b96b-25df23639989', N'http://localhost:60960/uploads/dc68dfac-dcb2-498b-b96b-25df23639989_053fabb8-290a-447e-acab-b1ea79479a11_B1teceDIYAEnhtU.jpg', N'image/jpeg', 1007)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_PaseSalida_Archivo] ([Rel_Folio_PaseSalida_Archivo_ID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [ContentType], [TipoArchivoID]) VALUES (21, 3053, 0, N'053fabb8-290a-447e-acab-b1ea79479a11_B1teceDIYAEnhtU.jpg', N'.jpg', 1, 1, CAST(0x0000A4F101289B6E AS DateTime), N'cc9a6ca9-9315-483a-9329-a5e344f18856', N'http://localhost:60960/uploads/cc9a6ca9-9315-483a-9329-a5e344f18856_053fabb8-290a-447e-acab-b1ea79479a11_B1teceDIYAEnhtU.jpg', N'image/jpeg', 1006)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_PaseSalida_Archivo] ([Rel_Folio_PaseSalida_Archivo_ID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [ContentType], [TipoArchivoID]) VALUES (22, 3054, 0, N'053fabb8-290a-447e-acab-b1ea79479a11_B1teceDIYAEnhtU.jpg', N'.jpg', 1, 1, CAST(0x0000A4F1012E0E8D AS DateTime), N'0607f5f0-416b-4984-bc73-0f08cd3ad428', N'http://localhost:60960/uploads/0607f5f0-416b-4984-bc73-0f08cd3ad428_053fabb8-290a-447e-acab-b1ea79479a11_B1teceDIYAEnhtU.jpg', N'image/jpeg', 1007)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_PaseSalida_Archivo] ([Rel_Folio_PaseSalida_Archivo_ID], [FolioAvisoLlegadaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [ContentType], [TipoArchivoID]) VALUES (23, 3054, 0, N'20150630114305.jpg', N'.jpg', 1, 1, CAST(0x0000A4F1012E173C AS DateTime), N'468a40d4-9a5b-4831-83f6-50f53a76a066', N'http://localhost:60960/uploads/468a40d4-9a5b-4831-83f6-50f53a76a066_20150630114305.jpg', N'image/jpeg', 1006)
SET IDENTITY_INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_PaseSalida_Archivo] OFF
SET IDENTITY_INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ON 

INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2, 9, 1, 1, 1, CAST(0x0000A4BB00FA621F AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1002, 8, 2, 1, 1, CAST(0x0000A4BB010B246E AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2003, 1010, 2, 1, 1, CAST(0x0000A4C000E75454 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2005, 1011, 2, 1, 1, CAST(0x0000A4C000E7B6E8 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2006, 1012, 1, 1, 1, CAST(0x0000A4C000E81BE9 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2007, 1016, 1, 1, 1, CAST(0x0000A4C100A291C8 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2008, 1017, 1, 1, 1, CAST(0x0000A4C100A6E242 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2009, 1018, 2, 1, 1, CAST(0x0000A4C100A8A05B AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2010, 1019, 1, 1, 1, CAST(0x0000A4C100AC6690 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2011, 1019, 2, 1, 1, CAST(0x0000A4C100AC6691 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2012, 1020, 1, 1, 1, CAST(0x0000A4C100BC3A50 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2013, 1020, 2, 1, 1, CAST(0x0000A4C100BC3A52 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2014, 1022, 1, 1, 1, CAST(0x0000A4C100BE5B56 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2015, 1023, 1, 1, 1, CAST(0x0000A4C20076ABAC AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2016, 1024, 1, 1, 1, CAST(0x0000A4C2007991B4 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2017, 1025, 1, 1, 1, CAST(0x0000A4C2007A420C AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2018, 1026, 1, 1, 1, CAST(0x0000A4C200852944 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2019, 1027, 1, 1, 1, CAST(0x0000A4C200859977 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2020, 1028, 1, 1, 1, CAST(0x0000A4C20086174C AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2021, 1029, 1, 1, 1, CAST(0x0000A4C200868FE6 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2022, 1030, 1, 1, 1, CAST(0x0000A4C200C8B711 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2023, 1031, 1, 1, 1, CAST(0x0000A4C300841077 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2024, 1033, 1, 1, 1, CAST(0x0000A4C30106A85A AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3002, 2009, 1, 1, 1, CAST(0x0000A4C600735691 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3003, 2010, 1, 1, 1, CAST(0x0000A4C60073A91A AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3004, 2011, 2, 1, 1, CAST(0x0000A4C60074387B AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3005, 2012, 2, 1, 1, CAST(0x0000A4C60074A0FC AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3006, 2013, 2, 1, 1, CAST(0x0000A4C6007ED8F3 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3007, 2014, 2, 1, 1, CAST(0x0000A4C600813C7B AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3008, 2015, 1, 1, 1, CAST(0x0000A4C6009BD200 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3009, 2016, 1, 1, 1, CAST(0x0000A4C600CD0DD8 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3010, 2017, 2, 1, 1, CAST(0x0000A4C600CD6E48 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3011, 2018, 2, 1, 1, CAST(0x0000A4C600CEB270 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3012, 2019, 1, 1, 1, CAST(0x0000A4C600D04FA7 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3013, 2020, 1, 1, 1, CAST(0x0000A4C600D2DEC1 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3014, 2021, 1, 1, 1, CAST(0x0000A4C600D3D2EE AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3015, 2022, 1, 1, 1, CAST(0x0000A4C601005542 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3016, 2023, 1, 1, 1, CAST(0x0000A4C60100CC54 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3017, 2024, 1, 1, 1, CAST(0x0000A4C6010270E1 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3018, 2025, 1, 1, 1, CAST(0x0000A4C70080149F AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3019, 2026, 2, 1, 1, CAST(0x0000A4C7008080F6 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3020, 2026, 1, 1, 1, CAST(0x0000A4C7008080F6 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3021, 2027, 1, 1, 1, CAST(0x0000A4C700815829 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3022, 2027, 2, 1, 1, CAST(0x0000A4C70081582A AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3023, 2028, 1, 1, 1, CAST(0x0000A4C80110F924 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3024, 2029, 1, 1, 1, CAST(0x0000A4C801119695 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3025, 2030, 1, 1, 1, CAST(0x0000A4C80111D2BD AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3026, 2031, 1, 1, 1, CAST(0x0000A4C9008C1D97 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3027, 2032, 1, 1, 1, CAST(0x0000A4C900B5C7CC AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3028, 2032, 2, 1, 1, CAST(0x0000A4C900B5C7CD AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3029, 2033, 1, 1, 1, CAST(0x0000A4C900BA1BDD AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3030, 2034, 1, 1, 1, CAST(0x0000A4C900BA7048 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3031, 2034, 2, 1, 1, CAST(0x0000A4C900BA7048 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3032, 2035, 1, 1, 1, CAST(0x0000A4C900BBAEA6 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3033, 2036, 2, 1, 1, CAST(0x0000A4C900BD160A AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3034, 2037, 1, 1, 1, CAST(0x0000A4C900C39FB7 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3035, 2037, 2, 1, 1, CAST(0x0000A4C900C39FB8 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3036, 2038, 1, 1, 1, CAST(0x0000A4C900E218DE AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3037, 2038, 2, 1, 1, CAST(0x0000A4C900E218DE AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3038, 2039, 1, 1, 1, CAST(0x0000A4C900E68CE5 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3039, 2040, 1, 1, 1, CAST(0x0000A4C901621826 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3040, 2040, 2, 1, 1, CAST(0x0000A4C901621828 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3041, 2041, 1, 1, 1, CAST(0x0000A4CA007F48C7 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3042, 2041, 2, 1, 1, CAST(0x0000A4CA007F48C8 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3043, 2042, 1, 1, 1, CAST(0x0000A4CA00CE501C AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3044, 2043, 1, 1, 1, CAST(0x0000A4CA00D065F9 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3045, 2044, 1, 1, 1, CAST(0x0000A4CA00E337E3 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3046, 2044, 2, 1, 1, CAST(0x0000A4CA00E337E3 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3047, 2045, 1, 1, 1, CAST(0x0000A4CA00EBF302 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3048, 2046, 1, 1, 1, CAST(0x0000A4CD0081E11F AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3049, 2042, 2, 1, 1, CAST(0x0000A4CD00837F6A AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3050, 2047, 1, 1, 1, CAST(0x0000A4CD00931EEE AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3051, 2048, 1, 1, 1, CAST(0x0000A4CD00B39E9A AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3052, 2049, 1, 1, 1, CAST(0x0000A4CD00BB4F90 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3053, 2049, 2, 1, 1, CAST(0x0000A4CD00BB4F90 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3054, 2050, 1, 1, 1, CAST(0x0000A4CD00BC159B AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3055, 2050, 2, 1, 1, CAST(0x0000A4CD00BC159B AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3056, 2051, 1, 1, 1, CAST(0x0000A4CD00BD9595 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3057, 2051, 2, 1, 1, CAST(0x0000A4CD00BD9595 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3058, 2052, 1, 1, 1, CAST(0x0000A4CD00BEDBA2 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3059, 2052, 2, 1, 1, CAST(0x0000A4CD00BEDBA2 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3060, 2053, 1, 1, 1, CAST(0x0000A4CD00BFD6AB AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3061, 2054, 1, 1, 1, CAST(0x0000A4CD00E813FE AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3062, 2054, 2, 1, 1, CAST(0x0000A4CD00E813FE AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3063, 2055, 1, 1, 1, CAST(0x0000A4CE00B25CB0 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3064, 2056, 1, 1, 1, CAST(0x0000A4CE00B2CC10 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3065, 2056, 2, 1, 1, CAST(0x0000A4CE00B2CC10 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3066, 2057, 1, 1, 1, CAST(0x0000A4CE00F570A6 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3067, 2057, 2, 1, 1, CAST(0x0000A4CE00F570A6 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3068, 2058, 1, 1, 1, CAST(0x0000A4CE00F66E33 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3069, 2058, 2, 1, 1, CAST(0x0000A4CE00F66E33 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3070, 2059, 1, 1, 1, CAST(0x0000A4CE00F6A46B AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3071, 2060, 1, 1, 1, CAST(0x0000A4CE00F74A46 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3072, 2061, 1, 1, 1, CAST(0x0000A4CF00ADC898 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3073, 2061, 2, 1, 1, CAST(0x0000A4CF00ADC898 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3074, 2062, 1, 1, 1, CAST(0x0000A4CF00B00F60 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3075, 2062, 2, 1, 1, CAST(0x0000A4CF00B00F60 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3076, 2063, 1, 1, 1, CAST(0x0000A4CF00B0C471 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3077, 2063, 2, 1, 1, CAST(0x0000A4CF00B0C473 AS DateTime))
GO
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (4048, 3046, 1, 1, 1, CAST(0x0000A4ED00B08AB3 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (4049, 3047, 1, 1, 1, CAST(0x0000A4F0011AC4C2 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (4050, 3048, 1, 1, 1, CAST(0x0000A4F0011FA323 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (4051, 3049, 1, 1, 1, CAST(0x0000A4F00120FD9A AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (4052, 3050, 1, 1, 1, CAST(0x0000A4F0012129CA AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (4053, 3051, 2, 1, 1, CAST(0x0000A4F1011716FD AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (4054, 3052, 2, 1, 1, CAST(0x0000A4F10117B7C9 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (4055, 3053, 2, 1, 1, CAST(0x0000A4F101284B7E AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (4056, 3054, 1, 1, 1, CAST(0x0000A4F1012DB0C8 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (4057, 3055, 1, 1, 1, CAST(0x0000A4F200AD9B1B AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (4058, 3056, 1, 1, 1, CAST(0x0000A4FA009682D6 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (4059, 3057, 1, 1, 1, CAST(0x0000A4FB00EA05B5 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (4060, 3057, 2, 1, 1, CAST(0x0000A4FB00EA05B6 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (4061, 3057, 1, 1, 1, CAST(0x0000A4FB00F9306F AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (4062, 3058, 1, 1, 1, CAST(0x0000A4FB00F99554 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (4063, 3058, 2, 1, 1, CAST(0x0000A4FB00F99554 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (4064, 3058, 1, 1, 1, CAST(0x0000A4FB00FA9B99 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (4065, 3058, 2, 1, 1, CAST(0x0000A4FB00FA9B99 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (5058, 4057, 1, 1, 1, CAST(0x0000A505008151E5 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (5059, 7, 2, 1, 1, CAST(0x0000A50800C9213E AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (5060, 7, 1, 1, 1, CAST(0x0000A50800C92140 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (5061, 4058, 1, 1, 1, CAST(0x0000A50C00EE6720 AS DateTime))
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] ([Rel_FolioAviso_ProyectoID], [FolioAvisoLlegadaID], [ProyectoID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (5062, 4058, 2, 1, 1, CAST(0x0000A50C00EE6721 AS DateTime))
SET IDENTITY_INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto] OFF
SET IDENTITY_INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ON 

INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1, 8, 4, 1, CAST(0x0000A4BF00E14DFF AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (2, 8, 5, 1, CAST(0x0000A4BF00E14DFF AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (3, 9, 5, 1, CAST(0x0000A4BF00E14DFF AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (4, 9, 6, 1, CAST(0x0000A4BF00E14DFF AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (5, 1010, 1, 1, CAST(0x0000A4C000E7597D AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (6, 1010, 4, 1, CAST(0x0000A4C000E75CD0 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (7, 1011, 3, 1, CAST(0x0000A4C000E7B7F8 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (8, 1011, 2, 1, CAST(0x0000A4C000E7B8A6 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (9, 1011, 6, 1, CAST(0x0000A4C000E7BA01 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (10, 1012, 4, 1, CAST(0x0000A4C000E81C8F AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (11, 1012, 6, 1, CAST(0x0000A4C000E81DED AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (12, 1012, 2, 1, CAST(0x0000A4C000E81EA7 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (13, 1016, 4, 1, CAST(0x0000A4C100A2987E AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (14, 1016, 6, 1, CAST(0x0000A4C100A29C6C AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (15, 1017, 5, 1, CAST(0x0000A4C100A6E383 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (16, 1017, 4, 1, CAST(0x0000A4C100A6E48E AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (17, 1018, 5, 1, CAST(0x0000A4C100A8A08D AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (18, 1018, 3, 1, CAST(0x0000A4C100A8A123 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (19, 1018, 2, 1, CAST(0x0000A4C100A8A2B7 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (20, 1019, 5, 1, CAST(0x0000A4C100AC674B AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (21, 1019, 4, 1, CAST(0x0000A4C100AC6882 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (22, 1019, 6, 1, CAST(0x0000A4C100AC6958 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (23, 1020, 2, 1, CAST(0x0000A4C100BC3F5C AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (24, 1020, 3, 1, CAST(0x0000A4C100BC3F5D AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (25, 1020, 1, 1, CAST(0x0000A4C100BC3F5D AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (26, 1021, 1, 1, CAST(0x0000A4C100BDB81A AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (27, 1021, 4, 1, CAST(0x0000A4C100BDB81A AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (28, 1022, 5, 1, CAST(0x0000A4C100BE5B56 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (29, 1022, 6, 1, CAST(0x0000A4C100BE5B56 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (30, 1023, 2, 1, CAST(0x0000A4C20076ABAC AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (31, 1024, 1, 1, CAST(0x0000A4C2007991B4 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (32, 1025, 1, 1, CAST(0x0000A4C2007A420C AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (33, 1026, 1, 1, CAST(0x0000A4C200852944 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (34, 1027, 5, 1, CAST(0x0000A4C200859977 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (35, 1028, 5, 1, CAST(0x0000A4C20086186E AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (36, 1029, 5, 1, CAST(0x0000A4C200868FE6 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (37, 1030, 2, 1, CAST(0x0000A4C200C8C1A2 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (38, 1031, 1, 1, CAST(0x0000A4C30084158E AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (39, 1033, 2, 1, CAST(0x0000A4C30106A85D AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1002, 2009, 1, 1, CAST(0x0000A4C600735691 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1003, 2010, 5, 1, CAST(0x0000A4C60073A91A AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1004, 2011, 1, 1, CAST(0x0000A4C60074387B AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1005, 2012, 1, 1, CAST(0x0000A4C60074A0FC AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1006, 2013, 1, 1, CAST(0x0000A4C6007ED8F5 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1007, 2014, 1, 1, CAST(0x0000A4C600813C7C AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1008, 2015, 1, 1, CAST(0x0000A4C6009BD201 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1009, 2016, 1, 1, CAST(0x0000A4C600CD0DD9 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1010, 2017, 1, 1, CAST(0x0000A4C600CD6E48 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1011, 2018, 1, 1, CAST(0x0000A4C600CEB270 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1012, 2019, 1, 1, CAST(0x0000A4C600D04FA7 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1013, 2019, 2, 1, CAST(0x0000A4C600D0609A AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1014, 2020, 1, 1, CAST(0x0000A4C600D2DEC2 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1015, 2021, 1, 1, CAST(0x0000A4C600D3D2EE AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1016, 2022, 1, 1, CAST(0x0000A4C601005543 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1017, 2023, 5, 1, CAST(0x0000A4C60100CC54 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1018, 2024, 4, 1, CAST(0x0000A4C6010270E1 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1019, 2026, 1, 1, CAST(0x0000A4C7008080F6 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1020, 2027, 1, 1, CAST(0x0000A4C70081582A AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1021, 2027, 3, 1, CAST(0x0000A4C70081582A AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1022, 2028, 1, 1, CAST(0x0000A4C80110F925 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1023, 2029, 1, 1, CAST(0x0000A4C801119695 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1024, 2029, 2, 1, CAST(0x0000A4C801119695 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1025, 2030, 2, 1, CAST(0x0000A4C80111D2BD AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1026, 2030, 3, 1, CAST(0x0000A4C80111D2BD AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1027, 1024, 3, 1, CAST(0x0000A4C900A08EB9 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1028, 2015, 3, 1, CAST(0x0000A4C900A1ADEE AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1029, 2032, 1, 1, CAST(0x0000A4C900B5C7CD AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1030, 2032, 3, 1, CAST(0x0000A4C900B5C7CE AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1031, 2032, 4, 1, CAST(0x0000A4C900B5C7CE AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1032, 2033, 1, 1, CAST(0x0000A4C900BA1BDE AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1033, 2034, 1, 1, CAST(0x0000A4C900BA7048 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1034, 2034, 2, 1, CAST(0x0000A4C900BA7048 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1035, 2034, 3, 1, CAST(0x0000A4C900BA7048 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1036, 2035, 4, 1, CAST(0x0000A4C900BBAEA6 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1037, 2036, 1, 1, CAST(0x0000A4C900BD160A AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1038, 2036, 5, 1, CAST(0x0000A4C900BD9D29 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1039, 2037, 1, 1, CAST(0x0000A4C900C39FB8 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1040, 2037, 3, 1, CAST(0x0000A4C900C39FB9 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1041, 2037, 2, 1, CAST(0x0000A4C900C39FB9 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1042, 2038, 1, 1, CAST(0x0000A4C900E218DE AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1043, 2038, 2, 1, CAST(0x0000A4C900E218DE AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1044, 2038, 3, 1, CAST(0x0000A4C900E218DE AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1045, 2039, 1, 1, CAST(0x0000A4C900E68CE8 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1046, 2039, 4, 1, CAST(0x0000A4C900E68CE8 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1047, 2040, 1, 1, CAST(0x0000A4C901621828 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1048, 2040, 2, 1, CAST(0x0000A4C901621829 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1049, 2041, 1, 1, CAST(0x0000A4CA007F48C8 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1050, 2041, 2, 1, CAST(0x0000A4CA007F48C8 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1051, 2041, 3, 1, CAST(0x0000A4CA007F48C8 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1052, 2042, 1, 1, CAST(0x0000A4CA00CE501F AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1053, 2043, 1, 1, CAST(0x0000A4CA00D065F9 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1054, 2043, 2, 1, CAST(0x0000A4CA00D065F9 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1055, 2044, 1, 1, CAST(0x0000A4CA00E337E3 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1056, 2044, 2, 1, CAST(0x0000A4CA00E337E3 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1057, 2045, 1, 1, CAST(0x0000A4CA00EBF302 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1058, 2045, 2, 1, CAST(0x0000A4CA00EBF302 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1059, 2046, 1, 1, CAST(0x0000A4CD0081E11F AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1060, 2042, 1021, 1, CAST(0x0000A4CD00837F68 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1061, 2047, 1, 1, CAST(0x0000A4CD00931EF0 AS DateTime), 1)
GO
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1062, 2048, 1, 1, CAST(0x0000A4CD00B39E9B AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1063, 2048, 4, 1, CAST(0x0000A4CD00B39E9B AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1064, 2049, 1, 1, CAST(0x0000A4CD00BB4F90 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1065, 2049, 2, 1, CAST(0x0000A4CD00BB4F90 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1066, 2050, 1, 1, CAST(0x0000A4CD00BC159B AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1067, 2050, 2, 1, CAST(0x0000A4CD00BC159B AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1068, 2051, 1, 1, CAST(0x0000A4CD00BD9595 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1069, 2051, 2, 1, CAST(0x0000A4CD00BD9595 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1070, 2052, 1, 1, CAST(0x0000A4CD00BEDBA2 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1071, 2052, 2, 1, CAST(0x0000A4CD00BEDBA2 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1072, 2053, 1, 1, CAST(0x0000A4CD00BFD6AB AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1073, 2053, 2, 1, CAST(0x0000A4CD00BFD6AB AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1074, 2054, 1, 1, CAST(0x0000A4CD00E813FE AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1075, 2054, 2, 1, CAST(0x0000A4CD00E813FE AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1076, 2054, 3, 1, CAST(0x0000A4CD00E87451 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1077, 2055, 1, 1, CAST(0x0000A4CE00B25CB0 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1078, 2055, 2, 1, CAST(0x0000A4CE00B25CB0 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1079, 2056, 1, 1, CAST(0x0000A4CE00B2CC10 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1080, 2056, 2, 1, CAST(0x0000A4CE00B2CC10 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1081, 2056, 3, 1, CAST(0x0000A4CE00B2DDAD AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1082, 2057, 1, 1, CAST(0x0000A4CE00F570A6 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1083, 2057, 2, 1, CAST(0x0000A4CE00F570A7 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1084, 2058, 2, 1, CAST(0x0000A4CE00F66E33 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1085, 2058, 4, 1, CAST(0x0000A4CE00F66E33 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1086, 2059, 4, 1, CAST(0x0000A4CE00F6A46B AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1087, 2059, 2, 1, CAST(0x0000A4CE00F6A46B AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1088, 2060, 1, 1, CAST(0x0000A4CE00F74A46 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1089, 2060, 2, 1, CAST(0x0000A4CE00F74A46 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1090, 2061, 1, 1, CAST(0x0000A4CF00ADC898 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1091, 2061, 2, 1, CAST(0x0000A4CF00ADC898 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1092, 2062, 1, 1, CAST(0x0000A4CF00B00F60 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1093, 2062, 2, 1, CAST(0x0000A4CF00B00F60 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1094, 2063, 1, 1, CAST(0x0000A4CF00B0C473 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1095, 2063, 2, 1, CAST(0x0000A4CF00B0C474 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (2059, 3051, 1, 1, CAST(0x0000A4F1011716FE AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (2060, 3051, 2, 1, CAST(0x0000A4F1011716FF AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (2061, 3051, 3, 1, CAST(0x0000A4F1011716FF AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (2062, 3052, 1, 1, CAST(0x0000A4F10117B7C9 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (2063, 3052, 2, 1, CAST(0x0000A4F10117B7C9 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (2064, 3052, 4, 1, CAST(0x0000A4F10117B7CA AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (2065, 3053, 4, 1, CAST(0x0000A4F101284B7F AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (2066, 3053, 5, 1, CAST(0x0000A4F101284B80 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (2067, 3053, 6, 1, CAST(0x0000A4F101284B80 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (2068, 3055, 4, 1, CAST(0x0000A4F200AD9B1C AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (2069, 3055, 5, 1, CAST(0x0000A4F200AD9B1C AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (2070, 3056, 4, 1, CAST(0x0000A4FA009682D6 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (2071, 3056, 5, 1, CAST(0x0000A4FA009682D6 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (2072, 3057, 4, 1, CAST(0x0000A4FB00EA05B7 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (2073, 3057, 5, 1, CAST(0x0000A4FB00EA05B7 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (2074, 3058, 4, 1, CAST(0x0000A4FB00F99554 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (2075, 3058, 5, 1, CAST(0x0000A4FB00F99555 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (3070, 4057, 4, 1, CAST(0x0000A505008151E6 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (3071, 4057, 5, 1, CAST(0x0000A505008151E6 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (3072, 4058, 4, 1, CAST(0x0000A50C00EE6721 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] ([Rel_FolioAvisoLlegada_Vehiculo_ID], [FolioAvisoLlegadaID], [VehiculoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (3073, 4058, 5, 1, CAST(0x0000A50C00EE6722 AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo] OFF
SET IDENTITY_INSERT [dbo].[Sam3_Rel_FolioCuantificacion_ItemCode] ON 

INSERT [dbo].[Sam3_Rel_FolioCuantificacion_ItemCode] ([Rel_FolioCuantificacion_ItemCode_ID], [FolioCuantificacionID], [ItemCodeID], [TieneNumerosUnicos], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (1060, 84, 16, 0, CAST(0x0000A50D014C3A40 AS DateTime), 1, 1)
INSERT [dbo].[Sam3_Rel_FolioCuantificacion_ItemCode] ([Rel_FolioCuantificacion_ItemCode_ID], [FolioCuantificacionID], [ItemCodeID], [TieneNumerosUnicos], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (1061, 84, 16, 0, CAST(0x0000A50D014C7E07 AS DateTime), 1, 1)
INSERT [dbo].[Sam3_Rel_FolioCuantificacion_ItemCode] ([Rel_FolioCuantificacion_ItemCode_ID], [FolioCuantificacionID], [ItemCodeID], [TieneNumerosUnicos], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (1062, 84, 16, 0, CAST(0x0000A50D014DE405 AS DateTime), 1, 1)
INSERT [dbo].[Sam3_Rel_FolioCuantificacion_ItemCode] ([Rel_FolioCuantificacion_ItemCode_ID], [FolioCuantificacionID], [ItemCodeID], [TieneNumerosUnicos], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (1063, 85, 16, 0, CAST(0x0000A50D01539BB2 AS DateTime), 1, 1)
INSERT [dbo].[Sam3_Rel_FolioCuantificacion_ItemCode] ([Rel_FolioCuantificacion_ItemCode_ID], [FolioCuantificacionID], [ItemCodeID], [TieneNumerosUnicos], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (1064, 86, 16, 0, CAST(0x0000A50D015545C5 AS DateTime), 1, 1)
INSERT [dbo].[Sam3_Rel_FolioCuantificacion_ItemCode] ([Rel_FolioCuantificacion_ItemCode_ID], [FolioCuantificacionID], [ItemCodeID], [TieneNumerosUnicos], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (1065, 87, 17, 0, CAST(0x0000A50D0156012D AS DateTime), 1, 1)
INSERT [dbo].[Sam3_Rel_FolioCuantificacion_ItemCode] ([Rel_FolioCuantificacion_ItemCode_ID], [FolioCuantificacionID], [ItemCodeID], [TieneNumerosUnicos], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (1066, 88, 17, 0, CAST(0x0000A50D015728B0 AS DateTime), 1, 1)
INSERT [dbo].[Sam3_Rel_FolioCuantificacion_ItemCode] ([Rel_FolioCuantificacion_ItemCode_ID], [FolioCuantificacionID], [ItemCodeID], [TieneNumerosUnicos], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (1067, 89, 17, 0, CAST(0x0000A50D0157ABF9 AS DateTime), 1, 1)
INSERT [dbo].[Sam3_Rel_FolioCuantificacion_ItemCode] ([Rel_FolioCuantificacion_ItemCode_ID], [FolioCuantificacionID], [ItemCodeID], [TieneNumerosUnicos], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (1068, 93, 16, 0, CAST(0x0000A50D016233F9 AS DateTime), 1, 1)
INSERT [dbo].[Sam3_Rel_FolioCuantificacion_ItemCode] ([Rel_FolioCuantificacion_ItemCode_ID], [FolioCuantificacionID], [ItemCodeID], [TieneNumerosUnicos], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (1069, 100, 17, 0, CAST(0x0000A50D0178FA7B AS DateTime), 1, 1)
INSERT [dbo].[Sam3_Rel_FolioCuantificacion_ItemCode] ([Rel_FolioCuantificacion_ItemCode_ID], [FolioCuantificacionID], [ItemCodeID], [TieneNumerosUnicos], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (1070, 101, 17, 0, CAST(0x0000A50D017D2AC7 AS DateTime), 1, 1)
INSERT [dbo].[Sam3_Rel_FolioCuantificacion_ItemCode] ([Rel_FolioCuantificacion_ItemCode_ID], [FolioCuantificacionID], [ItemCodeID], [TieneNumerosUnicos], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (1071, 102, 17, 0, CAST(0x0000A50D017DDEB3 AS DateTime), 1, 1)
INSERT [dbo].[Sam3_Rel_FolioCuantificacion_ItemCode] ([Rel_FolioCuantificacion_ItemCode_ID], [FolioCuantificacionID], [ItemCodeID], [TieneNumerosUnicos], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (1072, 103, 20, 0, CAST(0x0000A50D017E4823 AS DateTime), 1, 1)
INSERT [dbo].[Sam3_Rel_FolioCuantificacion_ItemCode] ([Rel_FolioCuantificacion_ItemCode_ID], [FolioCuantificacionID], [ItemCodeID], [TieneNumerosUnicos], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (1073, 105, 20, 0, CAST(0x0000A50E0000129D AS DateTime), 1, 1)
INSERT [dbo].[Sam3_Rel_FolioCuantificacion_ItemCode] ([Rel_FolioCuantificacion_ItemCode_ID], [FolioCuantificacionID], [ItemCodeID], [TieneNumerosUnicos], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (1076, 106, 16, 0, CAST(0x0000A50E00048270 AS DateTime), 1, 1)
INSERT [dbo].[Sam3_Rel_FolioCuantificacion_ItemCode] ([Rel_FolioCuantificacion_ItemCode_ID], [FolioCuantificacionID], [ItemCodeID], [TieneNumerosUnicos], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (1077, 106, 20, 0, CAST(0x0000A50E00048275 AS DateTime), 1, 1)
INSERT [dbo].[Sam3_Rel_FolioCuantificacion_ItemCode] ([Rel_FolioCuantificacion_ItemCode_ID], [FolioCuantificacionID], [ItemCodeID], [TieneNumerosUnicos], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (1078, 107, 32, 0, CAST(0x0000A50E0024708C AS DateTime), 1, 1)
INSERT [dbo].[Sam3_Rel_FolioCuantificacion_ItemCode] ([Rel_FolioCuantificacion_ItemCode_ID], [FolioCuantificacionID], [ItemCodeID], [TieneNumerosUnicos], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (1079, 93, 22, 0, CAST(0x0000A50E0027116F AS DateTime), 1, 1)
INSERT [dbo].[Sam3_Rel_FolioCuantificacion_ItemCode] ([Rel_FolioCuantificacion_ItemCode_ID], [FolioCuantificacionID], [ItemCodeID], [TieneNumerosUnicos], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (1080, 108, 22, 0, CAST(0x0000A50E0027D3F0 AS DateTime), 1, 1)
INSERT [dbo].[Sam3_Rel_FolioCuantificacion_ItemCode] ([Rel_FolioCuantificacion_ItemCode_ID], [FolioCuantificacionID], [ItemCodeID], [TieneNumerosUnicos], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (1083, 112, 16, 0, CAST(0x0000A50E00AE75BA AS DateTime), 1, 1)
INSERT [dbo].[Sam3_Rel_FolioCuantificacion_ItemCode] ([Rel_FolioCuantificacion_ItemCode_ID], [FolioCuantificacionID], [ItemCodeID], [TieneNumerosUnicos], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (1084, 113, 17, 0, CAST(0x0000A50E00AF48CA AS DateTime), 1, 1)
INSERT [dbo].[Sam3_Rel_FolioCuantificacion_ItemCode] ([Rel_FolioCuantificacion_ItemCode_ID], [FolioCuantificacionID], [ItemCodeID], [TieneNumerosUnicos], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (1085, 114, 34, 0, CAST(0x0000A50E00BD3EA5 AS DateTime), 1, 1)
INSERT [dbo].[Sam3_Rel_FolioCuantificacion_ItemCode] ([Rel_FolioCuantificacion_ItemCode_ID], [FolioCuantificacionID], [ItemCodeID], [TieneNumerosUnicos], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (1086, 114, 33, 0, CAST(0x0000A50E00BD3EC0 AS DateTime), 1, 1)
INSERT [dbo].[Sam3_Rel_FolioCuantificacion_ItemCode] ([Rel_FolioCuantificacion_ItemCode_ID], [FolioCuantificacionID], [ItemCodeID], [TieneNumerosUnicos], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (1087, 121, 17, 0, CAST(0x0000A50E00C41F88 AS DateTime), 1, 0)
INSERT [dbo].[Sam3_Rel_FolioCuantificacion_ItemCode] ([Rel_FolioCuantificacion_ItemCode_ID], [FolioCuantificacionID], [ItemCodeID], [TieneNumerosUnicos], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (1088, 125, 16, 0, CAST(0x0000A50E00C70113 AS DateTime), 1, 1)
INSERT [dbo].[Sam3_Rel_FolioCuantificacion_ItemCode] ([Rel_FolioCuantificacion_ItemCode_ID], [FolioCuantificacionID], [ItemCodeID], [TieneNumerosUnicos], [FechaModificacion], [UsuarioModificacion], [Activo]) VALUES (1089, 114, 35, 0, CAST(0x0000A50E00D4472D AS DateTime), 1, 1)
SET IDENTITY_INSERT [dbo].[Sam3_Rel_FolioCuantificacion_ItemCode] OFF
SET IDENTITY_INSERT [dbo].[Sam3_Rel_ItemCode_ItemCodeSteelgo] ON 

INSERT [dbo].[Sam3_Rel_ItemCode_ItemCodeSteelgo] ([Rel_ItemCode_ItemCodeSteelgo], [ItemCodeID], [ItemCodeSteelgoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1, 2, 1, 1, CAST(0x0000A4FF00000000 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_ItemCode_ItemCodeSteelgo] ([Rel_ItemCode_ItemCodeSteelgo], [ItemCodeID], [ItemCodeSteelgoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (2, 1, 2, 1, CAST(0x0000A4FF00000000 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_ItemCode_ItemCodeSteelgo] ([Rel_ItemCode_ItemCodeSteelgo], [ItemCodeID], [ItemCodeSteelgoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1002, 3, 2, 1, CAST(0x0000A50100000000 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_ItemCode_ItemCodeSteelgo] ([Rel_ItemCode_ItemCodeSteelgo], [ItemCodeID], [ItemCodeSteelgoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (2002, 21, 2, 1, CAST(0x0000A50C014C18FE AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_ItemCode_ItemCodeSteelgo] ([Rel_ItemCode_ItemCodeSteelgo], [ItemCodeID], [ItemCodeSteelgoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (2011, 16, 3, 1, CAST(0x0000A50D00DAE250 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_ItemCode_ItemCodeSteelgo] ([Rel_ItemCode_ItemCodeSteelgo], [ItemCodeID], [ItemCodeSteelgoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (2016, 20, 1, 1, CAST(0x0000A50D00E9515F AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_ItemCode_ItemCodeSteelgo] ([Rel_ItemCode_ItemCodeSteelgo], [ItemCodeID], [ItemCodeSteelgoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (2017, 17, 1, 1, CAST(0x0000A50D00ECE466 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_ItemCode_ItemCodeSteelgo] ([Rel_ItemCode_ItemCodeSteelgo], [ItemCodeID], [ItemCodeSteelgoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (2018, 16, 1, 1, CAST(0x0000A50D00F30C0F AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_ItemCode_ItemCodeSteelgo] ([Rel_ItemCode_ItemCodeSteelgo], [ItemCodeID], [ItemCodeSteelgoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (2046, 16, 2, 1, CAST(0x0000A50D014D8ACF AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_ItemCode_ItemCodeSteelgo] ([Rel_ItemCode_ItemCodeSteelgo], [ItemCodeID], [ItemCodeSteelgoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (2047, 16, 4, 1, CAST(0x0000A50D01539B9E AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_ItemCode_ItemCodeSteelgo] ([Rel_ItemCode_ItemCodeSteelgo], [ItemCodeID], [ItemCodeSteelgoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (2048, 17, 4, 1, CAST(0x0000A50D0156012A AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_ItemCode_ItemCodeSteelgo] ([Rel_ItemCode_ItemCodeSteelgo], [ItemCodeID], [ItemCodeSteelgoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (2049, 20, 4, 1, CAST(0x0000A50D017E481D AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_ItemCode_ItemCodeSteelgo] ([Rel_ItemCode_ItemCodeSteelgo], [ItemCodeID], [ItemCodeSteelgoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (2050, 20, 3, 1, CAST(0x0000A50D018B5712 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_ItemCode_ItemCodeSteelgo] ([Rel_ItemCode_ItemCodeSteelgo], [ItemCodeID], [ItemCodeSteelgoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (2051, 32, 4, 1, CAST(0x0000A50E00246128 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_ItemCode_ItemCodeSteelgo] ([Rel_ItemCode_ItemCodeSteelgo], [ItemCodeID], [ItemCodeSteelgoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (2052, 22, 2, 1, CAST(0x0000A50E0027116D AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_ItemCode_ItemCodeSteelgo] ([Rel_ItemCode_ItemCodeSteelgo], [ItemCodeID], [ItemCodeSteelgoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (2053, 22, 4, 1, CAST(0x0000A50E0027D3EE AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_ItemCode_ItemCodeSteelgo] ([Rel_ItemCode_ItemCodeSteelgo], [ItemCodeID], [ItemCodeSteelgoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (2054, 34, 5, 1, CAST(0x0000A50E00BD3E8D AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_ItemCode_ItemCodeSteelgo] ([Rel_ItemCode_ItemCodeSteelgo], [ItemCodeID], [ItemCodeSteelgoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (2055, 33, 5, 1, CAST(0x0000A50E00BD3EBD AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_ItemCode_ItemCodeSteelgo] ([Rel_ItemCode_ItemCodeSteelgo], [ItemCodeID], [ItemCodeSteelgoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (2056, 35, 5, 1, CAST(0x0000A50E00D4470F AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[Sam3_Rel_ItemCode_ItemCodeSteelgo] OFF
SET IDENTITY_INSERT [dbo].[Sam3_Rel_OrdenRecepcion_ItemCode] ON 

INSERT [dbo].[Sam3_Rel_OrdenRecepcion_ItemCode] ([Rel_OrdenRecepcion_ItemCode_ID], [OrdenRecepcionID], [ItemCodeID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1, 1, 1, 1, CAST(0x0000A507010AF280 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_OrdenRecepcion_ItemCode] ([Rel_OrdenRecepcion_ItemCode_ID], [OrdenRecepcionID], [ItemCodeID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (2, 1, 4, 1, CAST(0x0000A507010AF53D AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_OrdenRecepcion_ItemCode] ([Rel_OrdenRecepcion_ItemCode_ID], [OrdenRecepcionID], [ItemCodeID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (3, 1, 3, 1, CAST(0x0000A507010AF60A AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_OrdenRecepcion_ItemCode] ([Rel_OrdenRecepcion_ItemCode_ID], [OrdenRecepcionID], [ItemCodeID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (4, 1, 5, 1, CAST(0x0000A507010AF6C0 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_OrdenRecepcion_ItemCode] ([Rel_OrdenRecepcion_ItemCode_ID], [OrdenRecepcionID], [ItemCodeID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (5, 1, 9, 1, CAST(0x0000A507010AF963 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_OrdenRecepcion_ItemCode] ([Rel_OrdenRecepcion_ItemCode_ID], [OrdenRecepcionID], [ItemCodeID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (6, 1, 10, 1, CAST(0x0000A507010AF963 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_OrdenRecepcion_ItemCode] ([Rel_OrdenRecepcion_ItemCode_ID], [OrdenRecepcionID], [ItemCodeID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (7, 1, 11, 1, CAST(0x0000A507010AF963 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_OrdenRecepcion_ItemCode] ([Rel_OrdenRecepcion_ItemCode_ID], [OrdenRecepcionID], [ItemCodeID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (8, 2, 1, 1, CAST(0x0000A507010C1BF0 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_OrdenRecepcion_ItemCode] ([Rel_OrdenRecepcion_ItemCode_ID], [OrdenRecepcionID], [ItemCodeID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (9, 2, 4, 1, CAST(0x0000A507010C1BF0 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_OrdenRecepcion_ItemCode] ([Rel_OrdenRecepcion_ItemCode_ID], [OrdenRecepcionID], [ItemCodeID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (10, 2, 3, 1, CAST(0x0000A507010C1BF0 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_OrdenRecepcion_ItemCode] ([Rel_OrdenRecepcion_ItemCode_ID], [OrdenRecepcionID], [ItemCodeID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (11, 2, 5, 1, CAST(0x0000A507010C1BF0 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_OrdenRecepcion_ItemCode] ([Rel_OrdenRecepcion_ItemCode_ID], [OrdenRecepcionID], [ItemCodeID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (12, 2, 9, 1, CAST(0x0000A507010C1BF0 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_OrdenRecepcion_ItemCode] ([Rel_OrdenRecepcion_ItemCode_ID], [OrdenRecepcionID], [ItemCodeID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (13, 2, 10, 1, CAST(0x0000A507010C1BF0 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_OrdenRecepcion_ItemCode] ([Rel_OrdenRecepcion_ItemCode_ID], [OrdenRecepcionID], [ItemCodeID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (14, 2, 11, 1, CAST(0x0000A507010C1BF0 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_OrdenRecepcion_ItemCode] ([Rel_OrdenRecepcion_ItemCode_ID], [OrdenRecepcionID], [ItemCodeID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (15, 3, 6, 1, CAST(0x0000A507011CF5D4 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_OrdenRecepcion_ItemCode] ([Rel_OrdenRecepcion_ItemCode_ID], [OrdenRecepcionID], [ItemCodeID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (16, 5, 7, 1, CAST(0x0000A507011E84BB AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_OrdenRecepcion_ItemCode] ([Rel_OrdenRecepcion_ItemCode_ID], [OrdenRecepcionID], [ItemCodeID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (17, 6, 8, 1, CAST(0x0000A507011EDB4D AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[Sam3_Rel_OrdenRecepcion_ItemCode] OFF
INSERT [dbo].[Sam3_Rel_Perfil_Entidad_Pagina] ([PerfilID], [EntidadID], [PaginaID], [PermisoDetalle], [PermisoCreacion], [PermisoEliminacion], [PermisoListado], [PermisoCapturaIncidencia], [PermisoSolucionIncidencia], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 1, 1, 0, 0, 0, 0, 0, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Entidad_Pagina] ([PerfilID], [EntidadID], [PaginaID], [PermisoDetalle], [PermisoCreacion], [PermisoEliminacion], [PermisoListado], [PermisoCapturaIncidencia], [PermisoSolucionIncidencia], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 2, 1, 0, 0, 0, 0, 0, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Entidad_Pagina] ([PerfilID], [EntidadID], [PaginaID], [PermisoDetalle], [PermisoCreacion], [PermisoEliminacion], [PermisoListado], [PermisoCapturaIncidencia], [PermisoSolucionIncidencia], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 2, 2, 0, 0, 0, 0, 0, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Entidad_Pagina] ([PerfilID], [EntidadID], [PaginaID], [PermisoDetalle], [PermisoCreacion], [PermisoEliminacion], [PermisoListado], [PermisoCapturaIncidencia], [PermisoSolucionIncidencia], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 9, 3, 1, 1, 1, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Entidad_Pagina] ([PerfilID], [EntidadID], [PaginaID], [PermisoDetalle], [PermisoCreacion], [PermisoEliminacion], [PermisoListado], [PermisoCapturaIncidencia], [PermisoSolucionIncidencia], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 9, 4, 1, 1, 1, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Entidad_Pagina] ([PerfilID], [EntidadID], [PaginaID], [PermisoDetalle], [PermisoCreacion], [PermisoEliminacion], [PermisoListado], [PermisoCapturaIncidencia], [PermisoSolucionIncidencia], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 10, 4, 1, 1, 0, 0, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Entidad_Pagina] ([PerfilID], [EntidadID], [PaginaID], [PermisoDetalle], [PermisoCreacion], [PermisoEliminacion], [PermisoListado], [PermisoCapturaIncidencia], [PermisoSolucionIncidencia], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 19, 4, 1, 1, 1, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Entidad_Pagina] ([PerfilID], [EntidadID], [PaginaID], [PermisoDetalle], [PermisoCreacion], [PermisoEliminacion], [PermisoListado], [PermisoCapturaIncidencia], [PermisoSolucionIncidencia], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 20, 4, 1, 1, 1, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Entidad_Pagina] ([PerfilID], [EntidadID], [PaginaID], [PermisoDetalle], [PermisoCreacion], [PermisoEliminacion], [PermisoListado], [PermisoCapturaIncidencia], [PermisoSolucionIncidencia], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 21, 4, 1, 1, 1, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Entidad_Pagina] ([PerfilID], [EntidadID], [PaginaID], [PermisoDetalle], [PermisoCreacion], [PermisoEliminacion], [PermisoListado], [PermisoCapturaIncidencia], [PermisoSolucionIncidencia], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2, 9, 3, 0, 0, 0, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Entidad_Pagina] ([PerfilID], [EntidadID], [PaginaID], [PermisoDetalle], [PermisoCreacion], [PermisoEliminacion], [PermisoListado], [PermisoCapturaIncidencia], [PermisoSolucionIncidencia], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2, 1, 1, 0, 0, 0, 1, 0, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Entidad_Pagina] ([PerfilID], [EntidadID], [PaginaID], [PermisoDetalle], [PermisoCreacion], [PermisoEliminacion], [PermisoListado], [PermisoCapturaIncidencia], [PermisoSolucionIncidencia], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2, 2, 1, 0, 0, 0, 0, 0, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Entidad_Pagina] ([PerfilID], [EntidadID], [PaginaID], [PermisoDetalle], [PermisoCreacion], [PermisoEliminacion], [PermisoListado], [PermisoCapturaIncidencia], [PermisoSolucionIncidencia], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2, 2, 2, 0, 0, 0, 0, 0, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Entidad_Pagina] ([PerfilID], [EntidadID], [PaginaID], [PermisoDetalle], [PermisoCreacion], [PermisoEliminacion], [PermisoListado], [PermisoCapturaIncidencia], [PermisoSolucionIncidencia], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2, 9, 4, 0, 0, 0, 0, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Entidad_Pagina] ([PerfilID], [EntidadID], [PaginaID], [PermisoDetalle], [PermisoCreacion], [PermisoEliminacion], [PermisoListado], [PermisoCapturaIncidencia], [PermisoSolucionIncidencia], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2, 10, 4, 1, 1, 1, 1, 0, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Entidad_Pagina] ([PerfilID], [EntidadID], [PaginaID], [PermisoDetalle], [PermisoCreacion], [PermisoEliminacion], [PermisoListado], [PermisoCapturaIncidencia], [PermisoSolucionIncidencia], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 11, 8, 1, 1, 1, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Entidad_Pagina] ([PerfilID], [EntidadID], [PaginaID], [PermisoDetalle], [PermisoCreacion], [PermisoEliminacion], [PermisoListado], [PermisoCapturaIncidencia], [PermisoSolucionIncidencia], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 9, 9, 1, 1, 1, 1, 0, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Entidad_Pagina] ([PerfilID], [EntidadID], [PaginaID], [PermisoDetalle], [PermisoCreacion], [PermisoEliminacion], [PermisoListado], [PermisoCapturaIncidencia], [PermisoSolucionIncidencia], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2, 9, 9, 1, 0, 0, 1, 0, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Entidad_Pagina] ([PerfilID], [EntidadID], [PaginaID], [PermisoDetalle], [PermisoCreacion], [PermisoEliminacion], [PermisoListado], [PermisoCapturaIncidencia], [PermisoSolucionIncidencia], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 14, 6, 1, 1, 1, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Entidad_Pagina] ([PerfilID], [EntidadID], [PaginaID], [PermisoDetalle], [PermisoCreacion], [PermisoEliminacion], [PermisoListado], [PermisoCapturaIncidencia], [PermisoSolucionIncidencia], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2, 14, 6, 1, 1, 1, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Entidad_Pagina] ([PerfilID], [EntidadID], [PaginaID], [PermisoDetalle], [PermisoCreacion], [PermisoEliminacion], [PermisoListado], [PermisoCapturaIncidencia], [PermisoSolucionIncidencia], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 14, 10, 1, 1, 1, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Entidad_Pagina] ([PerfilID], [EntidadID], [PaginaID], [PermisoDetalle], [PermisoCreacion], [PermisoEliminacion], [PermisoListado], [PermisoCapturaIncidencia], [PermisoSolucionIncidencia], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2, 14, 10, 1, 1, 1, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Entidad_Pagina] ([PerfilID], [EntidadID], [PaginaID], [PermisoDetalle], [PermisoCreacion], [PermisoEliminacion], [PermisoListado], [PermisoCapturaIncidencia], [PermisoSolucionIncidencia], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 14, 7, 1, 1, 1, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Entidad_Pagina] ([PerfilID], [EntidadID], [PaginaID], [PermisoDetalle], [PermisoCreacion], [PermisoEliminacion], [PermisoListado], [PermisoCapturaIncidencia], [PermisoSolucionIncidencia], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 19, 7, 1, 1, 1, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Entidad_Pagina] ([PerfilID], [EntidadID], [PaginaID], [PermisoDetalle], [PermisoCreacion], [PermisoEliminacion], [PermisoListado], [PermisoCapturaIncidencia], [PermisoSolucionIncidencia], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 18, 7, 1, 1, 1, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Entidad_Pagina] ([PerfilID], [EntidadID], [PaginaID], [PermisoDetalle], [PermisoCreacion], [PermisoEliminacion], [PermisoListado], [PermisoCapturaIncidencia], [PermisoSolucionIncidencia], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 12, 11, 1, 1, 1, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Entidad_Pagina] ([PerfilID], [EntidadID], [PaginaID], [PermisoDetalle], [PermisoCreacion], [PermisoEliminacion], [PermisoListado], [PermisoCapturaIncidencia], [PermisoSolucionIncidencia], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 24, 12, 1, 1, 1, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Entidad_Pagina] ([PerfilID], [EntidadID], [PaginaID], [PermisoDetalle], [PermisoCreacion], [PermisoEliminacion], [PermisoListado], [PermisoCapturaIncidencia], [PermisoSolucionIncidencia], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 25, 12, 1, 1, 1, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Entidad_Pagina] ([PerfilID], [EntidadID], [PaginaID], [PermisoDetalle], [PermisoCreacion], [PermisoEliminacion], [PermisoListado], [PermisoCapturaIncidencia], [PermisoSolucionIncidencia], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 26, 12, 1, 1, 1, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Entidad_Pagina] ([PerfilID], [EntidadID], [PaginaID], [PermisoDetalle], [PermisoCreacion], [PermisoEliminacion], [PermisoListado], [PermisoCapturaIncidencia], [PermisoSolucionIncidencia], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 27, 12, 1, 1, 1, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Entidad_Pagina] ([PerfilID], [EntidadID], [PaginaID], [PermisoDetalle], [PermisoCreacion], [PermisoEliminacion], [PermisoListado], [PermisoCapturaIncidencia], [PermisoSolucionIncidencia], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 28, 13, 1, 1, 1, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Entidad_Pagina] ([PerfilID], [EntidadID], [PaginaID], [PermisoDetalle], [PermisoCreacion], [PermisoEliminacion], [PermisoListado], [PermisoCapturaIncidencia], [PermisoSolucionIncidencia], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 28, 14, 1, 1, 1, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Entidad_Pagina] ([PerfilID], [EntidadID], [PaginaID], [PermisoDetalle], [PermisoCreacion], [PermisoEliminacion], [PermisoListado], [PermisoCapturaIncidencia], [PermisoSolucionIncidencia], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 28, 15, 1, 1, 1, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Entidad_Pagina] ([PerfilID], [EntidadID], [PaginaID], [PermisoDetalle], [PermisoCreacion], [PermisoEliminacion], [PermisoListado], [PermisoCapturaIncidencia], [PermisoSolucionIncidencia], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 29, 16, 1, 1, 1, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Entidad_Pagina] ([PerfilID], [EntidadID], [PaginaID], [PermisoDetalle], [PermisoCreacion], [PermisoEliminacion], [PermisoListado], [PermisoCapturaIncidencia], [PermisoSolucionIncidencia], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 29, 17, 1, 1, 1, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Entidad_Pagina] ([PerfilID], [EntidadID], [PaginaID], [PermisoDetalle], [PermisoCreacion], [PermisoEliminacion], [PermisoListado], [PermisoCapturaIncidencia], [PermisoSolucionIncidencia], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 29, 18, 1, 1, 1, 1, 1, 1, 1, NULL, NULL)
SET IDENTITY_INSERT [dbo].[Sam3_Rel_Perfil_MenuContextual] ON 

INSERT [dbo].[Sam3_Rel_Perfil_MenuContextual] ([Perfil_MenuID], [PerfilID], [MenuContextualID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_MenuContextual] ([Perfil_MenuID], [PerfilID], [MenuContextualID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2, 1, 2, 1, NULL, NULL)
SET IDENTITY_INSERT [dbo].[Sam3_Rel_Perfil_MenuContextual] OFF
SET IDENTITY_INSERT [dbo].[Sam3_Rel_Perfil_MenuGeneral] ON 

INSERT [dbo].[Sam3_Rel_Perfil_MenuGeneral] ([Perfil_MenuID], [PerfilID], [MenuGeneralID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_MenuGeneral] ([Perfil_MenuID], [PerfilID], [MenuGeneralID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2, 1, 2, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_MenuGeneral] ([Perfil_MenuID], [PerfilID], [MenuGeneralID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3, 1, 5, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_MenuGeneral] ([Perfil_MenuID], [PerfilID], [MenuGeneralID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (4, 1, 6, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_MenuGeneral] ([Perfil_MenuID], [PerfilID], [MenuGeneralID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (5, 1, 7, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_MenuGeneral] ([Perfil_MenuID], [PerfilID], [MenuGeneralID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (6, 1, 8, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_MenuGeneral] ([Perfil_MenuID], [PerfilID], [MenuGeneralID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (10, 1, 10, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_MenuGeneral] ([Perfil_MenuID], [PerfilID], [MenuGeneralID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (11, 1, 11, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_MenuGeneral] ([Perfil_MenuID], [PerfilID], [MenuGeneralID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (13, 1, 13, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_MenuGeneral] ([Perfil_MenuID], [PerfilID], [MenuGeneralID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (14, 1, 14, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_MenuGeneral] ([Perfil_MenuID], [PerfilID], [MenuGeneralID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (16, 1, 16, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_MenuGeneral] ([Perfil_MenuID], [PerfilID], [MenuGeneralID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (17, 1, 17, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_MenuGeneral] ([Perfil_MenuID], [PerfilID], [MenuGeneralID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (18, 1, 18, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_MenuGeneral] ([Perfil_MenuID], [PerfilID], [MenuGeneralID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (19, 1, 19, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_MenuGeneral] ([Perfil_MenuID], [PerfilID], [MenuGeneralID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (20, 1, 20, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_MenuGeneral] ([Perfil_MenuID], [PerfilID], [MenuGeneralID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (21, 1, 21, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_MenuGeneral] ([Perfil_MenuID], [PerfilID], [MenuGeneralID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (22, 2, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_MenuGeneral] ([Perfil_MenuID], [PerfilID], [MenuGeneralID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (23, 2, 2, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_MenuGeneral] ([Perfil_MenuID], [PerfilID], [MenuGeneralID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (24, 2, 5, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_MenuGeneral] ([Perfil_MenuID], [PerfilID], [MenuGeneralID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (25, 2, 6, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_MenuGeneral] ([Perfil_MenuID], [PerfilID], [MenuGeneralID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (26, 2, 7, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_MenuGeneral] ([Perfil_MenuID], [PerfilID], [MenuGeneralID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (27, 2, 8, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_MenuGeneral] ([Perfil_MenuID], [PerfilID], [MenuGeneralID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (29, 2, 13, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_MenuGeneral] ([Perfil_MenuID], [PerfilID], [MenuGeneralID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (30, 2, 14, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_MenuGeneral] ([Perfil_MenuID], [PerfilID], [MenuGeneralID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (31, 2, 18, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_MenuGeneral] ([Perfil_MenuID], [PerfilID], [MenuGeneralID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (32, 2, 19, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_MenuGeneral] ([Perfil_MenuID], [PerfilID], [MenuGeneralID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (33, 3, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_MenuGeneral] ([Perfil_MenuID], [PerfilID], [MenuGeneralID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (34, 3, 2, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_MenuGeneral] ([Perfil_MenuID], [PerfilID], [MenuGeneralID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (35, 3, 5, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_MenuGeneral] ([Perfil_MenuID], [PerfilID], [MenuGeneralID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (36, 3, 6, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_MenuGeneral] ([Perfil_MenuID], [PerfilID], [MenuGeneralID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (37, 3, 7, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_MenuGeneral] ([Perfil_MenuID], [PerfilID], [MenuGeneralID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (38, 3, 8, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_MenuGeneral] ([Perfil_MenuID], [PerfilID], [MenuGeneralID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (39, 3, 10, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_MenuGeneral] ([Perfil_MenuID], [PerfilID], [MenuGeneralID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (40, 3, 13, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_MenuGeneral] ([Perfil_MenuID], [PerfilID], [MenuGeneralID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (41, 3, 14, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_MenuGeneral] ([Perfil_MenuID], [PerfilID], [MenuGeneralID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (42, 3, 16, 1, NULL, NULL)
SET IDENTITY_INSERT [dbo].[Sam3_Rel_Perfil_MenuGeneral] OFF
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 1, 1, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 2, 1, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 5, 1, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 6, 1, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 7, 1, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 8, 1, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 9, 3, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 9, 4, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 10, 3, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 10, 4, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 14, 3, 1, 1, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 14, 4, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 15, 3, 1, 1, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 15, 4, 1, 1, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 16, 3, 1, 1, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 16, 4, 1, 1, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 17, 3, 1, 1, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 17, 4, 1, 1, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 19, 4, 1, 1, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 20, 4, 1, 1, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 20, 8, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 21, 8, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 22, 11, 1, 1, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 24, 7, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 25, 7, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 26, 7, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 27, 7, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 28, 7, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 29, 4, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 29, 7, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 30, 4, 1, 1, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 30, 7, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 31, 4, 1, 1, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 31, 7, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 32, 4, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 33, 4, 1, 1, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 34, 4, 1, 1, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 35, 4, 1, 1, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 36, 4, 1, 1, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 37, 4, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 38, 4, 1, 1, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 39, 4, 1, 1, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 41, 4, 1, 1, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 42, 4, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 43, 4, 1, 1, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 44, 4, 1, 1, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 45, 4, 1, 1, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 46, 4, 1, 1, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 47, 4, 1, 1, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 47, 7, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 48, 4, 1, 1, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 49, 4, 1, 1, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 50, 4, 1, 1, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 51, 4, 1, 1, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 52, 4, 1, 1, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 53, 4, 1, 1, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 54, 4, 1, 1, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 55, 4, 1, 1, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 56, 4, 1, 1, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 57, 8, 1, 1, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 58, 4, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 59, 7, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 60, 7, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 61, 7, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 62, 7, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 63, 7, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 64, 7, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 65, 7, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 66, 7, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 67, 7, 1, 1, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 68, 7, 1, 1, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 69, 7, 1, 1, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 70, 11, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 71, 11, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 72, 11, 1, 1, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 73, 11, 1, 1, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 74, 12, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 75, 12, 1, 1, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 76, 12, 1, 1, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 77, 12, 1, 1, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 78, 12, 1, 1, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 79, 12, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 80, 12, 1, 1, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 81, 12, 1, 1, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 82, 12, 1, 1, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 83, 12, 1, 1, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 84, 12, 1, 1, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 85, 12, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 86, 12, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 87, 12, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 88, 12, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 89, 12, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 90, 12, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 91, 12, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 92, 12, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 93, 12, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 94, 12, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 95, 12, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 96, 12, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 97, 12, 1, 1, 1, 1, NULL, NULL)
GO
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 98, 12, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 99, 12, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 100, 12, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 101, 12, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 102, 12, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 103, 12, 1, 1, 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 104, 12, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2, 1, 1, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2, 2, 1, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2, 5, 1, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2, 6, 1, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2, 7, 1, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2, 8, 1, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2, 9, 3, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2, 9, 4, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2, 10, 3, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2, 10, 4, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2, 14, 3, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2, 14, 4, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2, 15, 3, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2, 15, 4, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2, 16, 3, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2, 16, 4, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2, 17, 3, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2, 17, 4, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2, 19, 4, 0, 0, 0, 0, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2, 20, 4, 0, 0, 0, 0, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2, 41, 4, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2, 42, 4, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2, 43, 4, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2, 44, 4, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2, 45, 4, 1, 1, 1, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] ([PerfilID], [PropiedadID], [PaginaID], [PermisoEdicion], [PermisoLectura], [Requerido], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2, 46, 4, 1, 1, 1, 1, NULL, NULL)
SET IDENTITY_INSERT [dbo].[Sam3_Rel_PermisoAduana_Documento] ON 

INSERT [dbo].[Sam3_Rel_PermisoAduana_Documento] ([PermisoAduanaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [ContentType], [TipoArchivoID], [Rel_Permiso_Documento_ID]) VALUES (18, 0, N'cuadrofiltroOdt.png', N'.png', 1, 1, CAST(0x0000A4C600BFE0D3 AS DateTime), N'489d082d-e219-4243-9704-07384d2c1997', N'http://localhost:60960/uploads/489d082d-e219-4243-9704-07384d2c1997_cuadrofiltroOdt.png', N'image/png', 6, 1)
INSERT [dbo].[Sam3_Rel_PermisoAduana_Documento] ([PermisoAduanaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [ContentType], [TipoArchivoID], [Rel_Permiso_Documento_ID]) VALUES (21, 0, N'mensajeExito.png', N'.png', 1, 1, CAST(0x0000A4C600D6994F AS DateTime), N'cade4c8e-cfaa-45c4-ac75-cf6ab33c243b', N'http://localhost:60960/uploads/cade4c8e-cfaa-45c4-ac75-cf6ab33c243b_mensajeExito.png', N'image/png', 6, 2)
INSERT [dbo].[Sam3_Rel_PermisoAduana_Documento] ([PermisoAduanaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [ContentType], [TipoArchivoID], [Rel_Permiso_Documento_ID]) VALUES (19, 0, N'B1teceDIYAEnhtU.jpg', N'.jpg', 1, 1, CAST(0x0000A4C600F44172 AS DateTime), N'014c70c7-0b53-4b51-9cb8-404fec29209c', N'http://localhost:60960/uploads/014c70c7-0b53-4b51-9cb8-404fec29209c_B1teceDIYAEnhtU.jpg', N'image/jpeg', 6, 3)
INSERT [dbo].[Sam3_Rel_PermisoAduana_Documento] ([PermisoAduanaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [ContentType], [TipoArchivoID], [Rel_Permiso_Documento_ID]) VALUES (20, 0, N'B1teceDIYAEnhtU.jpg', N'.jpg', 1, 1, CAST(0x0000A4C600F4B3D0 AS DateTime), N'053fabb8-290a-447e-acab-b1ea79479a11', N'http://localhost:60960/uploads/053fabb8-290a-447e-acab-b1ea79479a11_B1teceDIYAEnhtU.jpg', N'image/jpeg', 6, 4)
INSERT [dbo].[Sam3_Rel_PermisoAduana_Documento] ([PermisoAduanaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [ContentType], [TipoArchivoID], [Rel_Permiso_Documento_ID]) VALUES (1005, 0, N'053fabb8-290a-447e-acab-b1ea79479a11_B1teceDIYAEnhtU.jpg', N'.jpg', 1, 1, CAST(0x0000A4CA00C3441B AS DateTime), N'24ad011f-8428-4f51-b1b3-72c3ed389bd5', N'http://localhost:60960/uploads/24ad011f-8428-4f51-b1b3-72c3ed389bd5_053fabb8-290a-447e-acab-b1ea79479a11_B1teceDIYAEnhtU.jpg', N'image/jpeg', 6, 5)
INSERT [dbo].[Sam3_Rel_PermisoAduana_Documento] ([PermisoAduanaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [ContentType], [TipoArchivoID], [Rel_Permiso_Documento_ID]) VALUES (1004, 0, N'053fabb8-290a-447e-acab-b1ea79479a11_B1teceDIYAEnhtU.jpg', N'.jpg', 1, 1, CAST(0x0000A4CA00C395D8 AS DateTime), N'582ce0db-f3bd-4d4b-b029-83c8f16c75e5', N'http://localhost:60960/uploads/582ce0db-f3bd-4d4b-b029-83c8f16c75e5_053fabb8-290a-447e-acab-b1ea79479a11_B1teceDIYAEnhtU.jpg', N'image/jpeg', 6, 6)
INSERT [dbo].[Sam3_Rel_PermisoAduana_Documento] ([PermisoAduanaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [ContentType], [TipoArchivoID], [Rel_Permiso_Documento_ID]) VALUES (12, 0, N'053fabb8-290a-447e-acab-b1ea79479a11_B1teceDIYAEnhtU.jpg', N'.jpg', 1, 1, CAST(0x0000A4CA00C40859 AS DateTime), N'ee50db71-1389-49dd-b220-57796af6c039', N'http://localhost:60960/uploads/ee50db71-1389-49dd-b220-57796af6c039_053fabb8-290a-447e-acab-b1ea79479a11_B1teceDIYAEnhtU.jpg', N'image/jpeg', 6, 7)
INSERT [dbo].[Sam3_Rel_PermisoAduana_Documento] ([PermisoAduanaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [ContentType], [TipoArchivoID], [Rel_Permiso_Documento_ID]) VALUES (1008, 0, N'B1teceDIYAEnhtU.jpg', N'.jpg', 1, 1, CAST(0x0000A4CA00E3A450 AS DateTime), N'ae971340-6c27-4c6c-9a43-f2c32333e7db', N'http://localhost:60960/uploads/ae971340-6c27-4c6c-9a43-f2c32333e7db_B1teceDIYAEnhtU.jpg', N'image/jpeg', 6, 8)
INSERT [dbo].[Sam3_Rel_PermisoAduana_Documento] ([PermisoAduanaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [ContentType], [TipoArchivoID], [Rel_Permiso_Documento_ID]) VALUES (1007, 0, N'B1teceDIYAEnhtU.jpg', N'.jpg', 1, 1, CAST(0x0000A4CA00EBCB8A AS DateTime), N'6cb9013f-7a0d-450a-8f0a-e86fb38637b0', N'http://localhost:60960/uploads/6cb9013f-7a0d-450a-8f0a-e86fb38637b0_B1teceDIYAEnhtU.jpg', N'image/jpeg', 6, 9)
INSERT [dbo].[Sam3_Rel_PermisoAduana_Documento] ([PermisoAduanaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [ContentType], [TipoArchivoID], [Rel_Permiso_Documento_ID]) VALUES (16, 0, N'B1teceDIYAEnhtU.jpg', N'.jpg', 1, 1, CAST(0x0000A4CA00EDA67F AS DateTime), N'a4e03062-74de-402f-86ec-1b8f369bfe21', N'http://localhost:60960/uploads/a4e03062-74de-402f-86ec-1b8f369bfe21_B1teceDIYAEnhtU.jpg', N'image/jpeg', 6, 10)
INSERT [dbo].[Sam3_Rel_PermisoAduana_Documento] ([PermisoAduanaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [ContentType], [TipoArchivoID], [Rel_Permiso_Documento_ID]) VALUES (1014, 0, N'B1teceDIYAEnhtU.jpg', N'.jpg', 1, 1, CAST(0x0000A4CD00C16E3C AS DateTime), N'b4205119-fedd-4c19-ba95-d478559acdbc', N'http://localhost:60960/uploads/b4205119-fedd-4c19-ba95-d478559acdbc_B1teceDIYAEnhtU.jpg', N'image/jpeg', 6, 11)
INSERT [dbo].[Sam3_Rel_PermisoAduana_Documento] ([PermisoAduanaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [ContentType], [TipoArchivoID], [Rel_Permiso_Documento_ID]) VALUES (1015, 0, N'B1teceDIYAEnhtU.jpg', N'.jpg', 1, 1, CAST(0x0000A4CD00E89E0D AS DateTime), N'90173977-b593-4dcf-9df5-0720e9a3fbd0', N'http://localhost:60960/uploads/90173977-b593-4dcf-9df5-0720e9a3fbd0_B1teceDIYAEnhtU.jpg', N'image/jpeg', 6, 12)
INSERT [dbo].[Sam3_Rel_PermisoAduana_Documento] ([PermisoAduanaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [ContentType], [TipoArchivoID], [Rel_Permiso_Documento_ID]) VALUES (1016, 0, N'B1teceDIYAEnhtU.jpg', N'.jpg', 1, 1, CAST(0x0000A4CE00B3C69E AS DateTime), N'51cdfa54-255a-4161-9c96-c970d77754d0', N'http://localhost:60960/uploads/51cdfa54-255a-4161-9c96-c970d77754d0_B1teceDIYAEnhtU.jpg', N'image/jpeg', 6, 13)
INSERT [dbo].[Sam3_Rel_PermisoAduana_Documento] ([PermisoAduanaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [ContentType], [TipoArchivoID], [Rel_Permiso_Documento_ID]) VALUES (1018, 0, N'B1teceDIYAEnhtU.jpg', N'.jpg', 1, 1, CAST(0x0000A4CE00F782B9 AS DateTime), N'bdc27e20-4a6d-4bc4-98eb-67af004bb865', N'http://localhost:60960/uploads/bdc27e20-4a6d-4bc4-98eb-67af004bb865_B1teceDIYAEnhtU.jpg', N'image/jpeg', 6, 14)
INSERT [dbo].[Sam3_Rel_PermisoAduana_Documento] ([PermisoAduanaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [ContentType], [TipoArchivoID], [Rel_Permiso_Documento_ID]) VALUES (1010, 0, N'B1teceDIYAEnhtU.jpg', N'.jpg', 1, 1, CAST(0x0000A4CF008DB49B AS DateTime), N'8f95d2f1-10b8-433a-b9c8-fa8d944e8e2b', N'http://localhost:60960/uploads/8f95d2f1-10b8-433a-b9c8-fa8d944e8e2b_B1teceDIYAEnhtU.jpg', N'image/jpeg', 6, 15)
INSERT [dbo].[Sam3_Rel_PermisoAduana_Documento] ([PermisoAduanaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [ContentType], [TipoArchivoID], [Rel_Permiso_Documento_ID]) VALUES (1019, 0, N'B1teceDIYAEnhtU.jpg', N'.jpg', 1, 1, CAST(0x0000A4CF00AF58B0 AS DateTime), N'903494d3-2051-4170-8b41-5d0b949fe7ca', N'http://localhost:60960/uploads/903494d3-2051-4170-8b41-5d0b949fe7ca_B1teceDIYAEnhtU.jpg', N'image/jpeg', 6, 16)
INSERT [dbo].[Sam3_Rel_PermisoAduana_Documento] ([PermisoAduanaID], [DocumentoID], [Nombre], [Extencion], [Activo], [UsuarioModificacion], [FechaModificacion], [DocGuid], [Url], [ContentType], [TipoArchivoID], [Rel_Permiso_Documento_ID]) VALUES (1020, 0, N'B1teceDIYAEnhtU.jpg', N'.jpg', 1, 1, CAST(0x0000A4CF00B122E1 AS DateTime), N'96ed638e-13a5-43da-a7aa-738c4414a1b3', N'http://localhost:60960/uploads/96ed638e-13a5-43da-a7aa-738c4414a1b3_B1teceDIYAEnhtU.jpg', N'image/jpeg', 6, 17)
SET IDENTITY_INSERT [dbo].[Sam3_Rel_PermisoAduana_Documento] OFF
INSERT [dbo].[Sam3_Rel_Usuario_Proyecto] ([ProyectoID], [UsuarioID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 1, 1, 1, CAST(0x0000A4C300E8C990 AS DateTime))
INSERT [dbo].[Sam3_Rel_Usuario_Proyecto] ([ProyectoID], [UsuarioID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 5, 1, NULL, NULL)
INSERT [dbo].[Sam3_Rel_Usuario_Proyecto] ([ProyectoID], [UsuarioID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2, 1, 1, 1, CAST(0x0000A4C600F166F1 AS DateTime))
INSERT [dbo].[Sam3_Rel_Usuario_Proyecto] ([ProyectoID], [UsuarioID], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2, 5, 1, NULL, NULL)
SET IDENTITY_INSERT [dbo].[Sam3_Rel_Vehiculo_Chofer] ON 

INSERT [dbo].[Sam3_Rel_Vehiculo_Chofer] ([Rel_Vehiculo_Chofer_ID], [VehiculoID], [ChoferID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1, 1, 1, 1, CAST(0x0000A4BF00E14DF6 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_Vehiculo_Chofer] ([Rel_Vehiculo_Chofer_ID], [VehiculoID], [ChoferID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (2, 2, 2, 1, CAST(0x0000A4BF00E14DF6 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_Vehiculo_Chofer] ([Rel_Vehiculo_Chofer_ID], [VehiculoID], [ChoferID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (3, 3, 2, 1, CAST(0x0000A4BF00E14DF6 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_Vehiculo_Chofer] ([Rel_Vehiculo_Chofer_ID], [VehiculoID], [ChoferID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (4, 4, 2, 1, CAST(0x0000A4BF00E14DF6 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_Vehiculo_Chofer] ([Rel_Vehiculo_Chofer_ID], [VehiculoID], [ChoferID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (5, 5, 3, 1, CAST(0x0000A4BF00E14DF6 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_Vehiculo_Chofer] ([Rel_Vehiculo_Chofer_ID], [VehiculoID], [ChoferID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1002, 1013, 2, 1, CAST(0x0000A4C900959933 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_Vehiculo_Chofer] ([Rel_Vehiculo_Chofer_ID], [VehiculoID], [ChoferID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1004, 6, 2, 1, CAST(0x0000A45400000000 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_Vehiculo_Chofer] ([Rel_Vehiculo_Chofer_ID], [VehiculoID], [ChoferID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1005, 1020, 2, 1, CAST(0x0000A4CD00833BCA AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[Sam3_Rel_Vehiculo_Chofer] OFF
SET IDENTITY_INSERT [dbo].[Sam3_Rel_Vehiculo_Transportista] ON 

INSERT [dbo].[Sam3_Rel_Vehiculo_Transportista] ([Rel_Vehiculo_Transportista_ID], [VehiculoID], [TransportistaID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1, 1, 1, 1, CAST(0x0000A4BF00E14DF8 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_Vehiculo_Transportista] ([Rel_Vehiculo_Transportista_ID], [VehiculoID], [TransportistaID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (2, 2, 1, 1, CAST(0x0000A4BF00E14DF8 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_Vehiculo_Transportista] ([Rel_Vehiculo_Transportista_ID], [VehiculoID], [TransportistaID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (3, 3, 1, 1, CAST(0x0000A4BF00E14DF8 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_Vehiculo_Transportista] ([Rel_Vehiculo_Transportista_ID], [VehiculoID], [TransportistaID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (4, 4, 1, 1, CAST(0x0000A4BF00E14DF6 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_Vehiculo_Transportista] ([Rel_Vehiculo_Transportista_ID], [VehiculoID], [TransportistaID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (5, 5, 1, 1, CAST(0x0000A4BF00E14DF6 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_Vehiculo_Transportista] ([Rel_Vehiculo_Transportista_ID], [VehiculoID], [TransportistaID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1002, 1013, 1002, 1, CAST(0x0000A4C900959B13 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_Vehiculo_Transportista] ([Rel_Vehiculo_Transportista_ID], [VehiculoID], [TransportistaID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1003, 6, 4, 1, CAST(0x0000A45400000000 AS DateTime), 1)
INSERT [dbo].[Sam3_Rel_Vehiculo_Transportista] ([Rel_Vehiculo_Transportista_ID], [VehiculoID], [TransportistaID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1004, 1020, 1004, 1, CAST(0x0000A4CD00833BCB AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[Sam3_Rel_Vehiculo_Transportista] OFF
SET IDENTITY_INSERT [dbo].[Sam3_TipoArchivo] ON 

INSERT [dbo].[Sam3_TipoArchivo] ([TipoArchivoID], [Nombre], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1, N'Pedimento', 1, CAST(0x0000A4BF00E14DF2 AS DateTime), 1)
INSERT [dbo].[Sam3_TipoArchivo] ([TipoArchivoID], [Nombre], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (2, N'Factura', 1, CAST(0x0000A4BF00E14DF2 AS DateTime), 1)
INSERT [dbo].[Sam3_TipoArchivo] ([TipoArchivoID], [Nombre], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (3, N'Remisión', 1, CAST(0x0000A4BF00E14DF2 AS DateTime), 1)
INSERT [dbo].[Sam3_TipoArchivo] ([TipoArchivoID], [Nombre], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (4, N'Circulación', 1, CAST(0x0000A4BF00E14DF2 AS DateTime), 1)
INSERT [dbo].[Sam3_TipoArchivo] ([TipoArchivoID], [Nombre], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (5, N'Archivo Default', 1, CAST(0x0000A4C20093E7F8 AS DateTime), 1)
INSERT [dbo].[Sam3_TipoArchivo] ([TipoArchivoID], [Nombre], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (6, N'Permiso Aduana', 1, CAST(0x0000A4C200EF2A40 AS DateTime), 1)
INSERT [dbo].[Sam3_TipoArchivo] ([TipoArchivoID], [Nombre], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (7, N'Pase Salida', 1, CAST(0x0000A4C200EF32B0 AS DateTime), 1)
INSERT [dbo].[Sam3_TipoArchivo] ([TipoArchivoID], [Nombre], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1006, N'Incidencias firmadas', 1, CAST(0x0000A4F100D09D31 AS DateTime), 1)
INSERT [dbo].[Sam3_TipoArchivo] ([TipoArchivoID], [Nombre], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1007, N'Packing List Firmado', 1, CAST(0x0000A4F100D09D34 AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[Sam3_TipoArchivo] OFF
SET IDENTITY_INSERT [dbo].[Sam3_TipoAviso] ON 

INSERT [dbo].[Sam3_TipoAviso] ([TipoAvisoID], [Nombre], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1, N'Material', 1, CAST(0x0000A4BF00E14DF2 AS DateTime), 1)
INSERT [dbo].[Sam3_TipoAviso] ([TipoAvisoID], [Nombre], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (2, N'Visitas', 1, CAST(0x0000A4BF00E14DF2 AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[Sam3_TipoAviso] OFF
SET IDENTITY_INSERT [dbo].[Sam3_TipoCorte] ON 

INSERT [dbo].[Sam3_TipoCorte] ([TipoCorteID], [Codigo], [Nombre], [Descripcion], [VerificadoPorCalidad], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, N'TC1', N'Tipo Corte 1', N'tipoCorte 1', 1, 1, 1, CAST(0x0000A50200000000 AS DateTime))
SET IDENTITY_INSERT [dbo].[Sam3_TipoCorte] OFF
SET IDENTITY_INSERT [dbo].[Sam3_TipoMaterial] ON 

INSERT [dbo].[Sam3_TipoMaterial] ([TipoMaterialID], [Nombre], [NombreIngles], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, N'Tubo', N'Pipe', 1, NULL, NULL)
INSERT [dbo].[Sam3_TipoMaterial] ([TipoMaterialID], [Nombre], [NombreIngles], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2, N'Accesorio', N'Accesory', 1, NULL, NULL)
SET IDENTITY_INSERT [dbo].[Sam3_TipoMaterial] OFF
SET IDENTITY_INSERT [dbo].[Sam3_TipoMovimiento] ON 

INSERT [dbo].[Sam3_TipoMovimiento] ([TipoMovimientoID], [EsEntrada], [EsTransferenciaProcesos], [ApareceEnSaldos], [DisponibleMovimientosUI], [Nombre], [NombreIngles], [Descripcion], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 1, 0, 1, 0, N'Recepción', N'Reception', NULL, 1, 1, CAST(0x0000A50000DE02E7 AS DateTime))
INSERT [dbo].[Sam3_TipoMovimiento] ([TipoMovimientoID], [EsEntrada], [EsTransferenciaProcesos], [ApareceEnSaldos], [DisponibleMovimientosUI], [Nombre], [NombreIngles], [Descripcion], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2, 0, 0, 1, 0, N'Despacho Accesorio', N'Accesory Dispatch', NULL, 1, 1, CAST(0x0000A50000DE02E7 AS DateTime))
INSERT [dbo].[Sam3_TipoMovimiento] ([TipoMovimientoID], [EsEntrada], [EsTransferenciaProcesos], [ApareceEnSaldos], [DisponibleMovimientosUI], [Nombre], [NombreIngles], [Descripcion], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3, 0, 0, 1, 1, N'Devolución', N'Material Return', NULL, 1, 1, CAST(0x0000A50000DE02E7 AS DateTime))
INSERT [dbo].[Sam3_TipoMovimiento] ([TipoMovimientoID], [EsEntrada], [EsTransferenciaProcesos], [ApareceEnSaldos], [DisponibleMovimientosUI], [Nombre], [NombreIngles], [Descripcion], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (4, 0, 0, 1, 1, N'Merma', N'Scrap', NULL, 1, 1, CAST(0x0000A50000DE02E7 AS DateTime))
INSERT [dbo].[Sam3_TipoMovimiento] ([TipoMovimientoID], [EsEntrada], [EsTransferenciaProcesos], [ApareceEnSaldos], [DisponibleMovimientosUI], [Nombre], [NombreIngles], [Descripcion], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (5, 0, 0, 1, 1, N'Salida Pintura', N'Release to painting', NULL, 1, 1, CAST(0x0000A50000DE02E7 AS DateTime))
INSERT [dbo].[Sam3_TipoMovimiento] ([TipoMovimientoID], [EsEntrada], [EsTransferenciaProcesos], [ApareceEnSaldos], [DisponibleMovimientosUI], [Nombre], [NombreIngles], [Descripcion], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (6, 1, 0, 1, 1, N'Entrada Pintura', N'Painting entry', NULL, 1, 1, CAST(0x0000A50000DE02E7 AS DateTime))
INSERT [dbo].[Sam3_TipoMovimiento] ([TipoMovimientoID], [EsEntrada], [EsTransferenciaProcesos], [ApareceEnSaldos], [DisponibleMovimientosUI], [Nombre], [NombreIngles], [Descripcion], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (7, 0, 0, 1, 0, N'Merma Corte', N'Cut Scrap', NULL, 1, 1, CAST(0x0000A50000DE02E7 AS DateTime))
INSERT [dbo].[Sam3_TipoMovimiento] ([TipoMovimientoID], [EsEntrada], [EsTransferenciaProcesos], [ApareceEnSaldos], [DisponibleMovimientosUI], [Nombre], [NombreIngles], [Descripcion], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (8, 0, 0, 1, 1, N'Salida Otros Procesos', N'Release to other processes', NULL, 1, 1, CAST(0x0000A50000DE02E7 AS DateTime))
INSERT [dbo].[Sam3_TipoMovimiento] ([TipoMovimientoID], [EsEntrada], [EsTransferenciaProcesos], [ApareceEnSaldos], [DisponibleMovimientosUI], [Nombre], [NombreIngles], [Descripcion], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (9, 1, 0, 1, 1, N'Entrada Otros Procesos', N'Other processes entry', NULL, 1, 1, CAST(0x0000A50000DE02E7 AS DateTime))
INSERT [dbo].[Sam3_TipoMovimiento] ([TipoMovimientoID], [EsEntrada], [EsTransferenciaProcesos], [ApareceEnSaldos], [DisponibleMovimientosUI], [Nombre], [NombreIngles], [Descripcion], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (10, 0, 1, 1, 0, N'Salida por Segmentación', N'Segmentation Release', NULL, 1, 1, CAST(0x0000A50000DE02E7 AS DateTime))
INSERT [dbo].[Sam3_TipoMovimiento] ([TipoMovimientoID], [EsEntrada], [EsTransferenciaProcesos], [ApareceEnSaldos], [DisponibleMovimientosUI], [Nombre], [NombreIngles], [Descripcion], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (11, 1, 1, 1, 0, N'Entrada por Segmentación', N'Segmentation Entry', NULL, 1, 1, CAST(0x0000A50000DE02E7 AS DateTime))
INSERT [dbo].[Sam3_TipoMovimiento] ([TipoMovimientoID], [EsEntrada], [EsTransferenciaProcesos], [ApareceEnSaldos], [DisponibleMovimientosUI], [Nombre], [NombreIngles], [Descripcion], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (12, 0, 1, 0, 0, N'Despacho a Corte', N'Dispath to cut', NULL, 1, 1, CAST(0x0000A50000DE02E7 AS DateTime))
INSERT [dbo].[Sam3_TipoMovimiento] ([TipoMovimientoID], [EsEntrada], [EsTransferenciaProcesos], [ApareceEnSaldos], [DisponibleMovimientosUI], [Nombre], [NombreIngles], [Descripcion], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (13, 1, 1, 0, 0, N'Despacho a Corte Cancelado', N'Dispatch to Cut Canceled', NULL, 1, 1, CAST(0x0000A50000DE02E7 AS DateTime))
INSERT [dbo].[Sam3_TipoMovimiento] ([TipoMovimientoID], [EsEntrada], [EsTransferenciaProcesos], [ApareceEnSaldos], [DisponibleMovimientosUI], [Nombre], [NombreIngles], [Descripcion], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (14, 1, 1, 0, 0, N'Preparación para Corte', N'Cut Preparation', NULL, 1, 1, CAST(0x0000A50000DE02E7 AS DateTime))
INSERT [dbo].[Sam3_TipoMovimiento] ([TipoMovimientoID], [EsEntrada], [EsTransferenciaProcesos], [ApareceEnSaldos], [DisponibleMovimientosUI], [Nombre], [NombreIngles], [Descripcion], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (15, 0, 0, 1, 0, N'Corte', N'Cut', NULL, 1, 1, CAST(0x0000A50000DE02E7 AS DateTime))
INSERT [dbo].[Sam3_TipoMovimiento] ([TipoMovimientoID], [EsEntrada], [EsTransferenciaProcesos], [ApareceEnSaldos], [DisponibleMovimientosUI], [Nombre], [NombreIngles], [Descripcion], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (16, 0, 0, 0, 0, N'CambioItemCode', N'ChangeOfItemCode', N'Uso Interno', 1, 1, CAST(0x0000A50000DE02E7 AS DateTime))
INSERT [dbo].[Sam3_TipoMovimiento] ([TipoMovimientoID], [EsEntrada], [EsTransferenciaProcesos], [ApareceEnSaldos], [DisponibleMovimientosUI], [Nombre], [NombreIngles], [Descripcion], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (17, 0, 0, 1, 1, N'Embarque de Material', N'Shipping Material', NULL, 1, 1, CAST(0x0000A50000DE02E7 AS DateTime))
INSERT [dbo].[Sam3_TipoMovimiento] ([TipoMovimientoID], [EsEntrada], [EsTransferenciaProcesos], [ApareceEnSaldos], [DisponibleMovimientosUI], [Nombre], [NombreIngles], [Descripcion], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (18, 0, 0, 1, 1, N'Embarque de Material Dañados', N'Shipment of Damaged Materials', NULL, 1, 1, CAST(0x0000A50000DE02E7 AS DateTime))
SET IDENTITY_INSERT [dbo].[Sam3_TipoMovimiento] OFF
SET IDENTITY_INSERT [dbo].[Sam3_TipoNotificacion] ON 

INSERT [dbo].[Sam3_TipoNotificacion] ([TipoNotificacionID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, N'Aviso de Entrada', 1, NULL, NULL)
INSERT [dbo].[Sam3_TipoNotificacion] ([TipoNotificacionID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (2, N'Aviso de Llegada', 1, NULL, NULL)
INSERT [dbo].[Sam3_TipoNotificacion] ([TipoNotificacionID], [Nombre], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (3, N'Pase de Salida', 1, NULL, NULL)
SET IDENTITY_INSERT [dbo].[Sam3_TipoNotificacion] OFF
SET IDENTITY_INSERT [dbo].[Sam3_TipoUso] ON 

INSERT [dbo].[Sam3_TipoUso] ([TipoUsoID], [Nombre], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1, N'Tipo Uso Default', 1, NULL, NULL)
INSERT [dbo].[Sam3_TipoUso] ([TipoUsoID], [Nombre], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (2, N'Tipo Uso 2', 1, NULL, NULL)
INSERT [dbo].[Sam3_TipoUso] ([TipoUsoID], [Nombre], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (3, N'Tipo Uso 3', 1, NULL, NULL)
SET IDENTITY_INSERT [dbo].[Sam3_TipoUso] OFF
SET IDENTITY_INSERT [dbo].[Sam3_TipoVehiculo] ON 

INSERT [dbo].[Sam3_TipoVehiculo] ([TipoVehiculoID], [Nombre], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1, N'Tracto', 1, CAST(0x0000A4BF00E14DEF AS DateTime), 1)
INSERT [dbo].[Sam3_TipoVehiculo] ([TipoVehiculoID], [Nombre], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (2, N'Plana', 1, CAST(0x0000A4BF00E14DEF AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[Sam3_TipoVehiculo] OFF
SET IDENTITY_INSERT [dbo].[Sam3_Transportista] ON 

INSERT [dbo].[Sam3_Transportista] ([TransportistaID], [ContactoID], [Nombre], [Descripcion], [Direccion], [Telefono], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 1, N'Transportiste Default', N'Para proposito de integridad referencial', N'Vasconcelos No. 124, Tampiquito, San Pedro Garza Garcia, Nuevo Leon, México. CP.66240', N'81922554', 1, 1, CAST(0x0000A4B2009E461B AS DateTime))
INSERT [dbo].[Sam3_Transportista] ([TransportistaID], [ContactoID], [Nombre], [Descripcion], [Direccion], [Telefono], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (4, 1, N'Transportista 1', N'Transportista 1', N'Transportista #104', N'811607653', 0, 1, CAST(0x0000A4BA00EA6578 AS DateTime))
INSERT [dbo].[Sam3_Transportista] ([TransportistaID], [ContactoID], [Nombre], [Descripcion], [Direccion], [Telefono], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1002, 1, N'Prueba transportista', N'Prueba transportista', N'Linaza 518', N'88838850', 1, 1, CAST(0x0000A4C600920663 AS DateTime))
INSERT [dbo].[Sam3_Transportista] ([TransportistaID], [ContactoID], [Nombre], [Descripcion], [Direccion], [Telefono], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1003, 1, N'Aceros FME', N'Aceros FME', N'15 DE SEPTIEMBRE, AV. CONSTITUCION', N'8116007651', 1, 1, CAST(0x0000A4C9009AA1AE AS DateTime))
INSERT [dbo].[Sam3_Transportista] ([TransportistaID], [ContactoID], [Nombre], [Descripcion], [Direccion], [Telefono], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1004, 1, N'AFIRME', N'AFIRME', N'AFIRME', N'81123456', 1, 1, CAST(0x0000A4C90157FCA1 AS DateTime))
INSERT [dbo].[Sam3_Transportista] ([TransportistaID], [ContactoID], [Nombre], [Descripcion], [Direccion], [Telefono], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1005, 1, N'Pedro', N'Prueba', N'Paseo De La Esperanza No 102. Colonial Rincon De San Antonio', N'+524421866985', 1, 1, CAST(0x0000A4CD0082BFA7 AS DateTime))
INSERT [dbo].[Sam3_Transportista] ([TransportistaID], [ContactoID], [Nombre], [Descripcion], [Direccion], [Telefono], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1006, 1, N'Transportista Fem', N'Transportista Fem', N'Transportista Fem', N'81145615', 1, 1, CAST(0x0000A4CD0085FBE0 AS DateTime))
INSERT [dbo].[Sam3_Transportista] ([TransportistaID], [ContactoID], [Nombre], [Descripcion], [Direccion], [Telefono], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1007, 1, N'Transportista Coca', N'Transportista Coca', N'Transportista Coca', N'12345678', 1, 1, CAST(0x0000A4CD00874FC4 AS DateTime))
SET IDENTITY_INSERT [dbo].[Sam3_Transportista] OFF
SET IDENTITY_INSERT [dbo].[Sam3_Usuario] ON 

INSERT [dbo].[Sam3_Usuario] ([UsuarioID], [PerfilID], [NombreUsuario], [ContrasenaHash], [Nombre], [ApellidoPaterno], [ApellidoMaterno], [BloqueadoPorAdministracion], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 1, N'samAdmin', N'samadmin', N'Usuario', N'Pruebas', N'Sam3', 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Usuario] ([UsuarioID], [PerfilID], [NombreUsuario], [ContrasenaHash], [Nombre], [ApellidoPaterno], [ApellidoMaterno], [BloqueadoPorAdministracion], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (5, 2, N'samListados', N'samlistados', N'Usuario', N'Listados', N'Sam3', 0, 1, NULL, NULL)
INSERT [dbo].[Sam3_Usuario] ([UsuarioID], [PerfilID], [NombreUsuario], [ContrasenaHash], [Nombre], [ApellidoPaterno], [ApellidoMaterno], [BloqueadoPorAdministracion], [Activo], [UsuarioModificacion], [FechaModificacion]) VALUES (6, 3, N'samCreacion', N'samCreacion', N'Usuario', N'Creacion', N'Sam3', 0, 1, NULL, NULL)
SET IDENTITY_INSERT [dbo].[Sam3_Usuario] OFF
SET IDENTITY_INSERT [dbo].[Sam3_UsuariosNotificaciones] ON 

INSERT [dbo].[Sam3_UsuariosNotificaciones] ([UsuariosNotificacionesID], [TipoNotificacionID], [UsuarioID], [Email], [Plantilla], [UsuarioModificacion], [FechaModificacion]) VALUES (1, 1, 1, N'daniela.zertuche@definityfirst.com', N'test.txt', NULL, NULL)
INSERT [dbo].[Sam3_UsuariosNotificaciones] ([UsuariosNotificacionesID], [TipoNotificacionID], [UsuarioID], [Email], [Plantilla], [UsuarioModificacion], [FechaModificacion]) VALUES (3, 2, 5, N'daniela.zertuche@definityfirst.com', N'test2.txt', NULL, NULL)
SET IDENTITY_INSERT [dbo].[Sam3_UsuariosNotificaciones] OFF
SET IDENTITY_INSERT [dbo].[Sam3_Vehiculo] ON 

INSERT [dbo].[Sam3_Vehiculo] ([VehiculoID], [TipoVehiculoID], [Placas], [TarjetaCirculacion], [PolizaSeguro], [Unidad], [Modelo], [TractoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1, 1, N'XL-45-452', N'0000252363', N'P0014LK', NULL, NULL, NULL, 1, CAST(0x0000A4BF00E14DF0 AS DateTime), 1)
INSERT [dbo].[Sam3_Vehiculo] ([VehiculoID], [TipoVehiculoID], [Placas], [TarjetaCirculacion], [PolizaSeguro], [Unidad], [Modelo], [TractoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (2, 1, N'YBR-12-50', N'123456789', N'123456789', NULL, NULL, NULL, 1, CAST(0x0000A4BF00E14DF0 AS DateTime), 1)
INSERT [dbo].[Sam3_Vehiculo] ([VehiculoID], [TipoVehiculoID], [Placas], [TarjetaCirculacion], [PolizaSeguro], [Unidad], [Modelo], [TractoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (3, 1, N'AAAAA', N'BBBBBB', N'CCCCCCC', NULL, NULL, NULL, 1, CAST(0x0000A4BF00E14DF0 AS DateTime), 1)
INSERT [dbo].[Sam3_Vehiculo] ([VehiculoID], [TipoVehiculoID], [Placas], [TarjetaCirculacion], [PolizaSeguro], [Unidad], [Modelo], [TractoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (4, 2, N'FG-52-635', NULL, NULL, N'123', N'345', 1, 1, CAST(0x0000A4BF00E14DF1 AS DateTime), 1)
INSERT [dbo].[Sam3_Vehiculo] ([VehiculoID], [TipoVehiculoID], [Placas], [TarjetaCirculacion], [PolizaSeguro], [Unidad], [Modelo], [TractoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (5, 2, N'LDF-25-30', NULL, NULL, N'123', N'345', 1, 1, CAST(0x0000A4BF00E14DF1 AS DateTime), 1)
INSERT [dbo].[Sam3_Vehiculo] ([VehiculoID], [TipoVehiculoID], [Placas], [TarjetaCirculacion], [PolizaSeguro], [Unidad], [Modelo], [TractoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (6, 2, N'YXZ-11-22', NULL, NULL, N'123', N'345', 2, 1, CAST(0x0000A4BF00E14DF1 AS DateTime), 1)
INSERT [dbo].[Sam3_Vehiculo] ([VehiculoID], [TipoVehiculoID], [Placas], [TarjetaCirculacion], [PolizaSeguro], [Unidad], [Modelo], [TractoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (7, 2, N'aa', NULL, NULL, NULL, NULL, 2, 1, CAST(0x0000A4BF00E14DF1 AS DateTime), 1)
INSERT [dbo].[Sam3_Vehiculo] ([VehiculoID], [TipoVehiculoID], [Placas], [TarjetaCirculacion], [PolizaSeguro], [Unidad], [Modelo], [TractoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1013, 1, N'xxxx', N'xxxx', N'xxxx', NULL, NULL, NULL, 1, CAST(0x0000A4C9009595EA AS DateTime), 1)
INSERT [dbo].[Sam3_Vehiculo] ([VehiculoID], [TipoVehiculoID], [Placas], [TarjetaCirculacion], [PolizaSeguro], [Unidad], [Modelo], [TractoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1018, 2, N'zzzz', NULL, NULL, N'zzzz', N'zzzz', -1, 1, CAST(0x0000A4C90099B30C AS DateTime), 1)
INSERT [dbo].[Sam3_Vehiculo] ([VehiculoID], [TipoVehiculoID], [Placas], [TarjetaCirculacion], [PolizaSeguro], [Unidad], [Modelo], [TractoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1019, 1, NULL, NULL, NULL, NULL, NULL, NULL, 1, CAST(0x0000A4C900D43451 AS DateTime), 1)
INSERT [dbo].[Sam3_Vehiculo] ([VehiculoID], [TipoVehiculoID], [Placas], [TarjetaCirculacion], [PolizaSeguro], [Unidad], [Modelo], [TractoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1020, 1, N'reto', N'reti', N'reto', NULL, NULL, NULL, 1, CAST(0x0000A4CD00833BBE AS DateTime), 1)
INSERT [dbo].[Sam3_Vehiculo] ([VehiculoID], [TipoVehiculoID], [Placas], [TarjetaCirculacion], [PolizaSeguro], [Unidad], [Modelo], [TractoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1021, 2, N'adsd', NULL, NULL, N'asdasd', N'asdasd', -1, 1, CAST(0x0000A4CD00834BCC AS DateTime), 1)
INSERT [dbo].[Sam3_Vehiculo] ([VehiculoID], [TipoVehiculoID], [Placas], [TarjetaCirculacion], [PolizaSeguro], [Unidad], [Modelo], [TractoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1022, 1, NULL, NULL, NULL, NULL, NULL, NULL, 1, CAST(0x0000A4CF00840E31 AS DateTime), 1)
INSERT [dbo].[Sam3_Vehiculo] ([VehiculoID], [TipoVehiculoID], [Placas], [TarjetaCirculacion], [PolizaSeguro], [Unidad], [Modelo], [TractoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1023, 1, NULL, NULL, NULL, NULL, NULL, NULL, 1, CAST(0x0000A4CF0085CBC9 AS DateTime), 1)
INSERT [dbo].[Sam3_Vehiculo] ([VehiculoID], [TipoVehiculoID], [Placas], [TarjetaCirculacion], [PolizaSeguro], [Unidad], [Modelo], [TractoID], [Activo], [FechaModificacion], [UsuarioModificacion]) VALUES (1024, 1, NULL, NULL, NULL, NULL, NULL, NULL, 1, CAST(0x0000A4CF0085F0F0 AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[Sam3_Vehiculo] OFF
SET ANSI_PADDING ON

GO
/****** Object:  Index [UQ_Acero_Nomenclatura]    Script Date: 9/9/2015 3:53:59 PM ******/
ALTER TABLE [dbo].[Sam3_Acero] ADD  CONSTRAINT [UQ_Acero_Nomenclatura] UNIQUE NONCLUSTERED 
(
	[Nomenclatura] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [IX_Colada_Compuesto]    Script Date: 9/9/2015 3:53:59 PM ******/
ALTER TABLE [dbo].[Sam3_Colada] ADD  CONSTRAINT [IX_Colada_Compuesto] UNIQUE NONCLUSTERED 
(
	[FabricanteID] ASC,
	[NumeroCertificado] ASC,
	[NumeroColada] ASC,
	[ProyectoID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [UQ_Diametro_Valor]    Script Date: 9/9/2015 3:53:59 PM ******/
ALTER TABLE [dbo].[Sam3_Diametro] ADD  CONSTRAINT [UQ_Diametro_Valor] UNIQUE NONCLUSTERED 
(
	[Valor] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [UQ_FamiliaAcero_Nombre]    Script Date: 9/9/2015 3:53:59 PM ******/
ALTER TABLE [dbo].[Sam3_FamiliaAcero] ADD  CONSTRAINT [UQ_FamiliaAcero_Nombre] UNIQUE NONCLUSTERED 
(
	[Nombre] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [UQ_FamiliaMaterial_Nombre]    Script Date: 9/9/2015 3:53:59 PM ******/
ALTER TABLE [dbo].[Sam3_FamiliaMaterial] ADD  CONSTRAINT [UQ_FamiliaMaterial_Nombre] UNIQUE NONCLUSTERED 
(
	[Nombre] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [UQ_ItemCode_ProyectoID_Codigo]    Script Date: 9/9/2015 3:53:59 PM ******/
ALTER TABLE [dbo].[Sam3_ItemCode] ADD  CONSTRAINT [UQ_ItemCode_ProyectoID_Codigo] UNIQUE NONCLUSTERED 
(
	[ProyectoID] ASC,
	[Codigo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [UQ_MaterialSpool_SpoolID_Etiqueta]    Script Date: 9/9/2015 3:53:59 PM ******/
ALTER TABLE [dbo].[Sam3_MaterialSpool] ADD  CONSTRAINT [UQ_MaterialSpool_SpoolID_Etiqueta] UNIQUE NONCLUSTERED 
(
	[SpoolID] ASC,
	[Etiqueta] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [UQ_Sam3_NumeroUnico_Prefijo_Consecutivo]    Script Date: 9/9/2015 3:53:59 PM ******/
ALTER TABLE [dbo].[Sam3_NumeroUnico] ADD  CONSTRAINT [UQ_Sam3_NumeroUnico_Prefijo_Consecutivo] UNIQUE NONCLUSTERED 
(
	[ProyectoID] ASC,
	[Prefijo] ASC,
	[Consecutivo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [UQ_OrdenTrabajoSpool_SpoolID]    Script Date: 9/9/2015 3:53:59 PM ******/
ALTER TABLE [dbo].[Sam3_OrdenTrabajoSpool] ADD  CONSTRAINT [UQ_OrdenTrabajoSpool_SpoolID] UNIQUE NONCLUSTERED 
(
	[SpoolID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [UQ_Spool_Nombre_Proyecto]    Script Date: 9/9/2015 3:53:59 PM ******/
ALTER TABLE [dbo].[Sam3_Spool] ADD  CONSTRAINT [UQ_Spool_Nombre_Proyecto] UNIQUE NONCLUSTERED 
(
	[ProyectoID] ASC,
	[Nombre] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [UQ_Codigo]    Script Date: 9/9/2015 3:53:59 PM ******/
ALTER TABLE [dbo].[Sam3_TipoCorte] ADD  CONSTRAINT [UQ_Codigo] UNIQUE NONCLUSTERED 
(
	[Codigo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Sam3_Acero] ADD  CONSTRAINT [DF_Acero_VerificadoPorCalidad]  DEFAULT ((1)) FOR [VerificadoPorCalidad]
GO
ALTER TABLE [dbo].[Sam3_Corte] ADD  CONSTRAINT [DF_Corte_Cancelado]  DEFAULT ((0)) FOR [Cancelado]
GO
ALTER TABLE [dbo].[Sam3_CorteDetalle] ADD  CONSTRAINT [DF_CorteDetalle_Cancelado]  DEFAULT ((0)) FOR [Cancelado]
GO
ALTER TABLE [dbo].[Sam3_CorteDetalle] ADD  CONSTRAINT [DF_CorteDetalle_EsAjuste]  DEFAULT ((0)) FOR [EsAjuste]
GO
ALTER TABLE [dbo].[Sam3_Diametro] ADD  CONSTRAINT [DF_Diametro_VerificadoPorCalidad]  DEFAULT ((0)) FOR [VerificadoPorCalidad]
GO
ALTER TABLE [dbo].[Sam3_FamiliaAcero] ADD  CONSTRAINT [DF_FamiliaAcero_VerificadoPorCalidad]  DEFAULT ((1)) FOR [VerificadoPorCalidad]
GO
ALTER TABLE [dbo].[Sam3_OrdenAlmacenaje] ADD  DEFAULT ((0)) FOR [Activo]
GO
ALTER TABLE [dbo].[Sam3_OrdenRecepcion] ADD  DEFAULT ((0)) FOR [Activo]
GO
ALTER TABLE [dbo].[Sam3_OrdenTrabajo] ADD  DEFAULT ((0)) FOR [EsAsignado]
GO
ALTER TABLE [dbo].[Sam3_OrdenTrabajo] ADD  CONSTRAINT [DF_OrdenTrabajo_VersionOrden]  DEFAULT ((0)) FOR [VersionOrden]
GO
ALTER TABLE [dbo].[Sam3_OrdenTrabajoSpool] ADD  DEFAULT ((0)) FOR [EsAsignado]
GO
ALTER TABLE [dbo].[Sam3_Patio] ADD  DEFAULT ((0)) FOR [RequierePermisoAduana]
GO
ALTER TABLE [dbo].[Sam3_PermisoAduana] ADD  CONSTRAINT [DF_Sam3_PermisoAduana_PermisoAutorizado]  DEFAULT ((0)) FOR [PermisoAutorizado]
GO
ALTER TABLE [dbo].[Sam3_PermisoAduana] ADD  CONSTRAINT [DF_Sam3_PermisoAduana_PermisoTramite]  DEFAULT ((0)) FOR [PermisoTramite]
GO
ALTER TABLE [dbo].[Sam3_Proyecto] ADD  CONSTRAINT [DF_Proyecto_Activo]  DEFAULT ((1)) FOR [Activo]
GO
ALTER TABLE [dbo].[Sam3_ProyectoConfiguracion] ADD  DEFAULT ((1)) FOR [Activo]
GO
ALTER TABLE [dbo].[Sam3_ProyectoConfiguracion] ADD  DEFAULT ((3)) FOR [DigitosOrdeAlmacenaje]
GO
ALTER TABLE [dbo].[Sam3_ProyectoConfiguracion] ADD  DEFAULT ((3)) FOR [DigitosFolioDescarga]
GO
ALTER TABLE [dbo].[Sam3_ProyectoConfiguracion] ADD  DEFAULT ((3)) FOR [DigitosFolioAvisollegada]
GO
ALTER TABLE [dbo].[Sam3_ProyectoConfiguracion] ADD  DEFAULT ((3)) FOR [GigitosFolioPaseSalida]
GO
ALTER TABLE [dbo].[Sam3_ProyectoConfiguracion] ADD  DEFAULT ((3)) FOR [DigitosFolioOrdenRecepcion]
GO
ALTER TABLE [dbo].[Sam3_ProyectoConfiguracion] ADD  DEFAULT ((3)) FOR [DigitosFolioCuantifiacion]
GO
ALTER TABLE [dbo].[Sam3_ProyectoConfiguracion] ADD  DEFAULT ((3)) FOR [DigitosFolioOrdenAlmacenaje]
GO
ALTER TABLE [dbo].[Sam3_ProyectoConfiguracion] ADD  DEFAULT ((3)) FOR [DigitosFolioPermisoAduana]
GO
ALTER TABLE [dbo].[Sam3_ProyectoConsecutivo] ADD  DEFAULT ((0)) FOR [ConsecutivoFolioAvisollegada]
GO
ALTER TABLE [dbo].[Sam3_ProyectoConsecutivo] ADD  DEFAULT ((0)) FOR [ConsecutivoFolioEntradaMateiral]
GO
ALTER TABLE [dbo].[Sam3_ProyectoConsecutivo] ADD  DEFAULT ((0)) FOR [ConsecutivoFolioDescargaMaterial]
GO
ALTER TABLE [dbo].[Sam3_ProyectoConsecutivo] ADD  DEFAULT ((0)) FOR [ConsecutivoPaseSalida]
GO
ALTER TABLE [dbo].[Sam3_ProyectoConsecutivo] ADD  DEFAULT ((0)) FOR [ConsecutivoPermisoAduana]
GO
ALTER TABLE [dbo].[Sam3_ProyectoConsecutivo] ADD  DEFAULT ((0)) FOR [ConsucutivoFolioPackingList]
GO
ALTER TABLE [dbo].[Sam3_ProyectoConsecutivo] ADD  DEFAULT ((0)) FOR [ConsecutivoODT]
GO
ALTER TABLE [dbo].[Sam3_ProyectoConsecutivo] ADD  DEFAULT ((0)) FOR [ConsecutivoNumerounico]
GO
ALTER TABLE [dbo].[Sam3_ProyectoConsecutivo] ADD  DEFAULT ((1)) FOR [Activo]
GO
ALTER TABLE [dbo].[Sam3_ProyectoConsecutivo] ADD  DEFAULT ((0)) FOR [ConsecutivoOrdeRecepcion]
GO
ALTER TABLE [dbo].[Sam3_ProyectoConsecutivo] ADD  DEFAULT ((0)) FOR [ConsecutivoOrdenAlmacenaje]
GO
ALTER TABLE [dbo].[Sam3_Rel_Bulto_ItemCode] ADD  DEFAULT ((0)) FOR [TieneNumerosUnicos]
GO
ALTER TABLE [dbo].[Sam3_Rel_FolioAvisoEntrada_OrdenRecepcion] ADD  DEFAULT ((0)) FOR [Activo]
GO
ALTER TABLE [dbo].[Sam3_Rel_FolioCuantificacion_ItemCode] ADD  DEFAULT ((0)) FOR [TieneNumerosUnicos]
GO
ALTER TABLE [dbo].[Sam3_Rel_Incidencia_NumeroUnico] ADD  DEFAULT ((0)) FOR [Activo]
GO
ALTER TABLE [dbo].[Sam3_Rel_ItemCode_ItemCodeSteelgo] ADD  DEFAULT ((0)) FOR [Activo]
GO
ALTER TABLE [dbo].[Sam3_Rel_OrdenAlmacenaje_NumeroUnico] ADD  DEFAULT ((0)) FOR [Activo]
GO
ALTER TABLE [dbo].[Sam3_Rel_OrdenRecepcion_ItemCode] ADD  DEFAULT ((0)) FOR [Activo]
GO
ALTER TABLE [dbo].[Sam3_Spool] ADD  CONSTRAINT [DF_Spool_PendienteDocumental]  DEFAULT ((0)) FOR [PendienteDocumental]
GO
ALTER TABLE [dbo].[Sam3_Spool] ADD  CONSTRAINT [DF_DiametroMayor]  DEFAULT ((0)) FOR [DiametroMayor]
GO
ALTER TABLE [dbo].[Sam3_TipoCorte] ADD  CONSTRAINT [DF_TipoCorte_VerificadoPorCalidad]  DEFAULT ((1)) FOR [VerificadoPorCalidad]
GO
ALTER TABLE [dbo].[Sam3_TipoMovimiento] ADD  CONSTRAINT [DF_TipoMovimiento_EsTransferenciaProcesos]  DEFAULT ((0)) FOR [EsTransferenciaProcesos]
GO
ALTER TABLE [dbo].[Sam3_TipoMovimiento] ADD  CONSTRAINT [DF_TipoMovimiento_ApareceEnSaldos]  DEFAULT ((0)) FOR [ApareceEnSaldos]
GO
ALTER TABLE [dbo].[Sam3_TipoMovimiento] ADD  CONSTRAINT [DF_TipoMovimiento_DisponibleMovimientosUI]  DEFAULT ((0)) FOR [DisponibleMovimientosUI]
GO
ALTER TABLE [dbo].[Sam3_Acero]  WITH CHECK ADD  CONSTRAINT [FK_Acero_FamiliaAcero] FOREIGN KEY([FamiliaAceroID])
REFERENCES [dbo].[Sam3_FamiliaAcero] ([FamiliaAceroID])
GO
ALTER TABLE [dbo].[Sam3_Acero] CHECK CONSTRAINT [FK_Acero_FamiliaAcero]
GO
ALTER TABLE [dbo].[Sam3_Bulto]  WITH CHECK ADD FOREIGN KEY([FolioCuantificacionID])
REFERENCES [dbo].[Sam3_FolioCuantificacion] ([FolioCuantificacionID])
GO
ALTER TABLE [dbo].[Sam3_Chofer]  WITH CHECK ADD FOREIGN KEY([TransportistaID])
REFERENCES [dbo].[Sam3_Transportista] ([TransportistaID])
GO
ALTER TABLE [dbo].[Sam3_Colada]  WITH CHECK ADD  CONSTRAINT [FK_Colada_Acero] FOREIGN KEY([AceroID])
REFERENCES [dbo].[Sam3_Acero] ([AceroID])
GO
ALTER TABLE [dbo].[Sam3_Colada] CHECK CONSTRAINT [FK_Colada_Acero]
GO
ALTER TABLE [dbo].[Sam3_Colada]  WITH CHECK ADD  CONSTRAINT [FK_Colada_Fabricante] FOREIGN KEY([FabricanteID])
REFERENCES [dbo].[Sam3_Fabricante] ([FabricanteID])
GO
ALTER TABLE [dbo].[Sam3_Colada] CHECK CONSTRAINT [FK_Colada_Fabricante]
GO
ALTER TABLE [dbo].[Sam3_Colada]  WITH CHECK ADD  CONSTRAINT [FK_Colada_Proyecto] FOREIGN KEY([ProyectoID])
REFERENCES [dbo].[Sam3_Proyecto] ([ProyectoID])
GO
ALTER TABLE [dbo].[Sam3_Colada] CHECK CONSTRAINT [FK_Colada_Proyecto]
GO
ALTER TABLE [dbo].[Sam3_Corte]  WITH CHECK ADD  CONSTRAINT [FK_Corte_NumeroUnicoCorte] FOREIGN KEY([NumeroUnicoCorteID])
REFERENCES [dbo].[Sam3_NumeroUnicoCorte] ([NumeroUnicoCorteID])
GO
ALTER TABLE [dbo].[Sam3_Corte] CHECK CONSTRAINT [FK_Corte_NumeroUnicoCorte]
GO
ALTER TABLE [dbo].[Sam3_Corte]  WITH CHECK ADD  CONSTRAINT [FK_Corte_NumeroUnicoMovimiento_Merma] FOREIGN KEY([MermaMovimientoID])
REFERENCES [dbo].[Sam3_NumeroUnicoMovimiento] ([NumeroUnicoMovimientoID])
GO
ALTER TABLE [dbo].[Sam3_Corte] CHECK CONSTRAINT [FK_Corte_NumeroUnicoMovimiento_Merma]
GO
ALTER TABLE [dbo].[Sam3_Corte]  WITH CHECK ADD  CONSTRAINT [FK_Corte_NumeroUnicoMovimiento_Preparacion] FOREIGN KEY([PreparacionCorteMovimientoID])
REFERENCES [dbo].[Sam3_NumeroUnicoMovimiento] ([NumeroUnicoMovimientoID])
GO
ALTER TABLE [dbo].[Sam3_Corte] CHECK CONSTRAINT [FK_Corte_NumeroUnicoMovimiento_Preparacion]
GO
ALTER TABLE [dbo].[Sam3_Corte]  WITH CHECK ADD  CONSTRAINT [FK_Corte_Proyecto] FOREIGN KEY([ProyectoID])
REFERENCES [dbo].[Sam3_Proyecto] ([ProyectoID])
GO
ALTER TABLE [dbo].[Sam3_Corte] CHECK CONSTRAINT [FK_Corte_Proyecto]
GO
ALTER TABLE [dbo].[Sam3_CorteDetalle]  WITH CHECK ADD  CONSTRAINT [FK_CorteDetalle_Corte] FOREIGN KEY([CorteID])
REFERENCES [dbo].[Sam3_Corte] ([CorteID])
GO
ALTER TABLE [dbo].[Sam3_CorteDetalle] CHECK CONSTRAINT [FK_CorteDetalle_Corte]
GO
ALTER TABLE [dbo].[Sam3_CorteDetalle]  WITH CHECK ADD  CONSTRAINT [FK_CorteDetalle_Maquina] FOREIGN KEY([MaquinaID])
REFERENCES [dbo].[Sam3_Maquina] ([MaquinaID])
GO
ALTER TABLE [dbo].[Sam3_CorteDetalle] CHECK CONSTRAINT [FK_CorteDetalle_Maquina]
GO
ALTER TABLE [dbo].[Sam3_CorteDetalle]  WITH CHECK ADD  CONSTRAINT [FK_CorteDetalle_MaterialSpool] FOREIGN KEY([MaterialSpoolID])
REFERENCES [dbo].[Sam3_MaterialSpool] ([MaterialSpoolID])
GO
ALTER TABLE [dbo].[Sam3_CorteDetalle] CHECK CONSTRAINT [FK_CorteDetalle_MaterialSpool]
GO
ALTER TABLE [dbo].[Sam3_CorteDetalle]  WITH CHECK ADD  CONSTRAINT [FK_CorteDetalle_NumeroUnicoMovimiento] FOREIGN KEY([SalidaInventarioID])
REFERENCES [dbo].[Sam3_NumeroUnicoMovimiento] ([NumeroUnicoMovimientoID])
GO
ALTER TABLE [dbo].[Sam3_CorteDetalle] CHECK CONSTRAINT [FK_CorteDetalle_NumeroUnicoMovimiento]
GO
ALTER TABLE [dbo].[Sam3_CorteDetalle]  WITH CHECK ADD  CONSTRAINT [FK_CorteDetalle_OrdenTrabajoSpool] FOREIGN KEY([OrdenTrabajoSpoolID])
REFERENCES [dbo].[Sam3_OrdenTrabajoSpool] ([OrdenTrabajoSpoolID])
GO
ALTER TABLE [dbo].[Sam3_CorteDetalle] CHECK CONSTRAINT [FK_CorteDetalle_OrdenTrabajoSpool]
GO
ALTER TABLE [dbo].[Sam3_Fabricante]  WITH CHECK ADD  CONSTRAINT [FK_Fabricante_Contacto] FOREIGN KEY([ContactoID])
REFERENCES [dbo].[Sam3_Contacto] ([ContactoID])
GO
ALTER TABLE [dbo].[Sam3_Fabricante] CHECK CONSTRAINT [FK_Fabricante_Contacto]
GO
ALTER TABLE [dbo].[Sam3_FamiliaAcero]  WITH CHECK ADD  CONSTRAINT [FK_FamiliaAcero_FamiliaMaterial] FOREIGN KEY([FamiliaMaterialID])
REFERENCES [dbo].[Sam3_FamiliaMaterial] ([FamiliaMaterialID])
GO
ALTER TABLE [dbo].[Sam3_FamiliaAcero] CHECK CONSTRAINT [FK_FamiliaAcero_FamiliaMaterial]
GO
ALTER TABLE [dbo].[Sam3_FolioAvisoEntrada]  WITH CHECK ADD FOREIGN KEY([ClienteID])
REFERENCES [dbo].[Sam3_Cliente] ([ClienteID])
GO
ALTER TABLE [dbo].[Sam3_FolioAvisoEntrada]  WITH CHECK ADD FOREIGN KEY([PatioID])
REFERENCES [dbo].[Sam3_Patio] ([PatioID])
GO
ALTER TABLE [dbo].[Sam3_FolioAvisoEntrada]  WITH CHECK ADD FOREIGN KEY([ProveedorID])
REFERENCES [dbo].[Sam3_Proveedor] ([ProveedorID])
GO
ALTER TABLE [dbo].[Sam3_FolioAvisoEntrada]  WITH CHECK ADD  CONSTRAINT [FK_FolioLlegada_FolioAvisoLlegada] FOREIGN KEY([FolioAvisoLlegadaID])
REFERENCES [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID])
GO
ALTER TABLE [dbo].[Sam3_FolioAvisoEntrada] CHECK CONSTRAINT [FK_FolioLlegada_FolioAvisoLlegada]
GO
ALTER TABLE [dbo].[Sam3_FolioAvisoLlegada]  WITH CHECK ADD FOREIGN KEY([ChoferID])
REFERENCES [dbo].[Sam3_Chofer] ([ChoferID])
GO
ALTER TABLE [dbo].[Sam3_FolioAvisoLlegada]  WITH CHECK ADD FOREIGN KEY([PatioID])
REFERENCES [dbo].[Sam3_Patio] ([PatioID])
GO
ALTER TABLE [dbo].[Sam3_FolioAvisoLlegada]  WITH CHECK ADD FOREIGN KEY([TipoAvisoID])
REFERENCES [dbo].[Sam3_TipoAviso] ([TipoAvisoID])
GO
ALTER TABLE [dbo].[Sam3_FolioAvisoLlegada]  WITH CHECK ADD FOREIGN KEY([TransportistaID])
REFERENCES [dbo].[Sam3_Transportista] ([TransportistaID])
GO
ALTER TABLE [dbo].[Sam3_FolioAvisoLlegada]  WITH CHECK ADD FOREIGN KEY([VehiculoID])
REFERENCES [dbo].[Sam3_Vehiculo] ([VehiculoID])
GO
ALTER TABLE [dbo].[Sam3_FolioCuantificacion]  WITH CHECK ADD FOREIGN KEY([FolioAvisoEntradaID])
REFERENCES [dbo].[Sam3_FolioAvisoEntrada] ([FolioAvisoEntradaID])
GO
ALTER TABLE [dbo].[Sam3_FolioCuantificacion]  WITH CHECK ADD FOREIGN KEY([ProyectoID])
REFERENCES [dbo].[Sam3_Proyecto] ([ProyectoID])
GO
ALTER TABLE [dbo].[Sam3_FolioCuantificacion]  WITH CHECK ADD FOREIGN KEY([TipoUsoID])
REFERENCES [dbo].[Sam3_TipoUso] ([TipoUsoID])
GO
ALTER TABLE [dbo].[Sam3_Incidencia]  WITH CHECK ADD  CONSTRAINT [FK_Incidencia_Incidencia] FOREIGN KEY([IncidenciaOriginalID])
REFERENCES [dbo].[Sam3_Incidencia] ([IncidenciaID])
GO
ALTER TABLE [dbo].[Sam3_Incidencia] CHECK CONSTRAINT [FK_Incidencia_Incidencia]
GO
ALTER TABLE [dbo].[Sam3_Incidencia]  WITH CHECK ADD  CONSTRAINT [FK_Incidencia_Usuario] FOREIGN KEY([UsuarioID])
REFERENCES [dbo].[Sam3_Usuario] ([UsuarioID])
GO
ALTER TABLE [dbo].[Sam3_Incidencia] CHECK CONSTRAINT [FK_Incidencia_Usuario]
GO
ALTER TABLE [dbo].[Sam3_Incidencia]  WITH CHECK ADD  CONSTRAINT [FK_Incidencia_UsuarioRespuesta] FOREIGN KEY([UsuarioIDRespuesta])
REFERENCES [dbo].[Sam3_Usuario] ([UsuarioID])
GO
ALTER TABLE [dbo].[Sam3_Incidencia] CHECK CONSTRAINT [FK_Incidencia_UsuarioRespuesta]
GO
ALTER TABLE [dbo].[Sam3_ItemCode]  WITH CHECK ADD  CONSTRAINT [FK_ItemCode_FamiliaAcero] FOREIGN KEY([FamiliaAceroID])
REFERENCES [dbo].[Sam3_FamiliaAcero] ([FamiliaAceroID])
GO
ALTER TABLE [dbo].[Sam3_ItemCode] CHECK CONSTRAINT [FK_ItemCode_FamiliaAcero]
GO
ALTER TABLE [dbo].[Sam3_ItemCode]  WITH CHECK ADD  CONSTRAINT [FK_ItemCode_Proyecto] FOREIGN KEY([ProyectoID])
REFERENCES [dbo].[Sam3_Proyecto] ([ProyectoID])
GO
ALTER TABLE [dbo].[Sam3_ItemCode] CHECK CONSTRAINT [FK_ItemCode_Proyecto]
GO
ALTER TABLE [dbo].[Sam3_ItemCode]  WITH CHECK ADD  CONSTRAINT [FK_ItemCode_TipoMaterial] FOREIGN KEY([TipoMaterialID])
REFERENCES [dbo].[Sam3_TipoMaterial] ([TipoMaterialID])
GO
ALTER TABLE [dbo].[Sam3_ItemCode] CHECK CONSTRAINT [FK_ItemCode_TipoMaterial]
GO
ALTER TABLE [dbo].[Sam3_ItemCode]  WITH CHECK ADD  CONSTRAINT [FK_Sam3_ItemCode_Sam3_Colada] FOREIGN KEY([ColadaID])
REFERENCES [dbo].[Sam3_Colada] ([ColadaID])
GO
ALTER TABLE [dbo].[Sam3_ItemCode] CHECK CONSTRAINT [FK_Sam3_ItemCode_Sam3_Colada]
GO
ALTER TABLE [dbo].[Sam3_Maquina]  WITH CHECK ADD  CONSTRAINT [FK_Maquina_Patio] FOREIGN KEY([PatioID])
REFERENCES [dbo].[Sam3_Patio] ([PatioID])
GO
ALTER TABLE [dbo].[Sam3_Maquina] CHECK CONSTRAINT [FK_Maquina_Patio]
GO
ALTER TABLE [dbo].[Sam3_MaterialSpool]  WITH CHECK ADD  CONSTRAINT [FK_MaterialSpool_ItemCode] FOREIGN KEY([ItemCodeID])
REFERENCES [dbo].[Sam3_ItemCode] ([ItemCodeID])
GO
ALTER TABLE [dbo].[Sam3_MaterialSpool] CHECK CONSTRAINT [FK_MaterialSpool_ItemCode]
GO
ALTER TABLE [dbo].[Sam3_MaterialSpool]  WITH CHECK ADD  CONSTRAINT [FK_MaterialSpool_Spool] FOREIGN KEY([SpoolID])
REFERENCES [dbo].[Sam3_Spool] ([SpoolID])
GO
ALTER TABLE [dbo].[Sam3_MaterialSpool] CHECK CONSTRAINT [FK_MaterialSpool_Spool]
GO
ALTER TABLE [dbo].[Sam3_Notificacion]  WITH CHECK ADD  CONSTRAINT [FK_Notificacion_TipoNotificacion] FOREIGN KEY([TipoNotificacionID])
REFERENCES [dbo].[Sam3_TipoNotificacion] ([TipoNotificacionID])
GO
ALTER TABLE [dbo].[Sam3_Notificacion] CHECK CONSTRAINT [FK_Notificacion_TipoNotificacion]
GO
ALTER TABLE [dbo].[Sam3_NumeroUnico]  WITH CHECK ADD  CONSTRAINT [FK_NumeroUnico_Colada] FOREIGN KEY([ColadaID])
REFERENCES [dbo].[Sam3_Colada] ([ColadaID])
GO
ALTER TABLE [dbo].[Sam3_NumeroUnico] CHECK CONSTRAINT [FK_NumeroUnico_Colada]
GO
ALTER TABLE [dbo].[Sam3_NumeroUnico]  WITH CHECK ADD  CONSTRAINT [FK_NumeroUnico_Fabricante] FOREIGN KEY([FabricanteID])
REFERENCES [dbo].[Sam3_Fabricante] ([FabricanteID])
GO
ALTER TABLE [dbo].[Sam3_NumeroUnico] CHECK CONSTRAINT [FK_NumeroUnico_Fabricante]
GO
ALTER TABLE [dbo].[Sam3_NumeroUnico]  WITH CHECK ADD  CONSTRAINT [FK_NumeroUnico_ItemCode] FOREIGN KEY([ItemCodeID])
REFERENCES [dbo].[Sam3_ItemCode] ([ItemCodeID])
GO
ALTER TABLE [dbo].[Sam3_NumeroUnico] CHECK CONSTRAINT [FK_NumeroUnico_ItemCode]
GO
ALTER TABLE [dbo].[Sam3_NumeroUnico]  WITH CHECK ADD  CONSTRAINT [FK_NumeroUnico_Proveedor] FOREIGN KEY([ProveedorID])
REFERENCES [dbo].[Sam3_Proveedor] ([ProveedorID])
GO
ALTER TABLE [dbo].[Sam3_NumeroUnico] CHECK CONSTRAINT [FK_NumeroUnico_Proveedor]
GO
ALTER TABLE [dbo].[Sam3_NumeroUnico]  WITH CHECK ADD  CONSTRAINT [FK_NumeroUnico_Proyecto] FOREIGN KEY([ProyectoID])
REFERENCES [dbo].[Sam3_Proyecto] ([ProyectoID])
GO
ALTER TABLE [dbo].[Sam3_NumeroUnico] CHECK CONSTRAINT [FK_NumeroUnico_Proyecto]
GO
ALTER TABLE [dbo].[Sam3_NumeroUnico]  WITH CHECK ADD  CONSTRAINT [FK_NumeroUnico_Recepcion] FOREIGN KEY([RecepcionID])
REFERENCES [dbo].[Sam3_Recepcion] ([RecepcionID])
GO
ALTER TABLE [dbo].[Sam3_NumeroUnico] CHECK CONSTRAINT [FK_NumeroUnico_Recepcion]
GO
ALTER TABLE [dbo].[Sam3_NumeroUnico]  WITH CHECK ADD  CONSTRAINT [FK_NumeroUnico_TipoCorte_1] FOREIGN KEY([TipoCorte1ID])
REFERENCES [dbo].[Sam3_TipoCorte] ([TipoCorteID])
GO
ALTER TABLE [dbo].[Sam3_NumeroUnico] CHECK CONSTRAINT [FK_NumeroUnico_TipoCorte_1]
GO
ALTER TABLE [dbo].[Sam3_NumeroUnico]  WITH CHECK ADD  CONSTRAINT [FK_NumeroUnico_TipoCorte_2] FOREIGN KEY([TipoCorte2ID])
REFERENCES [dbo].[Sam3_TipoCorte] ([TipoCorteID])
GO
ALTER TABLE [dbo].[Sam3_NumeroUnico] CHECK CONSTRAINT [FK_NumeroUnico_TipoCorte_2]
GO
ALTER TABLE [dbo].[Sam3_NumeroUnico]  WITH CHECK ADD  CONSTRAINT [FK_Sam3_NumeroUnico_Sam3_NumeroUnico] FOREIGN KEY([NumeroUnicoID])
REFERENCES [dbo].[Sam3_NumeroUnico] ([NumeroUnicoID])
GO
ALTER TABLE [dbo].[Sam3_NumeroUnico] CHECK CONSTRAINT [FK_Sam3_NumeroUnico_Sam3_NumeroUnico]
GO
ALTER TABLE [dbo].[Sam3_NumeroUnicoCorte]  WITH CHECK ADD  CONSTRAINT [FK_NumeroUnicoCorte_NumeroUnico] FOREIGN KEY([NumeroUnicoID])
REFERENCES [dbo].[Sam3_NumeroUnico] ([NumeroUnicoID])
GO
ALTER TABLE [dbo].[Sam3_NumeroUnicoCorte] CHECK CONSTRAINT [FK_NumeroUnicoCorte_NumeroUnico]
GO
ALTER TABLE [dbo].[Sam3_NumeroUnicoCorte]  WITH CHECK ADD  CONSTRAINT [FK_NumeroUnicoCorte_NumeroUnicoMovimiento] FOREIGN KEY([SalidaMovimientoID])
REFERENCES [dbo].[Sam3_NumeroUnicoMovimiento] ([NumeroUnicoMovimientoID])
GO
ALTER TABLE [dbo].[Sam3_NumeroUnicoCorte] CHECK CONSTRAINT [FK_NumeroUnicoCorte_NumeroUnicoMovimiento]
GO
ALTER TABLE [dbo].[Sam3_NumeroUnicoCorte]  WITH CHECK ADD  CONSTRAINT [FK_NumeroUnicoCorte_OrdenTrabajo] FOREIGN KEY([OrdenTrabajoID])
REFERENCES [dbo].[Sam3_OrdenTrabajo] ([OrdenTrabajoID])
GO
ALTER TABLE [dbo].[Sam3_NumeroUnicoCorte] CHECK CONSTRAINT [FK_NumeroUnicoCorte_OrdenTrabajo]
GO
ALTER TABLE [dbo].[Sam3_NumeroUnicoCorte]  WITH CHECK ADD  CONSTRAINT [FK_NumeroUnicoCorte_Proyecto] FOREIGN KEY([ProyectoID])
REFERENCES [dbo].[Sam3_Proyecto] ([ProyectoID])
GO
ALTER TABLE [dbo].[Sam3_NumeroUnicoCorte] CHECK CONSTRAINT [FK_NumeroUnicoCorte_Proyecto]
GO
ALTER TABLE [dbo].[Sam3_NumeroUnicoCorte]  WITH CHECK ADD  CONSTRAINT [FK_NumeroUnicoCorte_UbicacionFisica] FOREIGN KEY([UbicacionFisicaID])
REFERENCES [dbo].[Sam3_UbicacionFisica] ([UbicacionFisicaID])
GO
ALTER TABLE [dbo].[Sam3_NumeroUnicoCorte] CHECK CONSTRAINT [FK_NumeroUnicoCorte_UbicacionFisica]
GO
ALTER TABLE [dbo].[Sam3_NumeroUnicoInventario]  WITH CHECK ADD  CONSTRAINT [FK_NumeroUnicoInventario_Proyecto] FOREIGN KEY([ProyectoID])
REFERENCES [dbo].[Sam3_Proyecto] ([ProyectoID])
GO
ALTER TABLE [dbo].[Sam3_NumeroUnicoInventario] CHECK CONSTRAINT [FK_NumeroUnicoInventario_Proyecto]
GO
ALTER TABLE [dbo].[Sam3_NumeroUnicoMovimiento]  WITH CHECK ADD  CONSTRAINT [FK_NumeroUnicoMovimiento_NumeroUnico] FOREIGN KEY([NumeroUnicoID])
REFERENCES [dbo].[Sam3_NumeroUnico] ([NumeroUnicoID])
GO
ALTER TABLE [dbo].[Sam3_NumeroUnicoMovimiento] CHECK CONSTRAINT [FK_NumeroUnicoMovimiento_NumeroUnico]
GO
ALTER TABLE [dbo].[Sam3_NumeroUnicoMovimiento]  WITH CHECK ADD  CONSTRAINT [FK_NumeroUnicoMovimiento_Proyecto] FOREIGN KEY([ProyectoID])
REFERENCES [dbo].[Sam3_Proyecto] ([ProyectoID])
GO
ALTER TABLE [dbo].[Sam3_NumeroUnicoMovimiento] CHECK CONSTRAINT [FK_NumeroUnicoMovimiento_Proyecto]
GO
ALTER TABLE [dbo].[Sam3_NumeroUnicoMovimiento]  WITH CHECK ADD  CONSTRAINT [FK_NumeroUnicoMovimiento_TipoMovimiento] FOREIGN KEY([TipoMovimientoID])
REFERENCES [dbo].[Sam3_TipoMovimiento] ([TipoMovimientoID])
GO
ALTER TABLE [dbo].[Sam3_NumeroUnicoMovimiento] CHECK CONSTRAINT [FK_NumeroUnicoMovimiento_TipoMovimiento]
GO
ALTER TABLE [dbo].[Sam3_NumeroUnicoSegmento]  WITH CHECK ADD  CONSTRAINT [FK_NumeroUnicoSegmento_NumeroUnico] FOREIGN KEY([NumeroUnicoID])
REFERENCES [dbo].[Sam3_NumeroUnico] ([NumeroUnicoID])
GO
ALTER TABLE [dbo].[Sam3_NumeroUnicoSegmento] CHECK CONSTRAINT [FK_NumeroUnicoSegmento_NumeroUnico]
GO
ALTER TABLE [dbo].[Sam3_NumeroUnicoSegmento]  WITH CHECK ADD  CONSTRAINT [FK_NumeroUnicoSegmento_Proyecto] FOREIGN KEY([ProyectoID])
REFERENCES [dbo].[Sam3_Proyecto] ([ProyectoID])
GO
ALTER TABLE [dbo].[Sam3_NumeroUnicoSegmento] CHECK CONSTRAINT [FK_NumeroUnicoSegmento_Proyecto]
GO
ALTER TABLE [dbo].[Sam3_OrdenTrabajo]  WITH CHECK ADD  CONSTRAINT [FK_OrdenTrabajo_EstatusOrden] FOREIGN KEY([EstatusOrdenID])
REFERENCES [dbo].[Sam3_EstatusOrden] ([EstatusOrdenID])
GO
ALTER TABLE [dbo].[Sam3_OrdenTrabajo] CHECK CONSTRAINT [FK_OrdenTrabajo_EstatusOrden]
GO
ALTER TABLE [dbo].[Sam3_OrdenTrabajo]  WITH CHECK ADD  CONSTRAINT [FK_OrdenTrabajo_Proyecto] FOREIGN KEY([ProyectoID])
REFERENCES [dbo].[Sam3_Proyecto] ([ProyectoID])
GO
ALTER TABLE [dbo].[Sam3_OrdenTrabajo] CHECK CONSTRAINT [FK_OrdenTrabajo_Proyecto]
GO
ALTER TABLE [dbo].[Sam3_OrdenTrabajo]  WITH CHECK ADD  CONSTRAINT [FK_OrdenTrabajo_Taller] FOREIGN KEY([TallerID])
REFERENCES [dbo].[Sam3_Taller] ([TallerID])
GO
ALTER TABLE [dbo].[Sam3_OrdenTrabajo] CHECK CONSTRAINT [FK_OrdenTrabajo_Taller]
GO
ALTER TABLE [dbo].[Sam3_OrdenTrabajoSpool]  WITH CHECK ADD  CONSTRAINT [FK_OrdenTrabajoSpool_OrdenTrabajo] FOREIGN KEY([OrdenTrabajoID])
REFERENCES [dbo].[Sam3_OrdenTrabajo] ([OrdenTrabajoID])
GO
ALTER TABLE [dbo].[Sam3_OrdenTrabajoSpool] CHECK CONSTRAINT [FK_OrdenTrabajoSpool_OrdenTrabajo]
GO
ALTER TABLE [dbo].[Sam3_OrdenTrabajoSpool]  WITH CHECK ADD  CONSTRAINT [FK_OrdenTrabajoSpool_Spool] FOREIGN KEY([SpoolID])
REFERENCES [dbo].[Sam3_Spool] ([SpoolID])
GO
ALTER TABLE [dbo].[Sam3_OrdenTrabajoSpool] CHECK CONSTRAINT [FK_OrdenTrabajoSpool_Spool]
GO
ALTER TABLE [dbo].[Sam3_PermisoAduana]  WITH CHECK ADD  CONSTRAINT [FK_PermisoAduana_FolioAvisoLlegada] FOREIGN KEY([FolioAvisoLlegadaID])
REFERENCES [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID])
GO
ALTER TABLE [dbo].[Sam3_PermisoAduana] CHECK CONSTRAINT [FK_PermisoAduana_FolioAvisoLlegada]
GO
ALTER TABLE [dbo].[Sam3_PinturaNumeroUnico]  WITH CHECK ADD  CONSTRAINT [FK_PinturaNumeroUnico_NumeroUnico] FOREIGN KEY([NumeroUnicoID])
REFERENCES [dbo].[Sam3_NumeroUnico] ([NumeroUnicoID])
GO
ALTER TABLE [dbo].[Sam3_PinturaNumeroUnico] CHECK CONSTRAINT [FK_PinturaNumeroUnico_NumeroUnico]
GO
ALTER TABLE [dbo].[Sam3_PinturaNumeroUnico]  WITH CHECK ADD  CONSTRAINT [FK_PinturaNumeroUnico_Proyecto] FOREIGN KEY([ProyectoID])
REFERENCES [dbo].[Sam3_Proyecto] ([ProyectoID])
GO
ALTER TABLE [dbo].[Sam3_PinturaNumeroUnico] CHECK CONSTRAINT [FK_PinturaNumeroUnico_Proyecto]
GO
ALTER TABLE [dbo].[Sam3_PinturaNumeroUnico]  WITH CHECK ADD  CONSTRAINT [FK_PinturaNumeroUnico_RequisicionNumeroUnicoDetalleID] FOREIGN KEY([RequisicionNumeroUnicoDetalleID])
REFERENCES [dbo].[Sam3_RequisicionNumeroUnicoDetalle] ([RequisicionNumeroUnicoDetalleID])
GO
ALTER TABLE [dbo].[Sam3_PinturaNumeroUnico] CHECK CONSTRAINT [FK_PinturaNumeroUnico_RequisicionNumeroUnicoDetalleID]
GO
ALTER TABLE [dbo].[Sam3_Proveedor]  WITH CHECK ADD  CONSTRAINT [FK_Proveedor_Contacto] FOREIGN KEY([ContactoID])
REFERENCES [dbo].[Sam3_Contacto] ([ContactoID])
GO
ALTER TABLE [dbo].[Sam3_Proveedor] CHECK CONSTRAINT [FK_Proveedor_Contacto]
GO
ALTER TABLE [dbo].[Sam3_Proyecto]  WITH CHECK ADD  CONSTRAINT [FK_Proyecto_Cliente] FOREIGN KEY([ClienteID])
REFERENCES [dbo].[Sam3_Cliente] ([ClienteID])
GO
ALTER TABLE [dbo].[Sam3_Proyecto] CHECK CONSTRAINT [FK_Proyecto_Cliente]
GO
ALTER TABLE [dbo].[Sam3_Proyecto]  WITH CHECK ADD  CONSTRAINT [FK_Proyecto_Color] FOREIGN KEY([ColorID])
REFERENCES [dbo].[Sam3_Color] ([ColorID])
GO
ALTER TABLE [dbo].[Sam3_Proyecto] CHECK CONSTRAINT [FK_Proyecto_Color]
GO
ALTER TABLE [dbo].[Sam3_Proyecto]  WITH CHECK ADD  CONSTRAINT [FK_Proyecto_Contacto] FOREIGN KEY([ContactoID])
REFERENCES [dbo].[Sam3_Contacto] ([ContactoID])
GO
ALTER TABLE [dbo].[Sam3_Proyecto] CHECK CONSTRAINT [FK_Proyecto_Contacto]
GO
ALTER TABLE [dbo].[Sam3_Proyecto]  WITH CHECK ADD  CONSTRAINT [FK_Proyecto_Patio] FOREIGN KEY([PatioID])
REFERENCES [dbo].[Sam3_Patio] ([PatioID])
GO
ALTER TABLE [dbo].[Sam3_Proyecto] CHECK CONSTRAINT [FK_Proyecto_Patio]
GO
ALTER TABLE [dbo].[Sam3_ProyectoConsecutivo]  WITH CHECK ADD FOREIGN KEY([ProyectoID])
REFERENCES [dbo].[Sam3_Proyecto] ([ProyectoID])
GO
ALTER TABLE [dbo].[Sam3_Recepcion]  WITH CHECK ADD  CONSTRAINT [FK_Sam3_Recepcion_Sam3_FolioCuantificacion] FOREIGN KEY([FolioCuantificacionID])
REFERENCES [dbo].[Sam3_FolioCuantificacion] ([FolioCuantificacionID])
GO
ALTER TABLE [dbo].[Sam3_Recepcion] CHECK CONSTRAINT [FK_Sam3_Recepcion_Sam3_FolioCuantificacion]
GO
ALTER TABLE [dbo].[Sam3_Rel_Bulto_ItemCode]  WITH CHECK ADD FOREIGN KEY([BultoID])
REFERENCES [dbo].[Sam3_Bulto] ([BultoID])
GO
ALTER TABLE [dbo].[Sam3_Rel_Bulto_ItemCode]  WITH CHECK ADD FOREIGN KEY([ItemCodeID])
REFERENCES [dbo].[Sam3_ItemCode] ([ItemCodeID])
GO
ALTER TABLE [dbo].[Sam3_Rel_Documento_Entidad]  WITH CHECK ADD  CONSTRAINT [FK_Rel_DocumentoEntidad_Entidad] FOREIGN KEY([EntidadID])
REFERENCES [dbo].[Sam3_Entidad] ([EntidadID])
GO
ALTER TABLE [dbo].[Sam3_Rel_Documento_Entidad] CHECK CONSTRAINT [FK_Rel_DocumentoEntidad_Entidad]
GO
ALTER TABLE [dbo].[Sam3_Rel_Documento_Entidad]  WITH CHECK ADD  CONSTRAINT [FK_Rel_DocumentoEntidad_Repositorio] FOREIGN KEY([RepositorioID])
REFERENCES [dbo].[Sam3_Repositorio] ([RepositorioId])
GO
ALTER TABLE [dbo].[Sam3_Rel_Documento_Entidad] CHECK CONSTRAINT [FK_Rel_DocumentoEntidad_Repositorio]
GO
ALTER TABLE [dbo].[Sam3_Rel_Documento_Entidad]  WITH CHECK ADD  CONSTRAINT [FK_Rel_DocumentoEntidad_TipoDocumento] FOREIGN KEY([TipoDocumentoID])
REFERENCES [dbo].[Sam3_TipoDocumento] ([TipoDocumentoID])
GO
ALTER TABLE [dbo].[Sam3_Rel_Documento_Entidad] CHECK CONSTRAINT [FK_Rel_DocumentoEntidad_TipoDocumento]
GO
ALTER TABLE [dbo].[Sam3_Rel_FolioAvisoEntrada_Documento]  WITH CHECK ADD FOREIGN KEY([FolioAvisoEntradaID])
REFERENCES [dbo].[Sam3_FolioAvisoEntrada] ([FolioAvisoEntradaID])
GO
ALTER TABLE [dbo].[Sam3_Rel_FolioAvisoEntrada_OrdenRecepcion]  WITH CHECK ADD FOREIGN KEY([FolioAvisoEntradaID])
REFERENCES [dbo].[Sam3_FolioAvisoEntrada] ([FolioAvisoEntradaID])
GO
ALTER TABLE [dbo].[Sam3_Rel_FolioAvisoEntrada_OrdenRecepcion]  WITH CHECK ADD FOREIGN KEY([OrdenRecepcionID])
REFERENCES [dbo].[Sam3_OrdenRecepcion] ([OrdenRecepcionID])
GO
ALTER TABLE [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento]  WITH CHECK ADD FOREIGN KEY([FolioAvisoLlegadaID])
REFERENCES [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID])
GO
ALTER TABLE [dbo].[Sam3_Rel_FolioAvisoLlegada_Documento]  WITH CHECK ADD FOREIGN KEY([TipoArchivoID])
REFERENCES [dbo].[Sam3_TipoArchivo] ([TipoArchivoID])
GO
ALTER TABLE [dbo].[Sam3_Rel_FolioAvisoLlegada_PaseSalida_Archivo]  WITH CHECK ADD FOREIGN KEY([FolioAvisoLlegadaID])
REFERENCES [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID])
GO
ALTER TABLE [dbo].[Sam3_Rel_FolioAvisoLlegada_PaseSalida_Archivo]  WITH CHECK ADD FOREIGN KEY([TipoArchivoID])
REFERENCES [dbo].[Sam3_TipoArchivo] ([TipoArchivoID])
GO
ALTER TABLE [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto]  WITH CHECK ADD FOREIGN KEY([FolioAvisoLlegadaID])
REFERENCES [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID])
GO
ALTER TABLE [dbo].[Sam3_Rel_FolioAvisoLlegada_Proyecto]  WITH CHECK ADD FOREIGN KEY([ProyectoID])
REFERENCES [dbo].[Sam3_Proyecto] ([ProyectoID])
GO
ALTER TABLE [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo]  WITH CHECK ADD FOREIGN KEY([FolioAvisoLlegadaID])
REFERENCES [dbo].[Sam3_FolioAvisoLlegada] ([FolioAvisoLlegadaID])
GO
ALTER TABLE [dbo].[Sam3_Rel_FolioAvisoLlegada_Vehiculo]  WITH CHECK ADD FOREIGN KEY([VehiculoID])
REFERENCES [dbo].[Sam3_Vehiculo] ([VehiculoID])
GO
ALTER TABLE [dbo].[Sam3_Rel_FolioCuantificacion_ItemCode]  WITH CHECK ADD FOREIGN KEY([FolioCuantificacionID])
REFERENCES [dbo].[Sam3_FolioCuantificacion] ([FolioCuantificacionID])
GO
ALTER TABLE [dbo].[Sam3_Rel_FolioCuantificacion_ItemCode]  WITH CHECK ADD FOREIGN KEY([ItemCodeID])
REFERENCES [dbo].[Sam3_ItemCode] ([ItemCodeID])
GO
ALTER TABLE [dbo].[Sam3_Rel_Incidencia_Entidad]  WITH CHECK ADD  CONSTRAINT [FK_Rel_IncidenciaEntidad_Entidad] FOREIGN KEY([EntidadID])
REFERENCES [dbo].[Sam3_Entidad] ([EntidadID])
GO
ALTER TABLE [dbo].[Sam3_Rel_Incidencia_Entidad] CHECK CONSTRAINT [FK_Rel_IncidenciaEntidad_Entidad]
GO
ALTER TABLE [dbo].[Sam3_Rel_Incidencia_Entidad]  WITH CHECK ADD  CONSTRAINT [FK_Rel_IncidenciaEntidad_Incidencia] FOREIGN KEY([IncidenciaID])
REFERENCES [dbo].[Sam3_Incidencia] ([IncidenciaID])
GO
ALTER TABLE [dbo].[Sam3_Rel_Incidencia_Entidad] CHECK CONSTRAINT [FK_Rel_IncidenciaEntidad_Incidencia]
GO
ALTER TABLE [dbo].[Sam3_Rel_Incidencia_NumeroUnico]  WITH CHECK ADD FOREIGN KEY([IncidenciaID])
REFERENCES [dbo].[Sam3_Incidencia] ([IncidenciaID])
GO
ALTER TABLE [dbo].[Sam3_Rel_Incidencia_NumeroUnico]  WITH CHECK ADD FOREIGN KEY([NumeroUnicoID])
REFERENCES [dbo].[Sam3_NumeroUnico] ([NumeroUnicoID])
GO
ALTER TABLE [dbo].[Sam3_Rel_ItemCode_ItemCodeSteelgo]  WITH CHECK ADD FOREIGN KEY([ItemCodeID])
REFERENCES [dbo].[Sam3_ItemCode] ([ItemCodeID])
GO
ALTER TABLE [dbo].[Sam3_Rel_ItemCode_ItemCodeSteelgo]  WITH CHECK ADD FOREIGN KEY([ItemCodeSteelgoID])
REFERENCES [dbo].[Sam3_ItemCodeSteelgo] ([ItemCodeSteelgoID])
GO
ALTER TABLE [dbo].[Sam3_Rel_OrdenAlmacenaje_NumeroUnico]  WITH CHECK ADD FOREIGN KEY([NumeroUnicoID])
REFERENCES [dbo].[Sam3_NumeroUnico] ([NumeroUnicoID])
GO
ALTER TABLE [dbo].[Sam3_Rel_OrdenAlmacenaje_NumeroUnico]  WITH CHECK ADD FOREIGN KEY([OrdenAlmacenajeID])
REFERENCES [dbo].[Sam3_OrdenAlmacenaje] ([OrdenAlmacenajeID])
GO
ALTER TABLE [dbo].[Sam3_Rel_OrdenRecepcion_ItemCode]  WITH CHECK ADD FOREIGN KEY([ItemCodeID])
REFERENCES [dbo].[Sam3_ItemCode] ([ItemCodeID])
GO
ALTER TABLE [dbo].[Sam3_Rel_OrdenRecepcion_ItemCode]  WITH CHECK ADD FOREIGN KEY([OrdenRecepcionID])
REFERENCES [dbo].[Sam3_OrdenRecepcion] ([OrdenRecepcionID])
GO
ALTER TABLE [dbo].[Sam3_Rel_Perfil_Entidad_Pagina]  WITH CHECK ADD FOREIGN KEY([EntidadID])
REFERENCES [dbo].[Sam3_Entidad] ([EntidadID])
GO
ALTER TABLE [dbo].[Sam3_Rel_Perfil_Entidad_Pagina]  WITH CHECK ADD FOREIGN KEY([PaginaID])
REFERENCES [dbo].[Sam3_Pagina] ([PaginaID])
GO
ALTER TABLE [dbo].[Sam3_Rel_Perfil_Entidad_Pagina]  WITH CHECK ADD FOREIGN KEY([PerfilID])
REFERENCES [dbo].[Sam3_Perfil] ([PerfilID])
GO
ALTER TABLE [dbo].[Sam3_Rel_Perfil_MenuContextual]  WITH CHECK ADD FOREIGN KEY([MenuContextualID])
REFERENCES [dbo].[Sam3_MenuContextual] ([MenuID])
GO
ALTER TABLE [dbo].[Sam3_Rel_Perfil_MenuContextual]  WITH CHECK ADD FOREIGN KEY([PerfilID])
REFERENCES [dbo].[Sam3_Perfil] ([PerfilID])
GO
ALTER TABLE [dbo].[Sam3_Rel_Perfil_MenuGeneral]  WITH CHECK ADD FOREIGN KEY([MenuGeneralID])
REFERENCES [dbo].[Sam3_MenuGeneral] ([MenuID])
GO
ALTER TABLE [dbo].[Sam3_Rel_Perfil_MenuGeneral]  WITH CHECK ADD FOREIGN KEY([PerfilID])
REFERENCES [dbo].[Sam3_Perfil] ([PerfilID])
GO
ALTER TABLE [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina]  WITH CHECK ADD  CONSTRAINT [FK_Rel_PerfilPropiedadPagina_Perfil] FOREIGN KEY([PerfilID])
REFERENCES [dbo].[Sam3_Perfil] ([PerfilID])
GO
ALTER TABLE [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] CHECK CONSTRAINT [FK_Rel_PerfilPropiedadPagina_Perfil]
GO
ALTER TABLE [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina]  WITH CHECK ADD  CONSTRAINT [FK_Rel_PerfilPropiedadPagina_Propiedad] FOREIGN KEY([PropiedadID])
REFERENCES [dbo].[Sam3_Propiedad] ([PropiedadID])
GO
ALTER TABLE [dbo].[Sam3_Rel_Perfil_Propiedad_Pagina] CHECK CONSTRAINT [FK_Rel_PerfilPropiedadPagina_Propiedad]
GO
ALTER TABLE [dbo].[Sam3_Rel_PermisoAduana_Documento]  WITH CHECK ADD FOREIGN KEY([PermisoAduanaID])
REFERENCES [dbo].[Sam3_PermisoAduana] ([PermisoAduanaID])
GO
ALTER TABLE [dbo].[Sam3_Rel_PermisoAduana_Documento]  WITH CHECK ADD FOREIGN KEY([TipoArchivoID])
REFERENCES [dbo].[Sam3_TipoArchivo] ([TipoArchivoID])
GO
ALTER TABLE [dbo].[Sam3_Rel_Usuario_Preferencia]  WITH CHECK ADD  CONSTRAINT [FK_Rel_Usuario_Preferencia_Preferencia] FOREIGN KEY([PreferenciaID])
REFERENCES [dbo].[Sam3_Preferencia] ([PreferenciaId])
GO
ALTER TABLE [dbo].[Sam3_Rel_Usuario_Preferencia] CHECK CONSTRAINT [FK_Rel_Usuario_Preferencia_Preferencia]
GO
ALTER TABLE [dbo].[Sam3_Rel_Usuario_Preferencia]  WITH CHECK ADD  CONSTRAINT [FK_Rel_Usuario_Preferencia_UsuaRIO] FOREIGN KEY([UsuarioID])
REFERENCES [dbo].[Sam3_Usuario] ([UsuarioID])
GO
ALTER TABLE [dbo].[Sam3_Rel_Usuario_Preferencia] CHECK CONSTRAINT [FK_Rel_Usuario_Preferencia_UsuaRIO]
GO
ALTER TABLE [dbo].[Sam3_Rel_Usuario_Proyecto]  WITH CHECK ADD  CONSTRAINT [FK_Rel_UsuarioProyecto_Proyecto] FOREIGN KEY([ProyectoID])
REFERENCES [dbo].[Sam3_Proyecto] ([ProyectoID])
GO
ALTER TABLE [dbo].[Sam3_Rel_Usuario_Proyecto] CHECK CONSTRAINT [FK_Rel_UsuarioProyecto_Proyecto]
GO
ALTER TABLE [dbo].[Sam3_Rel_Usuario_Proyecto]  WITH CHECK ADD  CONSTRAINT [FK_Rel_UsuarioProyecto_Usuario] FOREIGN KEY([UsuarioID])
REFERENCES [dbo].[Sam3_Usuario] ([UsuarioID])
GO
ALTER TABLE [dbo].[Sam3_Rel_Usuario_Proyecto] CHECK CONSTRAINT [FK_Rel_UsuarioProyecto_Usuario]
GO
ALTER TABLE [dbo].[Sam3_Rel_Vehiculo_Chofer]  WITH CHECK ADD FOREIGN KEY([ChoferID])
REFERENCES [dbo].[Sam3_Chofer] ([ChoferID])
GO
ALTER TABLE [dbo].[Sam3_Rel_Vehiculo_Chofer]  WITH CHECK ADD FOREIGN KEY([VehiculoID])
REFERENCES [dbo].[Sam3_Vehiculo] ([VehiculoID])
GO
ALTER TABLE [dbo].[Sam3_Rel_Vehiculo_Transportista]  WITH CHECK ADD FOREIGN KEY([TransportistaID])
REFERENCES [dbo].[Sam3_Transportista] ([TransportistaID])
GO
ALTER TABLE [dbo].[Sam3_Rel_Vehiculo_Transportista]  WITH CHECK ADD FOREIGN KEY([VehiculoID])
REFERENCES [dbo].[Sam3_Vehiculo] ([VehiculoID])
GO
ALTER TABLE [dbo].[Sam3_RequisicionNumeroUnico]  WITH CHECK ADD  CONSTRAINT [FK_RequisicionNumeroUnico_Proyecto] FOREIGN KEY([ProyectoID])
REFERENCES [dbo].[Sam3_Proyecto] ([ProyectoID])
GO
ALTER TABLE [dbo].[Sam3_RequisicionNumeroUnico] CHECK CONSTRAINT [FK_RequisicionNumeroUnico_Proyecto]
GO
ALTER TABLE [dbo].[Sam3_RequisicionNumeroUnicoDetalle]  WITH CHECK ADD  CONSTRAINT [FK_RequisicionNumeroUnicoDetalle_NumeroUnico] FOREIGN KEY([NumeroUnicoID])
REFERENCES [dbo].[Sam3_NumeroUnico] ([NumeroUnicoID])
GO
ALTER TABLE [dbo].[Sam3_RequisicionNumeroUnicoDetalle] CHECK CONSTRAINT [FK_RequisicionNumeroUnicoDetalle_NumeroUnico]
GO
ALTER TABLE [dbo].[Sam3_RequisicionNumeroUnicoDetalle]  WITH CHECK ADD  CONSTRAINT [FK_RequisicionNumeroUnicoDetalle_RequisicionNumeroUnico] FOREIGN KEY([RequisicionNumeroUnicoID])
REFERENCES [dbo].[Sam3_RequisicionNumeroUnico] ([RequisicionNumeroUnicoID])
GO
ALTER TABLE [dbo].[Sam3_RequisicionNumeroUnicoDetalle] CHECK CONSTRAINT [FK_RequisicionNumeroUnicoDetalle_RequisicionNumeroUnico]
GO
ALTER TABLE [dbo].[Sam3_Sesion]  WITH CHECK ADD  CONSTRAINT [FK_Sesion_Usuario] FOREIGN KEY([UsuarioID])
REFERENCES [dbo].[Sam3_Usuario] ([UsuarioID])
GO
ALTER TABLE [dbo].[Sam3_Sesion] CHECK CONSTRAINT [FK_Sesion_Usuario]
GO
ALTER TABLE [dbo].[Sam3_Spool]  WITH CHECK ADD  CONSTRAINT [FK_Spool_FamiliaAcero_1] FOREIGN KEY([FamiliaAcero1ID])
REFERENCES [dbo].[Sam3_FamiliaAcero] ([FamiliaAceroID])
GO
ALTER TABLE [dbo].[Sam3_Spool] CHECK CONSTRAINT [FK_Spool_FamiliaAcero_1]
GO
ALTER TABLE [dbo].[Sam3_Spool]  WITH CHECK ADD  CONSTRAINT [FK_Spool_FamiliaAcero_2] FOREIGN KEY([FamiliaAcero2ID])
REFERENCES [dbo].[Sam3_FamiliaAcero] ([FamiliaAceroID])
GO
ALTER TABLE [dbo].[Sam3_Spool] CHECK CONSTRAINT [FK_Spool_FamiliaAcero_2]
GO
ALTER TABLE [dbo].[Sam3_Spool]  WITH CHECK ADD  CONSTRAINT [FK_Spool_Proyecto] FOREIGN KEY([ProyectoID])
REFERENCES [dbo].[Sam3_Proyecto] ([ProyectoID])
GO
ALTER TABLE [dbo].[Sam3_Spool] CHECK CONSTRAINT [FK_Spool_Proyecto]
GO
ALTER TABLE [dbo].[Sam3_Taller]  WITH CHECK ADD  CONSTRAINT [FK_Taller_Patio] FOREIGN KEY([PatioID])
REFERENCES [dbo].[Sam3_Patio] ([PatioID])
GO
ALTER TABLE [dbo].[Sam3_Taller] CHECK CONSTRAINT [FK_Taller_Patio]
GO
ALTER TABLE [dbo].[Sam3_Transportista]  WITH CHECK ADD  CONSTRAINT [FK_Transportista_Contacto] FOREIGN KEY([ContactoID])
REFERENCES [dbo].[Sam3_Contacto] ([ContactoID])
GO
ALTER TABLE [dbo].[Sam3_Transportista] CHECK CONSTRAINT [FK_Transportista_Contacto]
GO
ALTER TABLE [dbo].[Sam3_UbicacionFisica]  WITH CHECK ADD  CONSTRAINT [FK_UbicacionFisica_Patio] FOREIGN KEY([PatioID])
REFERENCES [dbo].[Sam3_Patio] ([PatioID])
GO
ALTER TABLE [dbo].[Sam3_UbicacionFisica] CHECK CONSTRAINT [FK_UbicacionFisica_Patio]
GO
ALTER TABLE [dbo].[Sam3_Usuario]  WITH CHECK ADD  CONSTRAINT [FK_Usuario_Perfil] FOREIGN KEY([PerfilID])
REFERENCES [dbo].[Sam3_Perfil] ([PerfilID])
GO
ALTER TABLE [dbo].[Sam3_Usuario] CHECK CONSTRAINT [FK_Usuario_Perfil]
GO
ALTER TABLE [dbo].[Sam3_UsuariosNotificaciones]  WITH CHECK ADD FOREIGN KEY([TipoNotificacionID])
REFERENCES [dbo].[Sam3_TipoNotificacion] ([TipoNotificacionID])
GO
ALTER TABLE [dbo].[Sam3_UsuariosNotificaciones]  WITH CHECK ADD FOREIGN KEY([UsuarioID])
REFERENCES [dbo].[Sam3_Usuario] ([UsuarioID])
GO
ALTER TABLE [dbo].[Sam3_Vehiculo]  WITH CHECK ADD FOREIGN KEY([TipoVehiculoID])
REFERENCES [dbo].[Sam3_TipoVehiculo] ([TipoVehiculoID])
GO
ALTER TABLE [dbo].[Sam3_MaterialSpool]  WITH CHECK ADD  CONSTRAINT [CK_MaterialSpool_Diametro1] CHECK  (([Diametro1]>(0)))
GO
ALTER TABLE [dbo].[Sam3_MaterialSpool] CHECK CONSTRAINT [CK_MaterialSpool_Diametro1]
GO
USE [master]
GO
ALTER DATABASE [steelgo-sam3] SET  READ_WRITE 
GO
