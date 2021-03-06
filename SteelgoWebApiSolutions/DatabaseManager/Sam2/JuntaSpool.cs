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
    
    public partial class JuntaSpool
    {
        public JuntaSpool()
        {
            this.AgrupadoresPND = new HashSet<AgrupadoresPND>();
            this.AgrupadoresPorJunta = new HashSet<AgrupadoresPorJunta>();
            this.AgrupadoresReparaciones = new HashSet<AgrupadoresReparaciones>();
            this.AgrupadoresSoportes = new HashSet<AgrupadoresSoportes>();
            this.BastonSpoolJunta = new HashSet<BastonSpoolJunta>();
            this.JuntaCampo = new HashSet<JuntaCampo>();
            this.JuntaWorkstatus = new HashSet<JuntaWorkstatus>();
            this.OrdenTrabajoJunta = new HashSet<OrdenTrabajoJunta>();
        }
    
        public int JuntaSpoolID { get; set; }
        public int SpoolID { get; set; }
        public int TipoJuntaID { get; set; }
        public int FabAreaID { get; set; }
        public string Etiqueta { get; set; }
        public string EtiquetaMaterial1 { get; set; }
        public string EtiquetaMaterial2 { get; set; }
        public string Cedula { get; set; }
        public int FamiliaAceroMaterial1ID { get; set; }
        public Nullable<int> FamiliaAceroMaterial2ID { get; set; }
        public decimal Diametro { get; set; }
        public Nullable<decimal> Espesor { get; set; }
        public Nullable<decimal> KgTeoricos { get; set; }
        public Nullable<decimal> Peqs { get; set; }
        public Nullable<System.Guid> UsuarioModifica { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public byte[] VersionRegistro { get; set; }
        public Nullable<bool> EsManual { get; set; }
        public Nullable<int> EstacionID { get; set; }
        public string FabClas { get; set; }
        public string Campo2 { get; set; }
        public string Campo3 { get; set; }
        public string Campo4 { get; set; }
        public string Campo5 { get; set; }
        public bool RequierePwht { get; set; }
        public Nullable<bool> RequierePruebaNeumatica { get; set; }
        public string Campo6 { get; set; }
        public string Campo7 { get; set; }
        public string Campo8 { get; set; }
        public string Campo9 { get; set; }
        public string Campo10 { get; set; }
        public string Campo11 { get; set; }
        public string Campo12 { get; set; }
        public string Campo13 { get; set; }
        public string Campo14 { get; set; }
        public string Campo15 { get; set; }
        public string Campo16 { get; set; }
        public string Campo17 { get; set; }
        public string Campo18 { get; set; }
        public string Campo19 { get; set; }
        public string Campo20 { get; set; }
        public string Campo21 { get; set; }
        public string Campo22 { get; set; }
        public string Campo23 { get; set; }
        public string Campo24 { get; set; }
        public string Campo25 { get; set; }
    
        public virtual ICollection<AgrupadoresPND> AgrupadoresPND { get; set; }
        public virtual ICollection<AgrupadoresPorJunta> AgrupadoresPorJunta { get; set; }
        public virtual ICollection<AgrupadoresReparaciones> AgrupadoresReparaciones { get; set; }
        public virtual ICollection<AgrupadoresSoportes> AgrupadoresSoportes { get; set; }
        public virtual aspnet_Users aspnet_Users { get; set; }
        public virtual ICollection<BastonSpoolJunta> BastonSpoolJunta { get; set; }
        public virtual Estacion Estacion { get; set; }
        public virtual FabArea FabArea { get; set; }
        public virtual FamiliaAcero FamiliaAcero { get; set; }
        public virtual FamiliaAcero FamiliaAcero1 { get; set; }
        public virtual ICollection<JuntaCampo> JuntaCampo { get; set; }
        public virtual Spool Spool { get; set; }
        public virtual TipoJunta TipoJunta { get; set; }
        public virtual ICollection<JuntaWorkstatus> JuntaWorkstatus { get; set; }
        public virtual ICollection<OrdenTrabajoJunta> OrdenTrabajoJunta { get; set; }
    }
}
