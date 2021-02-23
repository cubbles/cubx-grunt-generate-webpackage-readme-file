/**
 * Created by Edwin Gamboa on 16/05/2017.
 */
/* globals describe,beforeEach,it,afterEach, before, expect */
(function () {
  'use strict';
  let grunt;
  let fs;
  let path;
  let stdin;
  let testRootPath;
  let readmeNoSampleNoInit;
  let readmeSampleNoInit;
  let readmeSampleInit;
  let resultReadmePath;
  let readmeSampleNoSlots;
  let wpPath;
  let storeName;
  let wpDescription;
  let include;
  let notInclude;
  let firstOption;
  let secondOption;
  let sampleSlotValue;

  describe('+webpackage-generateReadmeFile', function () {
    before(function () {
      wpDescription = 'This a test webpackage.';
      storeName = 'sandbox';
      include = 'Y';
      notInclude = 'n';
      firstOption = '1';
      secondOption = '2';
      sampleSlotValue = '"Slot Value"';
    });
    beforeEach(function () {
      stdin = require('mock-stdin').stdin();
      const webpackageName = 'sample-wp';
      path = require('path');
      fs = require('fs-extra');
      testRootPath = path.join(process.cwd(), 'test');
      wpPath = path.resolve(testRootPath, 'resources', webpackageName);

      grunt = require('grunt');
      grunt.task.init = function () {};

      const taskPath = path.resolve(process.cwd(), 'tasks');
      grunt.task.loadTasks(taskPath);
    });
    describe('run grunt task "+webpackage-generateReadmeFile", webpackage path configured in param.src', function () {
      beforeEach(function () {
        // Init config
        grunt.initConfig({
          param: {
            src: wpPath
          }
        });
        resultReadmePath = path.resolve(wpPath, 'README.md');
        readmeNoSampleNoInit = fs.readFileSync(path.resolve(wpPath, 'README_NoSample_NoInit.md'), 'utf8');
        readmeSampleInit = fs.readFileSync(path.resolve(wpPath, 'README_Sample_Init.md'), 'utf8');
        readmeSampleNoInit = fs.readFileSync(path.resolve(wpPath, 'README_Sample_NoInit.md'), 'utf8');
        readmeSampleNoSlots = fs.readFileSync(path.resolve(wpPath, 'README_NoSlots.md'), 'utf8');
      });
      afterEach(function () {
        grunt.initConfig({});
      });
      it('should generate the README file without sample or initialisation demo', function (done) {
        process.nextTick(function () { stdin.send(wpDescription + '\n'); });
        setTimeout(function () { stdin.send(storeName + '\n'); }, 600);
        setTimeout(function () { stdin.send(notInclude + '\n'); }, 700);
        grunt.tasks(['+webpackage-generateReadmeFile'], {}, function () {
          expect(fs.readFileSync(resultReadmePath, 'utf8')).to.equal(readmeNoSampleNoInit);
          done();
        });
      });
      it('should generate the README file with sample but without initialisation demo', function (done) {
        process.nextTick(function () { stdin.send(wpDescription + '\n'); });
        setTimeout(function () { stdin.send(storeName + '\n'); }, 600);
        setTimeout(function () { stdin.send(include + '\n'); }, 700);
        setTimeout(function () { stdin.send(firstOption + '\n'); }, 800);
        setTimeout(function () { stdin.send(notInclude + '\n'); }, 900);
        grunt.tasks(['+webpackage-generateReadmeFile'], {}, function () {
          expect(fs.readFileSync(resultReadmePath, 'utf8')).to.equal(readmeSampleNoInit);
          done();
        });
      });
      it('should generate the README file with sample and initialisation demo', function (done) {
        process.nextTick(function () { stdin.send(wpDescription + '\n'); });
        setTimeout(function () { stdin.send(storeName + '\n'); }, 600);
        setTimeout(function () { stdin.send(include + '\n'); }, 700);
        setTimeout(function () { stdin.send(firstOption + '\n'); }, 800);
        setTimeout(function () { stdin.send(include + '\n'); }, 900);
        setTimeout(function () { stdin.send(firstOption + '\n'); }, 1000);
        setTimeout(function () { stdin.send(sampleSlotValue + '\n'); }, 1100);
        grunt.tasks(['+webpackage-generateReadmeFile'], {}, function () {
          expect(fs.readFileSync(resultReadmePath, 'utf8')).to.equal(readmeSampleInit);
          done();
        });
      });
      it('should generate the README with sample no initialisation since selected component have no slots', function (done) {
        process.nextTick(function () { stdin.send(wpDescription + '\n'); });
        setTimeout(function () { stdin.send(storeName + '\n'); }, 600);
        setTimeout(function () { stdin.send(include + '\n'); }, 700);
        setTimeout(function () { stdin.send(secondOption + '\n'); }, 900);
        grunt.tasks(['+webpackage-generateReadmeFile'], {}, function () {
          expect(fs.readFileSync(resultReadmePath, 'utf8')).to.equal(readmeSampleNoSlots);
          done();
        });
      });
    });
    describe('run grunt task "+webpackage-generateReadmeFile", webpackage path configured in webpackagepath', function () {
      beforeEach(function () {
        // Init config
        grunt.initConfig({
          webpackagepath: wpPath
        });
        resultReadmePath = path.resolve(wpPath, 'README.md');
        readmeNoSampleNoInit = fs.readFileSync(path.resolve(wpPath, 'README_NoSample_NoInit.md'), 'utf8');
      });
      afterEach(function () {
        grunt.initConfig({});
      });
      it('should generate the README file without sample or initialisation demo', function (done) {
        process.nextTick(function () { stdin.send(wpDescription + '\n'); });
        setTimeout(function () { stdin.send(storeName + '\n'); }, 600);
        setTimeout(function () { stdin.send(notInclude + '\n'); }, 700);
        grunt.tasks(['+webpackage-generateReadmeFile'], {}, function () {
          expect(fs.readFileSync(resultReadmePath, 'utf8')).to.equal(readmeNoSampleNoInit);
          done();
        });
      });
    });
  });
})();
