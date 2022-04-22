const {Op} = require("sequelize");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
require("dotenv").config();
const auth = require("../middleware/auth");
const nodemailer = require("nodemailer");
const db = require("../models");
let sequelize = db.sequelize;
const User = require("../models").User;
const Payment = require("../models").Payment;
const Clan = require("../models").Clan;
const Forgot = require("../models").Forgot;
const Message = require("../models").Message;

const deleatedText =
    "OOPS!, Your account has been deleted! Lorem Ipsum is simply dummy text of the printing and typesetting industry.";
const ForgotTextText = "This is Your Code,Plese fill in fild! Your Code - ";
const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function generateString(length) {
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

const register = async (req, res) => {
    try {
        const {name, password, email, role, level} = req.body;

        if (!(email && password && name)) {
            return res.json({
                error: ["Name, password and email are required fields"],
            });
        }

        const oldUser = await User.findOne({
            where: {email},
        });

        if (oldUser) {
            return res.json({
                error: ["User with this email already exists"],
            });
        }

        let encryptedPassword = await bcrypt.hash(password, 10);
        console.log(encryptedPassword)
        let user;
        try {
            user = await User.create({
                name,
                email: email.toLowerCase(),
                password: encryptedPassword,
                userClass: role,
                level,
            });

            user.query = user.uuid;
            user.save();
        } catch (e) {
            return res.json({error: e.errors.map((i) => i.message)});
        }

        const token = jwt.sign({user_id: user.id}, process.env.TOKEN_KEY, {
            expiresIn: "2h",
        });
        // save user token
        user.token = token;

        return res.status(201).json(user);
    } catch (err) {
        // TODO: add error handling
        console.log(err);
    }
};

const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        if (!(email && password)) {
            return res.json({
                error: ["Password and email are required fields"],
            });
        }

        const user = await User.findOne({
            where: {email: email.toLowerCase()},
        });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                {user_id: user.id, email},
                process.env.TOKEN_KEY
                // ,
                // {
                //     expiresIn: "2h",
                // }
            );
            user.token = token;
            user.save();
            return res.status(200).json(user);
        }

        return res.json({error: ["Invalid credentials"]});
    } catch (err) {
        return res.json({error: ["Error"]});
    }
};

const password = async (req, res) => {
    const {userId, current, password, confirm} = req.body;

    console.log(
        "userId, current, password, confirm",
        userId,
        current,
        password,
        confirm
    );

    if (!(userId, current, password, confirm)) {
        return res.json("bad requsest!");
    }

    if (password !== confirm) {
        return res.json({error: "Password and Confirm in not much!"});
    }
    const thisUser = await User.findOne({where: {id: userId}});
    try {
        if (thisUser && (await bcrypt.compare(current, thisUser.password))) {
            thisUser.password = await bcrypt.hash(password, 10);
            thisUser.save();
            return res.json({message: "Your Password Is Changed!"});
        } else return res.json({error: "You will Add Broken Current Password!"});
    } catch (error) {
        return res.json({error: "You will Broken!"});
    }
};

const addQuery = async (req, res) => {
    const {userId, queryName} = req.body;

    if (!(userId, queryName)) {
        return res.json({message: "bad request!"});
    }

    const thisUser = await User.findOne({where: {id: userId}});
    if (!thisUser) {
        return res.json({message: "bad request!"});
    }

    const can = await User.findAll({where: {query: queryName}});
    console.log(can.length, "canacanacajcnancancancn");

    if (can.length > 0) {
        return res.json({error: "This Query Name Alredy Exist!"});
    } else {
        thisUser.query = queryName;
        thisUser.save();
        return res.json({message: "Your Query Is Added!"});
    }
};

const getQuery = async (req, res) => {
    const {userId} = req.body;

    if (!userId) {
        return res.json({message: "bad request!"});
    }

    const thisUser = await User.findOne({where: {id: userId}});

    if (!thisUser) {
        return res.json({message: "user not found!"});
    }

    const query = thisUser.query;

    return res.json(query);
};

