using BackEndSAM.Models;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces
{
    public class CatalogosBd
    {
        private static readonly object _mutex = new object();
        private static CatalogosBd _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private CatalogosBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static CatalogosBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new CatalogosBd();
                    }
                }
                return _instance;
            }
        }

        /// <summary>
        /// Funcion con llenar el combo de catalogos
        /// </summary>
        /// <returns></returns>
        public object obtenerCatalogos()
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<ListaCombos> valoresCombo = new List<ListaCombos>();

                    ListaCombos patios = new ListaCombos();
                    ListaCombos chofer = new ListaCombos();
                    ListaCombos tipoAviso = new ListaCombos();
                    ListaCombos transportista = new ListaCombos();
                    ListaCombos tracto = new ListaCombos();
                    ListaCombos plana = new ListaCombos();
                    ListaCombos proveedor = new ListaCombos();
                    ListaCombos tipoUso = new ListaCombos();
                    ListaCombos camion = new ListaCombos();
                    ListaCombos Acero = new ListaCombos();
                    ListaCombos coladas = new ListaCombos();

                    patios.id = "1";
                    patios.value = "Patios";
                    valoresCombo.Add(patios);

                    chofer.id = "2";
                    chofer.value = "Chofer";
                    valoresCombo.Add(chofer);

                    tipoAviso.id = "3";
                    tipoAviso.value = "Tipo Aviso";
                    valoresCombo.Add(tipoAviso);

                    transportista.id = "4";
                    transportista.value = "Transportista";
                    valoresCombo.Add(transportista);

                    tracto.id = "5";
                    tracto.value = "Tracto";
                    valoresCombo.Add(tracto);

                    plana.id = "6";
                    plana.value = "Plana";
                    valoresCombo.Add(plana);

                    proveedor.id = "7";
                    proveedor.value = "Proveedor";
                    valoresCombo.Add(proveedor);

                    tipoUso.id = "8";
                    tipoUso.value = "Tipo de Uso";
                    valoresCombo.Add(tipoUso);

                    camion.id = "9";
                    camion.value = "Camion";
                    valoresCombo.Add(camion);

                    Acero.id = "10";
                    Acero.value = "Acero";
                    valoresCombo.Add(Acero);

                    coladas.id = "11";
                    coladas.value = "Coladas";
                    valoresCombo.Add(coladas);

                    return valoresCombo;
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

        /// <summary>
        /// Muestra la informacion del catalogo seleccionado
        /// </summary>
        /// <param name="catalogoID"></param>
        /// <returns></returns>
        public object obtenerInformacionCatalogos(string catalogoID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    switch (Convert.ToInt32(catalogoID))
                    {
                        case 1: //Patios
                            List<CatalogoPatio> catPatio = new List<CatalogoPatio>();
                            catPatio = (from p in ctx.Sam3_Patio
                                        where p.Activo
                                        select new CatalogoPatio
                                        {
                                            Nombre = p.Nombre,
                                            Propietario = p.Propietario,
                                            Descripcion = p.Descripcion
                                        }).AsParallel().ToList();
                            return catPatio;
                        case 2: //Chofer
                            List<CatalogoChofer> catChofer = new List<CatalogoChofer>();

                            return catChofer;

                        default:
                            TransactionalInformation result = new TransactionalInformation();
                            result.ReturnMessage.Add("Listado no encontrado");
                            result.ReturnCode = 500;
                            result.ReturnStatus = false;
                            result.IsAuthenicated = false;
                            return result;

                    }
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
    }
}