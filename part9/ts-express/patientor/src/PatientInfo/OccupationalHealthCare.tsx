import { Diagnosis, Entry } from '../types';
import React from 'react';
import { Segment, Icon } from 'semantic-ui-react';

interface HeathEntryProps{
    entry: Entry, 
    diagnoses: {[code: string] : Diagnosis}
}

const OccupationalHealthcare = ({entry, diagnoses} : HeathEntryProps): JSX.Element => {
    return (
        <Segment>
            <div key={entry.id}>
                        {entry.date}  <Icon name="user md"/><br/>
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

export default OccupationalHealthcare;