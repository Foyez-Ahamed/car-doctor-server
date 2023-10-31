// introduction to jwt (json web token) and axios interceptor //

// JWT (JSON Web Tokens) is a compact, URL-safe token format used for securely transmitting information between parties. In the context of web applications built with Node.js and Express, JWTs are commonly used for authentication and information exchange. Here's why JWTs are useful and how they are typically used in web applications:

// ### 1. **Stateless Authentication:**
//    - JWTs allow for stateless authentication. Traditional sessions require storing session data on the server, which can be a problem in a distributed environment. With JWTs, all the necessary information is contained within the token itself. When a user logs in and receives a JWT, subsequent requests can include this token for authentication without the server having to store any session data.

// ### 2. **Enhanced Security:**
//    - JWTs can be signed and optionally encrypted, providing a layer of security. When a token is issued by the server, it can be signed using a secret key. Upon receiving the token, the server can verify its authenticity by checking the signature. Encryption adds another layer of security, ensuring that the token contents are not visible even if intercepted.

// ### 3. **Scalability:**
//    - Stateless authentication with JWTs simplifies scaling. Since there's no need to store session data on the server, you can easily add more server instances to handle increased traffic. Each server can independently verify JWTs without relying on a shared session store.

// ### 4. **Information Exchange:**
//    - JWTs can carry additional information (claims) besides just authentication data. These claims can include user roles, permissions, or any other relevant information. This information can be useful for authorization purposes on the client side.

// ### 5. **Inter-Service Communication:**
//    - In a microservices architecture, different services often need to communicate with each other. JWTs can be used to ensure the authenticity of requests between services, allowing them to trust the information they receive.

// ### 6. **User Sessions and Single Sign-On (SSO):**
//    - JWTs can be used to manage user sessions, allowing users to remain logged in across multiple applications or services without needing to log in separately to each one (SSO). Each application can verify the JWT independently and extract user information.

// ### 7. **Flexibility and Decentralization:**
//    - Since JWTs are a standard, they can be used across different platforms and technologies. They allow for more flexible and decentralized authentication and authorization mechanisms, enabling different parts of your application ecosystem to work together seamlessly.

// When implementing JWT-based authentication in a Node.js Express application, you typically use middleware like `jsonwebtoken` to sign tokens during login and verify tokens on protected routes. This approach provides a robust and scalable solution for authentication and information exchange in modern web applications.

// usages > go to google and search jwt and go their github documentation > install jwt on server side > crate a variable on server site top and require jsonWebToken then crate a api like this 

    // auth related api // 
    // app.post('/jwt', async(req, res) => {
    //     const user = req.body;
    //     console.log(user);
    //     const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn : '1h'})
    //     res
    //     .cookie('token', token, {
    //       httpOnly: true,
    //       secure: false,
    //     })
    //     .send({success : true});
    //   })

    // then go to client site and sign in page and after sign in with email and password firebase then crate a post api like this for authentication

        //  const loggedUser = result.user;

        // console.log(loggedUser);

        // const user = { email }

        // axios.post('http://localhost:5000/jwt', user, {withCredentials: true})
        // .then(res => {
        //   console.log(res.data);

        //   if(res.data.success){
        //     navigate(location?.state ? location.state : '/')
        //   }
        // })

        // for connection to server and client use this 

        // app.use(cors({
        //     origin: ['http://localhost:5173'],
        //     credentials: true
        //   }));  withCredentials: true use it client site //



        // package install list //

        // 1. Jwt form their github documentation 
        // 2. cookie-parser // 
        // 3. axios (install it on client site)

        // Happy coding // 





        /**
 * ---------------------------
 *      MAKE API SECURE
 * ---------------------------
 * The person who should have 
 * 
 * concept: 
 * 1. assign two tokens for each person (access token, refresh token)
 * 2. access token contains: user identification (email, role, etc.). valid for a shorter duration 
 * 3. refresh token is used: to recreate an access token that was expired.
 * 4. if refresh is invalid then logout the user 
 * 
 * 
*/

/**
 * 1. jwt --> json web token
 * 2. generate a token by using jwt.sign
 * 3. create api set to cookie. http only, secure, sameSite
 * 4. from client side: axios withCredentials true
 * 5. cors setup origin and credentials: true 
 * 
*/

/**
 * 1. for secure api calls
 * 2. server side: install cookie parser and use it as a middleware
 * 3. req.cookies 
 * 4. on the client side: make api call using axios withCredentials: true (or credentials include while using fetch)
 * 5.  
*/