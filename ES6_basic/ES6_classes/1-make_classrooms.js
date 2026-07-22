import ClassRoom from './0-classroom.js';

const initializeRooms = () => {
  return [
    new ClassRoom(19),
    new ClassRoom(20),
    new ClassRoom(34),
  ];
};

export default initializeRooms;
