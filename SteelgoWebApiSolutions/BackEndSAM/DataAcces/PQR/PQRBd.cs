using DatabaseManager.Sam3;
using BackEndSAM.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SecurityManager.Api.Models;

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

                List<PQR> data = (from pqr in ctx.Sam3_Soldadura_PQR(TipoDato, null, null, null, null, null, null, null, null, null, null, null, null, null)
                                  select new PQR
                                  {
                                      PQRID = Convert.ToString(pqr.PQRID),
                                      Nombre = pqr.Nombre,
                                      PREHEAT = pqr.PREHEAT,
                                      PWHT = pqr.PWHT,
                                      Espesor = Convert.ToString(pqr.Espesor),
                                      Codigo = pqr.Codigo,
                                      NumeroP = pqr.NumeroP,
                                      GrupoP = pqr.GrupoP,
                                      Aporte = pqr.Aporte,
                                      Mezcla = pqr.Mezcla,
                                      Respaldo = pqr.Respaldo,
                                      GrupoF = pqr.GrupoF,
                                      ProcesoSoldaduraID = pqr.ProcesoSoldaduraID,
                                      NumeroPID = Convert.ToInt32(pqr.NumeroPID),
                                      GrupoPID  = Convert.ToInt32(pqr.GrupoPID), 
                                      AporteID = Convert.ToInt32(pqr.AporteID),
                                      MezclaID = Convert.ToInt32(pqr.MezclaID), 
                                      RespaldoID = Convert.ToInt32(pqr.RespaldoID),
                                      GrupoFID = Convert.ToInt32(pqr.GrupoFID),

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
                                      ProcesoSoldaduraID = pqr.ProcesoSoldaduraID,
                                      Codigo = pqr.Codigo,

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
                                      GrupoPID = pqr.GrupoPID,
                                      GrupoP = pqr.GrupoP

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


        public object EliminaPQR(int TipoDeDato, int PQRID, int IdUsuario)
        {

            using (SamContext ctx = new SamContext())
            {

                var lista = ctx.Sam3_Soldadura_PQR(TipoDeDato, PQRID, null, null, null, null, null, null, null, null, null, null, null, IdUsuario);
                return lista;

            }




        }


        public object ActualizaPQR(Sam3_PQR pqr, Sam3_Usuario usuario)
        {

            try
            {
                using (SamContext ctx = new SamContext())
                {

                    ctx.Sam3_Soldadura_PQR(3, pqr.PQRID, pqr.Nombre, pqr.PREHEAT, pqr.PWHT, pqr.Espesor, pqr.ProcesoSoldaduraID, pqr.NumeroP, pqr.GrupoP, pqr.Aporte, pqr.Mezcla, pqr.Respaldo, pqr.GrupoF, usuario.UsuarioID);
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

                    ctx.Sam3_Soldadura_PQR(2, null, Addpqr.Nombre, Addpqr.PREHEAT, Addpqr.PWHT, Addpqr.Espesor, Addpqr.ProcesoSoldaduraID, Addpqr.NumeroP, Addpqr.GrupoP, Addpqr.Aporte, Addpqr.Mezcla, Addpqr.Respaldo, Addpqr.GrupoF, usuario.UsuarioID);
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



        public object ValidarExistePQR(string nombre) {

            try
            {
                using (SamContext ctx = new SamContext())
                {

                    int data = Convert.ToInt32(ctx.Sam3_Soldadura_PQR_Existe(nombre));
                                      
                    return data;
                }

            }
            catch (Exception ex)
            {

                throw;
            }

        }

    }
}