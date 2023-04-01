import emailjs from "@emailjs/browser";

export const Apply = (formData) => {
  return emailjs
    .sendForm(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      formData,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    )
    .then(
      (result) => {
        console.log("Email sent successfully!", result);
      },
      (error) => {
        console.error("Failed to send email.", error);
      }
    );
};

export const sendQuoteEmail = (formData, estimate) => {
  // Modify the formData to include the estimate
  formData.append("estimate", estimate);

  return emailjs
    .sendForm(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_QUOTE_TEMPLATE_ID, // Use a different template ID for the Quote component
      formData,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    )
    .then(
      (result) => {
        console.log("Email sent successfully!", result);
      },
      (error) => {
        console.error("Failed to send email.", error);
      }
    );
};
