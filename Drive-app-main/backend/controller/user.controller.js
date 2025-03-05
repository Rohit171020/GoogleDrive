import passport from 'passport';
import Googleauth from 'passport-google-oauth20';
import jwt from 'jsonwebtoken';

const GoogleStrategy = Googleauth.Strategy;

passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL
    },
    (accessToken, refreshToken, profile, done) => {
        return done(null, { id: profile.id, accessToken });
    }
));

const googleAuthentication = passport.authenticate('google', {
    scope: ['profile', 'email', 'https://www.googleapis.com/auth/drive.file']
});

const callBackFuntion = (req, res, next) => {
    passport.authenticate('google', { session: false }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({ success: false, message: "Authentication failed" });
        }
        const token = jwt.sign(
            { user: { id: user.id } },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.redirect(`${process.env.FRONTEND_URL}/callback?token=${token}&accessToken=${user.accessToken}`);
    })(req, res, next);
};

export { googleAuthentication, callBackFuntion };