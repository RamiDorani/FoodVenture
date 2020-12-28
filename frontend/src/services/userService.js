import httpService from './httpService'

export const userService = {
  login,
  logout,
  signup,
  query,
  getById,
  remove,
  save,
  getLocations,
  getCuisines
}

function query(filterBy = {}) {
  let queryStr = '?';
  for (const key in filterBy) {
    queryStr += `${key}=${filterBy[key]}&`;
  }
  return httpService.get(`user${queryStr || ''}`);
}

function getById(userId) {
  return httpService.get(`user/${userId}`)
}

function remove(userId) {
  return httpService.delete(`user/${userId}`)
}

async function save(user) {
  if (user._id) {
    return httpService.put(`user/${user._id}`, user)
  } else {
    return httpService.post(`user`, user);
  }
}

async function login(userCred) {
  const user = await httpService.post('auth/login', userCred)
  return _handleLogin(user)
}

async function signup(userCred) {
  console.log(userCred);
  const user = await httpService.post('auth/signup',userCred)
  return _handleLogin(user)
}

async function logout() {
  await httpService.post('auth/logout');
  sessionStorage.clear();
}

function _handleLogin(user) {
  console.log(user);
  sessionStorage.setItem('user', JSON.stringify(user))
  return user;
}

function getLocations() {
  return locations;
}

function getCuisines() {
  return cuisines;
}

const locations = [{
    _id: makeId(),
    name: 'athens',
    imgUrl: 'https://res.cloudinary.com/dnjejwpxf/image/upload/v1600432350/Locations/athens_jfkwqv.jpg'
  },
  {
    _id: makeId(),
    name: 'dubai',
    imgUrl: 'https://res.cloudinary.com/dnjejwpxf/image/upload/v1600706273/Locations/dubai_dmkeqf.jpg'
  },
  {
    _id: makeId(),
    name: 'istanbul',
    imgUrl: 'https://res.cloudinary.com/dnjejwpxf/image/upload/v1600432351/Locations/istanbul_pzjood.jpg'
  },
  {
    _id: makeId(),
    name: 'tokyo',
    imgUrl: 'https://res.cloudinary.com/dnjejwpxf/image/upload/v1600706273/Locations/tokyo_eyagrf.jpg'
  },
  {
    _id: makeId(),
    name: 'moscow',
    imgUrl: 'https://res.cloudinary.com/dnjejwpxf/image/upload/v1600432350/Locations/moscow_uncdlp.jpg'
  },
  {
    _id: makeId(),
    name: 'paris',
    imgUrl: 'https://res.cloudinary.com/dnjejwpxf/image/upload/v1600432350/Locations/paris_z6tjsf.jpg'
  },
  {
    _id: makeId(),
    name: 'rome',
    imgUrl: 'https://res.cloudinary.com/dnjejwpxf/image/upload/v1600432349/Locations/rome_lxvjp8.jpg'
  },
  {
    _id: makeId(),
    name: 'tel-aviv',
    imgUrl: 'https://res.cloudinary.com/dnjejwpxf/image/upload/v1600432350/Locations/telaviv_ki3znp.jpg'
  },
]

const cuisines = [{
    _id: makeId(),
    name: 'BBQ',
    imgUrl: 'https://res.cloudinary.com/dnjejwpxf/image/upload/v1601366035/Cuisine/bbq_cyr49x.jpg'
  },
  {
    _id: makeId(),
    name: 'italian',
    imgUrl: 'https://res.cloudinary.com/dnjejwpxf/image/upload/v1601366035/Cuisine/italian_csqj27.jpg'
  },
  {
    _id: makeId(),
    name: 'fusion',
    imgUrl: 'https://res.cloudinary.com/dnjejwpxf/image/upload/v1601366035/Cuisine/fusion_dc2w1c.jpg'
  },
  {
    _id: makeId(),
    name: 'vegan',
    imgUrl: 'https://res.cloudinary.com/dnjejwpxf/image/upload/v1601366036/Cuisine/vegan_usokqs.jpg'
  },
  {
    _id: makeId(),
    name: 'indian',
    imgUrl: 'https://res.cloudinary.com/dnjejwpxf/image/upload/v1601366035/Cuisine/indian_ywosfd.jpg'
  },
  {
    _id: makeId(),
    name: 'asian',
    imgUrl: 'https://res.cloudinary.com/dnjejwpxf/image/upload/v1601366035/Cuisine/asian_vlogsg.jpg'
  },
  {
    _id: makeId(),
    name: 'mediterranean',
    imgUrl: 'https://res.cloudinary.com/dnjejwpxf/image/upload/v1601366035/Cuisine/mediterranean_euxume.jpg'
  },
  {
    _id: makeId(),
    name: 'russian',
    imgUrl: 'https://res.cloudinary.com/dnjejwpxf/image/upload/v1601366036/Cuisine/russian_byjtej.png'
  }
]

function makeId(length = 5) {
  var txt = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}