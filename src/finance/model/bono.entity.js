export class Bono{
    constructor({
                    id=0,
                    userId= null,
                    inputData={},
                    middleData = {},
                    outputData = {
                    },
                }) {
        this.id = id;
        this.userId = userId;

        this.inputData = {
            nombreBono: inputData.nombreBono || "",
            valorNominal: inputData.valorNominal || 0,
            valorComercial: inputData.valorComercial || 0,
            moneda: inputData.moneda || "PEN",
            nroPeriodos: inputData.nroPeriodos || 0,
            frecuenciaPago: inputData.frecuenciaPago || "ANUAL",
            tipoTasa: inputData.tipoTasa || "EFECTIVA",
            tasaInteres: inputData.tasaInteres || 0,
            capitalizacion: inputData.capitalizacion || "Anual",
            plazoGraciaTotal: inputData.plazoGraciaTotal || 0,
            plazoGraciaParcial: inputData.plazoGraciaParcial || 0,
            fechaEmision: inputData.fechaEmision || new Date(),
            gastosIniciales: inputData.gastosIniciales || 0,
            gastosFinales: inputData.gastosFinales || 0,
            impuestoRenta: inputData.impuestoRenta || 0
        };
        // Datos intermedios (puedes rellenar después)
        this.middleData = {
            n:middleData.n||0,
            i:middleData.i||0.0,
            iAnual:middleData.iAnual||false,
            iNominal:middleData.iNominal||false,
            k:middleData.k||0,
            cuota:middleData.cuota||0.0,
            iAcumulado:middleData.iAcumulado||0.0,
            amortAcumulado:middleData.amortAcumulado||0.0,
            flujoEmisorTotal:middleData.flujoEmisorTotal||0.0,
            flujoBonistaTotal:middleData.flujoBonistaTotal||0.0,
            gastosIniciales:middleData.gastosIniciales||0.0,
            gastosFinales:middleData.gastosFinales||0.0,
            valorNetoEmisor:middleData.valorNetoEmisor||0.0,
            valorNetoBonista:middleData.valorNetoBonista||0.0,
            inpuestoTotalBonista:middleData.inpuestoTotalBonista||0.0,
            tiempoPonderado:middleData.tiempoPonderado||0.0,
            convexidadParcial:middleData.convexidadParcial||0.0,
        };

        // Datos de salida con defaults
        this.outputData = {
            flujoCaja: outputData.flujoCaja || [],
            tcea: outputData.tcea || null,
            trea: outputData.trea || null,
            convexidad: outputData.convexidad || null,
            duration: outputData.duration || null,
            duracionModificada: outputData.duracionModificada || null,
            precioMaximoMercado: outputData.precioMaximoMercado || null
        };
    }
}