import styles from '@/styles/VerifyOTP.module.css'
import Navbar from '@/components/Navbar';
import Image from 'next/image'
import { useRouter } from 'next/router';

function VerifyOTP() {
  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    async function postData() {
      try {
        const phone = JSON.parse(localStorage.getItem('phone'));
        const type = localStorage.getItem('type');
        const response = await fetch('http://localhost:3000/otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            otp: formData.get('otp'),
            phone: phone,
            type: type
          })
        });
        const data = await response.json();
        if(data){
          localStorage.removeItem('phone');
          localStorage.removeItem('type');
        }
        localStorage.setItem('user', JSON.stringify(data));
        router.push('/');
      } catch (error) {
        console.error(error);
      }
    }

    postData();
  }

  return (
    <div>
      <div className={styles.navbar}>
        <Navbar color='black' />
      </div>
      <div className={styles.body}>
        <form method="post" className={styles.form} onSubmit={handleSubmit}>
          <div>
            <h1 className={styles.heading}>Welcome</h1>
            <p className={styles.subHeading}>Enter a one-time password (OTP) to verify</p>
          </div>
          <div id={styles.otp}>
            <input className={styles.inputs} type="text" name="otp" id="otp" placeholder="Enter OTP" />
          </div>
          <div>
            <button className={styles.btn} type='submit'>Submit</button>
          </div>
          <div className={styles.lower}>
            <p className={styles.resendOtp}>Resend OTP?</p>
          </div>
        </form>
        <div className={styles.presentation}>
          <Image src="/pre.jpg" alt="image" height="1006" width="1000" />
        </div>
      </div>
    </div>
  )
}

export default VerifyOTP