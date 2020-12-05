import { exportGroupingEvent } from "./groupingLogic"
import { rowAppendEvent } from "./subjectForm"

document.querySelector('#subjectAppend').addEventListener('click', rowAppendEvent)
document.querySelector('#run').addEventListener('click', exportGroupingEvent)
