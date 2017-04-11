"use strict";

import {expect} from "chai";
import {spy} from "sinon";
import {Nodemailer} from "../../dist/nodemailer";

const validConfig = {
    "host": "abc.com",
    "port": 111,
    "secure": true,
    "auth": {
      "user": "testUser",
      "pass": "testPwd"
    }
  },
  invalidConfig = {
    "foo": "bar"
  },
  validMailOption = {
    "to": "sender",
    "from": "recipient"
  },
  invalidMailOption = {
    "foo": "bar"
  };

describe("Nodemailer Tests ===> ", () => {

  describe("The Nodemailer Instance", () => {

    describe("when it's been created with valid config", () => {

      let nodemailer;

      before(() => {
        nodemailer = new Nodemailer(validConfig);
      });

      after(() => {
        nodemailer = null;
      });

      it("should have a member referencing to config", () => {
        expect(nodemailer).to.have.property("config");
      });

      it("should have a member referencing to transporter", () => {
        expect(nodemailer).to.have.property("transporter");
      });

      it("should have a method referencing to _createTransport()", () => {
        expect(nodemailer).to.have.property("_createTransport");
      });

      it("should have a method referencing to send()", () => {
        expect(nodemailer).to.have.property("send");
      });
    });

    describe("when it's been created with invalid config", () => {

      it("should throw an error", () => {

        function createNodemailer() {
          return new Nodemailer(invalidConfig);
        }

        expect(createNodemailer).to.throw(Error);
      });
    });
  });

  describe("when send() method is called", () => {

    describe("when called with valid arguments", () => {

      let nodemailer;

      before(() => {
        nodemailer = new Nodemailer(validConfig);
        nodemailer.transporter = {
          "sendMail": spy()
        };
      });

      after(() => {
        nodemailer = null;
      });

      it("should call sendMail() method successfully", () => {
        nodemailer.send(validMailOption)
          .then(() => {
            expect(nodemailer.transporter.sendMail.called).to.be.true;
          });
      });
    });

    describe("when called with invalid arguments", () => {

      let nodemailer;

      before(() => {
        nodemailer = new Nodemailer(validConfig);
      });

      after(() => {
        nodemailer = null;
      });

      it("should throw an error", () => {
        expect(() => {
          nodemailer.send(invalidMailOption);
        }).to.throw(Error);
      });
    });
  });
});
