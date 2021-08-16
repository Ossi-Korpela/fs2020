import React from 'react';
import CoursePart from '../types';

interface PartProps{
    part : CoursePart
}

const Part = ({part}: PartProps): JSX.Element => {
    const assertNever = (value: never): never => {
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
      };

    switch(part.type){
        case 'normal':
            return(<div>
                <b>{part.name} {part.exerciseCount}</b><br/>
                <i>{part.description}</i>
            </div>);
        case 'groupProject':
            return(<div>
                <b>{part.name} {part.exerciseCount}</b><br/>
                project exercises: {part.groupProjectCount}
            </div>)
        case 'submission':
            return(<div>
                <b>{part.name} {part.exerciseCount}</b><br/>
                submit to {part.exerciseSubmissionLink}
            </div>)
        default:
            return assertNever(part);

    }
};

export default Part;