USE [steelgo-sam3]
GO

/****** Object:  Table [dbo].[Sam3_Catalogos]    Script Date: 10/2/2015 7:14:01 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[Sam3_Catalogos](
	[CatalogoID] [int] IDENTITY(1,1) NOT NULL,
	[CatalogoNombre] [varchar](50) NOT NULL,
	[Activo] [bit] NOT NULL,
	[UsuarioModificacion] [int] NULL,
	[FechaModificacion] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[CatalogoID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

