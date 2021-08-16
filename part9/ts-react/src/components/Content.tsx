import React from 'react';
import Part from './Part';
import CoursePart from '../types';

interface ContentProps{
    courseParts: CoursePart[];
}

const Content = ({courseParts}: ContentProps): JSX.Element => {
    return(
    <div>
        {courseParts.map(singlePart =><div key={Math.random()*10000}> <Part part={singlePart}/> </div>)} 
    </div>
    );
}

export default Content;