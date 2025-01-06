import ICourseClass from "@/interfaces/CourseClass"

interface ClassListProps {
    classes: ICourseClass[]
  }
  
  export const ClassList: React.FC<ClassListProps> = ({ classes }) => {
    if (classes.length === 0) {
      return <p>No classes associated with this user.</p>
    }
  
    return (
      <div>
        <h3 className="text-lg font-semibold mb-2">Associated Classes:</h3>
        <ul className="list-disc pl-5">
          {classes.map((classItem) => (
            <li key={classItem.id}>{classItem.name}</li>
          ))}
        </ul>
      </div>
    )
  }
  