import { Diagnosis,  HealthCheckEntry } from '../types';
import React from 'react';
import { Segment, Icon, SemanticCOLORS } from 'semantic-ui-react';

interface HeathEntryProps{
    entry: HealthCheckEntry, 
    diagnoses: {[code: string] : Diagnosis}
}

const HealthCheck = ({entry, diagnoses} : HeathEntryProps ): JSX.Element => {
    let healthColor: SemanticCOLORS;
    switch(entry.healthCheckRating){
        case 0:
            healthColor = "green";
            break;
        case 1:
            healthColor = "yellow";
            break;
        case 2:
            healthColor = "orange";
            break;
        case 3:
            healthColor = "red";
            break;
        default:
            throw new Error('Bad Health Check Score value');
    }

    return (
        <Segment>
            <div key={entry.id}>
                        {entry.date} <Icon name="stethoscope"/><br/>
                        <i>{entry.description}</i>
                        <ul>
                            {entry.diagnosisCodes 
                                ? entry.diagnosisCodes.map((dCode: string) => <li key={entry.id+dCode}>{dCode} {diagnoses[dCode] ? diagnoses[dCode].name : null}</li>)
                                : null}
                        </ul>
                        
                        <Icon name="heart" color={healthColor}/>
            </div>
        </Segment>
    );
};

export default HealthCheck;