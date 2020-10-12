import DATA from './employees-json';
import {Employee,jsonToEmployees} from "./model/Employee";

const PLACEHOLDER = 'employeesPlaceholder'

function clearEmployeesPlaceholder() {
    if(document.getElementById(PLACEHOLDER)){
        document.getElementById(PLACEHOLDER).innerHTML = '';
    }

}

export function findByName(name, surname) {
    let res = [];
    for (let e of DATA.employees) {
        if ((!name || e.name===name) &&
            (!surname || e.surname===surname)) {
            res.push(e);
        }
    }
    return res;
}

export function addEmployee(name, surname, dateOfBirth) {
    if (!name || name.length==0 || !surname || surname.length==0 || !dateOfBirth || dateOfBirth.length==0) {
        throw new Error("name, surname and age should be not empty");
    }
    let max = 0;
    for (let e of DATA.employees) {
        if (e.id>max) max = e.id;
    }
    let id = max+1;
    DATA.employees.push({id,name,surname,dateOfBirth});
    return id;
}

export function removeEmployee(id) {
    let index = 0;
    for (let e of DATA.employees) {
        if (e.id===id) break;
        index++;
    }
    DATA.employees.splice(index, 1);
}

function showEmployee(employee) {
    const keys = Object.keys(employee);
    console.log("Информация о сотруднике "+employee["name"]+":");
    for (let key of keys) {
        console.log(key+ " = "+employee[key]);

    }
}

/*
function showEmployees() {
    DATA.employees.forEach(showEmployee);
}
*/





export function showEmployees(employees) {
    clearEmployeesPlaceholder();
    const ul = document.createElement("ul");

    for (let employee of jsonToEmployees(employees)) {
        const li = document.createElement("li");
        li.innerHTML = employee;
        ul.appendChild(li);  

        const removeButton = document.createElement("button");
        removeButton.innerHTML = "Удалить";
        removeButton.addEventListener('click',
            () => removeEmployeeUI(employee.id));
        li.appendChild(removeButton);



        if (employee.managerRef) {
            let manager = findById(employee.managerRef);
            const managerSpan = document.createElement("span");
            const managerSelect = document.createElement("select");
            fillSelect(managerSelect, getEmployeesOptions(), 	employee.managerRef);
            managerSelect.addEventListener('change',
                () => employee.managerRef=managerSelect.value);
            managerSpan.innerHTML = " <b>Руководитель:</b> ";
            li.appendChild(managerSpan);
            li.appendChild(managerSelect);
        }

    }
    document.getElementById(PLACEHOLDER).appendChild(ul);
    DATA.employees.forEach(showEmployee);
}

/*
function findById(id) {
    for (var e of DATA.employees) {
        if (id==e.id) {
            return e;
        }
    }
}
*/

const employeeMap = {};

export function findById(id) {
    if (employeeMap[id]) {
        return employeeMap[id];
    }
    for (var e of DATA.employees) {
        if (id==e.id) {
            employeeMap[id] = e;
            return e;
        }
    }
}

function addPhone(id, phone) {
    const employee = findById(id);
    const phones = employee.phones;
    if (!phones) {
        employee.phones = [];
    }
    employee.phones.push(phone);
}


export function setDateOfBirth(id, date) {
    const employee = findById(id);
    employee.dateOfBirth = date;
}


function getAge(id) {
    const employee = findById(id);
    let ageDiff = Date.now() - employee.dateOfBirth.getTime();
    let ageDate = new Date(ageDiff); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function formatDate(date) {
    let day = date.getDate();
    if (day<10) day = '0'+day;
    let month = date.getMonth()+1;
    if (month<10) month = '0'+month;
    let year = date.getFullYear();

    return day + '.' + month + '.' + year;
}


function getEmployeeInfo(id) {
    const e = findById(id);

    const phones = e.phones?
        `Список телефонов: ${e.phones}`:'';
    const age = e.dateOfBirth?
        `Возраст: ${getAge(e.id)}`:'';
    return ` 
  Имя: ${e.name}
  Фамилия: ${e.surname}
  Дата рождения: ${formatDate(e.dateOfBirth)}
  ${phones} 
  ${age}
 `;
}


function testEmployee() {
    addPhone(133, "555-55-55");
    addPhone(133, "666-66-66");
    setDateOfBirth(133, new Date(2000,1,1))
    const info = getEmployeeInfo(133);
    console.log(info);
}


function getEmployeeJSON(id) {
    const e = findById(id);
    return JSON.stringify(e);
}

export function fillSelect(select, values, selectedValue) {
    for (let val of values) {
        const option = document.createElement("option");
        option.text = val.text;
        option.value = val.value;
        if (selectedValue==option.value) option.selected=true;
        select.appendChild(option);
    }
}

export function getEmployeesOptions() {
    let options = [];
    for (let e of DATA.employees) {
        options.push({text:e.name+' '+e.surname, value:e.id});
    }
    return options;
}

export function setEmployeeManager(id, managerId) {
    const employee = findById(id);
    employee.managerRef = managerId;
}

export function searchEmployees(name, surname, managerRef) {
    let results = [];
    for (let e of DATA.employees) {
        if ((!name || e.name==name) &&
            (!surname || e.surname==surname) &&
            (!managerRef || e.managerRef==managerRef)) {
            results.push(e);
        }
    }
    return results;
}

export function assignSendOnEnter(paneId, buttonId) {
    let allInput = document.querySelectorAll("#"+paneId+" input");
    for (let input of allInput) {
        input.addEventListener("keyup", function(event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                document.querySelector("#"+paneId+" button").click();
            }
        });
    }
}


export function getEmployees() { return DATA.employees }



