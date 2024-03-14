const { useState, useEffect } = React;

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    grade: '',
    agree: false,
    captcha: '',
    enteredCaptcha: ''
  });

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setFormData({ ...formData, captcha, enteredCaptcha: '' });
    drawCaptcha(captcha);
  };

  const drawCaptcha = (text) => {
    const canvas = document.getElementById('captchaCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '30px Arial';
    ctx.fillStyle = '#333';
    ctx.fillText(text, 10, 30);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.enteredCaptcha === formData.captcha && formData.agree) {
      // Form submission logic here
      console.log('Form submitted successfully!');
    } else {
      alert('Please enter valid captcha and agree to terms.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Password:
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Phone Number:
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Grade:
        <input type="text" name="grade" value={formData.grade} onChange={handleChange} />
      </label>
      <br />
      <label className="agree-label">
        <input type="checkbox" name="agree" className="agree-checkbox" checked={formData.agree} onChange={handleChange} required />
        I agree to above terms and conditions
      </label>
      <br />
      <label>
        Captcha:
        <input type="text" name="enteredCaptcha" value={formData.enteredCaptcha} onChange={handleChange} />
        <canvas id="captchaCanvas" width="150" height="40"></canvas>
        <button type="button" onClick={generateCaptcha}>Refresh Captcha</button>
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
