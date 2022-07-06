import { useEffect, useState } from "react";
import client from "../../utils/client";
import StudentsPreviewListItem from "./StudentsPreviewListItem";

export default function SudentsPreviewList({ id, handleClick }) {
  const [studentList, setStudentList] = useState(null);

  useEffect(() => {
    client
      .get(`/users?cohort_id=${id}`)
      .then((res) => setStudentList(res.data.data.users));
  }, [id]);

  return (
    <ul>
      {studentList &&
        studentList.map((student) => (
          <StudentsPreviewListItem
            key={student.id}
            {...student}
            handleClick={handleClick}
          />
        ))}
      <li
        className="cohorts-preview__list-item"
        onClick={() => handleClick({ componentId: "cohorts" })}
      >
        <span>&#129144;</span>
        <span>Back</span>
      </li>
    </ul>
  );
}
