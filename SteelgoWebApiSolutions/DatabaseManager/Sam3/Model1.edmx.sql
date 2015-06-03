
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 06/03/2015 11:00:41
-- Generated from EDMX file: C:\Users\daniela.zertuche\Documents\GitHub\SAM3.0\SteelgoWebApiSolutions\DatabaseManager\Sam3\Model1.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [steelgo-sam3];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[FK__Rel_Usuario_Proyecto_Usuario]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Rel_Usuario_Proyecto] DROP CONSTRAINT [FK__Rel_Usuario_Proyecto_Usuario];
GO
IF OBJECT_ID(N'[dbo].[FK_Acero_FamiliaAcero]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Acero] DROP CONSTRAINT [FK_Acero_FamiliaAcero];
GO
IF OBJECT_ID(N'[dbo].[FK_Bitacora_Entidad]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Bitacora] DROP CONSTRAINT [FK_Bitacora_Entidad];
GO
IF OBJECT_ID(N'[dbo].[FK_Bitacora_TipoActividad]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Bitacora] DROP CONSTRAINT [FK_Bitacora_TipoActividad];
GO
IF OBJECT_ID(N'[dbo].[FK_Bitacora_Usuario]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Bitacora] DROP CONSTRAINT [FK_Bitacora_Usuario];
GO
IF OBJECT_ID(N'[dbo].[FK_Camion_Chofer]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Camion] DROP CONSTRAINT [FK_Camion_Chofer];
GO
IF OBJECT_ID(N'[dbo].[FK_Camion_Entidad]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Camion] DROP CONSTRAINT [FK_Camion_Entidad];
GO
IF OBJECT_ID(N'[dbo].[FK_Camion_FolioLlegada]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[PackingList] DROP CONSTRAINT [FK_Camion_FolioLlegada];
GO
IF OBJECT_ID(N'[dbo].[FK_Camion_PackingList]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[PackingList] DROP CONSTRAINT [FK_Camion_PackingList];
GO
IF OBJECT_ID(N'[dbo].[FK_Camion_Transportista]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Camion] DROP CONSTRAINT [FK_Camion_Transportista];
GO
IF OBJECT_ID(N'[dbo].[FK_Colada_Acero]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Colada] DROP CONSTRAINT [FK_Colada_Acero];
GO
IF OBJECT_ID(N'[dbo].[FK_Colada_Fabricante]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Colada] DROP CONSTRAINT [FK_Colada_Fabricante];
GO
IF OBJECT_ID(N'[dbo].[FK_Colada_Proyecto]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Colada] DROP CONSTRAINT [FK_Colada_Proyecto];
GO
IF OBJECT_ID(N'[dbo].[FK_Corte_NumeroUnicoCorte]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Corte] DROP CONSTRAINT [FK_Corte_NumeroUnicoCorte];
GO
IF OBJECT_ID(N'[dbo].[FK_Corte_NumeroUnicoMovimiento_Merma]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Corte] DROP CONSTRAINT [FK_Corte_NumeroUnicoMovimiento_Merma];
GO
IF OBJECT_ID(N'[dbo].[FK_Corte_NumeroUnicoMovimiento_Preparacion]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Corte] DROP CONSTRAINT [FK_Corte_NumeroUnicoMovimiento_Preparacion];
GO
IF OBJECT_ID(N'[dbo].[FK_Corte_Proyecto]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Corte] DROP CONSTRAINT [FK_Corte_Proyecto];
GO
IF OBJECT_ID(N'[dbo].[FK_CorteDetalle_Corte]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[CorteDetalle] DROP CONSTRAINT [FK_CorteDetalle_Corte];
GO
IF OBJECT_ID(N'[dbo].[FK_CorteDetalle_Maquina]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[CorteDetalle] DROP CONSTRAINT [FK_CorteDetalle_Maquina];
GO
IF OBJECT_ID(N'[dbo].[FK_CorteDetalle_MaterialSpool]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[CorteDetalle] DROP CONSTRAINT [FK_CorteDetalle_MaterialSpool];
GO
IF OBJECT_ID(N'[dbo].[FK_CorteDetalle_NumeroUnicoMovimiento]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[CorteDetalle] DROP CONSTRAINT [FK_CorteDetalle_NumeroUnicoMovimiento];
GO
IF OBJECT_ID(N'[dbo].[FK_CorteDetalle_OrdenTrabajoSpool]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[CorteDetalle] DROP CONSTRAINT [FK_CorteDetalle_OrdenTrabajoSpool];
GO
IF OBJECT_ID(N'[dbo].[FK_Despacho_MaterialSpool]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Despacho] DROP CONSTRAINT [FK_Despacho_MaterialSpool];
GO
IF OBJECT_ID(N'[dbo].[FK_Despacho_NumeroUnico]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Despacho] DROP CONSTRAINT [FK_Despacho_NumeroUnico];
GO
IF OBJECT_ID(N'[dbo].[FK_Despacho_NumeroUnicoMovimiento]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Despacho] DROP CONSTRAINT [FK_Despacho_NumeroUnicoMovimiento];
GO
IF OBJECT_ID(N'[dbo].[FK_Despacho_OrdenTrabajoSpool]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Despacho] DROP CONSTRAINT [FK_Despacho_OrdenTrabajoSpool];
GO
IF OBJECT_ID(N'[dbo].[FK_Despacho_Proyecto]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Despacho] DROP CONSTRAINT [FK_Despacho_Proyecto];
GO
IF OBJECT_ID(N'[dbo].[FK_Entidad_Perfil]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Entidad] DROP CONSTRAINT [FK_Entidad_Perfil];
GO
IF OBJECT_ID(N'[dbo].[FK_ExtensionDocumento_Entidad]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[ExtensionDocumento] DROP CONSTRAINT [FK_ExtensionDocumento_Entidad];
GO
IF OBJECT_ID(N'[dbo].[FK_Fabricante_Contacto]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Fabricante] DROP CONSTRAINT [FK_Fabricante_Contacto];
GO
IF OBJECT_ID(N'[dbo].[FK_FamiliaAcero_FamiliaMaterial]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[FamiliaAcero] DROP CONSTRAINT [FK_FamiliaAcero_FamiliaMaterial];
GO
IF OBJECT_ID(N'[dbo].[FK_FamiliaItemCode_Entidad]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[FamiliaItemCode] DROP CONSTRAINT [FK_FamiliaItemCode_Entidad];
GO
IF OBJECT_ID(N'[dbo].[FK_FolioAvisoLlegada_Camion]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[FolioAvisoLlegada] DROP CONSTRAINT [FK_FolioAvisoLlegada_Camion];
GO
IF OBJECT_ID(N'[dbo].[FK_FolioAvisoLlegada_Entidad]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[FolioAvisoLlegada] DROP CONSTRAINT [FK_FolioAvisoLlegada_Entidad];
GO
IF OBJECT_ID(N'[dbo].[FK_FolioLlegada_Entidad]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[FolioLlegada] DROP CONSTRAINT [FK_FolioLlegada_Entidad];
GO
IF OBJECT_ID(N'[dbo].[FK_FolioLlegada_FolioAvisoLlegada]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[FolioLlegada] DROP CONSTRAINT [FK_FolioLlegada_FolioAvisoLlegada];
GO
IF OBJECT_ID(N'[dbo].[FK_FolioPackingList_Entidad]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[FolioPackingList] DROP CONSTRAINT [FK_FolioPackingList_Entidad];
GO
IF OBJECT_ID(N'[dbo].[FK_FolioPackingList_FolioLlegada]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[FolioPackingList] DROP CONSTRAINT [FK_FolioPackingList_FolioLlegada];
GO
IF OBJECT_ID(N'[dbo].[FK_FolioPackingList_PackingList]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[FolioPackingList] DROP CONSTRAINT [FK_FolioPackingList_PackingList];
GO
IF OBJECT_ID(N'[dbo].[FK_Incidencia_Entidad]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Incidencia] DROP CONSTRAINT [FK_Incidencia_Entidad];
GO
IF OBJECT_ID(N'[dbo].[FK_Incidencia_Incidencia]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Incidencia] DROP CONSTRAINT [FK_Incidencia_Incidencia];
GO
IF OBJECT_ID(N'[dbo].[FK_Incidencia_Usuario]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Incidencia] DROP CONSTRAINT [FK_Incidencia_Usuario];
GO
IF OBJECT_ID(N'[dbo].[FK_Incidencia_UsuarioRespuesta]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Incidencia] DROP CONSTRAINT [FK_Incidencia_UsuarioRespuesta];
GO
IF OBJECT_ID(N'[dbo].[FK_ItemCode_FamiliaAcero]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[ItemCode] DROP CONSTRAINT [FK_ItemCode_FamiliaAcero];
GO
IF OBJECT_ID(N'[dbo].[FK_ItemCode_Proyecto]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[ItemCode] DROP CONSTRAINT [FK_ItemCode_Proyecto];
GO
IF OBJECT_ID(N'[dbo].[FK_ItemCode_TipoMaterial]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[ItemCode] DROP CONSTRAINT [FK_ItemCode_TipoMaterial];
GO
IF OBJECT_ID(N'[dbo].[FK_Maquina_Patio]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Maquina] DROP CONSTRAINT [FK_Maquina_Patio];
GO
IF OBJECT_ID(N'[dbo].[FK_MaterialSpool_ItemCode]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[MaterialSpool] DROP CONSTRAINT [FK_MaterialSpool_ItemCode];
GO
IF OBJECT_ID(N'[dbo].[FK_MaterialSpool_Spool]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[MaterialSpool] DROP CONSTRAINT [FK_MaterialSpool_Spool];
GO
IF OBJECT_ID(N'[dbo].[FK_MenuContextual_Entidad]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[MenuContextual] DROP CONSTRAINT [FK_MenuContextual_Entidad];
GO
IF OBJECT_ID(N'[dbo].[FK_Notificacion_Entidad]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Notificacion] DROP CONSTRAINT [FK_Notificacion_Entidad];
GO
IF OBJECT_ID(N'[dbo].[FK_Notificacion_TipoNotificacion]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Notificacion] DROP CONSTRAINT [FK_Notificacion_TipoNotificacion];
GO
IF OBJECT_ID(N'[dbo].[FK_Notificacion_UsuarioEmisor]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Notificacion] DROP CONSTRAINT [FK_Notificacion_UsuarioEmisor];
GO
IF OBJECT_ID(N'[dbo].[FK_Notificacion_UsurioReceptopr]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Notificacion] DROP CONSTRAINT [FK_Notificacion_UsurioReceptopr];
GO
IF OBJECT_ID(N'[dbo].[FK_NumeroUnico_Colada]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[NumeroUnico] DROP CONSTRAINT [FK_NumeroUnico_Colada];
GO
IF OBJECT_ID(N'[dbo].[FK_NumeroUnico_Entidad]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[NumeroUnico] DROP CONSTRAINT [FK_NumeroUnico_Entidad];
GO
IF OBJECT_ID(N'[dbo].[FK_NumeroUnico_Fabricante]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[NumeroUnico] DROP CONSTRAINT [FK_NumeroUnico_Fabricante];
GO
IF OBJECT_ID(N'[dbo].[FK_NumeroUnico_ItemCode]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[NumeroUnico] DROP CONSTRAINT [FK_NumeroUnico_ItemCode];
GO
IF OBJECT_ID(N'[dbo].[FK_NumeroUnico_Proveedor]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[NumeroUnico] DROP CONSTRAINT [FK_NumeroUnico_Proveedor];
GO
IF OBJECT_ID(N'[dbo].[FK_NumeroUnico_Proyecto]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[NumeroUnico] DROP CONSTRAINT [FK_NumeroUnico_Proyecto];
GO
IF OBJECT_ID(N'[dbo].[FK_NumeroUnico_Recepcion]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[NumeroUnico] DROP CONSTRAINT [FK_NumeroUnico_Recepcion];
GO
IF OBJECT_ID(N'[dbo].[FK_NumeroUnico_TipoCorte_1]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[NumeroUnico] DROP CONSTRAINT [FK_NumeroUnico_TipoCorte_1];
GO
IF OBJECT_ID(N'[dbo].[FK_NumeroUnico_TipoCorte_2]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[NumeroUnico] DROP CONSTRAINT [FK_NumeroUnico_TipoCorte_2];
GO
IF OBJECT_ID(N'[dbo].[FK_NumeroUnicoCorte_NumeroUnico]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[NumeroUnicoCorte] DROP CONSTRAINT [FK_NumeroUnicoCorte_NumeroUnico];
GO
IF OBJECT_ID(N'[dbo].[FK_NumeroUnicoCorte_NumeroUnicoMovimiento]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[NumeroUnicoCorte] DROP CONSTRAINT [FK_NumeroUnicoCorte_NumeroUnicoMovimiento];
GO
IF OBJECT_ID(N'[dbo].[FK_NumeroUnicoCorte_OrdenTrabajo]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[NumeroUnicoCorte] DROP CONSTRAINT [FK_NumeroUnicoCorte_OrdenTrabajo];
GO
IF OBJECT_ID(N'[dbo].[FK_NumeroUnicoCorte_Proyecto]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[NumeroUnicoCorte] DROP CONSTRAINT [FK_NumeroUnicoCorte_Proyecto];
GO
IF OBJECT_ID(N'[dbo].[FK_NumeroUnicoCorte_UbicacionFisica]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[NumeroUnicoCorte] DROP CONSTRAINT [FK_NumeroUnicoCorte_UbicacionFisica];
GO
IF OBJECT_ID(N'[dbo].[FK_NumeroUnicoInventario_Entidad]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[NumeroUnicoInventario] DROP CONSTRAINT [FK_NumeroUnicoInventario_Entidad];
GO
IF OBJECT_ID(N'[dbo].[FK_NumeroUnicoInventario_Proyecto]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[NumeroUnicoInventario] DROP CONSTRAINT [FK_NumeroUnicoInventario_Proyecto];
GO
IF OBJECT_ID(N'[dbo].[FK_NumeroUnicoMovimiento_Entidad]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[NumeroUnicoMovimiento] DROP CONSTRAINT [FK_NumeroUnicoMovimiento_Entidad];
GO
IF OBJECT_ID(N'[dbo].[FK_NumeroUnicoMovimiento_NumeroUnico]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[NumeroUnicoMovimiento] DROP CONSTRAINT [FK_NumeroUnicoMovimiento_NumeroUnico];
GO
IF OBJECT_ID(N'[dbo].[FK_NumeroUnicoMovimiento_Proyecto]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[NumeroUnicoMovimiento] DROP CONSTRAINT [FK_NumeroUnicoMovimiento_Proyecto];
GO
IF OBJECT_ID(N'[dbo].[FK_NumeroUnicoMovimiento_TipoMovimiento]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[NumeroUnicoMovimiento] DROP CONSTRAINT [FK_NumeroUnicoMovimiento_TipoMovimiento];
GO
IF OBJECT_ID(N'[dbo].[FK_NumeroUnicoSegmento_Entidad]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[NumeroUnicoSegmento] DROP CONSTRAINT [FK_NumeroUnicoSegmento_Entidad];
GO
IF OBJECT_ID(N'[dbo].[FK_NumeroUnicoSegmento_NumeroUnico]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[NumeroUnicoSegmento] DROP CONSTRAINT [FK_NumeroUnicoSegmento_NumeroUnico];
GO
IF OBJECT_ID(N'[dbo].[FK_NumeroUnicoSegmento_Proyecto]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[NumeroUnicoSegmento] DROP CONSTRAINT [FK_NumeroUnicoSegmento_Proyecto];
GO
IF OBJECT_ID(N'[dbo].[FK_OrdenTrabajo_EstatusOrden]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[OrdenTrabajo] DROP CONSTRAINT [FK_OrdenTrabajo_EstatusOrden];
GO
IF OBJECT_ID(N'[dbo].[FK_OrdenTrabajo_Proyecto]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[OrdenTrabajo] DROP CONSTRAINT [FK_OrdenTrabajo_Proyecto];
GO
IF OBJECT_ID(N'[dbo].[FK_OrdenTrabajo_Taller]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[OrdenTrabajo] DROP CONSTRAINT [FK_OrdenTrabajo_Taller];
GO
IF OBJECT_ID(N'[dbo].[FK_OrdenTrabajoSpool_OrdenTrabajo]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[OrdenTrabajoSpool] DROP CONSTRAINT [FK_OrdenTrabajoSpool_OrdenTrabajo];
GO
IF OBJECT_ID(N'[dbo].[FK_OrdenTrabajoSpool_Spool]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[OrdenTrabajoSpool] DROP CONSTRAINT [FK_OrdenTrabajoSpool_Spool];
GO
IF OBJECT_ID(N'[dbo].[FK_PackingList_Entidad]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[PackingList] DROP CONSTRAINT [FK_PackingList_Entidad];
GO
IF OBJECT_ID(N'[dbo].[FK_PackingList_Proyecto]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[PackingList] DROP CONSTRAINT [FK_PackingList_Proyecto];
GO
IF OBJECT_ID(N'[dbo].[FK_Pagina_Entidad]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Pagina] DROP CONSTRAINT [FK_Pagina_Entidad];
GO
IF OBJECT_ID(N'[dbo].[FK_Perfil_Entidad]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Perfil] DROP CONSTRAINT [FK_Perfil_Entidad];
GO
IF OBJECT_ID(N'[dbo].[FK_PermisoAduana_Entidad]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[PermisoAduana] DROP CONSTRAINT [FK_PermisoAduana_Entidad];
GO
IF OBJECT_ID(N'[dbo].[FK_PermisoAduana_FolioAvisoLlegada]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[PermisoAduana] DROP CONSTRAINT [FK_PermisoAduana_FolioAvisoLlegada];
GO
IF OBJECT_ID(N'[dbo].[FK_PinturaNumeroUnico_NumeroUnico]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[PinturaNumeroUnico] DROP CONSTRAINT [FK_PinturaNumeroUnico_NumeroUnico];
GO
IF OBJECT_ID(N'[dbo].[FK_PinturaNumeroUnico_Proyecto]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[PinturaNumeroUnico] DROP CONSTRAINT [FK_PinturaNumeroUnico_Proyecto];
GO
IF OBJECT_ID(N'[dbo].[FK_PinturaNumeroUnico_RequisicionNumeroUnicoDetalleID]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[PinturaNumeroUnico] DROP CONSTRAINT [FK_PinturaNumeroUnico_RequisicionNumeroUnicoDetalleID];
GO
IF OBJECT_ID(N'[dbo].[FK_Plana_Camion]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Plana] DROP CONSTRAINT [FK_Plana_Camion];
GO
IF OBJECT_ID(N'[dbo].[FK_Plana_Entidad]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Plana] DROP CONSTRAINT [FK_Plana_Entidad];
GO
IF OBJECT_ID(N'[dbo].[FK_Preferencia_Entidad]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Preferencia] DROP CONSTRAINT [FK_Preferencia_Entidad];
GO
IF OBJECT_ID(N'[dbo].[FK_Propiedad_Entidad]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Propiedad] DROP CONSTRAINT [FK_Propiedad_Entidad];
GO
IF OBJECT_ID(N'[dbo].[FK_Proveedor_Contacto]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Proveedor] DROP CONSTRAINT [FK_Proveedor_Contacto];
GO
IF OBJECT_ID(N'[dbo].[FK_Proyecto_Cliente]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Proyecto] DROP CONSTRAINT [FK_Proyecto_Cliente];
GO
IF OBJECT_ID(N'[dbo].[FK_Proyecto_Color]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Proyecto] DROP CONSTRAINT [FK_Proyecto_Color];
GO
IF OBJECT_ID(N'[dbo].[FK_Proyecto_Contacto]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Proyecto] DROP CONSTRAINT [FK_Proyecto_Contacto];
GO
IF OBJECT_ID(N'[dbo].[FK_Proyecto_Patio]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Proyecto] DROP CONSTRAINT [FK_Proyecto_Patio];
GO
IF OBJECT_ID(N'[dbo].[FK_Recepcion_Entidad]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Recepcion] DROP CONSTRAINT [FK_Recepcion_Entidad];
GO
IF OBJECT_ID(N'[dbo].[FK_Recepcion_FamiliaItemCode]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Recepcion] DROP CONSTRAINT [FK_Recepcion_FamiliaItemCode];
GO
IF OBJECT_ID(N'[dbo].[FK_Recepcion_FolioPackingList]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Recepcion] DROP CONSTRAINT [FK_Recepcion_FolioPackingList];
GO
IF OBJECT_ID(N'[dbo].[FK_Rel_Documento_Entidad_Entidad]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Rel_Documento_Entidad] DROP CONSTRAINT [FK_Rel_Documento_Entidad_Entidad];
GO
IF OBJECT_ID(N'[dbo].[FK_Rel_DocumentoEntidad_Repositorio]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Rel_Documento_Entidad] DROP CONSTRAINT [FK_Rel_DocumentoEntidad_Repositorio];
GO
IF OBJECT_ID(N'[dbo].[FK_Rel_FolioAvisoLlegada_Proyecto_Entidad]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Rel_FolioAvisoLlegada_Proyecto] DROP CONSTRAINT [FK_Rel_FolioAvisoLlegada_Proyecto_Entidad];
GO
IF OBJECT_ID(N'[dbo].[FK_Rel_IncidenciaEntidad_Entidad]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Rel_Incidencia_Entidad] DROP CONSTRAINT [FK_Rel_IncidenciaEntidad_Entidad];
GO
IF OBJECT_ID(N'[dbo].[FK_Rel_PerfilPropiedadPagina_Entidad]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Rel_Perfil_Propiedad_Pagina] DROP CONSTRAINT [FK_Rel_PerfilPropiedadPagina_Entidad];
GO
IF OBJECT_ID(N'[dbo].[FK_Rel_Repositorio_Entidad]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Repositorio] DROP CONSTRAINT [FK_Rel_Repositorio_Entidad];
GO
IF OBJECT_ID(N'[dbo].[FK_Rel_Usuario_Preferencia_Entidad]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Rel_Usuario_Preferencia] DROP CONSTRAINT [FK_Rel_Usuario_Preferencia_Entidad];
GO
IF OBJECT_ID(N'[dbo].[FK_Rel_Usuario_Preferencia_Preferencia]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Rel_Usuario_Preferencia] DROP CONSTRAINT [FK_Rel_Usuario_Preferencia_Preferencia];
GO
IF OBJECT_ID(N'[dbo].[FK_Rel_UsuarioProyecto_Entidad]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Rel_Usuario_Proyecto] DROP CONSTRAINT [FK_Rel_UsuarioProyecto_Entidad];
GO
IF OBJECT_ID(N'[dbo].[FK_RelDocumentoEntidad_Usuario]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Rel_Documento_Entidad] DROP CONSTRAINT [FK_RelDocumentoEntidad_Usuario];
GO
IF OBJECT_ID(N'[dbo].[FK_RelFolioAvisoLlegadaProyecto_Proyecto]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Rel_FolioAvisoLlegada_Proyecto] DROP CONSTRAINT [FK_RelFolioAvisoLlegadaProyecto_Proyecto];
GO
IF OBJECT_ID(N'[dbo].[FK_RequisicionNumeroUnico_Entidad]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[RequisicionNumeroUnico] DROP CONSTRAINT [FK_RequisicionNumeroUnico_Entidad];
GO
IF OBJECT_ID(N'[dbo].[FK_RequisicionNumeroUnico_Proyecto]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[RequisicionNumeroUnico] DROP CONSTRAINT [FK_RequisicionNumeroUnico_Proyecto];
GO
IF OBJECT_ID(N'[dbo].[FK_RequisicionNumeroUnicoDetalle_Entidad]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[RequisicionNumeroUnicoDetalle] DROP CONSTRAINT [FK_RequisicionNumeroUnicoDetalle_Entidad];
GO
IF OBJECT_ID(N'[dbo].[FK_RequisicionNumeroUnicoDetalle_NumeroUnico]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[RequisicionNumeroUnicoDetalle] DROP CONSTRAINT [FK_RequisicionNumeroUnicoDetalle_NumeroUnico];
GO
IF OBJECT_ID(N'[dbo].[FK_RequisicionNumeroUnicoDetalle_RequisicionNumeroUnico]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[RequisicionNumeroUnicoDetalle] DROP CONSTRAINT [FK_RequisicionNumeroUnicoDetalle_RequisicionNumeroUnico];
GO
IF OBJECT_ID(N'[dbo].[FK_Sesion_Entidad]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Sesion] DROP CONSTRAINT [FK_Sesion_Entidad];
GO
IF OBJECT_ID(N'[dbo].[FK_Sesion_Usuario]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Sesion] DROP CONSTRAINT [FK_Sesion_Usuario];
GO
IF OBJECT_ID(N'[dbo].[FK_Spool_FamiliaAcero_1]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Spool] DROP CONSTRAINT [FK_Spool_FamiliaAcero_1];
GO
IF OBJECT_ID(N'[dbo].[FK_Spool_FamiliaAcero_2]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Spool] DROP CONSTRAINT [FK_Spool_FamiliaAcero_2];
GO
IF OBJECT_ID(N'[dbo].[FK_Spool_Proyecto]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Spool] DROP CONSTRAINT [FK_Spool_Proyecto];
GO
IF OBJECT_ID(N'[dbo].[FK_Taller_Patio]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Taller] DROP CONSTRAINT [FK_Taller_Patio];
GO
IF OBJECT_ID(N'[dbo].[FK_TipoActividad_Entidad]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[TipoActividad] DROP CONSTRAINT [FK_TipoActividad_Entidad];
GO
IF OBJECT_ID(N'[dbo].[FK_TipoDocumento_Entidad]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[TipoDocumento] DROP CONSTRAINT [FK_TipoDocumento_Entidad];
GO
IF OBJECT_ID(N'[dbo].[FK_TipoMovimiento_Entidad]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[TipoMovimiento] DROP CONSTRAINT [FK_TipoMovimiento_Entidad];
GO
IF OBJECT_ID(N'[dbo].[FK_TipoNotificacion_Entidad]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[TipoNotificacion] DROP CONSTRAINT [FK_TipoNotificacion_Entidad];
GO
IF OBJECT_ID(N'[dbo].[FK_Transportista_Contacto]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Transportista] DROP CONSTRAINT [FK_Transportista_Contacto];
GO
IF OBJECT_ID(N'[dbo].[FK_UbicacionFisica_Patio]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[UbicacionFisica] DROP CONSTRAINT [FK_UbicacionFisica_Patio];
GO
IF OBJECT_ID(N'[dbo].[FK_Usuario_Entidad]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Usuario] DROP CONSTRAINT [FK_Usuario_Entidad];
GO
IF OBJECT_ID(N'[dbo].[FK_Usuario_Perfil]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Usuario] DROP CONSTRAINT [FK_Usuario_Perfil];
GO

-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[Acero]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Acero];
GO
IF OBJECT_ID(N'[dbo].[Bitacora]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Bitacora];
GO
IF OBJECT_ID(N'[dbo].[Camion]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Camion];
GO
IF OBJECT_ID(N'[dbo].[Chofer]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Chofer];
GO
IF OBJECT_ID(N'[dbo].[Cliente]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Cliente];
GO
IF OBJECT_ID(N'[dbo].[Colada]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Colada];
GO
IF OBJECT_ID(N'[dbo].[Color]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Color];
GO
IF OBJECT_ID(N'[dbo].[Contacto]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Contacto];
GO
IF OBJECT_ID(N'[dbo].[Corte]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Corte];
GO
IF OBJECT_ID(N'[dbo].[CorteDetalle]', 'U') IS NOT NULL
    DROP TABLE [dbo].[CorteDetalle];
GO
IF OBJECT_ID(N'[dbo].[Despacho]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Despacho];
GO
IF OBJECT_ID(N'[dbo].[Diametro]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Diametro];
GO
IF OBJECT_ID(N'[dbo].[Entidad]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Entidad];
GO
IF OBJECT_ID(N'[dbo].[EstatusOrden]', 'U') IS NOT NULL
    DROP TABLE [dbo].[EstatusOrden];
GO
IF OBJECT_ID(N'[dbo].[ExtensionDocumento]', 'U') IS NOT NULL
    DROP TABLE [dbo].[ExtensionDocumento];
GO
IF OBJECT_ID(N'[dbo].[Fabricante]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Fabricante];
GO
IF OBJECT_ID(N'[dbo].[FamiliaAcero]', 'U') IS NOT NULL
    DROP TABLE [dbo].[FamiliaAcero];
GO
IF OBJECT_ID(N'[dbo].[FamiliaItemCode]', 'U') IS NOT NULL
    DROP TABLE [dbo].[FamiliaItemCode];
GO
IF OBJECT_ID(N'[dbo].[FamiliaMaterial]', 'U') IS NOT NULL
    DROP TABLE [dbo].[FamiliaMaterial];
GO
IF OBJECT_ID(N'[dbo].[FolioAvisoLlegada]', 'U') IS NOT NULL
    DROP TABLE [dbo].[FolioAvisoLlegada];
GO
IF OBJECT_ID(N'[dbo].[FolioLlegada]', 'U') IS NOT NULL
    DROP TABLE [dbo].[FolioLlegada];
GO
IF OBJECT_ID(N'[dbo].[FolioPackingList]', 'U') IS NOT NULL
    DROP TABLE [dbo].[FolioPackingList];
GO
IF OBJECT_ID(N'[dbo].[Incidencia]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Incidencia];
GO
IF OBJECT_ID(N'[dbo].[ItemCode]', 'U') IS NOT NULL
    DROP TABLE [dbo].[ItemCode];
GO
IF OBJECT_ID(N'[dbo].[Maquina]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Maquina];
GO
IF OBJECT_ID(N'[dbo].[MaterialSpool]', 'U') IS NOT NULL
    DROP TABLE [dbo].[MaterialSpool];
GO
IF OBJECT_ID(N'[dbo].[MenuContextual]', 'U') IS NOT NULL
    DROP TABLE [dbo].[MenuContextual];
GO
IF OBJECT_ID(N'[dbo].[MenuGeneral]', 'U') IS NOT NULL
    DROP TABLE [dbo].[MenuGeneral];
GO
IF OBJECT_ID(N'[dbo].[Notificacion]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Notificacion];
GO
IF OBJECT_ID(N'[dbo].[NumeroUnico]', 'U') IS NOT NULL
    DROP TABLE [dbo].[NumeroUnico];
GO
IF OBJECT_ID(N'[dbo].[NumeroUnicoCorte]', 'U') IS NOT NULL
    DROP TABLE [dbo].[NumeroUnicoCorte];
GO
IF OBJECT_ID(N'[dbo].[NumeroUnicoInventario]', 'U') IS NOT NULL
    DROP TABLE [dbo].[NumeroUnicoInventario];
GO
IF OBJECT_ID(N'[dbo].[NumeroUnicoMovimiento]', 'U') IS NOT NULL
    DROP TABLE [dbo].[NumeroUnicoMovimiento];
GO
IF OBJECT_ID(N'[dbo].[NumeroUnicoSegmento]', 'U') IS NOT NULL
    DROP TABLE [dbo].[NumeroUnicoSegmento];
GO
IF OBJECT_ID(N'[dbo].[OrdenTrabajo]', 'U') IS NOT NULL
    DROP TABLE [dbo].[OrdenTrabajo];
GO
IF OBJECT_ID(N'[dbo].[OrdenTrabajoSpool]', 'U') IS NOT NULL
    DROP TABLE [dbo].[OrdenTrabajoSpool];
GO
IF OBJECT_ID(N'[dbo].[PackingList]', 'U') IS NOT NULL
    DROP TABLE [dbo].[PackingList];
GO
IF OBJECT_ID(N'[dbo].[Pagina]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Pagina];
GO
IF OBJECT_ID(N'[dbo].[Patio]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Patio];
GO
IF OBJECT_ID(N'[dbo].[Perfil]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Perfil];
GO
IF OBJECT_ID(N'[dbo].[PermisoAduana]', 'U') IS NOT NULL
    DROP TABLE [dbo].[PermisoAduana];
GO
IF OBJECT_ID(N'[dbo].[PinturaNumeroUnico]', 'U') IS NOT NULL
    DROP TABLE [dbo].[PinturaNumeroUnico];
GO
IF OBJECT_ID(N'[dbo].[Plana]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Plana];
GO
IF OBJECT_ID(N'[dbo].[Preferencia]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Preferencia];
GO
IF OBJECT_ID(N'[dbo].[Propiedad]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Propiedad];
GO
IF OBJECT_ID(N'[dbo].[Proveedor]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Proveedor];
GO
IF OBJECT_ID(N'[dbo].[Proyecto]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Proyecto];
GO
IF OBJECT_ID(N'[dbo].[Recepcion]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Recepcion];
GO
IF OBJECT_ID(N'[dbo].[Rel_Documento_Entidad]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Rel_Documento_Entidad];
GO
IF OBJECT_ID(N'[dbo].[Rel_FolioAvisoLlegada_Proyecto]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Rel_FolioAvisoLlegada_Proyecto];
GO
IF OBJECT_ID(N'[dbo].[Rel_Incidencia_Entidad]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Rel_Incidencia_Entidad];
GO
IF OBJECT_ID(N'[dbo].[Rel_Perfil_Propiedad_Pagina]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Rel_Perfil_Propiedad_Pagina];
GO
IF OBJECT_ID(N'[dbo].[Rel_Usuario_Preferencia]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Rel_Usuario_Preferencia];
GO
IF OBJECT_ID(N'[dbo].[Rel_Usuario_Proyecto]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Rel_Usuario_Proyecto];
GO
IF OBJECT_ID(N'[dbo].[Repositorio]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Repositorio];
GO
IF OBJECT_ID(N'[dbo].[RequisicionNumeroUnico]', 'U') IS NOT NULL
    DROP TABLE [dbo].[RequisicionNumeroUnico];
GO
IF OBJECT_ID(N'[dbo].[RequisicionNumeroUnicoDetalle]', 'U') IS NOT NULL
    DROP TABLE [dbo].[RequisicionNumeroUnicoDetalle];
GO
IF OBJECT_ID(N'[dbo].[Sesion]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Sesion];
GO
IF OBJECT_ID(N'[dbo].[Spool]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Spool];
GO
IF OBJECT_ID(N'[dbo].[sysdiagrams]', 'U') IS NOT NULL
    DROP TABLE [dbo].[sysdiagrams];
GO
IF OBJECT_ID(N'[dbo].[Taller]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Taller];
GO
IF OBJECT_ID(N'[dbo].[TipoActividad]', 'U') IS NOT NULL
    DROP TABLE [dbo].[TipoActividad];
GO
IF OBJECT_ID(N'[dbo].[TipoCorte]', 'U') IS NOT NULL
    DROP TABLE [dbo].[TipoCorte];
GO
IF OBJECT_ID(N'[dbo].[TipoDocumento]', 'U') IS NOT NULL
    DROP TABLE [dbo].[TipoDocumento];
GO
IF OBJECT_ID(N'[dbo].[TipoMaterial]', 'U') IS NOT NULL
    DROP TABLE [dbo].[TipoMaterial];
GO
IF OBJECT_ID(N'[dbo].[TipoMovimiento]', 'U') IS NOT NULL
    DROP TABLE [dbo].[TipoMovimiento];
GO
IF OBJECT_ID(N'[dbo].[TipoNotificacion]', 'U') IS NOT NULL
    DROP TABLE [dbo].[TipoNotificacion];
GO
IF OBJECT_ID(N'[dbo].[Transportista]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Transportista];
GO
IF OBJECT_ID(N'[dbo].[UbicacionFisica]', 'U') IS NOT NULL
    DROP TABLE [dbo].[UbicacionFisica];
GO
IF OBJECT_ID(N'[dbo].[Usuario]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Usuario];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'Acero'
CREATE TABLE [dbo].[Acero] (
    [AceroID] int IDENTITY(1,1) NOT NULL,
    [FamiliaAceroID] int  NOT NULL,
    [Nomenclatura] nvarchar(50)  NOT NULL,
    [VerificadoPorCalidad] bit  NOT NULL
);
GO

-- Creating table 'Bitacora'
CREATE TABLE [dbo].[Bitacora] (
    [BitacoraId] int  NOT NULL,
    [UsuarioId] int  NOT NULL,
    [TipoActividadID] int  NOT NULL,
    [Mensaje] nvarchar(500)  NOT NULL,
    [Fecha] datetime  NOT NULL,
    [EntidadId] int  NOT NULL
);
GO

-- Creating table 'Camion'
CREATE TABLE [dbo].[Camion] (
    [CamionID] int  NOT NULL,
    [TransportistaID] int  NOT NULL,
    [ChoferID] int  NOT NULL,
    [Placas] nvarchar(20)  NOT NULL,
    [TarjetaCirulacion] nvarchar(30)  NOT NULL,
    [PolizaSeguro] nvarchar(30)  NOT NULL,
    [Estatus] nvarchar(100)  NOT NULL,
    [EntidadID] int  NOT NULL,
    [Activo] bit  NOT NULL
);
GO

-- Creating table 'Chofer'
CREATE TABLE [dbo].[Chofer] (
    [ChoferID] int  NOT NULL,
    [Nombre] nvarchar(100)  NOT NULL
);
GO

-- Creating table 'Cliente'
CREATE TABLE [dbo].[Cliente] (
    [ClienteID] int IDENTITY(1,1) NOT NULL,
    [Nombre] nvarchar(150)  NOT NULL,
    [Direccion] nvarchar(max)  NULL,
    [Ciudad] nvarchar(50)  NULL,
    [Estado] nvarchar(50)  NULL,
    [Pais] nvarchar(50)  NULL
);
GO

-- Creating table 'Colada'
CREATE TABLE [dbo].[Colada] (
    [ColadaID] int IDENTITY(1,1) NOT NULL,
    [FabricanteID] int  NULL,
    [AceroID] int  NOT NULL,
    [ProyectoID] int  NOT NULL,
    [NumeroColada] nvarchar(20)  NOT NULL,
    [NumeroCertificado] nvarchar(20)  NULL,
    [HoldCalidad] bit  NOT NULL
);
GO

-- Creating table 'Color'
CREATE TABLE [dbo].[Color] (
    [ColorID] int  NOT NULL,
    [Nombre] nvarchar(50)  NOT NULL,
    [NombreIngles] nvarchar(50)  NULL,
    [CodigoHexadecimal] nvarchar(7)  NOT NULL
);
GO

-- Creating table 'Contacto'
CREATE TABLE [dbo].[Contacto] (
    [ContactoID] int IDENTITY(1,1) NOT NULL,
    [Nombre] nvarchar(50)  NOT NULL,
    [ApPaterno] nvarchar(50)  NOT NULL,
    [ApMaterno] nvarchar(50)  NULL,
    [CorreoElectronico] nvarchar(255)  NULL,
    [TelefonoOficina] nvarchar(20)  NULL,
    [TelefonoParticular] nvarchar(20)  NULL,
    [TelefonoCelular] nvarchar(20)  NULL
);
GO

-- Creating table 'Corte'
CREATE TABLE [dbo].[Corte] (
    [CorteID] int IDENTITY(1,1) NOT NULL,
    [ProyectoID] int  NOT NULL,
    [NumeroUnicoCorteID] int  NOT NULL,
    [Sobrante] int  NULL,
    [Merma] int  NULL,
    [MermaMovimientoID] int  NULL,
    [PreparacionCorteMovimientoID] int  NULL,
    [Cancelado] bit  NOT NULL,
    [Rack] int  NOT NULL,
    [CortadorID] int  NULL
);
GO

-- Creating table 'CorteDetalle'
CREATE TABLE [dbo].[CorteDetalle] (
    [CorteDetalleID] int IDENTITY(1,1) NOT NULL,
    [CorteID] int  NOT NULL,
    [OrdenTrabajoSpoolID] int  NOT NULL,
    [MaterialSpoolID] int  NOT NULL,
    [SalidaInventarioID] int  NULL,
    [Cantidad] int  NOT NULL,
    [FechaCorte] datetime  NULL,
    [MaquinaID] int  NULL,
    [Cancelado] bit  NOT NULL,
    [EsAjuste] bit  NOT NULL
);
GO

-- Creating table 'Despacho'
CREATE TABLE [dbo].[Despacho] (
    [DespachoID] int IDENTITY(1,1) NOT NULL,
    [ProyectoID] int  NOT NULL,
    [OrdenTrabajoSpoolID] int  NOT NULL,
    [MaterialSpoolID] int  NOT NULL,
    [NumeroUnicoID] int  NOT NULL,
    [SalidaInventarioID] int  NULL,
    [Segmento] nchar(1)  NULL,
    [EsEquivalente] bit  NOT NULL,
    [Cantidad] int  NOT NULL,
    [Cancelado] bit  NOT NULL,
    [FechaDespacho] datetime  NOT NULL,
    [DespachadorID] int  NULL
);
GO

-- Creating table 'Diametro'
CREATE TABLE [dbo].[Diametro] (
    [DiametroID] int IDENTITY(1,1) NOT NULL,
    [Valor] decimal(7,4)  NOT NULL,
    [VerificadoPorCalidad] bit  NOT NULL
);
GO

-- Creating table 'Entidad'
CREATE TABLE [dbo].[Entidad] (
    [EntidadID] int IDENTITY(1,1) NOT NULL,
    [PerfilID] int  NOT NULL,
    [Nombre] nvarchar(100)  NOT NULL,
    [Activo] bit  NOT NULL
);
GO

-- Creating table 'EstatusOrden'
CREATE TABLE [dbo].[EstatusOrden] (
    [EstatusOrdenID] int  NOT NULL,
    [Nombre] nvarchar(50)  NOT NULL,
    [NombreIngles] nvarchar(50)  NULL
);
GO

-- Creating table 'ExtensionDocumento'
CREATE TABLE [dbo].[ExtensionDocumento] (
    [ExtencionDocumentoID] int IDENTITY(1,1) NOT NULL,
    [Nombre] nvarchar(50)  NULL,
    [Extension] nvarchar(50)  NULL,
    [EntidadID] int  NOT NULL,
    [Activo] bit  NOT NULL
);
GO

-- Creating table 'Fabricante'
CREATE TABLE [dbo].[Fabricante] (
    [FabricanteID] int IDENTITY(1,1) NOT NULL,
    [ContactoID] int  NOT NULL,
    [Nombre] nvarchar(50)  NOT NULL,
    [Descripcion] nvarchar(50)  NULL,
    [Direccion] nvarchar(max)  NULL,
    [Telefono] nvarchar(50)  NULL
);
GO

-- Creating table 'FamiliaAcero'
CREATE TABLE [dbo].[FamiliaAcero] (
    [FamiliaAceroID] int IDENTITY(1,1) NOT NULL,
    [FamiliaMaterialID] int  NOT NULL,
    [Nombre] nvarchar(50)  NOT NULL,
    [Descripcion] nvarchar(500)  NULL,
    [VerificadoPorCalidad] bit  NOT NULL
);
GO

-- Creating table 'FamiliaItemCode'
CREATE TABLE [dbo].[FamiliaItemCode] (
    [FamiliaItemCodeID] int IDENTITY(1,1) NOT NULL,
    [Nombre] nvarchar(100)  NOT NULL,
    [EntidadID] int  NOT NULL,
    [Activo] bit  NOT NULL
);
GO

-- Creating table 'FamiliaMaterial'
CREATE TABLE [dbo].[FamiliaMaterial] (
    [FamiliaMaterialID] int IDENTITY(1,1) NOT NULL,
    [Nombre] nvarchar(50)  NOT NULL,
    [Descripcion] nvarchar(500)  NULL
);
GO

-- Creating table 'FolioAvisoLlegada'
CREATE TABLE [dbo].[FolioAvisoLlegada] (
    [FolioAvisoLlegadaID] int IDENTITY(1,1) NOT NULL,
    [CamionID] int  NULL,
    [Consecutivo] int  NULL,
    [EsVirtual] bit  NULL,
    [Estatus] nvarchar(50)  NULL,
    [EntidadID] int  NULL,
    [Activo] bit  NULL
);
GO

-- Creating table 'FolioLlegada'
CREATE TABLE [dbo].[FolioLlegada] (
    [FolioLlegadaID] int IDENTITY(1,1) NOT NULL,
    [Consecutivo] int  NULL,
    [FolioAvisoLlegadaID] int  NULL,
    [Estatus] nvarchar(100)  NULL,
    [EntidadID] int  NULL,
    [Activo] bit  NULL
);
GO

-- Creating table 'FolioPackingList'
CREATE TABLE [dbo].[FolioPackingList] (
    [FolioPackingListID] int  NOT NULL,
    [PackingListID] int  NULL,
    [FolioLlegadaID] int  NULL,
    [Folio] nvarchar(50)  NULL,
    [Estatus] nvarchar(50)  NOT NULL,
    [FechaCreacion] datetime  NULL,
    [FechaCapturaCompleta] datetime  NOT NULL,
    [EntidadID] int  NULL,
    [Activo] bit  NULL
);
GO

-- Creating table 'Incidencia'
CREATE TABLE [dbo].[Incidencia] (
    [IncidenciaID] int IDENTITY(1,1) NOT NULL,
    [IncidenciaOriginalID] int  NULL,
    [Titulo] nvarchar(100)  NOT NULL,
    [Descripcion] nvarchar(500)  NOT NULL,
    [NoRFI] int  NULL,
    [FechaCreacion] datetime  NOT NULL,
    [UsuarioID] int  NOT NULL,
    [Respuesta] nvarchar(500)  NULL,
    [FechaRespuesta] datetime  NULL,
    [UsuarioIDRespuesta] int  NULL,
    [Version] int  NOT NULL,
    [Estatus] varchar(50)  NOT NULL,
    [EntidadID] int  NOT NULL,
    [Activo] bit  NOT NULL
);
GO

-- Creating table 'ItemCode'
CREATE TABLE [dbo].[ItemCode] (
    [ItemCodeID] int IDENTITY(1,1) NOT NULL,
    [ProyectoID] int  NOT NULL,
    [TipoMaterialID] int  NOT NULL,
    [Codigo] nvarchar(50)  NOT NULL,
    [ItemCodeCliente] nvarchar(50)  NULL,
    [DescripcionEspanol] nvarchar(max)  NOT NULL,
    [DescripcionIngles] nvarchar(max)  NULL,
    [Peso] decimal(7,2)  NULL,
    [DescripcionInterna] nvarchar(max)  NULL,
    [Diametro1] decimal(7,4)  NULL,
    [Diametro2] decimal(7,4)  NULL,
    [FamiliaAceroID] int  NULL
);
GO

-- Creating table 'Maquina'
CREATE TABLE [dbo].[Maquina] (
    [MaquinaID] int IDENTITY(1,1) NOT NULL,
    [PatioID] int  NOT NULL,
    [Nombre] nvarchar(150)  NOT NULL,
    [MermaTeorica] int  NULL
);
GO

-- Creating table 'MaterialSpool'
CREATE TABLE [dbo].[MaterialSpool] (
    [MaterialSpoolID] int IDENTITY(1,1) NOT NULL,
    [SpoolID] int  NOT NULL,
    [ItemCodeID] int  NOT NULL,
    [Diametro1] decimal(7,4)  NOT NULL,
    [Diametro2] decimal(7,4)  NOT NULL,
    [Etiqueta] nvarchar(10)  NOT NULL,
    [Cantidad] int  NOT NULL,
    [Peso] decimal(7,2)  NULL,
    [Area] decimal(7,2)  NULL,
    [Especificacion] nvarchar(10)  NULL,
    [Grupo] nvarchar(150)  NULL,
    [DescripcionMaterial] nvarchar(max)  NULL,
    [Campo1] nvarchar(100)  NULL,
    [Campo2] nvarchar(100)  NULL,
    [Campo3] nvarchar(100)  NULL,
    [Campo4] nvarchar(100)  NULL,
    [Campo5] nvarchar(100)  NULL,
    [Reserva] nvarchar(200)  NULL
);
GO

-- Creating table 'MenuContextual'
CREATE TABLE [dbo].[MenuContextual] (
    [MenuID] int IDENTITY(1,1) NOT NULL,
    [Texto] nvarchar(100)  NOT NULL,
    [Liga] nvarchar(100)  NOT NULL,
    [EntidadID] int  NOT NULL
);
GO

-- Creating table 'MenuGeneral'
CREATE TABLE [dbo].[MenuGeneral] (
    [MenuID] int IDENTITY(1,1) NOT NULL,
    [Texto] nvarchar(500)  NOT NULL,
    [Liga] nvarchar(1000)  NOT NULL,
    [IDPadre] int  NOT NULL
);
GO

-- Creating table 'Notificacion'
CREATE TABLE [dbo].[Notificacion] (
    [NotificacionID] int IDENTITY(1,1) NOT NULL,
    [UsuarioIDReceptor] int  NOT NULL,
    [UsuarioIDEmisor] int  NULL,
    [TipoNotificacionID] int  NULL,
    [Mensaje] nvarchar(500)  NULL,
    [FechaEnvio] datetime  NOT NULL,
    [FechaRecepcion] datetime  NOT NULL,
    [EstatusLectura] bit  NULL,
    [EntidadID] int  NULL,
    [Activo] bit  NULL
);
GO

-- Creating table 'NumeroUnico'
CREATE TABLE [dbo].[NumeroUnico] (
    [NumeroUnicoID] int IDENTITY(1,1) NOT NULL,
    [ProyectoID] int  NOT NULL,
    [ItemCodeID] int  NULL,
    [ColadaID] int  NULL,
    [ProveedorID] int  NULL,
    [FabricanteID] int  NULL,
    [TipoCorte1ID] int  NULL,
    [TipoCorte2ID] int  NULL,
    [Codigo] nvarchar(20)  NOT NULL,
    [Estatus] nchar(1)  NULL,
    [Factura] nvarchar(25)  NULL,
    [PartidaFactura] nvarchar(10)  NULL,
    [OrdenDeCompra] nvarchar(20)  NULL,
    [PartidaOrdenDeCompra] nvarchar(10)  NULL,
    [Diametro1] decimal(7,4)  NOT NULL,
    [Diametro2] decimal(7,4)  NOT NULL,
    [Cedula] nvarchar(10)  NULL,
    [NumeroUnicoCliente] nvarchar(50)  NULL,
    [MarcadoAsme] bit  NOT NULL,
    [MarcadoGolpe] bit  NOT NULL,
    [MarcadoPintura] bit  NOT NULL,
    [PruebasHidrostaticas] nvarchar(100)  NULL,
    [TieneDano] bit  NOT NULL,
    [Rack] varchar(50)  NULL,
    [Observaciones] varchar(200)  NULL,
    [CampoLibreRecepcion1] nvarchar(100)  NULL,
    [CampoLibreRecepcion2] nvarchar(100)  NULL,
    [CampoLibreRecepcion3] nvarchar(100)  NULL,
    [CampoLibreRecepcion4] nvarchar(100)  NULL,
    [CampoLibreRecepcion5] nvarchar(100)  NULL,
    [CampoLibre1] nvarchar(100)  NULL,
    [CampoLibre2] nvarchar(100)  NULL,
    [CampoLibre3] nvarchar(100)  NULL,
    [CampoLibre4] nvarchar(100)  NULL,
    [CampoLibre5] nvarchar(100)  NULL,
    [EsVirtual] bit  NOT NULL,
    [RecepcionID] int  NULL,
    [EntidadID] int  NOT NULL
);
GO

-- Creating table 'NumeroUnicoCorte'
CREATE TABLE [dbo].[NumeroUnicoCorte] (
    [NumeroUnicoCorteID] int IDENTITY(1,1) NOT NULL,
    [NumeroUnicoID] int  NOT NULL,
    [ProyectoID] int  NOT NULL,
    [SalidaMovimientoID] int  NOT NULL,
    [OrdenTrabajoID] int  NOT NULL,
    [UbicacionFisicaID] int  NULL,
    [Segmento] nchar(1)  NOT NULL,
    [Longitud] int  NOT NULL,
    [FechaTraspaso] datetime  NOT NULL,
    [TieneCorte] bit  NOT NULL
);
GO

-- Creating table 'NumeroUnicoInventario'
CREATE TABLE [dbo].[NumeroUnicoInventario] (
    [NumeroUnicoID] int  NOT NULL,
    [ProyectoID] int  NOT NULL,
    [CantidadRecibida] int  NOT NULL,
    [CantidadDanada] int  NOT NULL,
    [InventarioFisico] int  NOT NULL,
    [InventarioBuenEstado] int  NOT NULL,
    [InventarioCongelado] int  NOT NULL,
    [InventarioTransferenciaCorte] int  NOT NULL,
    [InventarioDisponibleCruce] int  NOT NULL,
    [EsVirtual] bit  NOT NULL,
    [EntidadID] int  NOT NULL
);
GO

-- Creating table 'NumeroUnicoMovimiento'
CREATE TABLE [dbo].[NumeroUnicoMovimiento] (
    [NumeroUnicoMovimientoID] int IDENTITY(1,1) NOT NULL,
    [NumeroUnicoID] int  NOT NULL,
    [ProyectoID] int  NOT NULL,
    [TipoMovimientoID] int  NOT NULL,
    [Cantidad] int  NOT NULL,
    [Segmento] nchar(1)  NULL,
    [FechaMovimiento] datetime  NOT NULL,
    [Referencia] nvarchar(150)  NULL,
    [Estatus] nchar(1)  NOT NULL,
    [EntidadID] int  NOT NULL
);
GO

-- Creating table 'NumeroUnicoSegmento'
CREATE TABLE [dbo].[NumeroUnicoSegmento] (
    [NumeroUnicoSegmentoID] int IDENTITY(1,1) NOT NULL,
    [NumeroUnicoID] int  NOT NULL,
    [ProyectoID] int  NOT NULL,
    [Segmento] nchar(1)  NOT NULL,
    [CantidadDanada] int  NOT NULL,
    [InventarioFisico] int  NOT NULL,
    [InventarioBuenEstado] int  NOT NULL,
    [InventarioCongelado] int  NOT NULL,
    [InventarioTransferenciaCorte] int  NOT NULL,
    [InventarioDisponibleCruce] int  NOT NULL,
    [Rack] varchar(50)  NULL,
    [EntidadID] int  NOT NULL
);
GO

-- Creating table 'OrdenTrabajo'
CREATE TABLE [dbo].[OrdenTrabajo] (
    [OrdenTrabajoID] int IDENTITY(1,1) NOT NULL,
    [EstatusOrdenID] int  NOT NULL,
    [ProyectoID] int  NOT NULL,
    [TallerID] int  NOT NULL,
    [NumeroOrden] nvarchar(50)  NULL,
    [FechaOrden] datetime  NOT NULL,
    [EsAsignado] bit  NOT NULL,
    [VersionOrden] int  NULL
);
GO

-- Creating table 'OrdenTrabajoSpool'
CREATE TABLE [dbo].[OrdenTrabajoSpool] (
    [OrdenTrabajoSpoolID] int IDENTITY(1,1) NOT NULL,
    [OrdenTrabajoID] int  NOT NULL,
    [SpoolID] int  NOT NULL,
    [Partida] int  NOT NULL,
    [NumeroControl] nvarchar(50)  NULL,
    [EsAsignado] bit  NOT NULL
);
GO

-- Creating table 'PackingList'
CREATE TABLE [dbo].[PackingList] (
    [PackingListID] int  NOT NULL,
    [ProyectoID] int  NOT NULL,
    [CamionID] int  NOT NULL,
    [FolioLlegadaID] int  NOT NULL,
    [Consecutivo] int  NULL,
    [EntidadID] int  NOT NULL,
    [Activo] bit  NOT NULL
);
GO

-- Creating table 'Pagina'
CREATE TABLE [dbo].[Pagina] (
    [PaginaID] int IDENTITY(1,1) NOT NULL,
    [Accion] nvarchar(100)  NULL,
    [Controlador] nvarchar(100)  NULL,
    [EntidadID] int  NOT NULL,
    [Activo] bit  NULL
);
GO

-- Creating table 'Patio'
CREATE TABLE [dbo].[Patio] (
    [PatioID] int IDENTITY(1,1) NOT NULL,
    [Nombre] nvarchar(150)  NOT NULL,
    [Propietario] nvarchar(500)  NULL,
    [Descripcion] nvarchar(500)  NULL,
    [UsuarioModifica] uniqueidentifier  NULL
);
GO

-- Creating table 'Perfil'
CREATE TABLE [dbo].[Perfil] (
    [PerfilID] int IDENTITY(1,1) NOT NULL,
    [Nombre] nvarchar(100)  NOT NULL,
    [EntidadID] int  NOT NULL,
    [Activo] bit  NOT NULL
);
GO

-- Creating table 'PermisoAduana'
CREATE TABLE [dbo].[PermisoAduana] (
    [PermisoAduanaID] int IDENTITY(1,1) NOT NULL,
    [FolioAvisoLlegadaID] int  NOT NULL,
    [Estatus] nvarchar(50)  NOT NULL,
    [EntidadID] int  NOT NULL,
    [Activo] bit  NOT NULL
);
GO

-- Creating table 'PinturaNumeroUnico'
CREATE TABLE [dbo].[PinturaNumeroUnico] (
    [PinturaNumeroUnicoID] int IDENTITY(1,1) NOT NULL,
    [ProyectoID] int  NOT NULL,
    [NumeroUnicoID] int  NOT NULL,
    [RequisicionNumeroUnicoDetalleID] int  NOT NULL,
    [FechaPrimarios] datetime  NULL,
    [ReportePrimarios] nvarchar(50)  NULL,
    [FechaIntermedio] datetime  NULL,
    [ReporteIntermedio] nvarchar(50)  NULL,
    [Liberado] bit  NOT NULL
);
GO

-- Creating table 'Plana'
CREATE TABLE [dbo].[Plana] (
    [PlanaID] int IDENTITY(1,1) NOT NULL,
    [CamionID] int  NOT NULL,
    [Placas] nvarchar(20)  NULL,
    [EntidadID] int  NOT NULL,
    [Activo] int  NOT NULL
);
GO

-- Creating table 'Preferencia'
CREATE TABLE [dbo].[Preferencia] (
    [PreferenciaId] int IDENTITY(1,1) NOT NULL,
    [Nombre] nvarchar(50)  NOT NULL,
    [EntidadID] int  NOT NULL,
    [Activo] bit  NOT NULL
);
GO

-- Creating table 'Propiedad'
CREATE TABLE [dbo].[Propiedad] (
    [PropiedadID] int IDENTITY(1,1) NOT NULL,
    [EntidadID] int  NULL,
    [Nombre] nvarchar(100)  NULL,
    [Activo] bit  NULL
);
GO

-- Creating table 'Proveedor'
CREATE TABLE [dbo].[Proveedor] (
    [ProveedorID] int IDENTITY(1,1) NOT NULL,
    [ContactoID] int  NOT NULL,
    [Nombre] nvarchar(50)  NOT NULL,
    [Descripcion] nvarchar(50)  NULL,
    [Direccion] nvarchar(max)  NULL,
    [Telefono] nvarchar(50)  NULL
);
GO

-- Creating table 'Proyecto'
CREATE TABLE [dbo].[Proyecto] (
    [ProyectoID] int IDENTITY(1,1) NOT NULL,
    [PatioID] int  NOT NULL,
    [ClienteID] int  NOT NULL,
    [ContactoID] int  NOT NULL,
    [ColorID] int  NOT NULL,
    [Nombre] nvarchar(100)  NOT NULL,
    [Descripcion] nvarchar(500)  NULL,
    [FechaInicio] datetime  NULL,
    [Activo] bit  NOT NULL
);
GO

-- Creating table 'Recepcion'
CREATE TABLE [dbo].[Recepcion] (
    [RecepcionID] int  NOT NULL,
    [FolioPackingListID] int  NOT NULL,
    [ItemCodeID] int  NOT NULL,
    [FamiliaItemCodeID] int  NULL,
    [CedulaID] int  NULL,
    [TipoAceroID] int  NULL,
    [Diametro1] decimal(7,4)  NULL,
    [Diametro2] decimal(7,4)  NULL,
    [Cantidad] int  NULL,
    [TieneNumerosUnicos] bit  NULL,
    [FechaGeneracionNumerosUnicos] datetime  NULL,
    [EntidadID] int  NOT NULL,
    [Activo] bit  NOT NULL
);
GO

-- Creating table 'Rel_Documento_Entidad'
CREATE TABLE [dbo].[Rel_Documento_Entidad] (
    [TipoDocumentoID] int IDENTITY(1,1) NOT NULL,
    [EntidadID] int  NULL,
    [RepositorioID] int  NULL,
    [UsuarioID] int  NULL,
    [Identificador] nvarchar(50)  NULL,
    [FechaSubida] datetime  NULL,
    [Activo] int  NULL
);
GO

-- Creating table 'Rel_FolioAvisoLlegada_Proyecto'
CREATE TABLE [dbo].[Rel_FolioAvisoLlegada_Proyecto] (
    [FolioAvisoLlegadaID] int IDENTITY(1,1) NOT NULL,
    [ProyectoID] int  NOT NULL,
    [EntidadID] int  NOT NULL,
    [Activo] bit  NOT NULL
);
GO

-- Creating table 'Rel_Incidencia_Entidad'
CREATE TABLE [dbo].[Rel_Incidencia_Entidad] (
    [IncidenciaID] int  NOT NULL,
    [EntidadID] int  NOT NULL,
    [PermitidoLevantarIncidencias] bit  NOT NULL,
    [Activo] bit  NOT NULL
);
GO

-- Creating table 'Rel_Perfil_Propiedad_Pagina'
CREATE TABLE [dbo].[Rel_Perfil_Propiedad_Pagina] (
    [PerfilID] int  NOT NULL,
    [PropiedadID] int  NOT NULL,
    [PaginaID] int  NOT NULL,
    [PermisoEdicion] bit  NOT NULL,
    [PermisoLectura] bit  NOT NULL,
    [Requerido] bit  NOT NULL,
    [EntidadID] int  NOT NULL,
    [Activo] bit  NOT NULL
);
GO

-- Creating table 'Rel_Usuario_Preferencia'
CREATE TABLE [dbo].[Rel_Usuario_Preferencia] (
    [UsuarioID] int IDENTITY(1,1) NOT NULL,
    [PreferenciaID] int  NOT NULL,
    [ValorPreferencia] nvarchar(100)  NOT NULL,
    [EntidadID] int  NOT NULL,
    [Activo] bit  NOT NULL
);
GO

-- Creating table 'Rel_Usuario_Proyecto'
CREATE TABLE [dbo].[Rel_Usuario_Proyecto] (
    [ProyectoID] int  NOT NULL,
    [UsuarioID] int  NOT NULL,
    [EntidadID] int  NOT NULL,
    [Activo] bit  NOT NULL
);
GO

-- Creating table 'Repositorio'
CREATE TABLE [dbo].[Repositorio] (
    [RepositorioId] int IDENTITY(1,1) NOT NULL,
    [Nombre] nvarchar(100)  NULL,
    [EntidadID] int  NULL,
    [Activo] bit  NULL
);
GO

-- Creating table 'RequisicionNumeroUnico'
CREATE TABLE [dbo].[RequisicionNumeroUnico] (
    [RequisicionNumeroUnicoID] int IDENTITY(1,1) NOT NULL,
    [ProyectoID] int  NOT NULL,
    [NumeroRequisicion] nvarchar(50)  NULL,
    [FechaRequisicion] datetime  NULL,
    [EntidadID] int  NOT NULL
);
GO

-- Creating table 'RequisicionNumeroUnicoDetalle'
CREATE TABLE [dbo].[RequisicionNumeroUnicoDetalle] (
    [RequisicionNumeroUnicoDetalleID] int IDENTITY(1,1) NOT NULL,
    [RequisicionNumeroUnicoID] int  NOT NULL,
    [NumeroUnicoID] int  NOT NULL,
    [EntidadID] int  NOT NULL
);
GO

-- Creating table 'Sesion'
CREATE TABLE [dbo].[Sesion] (
    [SesionID] int IDENTITY(1,1) NOT NULL,
    [UsuarioID] int  NOT NULL,
    [Token] nvarchar(1000)  NOT NULL,
    [FechaCreacion] datetime  NOT NULL,
    [EntidadID] int  NOT NULL
);
GO

-- Creating table 'Spool'
CREATE TABLE [dbo].[Spool] (
    [SpoolID] int IDENTITY(1,1) NOT NULL,
    [ProyectoID] int  NOT NULL,
    [FamiliaAcero1ID] int  NOT NULL,
    [FamiliaAcero2ID] int  NULL,
    [Nombre] nvarchar(50)  NOT NULL,
    [Dibujo] nvarchar(50)  NOT NULL,
    [Especificacion] nvarchar(15)  NULL,
    [Cedula] nvarchar(10)  NULL,
    [Pdis] decimal(10,4)  NULL,
    [DiametroPlano] decimal(10,4)  NULL,
    [Peso] decimal(7,2)  NULL,
    [Area] decimal(7,2)  NULL,
    [PorcentajePnd] int  NULL,
    [RequierePwht] bit  NOT NULL,
    [PendienteDocumental] bit  NOT NULL,
    [AprobadoParaCruce] bit  NOT NULL,
    [Prioridad] int  NULL,
    [Revision] nvarchar(10)  NULL,
    [RevisionCliente] nvarchar(10)  NULL,
    [Segmento1] nvarchar(20)  NULL,
    [Segmento2] nvarchar(20)  NULL,
    [Segmento3] nvarchar(20)  NULL,
    [Segmento4] nvarchar(20)  NULL,
    [Segmento5] nvarchar(20)  NULL,
    [Segmento6] nvarchar(20)  NULL,
    [Segmento7] nvarchar(20)  NULL,
    [SistemaPintura] nvarchar(50)  NULL,
    [ColorPintura] nvarchar(50)  NULL,
    [CodigoPintura] nvarchar(50)  NULL,
    [FechaEtiqueta] datetime  NULL,
    [NumeroEtiqueta] nvarchar(20)  NULL,
    [Campo1] nvarchar(100)  NULL,
    [Campo2] nvarchar(100)  NULL,
    [Campo3] nvarchar(100)  NULL,
    [Campo4] nvarchar(100)  NULL,
    [Campo5] nvarchar(100)  NULL,
    [DiametroMayor] decimal(10,4)  NULL,
    [CuadranteID] int  NULL,
    [FechaImportacion] datetime  NULL,
    [RequierePruebaHidrostatica] varchar(10)  NULL,
    [FechaLocalizacion] datetime  NULL,
    [UltimoProceso] nvarchar(500)  NULL,
    [AreaGrupo] nvarchar(500)  NULL,
    [KgsGrupo] nvarchar(500)  NULL,
    [DiamGrupo] nvarchar(500)  NULL,
    [PeqGrupo] nvarchar(500)  NULL,
    [SistemaPinturaFinal] nvarchar(500)  NULL,
    [Paint] nvarchar(500)  NULL,
    [DiametroPromedio] nvarchar(500)  NULL,
    [PaintLine] nvarchar(500)  NULL,
    [AreaEq] nvarchar(500)  NULL,
    [Inox] nvarchar(500)  NULL,
    [ClasifInox] nvarchar(500)  NULL,
    [FechaHomologacion] datetime  NULL
);
GO

-- Creating table 'sysdiagrams'
CREATE TABLE [dbo].[sysdiagrams] (
    [name] nvarchar(128)  NOT NULL,
    [principal_id] int  NOT NULL,
    [diagram_id] int IDENTITY(1,1) NOT NULL,
    [version] int  NULL,
    [definition] varbinary(max)  NULL
);
GO

-- Creating table 'Taller'
CREATE TABLE [dbo].[Taller] (
    [TallerID] int IDENTITY(1,1) NOT NULL,
    [PatioID] int  NOT NULL,
    [Nombre] nvarchar(150)  NOT NULL
);
GO

-- Creating table 'TipoActividad'
CREATE TABLE [dbo].[TipoActividad] (
    [TipoActividadID] int IDENTITY(1,1) NOT NULL,
    [Nombre] nvarchar(100)  NOT NULL,
    [EntidadID] int  NOT NULL,
    [Activo] bit  NOT NULL
);
GO

-- Creating table 'TipoCorte'
CREATE TABLE [dbo].[TipoCorte] (
    [TipoCorteID] int IDENTITY(1,1) NOT NULL,
    [Codigo] nvarchar(10)  NOT NULL,
    [Nombre] nvarchar(50)  NULL,
    [Descripcion] nvarchar(500)  NULL,
    [VerificadoPorCalidad] bit  NOT NULL
);
GO

-- Creating table 'TipoDocumento'
CREATE TABLE [dbo].[TipoDocumento] (
    [TipoDocumentoID] int  NOT NULL,
    [Nombre] nvarchar(150)  NOT NULL,
    [EntidadID] int  NOT NULL,
    [Activo] bit  NOT NULL
);
GO

-- Creating table 'TipoMaterial'
CREATE TABLE [dbo].[TipoMaterial] (
    [TipoMaterialID] int  NOT NULL,
    [Nombre] nvarchar(50)  NOT NULL,
    [NombreIngles] nvarchar(50)  NULL
);
GO

-- Creating table 'TipoMovimiento'
CREATE TABLE [dbo].[TipoMovimiento] (
    [TipoMovimientoID] int  NOT NULL,
    [EsEntrada] bit  NOT NULL,
    [EsTransferenciaProcesos] bit  NOT NULL,
    [ApareceEnSaldos] bit  NOT NULL,
    [DisponibleMovimientosUI] bit  NOT NULL,
    [Nombre] nvarchar(50)  NOT NULL,
    [NombreIngles] nvarchar(50)  NULL,
    [Descripcion] nvarchar(500)  NULL,
    [EntidadID] int  NOT NULL
);
GO

-- Creating table 'TipoNotificacion'
CREATE TABLE [dbo].[TipoNotificacion] (
    [TipoNotificacionID] int  NOT NULL,
    [Nombre] nvarchar(50)  NOT NULL,
    [EntidadID] int  NOT NULL,
    [Activo] bit  NOT NULL
);
GO

-- Creating table 'Transportista'
CREATE TABLE [dbo].[Transportista] (
    [TransportistaID] int IDENTITY(1,1) NOT NULL,
    [ContactoID] int  NOT NULL,
    [Nombre] nvarchar(50)  NOT NULL,
    [Descripcion] nvarchar(50)  NULL,
    [Direccion] nvarchar(max)  NULL,
    [Telefono] nvarchar(50)  NULL
);
GO

-- Creating table 'UbicacionFisica'
CREATE TABLE [dbo].[UbicacionFisica] (
    [UbicacionFisicaID] int IDENTITY(1,1) NOT NULL,
    [PatioID] int  NOT NULL,
    [Nombre] nvarchar(200)  NOT NULL,
    [EsAreaCorte] bit  NOT NULL
);
GO

-- Creating table 'Usuario'
CREATE TABLE [dbo].[Usuario] (
    [UsuarioID] int  NOT NULL,
    [PerfilID] int  NOT NULL,
    [NombreUsuario] nvarchar(50)  NOT NULL,
    [ContrasenaHash] nvarchar(128)  NOT NULL,
    [Nombre] nvarchar(50)  NOT NULL,
    [ApellidoPaterno] nvarchar(50)  NOT NULL,
    [ApellidoMaterno] nvarchar(50)  NULL,
    [BloqueadoPorAdministracion] bit  NOT NULL,
    [EntidadID] int  NOT NULL,
    [Activo] bit  NOT NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [AceroID] in table 'Acero'
ALTER TABLE [dbo].[Acero]
ADD CONSTRAINT [PK_Acero]
    PRIMARY KEY CLUSTERED ([AceroID] ASC);
GO

-- Creating primary key on [BitacoraId] in table 'Bitacora'
ALTER TABLE [dbo].[Bitacora]
ADD CONSTRAINT [PK_Bitacora]
    PRIMARY KEY CLUSTERED ([BitacoraId] ASC);
GO

-- Creating primary key on [CamionID] in table 'Camion'
ALTER TABLE [dbo].[Camion]
ADD CONSTRAINT [PK_Camion]
    PRIMARY KEY CLUSTERED ([CamionID] ASC);
GO

-- Creating primary key on [ChoferID] in table 'Chofer'
ALTER TABLE [dbo].[Chofer]
ADD CONSTRAINT [PK_Chofer]
    PRIMARY KEY CLUSTERED ([ChoferID] ASC);
GO

-- Creating primary key on [ClienteID] in table 'Cliente'
ALTER TABLE [dbo].[Cliente]
ADD CONSTRAINT [PK_Cliente]
    PRIMARY KEY CLUSTERED ([ClienteID] ASC);
GO

-- Creating primary key on [ColadaID] in table 'Colada'
ALTER TABLE [dbo].[Colada]
ADD CONSTRAINT [PK_Colada]
    PRIMARY KEY CLUSTERED ([ColadaID] ASC);
GO

-- Creating primary key on [ColorID] in table 'Color'
ALTER TABLE [dbo].[Color]
ADD CONSTRAINT [PK_Color]
    PRIMARY KEY CLUSTERED ([ColorID] ASC);
GO

-- Creating primary key on [ContactoID] in table 'Contacto'
ALTER TABLE [dbo].[Contacto]
ADD CONSTRAINT [PK_Contacto]
    PRIMARY KEY CLUSTERED ([ContactoID] ASC);
GO

-- Creating primary key on [CorteID] in table 'Corte'
ALTER TABLE [dbo].[Corte]
ADD CONSTRAINT [PK_Corte]
    PRIMARY KEY CLUSTERED ([CorteID] ASC);
GO

-- Creating primary key on [CorteDetalleID] in table 'CorteDetalle'
ALTER TABLE [dbo].[CorteDetalle]
ADD CONSTRAINT [PK_CorteDetalle]
    PRIMARY KEY CLUSTERED ([CorteDetalleID] ASC);
GO

-- Creating primary key on [DespachoID] in table 'Despacho'
ALTER TABLE [dbo].[Despacho]
ADD CONSTRAINT [PK_Despacho]
    PRIMARY KEY CLUSTERED ([DespachoID] ASC);
GO

-- Creating primary key on [DiametroID] in table 'Diametro'
ALTER TABLE [dbo].[Diametro]
ADD CONSTRAINT [PK_Diametro]
    PRIMARY KEY CLUSTERED ([DiametroID] ASC);
GO

-- Creating primary key on [EntidadID] in table 'Entidad'
ALTER TABLE [dbo].[Entidad]
ADD CONSTRAINT [PK_Entidad]
    PRIMARY KEY CLUSTERED ([EntidadID] ASC);
GO

-- Creating primary key on [EstatusOrdenID] in table 'EstatusOrden'
ALTER TABLE [dbo].[EstatusOrden]
ADD CONSTRAINT [PK_EstatusOrden]
    PRIMARY KEY CLUSTERED ([EstatusOrdenID] ASC);
GO

-- Creating primary key on [ExtencionDocumentoID] in table 'ExtensionDocumento'
ALTER TABLE [dbo].[ExtensionDocumento]
ADD CONSTRAINT [PK_ExtensionDocumento]
    PRIMARY KEY CLUSTERED ([ExtencionDocumentoID] ASC);
GO

-- Creating primary key on [FabricanteID] in table 'Fabricante'
ALTER TABLE [dbo].[Fabricante]
ADD CONSTRAINT [PK_Fabricante]
    PRIMARY KEY CLUSTERED ([FabricanteID] ASC);
GO

-- Creating primary key on [FamiliaAceroID] in table 'FamiliaAcero'
ALTER TABLE [dbo].[FamiliaAcero]
ADD CONSTRAINT [PK_FamiliaAcero]
    PRIMARY KEY CLUSTERED ([FamiliaAceroID] ASC);
GO

-- Creating primary key on [FamiliaItemCodeID] in table 'FamiliaItemCode'
ALTER TABLE [dbo].[FamiliaItemCode]
ADD CONSTRAINT [PK_FamiliaItemCode]
    PRIMARY KEY CLUSTERED ([FamiliaItemCodeID] ASC);
GO

-- Creating primary key on [FamiliaMaterialID] in table 'FamiliaMaterial'
ALTER TABLE [dbo].[FamiliaMaterial]
ADD CONSTRAINT [PK_FamiliaMaterial]
    PRIMARY KEY CLUSTERED ([FamiliaMaterialID] ASC);
GO

-- Creating primary key on [FolioAvisoLlegadaID] in table 'FolioAvisoLlegada'
ALTER TABLE [dbo].[FolioAvisoLlegada]
ADD CONSTRAINT [PK_FolioAvisoLlegada]
    PRIMARY KEY CLUSTERED ([FolioAvisoLlegadaID] ASC);
GO

-- Creating primary key on [FolioLlegadaID] in table 'FolioLlegada'
ALTER TABLE [dbo].[FolioLlegada]
ADD CONSTRAINT [PK_FolioLlegada]
    PRIMARY KEY CLUSTERED ([FolioLlegadaID] ASC);
GO

-- Creating primary key on [FolioPackingListID] in table 'FolioPackingList'
ALTER TABLE [dbo].[FolioPackingList]
ADD CONSTRAINT [PK_FolioPackingList]
    PRIMARY KEY CLUSTERED ([FolioPackingListID] ASC);
GO

-- Creating primary key on [IncidenciaID] in table 'Incidencia'
ALTER TABLE [dbo].[Incidencia]
ADD CONSTRAINT [PK_Incidencia]
    PRIMARY KEY CLUSTERED ([IncidenciaID] ASC);
GO

-- Creating primary key on [ItemCodeID] in table 'ItemCode'
ALTER TABLE [dbo].[ItemCode]
ADD CONSTRAINT [PK_ItemCode]
    PRIMARY KEY CLUSTERED ([ItemCodeID] ASC);
GO

-- Creating primary key on [MaquinaID] in table 'Maquina'
ALTER TABLE [dbo].[Maquina]
ADD CONSTRAINT [PK_Maquina]
    PRIMARY KEY CLUSTERED ([MaquinaID] ASC);
GO

-- Creating primary key on [MaterialSpoolID] in table 'MaterialSpool'
ALTER TABLE [dbo].[MaterialSpool]
ADD CONSTRAINT [PK_MaterialSpool]
    PRIMARY KEY CLUSTERED ([MaterialSpoolID] ASC);
GO

-- Creating primary key on [MenuID] in table 'MenuContextual'
ALTER TABLE [dbo].[MenuContextual]
ADD CONSTRAINT [PK_MenuContextual]
    PRIMARY KEY CLUSTERED ([MenuID] ASC);
GO

-- Creating primary key on [MenuID] in table 'MenuGeneral'
ALTER TABLE [dbo].[MenuGeneral]
ADD CONSTRAINT [PK_MenuGeneral]
    PRIMARY KEY CLUSTERED ([MenuID] ASC);
GO

-- Creating primary key on [NotificacionID] in table 'Notificacion'
ALTER TABLE [dbo].[Notificacion]
ADD CONSTRAINT [PK_Notificacion]
    PRIMARY KEY CLUSTERED ([NotificacionID] ASC);
GO

-- Creating primary key on [NumeroUnicoID] in table 'NumeroUnico'
ALTER TABLE [dbo].[NumeroUnico]
ADD CONSTRAINT [PK_NumeroUnico]
    PRIMARY KEY CLUSTERED ([NumeroUnicoID] ASC);
GO

-- Creating primary key on [NumeroUnicoCorteID] in table 'NumeroUnicoCorte'
ALTER TABLE [dbo].[NumeroUnicoCorte]
ADD CONSTRAINT [PK_NumeroUnicoCorte]
    PRIMARY KEY CLUSTERED ([NumeroUnicoCorteID] ASC);
GO

-- Creating primary key on [NumeroUnicoID] in table 'NumeroUnicoInventario'
ALTER TABLE [dbo].[NumeroUnicoInventario]
ADD CONSTRAINT [PK_NumeroUnicoInventario]
    PRIMARY KEY CLUSTERED ([NumeroUnicoID] ASC);
GO

-- Creating primary key on [NumeroUnicoMovimientoID] in table 'NumeroUnicoMovimiento'
ALTER TABLE [dbo].[NumeroUnicoMovimiento]
ADD CONSTRAINT [PK_NumeroUnicoMovimiento]
    PRIMARY KEY CLUSTERED ([NumeroUnicoMovimientoID] ASC);
GO

-- Creating primary key on [NumeroUnicoSegmentoID] in table 'NumeroUnicoSegmento'
ALTER TABLE [dbo].[NumeroUnicoSegmento]
ADD CONSTRAINT [PK_NumeroUnicoSegmento]
    PRIMARY KEY CLUSTERED ([NumeroUnicoSegmentoID] ASC);
GO

-- Creating primary key on [OrdenTrabajoID] in table 'OrdenTrabajo'
ALTER TABLE [dbo].[OrdenTrabajo]
ADD CONSTRAINT [PK_OrdenTrabajo]
    PRIMARY KEY CLUSTERED ([OrdenTrabajoID] ASC);
GO

-- Creating primary key on [OrdenTrabajoSpoolID] in table 'OrdenTrabajoSpool'
ALTER TABLE [dbo].[OrdenTrabajoSpool]
ADD CONSTRAINT [PK_OrdenTrabajoSpool]
    PRIMARY KEY CLUSTERED ([OrdenTrabajoSpoolID] ASC);
GO

-- Creating primary key on [PackingListID] in table 'PackingList'
ALTER TABLE [dbo].[PackingList]
ADD CONSTRAINT [PK_PackingList]
    PRIMARY KEY CLUSTERED ([PackingListID] ASC);
GO

-- Creating primary key on [PaginaID] in table 'Pagina'
ALTER TABLE [dbo].[Pagina]
ADD CONSTRAINT [PK_Pagina]
    PRIMARY KEY CLUSTERED ([PaginaID] ASC);
GO

-- Creating primary key on [PatioID] in table 'Patio'
ALTER TABLE [dbo].[Patio]
ADD CONSTRAINT [PK_Patio]
    PRIMARY KEY CLUSTERED ([PatioID] ASC);
GO

-- Creating primary key on [PerfilID] in table 'Perfil'
ALTER TABLE [dbo].[Perfil]
ADD CONSTRAINT [PK_Perfil]
    PRIMARY KEY CLUSTERED ([PerfilID] ASC);
GO

-- Creating primary key on [PermisoAduanaID] in table 'PermisoAduana'
ALTER TABLE [dbo].[PermisoAduana]
ADD CONSTRAINT [PK_PermisoAduana]
    PRIMARY KEY CLUSTERED ([PermisoAduanaID] ASC);
GO

-- Creating primary key on [PinturaNumeroUnicoID] in table 'PinturaNumeroUnico'
ALTER TABLE [dbo].[PinturaNumeroUnico]
ADD CONSTRAINT [PK_PinturaNumeroUnico]
    PRIMARY KEY CLUSTERED ([PinturaNumeroUnicoID] ASC);
GO

-- Creating primary key on [PlanaID] in table 'Plana'
ALTER TABLE [dbo].[Plana]
ADD CONSTRAINT [PK_Plana]
    PRIMARY KEY CLUSTERED ([PlanaID] ASC);
GO

-- Creating primary key on [PreferenciaId] in table 'Preferencia'
ALTER TABLE [dbo].[Preferencia]
ADD CONSTRAINT [PK_Preferencia]
    PRIMARY KEY CLUSTERED ([PreferenciaId] ASC);
GO

-- Creating primary key on [PropiedadID] in table 'Propiedad'
ALTER TABLE [dbo].[Propiedad]
ADD CONSTRAINT [PK_Propiedad]
    PRIMARY KEY CLUSTERED ([PropiedadID] ASC);
GO

-- Creating primary key on [ProveedorID] in table 'Proveedor'
ALTER TABLE [dbo].[Proveedor]
ADD CONSTRAINT [PK_Proveedor]
    PRIMARY KEY CLUSTERED ([ProveedorID] ASC);
GO

-- Creating primary key on [ProyectoID] in table 'Proyecto'
ALTER TABLE [dbo].[Proyecto]
ADD CONSTRAINT [PK_Proyecto]
    PRIMARY KEY CLUSTERED ([ProyectoID] ASC);
GO

-- Creating primary key on [RecepcionID] in table 'Recepcion'
ALTER TABLE [dbo].[Recepcion]
ADD CONSTRAINT [PK_Recepcion]
    PRIMARY KEY CLUSTERED ([RecepcionID] ASC);
GO

-- Creating primary key on [TipoDocumentoID] in table 'Rel_Documento_Entidad'
ALTER TABLE [dbo].[Rel_Documento_Entidad]
ADD CONSTRAINT [PK_Rel_Documento_Entidad]
    PRIMARY KEY CLUSTERED ([TipoDocumentoID] ASC);
GO

-- Creating primary key on [FolioAvisoLlegadaID] in table 'Rel_FolioAvisoLlegada_Proyecto'
ALTER TABLE [dbo].[Rel_FolioAvisoLlegada_Proyecto]
ADD CONSTRAINT [PK_Rel_FolioAvisoLlegada_Proyecto]
    PRIMARY KEY CLUSTERED ([FolioAvisoLlegadaID] ASC);
GO

-- Creating primary key on [IncidenciaID] in table 'Rel_Incidencia_Entidad'
ALTER TABLE [dbo].[Rel_Incidencia_Entidad]
ADD CONSTRAINT [PK_Rel_Incidencia_Entidad]
    PRIMARY KEY CLUSTERED ([IncidenciaID] ASC);
GO

-- Creating primary key on [PerfilID], [PropiedadID], [PaginaID] in table 'Rel_Perfil_Propiedad_Pagina'
ALTER TABLE [dbo].[Rel_Perfil_Propiedad_Pagina]
ADD CONSTRAINT [PK_Rel_Perfil_Propiedad_Pagina]
    PRIMARY KEY CLUSTERED ([PerfilID], [PropiedadID], [PaginaID] ASC);
GO

-- Creating primary key on [UsuarioID] in table 'Rel_Usuario_Preferencia'
ALTER TABLE [dbo].[Rel_Usuario_Preferencia]
ADD CONSTRAINT [PK_Rel_Usuario_Preferencia]
    PRIMARY KEY CLUSTERED ([UsuarioID] ASC);
GO

-- Creating primary key on [ProyectoID], [UsuarioID] in table 'Rel_Usuario_Proyecto'
ALTER TABLE [dbo].[Rel_Usuario_Proyecto]
ADD CONSTRAINT [PK_Rel_Usuario_Proyecto]
    PRIMARY KEY CLUSTERED ([ProyectoID], [UsuarioID] ASC);
GO

-- Creating primary key on [RepositorioId] in table 'Repositorio'
ALTER TABLE [dbo].[Repositorio]
ADD CONSTRAINT [PK_Repositorio]
    PRIMARY KEY CLUSTERED ([RepositorioId] ASC);
GO

-- Creating primary key on [RequisicionNumeroUnicoID] in table 'RequisicionNumeroUnico'
ALTER TABLE [dbo].[RequisicionNumeroUnico]
ADD CONSTRAINT [PK_RequisicionNumeroUnico]
    PRIMARY KEY CLUSTERED ([RequisicionNumeroUnicoID] ASC);
GO

-- Creating primary key on [RequisicionNumeroUnicoDetalleID] in table 'RequisicionNumeroUnicoDetalle'
ALTER TABLE [dbo].[RequisicionNumeroUnicoDetalle]
ADD CONSTRAINT [PK_RequisicionNumeroUnicoDetalle]
    PRIMARY KEY CLUSTERED ([RequisicionNumeroUnicoDetalleID] ASC);
GO

-- Creating primary key on [SesionID] in table 'Sesion'
ALTER TABLE [dbo].[Sesion]
ADD CONSTRAINT [PK_Sesion]
    PRIMARY KEY CLUSTERED ([SesionID] ASC);
GO

-- Creating primary key on [SpoolID] in table 'Spool'
ALTER TABLE [dbo].[Spool]
ADD CONSTRAINT [PK_Spool]
    PRIMARY KEY CLUSTERED ([SpoolID] ASC);
GO

-- Creating primary key on [diagram_id] in table 'sysdiagrams'
ALTER TABLE [dbo].[sysdiagrams]
ADD CONSTRAINT [PK_sysdiagrams]
    PRIMARY KEY CLUSTERED ([diagram_id] ASC);
GO

-- Creating primary key on [TallerID] in table 'Taller'
ALTER TABLE [dbo].[Taller]
ADD CONSTRAINT [PK_Taller]
    PRIMARY KEY CLUSTERED ([TallerID] ASC);
GO

-- Creating primary key on [TipoActividadID] in table 'TipoActividad'
ALTER TABLE [dbo].[TipoActividad]
ADD CONSTRAINT [PK_TipoActividad]
    PRIMARY KEY CLUSTERED ([TipoActividadID] ASC);
GO

-- Creating primary key on [TipoCorteID] in table 'TipoCorte'
ALTER TABLE [dbo].[TipoCorte]
ADD CONSTRAINT [PK_TipoCorte]
    PRIMARY KEY CLUSTERED ([TipoCorteID] ASC);
GO

-- Creating primary key on [TipoDocumentoID] in table 'TipoDocumento'
ALTER TABLE [dbo].[TipoDocumento]
ADD CONSTRAINT [PK_TipoDocumento]
    PRIMARY KEY CLUSTERED ([TipoDocumentoID] ASC);
GO

-- Creating primary key on [TipoMaterialID] in table 'TipoMaterial'
ALTER TABLE [dbo].[TipoMaterial]
ADD CONSTRAINT [PK_TipoMaterial]
    PRIMARY KEY CLUSTERED ([TipoMaterialID] ASC);
GO

-- Creating primary key on [TipoMovimientoID] in table 'TipoMovimiento'
ALTER TABLE [dbo].[TipoMovimiento]
ADD CONSTRAINT [PK_TipoMovimiento]
    PRIMARY KEY CLUSTERED ([TipoMovimientoID] ASC);
GO

-- Creating primary key on [TipoNotificacionID] in table 'TipoNotificacion'
ALTER TABLE [dbo].[TipoNotificacion]
ADD CONSTRAINT [PK_TipoNotificacion]
    PRIMARY KEY CLUSTERED ([TipoNotificacionID] ASC);
GO

-- Creating primary key on [TransportistaID] in table 'Transportista'
ALTER TABLE [dbo].[Transportista]
ADD CONSTRAINT [PK_Transportista]
    PRIMARY KEY CLUSTERED ([TransportistaID] ASC);
GO

-- Creating primary key on [UbicacionFisicaID] in table 'UbicacionFisica'
ALTER TABLE [dbo].[UbicacionFisica]
ADD CONSTRAINT [PK_UbicacionFisica]
    PRIMARY KEY CLUSTERED ([UbicacionFisicaID] ASC);
GO

-- Creating primary key on [UsuarioID] in table 'Usuario'
ALTER TABLE [dbo].[Usuario]
ADD CONSTRAINT [PK_Usuario]
    PRIMARY KEY CLUSTERED ([UsuarioID] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [FamiliaAceroID] in table 'Acero'
ALTER TABLE [dbo].[Acero]
ADD CONSTRAINT [FK_Acero_FamiliaAcero]
    FOREIGN KEY ([FamiliaAceroID])
    REFERENCES [dbo].[FamiliaAcero]
        ([FamiliaAceroID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Acero_FamiliaAcero'
CREATE INDEX [IX_FK_Acero_FamiliaAcero]
ON [dbo].[Acero]
    ([FamiliaAceroID]);
GO

-- Creating foreign key on [AceroID] in table 'Colada'
ALTER TABLE [dbo].[Colada]
ADD CONSTRAINT [FK_Colada_Acero]
    FOREIGN KEY ([AceroID])
    REFERENCES [dbo].[Acero]
        ([AceroID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Colada_Acero'
CREATE INDEX [IX_FK_Colada_Acero]
ON [dbo].[Colada]
    ([AceroID]);
GO

-- Creating foreign key on [EntidadId] in table 'Bitacora'
ALTER TABLE [dbo].[Bitacora]
ADD CONSTRAINT [FK_Bitacora_Entidad]
    FOREIGN KEY ([EntidadId])
    REFERENCES [dbo].[Entidad]
        ([EntidadID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Bitacora_Entidad'
CREATE INDEX [IX_FK_Bitacora_Entidad]
ON [dbo].[Bitacora]
    ([EntidadId]);
GO

-- Creating foreign key on [TipoActividadID] in table 'Bitacora'
ALTER TABLE [dbo].[Bitacora]
ADD CONSTRAINT [FK_Bitacora_TipoActividad]
    FOREIGN KEY ([TipoActividadID])
    REFERENCES [dbo].[TipoActividad]
        ([TipoActividadID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Bitacora_TipoActividad'
CREATE INDEX [IX_FK_Bitacora_TipoActividad]
ON [dbo].[Bitacora]
    ([TipoActividadID]);
GO

-- Creating foreign key on [UsuarioId] in table 'Bitacora'
ALTER TABLE [dbo].[Bitacora]
ADD CONSTRAINT [FK_Bitacora_Usuario]
    FOREIGN KEY ([UsuarioId])
    REFERENCES [dbo].[Usuario]
        ([UsuarioID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Bitacora_Usuario'
CREATE INDEX [IX_FK_Bitacora_Usuario]
ON [dbo].[Bitacora]
    ([UsuarioId]);
GO

-- Creating foreign key on [ChoferID] in table 'Camion'
ALTER TABLE [dbo].[Camion]
ADD CONSTRAINT [FK_Camion_Chofer]
    FOREIGN KEY ([ChoferID])
    REFERENCES [dbo].[Chofer]
        ([ChoferID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Camion_Chofer'
CREATE INDEX [IX_FK_Camion_Chofer]
ON [dbo].[Camion]
    ([ChoferID]);
GO

-- Creating foreign key on [EntidadID] in table 'Camion'
ALTER TABLE [dbo].[Camion]
ADD CONSTRAINT [FK_Camion_Entidad]
    FOREIGN KEY ([EntidadID])
    REFERENCES [dbo].[Entidad]
        ([EntidadID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Camion_Entidad'
CREATE INDEX [IX_FK_Camion_Entidad]
ON [dbo].[Camion]
    ([EntidadID]);
GO

-- Creating foreign key on [CamionID] in table 'PackingList'
ALTER TABLE [dbo].[PackingList]
ADD CONSTRAINT [FK_Camion_PackingList]
    FOREIGN KEY ([CamionID])
    REFERENCES [dbo].[Camion]
        ([CamionID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Camion_PackingList'
CREATE INDEX [IX_FK_Camion_PackingList]
ON [dbo].[PackingList]
    ([CamionID]);
GO

-- Creating foreign key on [TransportistaID] in table 'Camion'
ALTER TABLE [dbo].[Camion]
ADD CONSTRAINT [FK_Camion_Transportista]
    FOREIGN KEY ([TransportistaID])
    REFERENCES [dbo].[Transportista]
        ([TransportistaID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Camion_Transportista'
CREATE INDEX [IX_FK_Camion_Transportista]
ON [dbo].[Camion]
    ([TransportistaID]);
GO

-- Creating foreign key on [CamionID] in table 'FolioAvisoLlegada'
ALTER TABLE [dbo].[FolioAvisoLlegada]
ADD CONSTRAINT [FK_FolioAvisoLlegada_Camion]
    FOREIGN KEY ([CamionID])
    REFERENCES [dbo].[Camion]
        ([CamionID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_FolioAvisoLlegada_Camion'
CREATE INDEX [IX_FK_FolioAvisoLlegada_Camion]
ON [dbo].[FolioAvisoLlegada]
    ([CamionID]);
GO

-- Creating foreign key on [CamionID] in table 'Plana'
ALTER TABLE [dbo].[Plana]
ADD CONSTRAINT [FK_Plana_Camion]
    FOREIGN KEY ([CamionID])
    REFERENCES [dbo].[Camion]
        ([CamionID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Plana_Camion'
CREATE INDEX [IX_FK_Plana_Camion]
ON [dbo].[Plana]
    ([CamionID]);
GO

-- Creating foreign key on [ClienteID] in table 'Proyecto'
ALTER TABLE [dbo].[Proyecto]
ADD CONSTRAINT [FK_Proyecto_Cliente]
    FOREIGN KEY ([ClienteID])
    REFERENCES [dbo].[Cliente]
        ([ClienteID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Proyecto_Cliente'
CREATE INDEX [IX_FK_Proyecto_Cliente]
ON [dbo].[Proyecto]
    ([ClienteID]);
GO

-- Creating foreign key on [FabricanteID] in table 'Colada'
ALTER TABLE [dbo].[Colada]
ADD CONSTRAINT [FK_Colada_Fabricante]
    FOREIGN KEY ([FabricanteID])
    REFERENCES [dbo].[Fabricante]
        ([FabricanteID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Colada_Fabricante'
CREATE INDEX [IX_FK_Colada_Fabricante]
ON [dbo].[Colada]
    ([FabricanteID]);
GO

-- Creating foreign key on [ProyectoID] in table 'Colada'
ALTER TABLE [dbo].[Colada]
ADD CONSTRAINT [FK_Colada_Proyecto]
    FOREIGN KEY ([ProyectoID])
    REFERENCES [dbo].[Proyecto]
        ([ProyectoID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Colada_Proyecto'
CREATE INDEX [IX_FK_Colada_Proyecto]
ON [dbo].[Colada]
    ([ProyectoID]);
GO

-- Creating foreign key on [ColadaID] in table 'NumeroUnico'
ALTER TABLE [dbo].[NumeroUnico]
ADD CONSTRAINT [FK_NumeroUnico_Colada]
    FOREIGN KEY ([ColadaID])
    REFERENCES [dbo].[Colada]
        ([ColadaID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_NumeroUnico_Colada'
CREATE INDEX [IX_FK_NumeroUnico_Colada]
ON [dbo].[NumeroUnico]
    ([ColadaID]);
GO

-- Creating foreign key on [ColorID] in table 'Proyecto'
ALTER TABLE [dbo].[Proyecto]
ADD CONSTRAINT [FK_Proyecto_Color]
    FOREIGN KEY ([ColorID])
    REFERENCES [dbo].[Color]
        ([ColorID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Proyecto_Color'
CREATE INDEX [IX_FK_Proyecto_Color]
ON [dbo].[Proyecto]
    ([ColorID]);
GO

-- Creating foreign key on [ContactoID] in table 'Fabricante'
ALTER TABLE [dbo].[Fabricante]
ADD CONSTRAINT [FK_Fabricante_Contacto]
    FOREIGN KEY ([ContactoID])
    REFERENCES [dbo].[Contacto]
        ([ContactoID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Fabricante_Contacto'
CREATE INDEX [IX_FK_Fabricante_Contacto]
ON [dbo].[Fabricante]
    ([ContactoID]);
GO

-- Creating foreign key on [ContactoID] in table 'Proveedor'
ALTER TABLE [dbo].[Proveedor]
ADD CONSTRAINT [FK_Proveedor_Contacto]
    FOREIGN KEY ([ContactoID])
    REFERENCES [dbo].[Contacto]
        ([ContactoID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Proveedor_Contacto'
CREATE INDEX [IX_FK_Proveedor_Contacto]
ON [dbo].[Proveedor]
    ([ContactoID]);
GO

-- Creating foreign key on [ContactoID] in table 'Proyecto'
ALTER TABLE [dbo].[Proyecto]
ADD CONSTRAINT [FK_Proyecto_Contacto]
    FOREIGN KEY ([ContactoID])
    REFERENCES [dbo].[Contacto]
        ([ContactoID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Proyecto_Contacto'
CREATE INDEX [IX_FK_Proyecto_Contacto]
ON [dbo].[Proyecto]
    ([ContactoID]);
GO

-- Creating foreign key on [ContactoID] in table 'Transportista'
ALTER TABLE [dbo].[Transportista]
ADD CONSTRAINT [FK_Transportista_Contacto]
    FOREIGN KEY ([ContactoID])
    REFERENCES [dbo].[Contacto]
        ([ContactoID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Transportista_Contacto'
CREATE INDEX [IX_FK_Transportista_Contacto]
ON [dbo].[Transportista]
    ([ContactoID]);
GO

-- Creating foreign key on [NumeroUnicoCorteID] in table 'Corte'
ALTER TABLE [dbo].[Corte]
ADD CONSTRAINT [FK_Corte_NumeroUnicoCorte]
    FOREIGN KEY ([NumeroUnicoCorteID])
    REFERENCES [dbo].[NumeroUnicoCorte]
        ([NumeroUnicoCorteID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Corte_NumeroUnicoCorte'
CREATE INDEX [IX_FK_Corte_NumeroUnicoCorte]
ON [dbo].[Corte]
    ([NumeroUnicoCorteID]);
GO

-- Creating foreign key on [MermaMovimientoID] in table 'Corte'
ALTER TABLE [dbo].[Corte]
ADD CONSTRAINT [FK_Corte_NumeroUnicoMovimiento_Merma]
    FOREIGN KEY ([MermaMovimientoID])
    REFERENCES [dbo].[NumeroUnicoMovimiento]
        ([NumeroUnicoMovimientoID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Corte_NumeroUnicoMovimiento_Merma'
CREATE INDEX [IX_FK_Corte_NumeroUnicoMovimiento_Merma]
ON [dbo].[Corte]
    ([MermaMovimientoID]);
GO

-- Creating foreign key on [PreparacionCorteMovimientoID] in table 'Corte'
ALTER TABLE [dbo].[Corte]
ADD CONSTRAINT [FK_Corte_NumeroUnicoMovimiento_Preparacion]
    FOREIGN KEY ([PreparacionCorteMovimientoID])
    REFERENCES [dbo].[NumeroUnicoMovimiento]
        ([NumeroUnicoMovimientoID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Corte_NumeroUnicoMovimiento_Preparacion'
CREATE INDEX [IX_FK_Corte_NumeroUnicoMovimiento_Preparacion]
ON [dbo].[Corte]
    ([PreparacionCorteMovimientoID]);
GO

-- Creating foreign key on [ProyectoID] in table 'Corte'
ALTER TABLE [dbo].[Corte]
ADD CONSTRAINT [FK_Corte_Proyecto]
    FOREIGN KEY ([ProyectoID])
    REFERENCES [dbo].[Proyecto]
        ([ProyectoID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Corte_Proyecto'
CREATE INDEX [IX_FK_Corte_Proyecto]
ON [dbo].[Corte]
    ([ProyectoID]);
GO

-- Creating foreign key on [CorteID] in table 'CorteDetalle'
ALTER TABLE [dbo].[CorteDetalle]
ADD CONSTRAINT [FK_CorteDetalle_Corte]
    FOREIGN KEY ([CorteID])
    REFERENCES [dbo].[Corte]
        ([CorteID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_CorteDetalle_Corte'
CREATE INDEX [IX_FK_CorteDetalle_Corte]
ON [dbo].[CorteDetalle]
    ([CorteID]);
GO

-- Creating foreign key on [MaquinaID] in table 'CorteDetalle'
ALTER TABLE [dbo].[CorteDetalle]
ADD CONSTRAINT [FK_CorteDetalle_Maquina]
    FOREIGN KEY ([MaquinaID])
    REFERENCES [dbo].[Maquina]
        ([MaquinaID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_CorteDetalle_Maquina'
CREATE INDEX [IX_FK_CorteDetalle_Maquina]
ON [dbo].[CorteDetalle]
    ([MaquinaID]);
GO

-- Creating foreign key on [MaterialSpoolID] in table 'CorteDetalle'
ALTER TABLE [dbo].[CorteDetalle]
ADD CONSTRAINT [FK_CorteDetalle_MaterialSpool]
    FOREIGN KEY ([MaterialSpoolID])
    REFERENCES [dbo].[MaterialSpool]
        ([MaterialSpoolID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_CorteDetalle_MaterialSpool'
CREATE INDEX [IX_FK_CorteDetalle_MaterialSpool]
ON [dbo].[CorteDetalle]
    ([MaterialSpoolID]);
GO

-- Creating foreign key on [SalidaInventarioID] in table 'CorteDetalle'
ALTER TABLE [dbo].[CorteDetalle]
ADD CONSTRAINT [FK_CorteDetalle_NumeroUnicoMovimiento]
    FOREIGN KEY ([SalidaInventarioID])
    REFERENCES [dbo].[NumeroUnicoMovimiento]
        ([NumeroUnicoMovimientoID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_CorteDetalle_NumeroUnicoMovimiento'
CREATE INDEX [IX_FK_CorteDetalle_NumeroUnicoMovimiento]
ON [dbo].[CorteDetalle]
    ([SalidaInventarioID]);
GO

-- Creating foreign key on [OrdenTrabajoSpoolID] in table 'CorteDetalle'
ALTER TABLE [dbo].[CorteDetalle]
ADD CONSTRAINT [FK_CorteDetalle_OrdenTrabajoSpool]
    FOREIGN KEY ([OrdenTrabajoSpoolID])
    REFERENCES [dbo].[OrdenTrabajoSpool]
        ([OrdenTrabajoSpoolID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_CorteDetalle_OrdenTrabajoSpool'
CREATE INDEX [IX_FK_CorteDetalle_OrdenTrabajoSpool]
ON [dbo].[CorteDetalle]
    ([OrdenTrabajoSpoolID]);
GO

-- Creating foreign key on [MaterialSpoolID] in table 'Despacho'
ALTER TABLE [dbo].[Despacho]
ADD CONSTRAINT [FK_Despacho_MaterialSpool]
    FOREIGN KEY ([MaterialSpoolID])
    REFERENCES [dbo].[MaterialSpool]
        ([MaterialSpoolID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Despacho_MaterialSpool'
CREATE INDEX [IX_FK_Despacho_MaterialSpool]
ON [dbo].[Despacho]
    ([MaterialSpoolID]);
GO

-- Creating foreign key on [NumeroUnicoID] in table 'Despacho'
ALTER TABLE [dbo].[Despacho]
ADD CONSTRAINT [FK_Despacho_NumeroUnico]
    FOREIGN KEY ([NumeroUnicoID])
    REFERENCES [dbo].[NumeroUnico]
        ([NumeroUnicoID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Despacho_NumeroUnico'
CREATE INDEX [IX_FK_Despacho_NumeroUnico]
ON [dbo].[Despacho]
    ([NumeroUnicoID]);
GO

-- Creating foreign key on [SalidaInventarioID] in table 'Despacho'
ALTER TABLE [dbo].[Despacho]
ADD CONSTRAINT [FK_Despacho_NumeroUnicoMovimiento]
    FOREIGN KEY ([SalidaInventarioID])
    REFERENCES [dbo].[NumeroUnicoMovimiento]
        ([NumeroUnicoMovimientoID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Despacho_NumeroUnicoMovimiento'
CREATE INDEX [IX_FK_Despacho_NumeroUnicoMovimiento]
ON [dbo].[Despacho]
    ([SalidaInventarioID]);
GO

-- Creating foreign key on [OrdenTrabajoSpoolID] in table 'Despacho'
ALTER TABLE [dbo].[Despacho]
ADD CONSTRAINT [FK_Despacho_OrdenTrabajoSpool]
    FOREIGN KEY ([OrdenTrabajoSpoolID])
    REFERENCES [dbo].[OrdenTrabajoSpool]
        ([OrdenTrabajoSpoolID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Despacho_OrdenTrabajoSpool'
CREATE INDEX [IX_FK_Despacho_OrdenTrabajoSpool]
ON [dbo].[Despacho]
    ([OrdenTrabajoSpoolID]);
GO

-- Creating foreign key on [ProyectoID] in table 'Despacho'
ALTER TABLE [dbo].[Despacho]
ADD CONSTRAINT [FK_Despacho_Proyecto]
    FOREIGN KEY ([ProyectoID])
    REFERENCES [dbo].[Proyecto]
        ([ProyectoID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Despacho_Proyecto'
CREATE INDEX [IX_FK_Despacho_Proyecto]
ON [dbo].[Despacho]
    ([ProyectoID]);
GO

-- Creating foreign key on [PerfilID] in table 'Entidad'
ALTER TABLE [dbo].[Entidad]
ADD CONSTRAINT [FK_Entidad_Perfil]
    FOREIGN KEY ([PerfilID])
    REFERENCES [dbo].[Perfil]
        ([PerfilID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Entidad_Perfil'
CREATE INDEX [IX_FK_Entidad_Perfil]
ON [dbo].[Entidad]
    ([PerfilID]);
GO

-- Creating foreign key on [EntidadID] in table 'ExtensionDocumento'
ALTER TABLE [dbo].[ExtensionDocumento]
ADD CONSTRAINT [FK_ExtensionDocumento_Entidad]
    FOREIGN KEY ([EntidadID])
    REFERENCES [dbo].[Entidad]
        ([EntidadID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_ExtensionDocumento_Entidad'
CREATE INDEX [IX_FK_ExtensionDocumento_Entidad]
ON [dbo].[ExtensionDocumento]
    ([EntidadID]);
GO

-- Creating foreign key on [EntidadID] in table 'FamiliaItemCode'
ALTER TABLE [dbo].[FamiliaItemCode]
ADD CONSTRAINT [FK_FamiliaItemCode_Entidad]
    FOREIGN KEY ([EntidadID])
    REFERENCES [dbo].[Entidad]
        ([EntidadID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_FamiliaItemCode_Entidad'
CREATE INDEX [IX_FK_FamiliaItemCode_Entidad]
ON [dbo].[FamiliaItemCode]
    ([EntidadID]);
GO

-- Creating foreign key on [EntidadID] in table 'FolioAvisoLlegada'
ALTER TABLE [dbo].[FolioAvisoLlegada]
ADD CONSTRAINT [FK_FolioAvisoLlegada_Entidad]
    FOREIGN KEY ([EntidadID])
    REFERENCES [dbo].[Entidad]
        ([EntidadID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_FolioAvisoLlegada_Entidad'
CREATE INDEX [IX_FK_FolioAvisoLlegada_Entidad]
ON [dbo].[FolioAvisoLlegada]
    ([EntidadID]);
GO

-- Creating foreign key on [EntidadID] in table 'FolioLlegada'
ALTER TABLE [dbo].[FolioLlegada]
ADD CONSTRAINT [FK_FolioLlegada_Entidad]
    FOREIGN KEY ([EntidadID])
    REFERENCES [dbo].[Entidad]
        ([EntidadID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_FolioLlegada_Entidad'
CREATE INDEX [IX_FK_FolioLlegada_Entidad]
ON [dbo].[FolioLlegada]
    ([EntidadID]);
GO

-- Creating foreign key on [EntidadID] in table 'FolioPackingList'
ALTER TABLE [dbo].[FolioPackingList]
ADD CONSTRAINT [FK_FolioPackingList_Entidad]
    FOREIGN KEY ([EntidadID])
    REFERENCES [dbo].[Entidad]
        ([EntidadID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_FolioPackingList_Entidad'
CREATE INDEX [IX_FK_FolioPackingList_Entidad]
ON [dbo].[FolioPackingList]
    ([EntidadID]);
GO

-- Creating foreign key on [EntidadID] in table 'Incidencia'
ALTER TABLE [dbo].[Incidencia]
ADD CONSTRAINT [FK_Incidencia_Entidad]
    FOREIGN KEY ([EntidadID])
    REFERENCES [dbo].[Entidad]
        ([EntidadID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Incidencia_Entidad'
CREATE INDEX [IX_FK_Incidencia_Entidad]
ON [dbo].[Incidencia]
    ([EntidadID]);
GO

-- Creating foreign key on [EntidadID] in table 'MenuContextual'
ALTER TABLE [dbo].[MenuContextual]
ADD CONSTRAINT [FK_MenuContextual_Entidad]
    FOREIGN KEY ([EntidadID])
    REFERENCES [dbo].[Entidad]
        ([EntidadID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_MenuContextual_Entidad'
CREATE INDEX [IX_FK_MenuContextual_Entidad]
ON [dbo].[MenuContextual]
    ([EntidadID]);
GO

-- Creating foreign key on [EntidadID] in table 'Notificacion'
ALTER TABLE [dbo].[Notificacion]
ADD CONSTRAINT [FK_Notificacion_Entidad]
    FOREIGN KEY ([EntidadID])
    REFERENCES [dbo].[Entidad]
        ([EntidadID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Notificacion_Entidad'
CREATE INDEX [IX_FK_Notificacion_Entidad]
ON [dbo].[Notificacion]
    ([EntidadID]);
GO

-- Creating foreign key on [EntidadID] in table 'NumeroUnico'
ALTER TABLE [dbo].[NumeroUnico]
ADD CONSTRAINT [FK_NumeroUnico_Entidad]
    FOREIGN KEY ([EntidadID])
    REFERENCES [dbo].[Entidad]
        ([EntidadID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_NumeroUnico_Entidad'
CREATE INDEX [IX_FK_NumeroUnico_Entidad]
ON [dbo].[NumeroUnico]
    ([EntidadID]);
GO

-- Creating foreign key on [EntidadID] in table 'NumeroUnicoInventario'
ALTER TABLE [dbo].[NumeroUnicoInventario]
ADD CONSTRAINT [FK_NumeroUnicoInventario_Entidad]
    FOREIGN KEY ([EntidadID])
    REFERENCES [dbo].[Entidad]
        ([EntidadID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_NumeroUnicoInventario_Entidad'
CREATE INDEX [IX_FK_NumeroUnicoInventario_Entidad]
ON [dbo].[NumeroUnicoInventario]
    ([EntidadID]);
GO

-- Creating foreign key on [EntidadID] in table 'NumeroUnicoMovimiento'
ALTER TABLE [dbo].[NumeroUnicoMovimiento]
ADD CONSTRAINT [FK_NumeroUnicoMovimiento_Entidad]
    FOREIGN KEY ([EntidadID])
    REFERENCES [dbo].[Entidad]
        ([EntidadID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_NumeroUnicoMovimiento_Entidad'
CREATE INDEX [IX_FK_NumeroUnicoMovimiento_Entidad]
ON [dbo].[NumeroUnicoMovimiento]
    ([EntidadID]);
GO

-- Creating foreign key on [EntidadID] in table 'NumeroUnicoSegmento'
ALTER TABLE [dbo].[NumeroUnicoSegmento]
ADD CONSTRAINT [FK_NumeroUnicoSegmento_Entidad]
    FOREIGN KEY ([EntidadID])
    REFERENCES [dbo].[Entidad]
        ([EntidadID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_NumeroUnicoSegmento_Entidad'
CREATE INDEX [IX_FK_NumeroUnicoSegmento_Entidad]
ON [dbo].[NumeroUnicoSegmento]
    ([EntidadID]);
GO

-- Creating foreign key on [EntidadID] in table 'PackingList'
ALTER TABLE [dbo].[PackingList]
ADD CONSTRAINT [FK_PackingList_Entidad]
    FOREIGN KEY ([EntidadID])
    REFERENCES [dbo].[Entidad]
        ([EntidadID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_PackingList_Entidad'
CREATE INDEX [IX_FK_PackingList_Entidad]
ON [dbo].[PackingList]
    ([EntidadID]);
GO

-- Creating foreign key on [EntidadID] in table 'Pagina'
ALTER TABLE [dbo].[Pagina]
ADD CONSTRAINT [FK_Pagina_Entidad]
    FOREIGN KEY ([EntidadID])
    REFERENCES [dbo].[Entidad]
        ([EntidadID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Pagina_Entidad'
CREATE INDEX [IX_FK_Pagina_Entidad]
ON [dbo].[Pagina]
    ([EntidadID]);
GO

-- Creating foreign key on [EntidadID] in table 'Perfil'
ALTER TABLE [dbo].[Perfil]
ADD CONSTRAINT [FK_Perfil_Entidad]
    FOREIGN KEY ([EntidadID])
    REFERENCES [dbo].[Entidad]
        ([EntidadID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Perfil_Entidad'
CREATE INDEX [IX_FK_Perfil_Entidad]
ON [dbo].[Perfil]
    ([EntidadID]);
GO

-- Creating foreign key on [EntidadID] in table 'PermisoAduana'
ALTER TABLE [dbo].[PermisoAduana]
ADD CONSTRAINT [FK_PermisoAduana_Entidad]
    FOREIGN KEY ([EntidadID])
    REFERENCES [dbo].[Entidad]
        ([EntidadID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_PermisoAduana_Entidad'
CREATE INDEX [IX_FK_PermisoAduana_Entidad]
ON [dbo].[PermisoAduana]
    ([EntidadID]);
GO

-- Creating foreign key on [EntidadID] in table 'Plana'
ALTER TABLE [dbo].[Plana]
ADD CONSTRAINT [FK_Plana_Entidad]
    FOREIGN KEY ([EntidadID])
    REFERENCES [dbo].[Entidad]
        ([EntidadID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Plana_Entidad'
CREATE INDEX [IX_FK_Plana_Entidad]
ON [dbo].[Plana]
    ([EntidadID]);
GO

-- Creating foreign key on [EntidadID] in table 'Preferencia'
ALTER TABLE [dbo].[Preferencia]
ADD CONSTRAINT [FK_Preferencia_Entidad]
    FOREIGN KEY ([EntidadID])
    REFERENCES [dbo].[Entidad]
        ([EntidadID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Preferencia_Entidad'
CREATE INDEX [IX_FK_Preferencia_Entidad]
ON [dbo].[Preferencia]
    ([EntidadID]);
GO

-- Creating foreign key on [EntidadID] in table 'Propiedad'
ALTER TABLE [dbo].[Propiedad]
ADD CONSTRAINT [FK_Propiedad_Entidad]
    FOREIGN KEY ([EntidadID])
    REFERENCES [dbo].[Entidad]
        ([EntidadID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Propiedad_Entidad'
CREATE INDEX [IX_FK_Propiedad_Entidad]
ON [dbo].[Propiedad]
    ([EntidadID]);
GO

-- Creating foreign key on [EntidadID] in table 'Recepcion'
ALTER TABLE [dbo].[Recepcion]
ADD CONSTRAINT [FK_Recepcion_Entidad]
    FOREIGN KEY ([EntidadID])
    REFERENCES [dbo].[Entidad]
        ([EntidadID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Recepcion_Entidad'
CREATE INDEX [IX_FK_Recepcion_Entidad]
ON [dbo].[Recepcion]
    ([EntidadID]);
GO

-- Creating foreign key on [EntidadID] in table 'Rel_Documento_Entidad'
ALTER TABLE [dbo].[Rel_Documento_Entidad]
ADD CONSTRAINT [FK_Rel_Documento_Entidad_Entidad]
    FOREIGN KEY ([EntidadID])
    REFERENCES [dbo].[Entidad]
        ([EntidadID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Rel_Documento_Entidad_Entidad'
CREATE INDEX [IX_FK_Rel_Documento_Entidad_Entidad]
ON [dbo].[Rel_Documento_Entidad]
    ([EntidadID]);
GO

-- Creating foreign key on [EntidadID] in table 'Rel_FolioAvisoLlegada_Proyecto'
ALTER TABLE [dbo].[Rel_FolioAvisoLlegada_Proyecto]
ADD CONSTRAINT [FK_Rel_FolioAvisoLlegada_Proyecto_Entidad]
    FOREIGN KEY ([EntidadID])
    REFERENCES [dbo].[Entidad]
        ([EntidadID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Rel_FolioAvisoLlegada_Proyecto_Entidad'
CREATE INDEX [IX_FK_Rel_FolioAvisoLlegada_Proyecto_Entidad]
ON [dbo].[Rel_FolioAvisoLlegada_Proyecto]
    ([EntidadID]);
GO

-- Creating foreign key on [EntidadID] in table 'Rel_Incidencia_Entidad'
ALTER TABLE [dbo].[Rel_Incidencia_Entidad]
ADD CONSTRAINT [FK_Rel_IncidenciaEntidad_Entidad]
    FOREIGN KEY ([EntidadID])
    REFERENCES [dbo].[Entidad]
        ([EntidadID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Rel_IncidenciaEntidad_Entidad'
CREATE INDEX [IX_FK_Rel_IncidenciaEntidad_Entidad]
ON [dbo].[Rel_Incidencia_Entidad]
    ([EntidadID]);
GO

-- Creating foreign key on [EntidadID] in table 'Rel_Perfil_Propiedad_Pagina'
ALTER TABLE [dbo].[Rel_Perfil_Propiedad_Pagina]
ADD CONSTRAINT [FK_Rel_PerfilPropiedadPagina_Entidad]
    FOREIGN KEY ([EntidadID])
    REFERENCES [dbo].[Entidad]
        ([EntidadID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Rel_PerfilPropiedadPagina_Entidad'
CREATE INDEX [IX_FK_Rel_PerfilPropiedadPagina_Entidad]
ON [dbo].[Rel_Perfil_Propiedad_Pagina]
    ([EntidadID]);
GO

-- Creating foreign key on [EntidadID] in table 'Repositorio'
ALTER TABLE [dbo].[Repositorio]
ADD CONSTRAINT [FK_Rel_Repositorio_Entidad]
    FOREIGN KEY ([EntidadID])
    REFERENCES [dbo].[Entidad]
        ([EntidadID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Rel_Repositorio_Entidad'
CREATE INDEX [IX_FK_Rel_Repositorio_Entidad]
ON [dbo].[Repositorio]
    ([EntidadID]);
GO

-- Creating foreign key on [EntidadID] in table 'Rel_Usuario_Preferencia'
ALTER TABLE [dbo].[Rel_Usuario_Preferencia]
ADD CONSTRAINT [FK_Rel_Usuario_Preferencia_Entidad]
    FOREIGN KEY ([EntidadID])
    REFERENCES [dbo].[Entidad]
        ([EntidadID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Rel_Usuario_Preferencia_Entidad'
CREATE INDEX [IX_FK_Rel_Usuario_Preferencia_Entidad]
ON [dbo].[Rel_Usuario_Preferencia]
    ([EntidadID]);
GO

-- Creating foreign key on [EntidadID] in table 'Rel_Usuario_Proyecto'
ALTER TABLE [dbo].[Rel_Usuario_Proyecto]
ADD CONSTRAINT [FK_Rel_UsuarioProyecto_Entidad]
    FOREIGN KEY ([EntidadID])
    REFERENCES [dbo].[Entidad]
        ([EntidadID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Rel_UsuarioProyecto_Entidad'
CREATE INDEX [IX_FK_Rel_UsuarioProyecto_Entidad]
ON [dbo].[Rel_Usuario_Proyecto]
    ([EntidadID]);
GO

-- Creating foreign key on [EntidadID] in table 'RequisicionNumeroUnico'
ALTER TABLE [dbo].[RequisicionNumeroUnico]
ADD CONSTRAINT [FK_RequisicionNumeroUnico_Entidad]
    FOREIGN KEY ([EntidadID])
    REFERENCES [dbo].[Entidad]
        ([EntidadID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_RequisicionNumeroUnico_Entidad'
CREATE INDEX [IX_FK_RequisicionNumeroUnico_Entidad]
ON [dbo].[RequisicionNumeroUnico]
    ([EntidadID]);
GO

-- Creating foreign key on [EntidadID] in table 'RequisicionNumeroUnicoDetalle'
ALTER TABLE [dbo].[RequisicionNumeroUnicoDetalle]
ADD CONSTRAINT [FK_RequisicionNumeroUnicoDetalle_Entidad]
    FOREIGN KEY ([EntidadID])
    REFERENCES [dbo].[Entidad]
        ([EntidadID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_RequisicionNumeroUnicoDetalle_Entidad'
CREATE INDEX [IX_FK_RequisicionNumeroUnicoDetalle_Entidad]
ON [dbo].[RequisicionNumeroUnicoDetalle]
    ([EntidadID]);
GO

-- Creating foreign key on [EntidadID] in table 'Sesion'
ALTER TABLE [dbo].[Sesion]
ADD CONSTRAINT [FK_Sesion_Entidad]
    FOREIGN KEY ([EntidadID])
    REFERENCES [dbo].[Entidad]
        ([EntidadID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Sesion_Entidad'
CREATE INDEX [IX_FK_Sesion_Entidad]
ON [dbo].[Sesion]
    ([EntidadID]);
GO

-- Creating foreign key on [EntidadID] in table 'TipoActividad'
ALTER TABLE [dbo].[TipoActividad]
ADD CONSTRAINT [FK_TipoActividad_Entidad]
    FOREIGN KEY ([EntidadID])
    REFERENCES [dbo].[Entidad]
        ([EntidadID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_TipoActividad_Entidad'
CREATE INDEX [IX_FK_TipoActividad_Entidad]
ON [dbo].[TipoActividad]
    ([EntidadID]);
GO

-- Creating foreign key on [EntidadID] in table 'TipoDocumento'
ALTER TABLE [dbo].[TipoDocumento]
ADD CONSTRAINT [FK_TipoDocumento_Entidad]
    FOREIGN KEY ([EntidadID])
    REFERENCES [dbo].[Entidad]
        ([EntidadID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_TipoDocumento_Entidad'
CREATE INDEX [IX_FK_TipoDocumento_Entidad]
ON [dbo].[TipoDocumento]
    ([EntidadID]);
GO

-- Creating foreign key on [EntidadID] in table 'TipoMovimiento'
ALTER TABLE [dbo].[TipoMovimiento]
ADD CONSTRAINT [FK_TipoMovimiento_Entidad]
    FOREIGN KEY ([EntidadID])
    REFERENCES [dbo].[Entidad]
        ([EntidadID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_TipoMovimiento_Entidad'
CREATE INDEX [IX_FK_TipoMovimiento_Entidad]
ON [dbo].[TipoMovimiento]
    ([EntidadID]);
GO

-- Creating foreign key on [EntidadID] in table 'TipoNotificacion'
ALTER TABLE [dbo].[TipoNotificacion]
ADD CONSTRAINT [FK_TipoNotificacion_Entidad]
    FOREIGN KEY ([EntidadID])
    REFERENCES [dbo].[Entidad]
        ([EntidadID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_TipoNotificacion_Entidad'
CREATE INDEX [IX_FK_TipoNotificacion_Entidad]
ON [dbo].[TipoNotificacion]
    ([EntidadID]);
GO

-- Creating foreign key on [EntidadID] in table 'Usuario'
ALTER TABLE [dbo].[Usuario]
ADD CONSTRAINT [FK_Usuario_Entidad]
    FOREIGN KEY ([EntidadID])
    REFERENCES [dbo].[Entidad]
        ([EntidadID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Usuario_Entidad'
CREATE INDEX [IX_FK_Usuario_Entidad]
ON [dbo].[Usuario]
    ([EntidadID]);
GO

-- Creating foreign key on [EstatusOrdenID] in table 'OrdenTrabajo'
ALTER TABLE [dbo].[OrdenTrabajo]
ADD CONSTRAINT [FK_OrdenTrabajo_EstatusOrden]
    FOREIGN KEY ([EstatusOrdenID])
    REFERENCES [dbo].[EstatusOrden]
        ([EstatusOrdenID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_OrdenTrabajo_EstatusOrden'
CREATE INDEX [IX_FK_OrdenTrabajo_EstatusOrden]
ON [dbo].[OrdenTrabajo]
    ([EstatusOrdenID]);
GO

-- Creating foreign key on [FabricanteID] in table 'NumeroUnico'
ALTER TABLE [dbo].[NumeroUnico]
ADD CONSTRAINT [FK_NumeroUnico_Fabricante]
    FOREIGN KEY ([FabricanteID])
    REFERENCES [dbo].[Fabricante]
        ([FabricanteID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_NumeroUnico_Fabricante'
CREATE INDEX [IX_FK_NumeroUnico_Fabricante]
ON [dbo].[NumeroUnico]
    ([FabricanteID]);
GO

-- Creating foreign key on [FamiliaMaterialID] in table 'FamiliaAcero'
ALTER TABLE [dbo].[FamiliaAcero]
ADD CONSTRAINT [FK_FamiliaAcero_FamiliaMaterial]
    FOREIGN KEY ([FamiliaMaterialID])
    REFERENCES [dbo].[FamiliaMaterial]
        ([FamiliaMaterialID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_FamiliaAcero_FamiliaMaterial'
CREATE INDEX [IX_FK_FamiliaAcero_FamiliaMaterial]
ON [dbo].[FamiliaAcero]
    ([FamiliaMaterialID]);
GO

-- Creating foreign key on [FamiliaAceroID] in table 'ItemCode'
ALTER TABLE [dbo].[ItemCode]
ADD CONSTRAINT [FK_ItemCode_FamiliaAcero]
    FOREIGN KEY ([FamiliaAceroID])
    REFERENCES [dbo].[FamiliaAcero]
        ([FamiliaAceroID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_ItemCode_FamiliaAcero'
CREATE INDEX [IX_FK_ItemCode_FamiliaAcero]
ON [dbo].[ItemCode]
    ([FamiliaAceroID]);
GO

-- Creating foreign key on [FamiliaAcero1ID] in table 'Spool'
ALTER TABLE [dbo].[Spool]
ADD CONSTRAINT [FK_Spool_FamiliaAcero_1]
    FOREIGN KEY ([FamiliaAcero1ID])
    REFERENCES [dbo].[FamiliaAcero]
        ([FamiliaAceroID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Spool_FamiliaAcero_1'
CREATE INDEX [IX_FK_Spool_FamiliaAcero_1]
ON [dbo].[Spool]
    ([FamiliaAcero1ID]);
GO

-- Creating foreign key on [FamiliaAcero2ID] in table 'Spool'
ALTER TABLE [dbo].[Spool]
ADD CONSTRAINT [FK_Spool_FamiliaAcero_2]
    FOREIGN KEY ([FamiliaAcero2ID])
    REFERENCES [dbo].[FamiliaAcero]
        ([FamiliaAceroID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Spool_FamiliaAcero_2'
CREATE INDEX [IX_FK_Spool_FamiliaAcero_2]
ON [dbo].[Spool]
    ([FamiliaAcero2ID]);
GO

-- Creating foreign key on [FamiliaItemCodeID] in table 'Recepcion'
ALTER TABLE [dbo].[Recepcion]
ADD CONSTRAINT [FK_Recepcion_FamiliaItemCode]
    FOREIGN KEY ([FamiliaItemCodeID])
    REFERENCES [dbo].[FamiliaItemCode]
        ([FamiliaItemCodeID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Recepcion_FamiliaItemCode'
CREATE INDEX [IX_FK_Recepcion_FamiliaItemCode]
ON [dbo].[Recepcion]
    ([FamiliaItemCodeID]);
GO

-- Creating foreign key on [FolioAvisoLlegadaID] in table 'FolioLlegada'
ALTER TABLE [dbo].[FolioLlegada]
ADD CONSTRAINT [FK_FolioLlegada_FolioAvisoLlegada]
    FOREIGN KEY ([FolioAvisoLlegadaID])
    REFERENCES [dbo].[FolioAvisoLlegada]
        ([FolioAvisoLlegadaID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_FolioLlegada_FolioAvisoLlegada'
CREATE INDEX [IX_FK_FolioLlegada_FolioAvisoLlegada]
ON [dbo].[FolioLlegada]
    ([FolioAvisoLlegadaID]);
GO

-- Creating foreign key on [FolioAvisoLlegadaID] in table 'PermisoAduana'
ALTER TABLE [dbo].[PermisoAduana]
ADD CONSTRAINT [FK_PermisoAduana_FolioAvisoLlegada]
    FOREIGN KEY ([FolioAvisoLlegadaID])
    REFERENCES [dbo].[FolioAvisoLlegada]
        ([FolioAvisoLlegadaID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_PermisoAduana_FolioAvisoLlegada'
CREATE INDEX [IX_FK_PermisoAduana_FolioAvisoLlegada]
ON [dbo].[PermisoAduana]
    ([FolioAvisoLlegadaID]);
GO

-- Creating foreign key on [FolioLlegadaID] in table 'PackingList'
ALTER TABLE [dbo].[PackingList]
ADD CONSTRAINT [FK_Camion_FolioLlegada]
    FOREIGN KEY ([FolioLlegadaID])
    REFERENCES [dbo].[FolioLlegada]
        ([FolioLlegadaID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Camion_FolioLlegada'
CREATE INDEX [IX_FK_Camion_FolioLlegada]
ON [dbo].[PackingList]
    ([FolioLlegadaID]);
GO

-- Creating foreign key on [FolioLlegadaID] in table 'FolioPackingList'
ALTER TABLE [dbo].[FolioPackingList]
ADD CONSTRAINT [FK_FolioPackingList_FolioLlegada]
    FOREIGN KEY ([FolioLlegadaID])
    REFERENCES [dbo].[FolioLlegada]
        ([FolioLlegadaID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_FolioPackingList_FolioLlegada'
CREATE INDEX [IX_FK_FolioPackingList_FolioLlegada]
ON [dbo].[FolioPackingList]
    ([FolioLlegadaID]);
GO

-- Creating foreign key on [PackingListID] in table 'FolioPackingList'
ALTER TABLE [dbo].[FolioPackingList]
ADD CONSTRAINT [FK_FolioPackingList_PackingList]
    FOREIGN KEY ([PackingListID])
    REFERENCES [dbo].[PackingList]
        ([PackingListID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_FolioPackingList_PackingList'
CREATE INDEX [IX_FK_FolioPackingList_PackingList]
ON [dbo].[FolioPackingList]
    ([PackingListID]);
GO

-- Creating foreign key on [FolioPackingListID] in table 'Recepcion'
ALTER TABLE [dbo].[Recepcion]
ADD CONSTRAINT [FK_Recepcion_FolioPackingList]
    FOREIGN KEY ([FolioPackingListID])
    REFERENCES [dbo].[FolioPackingList]
        ([FolioPackingListID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Recepcion_FolioPackingList'
CREATE INDEX [IX_FK_Recepcion_FolioPackingList]
ON [dbo].[Recepcion]
    ([FolioPackingListID]);
GO

-- Creating foreign key on [IncidenciaOriginalID] in table 'Incidencia'
ALTER TABLE [dbo].[Incidencia]
ADD CONSTRAINT [FK_Incidencia_Incidencia]
    FOREIGN KEY ([IncidenciaOriginalID])
    REFERENCES [dbo].[Incidencia]
        ([IncidenciaID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Incidencia_Incidencia'
CREATE INDEX [IX_FK_Incidencia_Incidencia]
ON [dbo].[Incidencia]
    ([IncidenciaOriginalID]);
GO

-- Creating foreign key on [UsuarioID] in table 'Incidencia'
ALTER TABLE [dbo].[Incidencia]
ADD CONSTRAINT [FK_Incidencia_Usuario]
    FOREIGN KEY ([UsuarioID])
    REFERENCES [dbo].[Usuario]
        ([UsuarioID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Incidencia_Usuario'
CREATE INDEX [IX_FK_Incidencia_Usuario]
ON [dbo].[Incidencia]
    ([UsuarioID]);
GO

-- Creating foreign key on [UsuarioIDRespuesta] in table 'Incidencia'
ALTER TABLE [dbo].[Incidencia]
ADD CONSTRAINT [FK_Incidencia_UsuarioRespuesta]
    FOREIGN KEY ([UsuarioIDRespuesta])
    REFERENCES [dbo].[Usuario]
        ([UsuarioID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Incidencia_UsuarioRespuesta'
CREATE INDEX [IX_FK_Incidencia_UsuarioRespuesta]
ON [dbo].[Incidencia]
    ([UsuarioIDRespuesta]);
GO

-- Creating foreign key on [ProyectoID] in table 'ItemCode'
ALTER TABLE [dbo].[ItemCode]
ADD CONSTRAINT [FK_ItemCode_Proyecto]
    FOREIGN KEY ([ProyectoID])
    REFERENCES [dbo].[Proyecto]
        ([ProyectoID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_ItemCode_Proyecto'
CREATE INDEX [IX_FK_ItemCode_Proyecto]
ON [dbo].[ItemCode]
    ([ProyectoID]);
GO

-- Creating foreign key on [TipoMaterialID] in table 'ItemCode'
ALTER TABLE [dbo].[ItemCode]
ADD CONSTRAINT [FK_ItemCode_TipoMaterial]
    FOREIGN KEY ([TipoMaterialID])
    REFERENCES [dbo].[TipoMaterial]
        ([TipoMaterialID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_ItemCode_TipoMaterial'
CREATE INDEX [IX_FK_ItemCode_TipoMaterial]
ON [dbo].[ItemCode]
    ([TipoMaterialID]);
GO

-- Creating foreign key on [ItemCodeID] in table 'MaterialSpool'
ALTER TABLE [dbo].[MaterialSpool]
ADD CONSTRAINT [FK_MaterialSpool_ItemCode]
    FOREIGN KEY ([ItemCodeID])
    REFERENCES [dbo].[ItemCode]
        ([ItemCodeID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_MaterialSpool_ItemCode'
CREATE INDEX [IX_FK_MaterialSpool_ItemCode]
ON [dbo].[MaterialSpool]
    ([ItemCodeID]);
GO

-- Creating foreign key on [ItemCodeID] in table 'NumeroUnico'
ALTER TABLE [dbo].[NumeroUnico]
ADD CONSTRAINT [FK_NumeroUnico_ItemCode]
    FOREIGN KEY ([ItemCodeID])
    REFERENCES [dbo].[ItemCode]
        ([ItemCodeID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_NumeroUnico_ItemCode'
CREATE INDEX [IX_FK_NumeroUnico_ItemCode]
ON [dbo].[NumeroUnico]
    ([ItemCodeID]);
GO

-- Creating foreign key on [PatioID] in table 'Maquina'
ALTER TABLE [dbo].[Maquina]
ADD CONSTRAINT [FK_Maquina_Patio]
    FOREIGN KEY ([PatioID])
    REFERENCES [dbo].[Patio]
        ([PatioID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Maquina_Patio'
CREATE INDEX [IX_FK_Maquina_Patio]
ON [dbo].[Maquina]
    ([PatioID]);
GO

-- Creating foreign key on [SpoolID] in table 'MaterialSpool'
ALTER TABLE [dbo].[MaterialSpool]
ADD CONSTRAINT [FK_MaterialSpool_Spool]
    FOREIGN KEY ([SpoolID])
    REFERENCES [dbo].[Spool]
        ([SpoolID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_MaterialSpool_Spool'
CREATE INDEX [IX_FK_MaterialSpool_Spool]
ON [dbo].[MaterialSpool]
    ([SpoolID]);
GO

-- Creating foreign key on [TipoNotificacionID] in table 'Notificacion'
ALTER TABLE [dbo].[Notificacion]
ADD CONSTRAINT [FK_Notificacion_TipoNotificacion]
    FOREIGN KEY ([TipoNotificacionID])
    REFERENCES [dbo].[TipoNotificacion]
        ([TipoNotificacionID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Notificacion_TipoNotificacion'
CREATE INDEX [IX_FK_Notificacion_TipoNotificacion]
ON [dbo].[Notificacion]
    ([TipoNotificacionID]);
GO

-- Creating foreign key on [UsuarioIDEmisor] in table 'Notificacion'
ALTER TABLE [dbo].[Notificacion]
ADD CONSTRAINT [FK_Notificacion_UsuarioEmisor]
    FOREIGN KEY ([UsuarioIDEmisor])
    REFERENCES [dbo].[Usuario]
        ([UsuarioID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Notificacion_UsuarioEmisor'
CREATE INDEX [IX_FK_Notificacion_UsuarioEmisor]
ON [dbo].[Notificacion]
    ([UsuarioIDEmisor]);
GO

-- Creating foreign key on [UsuarioIDReceptor] in table 'Notificacion'
ALTER TABLE [dbo].[Notificacion]
ADD CONSTRAINT [FK_Notificacion_UsurioReceptopr]
    FOREIGN KEY ([UsuarioIDReceptor])
    REFERENCES [dbo].[Usuario]
        ([UsuarioID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Notificacion_UsurioReceptopr'
CREATE INDEX [IX_FK_Notificacion_UsurioReceptopr]
ON [dbo].[Notificacion]
    ([UsuarioIDReceptor]);
GO

-- Creating foreign key on [ProveedorID] in table 'NumeroUnico'
ALTER TABLE [dbo].[NumeroUnico]
ADD CONSTRAINT [FK_NumeroUnico_Proveedor]
    FOREIGN KEY ([ProveedorID])
    REFERENCES [dbo].[Proveedor]
        ([ProveedorID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_NumeroUnico_Proveedor'
CREATE INDEX [IX_FK_NumeroUnico_Proveedor]
ON [dbo].[NumeroUnico]
    ([ProveedorID]);
GO

-- Creating foreign key on [ProyectoID] in table 'NumeroUnico'
ALTER TABLE [dbo].[NumeroUnico]
ADD CONSTRAINT [FK_NumeroUnico_Proyecto]
    FOREIGN KEY ([ProyectoID])
    REFERENCES [dbo].[Proyecto]
        ([ProyectoID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_NumeroUnico_Proyecto'
CREATE INDEX [IX_FK_NumeroUnico_Proyecto]
ON [dbo].[NumeroUnico]
    ([ProyectoID]);
GO

-- Creating foreign key on [RecepcionID] in table 'NumeroUnico'
ALTER TABLE [dbo].[NumeroUnico]
ADD CONSTRAINT [FK_NumeroUnico_Recepcion]
    FOREIGN KEY ([RecepcionID])
    REFERENCES [dbo].[Recepcion]
        ([RecepcionID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_NumeroUnico_Recepcion'
CREATE INDEX [IX_FK_NumeroUnico_Recepcion]
ON [dbo].[NumeroUnico]
    ([RecepcionID]);
GO

-- Creating foreign key on [TipoCorte1ID] in table 'NumeroUnico'
ALTER TABLE [dbo].[NumeroUnico]
ADD CONSTRAINT [FK_NumeroUnico_TipoCorte_1]
    FOREIGN KEY ([TipoCorte1ID])
    REFERENCES [dbo].[TipoCorte]
        ([TipoCorteID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_NumeroUnico_TipoCorte_1'
CREATE INDEX [IX_FK_NumeroUnico_TipoCorte_1]
ON [dbo].[NumeroUnico]
    ([TipoCorte1ID]);
GO

-- Creating foreign key on [TipoCorte2ID] in table 'NumeroUnico'
ALTER TABLE [dbo].[NumeroUnico]
ADD CONSTRAINT [FK_NumeroUnico_TipoCorte_2]
    FOREIGN KEY ([TipoCorte2ID])
    REFERENCES [dbo].[TipoCorte]
        ([TipoCorteID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_NumeroUnico_TipoCorte_2'
CREATE INDEX [IX_FK_NumeroUnico_TipoCorte_2]
ON [dbo].[NumeroUnico]
    ([TipoCorte2ID]);
GO

-- Creating foreign key on [NumeroUnicoID] in table 'NumeroUnicoCorte'
ALTER TABLE [dbo].[NumeroUnicoCorte]
ADD CONSTRAINT [FK_NumeroUnicoCorte_NumeroUnico]
    FOREIGN KEY ([NumeroUnicoID])
    REFERENCES [dbo].[NumeroUnico]
        ([NumeroUnicoID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_NumeroUnicoCorte_NumeroUnico'
CREATE INDEX [IX_FK_NumeroUnicoCorte_NumeroUnico]
ON [dbo].[NumeroUnicoCorte]
    ([NumeroUnicoID]);
GO

-- Creating foreign key on [NumeroUnicoID] in table 'NumeroUnicoMovimiento'
ALTER TABLE [dbo].[NumeroUnicoMovimiento]
ADD CONSTRAINT [FK_NumeroUnicoMovimiento_NumeroUnico]
    FOREIGN KEY ([NumeroUnicoID])
    REFERENCES [dbo].[NumeroUnico]
        ([NumeroUnicoID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_NumeroUnicoMovimiento_NumeroUnico'
CREATE INDEX [IX_FK_NumeroUnicoMovimiento_NumeroUnico]
ON [dbo].[NumeroUnicoMovimiento]
    ([NumeroUnicoID]);
GO

-- Creating foreign key on [NumeroUnicoID] in table 'NumeroUnicoSegmento'
ALTER TABLE [dbo].[NumeroUnicoSegmento]
ADD CONSTRAINT [FK_NumeroUnicoSegmento_NumeroUnico]
    FOREIGN KEY ([NumeroUnicoID])
    REFERENCES [dbo].[NumeroUnico]
        ([NumeroUnicoID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_NumeroUnicoSegmento_NumeroUnico'
CREATE INDEX [IX_FK_NumeroUnicoSegmento_NumeroUnico]
ON [dbo].[NumeroUnicoSegmento]
    ([NumeroUnicoID]);
GO

-- Creating foreign key on [NumeroUnicoID] in table 'PinturaNumeroUnico'
ALTER TABLE [dbo].[PinturaNumeroUnico]
ADD CONSTRAINT [FK_PinturaNumeroUnico_NumeroUnico]
    FOREIGN KEY ([NumeroUnicoID])
    REFERENCES [dbo].[NumeroUnico]
        ([NumeroUnicoID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_PinturaNumeroUnico_NumeroUnico'
CREATE INDEX [IX_FK_PinturaNumeroUnico_NumeroUnico]
ON [dbo].[PinturaNumeroUnico]
    ([NumeroUnicoID]);
GO

-- Creating foreign key on [NumeroUnicoID] in table 'RequisicionNumeroUnicoDetalle'
ALTER TABLE [dbo].[RequisicionNumeroUnicoDetalle]
ADD CONSTRAINT [FK_RequisicionNumeroUnicoDetalle_NumeroUnico]
    FOREIGN KEY ([NumeroUnicoID])
    REFERENCES [dbo].[NumeroUnico]
        ([NumeroUnicoID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_RequisicionNumeroUnicoDetalle_NumeroUnico'
CREATE INDEX [IX_FK_RequisicionNumeroUnicoDetalle_NumeroUnico]
ON [dbo].[RequisicionNumeroUnicoDetalle]
    ([NumeroUnicoID]);
GO

-- Creating foreign key on [SalidaMovimientoID] in table 'NumeroUnicoCorte'
ALTER TABLE [dbo].[NumeroUnicoCorte]
ADD CONSTRAINT [FK_NumeroUnicoCorte_NumeroUnicoMovimiento]
    FOREIGN KEY ([SalidaMovimientoID])
    REFERENCES [dbo].[NumeroUnicoMovimiento]
        ([NumeroUnicoMovimientoID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_NumeroUnicoCorte_NumeroUnicoMovimiento'
CREATE INDEX [IX_FK_NumeroUnicoCorte_NumeroUnicoMovimiento]
ON [dbo].[NumeroUnicoCorte]
    ([SalidaMovimientoID]);
GO

-- Creating foreign key on [OrdenTrabajoID] in table 'NumeroUnicoCorte'
ALTER TABLE [dbo].[NumeroUnicoCorte]
ADD CONSTRAINT [FK_NumeroUnicoCorte_OrdenTrabajo]
    FOREIGN KEY ([OrdenTrabajoID])
    REFERENCES [dbo].[OrdenTrabajo]
        ([OrdenTrabajoID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_NumeroUnicoCorte_OrdenTrabajo'
CREATE INDEX [IX_FK_NumeroUnicoCorte_OrdenTrabajo]
ON [dbo].[NumeroUnicoCorte]
    ([OrdenTrabajoID]);
GO

-- Creating foreign key on [ProyectoID] in table 'NumeroUnicoCorte'
ALTER TABLE [dbo].[NumeroUnicoCorte]
ADD CONSTRAINT [FK_NumeroUnicoCorte_Proyecto]
    FOREIGN KEY ([ProyectoID])
    REFERENCES [dbo].[Proyecto]
        ([ProyectoID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_NumeroUnicoCorte_Proyecto'
CREATE INDEX [IX_FK_NumeroUnicoCorte_Proyecto]
ON [dbo].[NumeroUnicoCorte]
    ([ProyectoID]);
GO

-- Creating foreign key on [UbicacionFisicaID] in table 'NumeroUnicoCorte'
ALTER TABLE [dbo].[NumeroUnicoCorte]
ADD CONSTRAINT [FK_NumeroUnicoCorte_UbicacionFisica]
    FOREIGN KEY ([UbicacionFisicaID])
    REFERENCES [dbo].[UbicacionFisica]
        ([UbicacionFisicaID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_NumeroUnicoCorte_UbicacionFisica'
CREATE INDEX [IX_FK_NumeroUnicoCorte_UbicacionFisica]
ON [dbo].[NumeroUnicoCorte]
    ([UbicacionFisicaID]);
GO

-- Creating foreign key on [ProyectoID] in table 'NumeroUnicoInventario'
ALTER TABLE [dbo].[NumeroUnicoInventario]
ADD CONSTRAINT [FK_NumeroUnicoInventario_Proyecto]
    FOREIGN KEY ([ProyectoID])
    REFERENCES [dbo].[Proyecto]
        ([ProyectoID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_NumeroUnicoInventario_Proyecto'
CREATE INDEX [IX_FK_NumeroUnicoInventario_Proyecto]
ON [dbo].[NumeroUnicoInventario]
    ([ProyectoID]);
GO

-- Creating foreign key on [ProyectoID] in table 'NumeroUnicoMovimiento'
ALTER TABLE [dbo].[NumeroUnicoMovimiento]
ADD CONSTRAINT [FK_NumeroUnicoMovimiento_Proyecto]
    FOREIGN KEY ([ProyectoID])
    REFERENCES [dbo].[Proyecto]
        ([ProyectoID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_NumeroUnicoMovimiento_Proyecto'
CREATE INDEX [IX_FK_NumeroUnicoMovimiento_Proyecto]
ON [dbo].[NumeroUnicoMovimiento]
    ([ProyectoID]);
GO

-- Creating foreign key on [TipoMovimientoID] in table 'NumeroUnicoMovimiento'
ALTER TABLE [dbo].[NumeroUnicoMovimiento]
ADD CONSTRAINT [FK_NumeroUnicoMovimiento_TipoMovimiento]
    FOREIGN KEY ([TipoMovimientoID])
    REFERENCES [dbo].[TipoMovimiento]
        ([TipoMovimientoID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_NumeroUnicoMovimiento_TipoMovimiento'
CREATE INDEX [IX_FK_NumeroUnicoMovimiento_TipoMovimiento]
ON [dbo].[NumeroUnicoMovimiento]
    ([TipoMovimientoID]);
GO

-- Creating foreign key on [ProyectoID] in table 'NumeroUnicoSegmento'
ALTER TABLE [dbo].[NumeroUnicoSegmento]
ADD CONSTRAINT [FK_NumeroUnicoSegmento_Proyecto]
    FOREIGN KEY ([ProyectoID])
    REFERENCES [dbo].[Proyecto]
        ([ProyectoID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_NumeroUnicoSegmento_Proyecto'
CREATE INDEX [IX_FK_NumeroUnicoSegmento_Proyecto]
ON [dbo].[NumeroUnicoSegmento]
    ([ProyectoID]);
GO

-- Creating foreign key on [ProyectoID] in table 'OrdenTrabajo'
ALTER TABLE [dbo].[OrdenTrabajo]
ADD CONSTRAINT [FK_OrdenTrabajo_Proyecto]
    FOREIGN KEY ([ProyectoID])
    REFERENCES [dbo].[Proyecto]
        ([ProyectoID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_OrdenTrabajo_Proyecto'
CREATE INDEX [IX_FK_OrdenTrabajo_Proyecto]
ON [dbo].[OrdenTrabajo]
    ([ProyectoID]);
GO

-- Creating foreign key on [TallerID] in table 'OrdenTrabajo'
ALTER TABLE [dbo].[OrdenTrabajo]
ADD CONSTRAINT [FK_OrdenTrabajo_Taller]
    FOREIGN KEY ([TallerID])
    REFERENCES [dbo].[Taller]
        ([TallerID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_OrdenTrabajo_Taller'
CREATE INDEX [IX_FK_OrdenTrabajo_Taller]
ON [dbo].[OrdenTrabajo]
    ([TallerID]);
GO

-- Creating foreign key on [OrdenTrabajoID] in table 'OrdenTrabajoSpool'
ALTER TABLE [dbo].[OrdenTrabajoSpool]
ADD CONSTRAINT [FK_OrdenTrabajoSpool_OrdenTrabajo]
    FOREIGN KEY ([OrdenTrabajoID])
    REFERENCES [dbo].[OrdenTrabajo]
        ([OrdenTrabajoID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_OrdenTrabajoSpool_OrdenTrabajo'
CREATE INDEX [IX_FK_OrdenTrabajoSpool_OrdenTrabajo]
ON [dbo].[OrdenTrabajoSpool]
    ([OrdenTrabajoID]);
GO

-- Creating foreign key on [SpoolID] in table 'OrdenTrabajoSpool'
ALTER TABLE [dbo].[OrdenTrabajoSpool]
ADD CONSTRAINT [FK_OrdenTrabajoSpool_Spool]
    FOREIGN KEY ([SpoolID])
    REFERENCES [dbo].[Spool]
        ([SpoolID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_OrdenTrabajoSpool_Spool'
CREATE INDEX [IX_FK_OrdenTrabajoSpool_Spool]
ON [dbo].[OrdenTrabajoSpool]
    ([SpoolID]);
GO

-- Creating foreign key on [ProyectoID] in table 'PackingList'
ALTER TABLE [dbo].[PackingList]
ADD CONSTRAINT [FK_PackingList_Proyecto]
    FOREIGN KEY ([ProyectoID])
    REFERENCES [dbo].[Proyecto]
        ([ProyectoID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_PackingList_Proyecto'
CREATE INDEX [IX_FK_PackingList_Proyecto]
ON [dbo].[PackingList]
    ([ProyectoID]);
GO

-- Creating foreign key on [PatioID] in table 'Proyecto'
ALTER TABLE [dbo].[Proyecto]
ADD CONSTRAINT [FK_Proyecto_Patio]
    FOREIGN KEY ([PatioID])
    REFERENCES [dbo].[Patio]
        ([PatioID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Proyecto_Patio'
CREATE INDEX [IX_FK_Proyecto_Patio]
ON [dbo].[Proyecto]
    ([PatioID]);
GO

-- Creating foreign key on [PatioID] in table 'Taller'
ALTER TABLE [dbo].[Taller]
ADD CONSTRAINT [FK_Taller_Patio]
    FOREIGN KEY ([PatioID])
    REFERENCES [dbo].[Patio]
        ([PatioID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Taller_Patio'
CREATE INDEX [IX_FK_Taller_Patio]
ON [dbo].[Taller]
    ([PatioID]);
GO

-- Creating foreign key on [PatioID] in table 'UbicacionFisica'
ALTER TABLE [dbo].[UbicacionFisica]
ADD CONSTRAINT [FK_UbicacionFisica_Patio]
    FOREIGN KEY ([PatioID])
    REFERENCES [dbo].[Patio]
        ([PatioID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_UbicacionFisica_Patio'
CREATE INDEX [IX_FK_UbicacionFisica_Patio]
ON [dbo].[UbicacionFisica]
    ([PatioID]);
GO

-- Creating foreign key on [PerfilID] in table 'Usuario'
ALTER TABLE [dbo].[Usuario]
ADD CONSTRAINT [FK_Usuario_Perfil]
    FOREIGN KEY ([PerfilID])
    REFERENCES [dbo].[Perfil]
        ([PerfilID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Usuario_Perfil'
CREATE INDEX [IX_FK_Usuario_Perfil]
ON [dbo].[Usuario]
    ([PerfilID]);
GO

-- Creating foreign key on [ProyectoID] in table 'PinturaNumeroUnico'
ALTER TABLE [dbo].[PinturaNumeroUnico]
ADD CONSTRAINT [FK_PinturaNumeroUnico_Proyecto]
    FOREIGN KEY ([ProyectoID])
    REFERENCES [dbo].[Proyecto]
        ([ProyectoID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_PinturaNumeroUnico_Proyecto'
CREATE INDEX [IX_FK_PinturaNumeroUnico_Proyecto]
ON [dbo].[PinturaNumeroUnico]
    ([ProyectoID]);
GO

-- Creating foreign key on [RequisicionNumeroUnicoDetalleID] in table 'PinturaNumeroUnico'
ALTER TABLE [dbo].[PinturaNumeroUnico]
ADD CONSTRAINT [FK_PinturaNumeroUnico_RequisicionNumeroUnicoDetalleID]
    FOREIGN KEY ([RequisicionNumeroUnicoDetalleID])
    REFERENCES [dbo].[RequisicionNumeroUnicoDetalle]
        ([RequisicionNumeroUnicoDetalleID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_PinturaNumeroUnico_RequisicionNumeroUnicoDetalleID'
CREATE INDEX [IX_FK_PinturaNumeroUnico_RequisicionNumeroUnicoDetalleID]
ON [dbo].[PinturaNumeroUnico]
    ([RequisicionNumeroUnicoDetalleID]);
GO

-- Creating foreign key on [PreferenciaID] in table 'Rel_Usuario_Preferencia'
ALTER TABLE [dbo].[Rel_Usuario_Preferencia]
ADD CONSTRAINT [FK_Rel_Usuario_Preferencia_Preferencia]
    FOREIGN KEY ([PreferenciaID])
    REFERENCES [dbo].[Preferencia]
        ([PreferenciaId])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Rel_Usuario_Preferencia_Preferencia'
CREATE INDEX [IX_FK_Rel_Usuario_Preferencia_Preferencia]
ON [dbo].[Rel_Usuario_Preferencia]
    ([PreferenciaID]);
GO

-- Creating foreign key on [ProyectoID] in table 'Rel_FolioAvisoLlegada_Proyecto'
ALTER TABLE [dbo].[Rel_FolioAvisoLlegada_Proyecto]
ADD CONSTRAINT [FK_RelFolioAvisoLlegadaProyecto_Proyecto]
    FOREIGN KEY ([ProyectoID])
    REFERENCES [dbo].[Proyecto]
        ([ProyectoID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_RelFolioAvisoLlegadaProyecto_Proyecto'
CREATE INDEX [IX_FK_RelFolioAvisoLlegadaProyecto_Proyecto]
ON [dbo].[Rel_FolioAvisoLlegada_Proyecto]
    ([ProyectoID]);
GO

-- Creating foreign key on [ProyectoID] in table 'RequisicionNumeroUnico'
ALTER TABLE [dbo].[RequisicionNumeroUnico]
ADD CONSTRAINT [FK_RequisicionNumeroUnico_Proyecto]
    FOREIGN KEY ([ProyectoID])
    REFERENCES [dbo].[Proyecto]
        ([ProyectoID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_RequisicionNumeroUnico_Proyecto'
CREATE INDEX [IX_FK_RequisicionNumeroUnico_Proyecto]
ON [dbo].[RequisicionNumeroUnico]
    ([ProyectoID]);
GO

-- Creating foreign key on [ProyectoID] in table 'Spool'
ALTER TABLE [dbo].[Spool]
ADD CONSTRAINT [FK_Spool_Proyecto]
    FOREIGN KEY ([ProyectoID])
    REFERENCES [dbo].[Proyecto]
        ([ProyectoID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Spool_Proyecto'
CREATE INDEX [IX_FK_Spool_Proyecto]
ON [dbo].[Spool]
    ([ProyectoID]);
GO

-- Creating foreign key on [RepositorioID] in table 'Rel_Documento_Entidad'
ALTER TABLE [dbo].[Rel_Documento_Entidad]
ADD CONSTRAINT [FK_Rel_DocumentoEntidad_Repositorio]
    FOREIGN KEY ([RepositorioID])
    REFERENCES [dbo].[Repositorio]
        ([RepositorioId])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Rel_DocumentoEntidad_Repositorio'
CREATE INDEX [IX_FK_Rel_DocumentoEntidad_Repositorio]
ON [dbo].[Rel_Documento_Entidad]
    ([RepositorioID]);
GO

-- Creating foreign key on [UsuarioID] in table 'Rel_Documento_Entidad'
ALTER TABLE [dbo].[Rel_Documento_Entidad]
ADD CONSTRAINT [FK_RelDocumentoEntidad_Usuario]
    FOREIGN KEY ([UsuarioID])
    REFERENCES [dbo].[Usuario]
        ([UsuarioID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_RelDocumentoEntidad_Usuario'
CREATE INDEX [IX_FK_RelDocumentoEntidad_Usuario]
ON [dbo].[Rel_Documento_Entidad]
    ([UsuarioID]);
GO

-- Creating foreign key on [UsuarioID] in table 'Rel_Usuario_Proyecto'
ALTER TABLE [dbo].[Rel_Usuario_Proyecto]
ADD CONSTRAINT [FK__Rel_Usuario_Proyecto_Usuario]
    FOREIGN KEY ([UsuarioID])
    REFERENCES [dbo].[Usuario]
        ([UsuarioID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__Rel_Usuario_Proyecto_Usuario'
CREATE INDEX [IX_FK__Rel_Usuario_Proyecto_Usuario]
ON [dbo].[Rel_Usuario_Proyecto]
    ([UsuarioID]);
GO

-- Creating foreign key on [RequisicionNumeroUnicoID] in table 'RequisicionNumeroUnicoDetalle'
ALTER TABLE [dbo].[RequisicionNumeroUnicoDetalle]
ADD CONSTRAINT [FK_RequisicionNumeroUnicoDetalle_RequisicionNumeroUnico]
    FOREIGN KEY ([RequisicionNumeroUnicoID])
    REFERENCES [dbo].[RequisicionNumeroUnico]
        ([RequisicionNumeroUnicoID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_RequisicionNumeroUnicoDetalle_RequisicionNumeroUnico'
CREATE INDEX [IX_FK_RequisicionNumeroUnicoDetalle_RequisicionNumeroUnico]
ON [dbo].[RequisicionNumeroUnicoDetalle]
    ([RequisicionNumeroUnicoID]);
GO

-- Creating foreign key on [UsuarioID] in table 'Sesion'
ALTER TABLE [dbo].[Sesion]
ADD CONSTRAINT [FK_Sesion_Usuario]
    FOREIGN KEY ([UsuarioID])
    REFERENCES [dbo].[Usuario]
        ([UsuarioID])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Sesion_Usuario'
CREATE INDEX [IX_FK_Sesion_Usuario]
ON [dbo].[Sesion]
    ([UsuarioID]);
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------