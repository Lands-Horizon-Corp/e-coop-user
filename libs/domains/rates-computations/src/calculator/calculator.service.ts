import { Logger } from '@ecoop/shared/loggers'
import { createDataLayerFactory } from '@ecoop/shared/repositories'

import type { ICalculator, ICalculatorRequest } from '../calculator'

const {
    // apiCrudHooks,
    apiCrudService,
    baseQueryKey: calculatorBaseKey,
} = createDataLayerFactory<ICalculator, ICalculatorRequest>({
    url: '/api/v1/calculator',
    baseKey: 'calculator',
})

// ⚙️🛠️ API SERVICE HERE
export const {
    API, // rarely used, for raw calls
    route: calculatorAPIRoute, // matches url above
} = apiCrudService

// custom service functions can go here

// 🪝 HOOK STARTS HERE
export { calculatorBaseKey } // Exported in case it's needed outside

// custom hooks can go here
export const logger = Logger.getInstance('calculator')
