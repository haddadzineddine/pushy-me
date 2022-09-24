import { isValideApiKey } from "../utils/is-valide-apiKey";

export class ApiKey {
    private readonly value: string;

    constructor(value: string) {
        if (!isValideApiKey(value)) {
            throw new Error('Invalid API Key');
        }
        this.value = value;
    }
    get(): string {
        return this.value;
    }
}
