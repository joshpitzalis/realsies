import { db } from '../../constants/firebase';

export const getRealsies = () => db
  .collection('realsies')
  .get()
  .then(collection => collection.docs.map(doc => doc.data()))
  .catch(err => console.log('err', err));

export const addRealsie = payload => db
  .collection('realsies')
  .add(payload)
  .catch(err => console.log('err', err));

export const setRealsie = (payload, added) => state => ({
  realsies: !added
    ? [payload, ...state.realsies]
    : state.realsies.filter(_id => _id !== payload.id),
});

// export let setRealsie = (state, props) => {
//   console.log('state', state, 'props', props);
//   return state => ({
//     realsies: !props.added
//       ? [...props.payload, ...state.realsies]
//       : state.realsies.filter(_id => _id !== props.payload.id)
//   });
// };
