// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("../lib/Employee.js");

class Engineer extends Employee {
    constructor(name, email, github, id) {
        super(name, id, email, github);
        this.github = github;
    };

    getGithub() {
        return(this.github);
    };

    getRole() {
        return 'Engineer';
    }
};

module.exports = Engineer;