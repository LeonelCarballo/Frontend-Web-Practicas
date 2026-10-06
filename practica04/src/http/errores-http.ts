export class ValidacionError extends Error {
    constructor(public readonly detalles: string[]){
        super('La peticion no cumple con el contrato');
        this.name = "Validacion Error"
    }
}