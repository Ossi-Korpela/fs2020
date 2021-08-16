import axios from 'axios';
import React from 'react';

import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';
import { Patient, Gender, Entry } from '../types';

import { addEntry, addSensitivePatient } from '../state/reducer'; 

import { Icon, Header, Button } from "semantic-ui-react";
import OccupationalHealthcare from './OccupationalHealthCare';
import HealthCheck from './HealthCheck';
import Hospital from './Hospital';
import { EntryFormValues } from './EntryForm';
import AddEntryModal from './AddEntryModal';

interface Params {
    id:string
}

const PatientInfo = (props: Params) => {
    const {id} = props;
    const [{patientsSensitive, diagnoses}, dispatch] = useStateValue();

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();

    
    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const fetchPatientSensitive = async (id:string) => {
        try{
            const { data : patientSens } = await axios.get<Patient>(
                `${apiBaseUrl}/patients/${id}`
              );              
              dispatch(addSensitivePatient(patientSens));
        }
        catch(err){
            console.log(err);
        }
    };
    

    const submitNewEntry = async (values: EntryFormValues) => {
        try {
          console.log('new entry ', id, values);
          const { data: newEntry } = await axios.post<Entry>(
            `${apiBaseUrl}/patients/${id}/entries`,
            values
          );
          dispatch(addEntry(newEntry, id));
          closeModal();
        } catch (e) {
          console.error(e.response?.data || 'Unknown Error');
          setError(e.response?.data?.error || 'Unknown error');
        }
      };

    
    if(!patientsSensitive[id]){
        try{void fetchPatientSensitive(id);}
        catch(e){console.log(e);}
    }
    const selectedPatient = patientsSensitive[id];

    const getGenderIcon = (gender : Gender) => {
        switch (gender){
            case 'male':
                return <Icon name="venus"/>;
            case 'female':
                return <Icon name="mars"/>;
            default:
                return <Icon name="genderless"/>;
        }
    };

    const assertNever = (never: never) => {
        console.log(never);
        throw new Error('type check failed');
    };

    if(selectedPatient === undefined){
        return null;
    }

    return(
        <div>
            <Header>{selectedPatient.name}</Header>{getGenderIcon(selectedPatient.gender)}<br/>
            ssn: {selectedPatient.ssn}<br/>
            occupation: {selectedPatient.occupation}<br/>
            <div>
                <b>Entries</b>
                {selectedPatient.entries.map((entry: Entry)  => {
                    {switch(entry.type){
                        case "OccupationalHealthcare":
                            return(<OccupationalHealthcare key={entry.id} entry={entry} diagnoses={diagnoses} />);
                        case "Hospital":
                            return(<Hospital key={entry.id} entry={entry} diagnoses={diagnoses} />);
                        case "HealthCheck":
                            return(<HealthCheck key={entry.id} entry={entry} diagnoses={diagnoses} />);
                        default:
                            assertNever(entry); 
                    }}

                    
                }

                )}
                    <AddEntryModal 
                        modalOpen={modalOpen}
                        onSubmit={submitNewEntry}
                        error={error}
                        onClose={closeModal}/>   
                    <Button onClick={() => openModal()}>Add new entry</Button>                 
            </div>
        </div>
    );

};

export default PatientInfo;