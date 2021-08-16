import React, { useState } from "react";
import { Grid, Button, Form } from "semantic-ui-react";


import { Field, Formik } from "formik";

import { TextField,  DiagnosisSelection, NumberField } from "../AddPatientModal/FormField";
import { Diagnosis, Entry} from "../types";
import { useStateValue } from "../state";



/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
//eslint-disable-next-line
type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never;

export type EntryFormValues = DistributiveOmit<Entry, "id">;



interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

type typeOption = {
    value: string;
    label: string;
};

const typeOptions: typeOption[] = [
  { value: "OccupationalHealthcare", label: "Occupational healthcare entry" },
  { value: "Hospital", label: "Hospital entry" },
  { value: "HealthCheck", label: "Health check entry" }
];

type SelectFieldProps = {
    name: string;
    label: string;
    options: typeOption[];
  };

interface ButtonGridProps {
  onCancel: () => void;
  dirty : boolean;
  isValid: boolean;
}

const buttonGrid = ({onCancel, dirty, isValid} : ButtonGridProps) => {
  return(
    <Grid>
                <Grid.Column floated="left" width={5}>
                  <Button type="button" onClick={onCancel} color="red">
                    Cancel
                  </Button>
                </Grid.Column>
                <Grid.Column floated="right" width={5}>
                  <Button
                    type="submit"
                    floated="right"
                    color="green"
                    disabled={!dirty || !isValid}
                  >
                    Add
                  </Button>
                </Grid.Column>
          </Grid>
  );
};

interface DefaultFieldProps {
  setFieldTouched: (field: string, isTouched?: boolean | undefined, shouldValidate?: boolean | undefined) => void;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void; //eslint-disable-line
  diagnoses: {[code: string] : Diagnosis};
  SelectField: any; //eslint-disable-line
}

const defaultFields = ({setFieldTouched, setFieldValue, diagnoses, SelectField}: DefaultFieldProps) => {
  return (
    <>
      <SelectField
        label="Entry type"
        name="type"
        options={typeOptions}
      />
      <Field
        label="Description"
        placeholder="a short description"
        name="description"
        component={TextField}
      />
      <Field
        label="Date"
        placeholder="YYYY-MM-DD"
        name="date"
        component={TextField}
      />
      <Field
        label="Specialist"
        placeholder="specialist"
        name="specialist"
        component={TextField}
      />           
      
      <DiagnosisSelection
      setFieldValue={setFieldValue}
      setFieldTouched={setFieldTouched}
      diagnoses={Object.values(diagnoses)}
    /> 
    </>
  );
};

interface TypeDependantFieldProps {
  entryType: string;
  setFieldValue : (field: string, value: any, shouldValidate?: boolean | undefined) => void; //eslint-disable-line
}


