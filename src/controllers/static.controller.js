const BasicController = require('./basic.controller');
const SmartContractController = require('./smart-contract.controller');

class StaticController extends BasicController {
    constructor(router) {
        super(router, '');
    }

    link(router) {
        // Public routes
        router.get(`${this.prefix}/login`, this.login);
        router.get(`${this.prefix}/signup`, this.signup);
        router.get(`${this.prefix}/forgot-password`, this.forgotPassword);
        router.get(`${this.prefix}/check-email`, this.checkEmail);
        router.get(`${this.prefix}/account`, this.account);
        router.get(`${this.prefix}/reset-password`, this.resetPassword);
        router.get(`${this.prefix}/confirm-email`, this.confirmationToken);
        router.get(`${this.prefix}/recover-token`, this.recoveryToken);
        router.get(`${this.prefix}/confirm-success`, this.confirmationSuccess);
        router.get(`${this.prefix}/confirm-failed`, this.confirmationFailed);
        router.get(`${this.prefix}/`, this.landing);
        router.get(`${this.prefix}/404`, this.pageNotFound);
        router.get(`${this.prefix}/test`, (req, res) => {
            const ct = new SmartContractController();

            ct.getBalance();

            res.json({});
        });

        // Protected routes
        router.get(`${this.prefix}/dashboard`, this.ensureAuthenticated, this.dashboard);
        router.get(`${this.prefix}/blog`, this.ensureAuthenticated, this.blogArchive);

        // Handler for invalid routes
        router.get(`*`, this.pageNotFound);
    }

    landing(req, res) {
        const isAuthorized = req.isAuthenticated();
        res.render('pages/landing', {
            /* send data to view */
            isAuthorized,
        });
    }

    login(req, res) {
        res.render('pages/login', {
            /* send data to view */
        });
    }

    signup(req, res) {
        res.render('pages/signup', {
            /* send data to view */
        });
    }

    dashboard(req, res) {
        res.render('pages/index', {
            pageTitle: 'DASHBOARD'
        });
    }

    blogArchive(req, res) {
        res.render('pages/blog-archive', {
            /* send data to view */
        })
    }

    forgotPassword(req, res) {
        res.render('pages/forgot-password', {
            /* send data to view */
        })
    }

    account(req, res) {
        const isAuthorized = req.isAuthenticated();
        res.render('pages/account', {
            /* send data to view */
            isAuthorized
        });
    }

    resetPassword(req, res) {
        res.render('pages/reset-password', {
            /* send data to view */
        })
    }

    resetPassword(req, res) {
        res.render('pages/reset-password', {
            /* send data to view */
        })
    }

    checkEmail(req, res) {
        res.render('pages/info-page', {
            /* send data to view */
            title: 'Thank You!',
            markedSubtitle: 'Please check your email',
            subtitle: 'for further instructions on how to complete your account setup.',
        })
    }

    confirmationSuccess(req, res) {
        res.render('pages/info-page', {
            /* send data to view */
            title: 'Thank You!',
            markedSubtitle: 'Please check your email',
            subtitle: 'for further instructions on how to complete your account setup.',
        })
    }

    confirmationFailed(req, res) {
        res.render('pages/info-page', {
            /* send data to view */
            title: 'Error!',
            markedSubtitle: 'Your token invalid or expired!',
            subtitle: '',
        })
    }

    recoveryToken(req, res) {
        res.render('pages/validate-recovery-token', {
            /* send data to view */
            title: 'Congratulations!',
            markedSubtitle: 'Your account has been confirmed successfully',
            subtitle: 'now you can login to this website.',
        })
    }

    confirmationToken(req, res) {
        res.render('pages/validate-confirmation-token', {
            /* send data to view */
        })
    }

    pageNotFound(req, res) {
        res.render('pages/404', {
            /* send data to view */
        })
    }

    ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.redirect('/login');
        }
    }
}

module.exports = StaticController;
