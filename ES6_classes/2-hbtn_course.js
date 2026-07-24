export default class HolbertonCourse {
  constructor(name, length, students) {
    if (typeof name !== 'string') {
      throw new TypeError('Name must be a string');
    }
    if (typeof length !== 'number') {
      throw new TypeError('Length must be a number');
    }
    if (!Array.isArray(students)) {
      throw new TypeError('Students must be an array');
    }

    this._name = name;
    this._length = length;
    this._students = students;
  }

  get name() {
    return this._name;
  }

  set name(newVal) {
    if (typeof newVal !== 'string') {
      throw new TypeError('Name must be a string');
    }
    this._name = newVal;
  }

  get length() {
    return this._length;
  }

  set length(newVal) {
    if (typeof newVal !== 'number') {
      throw new TypeError('Length must be a number');
    }
    this._length = newVal;
  }

  get students() {
    return this._students;
  }

  set students(newVal) {
    if (!Array.isArray(newVal)) {
      throw new TypeError('Students must be an array');
    }
    this._students = newVal;
  }
}
