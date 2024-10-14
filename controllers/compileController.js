const { Exercise, Input, Answer } = require('../models');
const compilerService = require('../services/compilerService');

exports.compileCode = async (req, res) => {
    const { exerciseId, language, code } = req.body;

    console.log(language);

    try {
        const exercise = await Exercise.findByPk(exerciseId);

        if (!exercise) {
            return res.status(404).json({ error: 'Exercise not found' });
        }

        const inputs = exercise.requiresInput ? await Input.findAll({
            where: { exerciseId: exerciseId }
        }) : [];

        const answers = await Answer.findAll({
            where: { exerciseId: exerciseId }
        });

        if (answers.length === 0) {
            return res.status(404).json({ error: 'Expected answers not found for the exercise' });
        }

        const codeType = exercise.codeType;
        const functionName = exercise.functionName || '';

        let results = [];

        if (exercise.requiresInput) {
            for (let i = 0; i < inputs.length; i++) {
                const input = inputs[i];
                const expectedAnswer = answers.find(answer => answer.inputId === input.id);

                if (expectedAnswer) {
                    const inputsData = input.input;
                    try {
                        const output = await compilerService.compileCode(language, code, inputsData, codeType, functionName);
                        const outputLines = output.trim().split('\n');

                        const isCorrect = outputLines.includes(expectedAnswer.answer.trim());
                        const outputLine = outputLines.find(line => line.trim() === expectedAnswer.answer.trim()) || "Not found in output";

                        results.push({
                            inputId: input.id,
                            expectedResult: expectedAnswer.answer.trim(),
                            isCorrect: isCorrect,
                            output: outputLine,
                            outputNew: output
                        });
                    } catch (compileError) {
                        return res.status(500).json({ error: 'Compilation failed', details: compileError });
                    }
                }
            }
        } else {
            const output = await compilerService.compileCode(language, code, '', codeType, functionName);
            const outputLines = output.trim().split('\n');

            results = answers.map(answer => {
                const isCorrect = outputLines.includes(answer.answer.trim());
                const outputLine = outputLines.find(line => line.trim() === answer.answer.trim()) || "Not found in output";

                return {
                    inputId: null,
                    expectedResult: answer.answer.trim(),
                    isCorrect: isCorrect,
                    output: outputLine,
                    outputNew: output
                };
            });
        }

        res.json({ results });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
};