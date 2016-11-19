﻿using BackEndSAM.Models.Sam3General.Proveedor;
using DatabaseManager.Constantes;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces.Sam3General.Proveedor
{
    public class ProveedorBD
    {
        private static readonly object _mutex = new object();
        private static ProveedorBD _instance;

        public static ProveedorBD Instance
        {
            get
            {
                lock(_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new ProveedorBD();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerProveedores(int ProyectoID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Embarque_CG_Get_ListadoProveedores_Result> result = ctx.Sam3_Embarque_CG_Get_ListadoProveedores(ProyectoID).ToList();
                    List<DetalleProveedor> listaDetalle = new List<DetalleProveedor>();
                    listaDetalle.Add(new DetalleProveedor());

                    foreach (Sam3_Embarque_CG_Get_ListadoProveedores_Result item in result)
                    {
                        listaDetalle.Add(new DetalleProveedor {
                            ProveedorID = item.ProveedorID,
                            Nombre = item.Nombre
                        });
                    }
                    return listaDetalle;
                }
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

        public object GuardarNuevoProveedor(DataTable dtDetalle, int UsuarioID)
        {
            try
            {
                ObjetosSQL _SQL = new ObjetosSQL();
                string[,] parametros = { { "@Usuario", UsuarioID.ToString() } };

                _SQL.EjecutaInsertUpdate(Stords.GUARDARNUEVOPROVEEDOR, dtDetalle, "@TablaProveedor", parametros);

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