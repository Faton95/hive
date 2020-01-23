import renderMonthElement from './renderMonthElement'
import renderCalendarDay from './renderCalendarDay'
import { navNext, navPrev } from './navigations'
import { customCloseIcon, customInputIcon } from './customIcons'
import displayFormat from './displayFormat'

export default {
  // input related props
  block: true,
  noBorder: true,
  customInputIcon,
  customCloseIcon,
  // calendar presentation and interaction related props
  daySize: 36,
  renderMonthElement,
  hideKeyboardShortcutsPanel: true,
  // day presentation and interaction related props
  renderCalendarDay,
  // navigation related props
  navPrev,
  navNext,

  // internationalization props
  displayFormat,
  monthFormat: 'MMMM YYYY'
}
