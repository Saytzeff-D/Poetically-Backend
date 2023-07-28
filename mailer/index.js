const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    port: 465,
    auth: {
        user: process.env.SITE_EMAIL,
        pass: process.env.SITE_PASSWORD
    }
})

const mailOption = (code, email)=>{
    return {
        from: process.env.SITE_EMAIL,
        to: email,
        subject: 'Poetically-Me Confirmation Code',
        html: `
            <center>
                <div>
                    <img src='https://res.cloudinary.com/ololadedavid15/image/upload/v1690411751/Poetically-Me/poetically-me_kpgl6n.png' />
                </div>
                <p>
                    <strong>Confirmation Code</strong>
                </p>
                <h1 style='color: #FE9747;'>
                    ${code}
                </h1>
                <p>
                    <b>Kindly enter the code to verify your email address.</b>
                </p>
            </center>
        `
    }
}

module.exports = { transporter, mailOption }