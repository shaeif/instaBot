const instagram = require('./instagram');
const inquirer = require('inquirer');
const {
    bulkUnfollow
} = require('./instagram');

var username = ''
var password = ''

inquirer
    .prompt([{
        type: 'input',
        message: 'Enter Username :',
        name: 'user',
    }, {
        type: 'password',
        message: 'Enter Password :',
        name: 'pass',
    }])
    .then(async output => {
        await instagram.initialize()
        username = output.user
        password = output.pass
        await instagram.login(username, password);
        option()
    })
option = async () => {
    inquirer
        .prompt([{
            type: 'list',
            message: 'Choose the option you would like to use',
            name: 'choice',
            choices: ["1.Like by Tag", "2.Follow by Tag", "3.Bulk unfollow", "SignOut"]
        }])
        .then(async choice => {
            switch (choice.choice.split(".")[0]) {
                case "1":
                    inquirer
                        .prompt([{
                            type: 'input',
                            message: "Enter the Tag ",
                            name: 'tag'
                        }, {
                            type: 'number',
                            message: "Enter the number of post to scroll through",
                            name: 'tnum'
                        }])
                        .then(async answers => {


                            await instagram.likeByTag(answers.tag, answers.tnum)
                            option()
                        })
                    break;
                case "2":
                    inquirer
                        .prompt([{
                            type: 'input',
                            message: "Enter the Tag ",
                            name: 'tag'
                        }, {
                            type: 'number',
                            message: "Enter the number of post to scroll through",
                            name: 'tnum'
                        }])
                        .then(async answers => {

                            await instagram.followByTag(answers.tag, answers.tnum)
                            option()
                        })
                    break;
                case "3":
                    inquirer
                        .prompt([{
                            type: 'number',
                            message: "Enter the number follower's to unfollow",
                            name: 'tnum'
                        }])
                        .then(async answers => {
                            await instagram.bulkUnfollow(username, answers.tnum)
                            option()
                        })
                    break;
                case "SignOut":
                    await instagram.browser.close()
                    break;
            }

        })
}