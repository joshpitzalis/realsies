import { db } from '../../constants/firebase';

export let getRealsies = () =>
  db
    .collection('realsies')
    .get()
    .then(collection => {
      const realsies = collection.docs.map(doc => doc.data().id);
      return realsies;
    })
    .catch(err => console.log('err', err));

export let addRealsie = payload =>
  db
    .collection('realsies')
    .add(payload)
    .catch(err => console.log('err', err));

export let setRealsie = (payload, added) => state => ({
  realsies: !added
    ? [payload, ...state.realsies]
    : state.realsies.filter(_id => _id !== payload.id)
});

// export let setRealsie = (state, props) => {
//   console.log('state', state, 'props', props);
//   return state => ({
//     realsies: !props.added
//       ? [...props.payload, ...state.realsies]
//       : state.realsies.filter(_id => _id !== props.payload.id)
//   });
// };
