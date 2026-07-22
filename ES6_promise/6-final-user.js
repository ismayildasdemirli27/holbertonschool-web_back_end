import signUpUser from './4-user-promise.js';
import uploadPhoto from './5-photo-reject.js';

export default async function handleProfileSignup(firstName, lastName, filename) {
  return Promise.allSettled([
    uploadPhoto(filename),
    signUpUser(firstName, lastName),
  ]).then((values) => values.map((v) => ({
    status: v.status,
    value: v.status === 'fulfilled' ? v.value : v.reason,
  })));
}
