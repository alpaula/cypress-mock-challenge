import { types } from 'mobx-state-tree';

export const initialState = {
  user: {
    firstName: '',
    lastName: '',
    userId: '',
    email: '',
    avatar: '',
  },
};

const User = types.model('User', {
  firstName: types.maybe(types.string),
  lastName: types.maybe(types.string),
  userId: types.string,
  email: types.string,
  avatar: types.maybe(types.string),
});

export const userModel = types.model('UserStore', {
  user: User,
}).views(self => ({
  getUser() {
    return self.user;
  }
})).actions(self => ({
  setUser(user) {
    self.user = {
      firstName: user.firstName,
      lastName: user.lastName,
      userId: user.userId,
      email: user.email,
      shortBio: user.shortBio,
      roleUser: user.roleUser,
      lang: user.lang,
      avatar: user.avatar,
      firstDashAccess: user.firstDashAccess,
    }
  },
  cleanModule() {
    self.idToken = initialState.idToken;
    self.organizationId = initialState.organizationId;
    self.user = initialState.user;
  }
}));
