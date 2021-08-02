const nodemailer = require('nodemailer');

class mailService{
    async sendActivationCode(to, link){
        let transporter = nodemailer.createTransport({
                service:'gmail',
                auth: {
                user: process.env.ACTIVATION_EMAIL_USER,
                pass: process.env.ACTIVATION_EMAIL_PASS,
                },
            });            
            let result = await transporter.sendMail({
                from: process.env.ACTIVATION_EMAIL_USER,
                to,
                subject: 'Verification code',
                text: '',
                html:
                    `
                    <div>
                        <h1>Для активации аккаунта перейдите по ссылке</h1>
                        <a href=${link}>${link}</a>
                        <h2>Время отправки сообщения: ${new Date()}</h2>
                    </div>
                    `
            },(err,info
                )=>{
                if(err){
                    console.log('error:', err);
                }else{
                    console.log('email send:', info);
                }
            });
    }
}

module.exports = new mailService();