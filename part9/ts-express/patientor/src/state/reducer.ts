import { State } from "./state";
import { Diagnosis, Patient } from "../types";
import { Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type : "ADD_SENSITIVE_PATIENT";
      payload: Patient;
  }
  | {
      type: "SET_DIAGNOSES";
      payload: Diagnosis[];
  }
  |{
    type : "ADD_ENTRY";
    payload: {entry: Entry, id: string};
  };

export const addEntry = (entry: Entry, id:string): Action => {
  return({
    type: "ADD_ENTRY",
    payload: {entry, id}
  });
};

export const setPatientList = (patientList:Patient[]): Action => {
  return({
    type: "SET_PATIENT_LIST",
    payload: patientList
  });
};

export const addPatient = (patient: Patient): Action => {
  return({
    type: "ADD_PATIENT",
    payload: patient
  });
};

export const addSensitivePatient = (patient: Patient): Action => {
  return({
    type: "ADD_SENSITIVE_PATIENT",
    payload: patient
  });
};

export const setDiagnosisList = (diagnosisList: Diagnosis[]): Action => {
  return({
    type: "SET_DIAGNOSES",
    payload: diagnosisList
  });
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_SENSITIVE_PATIENT":
      return {
        ...state,
        patientsSensitive : {          
          ...state.patientsSensitive,
          [action.payload.id]: action.payload
        }
      };
    case  "SET_DIAGNOSES":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diag) => ({ ...memo, [diag.code]: diag }),
            {}
          ),
          ...state.diagnoses
        }
      };
    case "ADD_ENTRY":
      const targetPatient = state.patientsSensitive[action.payload.id];
      if(!targetPatient){
        throw new Error('unexpected error');
      }
      const entry = action.payload.entry;
      return {
        ...state,
        patientsSensitive: {
          ...state.patientsSensitive,
          [action.payload.id] : {...targetPatient, entries : [...targetPatient.entries, entry]}
        }
      };
    default:
      return state;
  }
};
