const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

async function repeat() {
	await inquirer
		.prompt({
			type: "confirm",
			name: "repeat",
			message: "Want to add another employee?",
			default: true,
		})
		.then(async (res) => {
			if (res.repeat) {
				await employee();
			} else {
				console.log("generating team page!");
			}
		});
}

async function employee() {
	await inquirer
		.prompt([
			{
				type: "list",
				name: "role",
				message: "What is your role?",
				choices: ["Manager", "Engineer", "Intern"],
			},
			{
				type: "input",
				name: "name",
				message: "What is your name?",
			},
			{
				type: "input",
				name: "email",
				message: "What is your email?",
			},
			{
				type: "input",
				name: "id",
				message: "What is your id?",
			},
		])
		.then(async (res) => {
			switch (res.role) {
				case "Manager":
					await inquirer
						.prompt({
							type: "input",
							name: "office",
							message: "What is your office number?",
						})
						.then((office) => {
							employees.push(
								new Manager(
									res.name,
									res.id,
									res.email,
									office.office
								)
							);
						});
					break;
			}
    });
    await repeat() 
}

async function init() {
  await employee().then(() => {
      const html = render(employees);
      if (!fs.existsSync(OUTPUT_DIR)) {
          fs.mkdirSync(OUTPUT_DIR);
      }
      fs.writeFileSync(outputPath, html, err => {
          if (err) throw err;
          console.log("file successfully written")
      })
  })
}
init();