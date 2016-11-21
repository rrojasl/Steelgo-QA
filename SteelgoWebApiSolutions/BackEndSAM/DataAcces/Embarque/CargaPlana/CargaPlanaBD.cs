﻿using BackEndSAM.Models.Embarque.CargaPlana;
using DatabaseManager.Constantes;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces.Embarque.CargaPlana
{
    public class CargaPlanaBD
    {
        private static readonly object _mutex = new object();
        private static CargaPlanaBD _instance;

        public static CargaPlanaBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new CargaPlanaBD();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerDetalleCargaPlana()
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<DetalleCargaPlana> listaDetalle = new List<DetalleCargaPlana>();

                    return listaDetalle;
                }
            }
            catch (Exception ex) {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        public object GuardaCapturaCargaPlana(DataTable dtDetalle, int UsuarioID)
        {
            try
            {
                ObjetosSQL _SQL = new ObjetosSQL();
                string[,] parametros = { { "@Usuario", UsuarioID.ToString() } };

                _SQL.EjecutaInsertUpdate(Stords.GUARDARCAPTURACARGAPLANA, dtDetalle, "@TablaCargaPlana", parametros);

                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add("OK");
                result.ReturnCode = 200;
                result.ReturnStatus = true;
                result.IsAuthenicated = true;

                return result;
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

        public object CerrarCargaPlana(DataTable dtDetalle, int UsuarioID)
        {
            try
            {
                ObjetosSQL _SQL = new ObjetosSQL();
                string[,] parametros = { { "@Usuario", UsuarioID.ToString() } };

                _SQL.EjecutaInsertUpdate(Stords.CERRARCARGAPLANA, dtDetalle, "@TablaCargaPlana", parametros);

                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add("OK");
                result.ReturnCode = 200;
                result.ReturnStatus = true;
                result.IsAuthenicated = true;

                return result;
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