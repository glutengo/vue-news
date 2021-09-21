/* eslint-disable id-blacklist */
class Transformer {
    static Operations = {
        string: ['substring', 'toLowerCase', 'toUpperCase', 'replace', 'concat'],
        number: ['add', 'subtract', 'multiply', 'divide'],
    };

    constructor(private operation: TransformOperation) {}

    transform<T = number | string>(value: T): T {
        switch (typeof value) {
            case 'string':
                if (Transformer.Operations.string.includes(this.operation.operation)) {
                    return value[this.operation.operation](...this.operation.args);
                }
                break;
            case 'number':
                if (Transformer.Operations.number.includes(this.operation.operation)) {
                    switch (this.operation.operation) {
                        case 'add':
                            return this.operation.args.reduce(
                                (arg, res) => (typeof arg === 'number' ? res + arg : res),
                                value,
                            );
                        case 'subtract':
                            return this.operation.args.reduce(
                                (arg, res) => (typeof arg === 'number' ? res - arg : res),
                                value,
                            );
                        case 'multiply':
                            return this.operation.args.reduce(
                                (arg, res) => (typeof arg === 'number' ? res * arg : res),
                                value,
                            );
                        case 'divide':
                            return this.operation.args.reduce(
                                (arg, res) => (typeof arg === 'number' ? res / arg : res),
                                value,
                            );
                    }
                }
        }
        return value;
    }
}

interface TransformOperation {
    operation: string;
    args: any[];
}

export function transformField<T>(value: T, operations: TransformOperation[]): T {
    let result = value;
    for (const o of operations) {
        result = new Transformer(o).transform(value);
    }
    return result;
}
