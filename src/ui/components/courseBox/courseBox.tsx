interface CourseBoxProps {
  courseTag: string
  courseNum: string
  prof: string
  days: string
  start: string
  end: string
}

export const CourseBox: React.FC<CourseBoxProps> = ({
  courseTag,
  courseNum,
  prof,
  days,
  start,
  end
}) => {
  return (
    <div className="course-container">
      <CourseIcon courseTag={courseTag} />
      <div className="info">
        <h3>
          {courseTag} {courseNum}
        </h3>
        <h4>{prof}</h4>
      </div>
      <div className="time">
        <p>{days}</p>
        <p>Start: {start}</p>
        <p>End: {end}</p>
      </div>
    </div>
  )
}

interface CourseIconProps {
  courseTag: string
}

const CourseIcon: React.FC<CourseIconProps> = ({ courseTag }) => {
  if (courseTag === "CSCI") {
    return (
      <div className="icon viterbi">
        <i className="bx bx-code-alt"></i>
      </div>
    )
  }
}
