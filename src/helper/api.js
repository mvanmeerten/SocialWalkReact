import store from '../redux/store'

const isLoggedIn = () => store.getState().user.id !== undefined

class Api {

  fetchBase(path, method, body=undefined) {
    return fetch(`/SocialWalk/${path}`, {
      method: method,
      header: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: body ? JSON.stringify(body) : undefined
    })
  }

  loggedIn = async () => {
    if (store.getState().user.id !== undefined) return true
    const result = await fetch('/SocialWalk/loggedIn', {
      method: 'GET',
      header: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const result_2 = await result.json();
    return result_2.response;
  }

  loginUser = (params) => {
    return this.fetchBase('loginUser', 'POST', {
      email: params.email,
      password: params.password
    })
  };

  logoutUser = (params) => {
    return this.fetchBase('logoutUser', 'POST')
  }

  signupUser = (params) => {
    return this.fetchBase('signUpUser', 'POST', {
      name: params.name,
      email: params.email,
      password: params.password
    })
  }

  editUser = (params) => {
    return this.fetchBase('editUser', 'POST', {
      name: params.name,
      password: params.password
    })
  }

  deleteUser = (params) => {
    return this.fetchBase('deleteUser', 'POST')
  }

  createNewGroup = (params) => {
    return this.fetchBase('createGroup', 'POST', {
      groupName: params.name,
      dateToTrackFrom: params.dateToTrackFrom
    })
  }

  getGroupsOfUser = (params) => {
    return this.fetchBase('getGroupsOfUser', 'GET')
  }

  group = (params) => {
    return this.fetchBase(`getGroup/${params.id}`, 'GET')
  }

  groups = (params) => {
    return this.fetchBase('groups', 'GET')
  }

  joinGroup = (params) => {
    return this.fetchBase(`joinGroup/${params.id}`, 'POST')
  }

  leaveGroup = (params) => {
    return this.fetchBase(`leaveGroup/${params.id}`, 'POST')
  }

  editGroup = (params) => {
    return this.fetchBase(`editGroup/${params.id}`, 'POST', {
      groupName: params.name,
      dateToTrackFrom: params.date
    })
  }

  deleteGroup = (params) => {
    return this.fetchBase(`deleteGroup/${params.id}`, 'POST')
  }

  isAdmin = (params) => {
    return this.fetchBase(`isAdmin/${params.id}`, 'GET')
  }

  populateDB = (params) => {
    return this.fetchBase('populateDB', 'POST')
  }

  stepsSince = (params) => {
    return this.fetchBase(`stepsSince/${params.date}`, 'GET')
  }
}

export { isLoggedIn, Api as default }
