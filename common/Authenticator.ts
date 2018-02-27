import { AuthController } from '../controllers/AuthController';

export const Authenticator = (req, res, next) => { 
    let xToken = req.headers['x-token'];

    if(!xToken)
        return res.status(401).send('You are not logged in');
    
    new AuthController().getAuthByToken(xToken).then(result => {
        if(result['code'])
            return res.status(result['code']).send(result['message']);
        
        req['identity'] = result;
        next();
    }).catch(error => {
        return res.status(403).send(error.message);
    });
};