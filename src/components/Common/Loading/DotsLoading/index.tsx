import styles from "./styles.module.css"

const DotsLoading: React.FC = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.dots}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  )
}

export default DotsLoading
