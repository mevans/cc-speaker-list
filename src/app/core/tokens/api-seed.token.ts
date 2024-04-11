import { InjectionToken } from "@angular/core";

// Control the randomness of the API
export const ApiSeed = new InjectionToken<string>('API seed');