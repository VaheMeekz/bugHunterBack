const Blog = require("../models").Blog;

const getBlogs = async (req,res) => {
    try {
        const blog = await Blog.findAll();
    
        return res.json(blog);
      } catch (error) {
        return res.status(500).json({ message: "something is wrong!" });
      }
}

const createBlog = async (req,res) => {
    const { email } = req.body;
    const blog = await Blog.findOne({ where: { email: email } });
  
    if (blog) {
      return res.json({
        message: "subscriber whith this email already exists",
        errorCode: 500,
      });
    }
  
    let newBlog;
  
    try {
      newBlog = await Blog.create({ email });
    } catch (error) {
      return res.json({ error: error.errors.map((i) => i.message) });
    }
    return res.json(newBlog);
}

const sendEmail = async (req,res) => {
    const { message, emails } = req.body;
    if (!message) {
      return res.json({ message: "message not founding!", statusCode: 500 });
    }
    try {
      transporter.sendMail(
        {
          from: "vaheemkrtchyan@gmail.com",
          to: emails,
          subject: "Bug Hunter",
          text: message,
        },
        function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        }
      );
      return res.json({ message: "message is sending!", statusCode: 200 });
    } catch (error) {
      return res.json({ error: "sending error!", statusCode: 500 });
    }
}

module.exports = {
    getBlogs,
    createBlog,
    sendEmail
}
