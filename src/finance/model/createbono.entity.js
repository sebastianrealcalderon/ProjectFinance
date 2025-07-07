export class CreateBono {
    constructor({
                    nombreBono = "",
                    emisorId = null,
                    inputData = {}
                }) {
        this.nombreBono = nombreBono;
        this.emisorId = emisorId;

        this.inputData = {
            valorNominal: inputData.valorNominal || 0,
            tipoDeMoneda: inputData.tipoDeMoneda || "PEN",
            valorComercial: inputData.valorComercial || 0,
            periodos: inputData.periodos || 0,
            frecuenciaDePago: inputData.frecuenciaDePago || "ANUAL",
            tipoDeTasa: inputData.tipoDeTasa || "EFECTIVA",
            tasaInteres: inputData.tasaInteres || 0,
            capitalizacion: inputData.capitalizacion || "ANUAL",
            plazoGraciaTotal: inputData.plazoGraciaTotal || 0,
            plazoGraciaParcial: inputData.plazoGraciaParcial || 0,
            fechaEmision: inputData.fechaEmision ? new Date(inputData.fechaEmision) : new Date(),
            gastosFinales: inputData.gastosFinales || 0,
            gastosIniciales: inputData.gastosIniciales || 0,
            impuestoRenta: inputData.impuestoRenta || 0
        };
    }

    // Método para crear instancia desde JSON
    static fromJson(json) {
        return new CreateBono({
            nombreBono: json.nombreBono,
            inputData: json.inputData
        });
    }

    // Método para convertir a formato API
    toApiFormat() {
        return {
            nombreBono: this.nombreBono,
            inputData: {
                valorNominal: this.inputData.valorNominal,
                tipoDeMoneda: this.inputData.tipoDeMoneda,
                valorComercial: this.inputData.valorComercial,
                periodos: this.inputData.periodos,
                frecuenciaDePago: this.inputData.frecuenciaDePago,
                tipoDeTasa: this.inputData.tipoDeTasa,
                tasaInteres: this.inputData.tasaInteres,
                capitalizacion: this.inputData.capitalizacion,
                plazoGraciaTotal: this.inputData.plazoGraciaTotal,
                plazoGraciaParcial: this.inputData.plazoGraciaParcial,
                fechaEmision: this.inputData.fechaEmision.toISOString(),
                gastosFinales: this.inputData.gastosFinales,
                gastosIniciales: this.inputData.gastosIniciales,
                impuestoRenta: this.inputData.impuestoRenta
            }
        };
    }

    // Método para obtener valores por defecto
    static getDefault() {
        return new CreateBono({
            nombreBono: "",
            inputData: {
                valorNominal: 0,
                tipoDeMoneda: "PEN",
                valorComercial: 0,
                periodos: 0,
                frecuenciaDePago: "ANUAL",
                tipoDeTasa: "EFECTIVA",
                tasaInteres: 0,
                capitalizacion: "ANUAL",
                plazoGraciaTotal: 0,
                plazoGraciaParcial: 0,
                fechaEmision: new Date(),
                gastosFinales: 0,
                gastosIniciales: 0,
                impuestoRenta: 0
            }
        });
    }
}