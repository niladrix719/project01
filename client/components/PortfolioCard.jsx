import styles from '../styles/PortfolioCard.module.css'

function PortfolioCard(props) {
  return (
    <div className={styles.portfolio_card} style={{backgroundImage: `url(http://localhost:3000/uploads/${props.work})`}} onClick={() => props.handleClick(props.work,props.key)}>
      
    </div>
  )
}

export default PortfolioCard;