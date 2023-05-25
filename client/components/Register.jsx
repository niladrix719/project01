import styles from '../styles/Register.module.css'
import FeatureCard from '@/components/FeatureCard';

function Register() {
  return (
    <div className={styles.features}>
        <FeatureCard
          heading='Register as a Freelancer'
          subHeading="We believe in quality over quantity."
          image='/freelancer1.jpg'
          color='white'
          link='/register/freelancer'
          type='freelancer'
        />
        <FeatureCard
          heading='Register as a Company'
          subHeading="We believe in quality over quantity."
          image='/company1.jpg'
          color='white'
          link='/register/company'
          type='company'
        />
        <div className={styles.texts}>
          <h1 className={styles.heading}>Register For Free</h1>
          <span style={{fontSize: '2.4rem'}}>on </span><i style={{fontSize: '3.2rem'}}>Fipezo</i>
        </div>
    </div>
  )
}

export default Register;