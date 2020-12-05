import { Student, Subject, Data } from "./types"
import { compose, map, set, lensProp, concat, range } from "ramda"
import { exportStudentsEvent } from "./studentForm"
import { exportSubjectsEvent } from "./subjectForm"
import { dataToDom } from "./dom"

const findSubject = (name: string) => (subjects: Subject[]) => subjects.find(e => e.name === name)
const extractJoinStudents = (subjectName: string) => (choice: number) => (students: Student[]) => students.filter(e => e.selection[choice - 1] === subjectName)
const cutoutStudentsOverCapacity = (capacity: number) => (joinStudents: Student[]) => joinStudents.filter((_, i) => i +  1 <= capacity)
const removeJoinedStudents = (students: Student[]) => (studentsJoin: string[]) => students.filter(e => !studentsJoin.some(d => d === e.name))
const setStudentsToSubject = (studentsJoin: string[]) => (subject: Subject) => set(lensProp('students'), concat(studentsJoin, subject.students), subject)

const _markDefeatedStudent = (subjectName: string) => (choice: number) => (students: Student[]) => 
  students.map(e => e.selection[choice - 1] !== subjectName ? e : set(lensProp('name'),  e.name + '*', e))

const grouping = (subjectName: string) => (choice: number) => (data: Data): Data => {
  const subject = findSubject(subjectName)(data.subjects) 
  const capacity = subject.capacity - subject.students.length
  const studentsJoin = compose(
    map(e => e.name),
    cutoutStudentsOverCapacity(capacity),
    extractJoinStudents(subjectName)(choice),
  )(data.students)

  const markDefeatedStudent = _markDefeatedStudent(subjectName)(choice)

  const studentsRemain = compose(
    markDefeatedStudent,
    removeJoinedStudents(data.students)
  )(studentsJoin)

  const retSubjects = data.subjects
    .map(e => e.name !== subjectName ? e : setStudentsToSubject(studentsJoin)(e))

  return { students: studentsRemain, subjects: retSubjects }
}

export const exportGroupingEvent = () => {
  const resultArea = document.querySelector('#resultArea')
  resultArea.textContent = null

  const students = exportStudentsEvent()
  const subjects = exportSubjectsEvent()

  type Select = (choice: number) => (data: Data) => Data
  const selects = subjects.map(e => e.name).map(e => grouping(e))
  const ApplyOrderToSelect = (order: number) => (select: Select) => select(order)
  const order = range(1, subjects.length + 1)
    .map(e => selects.map(ApplyOrderToSelect(e)))
    .flat()
  const data = { students, subjects }
  const grouping_ = order.reduce((acc, current) => compose(current, acc))

  dataToDom(resultArea)(grouping_(data))
}
