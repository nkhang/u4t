import history from '../helpers/HistoryHelper';
import { stringify } from 'query-string';

const host = 'http://localhost:8080';
function handleLogOut(resp) {
  if (resp.code !== 1) {
    if (resp.code === 401) {
      logOut();
      // window.location.reload(true);
    }
  }
  return resp;
}

function logOut() {
  localStorage.removeItem('user');
  // window.location.reload(true);
  history.push('/');
}
function login(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  };

  return fetch(`${host}/api/auth/login`, requestOptions)
    .then((resp) => resp.json()).then((data) => {
      if (data.code !== 1) {
        return data;
      }
      const user = data.data;
      localStorage.setItem('user', JSON.stringify(user));
      return data;
    });
}

function register(user) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: user.username, password: user.password, role: user.role }),
  };
  console.log(requestOptions.body);
  return fetch(`${host}/api/auth/register`, requestOptions)
    .then(handleLogOut).then((resp) => resp.json()).then((data) => data);
}

function update(user) {
  const header = new Headers();
  const userCookie = JSON.parse(localStorage.getItem('user'));
  header.append('Authorization', userCookie ? `Bearer ${userCookie.token}` : '');
  const fd = new FormData();

  const {
    id, infor, avatar, data,
  } = user;
  if (infor.sex === 1) infor.sex = true;
  else infor.sex = false;
  fd.append('id', JSON.stringify(id));
  fd.append('infor', JSON.stringify(infor));


  if (infor.role === 1) {
    fd.append('data', JSON.stringify(data));
  }

  if (avatar != null) fd.append('avatar', avatar);
  const req = new Request(`${host}/api/p/users/info`, {
    method: 'POST',
    headers: header,
    // mode: 'no-cors',
    body: fd,
  });
  return fetch(req).then(handleLogOut).then((resp) => resp.json()).then((data) => {
    console.log(data);

    if (data.code === 1) {
      const { user } = data.data;
      const lss = localStorage.getItem('user');
      const ls = JSON.parse(lss);
      ls.user = user;
      localStorage.setItem('user', JSON.stringify(ls));
      return data;
    }
    return data;
  });
}

function loadTop4() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`${host}/api/tutors/top`, requestOptions).then((resp) => resp.json()).then((data) => data.data);
}

function createContract(contract) {
  const header = new Headers();
  const c = contract;

  const userCookie = JSON.parse(localStorage.getItem('user'));

  header.append('Content-Type', 'application/json');
  header.append('Authorization', userCookie ? `Bearer ${userCookie.token}` : 'Bearer');

  const fd = new FormData();
  c.start_date = Math.floor(c.start_date.getTime() / 1000);
  c.end_date = Math.floor(c.end_date.getTime() / 1000);
  c.hpw = parseInt(c.hpw, 10);

  fd.append('contract', JSON.stringify(c));


  const req = new Request(`${host}/api/p/contracts`, {
    method: 'POST',
    headers: header,
    body: JSON.stringify(c),
  });

  return fetch(req).then(handleLogOut).then((resp) => resp.json()).then((data) => data);
}

function loadAllContract() {
  const userCookie = JSON.parse(localStorage.getItem('user'));
  var header = new Headers();
  header.append('Content-Type', 'application/json');
  header.append('Authorization', userCookie ? `Bearer ${userCookie.token}` : 'Bearer');
  const requestOptions = {
    method: 'GET',
    headers:header
  };

  return fetch(`${host}/api/p/contracts`, requestOptions).then((resp) => resp.json()).then((data) => {return data;});
}

function desicionContractAccept(id, value) {
  const header = new Headers();

  const userCookie = JSON.parse(localStorage.getItem('user'));

  header.append('Content-Type', 'application/json');
  header.append('Authorization', userCookie ? `Bearer${userCookie.token}` : 'Bearer');

  const fd = new FormData();

  fd.append('id', JSON.stringify(id));
  fd.append('choice', JSON.stringify());
  const req = new Request('/api/contract/accept', {
    method: 'POST',
    headers: header,
    mode: 'no-cors',
    body: fd,
  });

  return fetch(req).then(handleLogOut).then((resp) => resp.json()).then((data) => data);
}

