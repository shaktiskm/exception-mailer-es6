# exception-mailer-es6

## Setup

1. Check the npm packages:

    ```
    npm install
    ```

2. To use the module


   ```
   import {MailerService} from "exception-mailer-es6";

   MailerService.initializeMailerService(config);

   process.on("uncaughtException", MailerService.sendMailWhenProcessExit.bind(MailerService));
  
   ```
   if the environment will be live i.e. process.env === 'live', it will send the mail and exit the process safely.


## Managing the project with Grunt

* Runs eslint, babel:dist and mochaTest

    ```
    grunt
    ```

* Runs the tests (the same as ```npm test```) 

    ```
    grunt mochatest
    ```

* Compiles the .es6 files to .js
 
    ```
    grunt babel:dist
    ```

* Lints the .es6 files

    ```
    grunt eslint
    ```

