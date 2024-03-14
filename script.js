(function(){
    const fonts = ["cursive", "sans-serif", "serif", "monospace"];
    let captchaValue = "";
  
    function generateCaptcha() {
      let value = btoa(Math.random() * 1000000000);
      value = value.substr(0, 5 + Math.random() * 5);
      captchaValue = value;
    }
  
    function setCaptcha() {
      let html = captchaValue.split("").map((char) => {
        const rotate = -20 + Math.trunc(Math.random() * 30);
        const font = Math.trunc(Math.random() * fonts.length);
        return `<span style="transform:rotate(${rotate}deg);font-family:${fonts[font]}">${char}</span>`;
      }).join("");
      document.querySelector(".login-form .captcha .preview").innerHTML = html;
    }
  
    function initCaptcha() {
      document.querySelector(".login-form .captcha .captcha-refresh").addEventListener("click", function () {
        generateCaptcha();
        setCaptcha();
      });
      generateCaptcha();
      setCaptcha();
    }
    initCaptcha();
  
    document.querySelector(".login-form #login-btn").addEventListener("click", function () {
      let inputCaptchaValue = document.querySelector(".login-form .captcha input").value;
      if (inputCaptchaValue === captchaValue) {
        swal("", "Logging In!", "success");
      } else {
        swal("Invalid captcha");
      }
    });
  })();
  
  document.addEventListener('DOMContentLoaded', function () {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const collegeInput = document.getElementById('college');
    const cgpaInput = document.getElementById('cgpa');
    const emailInput = document.getElementById('email');
    const captchaFormInput = document.getElementById('captcha-form');
  
    const loginBtn = document.getElementById('login-btn');
  
    loginBtn.addEventListener('click', function (event) {
      event.preventDefault();
  
      const username = usernameInput.value.trim();
      const password = passwordInput.value.trim();
      const college = collegeInput.value.trim();
      const cgpa = cgpaInput.value.trim();
      const email = emailInput.value.trim();
      const captcha = captchaFormInput.value.trim();
  
      // Validate inputs
      if (!validateUsername(username) || !validatePassword(password) || !validateCollege(college) || !validateCGPA(cgpa) || !validateEmail(email) || !validateCaptcha(captcha)) {
        return; // Prevent form submission if any input is invalid
      }
  
      // If all inputs are valid, submit the form
      swal('Success!', 'Form submitted successfully!', 'success');
    });
  
    // Validation functions
    function validateUsername(username) {
      if (!username) {
        swal('Error!', 'Please enter your username.', 'error');
        return false;
      }
      // Add additional validation rules here if needed
      return true;
    }
  
    function validatePassword(password) {
      if (!password) {
        swal('Error!', 'Please enter your password.', 'error');
        return false;
      }
      if (password.length < 8) {
        swal('Error!', 'Password must be at least 8 characters long.', 'error');
        return false;
      }
      // Add additional validation rules here if needed
      return true;
    }
  
    function validateCollege(college) {
      if (!college) {
        swal('Error!', 'Please enter your college.', 'error');
        return false;
      }
      // Add additional validation rules here if needed
      return true;
    }
  
    function validateCGPA(cgpa) {
      if (!cgpa) {
        swal('Error!', 'Please enter your CGPA.', 'error');
        return false;
      }
      if (isNaN(cgpa) || parseFloat(cgpa) <= 0 || parseFloat(cgpa) >= 10) {
        swal('Error!', 'Please enter a numeric CGPA value between 0 and 10.', 'error');
        return false;
      }
      // Add additional validation rules here if needed
      return true;
    }
  
    function validateEmail(email) {
      if (!email) {
        swal('Error!', 'Please enter your email.', 'error');
        return false;
      }
      if (!/\S+@\S+\.\S+/.test(email)) {
        swal('Error!', 'Please enter a valid email address.', 'error');
        return false;
      }
      // Add additional validation rules here if needed
      return true;
    }
  
  function validateCaptcha(captcha) {
    if (!captcha) {
      swal('Error!', 'Please enter the captcha.', 'error');
      return false;
    }
    // Compare the entered captcha with the generated captcha
    if (captcha !== captchaValue) {
      swal('Error!', 'Invalid captcha.', 'error');
      return false;
    }
    // Add additional validation rules here if needed
    return true;
  }
  });
  
