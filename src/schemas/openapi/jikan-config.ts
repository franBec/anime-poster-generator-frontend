import type { ConfigFile } from '@rtk-query/codegen-openapi'

const config: ConfigFile = {
    schemaFile: './jikan.yaml',
    apiFile: '../../clients/jikanClient.ts',
    apiImport: 'jikanClient',
    outputFile: '../../../generated/rtk-query/jikanApi.ts',
    exportName: 'jikanApi',
    hooks: true,
}

export default config