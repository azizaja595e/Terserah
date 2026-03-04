import nodemailer from 'nodemailer';

export async function sendSignupSuccessEmail({ to, username}) {
    const smtp = getTransporter();
    if (!smtp || !to) return false;

    await smtp.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to,
        subject: 'Signup Berhasil',
        text: `Halo ${username}, akun kamu berhasil dibuat pada ${new Date(). toISOString()}.`
    });
    return true;
}

//in lom selesai