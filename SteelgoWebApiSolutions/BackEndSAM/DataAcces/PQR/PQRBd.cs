using DatabaseManager.Sam3;
using BackEndSAM.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

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
                                      ProcesoSoldaduraID = pqr.ProcesoSoldadura,
                                      NumeroP = pqr.NumeroP,
                                      GrupoP = pqr.GrupoP,
                                      Aporte = pqr.Aporte,
                                      Mezcla = pqr.Mezcla,
                                      Respaldo = pqr.Respaldo,
                                      GrupoF = pqr.GrupoF,
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
                                      ProcesoSoldaduraID = Convert.ToString(pqr.ProcesoSoldaduraID),
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


        public object ActualizaPQR(int TipoDeDato, int PQRID, string Nombre, bool PREHEAT, bool PWHT, decimal Espesor, int ProcesoSoldadura, int NumeroP, int GrupoP, int Aporte, int Mezcla, int Respaldo, int GrupoF, int IdUsuario)
        {

            using (SamContext ctx = new SamContext())
            {

                var lista = ctx.Sam3_Soldadura_PQR(TipoDeDato, PQRID, Nombre, PREHEAT, PWHT, Espesor, ProcesoSoldadura, NumeroP, GrupoP, Aporte, Mezcla, Respaldo, GrupoF, IdUsuario);
                return lista;

            }




        }
    }
}