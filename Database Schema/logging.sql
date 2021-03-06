USE [master]
GO
/****** Object:  Database [steelgo-samlogging]    Script Date: 9/9/2015 3:54:51 PM ******/
CREATE DATABASE [steelgo-samlogging]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'steelgo-samlogging', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL11.MSSQLSERVER2012\MSSQL\DATA\steelgo-samlogging.mdf' , SIZE = 5120KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'steelgo-samlogging_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL11.MSSQLSERVER2012\MSSQL\DATA\steelgo-samlogging_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [steelgo-samlogging] SET COMPATIBILITY_LEVEL = 110
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [steelgo-samlogging].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [steelgo-samlogging] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [steelgo-samlogging] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [steelgo-samlogging] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [steelgo-samlogging] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [steelgo-samlogging] SET ARITHABORT OFF 
GO
ALTER DATABASE [steelgo-samlogging] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [steelgo-samlogging] SET AUTO_CREATE_STATISTICS ON 
GO
ALTER DATABASE [steelgo-samlogging] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [steelgo-samlogging] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [steelgo-samlogging] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [steelgo-samlogging] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [steelgo-samlogging] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [steelgo-samlogging] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [steelgo-samlogging] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [steelgo-samlogging] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [steelgo-samlogging] SET  DISABLE_BROKER 
GO
ALTER DATABASE [steelgo-samlogging] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [steelgo-samlogging] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [steelgo-samlogging] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [steelgo-samlogging] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [steelgo-samlogging] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [steelgo-samlogging] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [steelgo-samlogging] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [steelgo-samlogging] SET RECOVERY FULL 
GO
ALTER DATABASE [steelgo-samlogging] SET  MULTI_USER 
GO
ALTER DATABASE [steelgo-samlogging] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [steelgo-samlogging] SET DB_CHAINING OFF 
GO
ALTER DATABASE [steelgo-samlogging] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [steelgo-samlogging] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
USE [steelgo-samlogging]
GO
/****** Object:  User [DeFiAdmin]    Script Date: 9/9/2015 3:54:51 PM ******/
CREATE USER [DeFiAdmin] FOR LOGIN [DeFiAdmin] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  Table [dbo].[Bitacora]    Script Date: 9/9/2015 3:54:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Bitacora](
	[BitacoraId] [int] IDENTITY(1,1) NOT NULL,
	[UsuarioId] [int] NOT NULL,
	[TipoActividadID] [int] NOT NULL,
	[Mensaje] [nvarchar](500) NOT NULL,
	[Fecha] [datetime] NOT NULL,
	[EntidadId] [int] NOT NULL,
 CONSTRAINT [PK_Bitacora] PRIMARY KEY CLUSTERED 
(
	[BitacoraId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[TipoActividad]    Script Date: 9/9/2015 3:54:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TipoActividad](
	[TipoActividadID] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [nvarchar](100) NOT NULL,
	[Activo] [bit] NOT NULL,
 CONSTRAINT [PK_TipoActividad] PRIMARY KEY CLUSTERED 
(
	[TipoActividadID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET IDENTITY_INSERT [dbo].[Bitacora] ON 

INSERT [dbo].[Bitacora] ([BitacoraId], [UsuarioId], [TipoActividadID], [Mensaje], [Fecha], [EntidadId]) VALUES (5, 1, 1, N'Mensaje de prueba bitacora', CAST(0x0000A4B101007348 AS DateTime), 1)
INSERT [dbo].[Bitacora] ([BitacoraId], [UsuarioId], [TipoActividadID], [Mensaje], [Fecha], [EntidadId]) VALUES (6, 1, 1, N'Mensaje de prueba bitacora', CAST(0x0000A4B10100735F AS DateTime), 1)
INSERT [dbo].[Bitacora] ([BitacoraId], [UsuarioId], [TipoActividadID], [Mensaje], [Fecha], [EntidadId]) VALUES (7, 1, 1, N'Mensaje de prueba bitacora', CAST(0x0000A4B10100735F AS DateTime), 1)
INSERT [dbo].[Bitacora] ([BitacoraId], [UsuarioId], [TipoActividadID], [Mensaje], [Fecha], [EntidadId]) VALUES (8, 1, 1, N'Mensaje de prueba bitacora', CAST(0x0000A4B101007360 AS DateTime), 1)
INSERT [dbo].[Bitacora] ([BitacoraId], [UsuarioId], [TipoActividadID], [Mensaje], [Fecha], [EntidadId]) VALUES (9, 1, 1, N'Mensaje de prueba bitacora', CAST(0x0000A4B101007360 AS DateTime), 1)
INSERT [dbo].[Bitacora] ([BitacoraId], [UsuarioId], [TipoActividadID], [Mensaje], [Fecha], [EntidadId]) VALUES (10, 1, 1, N'Mensaje de prueba bitacora', CAST(0x0000A4B101007360 AS DateTime), 1)
INSERT [dbo].[Bitacora] ([BitacoraId], [UsuarioId], [TipoActividadID], [Mensaje], [Fecha], [EntidadId]) VALUES (11, 1, 1, N'Mensaje de prueba bitacora', CAST(0x0000A4B101007360 AS DateTime), 1)
INSERT [dbo].[Bitacora] ([BitacoraId], [UsuarioId], [TipoActividadID], [Mensaje], [Fecha], [EntidadId]) VALUES (12, 1, 1, N'Mensaje de prueba bitacora', CAST(0x0000A4B101007360 AS DateTime), 1)
INSERT [dbo].[Bitacora] ([BitacoraId], [UsuarioId], [TipoActividadID], [Mensaje], [Fecha], [EntidadId]) VALUES (13, 1, 1, N'Mensaje de prueba bitacora', CAST(0x0000A4B101007360 AS DateTime), 1)
INSERT [dbo].[Bitacora] ([BitacoraId], [UsuarioId], [TipoActividadID], [Mensaje], [Fecha], [EntidadId]) VALUES (14, 1, 1, N'Mensaje de prueba bitacora', CAST(0x0000A4B101007360 AS DateTime), 1)
INSERT [dbo].[Bitacora] ([BitacoraId], [UsuarioId], [TipoActividadID], [Mensaje], [Fecha], [EntidadId]) VALUES (1003, 2, 2, N'Mensaje bitacora', CAST(0x0000A4B200E8B5FE AS DateTime), 2)
INSERT [dbo].[Bitacora] ([BitacoraId], [UsuarioId], [TipoActividadID], [Mensaje], [Fecha], [EntidadId]) VALUES (1004, 2, 2, N'Mensaje bitacora', CAST(0x0000A4B200E8B5FE AS DateTime), 2)
INSERT [dbo].[Bitacora] ([BitacoraId], [UsuarioId], [TipoActividadID], [Mensaje], [Fecha], [EntidadId]) VALUES (1005, 2, 2, N'Mensaje bitacora', CAST(0x0000A4B200E8B5FE AS DateTime), 2)
INSERT [dbo].[Bitacora] ([BitacoraId], [UsuarioId], [TipoActividadID], [Mensaje], [Fecha], [EntidadId]) VALUES (1006, 2, 2, N'Mensaje bitacora', CAST(0x0000A4B200E8B5FE AS DateTime), 2)
INSERT [dbo].[Bitacora] ([BitacoraId], [UsuarioId], [TipoActividadID], [Mensaje], [Fecha], [EntidadId]) VALUES (1007, 2, 2, N'Mensaje bitacora', CAST(0x0000A4B200E8B5FE AS DateTime), 2)
INSERT [dbo].[Bitacora] ([BitacoraId], [UsuarioId], [TipoActividadID], [Mensaje], [Fecha], [EntidadId]) VALUES (1008, 2, 2, N'Mensaje bitacora', CAST(0x0000A4B200E8B5FE AS DateTime), 2)
INSERT [dbo].[Bitacora] ([BitacoraId], [UsuarioId], [TipoActividadID], [Mensaje], [Fecha], [EntidadId]) VALUES (1009, 2, 2, N'Mensaje bitacora', CAST(0x0000A4B200E8B5FE AS DateTime), 2)
INSERT [dbo].[Bitacora] ([BitacoraId], [UsuarioId], [TipoActividadID], [Mensaje], [Fecha], [EntidadId]) VALUES (1010, 2, 2, N'Mensaje bitacora', CAST(0x0000A4B200E8B5FE AS DateTime), 2)
INSERT [dbo].[Bitacora] ([BitacoraId], [UsuarioId], [TipoActividadID], [Mensaje], [Fecha], [EntidadId]) VALUES (1011, 2, 2, N'Mensaje bitacora', CAST(0x0000A4B200E8B5FE AS DateTime), 2)
INSERT [dbo].[Bitacora] ([BitacoraId], [UsuarioId], [TipoActividadID], [Mensaje], [Fecha], [EntidadId]) VALUES (1012, 2, 2, N'Mensaje bitacora', CAST(0x0000A4B200E8B5FE AS DateTime), 2)
INSERT [dbo].[Bitacora] ([BitacoraId], [UsuarioId], [TipoActividadID], [Mensaje], [Fecha], [EntidadId]) VALUES (1019, 1, 1, N'Error al enviar notificacion', CAST(0x0000A4F700ED8A9B AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[Bitacora] OFF
SET IDENTITY_INSERT [dbo].[TipoActividad] ON 

INSERT [dbo].[TipoActividad] ([TipoActividadID], [Nombre], [Activo]) VALUES (1, N'prueba', 1)
INSERT [dbo].[TipoActividad] ([TipoActividadID], [Nombre], [Activo]) VALUES (2, N'prueba 2', 1)
SET IDENTITY_INSERT [dbo].[TipoActividad] OFF
ALTER TABLE [dbo].[Bitacora]  WITH CHECK ADD  CONSTRAINT [FK_Bitacora_TipoActividad] FOREIGN KEY([TipoActividadID])
REFERENCES [dbo].[TipoActividad] ([TipoActividadID])
GO
ALTER TABLE [dbo].[Bitacora] CHECK CONSTRAINT [FK_Bitacora_TipoActividad]
GO
USE [master]
GO
ALTER DATABASE [steelgo-samlogging] SET  READ_WRITE 
GO
