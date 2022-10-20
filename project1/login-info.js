const sessions = {};

const words = {};

const loginInfo = {
  sessions,
  words,

  isValidSID(sid) {
    return this.sessions[sid];
  },
};

module.exports = loginInfo;
