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
    public class AsociacionICSBd
    {
        private static readonly object _mutex = new object();
        private static AsociacionICSBd _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private AsociacionICSBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static AsociacionICSBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new AsociacionICSBd();
                    }
                }
                return _instance;
            }
        }

        /// <summary>
        /// Obtener los item codes a mostrar en el combo
        /// de asociacion ICS - IC
        /// </summary>
        /// <returns></returns>
        public object obtenerListadoItemCodes()
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<ListaCombos> itemCodes = (from ic in ctx.Sam3_ItemCode
                                                   where ic.Activo
                                                   select new ListaCombos
                                                   {
                                                       id = ic.ItemCodeID.ToString(),
                                                       value = ic.Codigo
                                                   }).AsParallel().ToList();

                    return itemCodes;
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

        /// <summary>
        /// Obtengo la informacion del item code seleccionado en el combo
        /// Pantalla Asociacion ICs
        /// </summary>
        /// <param name="itemCodeID"></param>
        /// <returns></returns>
        public object obtenerInformacionItemCode(int itemCodeID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<DatosItemCode> datosItemCode = (from ic in ctx.Sam3_ItemCode
                                                         join rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo on ic.ItemCodeID equals rics.ItemCodeID
                                                         join ics in ctx.Sam3_ItemCodeSteelgo on rics.ItemCodeSteelgoID equals ics.ItemCodeSteelgoID
                                                         where ic.Activo && rics.Activo && ics.Activo
                                                         && ic.ItemCodeID == itemCodeID
                                                         select new DatosItemCode
                                                         {
                                                             ItemCodeID = ic.ItemCodeID.ToString(),
                                                             Codigo = ic.Codigo,
                                                             D1 = ics.Diametro1.ToString(),
                                                             D2 = ics.Diametro2.ToString(),
                                                             Descripcion = ics.DescripcionEspanol,
                                                             ItemCodeSteelgo = ics.Codigo,
                                                             ItemCodeSteelgoID = ics.ItemCodeSteelgoID.ToString()
                                                         }).AsParallel().ToList();

                    return datosItemCode;
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

        /// <summary>
        /// Obtener la informacion del Item Code Steelgo para el grid
        /// pantalla AsociacionIcs
        /// 
        /// </summary>
        /// <param name="datos"></param>
        /// <param name="diametro1"></param>
        /// <returns></returns>
        public object obtenerInformacionICS(ICSDatosAsociacion datos, string diametro1)
        {
            try
            {
                List<ICSDatosAsociacion> lista = new List<ICSDatosAsociacion>();
                using (SamContext ctx = new SamContext())
                {
                    lista = (from ics in ctx.Sam3_ItemCodeSteelgo
                             join g in ctx.Sam3_Grupo on ics.GrupoID equals g.GrupoID
                             join c in ctx.Sam3_Cedula on ics.CedulaID equals c.CedulaID
                             where ics.Activo && g.Activo && c.Activo
                              && ics.Diametro1.ToString() == diametro1
                             select new ICSDatosAsociacion
                             {
                                 ItemCodeSteelgoID = ics.ItemCodeSteelgoID.ToString(),
                                 Codigo = ics.Codigo,
                                 Descripcion = ics.DescripcionEspanol,
                                 Diametro1 = ics.Diametro1.ToString(),
                                 Diametro2 = ics.Diametro2.ToString(),
                                 Grupo = g.Nombre,
                                 AceroID = ics.FamiliaAceroID.ToString(),
                                 CedulaA = c.CedulaA,
                                 CedulaB = c.CedulaB,
                                 Libra = c.CedulaC,
                                 Inch = c.CedulaIn.ToString(),
                                 MM = c.CedulaMM.ToString(),
                                 Espesor = c.Espesor.ToString(),
                                 Peso = ics.Peso.ToString(),
                                 Area = ics.Area.ToString()
                             }).AsParallel().ToList();

                    lista = datos.Codigo != null && datos.Codigo != "" ? lista.Where(x => x.Codigo.StartsWith(datos.Codigo)).ToList() : lista;
                    lista = datos.Descripcion != null && datos.Descripcion != "" ? lista.Where(x => x.Descripcion.StartsWith(datos.Descripcion)).ToList() : lista;
                    lista = datos.Diametro1 != null && datos.Diametro1 != "" ? lista.Where(x => x.Diametro1.StartsWith(datos.Diametro1)).ToList() : lista;
                    lista = datos.Diametro2 != null && datos.Diametro2 != "" ? lista.Where(x => x.Diametro2.StartsWith(datos.Diametro2)).ToList() : lista;
                    lista = datos.Grupo != null && datos.Grupo != "" ? lista.Where(x => x.Grupo.StartsWith(datos.Grupo)).ToList() : lista;
                    lista = datos.Acero != null && datos.Acero != "" ? lista.Where(x => x.Diametro2.StartsWith(datos.Diametro2)).ToList() : lista;
                    lista = datos.CedulaA != null && datos.CedulaA != "" ? lista.Where(x => x.CedulaA.StartsWith(datos.CedulaA)).ToList() : lista;
                    lista = datos.CedulaB != null && datos.CedulaB != "" ? lista.Where(x => x.CedulaB.StartsWith(datos.CedulaB)).ToList() : lista;
                    lista = datos.Libra != null && datos.Libra != "" ? lista.Where(x => x.Libra.StartsWith(datos.Libra)).ToList() : lista;
                    lista = datos.Inch != null && datos.Inch != "" ? lista.Where(x => x.Inch.StartsWith(datos.Inch)).ToList() : lista;
                    lista = datos.MM != null && datos.MM != "" ? lista.Where(x => x.MM.StartsWith(datos.MM)).ToList() : lista;
                    lista = datos.Espesor != null && datos.Espesor != "" ? lista.Where(x => x.Espesor.StartsWith(datos.Espesor)).ToList() : lista;
                    lista = datos.Peso != null && datos.Peso != "" ? lista.Where(x => x.Peso.StartsWith(datos.Peso)).ToList() : lista;
                    lista = datos.Area != null && datos.Area != "" ? lista.Where(x => x.Area.StartsWith(datos.Area)).ToList() : lista;
                }

                using (Sam2Context ctx2 = new Sam2Context())
                {
                    lista.ForEach(x =>
                        x.Acero = (from fa in ctx2.FamiliaAcero
                                       where fa.FamiliaAceroID.ToString() == x.AceroID
                                       select fa.Nombre).AsParallel().SingleOrDefault());
                }

                return lista;
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
        /// Crea la relacion entre ItemCode y ItemCode Steelgo
        /// </summary>
        /// <param name="itemCodeID"></param>
        /// <param name="itemCodeSteelgoID"></param>
        /// <param name="usuario"></param>
        /// <returns></returns>
        public object crearRelacion(string itemCodeID, string itemCodeSteelgoID, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    int ic = Convert.ToInt32(itemCodeID);
                    int ics = Convert.ToInt32(itemCodeSteelgoID);

                    bool existe = (from rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                   where rics.Activo && rics.ItemCodeID.ToString() == itemCodeID
                                   select rics.ItemCodeID).Any();

                    if (existe) //update
                    {
                        Sam3_Rel_ItemCode_ItemCodeSteelgo relacion = ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo.Where(x => x.ItemCodeID.ToString() == itemCodeID && x.Activo).AsParallel().SingleOrDefault();
                        relacion.ItemCodeSteelgoID = ics;
                        relacion.Activo = true;
                        relacion.UsuarioModificacion = usuario.UsuarioID;
                        relacion.FechaModificacion = DateTime.Now;

                        ctx.SaveChanges();
                    }
                    else //insert
                    {
                        Sam3_Rel_ItemCode_ItemCodeSteelgo relacion = new Sam3_Rel_ItemCode_ItemCodeSteelgo();

                        relacion.ItemCodeID = ic;
                        relacion.ItemCodeSteelgoID = ics;
                        relacion.Activo = true;
                        relacion.FechaModificacion = DateTime.Now;
                        relacion.UsuarioModificacion = usuario.UsuarioID;

                        ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo.Add(relacion);

                        ctx.SaveChanges();
                    }

                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add("OK");
                    result.ReturnCode = 200;
                    result.ReturnStatus = true;
                    result.IsAuthenicated = true;

                    return result;
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