const getUserQuery = async (req, res) => {
    const {queryName} = req.body;

    if (!queryName) {
        return res.json({message: "bad request!"});
    }

    const thisUser = await User.findOne({where: {query: queryName}});

    if (!thisUser) {
        return res.json(false);
    } else {
        return res.json({
            id: thisUser.id,
            name: thisUser.name,
            email: thisUser.email,
            userClass: thisUser.userClass,
            rewards: thisUser.rewards,
            vulnerabilitiesFound: thisUser.vulnerabilitiesFound,
            totalBountiesPaid: thisUser.totalBountiesPaid,
            averageBounty: thisUser.averageBounty,
            topBountyRange: thisUser.topBountyRange,
            level: thisUser.level,
            clanId: thisUser.clanId,
            creatorClanId: thisUser.creatorClanId,
            ClanOficer: thisUser.ClanOficer,
            likes: thisUser.likes,
            about: thisUser.about,
            git: thisUser.git,
            insta: thisUser.insta,
            twwiter: thisUser.twwiter,
        });
    }
};

const quitInClan = async (req, res) => {
    const {userId} = req.body;

    if (!userId) {
        return res.json({message: "bad man!"});
    }

    const thisUser = await User.findOne({where: {id: userId}});
    if (!thisUser) {
        return res.json({message: "User Not Found!"});
    }

    thisUser.clanId = null;
    thisUser.ClanOficer = "none";
    thisUser.save();

    return res.json({message: "You Quit In This Clan!"});
};

const user = async (req, res) => {
    const {id} = req.body;
    const user = await User.findOne({where: {id: id}});
    return res.json(user);
};

const allUsers = async (req, res) => {
    const allUser = await User.findAll();
    return res.json(allUser);
};

const allHackers = async (req, res) => {
    console.log("here :");
    const allUser = await User.findAll({where: {userClass: "hacker"}});
    return res.status(200).json(allUser);
};

const canquit = async (req, res) => {
    const {userId, clanId} = req.body;

    if (!(userId && clanId)) {
        return res.json({message: "bad man!"});
    }

    const thisUser = await User.findOne({where: {id: userId}});

    if (!thisUser) {
        return res.json({message: "bad man!"});
    }

    if (thisUser.clanId == clanId && thisUser.creatorClanId !== 1) {
        return res.json(true);
    } else {
        return res.json(false);
    }
};

const allOrganizations = async (req, res) => {
    const allOrganizations = await User.findAll({
        where: {userClass: "organization"},
    });

    return res.status(200).json(allOrganizations);
};

const deleate = async (req, res) => {
    const {id} = req.body;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "bughunteram@mail.ru",
        pass: "Yanerop2000",
      },
    });
    if (!id) {
        return res.json({message: "Deleting data failed!", statusCode: 400});
    }
    try {
        const thisUser = await User.findOne({where: {id}});
        transporter.sendMail(
            {
                from: "vaheemkrtchyan@gmail.com",
                to: user.email,
                subject: "Bug Hunter",
                text: deleatedText,
            },
            function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log("🚀  info.response", "Email sent: " + info.response);
                }
            }
        );

        const userClanId = thisUser.clanId

        if (!userClanId) {
            thisUser.destroy()
        } else {
            const members = await User.findAll({where: {clanId: userClanId}})
            console.log(members.length,"members");
            if (members.length > 0) {
                thisUserClan = await Clan.destroy({where: {id: userClanId}})
                console.log(thisUserClan,"thisUserClan");
                thisUser.destroy()
            } else {
                const newCreatorId = members[1].id
                console.log(newCreatorId,"newCreatorId");
                const newCreator = await User.findOne({where: {id: newCreatorId}})
                console.log(newCreator);
                newCreator.creatorClanId = 1
                newCreator.clanOficer = "none"
                newCreator.save()
                thisUser.destroy()
            }
        }
        const all = await User.findAll({where: {userClass: "hacker"}});
        return res.json(all);
    } catch (error) {
        return res.json({message: "Deleting data failed!", statusCode: 500});
    }
};

