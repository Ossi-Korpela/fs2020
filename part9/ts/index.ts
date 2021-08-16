
import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello fullstack!');
});

app.get('/bmi', (req, res) => {
    if(isNaN(Number(req.query.height)) || isNaN(Number(req.query.weight))){
        res.send({
            error: 'malformatted parameters'
        });
        return;
    }
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    res.send({
        weight: weight,
        height: height,
        bmi: calculateBmi(height, weight)
    });
});

app.post('/exercises', (req, res) => {
    if(!req.body){
        res.status(400).send({
            error: 'missing request body'
        });        
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const exercises:any = req.body.daily_exercises;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const target:any = req.body.target;
    if(!exercises || !target){
        res.status(400).send({
            error: 'parameters missing'
        });
        return;
    }
    if(!exercises[0]){
        res.status(400).send({
            error: "malformatted parameters"
        });
    }
// eslint-disable-next-line @typescript-eslint/no-explicit-any   
    exercises.forEach((day: any) => { 
        if(isNaN(Number(day))){
            res.status(400).send({
                error: "malformatted parameters"
            });
        }
    });
    if(isNaN(Number(target))){
        res.status(400).send({
            error: "malformatted parameters"
        });
    }
    const exerciseResults = calculateExercises(exercises, target);
    res.status(200).json(exerciseResults);


});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
