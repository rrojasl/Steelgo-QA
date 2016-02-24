using BackEndSAM.Models.PlaneacionYControl;
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
                    List<Sam3_PYO_EmisionOT_Get_N1_Result> result = ctx.Sam3_PYO_EmisionOT_Get_N1(proyectoID,patioID).ToList();

                    List<DetalleProyectoPrueba> proyectoList = new List<DetalleProyectoPrueba>();
                    List<DetalleSpoolPrueba> detalleSpools1 = ObtenerSpools(1);
                    List<DetalleSpoolPrueba> detalleSpools2 = ObtenerSpools(2);

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
                            ListaSpools = detalleSpools1
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

        public List<DetalleSpoolPrueba> ObtenerSpools (int familia)
        {
            try
            {
              
                List<DetalleSpoolPrueba> detalleSpools = new List<DetalleSpoolPrueba>();
                List<DetalleJuntasPrueba> detalleJuntas1 = ObtenerJuntas(1);
                List<DetalleJuntasPrueba> detalleJuntas2 = ObtenerJuntas(2);

                if (familia == 1)
                {
                    detalleSpools.Add(new DetalleSpoolPrueba
                    {
                        TipoID = 1,
                        Tipo = "automatico",
                        SpoolID = 1001,
                        Seleccionado = 0,
                        Proyectado = 0,
                        SpoolNombre = "Spool 1",
                        Dibujo = "04-4'-BUT-3CB1S-1006-NI-",
                        DiametroMaximo = 500,
                        DiametroPromedio = 250,
                        Peso = 900,
                        Area = 600,
                        ListaJuntas = detalleJuntas1
                    });

                    detalleSpools.Add(new DetalleSpoolPrueba
                    {
                        TipoID = 1,
                        Tipo = "automatico",
                        SpoolID = 1002,
                        Seleccionado = 0,
                        Proyectado = 0,
                        SpoolNombre = "Spool 2",
                        Dibujo = "02-4'-BUT-3CB1S-1006-NI-",
                        DiametroMaximo = 300,
                        DiametroPromedio = 150,
                        Peso = 600,
                        Area = 300,
                        ListaJuntas = detalleJuntas1
                    });

                    detalleSpools.Add(new DetalleSpoolPrueba
                    {
                        TipoID = 1,
                        Tipo = "automatico",
                        SpoolID = 1003,
                        Seleccionado = 0,
                        Proyectado = 0,
                        SpoolNombre = "Spool 3",
                        Dibujo = "04-4'-AEO-3CB1S-1006-NI-",
                        DiametroMaximo = 5000,
                        DiametroPromedio = 2500,
                        Peso = 1000,
                        Area = 600,
                        ListaJuntas = detalleJuntas1
                    });

                    detalleSpools.Add(new DetalleSpoolPrueba
                    {
                        TipoID = 1,
                        Tipo = "automatico",
                        SpoolID = 1004,
                        Seleccionado = 0,
                        Proyectado = 0,
                        SpoolNombre = "Spool 4",
                        Dibujo = "54-6'-AEO-3CB1S-1006-NI-",
                        DiametroMaximo = 50,
                        DiametroPromedio = 25,
                        Peso = 10,
                        Area = 9,
                        ListaJuntas = detalleJuntas1
                    });
                }
                else
                {
                    detalleSpools.Add(new DetalleSpoolPrueba
                    {
                        TipoID = 2,
                        Tipo = "manual",
                        SpoolID = 1005,
                        Seleccionado = 0,
                        Proyectado = 0,
                        SpoolNombre = "Spool 1",
                        Dibujo = "14-4'-AEO-3CB1S-1006-NI-",
                        DiametroMaximo = 2000,
                        DiametroPromedio = 100,
                        Peso = 100,
                        Area = 600,
                        ListaJuntas = detalleJuntas2
                    });

                    detalleSpools.Add(new DetalleSpoolPrueba
                    {
                        TipoID = 2,
                        Tipo = "manual",
                        SpoolID = 1006,
                        Seleccionado = 0,
                        Proyectado = 0,
                        SpoolNombre = "Spool 2",
                        Dibujo = "84-6'-AEO-3CB1S-1006-NI-",
                        DiametroMaximo = 230,
                        DiametroPromedio = 115,
                        Peso = 170,
                        Area = 90,
                        ListaJuntas = detalleJuntas2
                    });

                }

                return detalleSpools; 
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