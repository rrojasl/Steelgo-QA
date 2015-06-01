//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DatabaseManager.Sam2
{
    using System;
    using System.Collections.Generic;
    
    public partial class NumeroUnico
    {
        public NumeroUnico()
        {
            this.CongeladoParcial = new HashSet<CongeladoParcial>();
            this.Despacho = new HashSet<Despacho>();
            this.JuntaArmado = new HashSet<JuntaArmado>();
            this.JuntaArmado1 = new HashSet<JuntaArmado>();
            this.JuntaCampoArmado = new HashSet<JuntaCampoArmado>();
            this.JuntaCampoArmado1 = new HashSet<JuntaCampoArmado>();
            this.NumeroUnicoCorte = new HashSet<NumeroUnicoCorte>();
            this.NumeroUnicoMovimiento = new HashSet<NumeroUnicoMovimiento>();
            this.NumeroUnicoSegmento = new HashSet<NumeroUnicoSegmento>();
            this.OrdenTrabajoMaterial = new HashSet<OrdenTrabajoMaterial>();
            this.OrdenTrabajoMaterial1 = new HashSet<OrdenTrabajoMaterial>();
            this.OrdenTrabajoMaterial2 = new HashSet<OrdenTrabajoMaterial>();
            this.OrdenTrabajoMaterial3 = new HashSet<OrdenTrabajoMaterial>();
            this.PinturaNumeroUnico = new HashSet<PinturaNumeroUnico>();
            this.RecepcionNumeroUnico = new HashSet<RecepcionNumeroUnico>();
            this.RequisicionNumeroUnicoDetalle = new HashSet<RequisicionNumeroUnicoDetalle>();
        }
    
        public int NumeroUnicoID { get; set; }
        public int ProyectoID { get; set; }
        public Nullable<int> ItemCodeID { get; set; }
        public Nullable<int> ColadaID { get; set; }
        public Nullable<int> ProveedorID { get; set; }
        public Nullable<int> FabricanteID { get; set; }
        public Nullable<int> TipoCorte1ID { get; set; }
        public Nullable<int> TipoCorte2ID { get; set; }
        public string Codigo { get; set; }
        public string Estatus { get; set; }
        public string Factura { get; set; }
        public string PartidaFactura { get; set; }
        public string OrdenDeCompra { get; set; }
        public string PartidaOrdenDeCompra { get; set; }
        public decimal Diametro1 { get; set; }
        public decimal Diametro2 { get; set; }
        public string Cedula { get; set; }
        public string NumeroUnicoCliente { get; set; }
        public bool MarcadoAsme { get; set; }
        public bool MarcadoGolpe { get; set; }
        public bool MarcadoPintura { get; set; }
        public string PruebasHidrostaticas { get; set; }
        public bool TieneDano { get; set; }
        public Nullable<System.Guid> UsuarioModifica { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public byte[] VersionRegistro { get; set; }
        public string Rack { get; set; }
        public string Observaciones { get; set; }
        public string CampoLibreRecepcion1 { get; set; }
        public string CampoLibreRecepcion2 { get; set; }
        public string CampoLibreRecepcion3 { get; set; }
        public string CampoLibreRecepcion4 { get; set; }
        public string CampoLibreRecepcion5 { get; set; }
        public string CampoLibre1 { get; set; }
        public string CampoLibre2 { get; set; }
        public string CampoLibre3 { get; set; }
        public string CampoLibre4 { get; set; }
        public string CampoLibre5 { get; set; }
    
        public virtual Colada Colada { get; set; }
        public virtual ICollection<CongeladoParcial> CongeladoParcial { get; set; }
        public virtual ICollection<Despacho> Despacho { get; set; }
        public virtual Fabricante Fabricante { get; set; }
        public virtual ItemCode ItemCode { get; set; }
        public virtual ICollection<JuntaArmado> JuntaArmado { get; set; }
        public virtual ICollection<JuntaArmado> JuntaArmado1 { get; set; }
        public virtual ICollection<JuntaCampoArmado> JuntaCampoArmado { get; set; }
        public virtual ICollection<JuntaCampoArmado> JuntaCampoArmado1 { get; set; }
        public virtual Proveedor Proveedor { get; set; }
        public virtual Proyecto Proyecto { get; set; }
        public virtual TipoCorte TipoCorte { get; set; }
        public virtual TipoCorte TipoCorte1 { get; set; }
        public virtual ICollection<NumeroUnicoCorte> NumeroUnicoCorte { get; set; }
        public virtual NumeroUnicoInventario NumeroUnicoInventario { get; set; }
        public virtual ICollection<NumeroUnicoMovimiento> NumeroUnicoMovimiento { get; set; }
        public virtual ICollection<NumeroUnicoSegmento> NumeroUnicoSegmento { get; set; }
        public virtual ICollection<OrdenTrabajoMaterial> OrdenTrabajoMaterial { get; set; }
        public virtual ICollection<OrdenTrabajoMaterial> OrdenTrabajoMaterial1 { get; set; }
        public virtual ICollection<OrdenTrabajoMaterial> OrdenTrabajoMaterial2 { get; set; }
        public virtual ICollection<OrdenTrabajoMaterial> OrdenTrabajoMaterial3 { get; set; }
        public virtual ICollection<PinturaNumeroUnico> PinturaNumeroUnico { get; set; }
        public virtual ICollection<RecepcionNumeroUnico> RecepcionNumeroUnico { get; set; }
        public virtual ICollection<RequisicionNumeroUnicoDetalle> RequisicionNumeroUnicoDetalle { get; set; }
    }
}
