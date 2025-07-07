export class BonoComplete {
    constructor({
                    id = 0,
                    nombreBono = "string",
                    emisorId = 0,
                    inputData = {},
                    middleData = {},
                    outputData = {}
                } = {}) {
        this.id = id;
        this.nombreBono = nombreBono;
        this.emisorId = emisorId;

        // Input Data con valores simples por defecto
        this.inputData = {
            valorNominal: inputData.valorNominal || 1,
            tipoDeMoneda: inputData.tipoDeMoneda || "PEN",
            valorComercial: inputData.valorComercial || 1,
            periodos: inputData.periodos || 1,
            frecuenciaDePago: inputData.frecuenciaDePago || "DIARIA",
            tipoDeTasa: inputData.tipoDeTasa || "NOMINAL",
            tasaInteres: inputData.tasaInteres || 1,
            capitalizacion: inputData.capitalizacion || "DIARIA",
            plazoGraciaTotal: inputData.plazoGraciaTotal || 0,
            plazoGraciaParcial: inputData.plazoGraciaParcial || 0,
            fechaEmision: inputData.fechaEmision || new Date().toISOString(),
            gastosFinales: inputData.gastosFinales || 1,
            gastosIniciales: inputData.gastosIniciales || 1,
            impuestoRenta: inputData.impuestoRenta || 1
        };

        // Middle Data con valores simples por defecto
        this.middleData = {
            n: middleData.n || 0,
            i: middleData.i || 1,
            cuota: middleData.cuota || 1,
            interesAcumulado: middleData.interesAcumulado || 1,
            amortizacionAcumulado: middleData.amortizacionAcumulado || 1,
            flujoTotalEmisor: middleData.flujoTotalEmisor || 1,
            valorNetoEmisor: middleData.valorNetoEmisor || 1,
            impuestoTotalBonista: middleData.impuestoTotalBonista || 1,
            convexidadParcial: middleData.convexidadParcial || 1
        };

        // Output Data con estructura para múltiples elementos en tablaAmortizacion
        this.outputData = {
            tablaAmortizacion: outputData.tablaAmortizacion || [{
                fechaPago: new Date().toISOString(),
                cuotaPeriodo: 0,
                interes: 0,
                amortizacion: 0,
                saldo: 0
            }],
            duracionMacualay: outputData.duracionMacualay || 0,
            convexidad: outputData.convexidad || 0,
            precioTeorico: outputData.precioTeorico || 0,
            tcea: outputData.tcea || 0,
            trea: outputData.trea || 0
        };

        // Aseguramos que tablaAmortizacion sea un array
        if (outputData.tablaAmortizacion && !Array.isArray(outputData.tablaAmortizacion)) {
            this.outputData.tablaAmortizacion = [outputData.tablaAmortizacion];
        }
    }
}