const deleateOrganization = async (req, res) => {
    const {id} = req.body;

    if (!id) {
        return res.json({message: "bad request!"});
    }

    const thisOrg = await User.destroy({where: {id}});

    const allOrgs = await User.findAll({where: {userClass: "organization"}});
    return res.json(allOrgs);
};

const deactivateAcount = async (req, res) => {
    const {id, current} = req.body;

    if (!(id && current)) {
        return res.json({message: "bad request!"});
    }

    const thisUser = await User.findOne({
        where: {id},
    });

    try {
        if (thisUser && (await bcrypt.compare(current, thisUser.password))) {
            thisUser.destroy();
            return res.json({message: "Your Acount Is Deactivate!"});
        } else return res.json({error: "You Broken Current Password!"});
    } catch (error) {
        return res.json({error: "You will Broken!"});
    }
};

const profileSocials = async (req, res) => {
    const {id, git, linke, inst} = req.body;
    console.log("id, git, linke, inst", id, git, linke, inst);
    if (!(id && git && linke && inst)) {
        return res.json({message: "bad request!"});
    }
    const user = await User.findOne({where: {id: id}});

    user.git = git;
    user.insta = inst;
    user.twwiter = linke;
    user.save();
    return res.json(user);
};

const getMySocials = async (req, res) => {
    const {id} = req.body;

    if (!id) {
        return res.json({message: "Bad request!"});
    }

    const thisUser = await User.findOne({where: {id}});

    if (!thisUser) {
        return res.json({message: "Bad request!"});
    }

    return res.json([thisUser.git, thisUser.insta, thisUser.twwiter]);
};

const createPay = async (req, res) => {
    const {id, value, myId} = req.body;

    if (!(value && id && myId)) {
        return res.json({message: "badRequest"});
    }

    const realVal = Math.floor(value);
    const thisUser = await User.findOne({where: {id}});

    thisUser.totalBountiesPaid =
        parseInt(thisUser.totalBountiesPaid) + parseInt(realVal);

    const thisUSerClanId = thisUser.clanId;

    const thisUSerClan = await Clan.findOne({where: {id: thisUSerClanId}});

    const iAm = await User.findOne({where: {id: myId}});

    iAm.vulnerabilitiesFound =
        parseInt(iAm.vulnerabilitiesFound) + parseInt(realVal);
    iAm.save();
    if (thisUSerClan) {
        thisUSerClan.score = parseInt(thisUSerClan.score) + parseInt(realVal);
        thisUSerClan.save();
    }

    thisUser.save();

    return res.json(thisUser);
};

const clanMembers = async (req, res) => {
    const {clanId} = req.body;

    if (!clanId) {
        return res.json({message: "bad request!"});
    }

    const user = await User.findAll({where: {clanId: clanId}});

    return res.json(user);
};

const createLevelUp = async (req, res) => {
    const {condidatId, vocation} = req.body;

    if (!condidatId) {
        return res.json({message: "Bad Reequest"});
    }

    const condidat = await User.findOne({where: {id: condidatId}});

    if (!condidat) {
        return res.json({message: "user not found!"});
    }
    condidat.ClanOficer = vocation;
    condidat.save();

    return res.json(condidat);
};

const levelDown = async (req, res) => {
    const {id} = req.body;

    if (!id) {
        return res.json({message: "user not found!"});
    }

    const thisUser = await User.findOne({where: {id}});

    if (!thisUser) {
        return res.json({message: "this user not found!"});
    }
    thisUser.ClanOficer = "ordinary";
    thisUser.save();

    const userClasMembers = await User.findAll({
        where: {clanId: thisUser.clanId},
    });
    return res.json(userClasMembers);
};

const deleateInCLan = async (req, res) => {
    const {id} = req.body;
    if (!id) {
        return res.json({message: "bad"});
    }
    const thisUser = await User.findOne({where: {id}});
    const clan = thisUser.clanId;
    thisUser.clanId = null;
    thisUser.save();

    const all = await User.findAll({where: {clanId: clan}});
    return res.json(all);
};

