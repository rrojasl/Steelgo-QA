﻿using BackEndSAM.Models.ServiciosTecnicos.ServiciosTecnicosGeneral;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BackEndSAM.DataAcces.ServiciosTecnicos.ServiciosTecnicosGeneral
{
    public class ServiciosTecnicosGeneralBD
    {
        private static readonly object _mutex = new object();
        private static ServiciosTecnicosGeneralBD _instance;

        public static ServiciosTecnicosGeneralBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new ServiciosTecnicosGeneralBD();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerListadoTiposDePrueba(Sam3_Usuario usuario, string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<TiposDePrueba> listaTiposDePrueba = new List<TiposDePrueba>();
                    List<Sam3_ST_Get_TiposDePrueba_Result> listaProyectosCTX = ctx.Sam3_ST_Get_TiposDePrueba(lenguaje).ToList();
                    listaTiposDePrueba.Add(new TiposDePrueba());
                    foreach (Sam3_ST_Get_TiposDePrueba_Result item in listaProyectosCTX)
                    {
                        listaTiposDePrueba.Add(new TiposDePrueba
                        {
                            TipoPruebaID = item.TipoPruebaID,
                            Nombre = item.Nombre,
                            Categoria = item.Categoria,
                            TipoPruebaPorSpool = item.TipoPruebaPorSpool.GetValueOrDefault()
                        });
                    }

                    return listaTiposDePrueba;
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

        public object ObtenerListadoRequisiciones(Sam3_Usuario usuario, int proyectoID, int tipoPruebaID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Requisicion> listaRequisiciones = new List<Requisicion>();
                    List<Sam3_ST_Get_ListaRequisiciones_Result> listaRequisicionesCTX = ctx.Sam3_ST_Get_ListaRequisiciones(usuario.UsuarioID, proyectoID, tipoPruebaID).ToList();
                    listaRequisiciones.Add(new Requisicion());
                    foreach (Sam3_ST_Get_ListaRequisiciones_Result item in listaRequisicionesCTX)
                    {
                        listaRequisiciones.Add(new Requisicion
                        {
                            RequisicionID = item.RequisicionID,
                            ProyectoID = item.ProyectoID,
                            TipoPruebaID = item.TipoPruebaID.GetValueOrDefault(),
                            NombreRequisicion = item.NombreRequisicion
                        });
                    }

                    return listaRequisiciones;
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