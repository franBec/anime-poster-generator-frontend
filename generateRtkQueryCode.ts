import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { exec } from 'child_process';

// Define the directory and file path
const directoryPath = './generated/rtk-query';
const filePath = `${directoryPath}/jikanApi.ts`;

// Check if the directory exists, if not, create it
if (!existsSync(directoryPath)) {
    mkdirSync(directoryPath, { recursive: true });
    console.log(`Directory created at: ${directoryPath}`);
}

// If the file exists, empty its contents; if not, create it
writeFileSync(filePath, '');
console.log(`File contents cleared at: ${filePath}`);

// Define your command
const command = 'npx @rtk-query/codegen-openapi ./src/schemas/openapi/jikan-config.ts';

// Execute the command
exec(command, (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
});
