import jwt  from 'jsonwebtoken';

const auth = async (req, res, next) => {
  try {
    // console.log(req.headers);
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length<500;                // if token length is less than 500 that means it is our token

    let decodedData;

    if(token && isCustomAuth) {
      decodedData = jwt.verify(token, 'test');                         // it gives username and id of user

      req.userId = decodedData?.id;
    } else {                                                // if token length is greater than 500 that means it is of googleOauth token
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;                // sub is google's name for a specific id that differentiate every single user
    }

     
    next();
  } catch (error) {
    console.log(error);
  }
}

export default auth;

