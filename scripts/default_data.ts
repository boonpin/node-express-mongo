import {mongoConfig} from "../config/mongo";
import {IUser, User} from "../src/models/user";
import * as mongoose from "mongoose";
import * as bcrypt from 'bcrypt';

const mongoUrl = 'mongodb://192.168.168.101:27017/payments';
mongoose.connect(mongoUrl, mongoConfig).then(async () => {

    console.log(`Successfully connected to ${mongoUrl}`);
    console.log("start seed default data ...... ");

    let user = await User.findOne().where("username", "admin").exec();
    if (!user) {
        const user = new User(<IUser> {
            username: "admin",
            password: bcrypt.hashSync("admin", bcrypt.genSaltSync(10)),
            type: "admin"
        });
        await user.save().then((c) => console.log("created user " + c.username));
    } else {
        console.log("user " + user.username + " already exists");
    }

    console.log("done");
    process.exit(0);
});
