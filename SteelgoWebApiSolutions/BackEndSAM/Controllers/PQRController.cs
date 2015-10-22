using BackEndSAM.DataAcces;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using SecurityManager.TokenHandler;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Script.Serialization;

namespace BackEndSAM.Controllers
{

    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class PQRController : ApiController
    {


        //Obtiene el DataSource Para PQR
        public object Get(int TipoDato, string token)
        {
            try
            {
                string payload = "";
                string newToken = "";
                bool totokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
                if (totokenValido)
                {
                    return PQRBd.Instance.ObtenerPQR(TipoDato);
                }
                else
                {
                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add(payload);
                    result.ReturnCode = 401;
                    result.ReturnStatus = false;
                    result.IsAuthenicated = false;
                    return result;
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

        //Llena el DataSource para NumeroP
        public object Get(int TipoDato, string ConsultaNumeroP, string token)
        {
            try
            {
                string payload = "";
                string newToken = "";
                bool totokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
                if (totokenValido)
                {
                    return PQRBd.Instance.ObtenerNumeroP(TipoDato);
                }
                else
                {
                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add(payload);
                    result.ReturnCode = 401;
                    result.ReturnStatus = false;
                    result.IsAuthenicated = false;
                    return result;
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

        //Llena el DataSource para ConsultaProcesoSoldadura
        public object Get(int TipoDato, int ConsultaProcesoSoldadura, string token)
        {
            try
            {
                string payload = "";
                string newToken = "";
                bool totokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
                if (totokenValido)
                {
                    return PQRBd.Instance.ObtenerProcesoSoldadura(TipoDato);
                }
                else
                {
                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add(payload);
                    result.ReturnCode = 401;
                    result.ReturnStatus = false;
                    result.IsAuthenicated = false;
                    return result;
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

        //Llena el Datasource para GrupoP
        public object Get(string ConsultaGrupoP, int TipoDato, string token)
        {
            try
            {
                string payload = "";
                string newToken = "";
                bool totokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
                if (totokenValido)
                {
                    return PQRBd.Instance.ObtenerGrupoP(TipoDato);
                }
                else
                {
                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add(payload);
                    result.ReturnCode = 401;
                    result.ReturnStatus = false;
                    result.IsAuthenicated = false;
                    return result;
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

        //Llena el DataSource para Aporte
        public object Get(string token, string ConsultaAporte, int TipoDato)
        {
            try
            {
                string payload = "";
                string newToken = "";
                bool totokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
                if (totokenValido)
                {
                    return PQRBd.Instance.ObtenerAporte(TipoDato);
                }
                else
                {
                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add(payload);
                    result.ReturnCode = 401;
                    result.ReturnStatus = false;
                    result.IsAuthenicated = false;
                    return result;
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

        //Llena el DataSopurce para Mezcla
        public object Get(string token, int ConsultaMezcla, int TipoDato)
        {
            try
            {
                string payload = "";
                string newToken = "";
                bool totokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
                if (totokenValido)
                {
                    return PQRBd.Instance.ObtenerMezcla(TipoDato);
                }
                else
                {
                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add(payload);
                    result.ReturnCode = 401;
                    result.ReturnStatus = false;
                    result.IsAuthenicated = false;
                    return result;
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

        //Llena el DataSopurce para Respaldo
        public object Get(int ConsultaRespaldo, string token, int TipoDato)
        {
            try
            {
                string payload = "";
                string newToken = "";
                bool totokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
                if (totokenValido)
                {
                    return PQRBd.Instance.ObtenerRespaldo(TipoDato);
                }
                else
                {
                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add(payload);
                    result.ReturnCode = 401;
                    result.ReturnStatus = false;
                    result.IsAuthenicated = false;
                    return result;
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


        //Llena el DataSopurce para GrupoF
        public object Get(string token, int TipoDato, string var1, string var2)
        {
            try
            {
                string payload = "";
                string newToken = "";
                bool totokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
                if (totokenValido)
                {
                    return PQRBd.Instance.ObtenerGrupoF(TipoDato);
                }
                else
                {
                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add(payload);
                    result.ReturnCode = 401;
                    result.ReturnStatus = false;
                    result.IsAuthenicated = false;
                    return result;
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


        //Elimina Un PQR (Cambia a estado inactivo en BD)
        public object Put(int TipoDeDato, int PQRID, string token)
        {
            try
            {
                string payload = "";
                string newToken = "";
                bool totokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
                if (totokenValido)
                {
                    JavaScriptSerializer serializer = new JavaScriptSerializer();
                    Sam3_Usuario Usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                    int IdUsuario = Usuario.UsuarioID;
                    return PQRBd.Instance.EliminaPQR(TipoDeDato, PQRID, IdUsuario);
                    // return new object();
                }
                else
                {
                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add(payload);
                    result.ReturnCode = 401;
                    result.ReturnStatus = false;
                    result.IsAuthenicated = false;
                    return result;
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



        //Edita PQR Seleccionado
        public object Put(int PQRID, string Nombre, bool PREHEAT, bool PWHT, decimal Espesor, int ProcesoSoldadura, int NumeroP, int GrupoP, int Aporte, int Mezcla, int Respaldo, int GrupoF, string token)
        {
            try
            {
                string payload = "";
                string newToken = "";
                bool totokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
                if (totokenValido)
                {
                    JavaScriptSerializer serializer = new JavaScriptSerializer();
                    Sam3_Usuario Usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                    int IdUsuario = Usuario.UsuarioID;
                    int TipoDeDato = 3;
                    return PQRBd.Instance.ActualizaPQR(TipoDeDato, PQRID, Nombre, PREHEAT, PWHT, Espesor, ProcesoSoldadura, NumeroP, GrupoP, Aporte, Mezcla, Respaldo, GrupoF, IdUsuario);
                    // return new object();
                }
                else
                {
                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add(payload);
                    result.ReturnCode = 401;
                    result.ReturnStatus = false;
                    result.IsAuthenicated = false;
                    return result;
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
