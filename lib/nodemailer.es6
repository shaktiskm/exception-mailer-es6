"use strict";

import Q from "q";
import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";

/**
 * Represents the Nodemailer which is capable of sending mail using custom SMTP server
 * @public
 * @class
 */

export class Nodemailer {

  /**
   * @constructor
   * @param {object} smtpConfig - smtp server configuration
   */
  constructor(smtpConfig) {
    if (!smtpConfig || !smtpConfig.host || !smtpConfig.port || !smtpConfig.auth) {
      throw new Error("SMTP config missing");
    }
    this.config = smtpConfig;
    this.transporter = null;
  }

  /**
   * It creates the smtp transporter
   * @private
   * @returns {undefined} Void.
   */
  _createTransport() {
    this.transporter = nodemailer.createTransport(smtpTransport(this.config));
  }

  /**
   * It sends mail to recipient using smtp transporter
   * @param {object} mailOpions - mail options for sending the Email.
   * @public
   * @returns {Q.Promise<void>} Promise whether or not the mail send is OK.
   */
  send(mailOpions) {

    if (!mailOpions || !mailOpions.to || !mailOpions.from) {
      throw new Error("mail options not supplied properly");
    }

    if (!this.transporter) {
      this._createTransport();
    }

    return Q.ninvoke(this.transporter, "sendMail", mailOpions);
  }
}
