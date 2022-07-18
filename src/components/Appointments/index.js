// Write your code here
import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {appointmentList: [], title: '', date: '', isClicked: false}

  inputTitleGrabbing = e => {
    this.setState({title: e.target.value})
  }

  inputDateGrabbing = e => {
    this.setState({
      date: e.target.value,
    })
  }

  favoriteAppointment = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isFavorite: !eachAppointment.isFavorite}
        }
        return eachAppointment
      }),
    }))
  }

  addAppointment = e => {
    e.preventDefault()
    const {title, date} = this.state
    const formattedDate = date
      ? format(new Date(date), 'dd MMMM yyyy, EEEE')
      : ''
    if (title.length !== 0 && date.length !== 0) {
      const appointment = {
        id: uuidv4(),
        title,
        date: formattedDate,
        isFavorite: false,
      }
      this.setState(prevState => ({
        appointmentList: [...prevState.appointmentList, appointment],
        title: '',
        date: '',
      }))
    }
  }

  separateFavoriteItems = () => {
    this.setState(prevState => ({isClicked: !prevState.isClicked}))
  }

  render() {
    const {isClicked, date, title, appointmentList} = this.state
    const style = isClicked ? 'isStarredBtn' : 'isStarBtn'
    const filterList = appointmentList.filter(
      eachAppointment => eachAppointment.isFavorite === true,
    )

    const filterContent = isClicked
      ? filterList.map(eachAppointment => (
          <AppointmentItem
            appointmentDetails={eachAppointment}
            key={eachAppointment.id}
            favoriteAppointment={this.favoriteAppointment}
          />
        ))
      : appointmentList.map(eachAppointment => (
          <AppointmentItem
            appointmentDetails={eachAppointment}
            key={eachAppointment.id}
            favoriteAppointment={this.favoriteAppointment}
          />
        ))
    console.log(date)

    return (
      <div className="container">
        <div className="card">
          <div className="arrangement">
            <div>
              <h1 className="heading">Add Appointment</h1>
              <form onSubmit={this.addAppointment}>
                <label htmlFor="Title" className="titleLabel">
                  TITLE
                </label>
                <br />
                <input
                  className="titleInput"
                  id="Title"
                  placeholder="Title"
                  type="text"
                  value={title}
                  onChange={this.inputTitleGrabbing}
                />
                <br />
                <label htmlFor="Date" className="dateLabel">
                  DATE
                </label>
                <br />
                <input
                  value={date}
                  placeholder="Date"
                  id="Date"
                  type="date"
                  onChange={this.inputDateGrabbing}
                />
                <br />
                <button className="addBtn" type="submit">
                  Add
                </button>
              </form>
            </div>
            <img
              className="appointmentImage"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <hr />
          <div className="belowContainer">
            <h1 className="paragraph">Appointments</h1>
            <button
              type="button"
              className={style}
              onClick={this.separateFavoriteItems}
            >
              starred
            </button>
          </div>
          <ul className="ulist">{filterContent}</ul>
        </div>
      </div>
    )
  }
}
export default Appointments
