using DatabaseManager.Sam3;
using BackEndSAM.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using SecurityManager.Api.Models;
using System.Data.Entity.Core.Objects;

namespace BackEndSAM.DataAcces
{
    public class PQRBd
    {
        private static readonly object _mutex = new object();
        private static PQRBd _instance;


        public static PQRBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new PQRBd();
                    }
                }
                return _instance;
            }
        }

        public int ProcesoSoldaduraID { get; private set; }
        public int NumeroPID { get; private set; }
        public int GrupoPID { get; private set; }
        public int AporteID { get; private set; }
        public int MezclaID { get; private set; }
        public int RespaldoID { get; private set; }
        public int GrupoFID { get; private set; }

        public object ObtenerPQR(int TipoDato)
        {

            using (SamContext ctx = new SamContext())
            {

                List<PQR> data = (from pqr in ctx.Sam3_Soldadura_PQR(TipoDato, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null)
                                  select new PQR
                                  {
                                      PQRID = Convert.ToString(pqr.PQRID),
                                      Nombre = pqr.Nombre,
                                      PREHEAT = pqr.PREHEAT,
                                      PWHT = pqr.PWHT,
                                      EspesorRelleno = Convert.ToString(pqr.EspesorRelleno),
                                      EspesorRaiz = Convert.ToString(pqr.EspesorRaiz),
                                     CodigoRelleno = pqr.CodigoRelleno,
                                     CodigoRaiz = pqr.CodigoRaiz,
                                      NumeroP = pqr.NumeroP,
                                     GrupoMaterialBase1 = pqr.GrupoMaterialBase1,
                                     GrupoMaterialBase2 = pqr.GrupoMaterialBase2,
                                      Aporte = pqr.Aporte,
                                      Mezcla = pqr.Mezcla,
                                      Respaldo = pqr.Respaldo,
                                      GrupoF = pqr.GrupoF,
                                      Codigo = pqr.Codigo,


                                      ProcesoSoldaduraRellenoID = pqr.ProcesoSoldaduraRellenoID,
                                     ProcesoSoldaduraRaizID =Convert.ToInt32(pqr.ProcesoSoldaduraRaizID),
                                      NumeroPID = Convert.ToInt32(pqr.NumeroPID),
                                      GrupoMaterialBase1PID = Convert.ToInt32(pqr.GrupoMaterialBase1PID),
                                      GrupoMaterialBase2PID = Convert.ToInt32(pqr.GrupoMaterialBase2PID),
                                      AporteID = Convert.ToInt32(pqr.AporteID),
                                      MezclaID = Convert.ToInt32(pqr.MezclaID),
                                      RespaldoID = Convert.ToInt32(pqr.RespaldoID),
                                      GrupoFID = Convert.ToInt32(pqr.GrupoFID),
                                      CodigoID = Convert.ToInt32(pqr.CodigoID)
                                     


                                  }).AsParallel().ToList();
                return data;
            }




        }

        public object ObtenerNumeroP(int TipoDato)
        {

            using (SamContext ctx = new SamContext())
            {

                List<PQR> data = (from pqr in ctx.Sam3_Cat_PQR_NumeroP(TipoDato, null, null, null, null)
                                  select new PQR
                                  {
                                      NumeroPID = pqr.NumeroPID,
                                      NumeroP = pqr.NumeroP

                                  }).AsParallel().ToList();
                return data;
            }




        }


        public object ObtenerProcesoSoldadura(int TipoDato)
        {

            using (SamContext ctx = new SamContext())
            {

                List<PQR> data = (from pqr in ctx.Sam3_Cat_PQR_ProcesoSoldadura(TipoDato)
                                  select new PQR
                                  {
                                      ProcesoSoldaduraRellenoID = pqr.ProcesoSoldaduraID,
                                      CodigoRelleno = pqr.Codigo,

                                  }).AsParallel().ToList();
                return data;
            }




        }

        public object ObtenerGrupoP(int TipoDato)
        {

            using (SamContext ctx = new SamContext())
            {

                List<PQR> data = (from pqr in ctx.Sam3_Cat_PQR_GrupoP(TipoDato, null, null, null)
                                  select new PQR
                                  {
                                      GrupoMaterialBase1 = pqr.GrupoP,
                                      GrupoMaterialBase1PID = pqr.GrupoPID

                                  }).AsParallel().ToList();
                return data;
            }




        }


        public object ObtenerAporte(int TipoDato)
        {

            using (SamContext ctx = new SamContext())
            {

                List<PQR> data = (from pqr in ctx.Sam3_Cat_PQR_Aporte(TipoDato, null, null, null)
                                  select new PQR
                                  {
                                      Aporte = pqr.Aporte,
                                      AporteID = pqr.AporteID

                                  }).AsParallel().ToList();
                return data;
            }




        }

        public object ObtenerMezcla(int TipoDato)
        {

            using (SamContext ctx = new SamContext())
            {

                List<PQR> data = (from pqr in ctx.Sam3_Cat_PQR_Mezcla(TipoDato, null, null, null)
                                  select new PQR
                                  {
                                      MezclaID = pqr.MezclaID,
                                      Mezcla = pqr.Mezcla

                                  }).AsParallel().ToList();
                return data;
            }




        }

        public object ObtenerRespaldo(int TipoDato)
        {

            using (SamContext ctx = new SamContext())
            {

                List<PQR> data = (from pqr in ctx.Sam3_Cat_PQR_Respaldo(TipoDato, null, null, null)
                                  select new PQR
                                  {
                                      RespaldoID = pqr.RespaldoID,
                                      Respaldo = pqr.Respaldo

                                  }).AsParallel().ToList();
                return data;
            }




        }

        public object ObtenerGrupoF(int TipoDato)
        {

            using (SamContext ctx = new SamContext())
            {

                List<PQR> data = (from pqr in ctx.Sam3_Cat_PQR_GrupoF(TipoDato, null, null, null)
                                  select new PQR
                                  {
                                      GrupoFID = pqr.GrupoFID,
                                      GrupoF = pqr.GrupoF

                                  }).AsParallel().ToList();
                return data;
            }




        }

        public object ObtenerCodigo(int TipoDato)
        {

            using (SamContext ctx = new SamContext())
            {

                List<PQR> data = (from pqr in ctx.Sam3_Cat_PQR_Codigo(TipoDato, null, null, null)
                                  select new PQR
                                  {
                                      CodigoID = pqr.CodigoID,
                                      Codigo = pqr.Codigo

                                  }).AsParallel().ToList();
                return data;
            }




        }

        public object EliminaPQR(int TipoDeDato, int PQRID, int IdUsuario)
        {

            using (SamContext ctx = new SamContext())
            {
                var lista = ctx.Sam3_Soldadura_PQR(TipoDeDato, PQRID, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, IdUsuario);
                return lista;

            }




        }

        public object ActualizaPQR(Sam3_PQR pqr, Sam3_Usuario usuario)
        {

            try
            {
                using (SamContext ctx = new SamContext())
                {

                    ctx.Sam3_Soldadura_PQR(3, pqr.PQRID, pqr.Nombre, pqr.PREHEAT, pqr.PWHT, pqr.EspesorRaiz, pqr.EspesorRelleno,  pqr.ProcesoSoldaduraRellenoID, pqr.ProcesoSoldaduraRaizID, pqr.NumeroP, pqr.GrupoPMaterialBase1, pqr.GrupoPMaterialBase2, pqr.Aporte, pqr.Mezcla, pqr.Respaldo, pqr.GrupoF, pqr.Codigo, usuario.UsuarioID);
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

                TransactionalInformation lista = new TransactionalInformation();
                lista.ReturnMessage.Add(ex.Message);
                lista.ReturnCode = 500;
                lista.ReturnStatus = false;
                lista.IsAuthenicated = true;

                return lista;
            }

        }

        public object AgregarPQR(Sam3_PQR Addpqr, Sam3_Usuario usuario)
        {

            try
            {
                using (SamContext ctx = new SamContext())
                {

                    ctx.Sam3_Soldadura_PQR(2, null, Addpqr.Nombre, Addpqr.PREHEAT, Addpqr.PWHT, Addpqr.EspesorRaiz, Addpqr.EspesorRelleno,  Addpqr.ProcesoSoldaduraRellenoID, Addpqr.ProcesoSoldaduraRaizID, Addpqr.NumeroP, Addpqr.GrupoPMaterialBase1, Addpqr.GrupoPMaterialBase2, Addpqr.Aporte, Addpqr.Mezcla, Addpqr.Respaldo, Addpqr.GrupoF, Addpqr.Codigo, usuario.UsuarioID);
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

                TransactionalInformation lista = new TransactionalInformation();
                lista.ReturnMessage.Add(ex.Message);
                lista.ReturnCode = 500;
                lista.ReturnStatus = false;
                lista.IsAuthenicated = true;

                return lista;
            }




        }

        public object ValidarExistePQR(int PQRID, string nombre)
        {

            try
            {
                using (SamContext ctx = new SamContext())
                {
                    ObjectParameter op = new ObjectParameter("Retorna", typeof(string));
                    op.Value = null;
                    var oMyString = new ObjectParameter("Retorna", typeof(string));
                    var res = ctx.Sam3_Soldadura_PQR_Existe(nombre, oMyString, PQRID);
                    var data = oMyString.Value.ToString();
                    TransactionalInformation result = new TransactionalInformation();
                    if (data.Equals("ok"))
                    {
                        result.ReturnMessage.Add("OK");
                    }
                    else
                    {
                        result.ReturnMessage.Add("Error");
                    }

                    result.ReturnCode = 200;
                    result.ReturnStatus = true;
                    result.IsAuthenicated = true;

                    return result;
                }
            }
            catch (Exception ex)
            {
                TransactionalInformation lista = new TransactionalInformation();
                lista.ReturnMessage.Add(ex.Message);
                lista.ReturnCode = 500;
                lista.ReturnStatus = false;
                lista.IsAuthenicated = true;

                return lista;
            }

        }

        public object ObtenerListadoPQRActivos(int TipoAccion)
        {

            try
            {

                using (SamContext ctx = new SamContext())
                {

                    List<PQR> data = (from pqr in ctx.Sam3_Soldadura_PQR(TipoAccion, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null)
                                      select new PQR
                                      {
                                          PQRID = Convert.ToString(pqr.PQRID),
                                          Nombre = pqr.Nombre
                                         

                                      }).AsParallel().ToList();
                    return data;
                }

            }
            catch (Exception ex)
            {
                TransactionalInformation lista = new TransactionalInformation();
                lista.ReturnMessage.Add(ex.Message);
                lista.ReturnCode = 500;
                lista.ReturnStatus = false;
                lista.IsAuthenicated = true;

                return lista;
            }
        }



        public object ObtenerEspesores(int TipoDato, int PQRIDABuscar)
        {

            using (SamContext ctx = new SamContext())
            {

                List<PQR> data = (from pqr in ctx.Sam3_Soldadura_PQR(TipoDato, PQRIDABuscar, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null)
                                  select new PQR
                                  {
                                      PQRID = Convert.ToString(pqr.PQRID),
                                      EspesorRaiz = Convert.ToString(pqr.EspesorRaiz),
                                      EspesorRelleno = Convert.ToString(pqr.EspesorRelleno),
                                      GrupoMaterialBase1PID = Convert.ToInt32(pqr.GrupoMaterialBase1PID),
                                      PWHT = pqr.PWHT,
                                      GrupoMaterialBase2PID = Convert.ToInt32(pqr.GrupoMaterialBase2PID),
                                      CodigoRaiz = pqr.CodigoRaiz,
                                      CodigoRelleno = pqr.CodigoRelleno
                                      
               

                                  }).AsParallel().ToList();
                return data;
            }




        }

    }

}
