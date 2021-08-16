import patients from '../../data/patients';
import { NonSensitivePatientEntry, NewPatientEntry, Gender, PatientEntry, Entry } from '../types';
import { v1 as uuid } from 'uuid';


const getNonSensitivePatientEntries = (): NonSensitivePatientEntry [] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
        id: id,
        name: name,
        dateOfBirth: dateOfBirth,
        gender: gender,
        occupation: occupation
    }));
};

type Fields = { name: unknown, gender: unknown, ssn: unknown, dateOfBirth: unknown, occupation: unknown};

const toNewPatientEntry = (object: Fields) : NewPatientEntry => {
    const newEntry: NewPatientEntry = {
        name: parseName(object.name),
        gender: parseGender(object.gender),
        ssn: parseSsn(object.ssn),
        dateOfBirth: parseDate(object.dateOfBirth),
        occupation: parseOccupation(object.occupation),
        entries: []
    };
    return newEntry;
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseName = (text: unknown): string => {
    if(!text || !isString(text)){
        throw new Error('Incorrect or missing name');
    }
    return text;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if(!gender || !isGender(gender)){
        throw new Error('Incorrect or missing gender: '+ gender);
    }
    return gender;
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !birthdayIsDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};  
const birthdayIsDate = (date: string): boolean => {
    return Boolean(Date.parse(date)); 
  
};


const parseSsn = (ssn: unknown): string => {
    if(!ssn || !isString(ssn)){
        throw new Error('Incorrect or missing ssn');
    }
    return ssn;
};

const parseOccupation = (occupation: unknown) : string => {
    if(!occupation || !isString(occupation)){
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addPatientEntry = (newPatientObject : any): NewPatientEntry => {
    const newPatient = toNewPatientEntry(newPatientObject);
    const id:string = uuid(); //eslint-disable-line   
    const newPatientEntry:PatientEntry = {...newPatient, id: id};

    patients.push(newPatientEntry);
    return newPatientEntry;
};

const getPatientById = (id:string): PatientEntry | undefined => {
    const patient = patients.find(p => p.id === id);
    if(!patient){
        return undefined;
    }
    return patient;
};

//eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateEntry = (entryObj: any):Entry => {
    if(!entryObj.type){ throw new Error('Type missing from entry'); }
    if(!entryObj.description){ throw new Error('Description missing from entry'); }
    if(!entryObj.date){ throw new Error('Date missing from entry'); }
    if(!entryObj.specialist){ throw new Error('Specialist missing from entry'); }

    switch(entryObj.type){
        case "Hospital":
            if(!entryObj.discharge){ throw new Error('discharge missing from entry'); }
            if(!entryObj.discharge.date){ throw new Error('malformatted discharge-field in entry'); }
            if(!entryObj.discharge.criteria){ throw new Error('malformatted discharge-field in entry'); }
            break;
        case "HealthCheck":
            if(!entryObj.healthCheckRating){ throw new Error('Health check rating missing from entry'); }
            break;
        case "OccupationalHealthcare":
            if(entryObj.sickLeave){
                if(!entryObj.sickLeave.startDate){ throw new Error('malformatted sick leave-field in entry'); }
                if(!entryObj.sickLeave.endDate){ throw new Error('malformatted sick leave-field in entry'); }
            }
            break;
        default:
            console.log(entryObj);
            throw new Error('Unsupported entry type'); 
    }
    const entry = {...entryObj, id: uuid()} as Entry;
    return (entry);
    
};

interface EntryProps{
    id: string, 
    entryObj: unknown
}

const addEntry = ({id, entryObj}: EntryProps): Entry => {
    const patient = getPatientById(id);
    if(patient === undefined){
        throw new Error("Couldn't find a patient with a matching id");        
    }
    const newEntry = validateEntry(entryObj);
    patient.entries.push(newEntry);
    return newEntry;
};

export default {
    addEntry,
    getPatientById,
    getNonSensitivePatientEntries,
    addPatientEntry
};