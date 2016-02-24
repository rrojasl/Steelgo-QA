using BackEndSAM.Models.MedicionesClimatologicas;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces.MedicionesClimatologicasBD
{
    public class CondicionesClimatologicasBD
    {
        private static readonly object _mutex = new object();
        private static CondicionesClimatologicasBD _instance;
        public static CondicionesClimatologicasBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new CondicionesClimatologicasBD();
                    }
                }
                return _instance;
            }
        }

        public Object IngresarCondicionesClimatologicas(CondicionClimatologica condiciones, Sam3_Usuario usuario, string lenguaje)
        {
            try
            {

                CondicionClimatologica condicionClimatica = null;
                string resp = string.Empty;
                List<Sam3_MedicionesClimatologicas_Guardar_Result> listMedicionClimatica = 
                    new List<Sam3_MedicionesClimatologicas_Guardar_Result>();
                using (SamContext ctx = new SamContext())
                {

                    listMedicionClimatica = ctx.Sam3_MedicionesClimatologicas_Guardar(
                  condiciones.PatioID,
                   condiciones.CondicionClimatologicaID,
                      usuario.UsuarioID, lenguaje,
                      condiciones.ZonaID,
                     condiciones.TemperaturaAmbiente,
                      condiciones.PorcentajeHumedad,
                     condiciones.PuntoRocio,
                     condiciones.CampoX,
                      condiciones.FechaToma,
                      condiciones.HoraToma,
                      condiciones.HerramientaTempAmbienteID,
                      condiciones.HerramientaHumedadID,
                      condiciones.HerramientaPuntoRocioID,
                      condiciones.HerramientaCampoXID).ToList();

                    foreach (var mc in listMedicionClimatica)
                    {
                        condicionClimatica = new CondicionClimatologica();
                        condicionClimatica.CondicionClimatologicaID = mc.CondicionClimatologicaID;
                        condicionClimatica.PatioID = mc.patioID;
                        condicionClimatica.ZonaID = mc.ZonaID;
                        condicionClimatica.FechaToma = mc.FechaToma;
                        condicionClimatica.HoraToma = mc.HoraToma;
                    }
                }
                return condicionClimatica;
            }
            catch (Exception ex)
            {
                TransactionalInformation result = null; result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;
                return result;
            }
        }

        public Object ObtenerCondicionClimatica(int condicionClieaticaID)
        {
            try
            {
                using (var contexto = new SamContext())
                {
                    var objCondicion = contexto.Sam3_CondicionesClimatologicas.Select(
                        c => c.CondicionClimatologicaID == condicionClieaticaID).ToList();
                    return objCondicion;
                }
                

            }
            catch (Exception ex)
            {
                TransactionalInformation result = null; result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;
                return result;
            }



           
        }
    }
}