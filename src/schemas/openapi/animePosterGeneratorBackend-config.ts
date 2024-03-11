import type { ConfigFile } from '@rtk-query/codegen-openapi';

const baseName = 'animePosterGeneratorBackend';

const config: ConfigFile = {
    schemaFile: `./${baseName}.yaml`,
    apiFile: `../../clients/${baseName}Client.ts`,
    apiImport: `${baseName}Client`,
    outputFile: `../../../generated/rtk-query/${baseName}Api.ts`,
    exportName: `${baseName}Api`,
    hooks: true,
}

export default config;
