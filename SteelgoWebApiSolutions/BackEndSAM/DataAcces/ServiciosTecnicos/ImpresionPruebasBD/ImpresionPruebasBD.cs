using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces.ServiciosTecnicos.ImpresionPruebasBD
{
    public class ImpresionPruebasBD
    {
        private static readonly object _mutex = new object();
        private static ImpresionPruebasBD _instance;

        public static ImpresionPruebasBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new ImpresionPruebasBD();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerImpresionPruebas(string lenguaje,int TipoPruebaID,int TipoPruebaProveedorID, int RequisicionID)
        {
            try
            {
                //List<TurnoLaboral> listaTurnoLaboralTotal = new List<TurnoLaboral>();
                //using (SamContext ctx = new SamContext())
                //{

                //    List<Sam3_ST_Get_TurnoLaboralAsignarRequisicion_Result> result = ctx.Sam3_ST_Get_TurnoLaboralAsignarRequisicion(lenguaje).ToList();
                //    foreach (var item in result)
                //    {
                //        listaTurnoLaboralTotal.Add(new TurnoLaboral
                //        {
                //            TurnoLaboralID = item.TurnoLaboralID,
                //            Nombre = item.Turno,
                //            TipoPruebaProveedorID = item.TipoPruebaProveedorID,
                //            Capacidad = item.Capacidad,
                //            CapacidadTurnoEquipoID = item.CapacidadTurnoEquipoID,
                //            CapacidadTurnoProveedorID = item.CapacidadTurnoProveedorID,
                //            JuntasAsignadas = item.ElementosAsignados.ToString(),
                //            ProveedorEquipoID = item.ProveedorEquipoID,
                //            ListaElementosAsignadosTurno = item.ElementosAsignados == 0 ? new List<ElementosRequisicion>() : (List<ElementosRequisicion>)ObtenerElementosAsignadosTurno(lenguaje, proyectoID, item.CapacidadTurnoEquipoID, item.CapacidadTurnoProveedorID, 0)
                //        });
                //    }
                //}
                return new object();
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