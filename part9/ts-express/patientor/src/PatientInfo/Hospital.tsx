import { Diagnosis, Entry } from '../types';
import React from 'react';
import { Icon, Segment } from 'semantic-ui-react';

interface HeathEntryProps{
    entry: Entry, 
    diagnoses: {[code: string] : Diagnosis}
}

const Hospital = ({entry, diagnoses} : HeathEntryProps): JSX.Element => {
    
    return (
        <Segment>
            <div key={entry.id}>
                        {entry.date} <Icon name="hospital" /><br/>
                        <i>{entry.description}</i>
                        <ul>
                            {entry.diagnosisCodes 
                                ? entry.diagnosisCodes.map((dCode: string) => <li key={entry.id+dCode}>{dCode} {diagnoses[dCode] ? diagnoses[dCode].name : null}</li>)
                                : null}
                        </ul>
                        
            </div>
        </Segment>
    );
};

export default Hospital;