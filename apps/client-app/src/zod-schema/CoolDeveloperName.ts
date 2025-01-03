import { z } from 'zod'

export const CoolDeveloperNameSchema = z.union([
    z.literal('Dasha'),
    z.literal('Maxim'),
    z.literal('Mirko'),
    z.literal('Ole'),
    z.literal('Simon'),
    z.literal('Victor'),
])
