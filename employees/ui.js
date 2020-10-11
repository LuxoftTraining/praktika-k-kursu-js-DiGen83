import { getEmployees, removeEmployee, addEmployee,
    findById, searchEmployees, setEmployeeManager, fillSelect,
     assignSendOnEnter, showEmployees, getEmployeesOptions, findByName, setDateOfBirth} from './service';







export function runUI() {
    showEmployees(getEmployees());
    fillSelect(document.getElementById("managerSelect"), getEmployeesOptions());
    fillSelect(document.getElementById("managerSearch"), getEmployeesOptions());
    document.getElementById("searchButton").click();
    assignSendOnEnter("searchPane","searchEmployeesButton");
    assignSendOnEnter("addPane", "addEmployeeButton");
}

export function clearUI() {
    showEmployees(getEmployees());
    document.getElementById("searchButton").click();
}


export function addEmployeeUI() {
    let errorHTML = "";
    const name = document.getElementById("name").value;

    if (name=="") {
        errorHTML += "- Имя сотрудника должно быть задано<br>";
        document.getElementById("name").style.backgroundColor = '#FFEEEE';
    }
    const surname = document.getElementById("surname").value;
    if (surname=="") {
        errorHTML += "- Фамилия сотрудника должна быть задана<br>";
        document.getElementById("surname").style.backgroundColor = '#FFEEEE';
    }

    const age = document.getElementById("age").value;
    if (age=="") {
        errorHTML += "- Возраст сотрудника должн быть задан<br>";
        document.getElementById("age").style.backgroundColor = '#FFEEEE';
    }

    const id =addEmployee(name, surname, age);
    //const idE = findByName(name, surname);
    const managerId = document.getElementById("managerSelect").value;
    setEmployeeManager(id, managerId);
    
    showEmployees(getEmployees());
    document.getElementById("name").value = "";
    document.getElementById("surname").value = "";
    document.getElementById("age").value = "";
}

export function removeEmployeeUI(id) {
    removeEmployee(id);
    showEmployees(getEmployees());
}

export function searchEmployeeUI() {
    const name = document.getElementById("nameSearch").value;
    const surname = document.getElementById("surnameSearch").value;
    const managerRef = document.getElementById("managerSearch").value;

    const employees  = searchEmployees(name, surname, managerRef);
    showEmployees(employees);
}

/**
 * Активирует выбранный таб
 * @param evt событие, вызывающее активацию
 * @param id идентификатор таба
 */
export function openTab(evt, id) {
    // Определяем переменные
    var i, tabcontent, tablinks;

    // Получаем все элементы с class="tabcontent" и прячем их
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Получаем все элементы с class="tablinks" и удаляем класс "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Показываем текущий таб и добавляем класс "active"
    // на кнопку, которая открывает этот таб
    document.getElementById(id).style.display = "block";
    evt.currentTarget.className += " active";
}
