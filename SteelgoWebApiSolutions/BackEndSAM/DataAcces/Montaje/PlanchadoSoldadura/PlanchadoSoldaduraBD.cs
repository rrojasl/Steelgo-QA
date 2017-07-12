using BackEndSAM.Utilities.ConvertirDataTable;
using DatabaseManager.Constantes;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace BackEndSAM.DataAcces.Montaje.PlanchadoSoldadura
{


    public class PlanchadoSoldaduraBD
    {
        private static readonly object _mutex = new object();
        private static PlanchadoSoldaduraBD _instance;

        public static PlanchadoSoldaduraBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new PlanchadoSoldaduraBD();
                    }
                }
                return _instance;
            }
        }


        public object actualizarPlanchadoSoldadura(DataTable data, string lenguaje, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    JavaScriptSerializer serializer = new JavaScriptSerializer();
                    object res = new object();

                    ObjetosSQL _SQL = new ObjetosSQL();
                    string[,] parametro = {
                        { "@UsuarioID", usuario.UsuarioID.ToString()},
                        { "@Lenguaje", lenguaje } };

                    DataTable PlanchadoSoldaduraResult = _SQL.EjecutaDataAdapterSam2(Stords.JUNTAMONAJESOLDADURA_MASIVO, data, "@TTJuntaSoldaduraMontaje", parametro);
                    return ToDataTable.table_to_csv(PlanchadoSoldaduraResult);
                    //return ToDataTable.table_to_csv(data);
                }
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
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