"use strict";

/* eslint-disable no-process-exit */
/* eslint-disable no-process-env */

import {Nodemailer} from "./nodemailer";
import {EventEmitter} from "events";

export class MailerService {

  static initializeMailerService(config) {
    if (!config || !config.smtp) {
      throw new Error("MailerService Dependencies are Missing...");
    }
    MailerService._nodeMailer = new Nodemailer(config.smtp);
    MailerService._config = config;
    MailerService._eventEmitter = new EventEmitter();
    MailerService._eventEmitter.once("mailSend", MailerService.sendMail.bind(MailerService));

    console.log("MailerService.initializeMailerService()//MailerService Initialized successfully...");
  }

  static sendMailWhenProcessExit(error) {
    const {NODE_ENV} = process.env;

    if (NODE_ENV === "live") {
      MailerService._eventEmitter.emit("mailSend", error);
    } else {
      console.error(`${MailerService._config.appName}//Unhandled Exception Occured in live Env,` +
      `Exiting the process --> \n`, error);
      process.exit(1);
    }
  }

  static sendMail(error) {
    console.error(`${MailerService._config.appName}//Unhandled Exception Occured in live Env, ` +
    `Going to send mail --> \n`, error);

    const mailOptions = {
      "to": MailerService._config.smtp.to,
      "from": MailerService._config.smtp.auth.user,
      "subject": `${MailerService._config.appName}-${error.message}`,
      "text": error.stack
    };

    MailerService._nodeMailer
      .send(mailOptions)
      .then(response => {
        console.log("MailerService.sendMailWhenProcessExit()//Mail Send Successfully...\n ", response);
        console.log(response, "MailerService.sendMailWhenProcessExit()//Mail Send Successfully...");
        console.log(`${MailerService._config.appName}//Exception Occured in live Env, Exiting the process...`);
        process.exit(1);
      })
      .catch(err => {
        console.error("MailerService.sendMailWhenProcessExit()//Mail Sending Failed...", err);
        throw err;
      });
  }
}

/* eslint-enable no-process-exit */
/* eslint-enable no-process-env */
