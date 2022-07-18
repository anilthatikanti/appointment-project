// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, favoriteAppointment} = props
  const {id, title, date, isFavorite} = appointmentDetails

  const isClickFavorite = () => {
    favoriteAppointment(id)
  }

  const star = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="listItem">
      <div className="title-date">
        <p className="reason">{title}</p>
        <button
          type="button"
          className="starBtn"
          testid="star"
          onClick={isClickFavorite}
        >
          <img src={star} alt="star" />
        </button>
      </div>
      <p className="appointment-date">Date: {date}</p>
    </li>
  )
}
export default AppointmentItem
