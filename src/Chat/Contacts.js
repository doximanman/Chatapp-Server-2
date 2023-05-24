import userPFP from "../Pictures/user1-icon.jpg";
import user2PFP from "../Pictures/user2-icon.jpg";

const contacts = [{
    pfp: userPFP,
    name: "Bill Tinnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn",
    lastDate: "25/4/2023, 11:01:54 PM",
    lastMessage: "WORLDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD!",
    classes: "selected-preview",
    messages: [{
        message: "Hellooooooooooooooooooooooooooooooooooooooooooooooooo!",
        time: "00:00",
        type: "received",
        date: "25/4/2023, 11:01:54 PM"
    }, {
        message: "Worldddddddddddddddddddddddddd!",
        time: "00:00",
        type: "sent",
        date: "25/4/2023, 11:01:54 PM"
    }]
}, {
    pfp: user2PFP,
    name: "Jack Black",
    lastDate: "25/4/2023, 11:01:54 PM",
    lastMessage: "Foo!!",
    classes: "",
    messages: [{
        message: "Foo!",
        time: "00:00",
        type: "received",
        date: "25/4/2023, 11:01:54 PM"
    }, {
        message: "Bar!",
        time: "00:00",
        type: "sent",
        date: "25/4/2023, 11:01:54 PM"
    }]
}];

export default contacts;