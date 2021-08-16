
interface exerciseResults {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercises = (trainingData : number[], target: number) : exerciseResults => {
    const pLength: number = trainingData.length;
    let tDays = 0;
    let total = 0;
    trainingData.forEach(dailyExercise => {
        if(dailyExercise !== 0){
            tDays += 1;
        }
        total += dailyExercise;
    });   
    const average:number = total / pLength;
    const succes:boolean = average >= target;
    let rating = NaN;
    const ratingTreshold = 0.5;
    if(average - target < -ratingTreshold){
        rating = 1;
    }
    else if(average - target < ratingTreshold){
        rating = 2;
    }
    else {
        rating = 3;
    }
    
    let ratingDesc = '';
    switch(rating){
        case 1:
            ratingDesc = 'Stop being lazy';
            break;
        case 2:
            ratingDesc = 'not too bad but could be better';
            break;
        case 3:
            ratingDesc = 'target demolished - good job';
            break;
        default: 
            ratingDesc = 'somthing went wrong ):';
            break;
    }
    return {
        periodLength : pLength,
        trainingDays : tDays,
        success : succes,
        rating : rating,
        ratingDescription: ratingDesc,
        target : target,
        average: average
    };

}; 

const parseArguments = (args: Array<string>): exerciseResults => {
    if(args.length < 4){
        throw new Error('Not enough args');
    }

    for(let i = 2; i < args.length; i++){
        if(isNaN(Number(args[i]))){
            throw new Error('Provided values were not numbers!');
        }
    }
    const target = Number(args[2]);
    let dailyExerciseHours: number[] = [];
    for(let i = 3; i < args.length; i++){
        dailyExerciseHours = dailyExerciseHours.concat(Number(args[i]));
    }
    return calculateExercises(dailyExerciseHours, target);
    
};

export default calculateExercises;

console.log(parseArguments(["2","3","4","3","2","2","3","4","4","5"]));