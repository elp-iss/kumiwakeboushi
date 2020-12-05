import { tail } from "ramda"
import { Student } from "../types"

const textArea = document.querySelector('#students') as HTMLTextAreaElement

export const exportStudentsEvent = () => {
  const textRaw = textArea.value.replace(/\r\n?/g, '\n')
  const csv = textRaw.split('\n')
  for (let i = csv.length; 1 < i; i--) {
    const k = Math.floor(Math.random() * i);
    [csv[k], csv[i - 1]] = [csv[i - 1], csv[k]];
  }
  const objs = csv.map(e => e.split(',')).map(e => {
    const name = e[0]
    const selection = tail(e)
    const student: Student = {
      name, selection
    }
    return student
  })
  return objs
}