export const EntryForm = ({ onSubmit, onCancel } : Props ) => {
   const [{ diagnoses }] = useStateValue();
   const [entryType, setEntryType] = useState("Hospital");

   const typeDependentFields = ({entryType, setFieldValue}: TypeDependantFieldProps) => {
    switch(entryType){
      case "Hospital":
        return(<div>
          <i>discharge</i>
          <Field
              label="Discharge date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            />
          <Field 
            label="Criteria"
            placeholder="Criteria for discharge"
            name="discharge.criteria"
            component={TextField}
          />
        </div>);
      case "HealthCheck":
        return(
          <div>
            <Field
              label="health check rating"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
              onChange={(v: number) => {setFieldValue('healthCheckRating', v);}}
          />
        </div>
        );
      case "OccupationalHealthcare":
        return(<div>
          <Field
              label="Employer name"
              placeholder="employer name"
              name="employerName"
              component={TextField}
            />
          <i>sick leave</i>
          <Field
              label="start date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            />
          <Field
            label="end date"
            placeholder="YYYY-MM-DD"
            name="sickLeave.endDate"
            component={TextField}
          />

        </div>);
        default:
          return null;
    }
  };

   const SelectField = ({
    name,
    label,
    options
  }: SelectFieldProps) => (
    <Form.Field>
      <label>{label}</label>
      <Field as="select" name={name} className="ui dropdown">
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label || option.value}
          </option>
        ))}
      </Field>
    </Form.Field>
  );
   
  switch(entryType){
    case "OccupationalHealthcare" :{
      return (
        <Formik
          initialValues={{
                description: "",        
                type: "OccupationalHealthcare",
                date: "",
                specialist: "",          
                diagnosisCodes: [],
                employerName: "",
                sickLeave: {
                  startDate : "",
                  endDate: ""
                }
            }}
          onSubmit={onSubmit}
          validate={values => {
            const requiredError = "Field is required";
            const errors: { [field: string]: string } = {};
            
            if (!values.type) {
              errors.type = requiredError;
            }
            else{
              if(values.type !== entryType){
                setEntryType(values.type);
                return;
              }              
            }
            
    
            if (!values.date) {
              errors.date = requiredError;
            }
            else{
              if(!Date.parse(values.date)){
                errors.date = "Incorrectly formatted date";
              }
            }
    
            if (!values.description) {
              errors.description = requiredError;
            }
            else if(values.description.length < 5){
              errors.description = "Description must be over 5 characters long";
            }
    
    
            if (!values.specialist) {
              errors.specialist = requiredError;
            }
            if(!values.sickLeave){
              errors.sickLeave = "sick leave missing";
            }
            else{
              if(!Date.parse(values.sickLeave.startDate)){
                errors.startDate = "sick leave start date incorrectly formatted";
              }
              if(!Date.parse(values.sickLeave.endDate)){
                errors.endDate = "sick leave end date incorrectly formatted";
              }
            }
            
            return errors;
          }}
        >
    
          {({ isValid, dirty, setFieldTouched, setFieldValue, handleSubmit }) => {
            return (
              <Form className="form ui" onSubmit={handleSubmit} >
                  {defaultFields({setFieldTouched, setFieldValue, diagnoses, SelectField})}   
                  {typeDependentFields({entryType, setFieldValue})}
                  {buttonGrid({onCancel, dirty, isValid})}
              </Form>
            );
          }}
        </Formik>
      );
    }
    case "Hospital" :{
      return (
        <Formik
          initialValues={{
                description: "",        
                type: "Hospital",
                date: "",
                specialist: "",          
                diagnosisCodes: [],
                discharge : {
                  date : "",
                  criteria: ""
                }
            }}
          onSubmit={onSubmit}
          validate={values => {
            const requiredError = "Field is required";
            const errors: { [field: string]: string } = {};
            
            if (!values.type) {
              errors.type = requiredError;
            }
            else{
              if(values.type !== entryType){
                setEntryType(values.type);
                return;
              }              
            }
            
    
            if (!values.date) {
              errors.date = requiredError;
            }
            else{
              if(!Date.parse(values.date)){
                errors.date = "Incorrectly formatted date";
              }
            }
    
            if (!values.description) {
              errors.description = requiredError;
            }
            else if(values.description.length < 5){
              errors.description = "Description must be over 5 characters long";
            }  
    
            if (!values.specialist) {
              errors.specialist = requiredError;
            }
            if(!values.discharge){
              errors.discharge = requiredError;
            }
            else{
              if(!Date.parse(values.discharge.date)){
                errors.discharge = "Incorrectly formatted date";
              }
              if(!values.discharge.criteria){
                errors.criteria = requiredError;
              }
            }
                    
            
            
            return errors;
          }}
        >
    
          {({ isValid, dirty, setFieldTouched, setFieldValue, handleSubmit }) => {
            return (
              <Form className="form ui" onSubmit={handleSubmit} >
                  
              {defaultFields({setFieldTouched, setFieldValue, diagnoses, SelectField})}   
              {typeDependentFields({entryType, setFieldValue})}
              {buttonGrid({onCancel, dirty, isValid})}
                
              </Form>
            );
          }}
        </Formik>
      );
    }
    case "HealthCheck": {
      return (
        <Formik
          initialValues={{
                description: "",        
                type: "HealthCheck",
                date: "",
                specialist: "",          
                diagnosisCodes: [],
                healthCheckRating: 2
            }}
          onSubmit={onSubmit}
          validate={values => {
            const requiredError = "Field is required";
            const errors: { [field: string]: string } = {};
            
            if (!values.type) {
              errors.type = requiredError;
            }
            else{
              if(values.type !== entryType){
                setEntryType(values.type);
                return;
              }              
            }
            
    
            if (!values.date) {
              errors.date = requiredError;
            }
            else{
              if(!Date.parse(values.date)){
                errors.date = "Incorrectly formatted date";
              }
            }
    
            if (!values.description) {
              errors.description = requiredError;
            }
            else if(values.description.length < 5){
              errors.description = "Description must be over 5 characters long";
            }  
    
            if (!values.specialist) {
              errors.specialist = requiredError;
            }
  
            
            
            return errors;
          }}
        >
    
          {({ isValid, dirty, setFieldTouched, setFieldValue, handleSubmit }) => {
            return (
              <Form className="form ui" onSubmit={handleSubmit} >
                 {defaultFields({setFieldTouched, setFieldValue, diagnoses, SelectField})}   
                {typeDependentFields({entryType, setFieldValue})}
                {buttonGrid({onCancel, dirty, isValid})}
              </Form>
            );
          }}
        </Formik>
      );
    }
    default:
      return null;

  }
  
  
  
};

export default EntryForm;