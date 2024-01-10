import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DatePicker, message, TimePicker, Button } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState(false);
  const dispatch = useDispatch();

  // login user data
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/doctor/getDoctorById",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ============ handle availability
  const handleAvailability = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/user/booking-availability",
        { doctorId: params.doctorId, date, time },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        setIsAvailable(true);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  // =============== booking func
  const handleBooking = async () => {
    try {
      setIsAvailable(true);
      if (!date || !time) {
        return message.error("Date & Time are required.");
      }
      dispatch(showLoading());
      const res = await axios.post(
        "/api/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctors,
          userInfo: user,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
    //eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <div className="m-3">
        <h2 className="pt-3 text-center">Book an Appointment</h2>
        {doctors && (
          <div className="card mt-4">
            <div className="card-body">
              <h4 className="card-title">{`Dr. ${doctors.firstName} ${doctors.lastName}`}</h4>
              <p className="card-text">Speciality: {doctors.specialization}</p>
              <p className="card-text">Consultation Fee: {doctors.feesPerConsultation}</p>
              <p className="card-text">Timings: {doctors.timings && doctors.timings.join(" - ")}</p>

              <div className="form-group">
                <label htmlFor="appointmentDate">Select Date:</label>
                <DatePicker
                  id="appointmentDate"
                  className="form-control"
                  format="DD-MM-YYYY"
                  onChange={(value) => {
                    const selectedDate = moment(value);
                    if (selectedDate.isBefore(moment(), "day")) {
                      message.error("Selected date cannot be a backdate.");
                      return;
                    }
                    setDate(selectedDate.format("DD-MM-YYYY"));
                  }}
                  disabledDate={(current) => current && current < moment().endOf("day")}
                />
              </div>

              <div className="form-group">
                <label htmlFor="appointmentTime">Select Time:</label>
                <TimePicker
                  id="appointmentTime"
                  className="form-control"
                  format="HH:mm"
                  onChange={(value) => {
                    const selectedTime = moment(value, "HH:mm");
                    const consultationStartTime = moment(doctors.timings[0], "HH:mm");
                    const consultationEndTime = moment(doctors.timings[1], "HH:mm");

                    if (
                      selectedTime.isBefore(consultationStartTime) ||
                      selectedTime.isAfter(consultationEndTime)
                    ) {
                      message.error("Selected time is not within the consultation time.");
                      return;
                    }

                    setTime(selectedTime.format("HH:mm"));
                  }}
                  disabled={!date}
                  value={time && moment(time, "HH:mm")}
                />
              </div>

              <Button type="primary" onClick={handleAvailability} className="mr-2 m-2">
                Check Availability
              </Button>

              <Button type="primary" onClick={handleBooking}>
                Book Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;
