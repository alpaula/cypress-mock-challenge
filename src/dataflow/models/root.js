import { types } from 'mobx-state-tree';

import { userModel, initialState as userState } from './user';
import { contentModel, initialState as contentState } from './content';

const RootStore = types.model({
  userStore: userModel,
  contentStore: contentModel,
});

export const rootStore = RootStore.create({
  userStore: userState,
  contentStore: contentState,
});

export default rootStore;
