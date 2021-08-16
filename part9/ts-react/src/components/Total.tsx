import React from 'react';

interface TotalProps {
    courseParts: {name: string,
                  exerciseCount: number}[]
}

const Total = ({courseParts}: TotalProps): JSX.Element => {
    return (
        <div>            
            Number of exercises{" "}
            {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </div>
    )
}

export default Total;