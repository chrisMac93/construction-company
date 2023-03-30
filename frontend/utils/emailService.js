import emailjs from '@emailjs/browser';


export const sendEmail = (formData, estimate) => {
  const templateParams = {
    from_name: formData.contactInfo.name,
    email: formData.contactInfo.email,
    phone: formData.contactInfo.phone,
    message: formData.contactInfo.message,
    estimate: estimate,
  };

  return emailjs
    .sendForm(process.env.EMAILJS_SERVICE_ID, YOUR_TEMPLATE_ID, templateParams, process.env.EMAILJS_PUBLIC_KEY)
    .then(
      (result) => {
        console.log("Email sent successfully!", result);
      },
      (error) => {
        console.error("Failed to send email.", error);
      }
    );
};