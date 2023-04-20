#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';


let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    'How well do you know me? \n'
  );

  await sleep();
  rainbowTitle.stop();

  console.log(`
    ${chalk.bgBlue('HOW TO PLAY')} 
    I am a process on your computer.
    If you get any question wrong I will be ${chalk.bgRed('killed')}
    So get all the questions right...

  `);
}

async function askName() {
    const answers = await inquirer.prompt({
      name: 'player_name',
      type: 'input',
      message: 'What is your name?',
      default() {
        return 'Player';
      },
    });
  
    playerName = answers.player_name;
  }


  async function question1() {
    const answers = await inquirer.prompt({
      name: 'question1',
      type: 'list',
      message: 'Whats my name?\n',
      choices: [
        'Andrea',
        'Alejandra',
        'Ximena',
      ],
    });
  
    return handleAnswer(answers.question1 === 'Alejandra');
  }

  async function question2() {
    const answers = await inquirer.prompt({
      name: 'question2',
      type: 'list',
      message: 'Whats my favorite color?\n',
      choices: [
        'Green',
        'Blue',
        'Purple',
        'The color of her eyes... u_u',
      ],
    });
  
    return handleAnswer(answers.question2 === 'Purple');
  }

  async function question3() {
    const answers = await inquirer.prompt({
      name: 'question3',
      type: 'list',
      message: 'Finish the song... IIIIIM HOOKED ON A ....\n',
      choices: [
        'Feeling',
        'Hook',
        'Rock',
      ],
    });
  
    return handleAnswer(answers.question3 === 'Feeling');
  }

  async function question4() {
    const answers = await inquirer.prompt({
      name: 'question4',
      type: 'list',
      message: 'Are you alone right now?\n',
      choices: [
        'Yes',
        'No',
      ],
    });
  
    return handleAnswer(answers.question4 === 'No');
  }

  async function question5() {
    const answers = await inquirer.prompt({
      name: 'question5',
      type: 'list',
      message: 'How are you feeling today?\n',
      choices: [
        'Good',
        'Bad',
      ],
    });
  
    return handleAnswer(answers.question5 === 'Good');
  }

  async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Checking answer...').start();
    await sleep();
  
    if (isCorrect) {
      spinner.success({ text: `Nice work ${playerName}. That's a legit answer` });
    } else {
      spinner.error({ text: `💀💀💀 Game over, you lose ${playerName}!` });
      process.exit(1);
    }
  }

  function winner() {
    console.clear();
    figlet(`Congrats , ${playerName} !`, (err, data) => {
      console.log(gradient.pastel.multiline(data) + '\n');

      console.log(
        chalk.green(
          `I owe you your favorite thing in the world`
        )
      );
  
      process.exit(0);
    });
  }

console.clear();
await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
winner();
