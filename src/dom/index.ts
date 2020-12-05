import { Data } from "../types"

export const showData = (data: Data) => {
  console.log(data.students)
  data.subjects.forEach(e => {
    console.log(e.name)
    e.students.forEach(h => console.log(h))
  })
}

export const dataToDom = (area: Element) => (data: Data) => {
  const createTable = () => document.createElement('table')
  const createRow = (isHeader: boolean) => (text: string) => {
    const row = document.createElement('tr')
    const cell = document.createElement(isHeader ? 'th' : 'td')
    const _text = document.createTextNode(text)
    cell.appendChild(_text)
    row.appendChild(cell)
    return row
  }
  const createHeader = createRow(true)
  const createBodyRow = createRow(false)

  if (data.students.length > 0) {
    console.log(data.students)
    const table = createTable()
    const header = createHeader('組分けできなかった生徒')
    const cannotGroupingStudents = data.students.map(e => {
      const row = createBodyRow(e.name)
      return row
    })
    table.appendChild(header)
    cannotGroupingStudents.forEach(e => table.appendChild(e))
    area.appendChild(table)
  }

  const tables = data.subjects.map(subject => {
    const table = createTable()
    const header = createHeader(subject.name)
    const bodyRows = subject.students.map(createBodyRow)
    table.appendChild(header)
    bodyRows.forEach(e => table.appendChild(e))
    return table
  })
  tables.forEach(e => area.appendChild(e))
}