const thisCLanCreactor = async (req, res) => {
    const {clanId, userId} = req.body;

    const thisUSer = await User.findOne({where: {id: userId}});

    if (thisUSer.creatorClanId == 1 && thisUSer.clanId == clanId) {
        return res.json(1);
    } else {
        return res.json(0);
    }
};

const getToForgot = async (req, res) => {
    const {email} = req.body;

    const thisUSer = await User.findOne({where: {email}});

    if (!thisUSer) {
        return res.json({
            error: ["User Not Found!"],
        });
    }
    try {
        let generateCode = JSON.parse(
            JSON.stringify(new String(generateString(8)))
        );

        const newCode = await Forgot.create({
            code: generateCode,
            user: thisUSer.id,
        });
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "bughunteram@mail.ru",
                pass: "Yanerop2000",
            },
        });
        transporter.sendMail(
            {
                from: "vaheemkrtchyan@gmail.com",
                to: email,
                subject: "Bug Hunter",
                text: `${ForgotTextText} ${generateCode}`,
            },
            function (error, info) {
                if (error) {
                    console.log(error, "🚀");
                } else {
                    console.log("🚀  info.response", "Email sent: " + info.response);
                }
            }
        );
        return res.json(newCode);
    } catch (error) {
        return res.json({
            error: ["Something Is Wrong!"],
        });
    }
};

const compairForgotCode = async (req, res) => {
    const {id, code} = req.body;

    if (!(id, code)) {
        return res.json({
            error: ["Something Is Wrong!"],
        });
    }

    const thisCode = await Forgot.findOne({where: {id}});
    if (!thisCode) {
        return res.json({
            error: ["This Verify Code Not Found!"],
        });
    }

    if (code == thisCode.code) {
        return res.json(1);
    } else {
        return res.json({
            error: ["False!"],
        });
    }
};

const changePassword = async (req, res) => {
    const {userId, password, confirm} = req.body;

    if (!(userId && password && confirm)) {
        return res.json({
            error: ["Fail!"],
        });
    }

    const thisUser = await User.findOne({where: {id: userId}});

    if (!thisUser) {
        return res.json({
            error: ["User Not Found"],
        });
    }
    try {
        let encryptedPassword = await bcrypt.hash(password, 10);
        thisUser.password = encryptedPassword;
        thisUser.save();

        return res.json(1);
    } catch (error) {
        return res.json(0);
    }
};

const addAbout = async (req, res) => {
    const {userId, aboutText} = req.body;

    if (!(userId && aboutText)) {
        return res.json({message: "bad request!"});
    }

    const thisUser = await User.findOne({where: {id: userId}});

    if (!thisUser) {
        return res.json({message: "user not found!"});
    }
    try {
        thisUser.about = aboutText;
        thisUser.save();
        return res.json(thisUser.about);
    } catch (error) {
        return res.json({message: "something is wrong!"});
    }
};

const canInvite = async (req, res) => {
    const {senderId, reciverId} = req.body;

    if (!(senderId && reciverId)) {
        return res.json({message: "bad request!"});
    }

    const sender = await User.findOne({where: {id: senderId}});

    const reciver = await User.findOne({where: {id: reciverId}});

    if (!(sender && reciver)) {
        return res.json({message: "bad request!"});
    }

    if (
        sender.userClass == "hacker" &&
        reciver.userClass == "hacker" &&
        sender.clanId !== null &&
        sender.creatorClanId == 1 &&
        sender.ClanOficer !== "ordinary" &&
        reciver.clanId == null
    ) {
        return res.json(1);
    } else return res.json(0);
};

const addOrganizationUrl = async (req, res) => {
    const {userId, url} = req.body;

    const thisUser = await User.findOne({where: {id: userId}});

    if (!thisUser) {
        return resw.json({message: "bad request!"});
    }

    try {
        thisUser.url = url;
        thisUser.save();
        return res.json(thisUser.url);
    } catch (error) {
        return res.json({error: "You Broken Something!"});
    }
};

const getMyUrl = async (req, res) => {
    const {userId} = req.body;

    if (!userId) {
        return res.json({message: "bad request!"});
    }

    const thisUser = await User.findOne({where: {id: userId}});

    if (!thisUser) {
        return res.json({error: "This user not found!"});
    }

    return res.json(thisUser.url);
};

