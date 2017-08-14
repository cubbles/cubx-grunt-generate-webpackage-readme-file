'use strict';
var inquirer = require('inquirer');
var path = require('path');
var WebpackageReadmeGenerator = require('cubx-generate-webpackage-readme-file');

module.exports = function (grunt) {
  grunt.registerTask('+webpackage-generateReadmeFile', 'Generate the README file of a webpackage', function () {
    var components = [];
    var slots = {};
    function addFeedComponentAndSlots (component) {
      slots[component.artifactId] = component.slots.map(function (slot) {
        return slot.slotId;
      });
      components.push(component.artifactId);
    }
    var webpackagePath = grunt.config.get('param.src');

    if (!webpackagePath) {
      webpackagePath = grunt.config.get('webpackagepath');
    }
    if (!webpackagePath) {
      throw new Error('webpackagePath missed. Please define the option webpackagePath.');
    }
    var wpReadmeGenerator = new WebpackageReadmeGenerator(webpackagePath);
    var manifest = grunt.file.readJSON(path.join(webpackagePath, 'manifest.webpackage'));
    if (manifest.artifacts && manifest.artifacts.elementaryComponents) {
      manifest.artifacts.elementaryComponents.map(addFeedComponentAndSlots);
      manifest.artifacts.compoundComponents.map(addFeedComponentAndSlots);
    }
    var questions = [
      {
        name: 'wpDescription',
        type: 'input',
        message: 'Provide a short description of the webpackage',
        default: 'This is a webpackage that contains Cubbles components.'
      },
      {
        name: 'storeName',
        type: 'input',
        message: 'Provide the name of the base or store where the webpackage will be available',
        default: 'shared'
      },
      {
        name: 'includeSample',
        message: 'Would you like to include a demo using one component?',
        type: 'confirm',
        default: true
      },
      {
        name: 'sampleArtifactId',
        type: 'rawlist',
        message: 'Provide the artifactId of the component to be use as demo.',
        choices: components,
        when: function (answers) {
          return answers.includeSample;
        }
      },
      {
        name: 'includeInit',
        message: 'Would you like to include a demo on how to initialise the component?',
        type: 'confirm',
        default: true,
        when: function (answers) {
          return answers.includeSample && slots[answers.sampleArtifactId].length > 0;
        }
      },
      {
        name: 'sampleSlotName',
        type: 'rawlist',
        message: 'Select the name of the slot to be used to initialise the demo component.',
        choices: function (answers) {
          return slots[answers.sampleArtifactId];
        },
        when: function (answers) {
          return answers.includeInit;
        }
      },
      {
        name: 'sampleSlotValue',
        type: 'input',
        message: 'Provide the value of the slot to be used to initialise the demo component.',
        when: function (answers) {
          return answers.includeInit;
        }
      }
    ];

    var done = this.async();
    inquirer.prompt(questions).then(function (answers) {
      wpReadmeGenerator.setTemplateValues(answers);
      wpReadmeGenerator.generateReadmeFile();
      done();
    });
  });
};
