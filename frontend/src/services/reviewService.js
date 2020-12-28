import Axios from 'axios'
import httpService from './httpService';
const BASE_URL = 'http://localhost:3030/api/review'

const axios = Axios.create({
    withCredentials: true
});

export const reviewService = {
    add,
    query
}

async function add(review) {
    console.log('NEW REVIEW',review);
    const res = await axios.post(`${BASE_URL}`, review)
    console.log('hiiiiii',res.data);
    return res.data;
}

async function query(filterBy, chef = true) {

    if (Object.keys(filterBy).length) {
        var queryStr = (chef) ? `?chefId=${filterBy}` : `?byUserId=${filterBy}`;
    }
    return httpService.get(`review${queryStr || ''}`);
}
