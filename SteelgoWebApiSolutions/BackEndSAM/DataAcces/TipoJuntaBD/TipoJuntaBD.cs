using DatabaseManager.Sam3;
using BackEndSAM.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces
{
    public class TipoJuntaBd
    {
        private static readonly object _mutex = new object();
        private static TipoJuntaBd _instance;


        public static TipoJuntaBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new TipoJuntaBd();
                    }
                }
                return _instance;
            }
        }



        public object ObtenerTipoJunta(int TipoDato)
        {

            using (SamContext ctx = new SamContext())
            {

                List<TipoJunta> data = (from TJ in ctx.Sam3_Cat_TipoJunta(TipoDato, null, null, null, null, null, null)
                                        select new TipoJunta
                                        {
                                            TipoJuntaID = TJ.TipoJuntaID,
                                            Codigo = TJ.Codigo,
                                            Nombre = TJ.Nombre,
                                            Calidad = Convert.ToInt32(TJ.VerificadoPorCalidad),
                                            Relleno = Convert.ToInt32(TJ.PermiteTerminadoRelleno)

                                        }).AsParallel().ToList();
                return data;
            }




        }


        public object ActualizaTipoJunta(int Tipo, int TipoJuntaID, string Codigo, string Nombre, bool Calidad, bool Relleno, int IdUsuario)
        {
            using (SamContext ctx = new SamContext())
            {

                var lista = ctx.Sam3_Cat_TipoJunta(Tipo, TipoJuntaID, Codigo, Nombre, Calidad, Relleno, IdUsuario);
                return lista;

            }


        }

    }
}