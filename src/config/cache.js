import {InMemoryCache, makeVar} from '@apollo/client';

export const currentSelectedNoeudsIds = makeVar([]);

const cache = new InMemoryCache({
  typePolicies: {
    noeud: {
      fields: {
        isSelected: {
          read(value, {readField}) {
            const noeudId = readField('_id');
            const isSelected = !!currentSelectedNoeudsIds().find(
              id => id === noeudId,
            );

            return isSelected;
          },
        },
      },
    },
  },
});

// // Create the initial value
// const noeudsInitialValue = [];

// // Create the noeuds var and initialize it with the initial value
// export const todosVar = makeVar(noeudsInitialValue);

export default cache;
