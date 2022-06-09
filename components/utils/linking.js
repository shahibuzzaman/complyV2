const config = {
  screens: {
    SubsSuccessfulScreen: 'SubsSuccessfulScreen',
  },
};

const linking = {
  prefixes: ['comply://app'],
  config,
};

export default linking;

// npx uri-scheme open demo://app/notifications --ios
// npx uri-scheme open demo://app/notifications --android
// npx uri-scheme open demo://app/profile/1 --android
