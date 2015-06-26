using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DatabaseManager.Sam3;
using DatabaseManager.EntidadesPersonalizadas;
using BackEndSAM.Utilities;
using System.Web.Script.Serialization;
using BackEndSAM.Models;
using SecurityManager.Api.Models;

namespace BackEndSAM.DataAcces
{
    public class DocumentosBd
    {
        private static readonly object _mutex = new object();
        private static DocumentosBd _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private DocumentosBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static DocumentosBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new DocumentosBd();
                    }
                }
                return _instance;
            }
        }

        public bool GuardarArchivosFolioAvisoLlegada(List<DocumentoPosteado> files)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {

                    foreach (DocumentoPosteado f in files)
                    {
                        Sam3_Rel_FolioAvisoLlegada_Documento nuevoDoc = new Sam3_Rel_FolioAvisoLlegada_Documento();
                        nuevoDoc.Activo = true;
                        nuevoDoc.DocumentoID = 0;
                        nuevoDoc.DocGuid = f.DocGuid;
                        nuevoDoc.Extencion = f.Extencion;
                        nuevoDoc.FechaModificacion = DateTime.Now;
                        nuevoDoc.FolioAvisoLlegadaID = f.FolioAvisoLlegadaID.Value;
                        nuevoDoc.Nombre = f.FileName;
                        nuevoDoc.Url = f.Path;
                        nuevoDoc.UsuarioModificacion = f.UserId;
                        nuevoDoc.TipoArchivoID = f.TipoArchivoID;
                        nuevoDoc.ContentType = f.ContentType;

                        ctx.Sam3_Rel_FolioAvisoLlegada_Documento.Add(nuevoDoc);
                    }

                    ctx.SaveChanges();

                    return true;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public object ObtenerDocumentosFolioAvisoLlegada(int folioAvisoLlegadaId, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<ListaDocumentos> documentos = (from r in ctx.Sam3_FolioAvisoLlegada
                                                        join d in ctx.Sam3_Rel_FolioAvisoLlegada_Documento on r.FolioAvisoLlegadaID equals d.FolioAvisoLlegadaID
                                                        where r.Activo.Value == true && r.FolioAvisoLlegadaID == folioAvisoLlegadaId
                                                        select new ListaDocumentos
                                                        {
                                                            DocumentoID = d.Rel_FolioAvisoLlegada_DocumentoID.ToString(),
                                                            Nombre = d.Nombre,
                                                            Extencion = d.Extencion,
                                                            Url = d.Url
                                                        }).AsParallel().ToList();
                    return documentos;
                }
            }
            catch (Exception ex)
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        public object ObtenerDocumentosPermisoAduana(int folioAvisoLlegadaId, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<ListaDocumentos> documentos = (from r in ctx.Sam3_FolioAvisoLlegada
                                                        join p in ctx.Sam3_PermisoAduana on r.FolioAvisoLlegadaID equals p.FolioAvisoLlegadaID
                                                        join d in ctx.Sam3_Rel_PermisoAduana_Documento on p.PermisoAduanaID equals d.PermisoAduanaID
                                                        where r.Activo.Value == true && r.FolioAvisoLlegadaID == folioAvisoLlegadaId
                                                        select new ListaDocumentos
                                                        {
                                                            DocumentoID = d.Rel_Permiso_Documento_ID.ToString(),
                                                            Nombre = d.Nombre,
                                                            Extencion = d.Extencion,
                                                            Url = d.Url
                                                        }).AsParallel().ToList();
                    return documentos;
                }
            }
            catch (Exception ex)
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        public object ObtenerDocumentosPaseSalida(int folioAvisoLlegadaId, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<ListaDocumentos> documentos = (from r in ctx.Sam3_FolioAvisoLlegada
                                                        join d in ctx.Sam3_Rel_FolioAvisoLlegada_PaseSalida_Archivo on r.FolioAvisoLlegadaID equals d.FolioAvisoLlegadaID
                                                        where r.Activo.Value == true && r.FolioAvisoLlegadaID == folioAvisoLlegadaId
                                                        select new ListaDocumentos
                                                        {
                                                            DocumentoID = d.Rel_Folio_PaseSalida_Archivo_ID.ToString(),
                                                            Nombre = d.Nombre,
                                                            Extencion = d.Extencion,
                                                            Url = d.Url
                                                        }).AsParallel().ToList();
                    return documentos;
                }
            }
            catch (Exception ex)
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        public object GuardarDocumentoPermisoAduana(List<DocumentoPosteado> documentos)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    int tipoArchivoID = ctx.Sam3_TipoArchivo.Where(x => x.Nombre == "Permiso Aduana").Select(x => x.TipoArchivoID).SingleOrDefault();

                    //Actualizamos el permiso de aduana
                    Sam3_PermisoAduana permisoBd = ctx.Sam3_PermisoAduana.Where(x => x.FolioAvisoLlegadaID == documentos[0].FolioAvisoLlegadaID.Value && x.Activo)
                        .AsParallel().SingleOrDefault();

                    permisoBd.PermisoAutorizado = true;
                    permisoBd.PermisoTramite = false;
                    permisoBd.Estatus = "Autorizado";
                    permisoBd.FechaAutorización = DateTime.Now;
                    permisoBd.FechaModificacion = DateTime.Now;
                    permisoBd.UsuarioModificacion = documentos[0].UserId;

                    //Guardamos la informacion de los documentos
                    foreach (DocumentoPosteado d in documentos)
                    {
                        Sam3_Rel_PermisoAduana_Documento nuevoDoc = new Sam3_Rel_PermisoAduana_Documento();
                        nuevoDoc.Activo = true;
                        nuevoDoc.ContentType = d.ContentType;
                        nuevoDoc.DocGuid = d.DocGuid;
                        nuevoDoc.DocumentoID = 0;
                        nuevoDoc.Extencion = d.Extencion;
                        nuevoDoc.FechaModificacion = DateTime.Now;
                        nuevoDoc.Nombre = d.FileName;
                        nuevoDoc.PermisoAduanaID = permisoBd.PermisoAduanaID;
                        nuevoDoc.TipoArchivoID = tipoArchivoID;
                        nuevoDoc.Url = d.Path;
                        nuevoDoc.UsuarioModificacion = d.UserId;

                        ctx.Sam3_Rel_PermisoAduana_Documento.Add(nuevoDoc);
                    }

                    ctx.SaveChanges();

                    return true;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public object GuardarDocumentoPaseSalida(List<DocumentoPosteado> documentos)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    //Actualizamos el dato de Pase Salida Enviado del Folio aviso Llegada
                    Sam3_FolioAvisoLlegada folioBd = ctx.Sam3_FolioAvisoLlegada.Where(x => x.FolioAvisoLlegadaID == documentos[0].FolioAvisoLlegadaID)
                        .AsParallel().SingleOrDefault();

                    folioBd.PaseSalidaEnviado = true;
                    folioBd.FechaModificacion = DateTime.Now;

                    int tipoArchivoId = ctx.Sam3_TipoArchivo.Where(x => x.Nombre == "Pase Salida").Select(x => x.TipoArchivoID)
                        .AsParallel().SingleOrDefault();

                    foreach (DocumentoPosteado d in documentos)
                    {
                        Sam3_Rel_FolioAvisoLlegada_PaseSalida_Archivo nuevoDoc = new Sam3_Rel_FolioAvisoLlegada_PaseSalida_Archivo();
                        nuevoDoc.Activo = true;
                        nuevoDoc.ContentType = d.ContentType;
                        nuevoDoc.DocGuid = d.DocGuid;
                        nuevoDoc.DocumentoID = 0;
                        nuevoDoc.Extencion = d.Extencion;
                        nuevoDoc.FechaModificacion = DateTime.Now;
                        nuevoDoc.FolioAvisoLlegadaID = folioBd.FolioAvisoLlegadaID;
                        nuevoDoc.Nombre = d.FileName;
                        nuevoDoc.TipoArchivoID = tipoArchivoId;
                        nuevoDoc.Url = d.Path;
                        nuevoDoc.UsuarioModificacion = d.UserId;

                        ctx.Sam3_Rel_FolioAvisoLlegada_PaseSalida_Archivo.Add(nuevoDoc);
                    }

                    ctx.SaveChanges();

                    return true;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public object EliminarDocumentoAvisoLlegada(int documentoID, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    Sam3_Rel_FolioAvisoLlegada_Documento docDb = ctx.Sam3_Rel_FolioAvisoLlegada_Documento
                        .Where(x => x.Rel_FolioAvisoLlegada_DocumentoID == documentoID).AsParallel().SingleOrDefault();

                    docDb.Activo = false;
                    docDb.FechaModificacion = DateTime.Now;
                    docDb.UsuarioModificacion = usuario.UsuarioID;

                    ctx.SaveChanges();

                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add("Ok");
                    result.ReturnCode = 200;
                    result.ReturnStatus = false;
                    result.IsAuthenicated = true;

                    return result;
                }
            }
            catch (Exception ex)
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        public object EliminarDocumentoPermisoAduana(int documentoID, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    Sam3_Rel_PermisoAduana_Documento docBd = ctx.Sam3_Rel_PermisoAduana_Documento
                        .Where(x => x.Rel_Permiso_Documento_ID == documentoID).AsParallel().SingleOrDefault();

                    docBd.Activo = false;
                    docBd.FechaModificacion = DateTime.Now;
                    docBd.UsuarioModificacion = usuario.UsuarioID;

                    ctx.SaveChanges();

                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add("Ok");
                    result.ReturnCode = 200;
                    result.ReturnStatus = false;
                    result.IsAuthenicated = true;

                    return result;
                }
            }
            catch (Exception ex)
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        public object EliminarDocumentoPaseSalida(int documentoID, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    Sam3_Rel_FolioAvisoLlegada_PaseSalida_Archivo docBd = ctx.Sam3_Rel_FolioAvisoLlegada_PaseSalida_Archivo
                        .Where(x => x.Rel_Folio_PaseSalida_Archivo_ID == documentoID).AsParallel().SingleOrDefault();

                    docBd.Activo = false;
                    docBd.FechaModificacion = DateTime.Now;
                    docBd.UsuarioModificacion = usuario.UsuarioID;

                    ctx.SaveChanges();

                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add("Ok");
                    result.ReturnCode = 200;
                    result.ReturnStatus = false;
                    result.IsAuthenicated = true;

                    return result;
                }
            }
            catch (Exception ex)
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

    }
}