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

                using (SamContext ctx = new SamContext())
                {
                    //ctx.Sam3_MedicionesClimatologicas_Guardar(
                    //    usuario.UsuarioID,
                    //    lenguaje,
                    //    condiciones.ZonaID,
                    //    condiciones.TemperaturaAmbiente,
                    //    condiciones.PorcentajeHumedad,
                    //    condiciones.PuntoRocio,
                    //    condiciones.CampoX,
                    //    condiciones.FechaToma,
                    //    condiciones.HoraToma,
                    //    1);

                }
                return "";
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