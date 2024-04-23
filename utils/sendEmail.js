const nodeMailer = require('nodemailer');

class EmailUtils {
  sendMail = async (emailTo, buffer) => {
    try {
      const emailService = process.env.EMAIL_SERVICE;
      const emailFrom = process.env.EMAIL_FROM;
      const emailPass = process.env.EMAIL_PASS;

      const transporter = nodeMailer.createTransport({
        service: emailService,
        auth: {
          user: emailFrom,
          pass: emailPass,
        },
      });

      const mailOptions = {
        from: emailFrom,
        to: emailTo,
        subject: 'Todo Report',
        text: 'Hi, this is your report',
        attachments: [
          {
            filename: 'report.xlsx',
            content: buffer,
          },
        ],
      };

      const sendingRes = await transporter.sendMail(mailOptions);
      return sendingRes ? 'Email sent successfully' : 'Something wrong happened';
    } catch (error) {
      throw error;
    }
  };
}

module.exports = new EmailUtils();