const addClanInfo = async (req, res) => {
    const {id} = req.body;

    if (!id) {
        return res.json({message: "bad man"});
    }

    const thisUser = await User.findOne({whjere: {id}});

    if (!thisUser) {
        return res.json({message: "bad man"});
    }

    const clanId = thisUser.clanId;

    if (!clanId) {
        return res.json({message: "bad man"});
    }

    const clan = await Clan.findOne({where: {id: clanId}});
    return res.json(clan);
};

const delAvatar = async (req, res) => {
    const {userId} = req.body;

    if (!userId) {
        return res.json({message: "bad request!"});
    }

    const thisUser = await User.findOne({where: {id: userId}});

    if (!thisUser) {
        return res.json({message: "bad request!"});
    }

    thisUser.averageBounty = null;
    thisUser.save();
    return res.json(thisUser.averageBounty);
};

const myCLanInfo = async (req, res) => {
    const {id} = req.body;

    if (!id) {
        return res.json({message: "bad request!"});
    }

    const thisUser = await User.findOne({where: {id}});
    if (!thisUser) {
        return res.json({message: "user not found!"});
    }
    const thisUSerClanId = thisUser.clanId;
    if (thisUSerClanId) {
        const thisUserClan = await Clan.findOne({where: {id: thisUSerClanId}});
        console.log(thisUserClan, "here");
        return res.json({
            creatorName: thisUser.name,
            clanName: thisUserClan.name,
            clanAvatar: thisUserClan.clanAvatar,
        });
    }
};

const paginateHackers = async (req, res) => {
    const offset = Number.parseInt(req.query.offset) || 0;
    const limit = Number.parseInt(req.query.limit) || 2;
    const all = await User.findAll({
        where: {userClass: "hacker"},
    });

    console.log("Message.count()", await Message.count());

    const hackers = await User.findAll({
        where: {userClass: "hacker"},
        offset: offset * limit,
        limit,
        include: [
            {
                model: Message,
                as: "msg",
                order: [["reciver", "DESC"]],
            },
        ],
    });
    return res.json({hackers: hackers, count: all.length});
};


const changeLevel = async (req, res) => {
    const {userId, level} = req.body

    if (!(userId && level)) {
        return res.json({err: "fields are required!"})
    }


    const thisUser = await User.findOne({where: {id: userId}})
    if (!thisUser) {
        return res.json({err: "not found!"})
    }

    thisUser.level = level
    thisUser.save()
    return res.json({message: "level are chaged!"})
}
 
const can = async (req,res) => {
        const {clanId,userId} = req.body

        if(!(clanId && userId)){
            return res.json({message:"bad request!"})
        }

        const thisUser = await User.findOne({where:{id:userId}})

        if(!thisUser){
            return res.json({message:"bad request!"})
        }

        // const thisUserClaId = thisUser.clanId;
        // if(!thisUserClaId){
        //     return res.json({message:"bad request!"})
        // }

        // const thisUserClan = await Clan.findOne({where:{id:thisUserClaId}})


        // if(!thisUserClan){
        //     return res.json({message:"bad request!"})
        // }

        if(thisUser.clanId == clanId){
            return res.json(true)
        }else{
            return res.json(false)
        }

}

module.exports = {
    register,
    login,
    password,
    addQuery,
    getQuery,
    getUserQuery,
    quitInClan,
    user,
    allUsers,
    allHackers,
    canquit,
    allOrganizations,
    deleate,
    deleateOrganization,
    deactivateAcount,
    profileSocials,
    getMySocials,
    createPay,
    clanMembers,
    createLevelUp,
    levelDown,
    deleateInCLan,
    thisCLanCreactor,
    getToForgot,
    compairForgotCode,
    changePassword,
    addAbout,
    canInvite,
    addOrganizationUrl,
    getMyUrl,
    addClanInfo,
    delAvatar,
    myCLanInfo,
    paginateHackers,
    changeLevel,
    can
};
