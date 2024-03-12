import styles from './RestaurantImage.module.scss'

function RestaurantImage({image}) {
  return (
    <div className={styles.restaurant_image_container}>
        <div className={styles.restaurant_image} style={{ backgroundImage: `url(${image})` }} />
    </div>
  )
}

export default RestaurantImage
