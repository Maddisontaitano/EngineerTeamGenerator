// requiring files
const Manager = require("./Develope/lib/Manager");
const Engineer = require("./Develope/lib/Engineer");
const Intern = require("./Develope/lib/Intern");
//requiring dependencies
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");


const render = require("./Develope/lib/htmlRenderer");
var teamMembers = [];

// first prompt to user 
var employeeTitle = [
    {
      type: "list",
      name: "role",
      message: "Please select the role of the employee:?",
      choices: [
        "Engineer",
        "Intern",
        "Manager",
        "Complete roster, no employees left to add.",
      ],
    },
  ];

// Array for Intern questions
var devInternQuest = [
    {
      type: "input",
      message: "Please enter intern\'s name:",
      name: "name",
    },
    {
      type: "input",
      message: "Please enter your intern\'s ID number:",
      name: "id",
    },
    {
      type: "input",
      message: "Please enter intern\'s email address:",
      name: "email",
    },
    {
      type: "input",
      message: "Please enter the school intern attends:",
      name: "school",
    },
  ];
  // Array for Engineer quesitons
  var devEngineerQuest = [
    {
      type: "input",
      message: "Please enter engineer\'s name:",
      name: "name",
    },
    {
      type: "input",
      message: "Please enter engineer\'s ID number:",
      name: "id",
    },
    {
      type: "input",
      message: "Please enter engineer\'s email address:",
      name: "email",
    },
    {
      type: "input",
      message: "Please enter engineer\'s GitHub username:",
      name: "github",
    },
  ];

// Array for Manager questions
  var devManagerQuest = [
    {
      type: "input",
      message: "Please enter manager\'s name:",
      name: "name",
    },
    {
      type: "input",
      message: "Please enter manager\'s ID number:",
      name: "id",
    },
    {
      type: "input",
      message: "Please enter manager\'s email address:",
      name: "email",
    },
    {
      type: "input",
      message: "Please enter manager\s office number:",
      name: "officeNumber",
    },
  ];
  
  generateTeam();
  
// funtion that gives the user the right questions for whichever job title they selected
  function generateTeam() {
    inquirer.prompt(employeeTitle)
      .then(function (response) {
        console.log(response);
        return response;
      })
      .then(function (response) {
// If user chooses Engineer, this will make sure that they are prompted with the right questions
        if (response.role === 'Engineer') {
          inquirer.prompt(devEngineerQuest).then((response) => {
            console.log(response);
  
            var newEngineer = new Engineer(
              response.name,
              response.id,
              response.email,
              response.github
            );
            teamMembers.push(newEngineer);
            console.log('A new engineer has been added to your team!');
            generateTeam();
          });
  
// If user chooses Manager, this will make sure that they are prompted with the right questions
    } else if (response.role === 'Manager') {
          inquirer.prompt(devManagerQuest).then((response) => {
            console.log(response);
  
            var newManager = new Manager(
              response.name,
              response.id,
              response.email,
              response.officeNumber
            );
            teamMembers.push(newManager);
            console.log('A new manager has been added to your team!');
            generateTeam();
          });
  
// If user chooses Intern, this will make sure that they are prompted with the right questions
    } else if (response.role === 'Intern') {
          inquirer.prompt(devInternQuest).then((response) => {
            console.log(response);
  
            var newIntern = new Intern(
              response.name,
              response.id,
              response.email,
              response.school
            );
            teamMembers.push(newIntern);
  
            console.log('A new intern has been added to your team!');
            generateTeam();
          });
  
          // function to write the html file
        } else {
          var main = render(teamMembers);
          fs.writeFile(outputPath, main, (err) => {
            if (err) throw err;
            console.log('Your new team has been generated in the team.html file!')
          });
        }
      });
  }