function submitReviewContract(_id, review) {
  const headers = new Headers();
  const userCookie = JSON.parse(localStorage.getItem('user'));

  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', userCookie ? `Bearer${userCookie.token}` : 'Bearer');

  const fd = new FormData();
  fd.append('_id', JSON.stringify(_id));
  fd.append('review', JSON.stringify(review));

  const req = new Request('/api/contracts/addreview', {
    method: 'POST',
    headers,
    mode: 'no-cors',
    body: fd,
  });

  return fetch(req).then(handleLogOut).then((resp) => resp.json()).then((data) => data);
}

function submitComplainContract(_id, complain) {
  const headers = new Headers();
  const userCookie = JSON.parse(localStorage.getItem('user'));

  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', userCookie ? `Bearer${userCookie.token}` : 'Bearer');

  const fd = new FormData();
  fd.append('_id', JSON.stringify(_id));
  fd.append('complain', JSON.stringify(complain));

  const req = new Request('/api/contracts/addcomplain', {
    method: 'POST',
    headers,
    mode: 'no-cors',
    body: fd,
  });

  return fetch(req).then(handleLogOut).then((resp) => resp.json()).then((data) => data);
}

function submitCompleteContract(_id) {
  const headers = new Headers();
  const userCookie = JSON.parse(localStorage.getItem('user'));

  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', userCookie ? `Bearer${userCookie.token}` : 'Bearer');

  const fd = new FormData();
  fd.append('_id', JSON.stringify(_id));

  const req = new Request('/api/contracts/complete', {
    method: 'POST',
    headers,
    mode: 'no-cors',
    body: fd,
  });

  return fetch(req).then(handleLogOut).then((resp) => resp.json()).then((data) => data);
}

function getAllConverSation() {
  const headers = new Headers();
  const userCookie = JSON.parse(localStorage.getItem('user'));

  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', userCookie ? `Bearer ${userCookie.token}` : 'Bearer');

  const req = new Request(`${host}/api/p/m/conversation`, {
    method: 'GET',
    headers,
    // mode: 'no-cors',
  });

  return fetch(req).then(handleLogOut).then((resp) => resp.json()).then((data) => {console.log(data);return data});
}

function getConverSation(id) {
  const headers = new Headers();
  const userCookie = JSON.parse(localStorage.getItem('user'));

  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', userCookie ? `Bearer ${userCookie.token}` : 'Bearer');

  const req = new Request(`${host}/api/p/m/conversation/${id}`, {
    method: 'GET',
    headers,
    // mode: 'no-cors',
  });

  return fetch(req).then(handleLogOut).then((resp) => resp.json()).then((data) => {return data});
}

function sendMessage(conversation,sender,content) {
  const headers = new Headers();
  const userCookie = JSON.parse(localStorage.getItem('user'));

  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', userCookie ? `Bearer ${userCookie.token}` : 'Bearer');

  const req = new Request(`${host}/api/p/m/message`, {
    method: 'POST',
    headers,
    // mode: 'no-cors',
    body: JSON.stringify({conversation,sender,content})
  });

  return fetch(req).then(handleLogOut).then((resp) => resp.json()).then((data) => {return data});
}


function createConversation(learner,tutor){
  const headers = new Headers();
  const userCookie = JSON.parse(localStorage.getItem('user'));

  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', userCookie ? `Bearer ${userCookie.token}` : 'Bearer');
  // var tutor,learner;
  // if (userCookie.user.role === 0){
  //   tutor = id;
  //   learner = userCookie.user._id;
  // } else {
  //   tutor = userCookie.user._id;
  //   learner = id;
  // }
  const req = new Request(`${host}/api/p/m/conversation`, {
    method: 'POST',
    headers,
    // mode: 'no-cors',
    body: JSON.stringify({tutor,learner})
  });

  return fetch(req).then(handleLogOut).then((resp) => resp.json()).then((data) => {
    if (data.code === 1) {
      console.log(data);
      // history.push('/message');
    }
    return data});
}
export default {
  login,
  register,
  logOut,
  update,
  loadTop4,
  loadAllContract,
  createContract,
  desicionContractAccept,
  submitReviewContract,
  submitComplainContract,
  submitCompleteContract,
  getAllConverSation,
  getConverSation,
  sendMessage,
  createConversation
};
