import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "patasunidas0107@gmail.com",
        pass: "mghbgycmfzuucvyf"
    }
});

/**
 * Envia um e-mail
 * @param {string} para - E-mail do destinatário
 * @param {string} assunto - Assunto do e-mail
 * @param {string} texto - Corpo do e-mail (texto simples)
 */
export async function enviarEmail(para, assunto, texto) {
    try {
        const info = await transport.sendMail({
            from: '"Equipe Patinhas Unidas" <patasunidas0107@gmail.com',
            to: para,
            subject: assunto,
            text: texto
        });
    } catch (error) {
        console.error("Erro ao enviar e-mail:", error);
        throw error;
    }
}
