import styles from '../styles/ReviewBox.module.css'
import { FaStar } from 'react-icons/fa'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

function ReviewBox(props) {
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');
  const [stars, setStars] = useState('');
  const [hover, setHover] = useState(null);
  const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;

  const submitReview = () => {
    async function postReview() {
      try {
        if (token) {
          const response = await fetch('http://localhost:3000/add/review', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              freelancer: props.freelancer._id,
              title: title,
              review: review,
              stars: stars
            })
          });
          const data = await response.json();
          props.appendReview(data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    postReview();
    props.handleReviewBox(false);
  }
  return (
    <div className={styles.reviewBox}>
      <span onClick={(() => props.handleReviewBox(false))} className={styles.cross}>
        <FontAwesomeIcon icon={faXmark} />
      </span>
      <h1 className={styles.heading}>Give a Feedback</h1>
      <div className={styles.stars}>
        {[...Array(5)].map((star, index) => (
          <label key={index}>
            <input className={styles.inputStars} type="radio" name="rating" value={index + 1} onClick={(e) => setStars(e.target.value)} />
            <FaStar size={25} key={index} onMouseEnter={() => setHover(index + 1)} onMouseLeave={() => setHover(null)}
              className={styles.star} color={index + 1 <= (hover || stars) ? '#fff707' : 'white'}
            />
          </label>
        ))}
      </div>
      <label htmlFor='title' className={styles.label}>Title</label>
      <input className={styles.input} type="text" id='title' name='title' onChange={(e) => setTitle(e.target.value)} />
      <label htmlFor='review' className={styles.label}>Review</label>
      <textarea className={styles.textarea} name="review" id="review" cols="30" rows="10" onChange={(e) => setReview(e.target.value)}></textarea>
      <button className={styles.btn} onClick={submitReview}>Submit</button>
    </div>
  )
}

export default ReviewBox;