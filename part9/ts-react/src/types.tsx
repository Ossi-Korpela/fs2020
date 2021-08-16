
interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
  }

  interface PartWithDescription extends CoursePartBase {
    description: string;
  }
  
  interface CourseNormalPart extends PartWithDescription {
    type: "normal";
  }
  interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
  }
  
  interface CourseSubmissionPart extends PartWithDescription {
    type: "submission";
    exerciseSubmissionLink: string;
  }
  
  
  type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart;

export default CoursePart;