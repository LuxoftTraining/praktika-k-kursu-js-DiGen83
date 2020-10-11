import { runUI, addEmployeeUI, openTab, searchEmployeeUI, clearUI, removeEmployeeUI} from './employees/ui';
import './style.css';

window.addEmployeeUI = addEmployeeUI;
window.removeEmployeeUI = removeEmployeeUI;
window.openTab = openTab;
window.searchEmployeeUI = searchEmployeeUI;
window.clearUI = clearUI;
window.addEventListener("load", runUI);
