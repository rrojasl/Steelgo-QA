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

        public object obtenerCatalogos()
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<ListaCombos> valoresCombo = new List<ListaCombos>();

                    ListaCombos patios = new ListaCombos();
                    ListaCombos chofer = new ListaCombos();
                    ListaCombos cliente = new ListaCombos(); //Revisar *****************************
                    ListaCombos tipoAviso = new ListaCombos();
                    ListaCombos transportista = new ListaCombos();
                    ListaCombos tracto = new ListaCombos();
                    ListaCombos plana = new ListaCombos();
                    ListaCombos proveedor = new ListaCombos();
                    ListaCombos tipoMaterial = new ListaCombos();
                    ListaCombos tipoUso = new ListaCombos();
                    ListaCombos camion = new ListaCombos();
                    ListaCombos tipoAcero = new ListaCombos();
                    ListaCombos coladas = new ListaCombos();
                    ListaCombos contacto = new ListaCombos();
                    ListaCombos operador = new ListaCombos();

                    patios.id = "1";
                    patios.value = "Patios";
                    valoresCombo.Add(patios);

                    chofer.id = "2";
                    chofer.value = "Chofer";
                    valoresCombo.Add(chofer);

                    cliente.id = "3";
                    cliente.value = "Cliente";
                    valoresCombo.Add(cliente);

                    tipoAviso.id = "4";
                    tipoAviso.value = "Tipo Aviso";
                    valoresCombo.Add(tipoAviso);

                    transportista.id = "5";
                    transportista.value = "Transportista";
                    valoresCombo.Add(transportista);

                    tracto.id = "6";
                    tracto.value = "Tracto";
                    valoresCombo.Add(tracto);


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