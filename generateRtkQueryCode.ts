import { existsSync, mkdirSync, writeFileSync, readdirSync, unlinkSync } from 'fs';
import { exec } from 'child_process';
import { join } from 'path';

const preProcessApi = () => {
    const directoryPath = './generated/rtk-query';

    if (existsSync(directoryPath)) {
        const files = readdirSync(directoryPath);

        for (const file of files) {
            unlinkSync(join(directoryPath, file));
        }
        console.log(`All files cleared in: ${directoryPath}`);
    } else {
        mkdirSync(directoryPath, { recursive: true });
        console.log(`Directory created at: ${directoryPath}`);
    }
};

const processApi = (apiName: string) => {
    const directoryPath = './generated/rtk-query';
    const filePath = `${directoryPath}/${apiName}Api.ts`;

    writeFileSync(filePath, '');

    const command = `npx @rtk-query/codegen-openapi ./src/schemas/openapi/${apiName}-config.ts`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });
};

preProcessApi();
const apiNames = ['jikan', 'animePosterGeneratorBackend'];
apiNames.forEach(apiName => {
    processApi(apiName);
});
