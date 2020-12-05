import { Subject } from "../types"

const createRow = () => {
  const tr = document.createElement('tr')
  const nameCell = document.createElement('td')
  const limitCell = document.createElement('td')
  const createInput = () => {
    const input = document.createElement('input')
    input.type = 'text'
    return input
  }
  nameCell.appendChild(createInput())
  limitCell.appendChild(createInput())
  tr.appendChild(nameCell)
  tr.appendChild(limitCell)
  return tr
}

export const rowAppendEvent = () => {
  document.querySelector('#subjectTableBody').appendChild(createRow())
}

const extractText = (row: HTMLTableRowElement) => {
  const inputs = Array.from(row.querySelectorAll('input'))
  return inputs.map(e => e.value)
}

const textToSubjectObj = (text: string[]) => {
  const obj: Subject = {
    name: text[0],
    capacity: Number(text[1]),
    students: []
  }
  return obj
}

export const exportSubjectsEvent = () => {
  const rows = Array.from(document.querySelector('#subjectTableBody')
    .querySelectorAll('tr'))
    .map(extractText)
    .map(textToSubjectObj)
  return rows
}
