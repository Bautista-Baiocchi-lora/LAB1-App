import React from 'react';
import {useUserSelector} from '../storage/app.selectors';
import GuardiaNavigator from './guardia.navigator';
import UserNavigator from './user.navigator';

function HomeNavigator() {
  const accountType: number = useUserSelector((state) => state.cookie.type);

  return getNavigator(accountType);
}

const getNavigator = (type: number) => {
  switch (type) {
    case Type.USER:
      return <UserNavigator />;
    case Type.GUARDIA:
      return <GuardiaNavigator />;
    default:
      throw Error('Invalid account type.');
  }
};

enum Type {
  USER = 1,
  GUARDIA = 2,
}

export default HomeNavigator;
