﻿using BackEndSAM.Models.PlaneacionYControl;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces.PlaneacionYControlBD.EmisionOTBD
{
    public class EmisionOTBD
    {
        private static readonly object _mutex = new object();
        private static EmisionOTBD _instance;

        public static EmisionOTBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new EmisionOTBD();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerProyectos()
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_SteelGo_Get_Proyectos_Patio_Result> result = ctx.Sam3_SteelGo_Get_Proyectos_Patio().ToList();

                    List<DetalleProyecto> proyectoList = new List<DetalleProyecto>();

                    //Funcionalidad con store
                    foreach (Sam3_SteelGo_Get_Proyectos_Patio_Result item in result)
                    {
                        List<DetallePatio> patioList = new List<DetallePatio>();

                        patioList.Add(new DetallePatio
                        {
                            PatioID = item.PatioID,
                            NombrePatio = item.Patio
                        });

                        proyectoList.Add(new DetalleProyecto
                        {
                            ProyectoID = item.ProyectoID,
                            Proyecto = item.Nombre,
                            ListaPatio = patioList
                        });
                    }

                    return proyectoList;
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

        public object MostrarSpoolsEnProyecto (int proyectoID, int patioID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_PyC_EmisionOT_Get_N1_Result> result = ctx.Sam3_PyC_EmisionOT_Get_N1(proyectoID,patioID).ToList();

                    List<DetalleProyectoPrueba> proyectoList = new List<DetalleProyectoPrueba>();
                    //List<DetalleSpoolPrueba> detalleSpools1 = ObtenerSpools(1);
                    //List<DetalleSpoolPrueba> detalleSpools2 = ObtenerSpools(2);

                    foreach (var item in result)
                    {
                        proyectoList.Add(new DetalleProyectoPrueba
                        {
                            TipoProductoID = 0,
                            TipoProducto = item.TipoProducto,
                            FamiliaAceroID = item.FamiliaAceroID,
                            FamiliaAcero = item.FamiliaAcero,
                            Acero = item.Acero,
                            AceroID = item.AceroID,
                            FabLine = item.FabLine,
                            Area = item.Area.ToString(),
                            Juntas = item.Juntas.ToString(),
                            Peqs = item.Peqs.ToString(),
                            Peso = item.Peso.ToString(),
                            Spools = item.Spools.ToString(),
                            ListaSpools = ObtenerSpools(item.FabLine)
                        });
                    }
                    

                    return proyectoList;
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

        public object ObtenerTalleresPatio(int idPatio)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_SteelGo_Get_Taller_Patio_Result> result = ctx.Sam3_SteelGo_Get_Taller_Patio(idPatio).ToList();

                    List<DetalleTaller> tallerList = new List<DetalleTaller>();
                    Random random = new Random();
                     
                    //Funcionalidad con store
                    foreach (Sam3_SteelGo_Get_Taller_Patio_Result item in result)
                    {
                        var produccion = new DetalleProduccion();
                        produccion.Accion = 1; 
                        produccion.ProyeccionID = 0;
                        produccion.CantidadAutomatico = random.Next(5, 50);
                        produccion.CantidadManual = random.Next(5, 50);

                        tallerList.Add(new DetalleTaller
                        {
                            TallerID = item.TallerID,
                            Taller = item.Taller,
                            Capacidad = random.Next(50, 100), 
                            Produccion = produccion
                        }); 
                    }

                    return tallerList;
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

        public List<DetalleSpoolPrueba> ObtenerSpools (string fabLine)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<DetalleSpoolPrueba> detalleSpools = new List<DetalleSpoolPrueba>();
                    List<Sam3_PyC_EmisionOT_Get_N2_Result> result = ctx.Sam3_PyC_EmisionOT_Get_N2(fabLine).ToList();
                    List<DetalleJuntasPrueba> detalleJuntas1 = ObtenerJuntas(1);
                    List<DetalleJuntasPrueba> detalleJuntas2 = ObtenerJuntas(2);

                    foreach (var item in result)
                    {
                        detalleSpools.Add(new DetalleSpoolPrueba
                        {
                            TipoID = item.TipoID,
                            Tipo = item.Tipo,
                            SpoolID = item.SpoolID,
                            Seleccionado = 0,
                            Proyectado = 0,
                            SpoolNombre = item.SpoolNombre,
                            Dibujo = item.Dibujo,
                            DiametroMaximo = item.DiametroMayor,
                            DiametroPromedio = item.DiametroPromedio,
                            Peso = item.Peso.GetValueOrDefault(),
                            Area = item.Area.GetValueOrDefault(),
                            Juntas = item.Juntas.GetValueOrDefault(),
                            Peqs = item.Peqs.GetValueOrDefault(),
                            ListaJuntas = detalleJuntas2
                        });
                    }
                    return detalleSpools;
                }
             
            }
            catch (Exception ex)
            {
                //TransactionalInformation result = new TransactionalInformation();
                //result.ReturnMessage.Add(ex.Message);
                //result.ReturnCode = 500;
                //result.ReturnStatus = false;
                //result.IsAuthenicated = true;

                return null;
            }
        }

        public List<DetalleJuntasPrueba> ObtenerJuntas(int familia)
        {
            try
            {

                List<DetalleJuntasPrueba> detalleJuntas = new List<DetalleJuntasPrueba>();

                if (familia == 1)
                {
                    detalleJuntas.Add(new DetalleJuntasPrueba
                    {
                        TipoJuntaID = 1,
                        FabclasID = 1,
                        Fabclas = "Auto 6-24",
                        TipoJunta = "BW",
                        Peqs = 3
                    });

                    detalleJuntas.Add(new DetalleJuntasPrueba
                    {
                        TipoJuntaID = 2,
                        FabclasID = 1,
                        Fabclas = "Auto 6-24",
                        TipoJunta = "BW",
                        Peqs = 1
                    });

                    detalleJuntas.Add(new DetalleJuntasPrueba
                    {
                        TipoJuntaID = 3,
                        FabclasID = 1,
                        Fabclas = "Auto 6-24",
                        TipoJunta = "BW",
                        Peqs = 7
                    });

                    detalleJuntas.Add(new DetalleJuntasPrueba
                    {
                        TipoJuntaID = 4,
                        FabclasID = 1,
                        Fabclas = "Auto 6-24",
                        TipoJunta = "BW",
                        Peqs = 5
                    });
                }
                else
                {
                    detalleJuntas.Add(new DetalleJuntasPrueba
                    {
                        TipoJuntaID = 1,
                        FabclasID = 2,
                        Fabclas = "SAW 8-30",
                        TipoJunta = "BW",
                        Peqs = 8
                    });

                    detalleJuntas.Add(new DetalleJuntasPrueba
                    {
                        TipoJuntaID = 2,
                        FabclasID = 2,
                        Fabclas = "SAW 8-30",
                        TipoJunta = "BW",
                        Peqs = 3
                    });

                    detalleJuntas.Add(new DetalleJuntasPrueba
                    {
                        TipoJuntaID = 3,
                        FabclasID = 2,
                        Fabclas = "SAW 8-30",
                        TipoJunta = "BW",
                        Peqs = 2
                    });

                    detalleJuntas.Add(new DetalleJuntasPrueba
                    {
                        TipoJuntaID = 4,
                        FabclasID = 2,
                        Fabclas = "SAW 8-30",
                        TipoJunta = "BW",
                        Peqs = 8
                    });
                }

                return detalleJuntas;
            }
            catch (Exception ex)
            {
                //TransactionalInformation result = new TransactionalInformation();
                //result.ReturnMessage.Add(ex.Message);
                //result.ReturnCode = 500;
                //result.ReturnStatus = false;
                //result.IsAuthenicated = true;

                return null;
            }
        }
    }
}