import React, { useRef, useState } from "react";
import Confetti from "js-confetti";
import "./style.css";

const confetti = new Confetti();

const App = () => {
  const [bookingRoom, setBookingRoom] = useState(0);
  const [bookedRooms, setBookedRooms] = useState([]);
  const [previousBooked, setPreviousBooked] = useState([]);


  const [floors, setFloors] = useState([
    {
      floor: 1,
      rooms: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      floor: 2,
      rooms: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      floor: 3,
      rooms: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      floor: 4,
      rooms: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      floor: 5,
      rooms: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      floor: 6,
      rooms: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      floor: 7,
      rooms: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      floor: 8,
      rooms: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      floor: 9,
      rooms: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      floor: 10,
      rooms: [0, 0, 0, 0, 0, 0, 0],
    },
  ]);

  const calculateRoomNumber = (floor, roomIndex) => {
    return floor * 100 + roomIndex;
  };

  const getBookedClass = (floor, roomIndex) => {
    const roomNumber = floor * 100 + roomIndex;

    if (bookedRooms.includes(roomNumber)) {
      return "grid-item booked";
    } else {
      return "grid-item";
    }
  };

  const roomSum = (roomArr) => {
    let sum = 0;
    for (let i = 0; i < roomArr.length; i++) {
      sum += roomArr[i];
    }
    return sum;
  };

  const getPreviousBookedRooms = () => {
    let pvRooms = [];
    for (let singleFloor of floors) {
      for (let i = 0; i < singleFloor.rooms.length; i++) {
        singleFloor.rooms[i] = 0;
      }
    }
    calculateRoomNumber(singleFloor.floor, i + 1);
  };

  const resetRooms = () => {
    setBookingRoom(0);
    setBookedRooms([]);
    for (let singleFloor of floors) {
      for (let i = 0; i < singleFloor.rooms.length; i++) {
        singleFloor.rooms[i] = 0;
      }
    }
  };

  const randomBook = () => {
    let roomBookingsNumber = [];

    for (let singleFloor of floors) {
      let randomNumberTimes =
        Math.floor(Math.random() * singleFloor.rooms.length) + 1;
      let initialRandom = Math.floor(Math.random() * randomNumberTimes) + 1;

      console.log("random", randomNumberTimes);

      for (let i = initialRandom; i <= randomNumberTimes; i++) {
        let roomNumber = calculateRoomNumber(singleFloor.floor, i);
        roomBookingsNumber.push(roomNumber);
        singleFloor.rooms[i] = 1;
      }

      setBookedRooms(roomBookingsNumber);
    }
  };

  const bookRooms = () => {
    if (bookingRoom > 97) {
      alert("Room Numbers are Not Permissible");
      return;
    }
    let roomBooked = 0;
    let loopExit = false;

    let roomBookingsNumber = [];

    while (roomBooked < bookingRoom) {
      for (let singleFloor of floors) {
        if (singleFloor.floor <= 9) {
          if (roomSum(singleFloor.rooms) < 10) {
            for (let i = 0; i <= singleFloor.rooms.length; i++) {
              if (singleFloor.rooms[i] == 0) {
                let roomNumber = calculateRoomNumber(singleFloor.floor, i + 1);
                roomBookingsNumber.push(roomNumber);
                singleFloor.rooms[i] = 1;
                roomBooked += 1;
                if (roomBooked == bookingRoom) {
                  loopExit = true;
                  break;
                }
              }
            }
          }
        }

        if (singleFloor.floor == 10) {
          if (roomSum(singleFloor.rooms) < 7) {
            for (let i = 0; i <= singleFloor.rooms.length; i++) {
              if (singleFloor.rooms[i] == 0) {
                let roomNumber = calculateRoomNumber(singleFloor.floor, i + 1);
                roomBookingsNumber.push(roomNumber);
                singleFloor.rooms[i] = 1;
                roomBooked += 1;
                if (roomBooked == bookingRoom) {
                  loopExit = true;
                  break;
                }
              }
            }
          }
        }
        if (loopExit) break;
      }

      setBookedRooms(roomBookingsNumber);
    }
  };

  return (
    <>
      <div class="container">
        <div class="controls">
          <input
            type="number"
            placeholder="Enter No of Rooms"
            onChange={(e) => setBookingRoom(e.target.value)}
          ></input>
          <button onClick={bookRooms}>Book</button>
          <button onClick={resetRooms}>Reset</button>
          <button onClick={randomBook}>Random</button>
        </div>

        <div class="room-layout">
          <div class="left-panel"></div>

          <div class="grid">
            {floors &&
              floors.map((singleFloor) => {
                return singleFloor.floor <= 9 ? (
                  <>
                    <div class={getBookedClass(singleFloor.floor, 1)}>
                      {calculateRoomNumber(singleFloor.floor, 1)}
                    </div>
                    <div class={getBookedClass(singleFloor.floor, 2)}>
                      {calculateRoomNumber(singleFloor.floor, 2)}
                    </div>
                    <div class={getBookedClass(singleFloor.floor, 3)}>
                      {calculateRoomNumber(singleFloor.floor, 3)}
                    </div>
                    <div class={getBookedClass(singleFloor.floor, 4)}>
                      {calculateRoomNumber(singleFloor.floor, 4)}
                    </div>
                    <div class={getBookedClass(singleFloor.floor, 5)}>
                      {calculateRoomNumber(singleFloor.floor, 5)}
                    </div>
                    <div class={getBookedClass(singleFloor.floor, 6)}>
                      {calculateRoomNumber(singleFloor.floor, 6)}
                    </div>
                    <div class={getBookedClass(singleFloor.floor, 7)}>
                      {calculateRoomNumber(singleFloor.floor, 7)}
                    </div>
                    <div class={getBookedClass(singleFloor.floor, 8)}>
                      {calculateRoomNumber(singleFloor.floor, 8)}
                    </div>
                    <div class={getBookedClass(singleFloor.floor, 9)}>
                      {calculateRoomNumber(singleFloor.floor, 9)}
                    </div>
                    <div class={getBookedClass(singleFloor.floor, 10)}>
                      {calculateRoomNumber(singleFloor.floor, 10)}
                    </div>
                  </>
                ) : (
                  <>
                    <div class={getBookedClass(singleFloor.floor, 1)}>
                      {calculateRoomNumber(singleFloor.floor, 1)}
                    </div>
                    <div class={getBookedClass(singleFloor.floor, 2)}>
                      {calculateRoomNumber(singleFloor.floor, 2)}
                    </div>
                    <div class={getBookedClass(singleFloor.floor, 3)}>
                      {calculateRoomNumber(singleFloor.floor, 3)}
                    </div>
                    <div class={getBookedClass(singleFloor.floor, 4)}>
                      {calculateRoomNumber(singleFloor.floor, 4)}
                    </div>
                    <div class={getBookedClass(singleFloor.floor, 5)}>
                      {calculateRoomNumber(singleFloor.floor, 5)}
                    </div>
                    <div class={getBookedClass(singleFloor.floor, 6)}>
                      {calculateRoomNumber(singleFloor.floor, 6)}
                    </div>
                    <div class={getBookedClass(singleFloor.floor, 7)}>
                      {calculateRoomNumber(singleFloor.floor, 7)}
                    </div>
                  </>
                );
              })}
          </div>
        </div>

      </div>
      <p>Tej Pratap</p>
      <a href="https://www.linkedin.com/in/pratapbabu/">https://www.linkedin.com/in/pratapbabu/</a>
    </>
  );
};

export default App;
