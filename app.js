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
