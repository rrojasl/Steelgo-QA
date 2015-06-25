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
                        nuevoDoc.FolioAvisoLlegadaID = f.FolioAvisoLlegadaID;
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

    }
}