$(document).ready(function() {

  const SERVICE_ID = "service_sumrr3o";
  const TEMPLATE_ADMIN = "template_3226hum";
  const TEMPLATE_CUSTOMER = "template_fef2w1b";
  const PUBLIC_KEY = "QjfEzHtp9cot5dnPB";

  emailjs.init(PUBLIC_KEY);

  $('#therapy-inquiry-form').on('submit', function(e) {
    e.preventDefault();

    const formData = {
      parent_name: $('#guardian-name').val(),
      email: $('#email').val(),
      contact_number: $('#contact-number').val(),
      child_name: $('#child-name').val(),
      child_age: $('#child-age').val(),
      service: $('#selected-service').val(),
      message: $('#inquiry-desc').val()
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ADMIN, formData)
      .then(function(adminResponse) {
        console.log('✅ Admin auto-reply sent:', adminResponse);
        const customerParams = {
          parent_name: formData.parent_name,
          email: formData.email,
          service: formData.service
        };

        return emailjs.send(SERVICE_ID, TEMPLATE_CUSTOMER, customerParams);
      })
      .then(function(customerResponse) {
        console.log('✅ Customer auto-reply sent:', customerResponse);
      })
      .finally(function() {
        // Reset form and notify user
        Swal.fire({
          icon: 'success',
          title: 'Inquiry Sent Successfully!',
          text: 'Thank you for contacting Little Leap Learning Center. Please check your email for the next steps.',
          width: 420,
          customClass: {
            popup: 'custom-font-popup'
          },
          confirmButtonColor: '#428bca'
        });
        $('#therapy-inquiry-form')[0].reset();
      })
      .catch(function(error) {
        console.error('❌ Email send error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Failed to Send',
          text: 'Something went wrong. Please try again later.',
          width: 420,
          customClass: {
            popup: 'custom-font-popup'
          },
          confirmButtonColor: '#d33'
        });
      });
  });
});