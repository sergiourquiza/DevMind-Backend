const { Exercise, Input, Answer } = require('../models');
const compilerService = require('../services/compilerService');

exports.compileCode = async (req, res) => {
    const { exerciseId, language, code } = req.body;

    try {
        // Obtener el ejercicio desde la base de datos
        const exercise = await Exercise.findByPk(exerciseId);

        if (!exercise) {
            return res.status(404).json({ error: 'Exercise not found' });
        }

        // Obtener todos los inputs y respuestas esperadas desde la base de datos
        const inputs = exercise.requiresInput ? await Input.findAll({
            where: { exerciseId: exerciseId }
        }) : [];
        

        const answers = await Answer.findAll({
            where: { exerciseId: exerciseId }
        });

        if (answers.length === 0) {
            return res.status(404).json({ error: 'Expected answers not found for the exercise' });
        }
  
        let results = [];

        // Verificar si el ejercicio requiere inputs
        if (exercise.requiresInput) {
            // Obtener los inputs desde la base de datos
            const inputs = await Input.findAll({
                where: { exerciseId: exerciseId }
            });

            // Iterar sobre los inputs y realizar la comparación con las respuestas
            for (let i = 0; i < inputs.length; i++) {
                const input = inputs[i];
                const expectedAnswer = answers.find(answer => answer.inputId === input.id);

                if (expectedAnswer) {
                    const inputsData = input.input;
                    const output = await compilerService.compileCode(language, code, inputsData);
                    const outputLines = output.trim().split('\n');

                    // Comparar la salida con la respuesta esperada
                    const isCorrect = outputLines.includes(expectedAnswer.answer.trim());
                    const outputLine = outputLines.find(line => line.trim() === expectedAnswer.answer.trim()) || "Not found in output";

                    results.push({
                        inputId: input.id,
                        expectedResult: expectedAnswer.answer.trim(),
                        isCorrect: isCorrect,
                        output: outputLine
                    });
                }
            }
        } else {
            // Si no se requieren inputs, simplemente ejecutamos el código y comparamos la salida
            const output = await compilerService.compileCode(language, code, '');
            
            const outputLines = output.trim().split('\n');
            

            results = answers.map(answer => {
                const isCorrect = outputLines.includes(answer.answer.trim());
                
                const outputLine = outputLines.find(line => line.trim() === answer.answer.trim()) || "Not found in output";

                return {
                    inputId: null,  // No hay input asociado
                    expectedResult: answer.answer.trim(),
                    isCorrect: isCorrect,
                    output: outputLine
                };
            });
        }

        res.json({ results });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
};