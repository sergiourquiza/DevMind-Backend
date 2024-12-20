const { exec } = require('child_process');
const path = require('path');

const compileCode = (language, code, inputs = '', codeType = 'script', functionName = '') => {
    return new Promise((resolve, reject) => {
        // Escapar las comillas dobles y los saltos de línea en el código y los inputs
        const escapedCode = code.replace(/"/g, '\\"').replace(/\n/g, '\\n');
        const escapedInputs = inputs.replace(/"/g, '\\"').replace(/\n/g, '\\n');
        const escapedFunctionName = functionName.replace(/"/g, '\\"');

        // Comando para ejecutar el código dentro del contenedor Docker
        const command = `docker run --rm juancai0104/code-compiler:v1.0.2 /usr/local/bin/run_code.sh ${language} "${escapedCode}" "${escapedInputs}" ${codeType} "${escapedFunctionName}"`;

        exec(command, (error, stdout, stderr) => {
            if (error) {
                return reject(stderr);
            }
            resolve(stdout);
        });
    });
};

module.exports = { compileCode };