export class ValidationResult {
    public readonly success: boolean;
    public readonly message?: string;

    constructor(success: boolean, message?: string) {
        this.success = success;
        this.message = message;
    }

    public static valid(): ValidationResult {
        return new ValidationResult(true);
    }

    public static invalid(message: string) {
        return new ValidationResult(false, message);
    }
}
