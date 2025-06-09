export class DatosDeEntradaEntity {
    constructor(
        {
            id = 0,
            valorNominal = 0,
            moneda = "",
            tasaCupon = 0,
            plazo = 0,
            frecuenciaAnual = "",
            tipoTasa = "",
            periodoGracia = 0,
            tipoGracia = "",
            tasaMercado = 0
        }
    ) {
        this.id = id;
        this.valorNominal = valorNominal;
        this.moneda = moneda;
        this.tasaCupon = tasaCupon;
        this.plazo = plazo;
        this.frecuenciaAnual = frecuenciaAnual;
        this.tipoTasa = tipoTasa;
        this.periodoGracia = periodoGracia;
        this.tipoGracia = tipoGracia;
        this.tasaMercado = tasaMercado;
    }
}