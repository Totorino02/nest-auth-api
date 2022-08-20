import * as nodeMailer from "nodemailer";
import * as fs from "fs";
import path, { join } from "path";


export class Mailer{
    private cwd = process.cwd();
    private mailType = {
        CONFIRMATION_MAIL: join(this.cwd, "src", "utils", "mails","templates", "confirmation_mail.txt"),
        REQUEST_MAIL: join(this.cwd, "src", "utils", "mails","templates", "request_mail.txt"),
        ORDER_MAIL: join(this.cwd, "src", "utils", "mails","templates", "order_mail.txt")
    };
    private sender = {
        user: process.env.MAIL_SENDER,
        pass: process.env.SENDER_PASSWORD
    };
    constructor(){}

    confirmationMail(user: any){
        let email: string;
        const transporter = nodeMailer.createTransport({
            service: "gmail",
            auth: {...this.sender}
        });
        const info = {
            USER_NAME: user.firstname +" "+user.lastname,
            USER_EMAIL: user.email,
            SUPPORT_EMAIL: process.env.MAIL_SENDER,
            LINK: "www.google.com",
            SUBJECT: ""
        };

        email = fs.readFileSync(this.mailType.CONFIRMATION_MAIL, {encoding: "utf8"})
        .replace("${name}", info.USER_NAME)
        .replace("${email}",info.USER_EMAIL)
        .replace("${link}",info.LINK)   
        .replace("${support_email}", info.SUPPORT_EMAIL);

        const options = {
            from: process.env.MAIL_SENDER, 
            to: info.USER_EMAIL,
            subject: info.SUBJECT,
            html: email
        }
            
        transporter.sendMail(options);

    }




}