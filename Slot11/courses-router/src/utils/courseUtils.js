import { courses } from "../data/courses";

export function findCourse(code) {
  if (!code) {
    return undefined;
  }

  return courses.find(
    (course) => course.code.toLowerCase() === code.toLowerCase()
  );
}