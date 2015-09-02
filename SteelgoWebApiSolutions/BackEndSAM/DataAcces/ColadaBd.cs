using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces
{
    public class ColadaBd
    {
         private static readonly object _mutex = new object();
         private static ColadaBd _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
         private ColadaBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
         public static ColadaBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new ColadaBd();
                    }
                }
                return _instance;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="DatosColada"></param>
        /// <param name="usuario"></param>
        /// <returns></returns>
        public object GuardarColadaPopUp(Sam3_Colada DatosColada, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    Sam3_Colada colada = new Sam3_Colada();
                    colada.FabricanteID = DatosColada.FabricanteID;
                    colada.AceroID = DatosColada.AceroID;
                    colada.ProyectoID = DatosColada.ProyectoID;
                    colada.NumeroColada = DatosColada.NumeroColada;
                    colada.NumeroCertificado = DatosColada.NumeroCertificado;
                    colada.HoldCalidad = DatosColada.HoldCalidad;
                    colada.Activo = true;
                    colada.UsuarioModificacion = usuario.UsuarioID;
                    colada.FechaModificacion = DateTime.Now;

                    ctx.Sam3_Colada.Add(colada);
                    ctx.SaveChanges();

                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add(colada.ColadaID.ToString());
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