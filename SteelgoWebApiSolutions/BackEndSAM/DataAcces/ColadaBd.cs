using BackEndSAM.Models;
using DatabaseManager.Sam2;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces
{
    /// <summary>
    /// Entidad colada
    /// </summary>
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
        /// Genera un nuevo registro de colada
        /// en Sam3, SAm 2 y equivalencia Colada
        /// </summary>
        /// <param name="DatosColada">datos capturados en el modal</param>
        /// <param name="usuario">usuario registrado</param>
        /// <returns>status exito o error</returns>
        public object GuardarColadaPopUp(Sam3_Colada DatosColada, Sam3_Usuario usuario)
        {
            try
            {
                TransactionalInformation result = new TransactionalInformation();

                using (SamContext ctx = new SamContext())
                {
                    using (var sam3_tran = ctx.Database.BeginTransaction())
                    {
                        using (Sam2Context ctx2 = new Sam2Context())
                        {
                            using (var sam2_tran = ctx2.Database.BeginTransaction())
                            {
                                if (!ctx.Sam3_Colada.Where(c => c.NumeroColada == DatosColada.NumeroColada && c.Activo).AsParallel().Any())
                                {
                                    Colada Sam2Colada = new Colada();
                                    Sam2Colada.FabricanteID = DatosColada.FabricanteID;
                                    Sam2Colada.AceroID = DatosColada.AceroID;
                                    Sam2Colada.ProyectoID = DatosColada.ProyectoID;
                                    Sam2Colada.NumeroColada = DatosColada.NumeroColada;
                                    Sam2Colada.NumeroCertificado = DatosColada.NumeroCertificado;
                                    Sam2Colada.HoldCalidad = DatosColada.HoldCalidad;
                                    Sam2Colada.FechaModificacion = DateTime.Now;

                                    ctx2.Colada.Add(Sam2Colada);
                                    ctx2.SaveChanges();

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

                                    Sam3_EquivalenciaColada equi = new Sam3_EquivalenciaColada();
                                    equi.Sam2_ColadaID = Sam2Colada.ColadaID;
                                    equi.Sam3_ColadaID = colada.ColadaID;
                                    equi.Activo = true;
                                    equi.FechaModificacion = DateTime.Now;
                                    equi.UsuarioModificacion = usuario.UsuarioID;

                                    ctx.Sam3_EquivalenciaColada.Add(equi);
                                    ctx.SaveChanges();

                                    sam2_tran.Commit();

                                    result.ReturnMessage.Add(colada.ColadaID.ToString());
                                    result.ReturnMessage.Add("Ok");
                                    result.ReturnCode = 200;
                                    result.ReturnStatus = false;
                                    result.IsAuthenicated = true;
                                }
                                else
                                {
                                    throw new Exception("Colada existente");
                                }
                            } // tran sam2
                        } //using ctx2
                        sam3_tran.Commit();
                    }// tran sam3
                }// using ctx
                return result;
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

        /// <summary>
        /// Obtener las coladas por proyecto
        /// Si id es != 0, se elimina la opcion "Sin Colada"
        /// </summary>
        /// <param name="id">id para determinar si se elimina la opcion Sin colada</param>
        /// <returns>lista de ccoladas</returns>
        public object ObtenerColadasPorProyecto(int id, int mostrarOpcion, int proyectoID = 0)
        {
            try
            {
                List<Coladas> listColada = new List<Coladas>();
                using (SamContext ctx = new SamContext())
                {
                    if (mostrarOpcion != 0)
                    {
                        listColada.Add(new Coladas { Nombre = "Agregar Nuevo", ColadaID = 0 });
                    }
                    List<Coladas> coladas = new List<Coladas>();

                    if (proyectoID > 0)
                    {
                        coladas = (from c in ctx.Sam3_Colada
                                   join p in ctx.Sam3_Proyecto on c.ProyectoID equals p.ProyectoID
                                   where c.Activo && p.Activo
                                   && p.ProyectoID == proyectoID
                                   select new Coladas
                                   {
                                       ColadaID = c.ColadaID,
                                       Nombre = c.NumeroColada
                                   }).AsParallel().ToList();
                    }
                    else
                    {
                        coladas = (from c in ctx.Sam3_Colada
                                   where c.Activo
                                   select new Coladas
                                   {
                                       ColadaID = c.ColadaID,
                                       Nombre = c.NumeroColada
                                   }).AsParallel().ToList();
                    }

                    listColada.AddRange(coladas);

                    if (id != 0)
                    {
                        listColada.RemoveAll(x => x.ColadaID == 1);
                    }
                }
                return listColada;

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


        /// <summary>
        /// Obtener las coladas por itemCode
        /// Si id es != 0, se elimina la opcion "Sin Colada"
        /// </summary>
        /// <param name="id">id para determinar si se elimina la opcion Sin colada</param>
        /// <returns>lista de ccoladas</returns>
        public object ObtenerColadasPorItemCode(int id, int mostrarOpcion, int itemCodeID = 0)
        {
            try
            {
                List<Coladas> listColada = new List<Coladas>();
                using (SamContext ctx = new SamContext())
                {
                    if (mostrarOpcion != 0)
                    {
                        listColada.Add(new Coladas { Nombre = "Agregar Nuevo", ColadaID = 0 });
                    }

                    int familiaAceroId = (from it in ctx.Sam3_ItemCode
                                          where it.Activo
                                          && it.ItemCodeID == itemCodeID
                                          select it.FamiliaAceroID.Value).AsParallel().SingleOrDefault();

                    List<Coladas> coladas = new List<Coladas>();

                    if (familiaAceroId > 0)
                    {
                        coladas = (from c in ctx.Sam3_Colada
                                   join ac in ctx.Sam3_Acero on c.AceroID equals ac.AceroID
                                   where c.Activo && ac.Activo
                                   && ac.FamiliaAceroID == familiaAceroId
                                   select new Coladas
                                   {
                                       ColadaID = c.ColadaID,
                                       Nombre = c.NumeroColada
                                   }).AsParallel().ToList();
                    }
                    else
                    {
                        coladas = (from c in ctx.Sam3_Colada
                                   where c.Activo
                                   select new Coladas
                                   {
                                       ColadaID = c.ColadaID,
                                       Nombre = c.NumeroColada
                                   }).AsParallel().ToList();
                    }

                    listColada.AddRange(coladas);

                    if (id != 0)
                    {
                        listColada.RemoveAll(x => x.ColadaID == 1);
                    }
                }
                return listColada;

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

        /// <summary>
        /// Obtener las coladas por familiaAcero
        /// Si id es != 0, se elimina la opcion "Sin Colada"
        /// </summary>
        /// <param name="id">id para determinar si se elimina la opcion Sin colada</param>
        /// <returns>lista de ccoladas</returns>
        public object ObtenerColadasPorFamiliAcero(int id, int mostrarOpcion, int familiaAceroID = 0)
        {
            try
            {
                List<Coladas> listColada = new List<Coladas>();
                using (SamContext ctx = new SamContext())
                {
                    if (mostrarOpcion != 0)
                    {
                        listColada.Add(new Coladas { Nombre = "Agregar Nuevo", ColadaID = 0 });
                    }

                    List<Coladas> coladas = new List<Coladas>();

                    if (familiaAceroID > 0)
                    {
                        coladas = (from c in ctx.Sam3_Colada
                                   join ac in ctx.Sam3_Acero on c.AceroID equals ac.AceroID
                                   where c.Activo && ac.Activo
                                   && ac.FamiliaAceroID == familiaAceroID
                                   select new Coladas
                                   {
                                       ColadaID = c.ColadaID,
                                       Nombre = c.NumeroColada
                                   }).AsParallel().ToList();
                    }
                    else
                    {
                        coladas = (from c in ctx.Sam3_Colada
                                   where c.Activo
                                   select new Coladas
                                   {
                                       ColadaID = c.ColadaID,
                                       Nombre = c.NumeroColada
                                   }).AsParallel().ToList();
                    }

                    listColada.AddRange(coladas);

                    if (id != 0)
                    {
                        listColada.RemoveAll(x => x.ColadaID == 1);
                    }
                }
                return listColada;

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