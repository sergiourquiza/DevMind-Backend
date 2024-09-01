const { exec } = require('child_process');
const path = require('path');

exports.compileCode = (req, res) => {
    const { language, code } = req.body;

    // Escapar las comillas dobles y los saltos de línea en el código
    const escapedCode = code.replace(/"/g, '\\"').replace(/\n/g, '\\n');

    // Comando para ejecutar el código dentro del contenedor Docker
    const command = `docker run --rm -v ${path.resolve(__dirname, '../workspace')}:/workspace code-compiler /usr/local/bin/run_code.sh ${language} "${escapedCode}"`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            res.status(500).json({ error: stderr });
        } else {
            res.json({ output: stdout });
        }
    });
};