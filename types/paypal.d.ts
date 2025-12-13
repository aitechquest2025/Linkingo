// Type definitions for @paypal/checkout-server-sdk
declare module "@paypal/checkout-server-sdk" {
    export namespace core {
        export class SandboxEnvironment {
            constructor(clientId: string, clientSecret: string);
        }

        export class LiveEnvironment {
            constructor(clientId: string, clientSecret: string);
        }

        export class PayPalHttpClient {
            constructor(environment: SandboxEnvironment | LiveEnvironment);
            execute(request: any): Promise<any>;
        }
    }
}
