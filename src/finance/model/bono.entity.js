export class Bono{
    constructor({
                    id=0,
                    nombreBono= '',
                    emisorId= null,
                    inputData = {
                        valorNominal: 0,
                        tipoDeMoneda: "",
                        valorComercial: 0,
                        periodos: 0,
                        frecuenciaDePago: "",
                        tipoDeTasa: "",
                        tasaInteres: 0,
                        capitalizacion: "",
                        plazoGraciaTotal: 0,
                        plazoGraciaParcial: 0,
                        fechaEmision: new Date(),
                        gastosFinales: 0,
                        gastosIniciales: 0,
                        impuestoRenta: 0
                    }
                }) {
        this.id = id;
        this.emisorId = emisorId;
        this.nombreBono = nombreBono;
        this.inputData = inputData;
    }

    toBackendFormat() {
        return {
            nombreBono: this.nombreBono,  // El orden de los datos debe coincidir con el del backend
            emisorId: this.emisorId,
            inputData: {
                valorNominal: this.inputData.valorNominal,
                tipoDeMoneda: this.inputData.tipoDeMoneda,
                valorComercial: this.inputData.valorComercial,
                periodos: this.inputData.periodos,
                frecuenciaDePago: this.inputData.frecuenciaDePago,  // Asegúrate de que esta propiedad esté aquí
                tipoDeTasa: this.inputData.tipoDeTasa,
                tasaInteres: this.inputData.tasaInteres/100,
                capitalizacion: this.inputData.capitalizacion,
                plazoGraciaTotal: this.inputData.plazoGraciaTotal,
                plazoGraciaParcial: this.inputData.plazoGraciaParcial,
                fechaEmision: this.inputData.fechaEmision,
                gastosFinales: this.inputData.gastosFinales,
                gastosIniciales: this.inputData.gastosIniciales,
                impuestoRenta: this.inputData.impuestoRenta/100,
            }
        };
    }
}