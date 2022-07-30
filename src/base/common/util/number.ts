
export namespace Number {
    
    export function isDecimal(num: number): boolean {
        return num % 1 !== 0;
    }

    export function isStringDecimal(number: string): boolean {
        return number.indexOf('.') !== -1;
    }

}