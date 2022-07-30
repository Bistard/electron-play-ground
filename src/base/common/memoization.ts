
/**
 * A helper decorator to implement `Memoization`. Used to speed up some expensive 
 * functions by storing the result in memory.
 * 
 * Could be used in functions or getters.
 * 
 * @throws An exception will be thrown if applied on either fucntions or getters.
 * 
 * @param target Either the constructor function of the class for a static 
 * 				 method, or the prototype of the class for an instance method.
 * @param propertyKey The name of the method.
 * @param descriptor The Property Descriptor for the method. More see https://www.logicbig.com/tutorials/misc/javascript/object-get-own-property-descriptor.html
 */
export function memoize(target: any, propertyKey: string, descriptor: PropertyDescriptor): void {

	let type: string;
	let func: Function;

	if (typeof descriptor.value === 'function') {
		// function memoization
		type = 'value';
		func = descriptor.value;
	} else if (typeof descriptor.get === 'function') {
		// getter memoization
		type = 'get';
		func = descriptor.get;
	} else {
		// does not support
		throw new Error(`does not support memoization for ${propertyKey} of ${target}`);
	}

	const propName = `$memoize$${propertyKey}`;
	descriptor[type] = function (...args: any[]): any {

		if (this.hasOwnProperty(propName) === false) {
			Object.defineProperty(this, propName, {
				configurable: false,
				enumerable: false,
				writable: false,
				value: func.apply(this, args) // we save the result for speeding up
			} as PropertyDescriptor);
		}

		return this[propName];
	};
}
