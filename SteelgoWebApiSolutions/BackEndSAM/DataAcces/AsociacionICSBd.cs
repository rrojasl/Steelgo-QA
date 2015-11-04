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
                    List<ListaCombos> itemCodes = (from icd in ctx.Sam3_Rel_ItemCode_Diametro
                                                   join ic in ctx.Sam3_ItemCode on icd.ItemCodeID equals ic.ItemCodeID
                                                   where icd.Activo && ic.Activo
                                                   select new ListaCombos
                                                   {
                                                       id = icd.ItemCodeID.ToString(),
                                                       value = ic.Codigo
                                                   }).AsParallel().GroupBy(x=> x.value).Select(x=> x.First()).ToList();
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
        /// Obtener los diametros para el combo
        /// diametro 1 en asociar Item code steelgo vs item code
        /// </summary>
        /// <param name="itemCode"></param>
        /// <returns></returns>
        public object ObtenerDiametros1(int itemCode)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    DiametrosAsociacion diam = new DiametrosAsociacion();
                    diam.diametro = (from ricd in ctx.Sam3_Rel_ItemCode_Diametro
                                      join d in ctx.Sam3_Diametro on ricd.Diametro1ID equals d.DiametroID
                                      where ricd.Activo && d.Activo && ricd.ItemCodeID == itemCode
                                      select new ListaCombos
                                      {
                                          id = d.DiametroID.ToString(),
                                          value = d.Valor.ToString()
                                      }).AsParallel().ToList();
                    return diam;
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

        public object ObtenerDiametros2(int itemCode, int diametro1ID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    DiametrosAsociacion diam = new DiametrosAsociacion();
                    diam.diametro = (from ricd in ctx.Sam3_Rel_ItemCode_Diametro
                                     join d in ctx.Sam3_Diametro on ricd.Diametro2ID equals d.DiametroID
                                     where ricd.Activo && d.Activo && ricd.ItemCodeID == itemCode && ricd.Diametro1ID == diametro1ID
                                     select new ListaCombos
                                     {
                                         id = d.DiametroID.ToString(),
                                         value = d.Valor.ToString()
                                     }).AsParallel().ToList();
                    return diam;
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
                                                         where ic.Activo
                                                         && rics.Activo && ics.Activo
                                                         && ic.ItemCodeID == itemCodeID
                                                         select new DatosItemCode
                                                         {
                                                             //ItemCodeID = ic.ItemCodeID.ToString(),
                                                             //Codigo = ic.Codigo,
                                                             //D1 = ics.Diametro1.ToString(),
                                                             //D2 = ics.Diametro2.ToString(),
                                                             Descripcion = ic.DescripcionEspanol,
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
                             join rids in ctx.Sam3_Rel_ItemCodeSteelgo_Diametro on ics.ItemCodeSteelgoID equals rids.ItemCodeSteelgoID
                             join g in ctx.Sam3_Grupo on ics.GrupoID equals g.GrupoID
                             join c in ctx.Sam3_Cedula on ics.CedulaID equals c.CedulaID
                             join d1 in ctx.Sam3_Diametro on rids.Diametro1ID equals d1.DiametroID
                             join d2 in ctx.Sam3_Diametro on rids.Diametro2ID equals d2.DiametroID
                             where ics.Activo && g.Activo && c.Activo
                             && d1.Valor.ToString() == diametro1
                             select new ICSDatosAsociacion
                             {
                                 ItemCodeSteelgoID = ics.ItemCodeSteelgoID.ToString(),
                                 Codigo = ics.Codigo,
                                 Descripcion = ics.DescripcionEspanol,
                                 Diametro1 = d1.Valor.ToString(),
                                 Diametro2 = d2.Valor.ToString(),
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