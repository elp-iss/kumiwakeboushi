export type Student = {
  name: string,
  selection: string[],
}

export type Subject = {
  name: string,
  capacity: number,
  students: string[],
}

export type Data = {
  students: Student[],
  subjects: Subject[],
}
