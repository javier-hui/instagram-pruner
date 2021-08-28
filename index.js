const requireText = require('require-text');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

console.log("parsing HTML data...");

let following = new JSDOM(requireText('./following.html', require)).window.document.getElementsByTagName("li");
let followingList = [];
let followers = new JSDOM(requireText('./followers.html', require)).window.document.getElementsByTagName("li");
let followersList = [];

const newlineRegex = /\r?\n|\r/;
for (let iFollow of following) {
    followingList.push(iFollow.textContent.trim().split(' ')[0].replace(newlineRegex, ''));
}
for (let followMe of followers) {
    followersList.push(followMe.textContent.trim().split(' ')[0].replace(newlineRegex, ''));
}
console.log("number of followers detected: " + followersList.length);
console.log("number of following detected: " + followingList.length);
for (let i = followingList.length - 1; i >= 0; i--) {
    if (followersList.includes(followingList[i])) followingList.splice(i, 1);
}
console.log(`found ${followingList.length} prunable accounts: `);
console.log(followingList);