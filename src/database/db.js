import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore'

export const recipesMock = [
    {
      name: 'Chicken Tacos',
      category: 'Dinner',
      ingredients: [
        'Corn tortillas',
        'Chicken breast',
        'Onion',
        'Cilantro',
        'Lime',
        'Salsa',
        'Salt',
        'Oil'
      ],
      preparation: `Cook the chicken breast and shred it.
      Finely chop the onion and cilantro.
      Heat the tortillas on a griddle.
      Fill the tortillas with shredded chicken, onion, and cilantro.
      Add salsa to taste.
      Squeeze lime over the top and add salt if needed.`
    },
    {
      name: 'Caesar Salad',
      category: 'Salads',
      ingredients: [
        'Romaine lettuce',
        'Chicken breast',
        'Croutons',
        'Parmesan cheese',
        'Caesar dressing'
      ],
      preparation: `Wash and sanitize the romaine lettuce, then chop it into pieces.
      Cook the chicken breast and cut it into strips or cubes.
      Mix the lettuce with the chicken, croutons, and Parmesan cheese in a bowl.
      Add the Caesar dressing and mix well.
      Serve cold and enjoy.`
    },
  ];

export default function (app) {

    console.log('Initializing Firestore');

    const db = getFirestore(app);

    const _populateData = async () => {
        recipesMock.forEach(async (recipe) => {
            await addDoc(collection(db, 'recipes'), recipe);
        });
    }

    return {
        getAll () {
            return getDocs(collection(db, 'recipes')).then(querySnapshot => querySnapshot.docs.map(doc => {
                return {
                    ...doc.data(),
                    id: doc.id,
                }
            }));
        },
        add (recipe) {
            return addDoc(collection(db, 'recipes'), recipe);
        },
        populate () {
            // if getAll returns 0, populate with some data
            this.getAll().then((docs) => {
                if (docs.length === 0) {
                    _populateData();
                }
            })
        }
    }
}
