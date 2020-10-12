

export class Person {

	constructor(name, surname) {
		this.name = name;
		this.surname = surname;
	}

	static fromJSON(obj) {
		return Object.assign(new Person(), obj)
	}

	readJSON(json) {
		Object.assign(this, json)
	}

	get fullName() {
		return this.name+" "+this.surname;
	}

	get age() {
		if (!this._dateOfBirth) return "";
		let ageDiff = Date.now() - this._dateOfBirth.getTime();
		let ageDate = new Date(ageDiff); // miliseconds from epoch
		function text(ageC) {
			let txt;
			let count = ageC % 100;
			if (count >= 5 && count <= 20) {
				txt = 'лет';
			} else {
				count = count % 10;
				if (count == 1) {
					txt = 'год';
				} else if (count >= 2 && count <= 4) {
					txt = 'года';
				} else {
					txt = 'лет';
				}
			}
			return ageC + " " + txt;
		}
		let getAge = ""
         if(Math.abs(ageDate.getUTCFullYear() - 1970)){getAge = text(Math.abs(ageDate.getUTCFullYear() - 1970))} else {getAge = "? лет"};


		return " <b>Возраст:</b> "+ getAge;
	}

	set dateOfBirth(date) {
		this._dateOfBirth = new Date(date);
	}

	get dateOfBirth() {
		return this._dateOfBirth?
			" <b>Дата рождения:</b> "+this.formatDate(this._dateOfBirth):
			"";
	}

	addPhone(phone) {
		const phones = this.phones;
		if (!phones) {
			this.phones = [];
		}
		this.phones.push(phone);
	}

	formatDate(date) {
		let day = date.getDate();
		if (day<10) day = '0'+day;
		let month = date.getMonth()+1;
		if (month<10) month = '0'+month;
		let year = date.getFullYear();

		return day + '.' + month + '.' + year;
	}

	toString() {
		const phones = this.phones?
			`Список телефонов: ${this.phones}`:'';
		return `
			${this.fullName} \
			${this.dateOfBirth} ${this.age} ${phones}`;
	}

}

