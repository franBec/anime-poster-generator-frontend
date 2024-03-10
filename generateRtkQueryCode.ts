import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { exec } from 'child_process';

const directoryPath = './generated/rtk-query';
const filePath = `${directoryPath}/jikanApi.ts`;

if (!existsSync(directoryPath)) {
    mkdirSync(directoryPath, { recursive: true });
    console.log(`Directory created at: ${directoryPath}`);
}

if (!existsSync(filePath)) {
    writeFileSync(filePath, '');
    console.log(`File created at: ${filePath}`);
}

const command = 'npx @rtk-query/codegen-openapi ./src/schemas/openapi/jikan-config.ts';

exec(command, (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
});
