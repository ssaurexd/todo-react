export const types = {
	//Auth
	authCheckingFinished: '[auth] Checking login state finished',
	authCheckingStart: '[auth] Checking login start',

	authSignUpStart: '[auth] Signup start',
	authSignUpFail: '[auth] Signup fail',
	authSignUpSuccess: '[auth] Signup success',
	
	authLoginStart: '[auth] Login start',
	authLoginFail: '[auth] Login fail',
	authLoginSuccess: '[auth] Login success',
	authTokenRenew: '[auth] Token renew',
	authLogout: '[auth] Logout',

	//Tasks
	taskListStart: '[task] List start',
	taskListSuccess: '[task] List success',
	taskListFail: '[task] List fail',
}